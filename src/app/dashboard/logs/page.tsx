"use client";
import React, { useState, useEffect } from 'react';
import { Download, Search, CheckCircle2, ShieldAlert, Clock, GitMerge, Activity, AlertCircle, Database, Server } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';

function guessLogo(name: string): { provider: string; logo: string } {
  const n = (name || '').toLowerCase();
  if (n.includes('gpt') || n.includes('openai') || n.includes(' o1') || n.includes(' o3')) return { provider: 'OpenAI',      logo: '/ai-logos/openai.svg'      };
  if (n.includes('claude code') || n.includes('claudecode'))                                  return { provider: 'Anthropic',   logo: '/ai-logos/claudecode.png'  };
  if (n.includes('claude') || n.includes('anthropic') || n.includes('sonnet') || n.includes('opus') || n.includes('haiku')) return { provider: 'Anthropic', logo: '/ai-logos/claude.png' };
  if (n.includes('gemma'))                                                                    return { provider: 'Google',      logo: '/ai-logos/gemma.png'       };
  if (n.includes('gemini') || n.includes('google') || n.includes('bard'))                    return { provider: 'Google',      logo: '/ai-logos/gemini.svg'      };
  if (n.includes('llama') || n.includes('meta'))                                              return { provider: 'Meta',        logo: '/ai-logos/meta.svg'        };
  if (n.includes('mistral') || n.includes('mixtral'))                                         return { provider: 'Mistral',     logo: '/ai-logos/mistral.svg'     };
  if (n.includes('deepseek'))                                                                  return { provider: 'DeepSeek',    logo: '/ai-logos/deepseek.svg'    };
  if (n.includes('grok') || n.includes('xai'))                                                return { provider: 'xAI',         logo: '/ai-logos/xai.svg'         };
  if (n.includes('perplexity'))                                                               return { provider: 'Perplexity',  logo: '/ai-logos/perplexity.svg'  };
  if (n.includes('qwen') || n.includes('alibaba'))                                            return { provider: 'Alibaba',     logo: '/ai-logos/qwen.svg'        };
  if (n.includes('kimi') || n.includes('moonshot'))                                           return { provider: 'Moonshot',    logo: '/ai-logos/kimi.png'        };
  if (n.includes('ollama') || n.includes('local'))                                            return { provider: 'Ollama',      logo: '/ai-logos/ollama.svg'      };
  if (n.includes('hugging') || n.includes('hf'))                                              return { provider: 'HuggingFace', logo: '/ai-logos/huggingface.svg' };
  if (n.includes('cursor'))                                                                   return { provider: 'Cursor',      logo: '/ai-logos/cursor.svg'      };
  if (n.includes('github') || n.includes('copilot'))                                          return { provider: 'GitHub',      logo: '/ai-logos/github.svg'      };
  return { provider: 'Custom', logo: '/ai-logos/openai.svg' };
}

