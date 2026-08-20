import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { getDb, saveDb, updateAgentUsage, incrementAgentBlocked } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { prompt, agentId, userId = 'admin' } = reqBody;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const db = await getDb();
    const agent = db.agents[agentId];

    if (!agent) {
      return NextResponse.json({ error: 'Unknown agent ID' }, { status: 400 });
    }
    
    const policyId = agent.policyId || 'default';
    const policy = db.policyProfiles?.[policyId] || db.policyProfiles?.['default'] || { maxTokens: 100000, maxSpend: 50 };

    // 1. BLAST RADIUS CHECK
    if (agent.totalSpend >= policy.maxSpend || agent.totalTokens >= policy.maxTokens) {
      const reason = agent.totalSpend >= policy.maxSpend ? 'Max Spend Exceeded' : 'Max Tokens Exceeded';
      
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
      await saveDb(db);
      await incrementAgentBlocked(agentId);

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
    let durationMs = 0;

    try {
      const provider = (agent.provider || '').toLowerCase();
      let apiKey = agent.provider_api_key;
      const userSettings = db.userSettings?.[userId] || {};
      
      if (!apiKey) {
        if (provider.includes('gemini') || provider.includes('google')) apiKey = userSettings.geminiApiKey;
        else if (provider.includes('groq')) apiKey = userSettings.groqApiKey;
        else if (provider.includes('openai') || provider.includes('gpt')) apiKey = userSettings.openAiApiKey;
      }

      if ((provider.includes('gemini') || provider.includes('google')) && apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        let response;
        try {
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const result = await model.generateContent(prompt);
          response = await result.response;
        } catch (err: any) {
          if (err.status === 404 || (err.message && err.message.includes('404'))) {
            try {
              const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
              const result = await fallbackModel.generateContent(prompt);
              response = await result.response;
            } catch (err2: any) {
              const finalFallback = genAI.getGenerativeModel({ model: 'gemini-pro-latest' });
              const result = await finalFallback.generateContent(prompt);
              response = await result.response;
            }
          } else {
            throw err;
          }
        }
        text = response.text();
        totalTokens = response.usageMetadata?.totalTokenCount || Math.ceil(text.length / 4) + Math.ceil(prompt.length / 4);
        cost = (totalTokens / 1000000) * 0.35; // Gemini Flash pricing
      } else if (provider.includes('groq') && apiKey) {
        const groq = new Groq({ apiKey });
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'llama-3.1-8b-instant',
        });
        text = chatCompletion.choices[0]?.message?.content || '';
        totalTokens = chatCompletion.usage?.total_tokens || Math.ceil(text.length / 4) + Math.ceil(prompt.length / 4);
        cost = (totalTokens / 1000000) * 0.05; // Groq pricing
      } else if ((provider.includes('openai') || provider.includes('gpt')) && apiKey) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }]
          })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `OpenAI Error: ${res.status}`);
        }
        const data = await res.json();
        text = data.choices[0]?.message?.content || '';
        totalTokens = data.usage?.total_tokens || Math.ceil(text.length / 4) + Math.ceil(prompt.length / 4);
        cost = (totalTokens / 1000000) * 0.15; // GPT-4o-mini approx pricing
      } else {
        // Fallback for Custom/Unsupported models OR missing API keys
        text = `Error: No valid API key provided for the ${agent.provider || 'Custom'} provider. Please add your API key in Settings or configure the Agent.`;
        throw new Error(`Missing API Key for ${provider || 'Custom'}`);
      }
      
      success = true;
    } catch (err: any) {
      success = false;
      errorContext = err.message || 'Unknown LLM Error';
      console.error('LLM Error:', err);
    }

    durationMs = Date.now() - startTime;

    if (success) {
      await updateAgentUsage(agentId, totalTokens, cost);
    }

    // 3. LOG TRACE FOR OBSERVABILITY
    const newDb = await getDb(); // get fresh DB to avoid race conditions
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
    await saveDb(newDb);

    if (!success) {
      return NextResponse.json({ status: 'error', error: errorContext }, { status: 500 });
    }

    return NextResponse.json({ status: 'success', result: text, traceId: newDb.traces[0].id });
    
  } catch (error: any) {
    console.error('Error in Proxy API route:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  }
}
