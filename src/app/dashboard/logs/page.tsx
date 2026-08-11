"use client";
import React, { useState, useEffect } from 'react';
import { Download, Search, CheckCircle2, ShieldAlert, Clock } from 'lucide-react';
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
  if (result === 'Allowed') return { badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
  if (result.includes('Blocked')) return { badge: 'bg-red-50 text-red-700 ring-red-600/20', icon: <ShieldAlert className="w-3.5 h-3.5" /> };
  return { badge: 'bg-amber-50 text-amber-700 ring-amber-600/20', icon: <Clock className="w-3.5 h-3.5" /> };
}

export default function Page() {
  const [logs, setLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();

    const ws = new WebSocket('ws://localhost:8000/ws/audit-logs');
    
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.event === 'audit_log') {
          const newLog = {
            id: `aud_${Date.now()}`,
            agent: msg.data.agent_name || msg.data.agent_id,
            logo: guessLogo(msg.data.agent_provider || msg.data.agent_id || '').logo,
            action: 'EVALUATE',
            resource: msg.data.action.substring(0, 50) + (msg.data.action.length > 50 ? '...' : ''),
            result: msg.data.decision === 'Allowed' ? 'Allowed' : 'Blocked (Policy)',
            reasoning: msg.data.reasoning,
            risk_score: msg.data.risk_score,
            time: 'Just now',
            user: 'system_api'
          };
          setLogs(prev => [newLog, ...prev]);
        }
      } catch (err) {
        console.error("Failed to parse websocket message", err);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/audit-logs');
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map((item: any) => ({
          id: item.id,
          agent: item.agent_name || item.agent_id,
          logo: guessLogo(item.agent_provider || item.agent_name || item.agent_id || '').logo,
          action: 'EVALUATE',
          resource: item.action_text.substring(0, 50) + (item.action_text.length > 50 ? '...' : ''),
          result: item.decision === 'Allowed' ? 'Allowed' : 'Blocked (Policy)',
          reasoning: item.reasoning,
          risk_score: item.risk_score,
          time: new Date(item.created_at).toLocaleString(),
          user: 'system_api'
        }));
        setLogs(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch audit logs', err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-down">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)] mb-3">Monitoring</p>
          <h1 className="font-sans text-4xl sm:text-5xl text-[var(--app-ink)] tracking-tight">Audit Logs</h1>
          <p className="text-sm text-[var(--app-muted)] mt-2">Immutable record of every AI agent action and evaluation.</p>
        </div>
        <div className="flex items-center gap-2 mt-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--app-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..." 
              className="pl-8 pr-4 py-2 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl text-sm text-[var(--app-ink)] placeholder:text-[var(--app-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--app-ink)]/10 w-52 shadow-sm" 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--app-canvas)] border border-[var(--app-hairline)] text-[var(--app-muted)] text-sm font-medium rounded-xl shadow-sm hover:bg-[var(--app-soft)] transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Log Entries */}
      <div className="flex flex-col gap-2">
        {logs.filter(log => log.agent.toLowerCase().includes(searchTerm.toLowerCase()) || log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.resource.toLowerCase().includes(searchTerm.toLowerCase())).map((log, i) => {
          const { badge, icon } = resultStyles(log.result);
          return (
            <MotionCard
              key={log.id}
              index={i}
              className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] px-5 py-4 card-elevate card-depth"
            >
              <div className="flex items-center gap-4 w-full">
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
      </div>
    </div>
  );
}


