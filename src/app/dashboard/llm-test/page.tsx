'use client';

import { useState } from 'react';
import { Send, Bot, Zap } from 'lucide-react';

export default function LLMTestPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agentId, setAgentId] = useState('gemini-flash');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, agentId }),
      });

      const data = await res.json();

      if (data.status === 'blocked') {
        setError(data.error);
      } else if (data.status === 'error') {
        setError(data.error);
      } else {
        setResponse(data.result);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-[550] tracking-[-0.03em] mb-1 text-[#1A1A1A]">Test Agent Proxy</h1>
        <p className="text-[14px] text-[rgba(38,35,35,0.6)]">Execute a prompt against the managed agents. If the budget is exceeded, it will be blocked by the firewall.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[rgba(38,35,35,0.7)] uppercase tracking-wider">Select Agent Identity</label>
            <div className="relative">
              <select 
                value={agentId} 
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full bg-[#FDFDFB] border border-[#E5E5E5] rounded-xl pl-10 pr-4 py-3 text-[14px] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all appearance-none"
              >
                <option value="gemini-flash">Gemini Web Researcher (Google Generative AI)</option>
                <option value="groq-agent">Groq Data Scraper (Llama 3.1 8B Instant via Groq SDK)</option>
              </select>
              <Bot className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(38,35,35,0.4)]" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[rgba(38,35,35,0.7)] uppercase tracking-wider">Agent Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. What is the capital of France?"
              className="w-full h-32 bg-[#FDFDFB] border border-[#E5E5E5] rounded-xl p-4 text-[14px] text-[#1A1A1A] resize-none focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all"
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={loading || !prompt}
              className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-xl hover:bg-[#333333] transition-colors text-[14px] shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              ) : (
                <Send className="w-4 h-4" />
              )}
              Execute Prompt
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-red-800">Execution Blocked</span>
              <span className="text-[13px] text-red-700 mt-1 leading-relaxed">{error}</span>
            </div>
          </div>
        )}

        {response && (
          <div className="mt-4 flex flex-col gap-3">
            <span className="text-[13px] font-semibold text-[rgba(38,35,35,0.7)] uppercase tracking-wider">Agent Response</span>
            <div className="p-5 bg-[#FAFAF7] border border-[#E5E5E5] rounded-xl text-[14px] text-[#1A1A1A] leading-relaxed whitespace-pre-wrap font-mono">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