function resultStyles(result: string) {
  if (result === 'Allowed' || result === 'Success') return { badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
  if (result.includes('Blocked') || result.includes('Failure')) return { badge: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20', icon: <ShieldAlert className="w-3.5 h-3.5" /> };
  return { badge: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20', icon: <Clock className="w-3.5 h-3.5" /> };
}

export default function Page() {
  const [db, setDb] = useState<any>({ traces: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTraceId, setSelectedTraceId] = useState<string>('');

  const fetchDb = async () => {
    try {
      const res = await fetch('/api/db');
      if (res.ok) {
        const data = await res.json();
        setDb(data);
        if (data.traces?.length > 0 && !selectedTraceId) {
          setSelectedTraceId(data.traces[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch DB', err);
    }
  };

  useEffect(() => {
    fetchDb();
    const interval = setInterval(fetchDb, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectedTrace = db.traces?.find((t: any) => t.id === selectedTraceId);

  // Map backend traces to the original log format
  const logs = (db.traces || []).map((t: any) => ({
    id: t.id,
    agent: t.agentName,
    logo: guessLogo(t.agentId).logo,
    action: 'PROMPT',
    resource: t.response ? t.response.substring(0, 50) + (t.response.length > 50 ? '...' : '') : 'Error execution',
    result: t.success ? 'Success' : 'Failure',
    reasoning: t.errorContext || `Used ${t.tokensUsed} tokens`,
    risk_score: t.success ? 0.1 : 0.9,
    time: new Date(t.timestamp).toLocaleString(),
    user: 'system_api'
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-down flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)] mb-3">Monitoring</p>
          <h1 className="font-sans text-4xl sm:text-5xl text-[var(--app-ink)] tracking-tight">Audit Logs & Observability</h1>
          <p className="text-sm text-[var(--app-muted)] mt-2">Immutable record of every AI agent action and evaluation.</p>
        </div>
        <div className="flex flex-col items-end gap-2 mt-2 shrink-0">
          <div className="flex items-center gap-2">
            <select 
              value={selectedTraceId} 
              onChange={(e) => setSelectedTraceId(e.target.value)}
              className="px-4 py-2 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl text-sm text-[var(--app-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--app-ink)]/10 shadow-sm min-w-[200px]"
            >
              <option value="" disabled>Select a trace...</option>
              {db.traces?.map((trace: any) => (
                <option key={trace.id} value={trace.id}>
                  Trace: {new Date(trace.timestamp).toLocaleTimeString()} - {trace.success ? 'SUCC' : 'FAIL'}
                </option>
              ))}
              {db.traces?.length === 0 && <option value="">No traces found</option>}
            </select>
            <button onClick={fetchDb} className="flex items-center gap-2 px-4 py-2 bg-[var(--app-canvas)] border border-[var(--app-hairline)] text-[var(--app-muted)] text-sm font-medium rounded-xl shadow-sm hover:bg-[var(--app-soft)] transition-colors">
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mb-8">
        {/* GRAPH VISUALIZER (Left 2/3) */}
        <MotionCard index={0} className="lg:col-span-2 bg-[var(--app-canvas)] rounded-2xl border border-[var(--app-hairline)] card-elevate flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[var(--app-hairline)] flex items-center justify-between bg-[var(--app-soft)]">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[var(--app-ink)]">
              <GitMerge className="w-4 h-4 text-[var(--app-muted)]" />
              Workflow Execution Graph
            </div>
          </div>
          
          <div className="flex-1 p-8 flex items-center justify-center bg-[var(--app-soft)] overflow-x-auto relative min-h-[300px]">
            {!selectedTrace ? (
              <div className="text-[var(--app-muted)] font-medium">Run a prompt in the Test LLM tab to generate a trace.</div>
            ) : (
              <div className="flex items-center gap-16 relative">
                
                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <path d="M 120 40 L 220 40" stroke="var(--app-hairline)" strokeWidth="2" fill="none" strokeDasharray="4" />
                  <path d="M 380 40 L 480 40" stroke={selectedTrace.success ? '#10b981' : '#e05252'} strokeWidth="2" fill="none" strokeDasharray="4" className={!selectedTrace.success ? "animate-pulse" : ""} />
                </svg>

                {/* Node 1: User Request */}
                <div className={`relative z-10 flex flex-col items-center gap-3 w-[160px]`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md bg-[var(--app-canvas)] border-2 border-[var(--app-ink)]`}>
                    <Server className="w-8 h-8 text-[var(--app-ink)]" />
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-semibold text-[var(--app-ink)]">User Request</div>
                  </div>
                </div>

                {/* Node 2: Firewall Check */}
                <div className={`relative z-10 flex flex-col items-center gap-3 w-[160px]`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md bg-[var(--app-canvas)] border-2 border-emerald-500 ring-4 ring-emerald-500/10`}>
                    <ShieldAlert className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-semibold text-[var(--app-ink)]">Blast Radius Proxy</div>
                    <div className="text-[11px] text-[var(--app-muted)]">Checks passed</div>
                  </div>
                </div>

                {/* Node 3: Agent */}
                <div className={`relative z-10 flex flex-col items-center gap-3 w-[160px]`}>
                  {!selectedTrace.success && (
                    <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg z-20 animate-bounce">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md border-2 ${selectedTrace.success ? 'bg-[var(--app-canvas)] border-emerald-500 ring-4 ring-emerald-500/10' : 'bg-red-950/20 border-red-500 ring-4 ring-red-500/20'}`}>
                    {selectedTrace.success ? <CheckCircle2 className="w-8 h-8 text-emerald-500" /> : <AlertCircle className="w-8 h-8 text-red-500" />}
                  </div>
                  <div className="text-center">
                    <div className={`text-[13px] font-semibold ${selectedTrace.success ? 'text-[var(--app-ink)]' : 'text-red-500'}`}>{selectedTrace.agentName}</div>
                    <div className="text-[11px] text-[var(--app-muted)]">Duration: {selectedTrace.durationMs}ms</div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </MotionCard>

        {/* INSPECTOR PANEL (Right 1/3) */}
        <MotionCard index={1} className="bg-[var(--app-canvas)] rounded-2xl border border-[var(--app-hairline)] card-elevate flex flex-col h-[500px] lg:h-auto overflow-hidden">
          <div className="p-4 border-b border-[var(--app-hairline)] flex items-center gap-2 bg-[var(--app-soft)]">
            <Activity className="w-4 h-4 text-[var(--app-muted)]" />
            <h2 className="text-[14px] font-semibold text-[var(--app-ink)]">Inspector</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
            {selectedTrace ? (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[16px] font-bold text-[var(--app-ink)]">{selectedTrace.agentName}</h3>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold w-max mt-1 border ${selectedTrace.success ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-red-500/10 text-red-600 border-red-500/20'}`}>
                    {selectedTrace.success ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {selectedTrace.success ? 'Completed Successfully' : 'Failure Detected'}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--app-muted)] uppercase tracking-wider">
                    <Database className="w-3.5 h-3.5" />
                    Agent Metrics
                  </div>
                  <div className="bg-[var(--app-soft)] p-3 rounded-xl border border-[var(--app-hairline)] text-[13px] text-[var(--app-ink)] leading-relaxed flex flex-col gap-1">
                    <div><strong>Tokens Used:</strong> {selectedTrace.tokensUsed}</div>
                    <div><strong>Estimated Cost:</strong> ${selectedTrace.cost.toFixed(6)}</div>
                  </div>
                </div>

                {selectedTrace.response && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--app-muted)] uppercase tracking-wider">
                      Response Output
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#333333] shadow-inner text-[12px] text-gray-300 leading-relaxed overflow-x-auto max-h-[250px]">
                      {selectedTrace.response}
                    </div>
                  </div>
                )}

                {!selectedTrace.success && selectedTrace.errorContext && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--app-muted)] uppercase tracking-wider">
                      Error Trace
                    </div>
                    <div className="bg-red-950/20 p-4 rounded-xl border border-red-900/30 text-[13px] text-red-400 leading-relaxed overflow-x-auto">
                      {selectedTrace.errorContext}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[14px] text-[var(--app-muted)] text-center mt-10">Select a trace to view details.</div>
            )}
            
          </div>
        </MotionCard>
      </div>

      {/* Log Entries (Below the Graph) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--app-ink)]">All Traces</h2>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--app-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search traces..." 
              className="pl-8 pr-4 py-2 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl text-sm text-[var(--app-ink)] placeholder:text-[var(--app-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--app-ink)]/10 w-52 shadow-sm" 
            />
          </div>
        </div>
        
        {logs.filter((log: any) => log.agent.toLowerCase().includes(searchTerm.toLowerCase()) || log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.resource.toLowerCase().includes(searchTerm.toLowerCase())).map((log: any, i: number) => {
          const { badge, icon } = resultStyles(log.result);
          return (
            <MotionCard
              key={log.id}
              index={i + 2}
              className={`bg-[var(--app-soft)] rounded-2xl border-2 px-5 py-4 card-elevate card-depth cursor-pointer transition-colors ${selectedTraceId === log.id ? 'border-[var(--app-ink)]' : 'border-[var(--app-hairline)] hover:border-[var(--app-muted)]'}`}
            >
              <div 
                className="flex items-center gap-4 w-full"
                onClick={() => setSelectedTraceId(log.id)}
              >
                {/* Action badge */}
                <div className="shrink-0 min-w-14 h-10 px-2 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center shadow-sm">
                  <span className="text-[8px] font-bold text-[var(--app-muted)] uppercase tracking-wider leading-tight text-center">{log.action.replace('_', ' ')}</span>
                </div>

                {/* Agent */}
                <div className="shrink-0 w-48 min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <img src={log.logo} alt={log.agent} className="w-4 h-4 object-contain shrink-0" />
                    <span className="text-sm font-semibold text-[var(--app-ink)] truncate">{log.agent}</span>
                  </div>
                  <span className="text-[10px] text-[var(--app-muted)] uppercase tracking-wide">{log.user}</span>
                </div>

                {/* Resource */}
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-sm font-mono text-[var(--app-muted)] truncate block">{log.resource}</span>
                </div>

                {/* Result */}
                <div className="flex flex-col gap-1 items-start shrink-0 w-56 pr-4">
                  <div className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${badge}`}>
                    {icon}
                    {log.result}
                  </div>
                  {log.reasoning && (
                    <div className="text-[10px] text-[var(--app-muted)] text-left truncate w-full" title={log.reasoning}>
                      {log.reasoning}
                    </div>
                  )}
                </div>

                {/* Time */}
                <div className="shrink-0 w-36">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--app-canvas)] border border-[var(--app-hairline)] text-[var(--app-muted)]">{log.time}</span>
                </div>

                {/* ID */}
                <div className="shrink-0 hidden lg:block w-32">
                  <span className="text-[10px] font-mono text-[var(--app-muted)] uppercase tracking-wider">{log.id}</span>
                </div>
              </div>
            </MotionCard>
          );
        })}
        {logs.length === 0 && (
          <div className="p-8 text-center text-[var(--app-muted)] font-medium">
            No traces generated yet.
          </div>
        )}
      </div>
    </div>
  );
}
