'use client';

import { useState } from 'react';
import { Send, Bot, Zap } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';

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
    <div className="p-4 sm:p-8 w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-24">
      {/* Header */}
      <div className="mb-4 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-sans font-normal tracking-tight text-[var(--app-ink)] mb-2 sm:mb-3">
          Test Agent Proxy
        </h1>
        <p className="text-sm sm:text-base text-[var(--app-muted)] max-w-2xl leading-relaxed">
          Execute a prompt against the managed agents. If the budget is exceeded, it will be blocked by the firewall.
        </p>
      </div>

      <MotionCard
        index={1}
        className="bg-[var(--app-canvas)] rounded-2xl border-2 border-[var(--app-hairline)] p-4 sm:p-6 card-elevate card-depth"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-[var(--app-muted)] uppercase">
              Select Agent Identity
            </label>
            <div className="relative">
              <select 
                value={agentId} 
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full bg-[var(--app-soft)] border border-[var(--app-hairline)] rounded-xl pl-10 pr-4 py-3 text-sm text-[var(--app-ink)] font-medium focus:outline-none focus:border-[var(--app-ink)] transition-all appearance-none"
              >
                <option value="gemini-flash">Gemini Web Researcher (Google Generative AI)</option>
                <option value="groq-agent">Groq Data Scraper (Llama 3.1 8B Instant via Groq SDK)</option>
              </select>
              <Bot className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--app-muted)]" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-[var(--app-muted)] uppercase">
              Agent Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. What is the capital of France?"
              className="w-full h-32 bg-[var(--app-soft)] border border-[var(--app-hairline)] rounded-xl p-4 text-sm text-[var(--app-ink)] resize-none focus:outline-none focus:border-[var(--app-ink)] transition-all"
            />
          </div>
          
          <div className="flex justify-end mt-2">
            <button 
              type="submit" 
              disabled={loading || !prompt}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--app-ink)] text-[var(--app-canvas)] font-medium rounded-xl hover:opacity-90 transition-opacity text-sm shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-[var(--app-canvas)] border-t-transparent animate-spin"></span>
              ) : (
                <Send className="w-4 h-4" />
              )}
              Execute Prompt
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-red-800 dark:text-red-300">Execution Blocked</span>
              <span className="text-sm text-red-700 dark:text-red-400 mt-1 leading-relaxed">{error}</span>
            </div>
          </div>
        )}

        {response && (
          <div className="mt-6 flex flex-col gap-3">
            <span className="text-xs font-bold tracking-widest text-[var(--app-muted)] uppercase">
              Agent Response
            </span>
            <div className="p-5 bg-[var(--app-soft)] border border-[var(--app-hairline)] rounded-xl text-sm text-[var(--app-ink)] leading-relaxed whitespace-pre-wrap font-mono">
              {response}
            </div>
          </div>
        )}
      </MotionCard>
    </div>
  );
}
