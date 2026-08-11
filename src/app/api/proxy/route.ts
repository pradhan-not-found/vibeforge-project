import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { getDb, saveDb, updateAgentUsage, incrementAgentBlocked } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const { prompt, agentId = 'gemini-flash' } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const db = getDb();
    const agent = db.agents[agentId];
    const policies = db.policies;

    if (!agent) {
      return NextResponse.json({ error: 'Unknown agent ID' }, { status: 400 });
    }

    // 1. BLAST RADIUS CHECK
    if (agent.totalSpend >= policies.maxSpend || agent.totalTokens >= policies.maxTokens) {
      const reason = agent.totalSpend >= policies.maxSpend ? 'Max Spend Exceeded' : 'Max Tokens Exceeded';
      
      // Add to Approval Queue
      const queueItem = {
        id: crypto.randomUUID(),
        agentId,
        agentName: agent.name,
        action: 'execute_prompt',
        policy: reason,
        time: new Date().toISOString(),
        prompt
      };
      
      db.queue.unshift(queueItem); // Add to front
      saveDb(db);
      incrementAgentBlocked(agentId);

      return NextResponse.json({ 
        status: 'blocked', 
        error: `Agent blocked by Blast Radius Firewall. Policy triggered: ${reason}` 
      }, { status: 403 });
    }

    // 2. ALLOWED - EXECUTE
    const startTime = Date.now();
    let text = '';
    let totalTokens = 0;
    let success = false;
    let errorContext = '';
    let cost = 0;

    try {
      if (agentId === 'gemini-flash') {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
        totalTokens = response.usageMetadata?.totalTokenCount || Math.ceil(text.length / 4) + Math.ceil(prompt.length / 4);
        cost = (totalTokens / 1000000) * 0.35; // Gemini Flash pricing
      } else if (agentId === 'groq-agent') {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'llama-3.1-8b-instant',
        });
        text = chatCompletion.choices[0]?.message?.content || '';
        totalTokens = chatCompletion.usage?.total_tokens || Math.ceil(text.length / 4) + Math.ceil(prompt.length / 4);
        cost = (totalTokens / 1000000) * 0.05; // Groq Llama3 8B pricing approx
      }
      
      success = true;
    } catch (err: any) {
      success = false;
      errorContext = err.message || 'Unknown LLM Error';
      console.error('LLM Error:', err);
    }

    const durationMs = Date.now() - startTime;

    if (success) {
      updateAgentUsage(agentId, totalTokens, cost);
    }

    // 3. LOG TRACE FOR OBSERVABILITY
    const newDb = getDb(); // get fresh DB to avoid race conditions
    newDb.traces.unshift({
      id: crypto.randomUUID(),
      agentId,
      agentName: agent.name,
      success,
      durationMs,
      tokensUsed: totalTokens,
      cost,
      response: text,
      errorContext,
      timestamp: new Date().toISOString()
    });
    
    if (newDb.traces.length > 50) newDb.traces = newDb.traces.slice(0, 50);
    saveDb(newDb);

    if (!success) {
      return NextResponse.json({ status: 'error', error: errorContext }, { status: 500 });
    }

    return NextResponse.json({ status: 'success', result: text, traceId: newDb.traces[0].id });
    
  } catch (error: any) {
    console.error('Error in Proxy API route:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  }
}
