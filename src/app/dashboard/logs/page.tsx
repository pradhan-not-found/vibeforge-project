"use client";
import React, { useState, useEffect } from 'react';
import { Download, Search, CheckCircle2, ShieldAlert, Clock, GitMerge, Activity, AlertCircle, Database, Server, ChevronDown } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';
import { useAuth } from '@/context/AuthContext';

function guessLogo(name: string): { provider: string; logo: string } {
  const n = (name || '').toLowerCase();
  if (n.includes('groq')) return { provider: 'Groq', logo: '/ai-logos/groq.png' };
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
  const { user } = useAuth();
  const [db, setDb] = useState<any>({ traces: [], agents: {}, queue: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTraceId, setSelectedTraceId] = useState<string>('');

  const fetchDb = async () => {
    try {
      const res = await fetch('/api/db');
      if (res.ok) {
        const data = await res.json();
        setDb(data);
      }
    } catch (err) {
      console.error('Failed to fetch DB', err);
    }
  };

  useEffect(() => {
    fetchDb();
    const interval = setInterval(fetchDb, 800);
    return () => clearInterval(interval);
  }, []);

  // Compute active agents for this user context
  const userAgents = Object.entries(db.agents || {})
    .filter(([_, a]: [string, any]) => a.owner === user?.email)
    .reduce((acc: any, [id, a]) => { acc[id] = a; return acc; }, {});

  // Map backend traces and queue to the original log format
  const traceLogs = (db.traces || [])
    .filter((t: any) => userAgents[t.agentId])
    .map((t: any) => ({
      ...t,
      id: t.id,
      agent: t.agentName,
      logo: guessLogo(userAgents[t.agentId]?.provider || t.agentName || t.agentId).logo,
      action: 'PROMPT',
      resource: t.response ? t.response.substring(0, 50) + (t.response.length > 50 ? '...' : '') : 'Error execution',
      result: t.success ? 'Success' : 'Failure',
      reasoning: t.errorContext || `Used ${t.tokensUsed} tokens`,
      risk_score: t.success ? 0.1 : 0.9,
      time: new Date(t.timestamp).toLocaleString(),
      timestampMs: new Date(t.timestamp).getTime(),
      user: 'system_api'
    }));

  const queueLogs = (db.queue || [])
    .filter((q: any) => userAgents[q.agentId])
    .map((q: any) => ({
      ...q,
      id: q.id,
      agent: q.agentName,
      logo: guessLogo(userAgents[q.agentId]?.provider || q.agentName || q.agentId).logo,
      action: q.action || 'BLOCKED_ACTION',
      resource: q.prompt ? q.prompt.substring(0, 50) + (q.prompt.length > 50 ? '...' : '') : 'N/A',
      result: 'Blocked by Policy',
      reasoning: `Triggered: ${q.policy}`,
      risk_score: 1.0,
      time: new Date(q.time).toLocaleString(),
      timestampMs: new Date(q.time).getTime(),
      user: 'system_firewall'
    }));

  const logs = [...traceLogs, ...queueLogs].sort((a, b) => b.timestampMs - a.timestampMs);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (traceLogs.length > 0 && !selectedTraceId) {
      setSelectedTraceId(traceLogs[0].id);
    }
  }, [traceLogs.length, selectedTraceId]);

  const selectedTrace = traceLogs.find((t: any) => t.id === selectedTraceId);
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
          <div className="flex items-center gap-2 relative">
            <div className="relative min-w-[240px]">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl text-sm text-[var(--app-ink)] hover:bg-[var(--app-soft)] transition-colors"
              >
                <span className="truncate text-left flex-1">
                  {selectedTrace ? `Trace: ${new Date(selectedTrace.timestamp).toLocaleTimeString()} - ${selectedTrace.success ? 'SUCC' : 'FAIL'}` : 'Select a trace...'}
                </span>
                <ChevronDown className="w-4 h-4 text-[var(--app-muted)] shrink-0" />
              </button>
              
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-[300px] max-h-[300px] overflow-y-auto bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl shadow-xl z-50 py-1">
                    {traceLogs.map((trace: any) => (
                      <button
                        key={trace.id}
                        onClick={() => { setSelectedTraceId(trace.id); setIsDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--app-soft)] transition-colors ${selectedTraceId === trace.id ? 'bg-[var(--app-soft)] font-semibold' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{new Date(trace.timestamp).toLocaleTimeString()}</span>
                          <span className={trace.success ? 'text-emerald-600 font-medium' : 'text-red-600 font-medium'}>
                            {trace.success ? 'SUCC' : 'FAIL'}
                          </span>
                        </div>
                        <div className="text-[11px] text-[var(--app-muted)] truncate mt-0.5">
                          {trace.agentName || trace.agentId}
                        </div>
                      </button>
                    ))}
                    {traceLogs.length === 0 && <div className="px-4 py-3 text-sm text-[var(--app-muted)] text-center">No traces found</div>}
                  </div>
                </>
              )}
            </div>
            <button onClick={fetchDb} className="cta-btn-dark text-on-dark shadow-sm flex items-center justify-center gap-[10px] px-[16px] py-[10px] text-[14px] font-[500] rounded-[8px] transition-all">
              <Clock className="w-4 h-4" /> Refresh
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
          
          <div 
            className="flex-1 p-8 flex items-center justify-center overflow-x-auto relative min-h-[300px]"
            style={{
              backgroundColor: 'var(--app-canvas)',
              backgroundImage: 'radial-gradient(rgba(156, 163, 175, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: 'center'
            }}
          >
            <style>{`
              @keyframes flow-line {
                from { background-position: 24px 0; }
                to { background-position: 0 0; }
              }
              .animate-flow-line {
                background: linear-gradient(to right, #9ca3af 50%, transparent 50%);
                background-size: 12px 100%;
                animation: flow-line 0.8s linear infinite;
              }
              .animate-flow-line-success {
                background: linear-gradient(to right, #10b981 50%, transparent 50%);
                background-size: 12px 100%;
                animation: flow-line 0.8s linear infinite;
              }
              .animate-flow-line-error {
                background: linear-gradient(to right, #ef4444 50%, transparent 50%);
                background-size: 12px 100%;
                animation: flow-line 0.8s linear infinite;
              }
            `}</style>
            
            {!selectedTrace ? (
              <div className="text-[var(--app-muted)] font-medium bg-[var(--app-canvas)] px-4 py-2 rounded-lg border border-[var(--app-hairline)] shadow-sm relative z-10">
                Run a prompt in the Test LLM tab to generate a trace.
              </div>
            ) : (
              <div className="flex items-start justify-center relative mt-4 pt-6">
                
                {/* Node 1: User Request */}
                <div className="relative z-10 flex flex-col items-center gap-2 w-[120px]">
                  <div className="relative w-16 h-16 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] flex items-center justify-center group transition-transform hover:-translate-y-1">
                    <Server className="w-8 h-8 text-red-500" />
                    {/* Output port */}
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-[1.5px] border-[var(--app-canvas)] bg-gray-400"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-semibold text-[var(--app-ink)] whitespace-nowrap">User Request</div>
                    <div className="text-[11px] text-[var(--app-muted)] whitespace-nowrap">Trigger</div>
                  </div>
                </div>

                {/* Connecting Line 1 */}
                <div className="w-[40px] sm:w-[60px] relative flex items-center justify-center h-16">
                  <div className="w-full h-[2px] animate-flow-line"></div>
                </div>

                {/* Node 2: Firewall Check */}
                <div className="relative z-10 flex flex-col items-center gap-2 w-[120px]">
                  <div className="relative w-16 h-16 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] flex items-center justify-center group transition-transform hover:-translate-y-1">
                    {/* Input port */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-[1.5px] border-[var(--app-canvas)] bg-gray-400"></div>
                    <ShieldAlert className="w-8 h-8 text-[var(--app-ink)]" />
                    {/* Output port */}
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-[1.5px] border-[var(--app-canvas)] bg-gray-400"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-semibold text-[var(--app-ink)] whitespace-nowrap">Blast Radius</div>
                    <div className="text-[11px] text-[var(--app-muted)] whitespace-nowrap">Checks passed</div>
                  </div>
                </div>

                {/* Connecting Line 2 */}
                <div className="w-[40px] sm:w-[60px] relative flex items-center justify-center h-16">
                  <div className={`w-full h-[2px] ${selectedTrace.success ? 'animate-flow-line' : 'animate-flow-line-error'}`}></div>
                </div>

                {/* Node 3: Agent */}
                <div className="relative z-10 flex flex-col items-center gap-2 w-[120px]">
                  <div className={`relative w-16 h-16 bg-[var(--app-canvas)] border rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] flex items-center justify-center group transition-transform hover:-translate-y-1 ${selectedTrace.success ? 'border-[var(--app-hairline)]' : 'border-red-400 ring-2 ring-red-500/20'}`}>
                    {/* Input port */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-[1.5px] border-[var(--app-canvas)] bg-gray-400"></div>
                    
                    <img 
                      src={guessLogo(selectedTrace.agentName || selectedTrace.agentId).logo} 
                      alt="Agent" 
                      className="w-8 h-8 object-contain" 
                    />
                    
                    {/* Status Indicator (replacing output port) */}
                    <div className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--app-canvas)] shadow-sm ${selectedTrace.success ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
                  </div>
                  <div className="text-center">
                    <div className={`text-[13px] font-semibold whitespace-nowrap ${selectedTrace.success ? 'text-[var(--app-ink)]' : 'text-red-600 dark:text-red-400'}`}>{selectedTrace.agentName || 'Agent'}</div>
                    <div className="text-[11px] text-[var(--app-muted)] whitespace-nowrap">Duration: {selectedTrace.durationMs}ms</div>
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
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                
                {/* Header info */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center p-2 shadow-sm shrink-0">
                    <img src={guessLogo(selectedTrace.agentName || selectedTrace.agentId).logo} alt="Agent" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--app-ink)] tracking-tight">{selectedTrace.agentName}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${selectedTrace.success ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
                        {selectedTrace.success ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {selectedTrace.success ? 'Successful' : 'Failed'}
                      </div>
                      <span className="text-[11px] text-[var(--app-muted)] font-medium bg-[var(--app-soft)] px-2 py-0.5 rounded-md border border-[var(--app-hairline)]">
                        {selectedTrace.durationMs}ms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[12px] font-bold text-[var(--app-muted)] uppercase tracking-wider flex items-center gap-2">
                    <Database className="w-3.5 h-3.5" /> Usage Metrics
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
                      <span className="text-[13px] text-[var(--app-muted)] font-medium">Tokens Used</span>
                      <span className="text-[13px] font-medium text-[var(--app-ink)]">{selectedTrace.tokensUsed}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
                      <span className="text-[13px] text-[var(--app-muted)] font-medium">Estimated Cost</span>
                      <span className="text-[13px] font-medium text-[var(--app-ink)]">${selectedTrace.cost.toFixed(6)}</span>
                    </div>
                  </div>
                </div>

                {/* Output */}
                {selectedTrace.response && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[12px] font-bold text-[var(--app-muted)] uppercase tracking-wider flex items-center gap-2">
                      Response Payload
                    </h4>
                    <div className="rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3 text-[13px] text-[var(--app-ink)] leading-relaxed overflow-x-auto max-h-[300px]">
                      {selectedTrace.response}
                    </div>
                  </div>
                )}

                {/* Error Trace */}
                {!selectedTrace.success && selectedTrace.errorContext && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[12px] font-bold text-red-600 uppercase tracking-wider flex items-center gap-2">
                      Error Trace
                    </h4>
                    <div className="rounded-xl bg-red-50/50 border border-red-200 px-4 py-3 text-[13px] text-red-700 leading-relaxed overflow-x-auto">
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
