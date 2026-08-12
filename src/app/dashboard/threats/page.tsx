"use client";
import { ShieldAlert, AlertTriangle, XCircle, Search, Filter } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';

import React, { useState, useEffect } from 'react';

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


function severityStyles(severity: string) {
  if (severity === 'Critical') return 'bg-red-50 text-red-700 ring-red-600/20';
  if (severity === 'High') return 'bg-orange-50 text-orange-700 ring-orange-600/20';
  return 'bg-amber-50 text-amber-700 ring-amber-600/20';
}

export default function Page() {
  const [threats, setThreats] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 800);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      let mapped: any[] = [];
      
      // Fetch backend audit logs
      try {
        const res = await fetch('http://localhost:8000/api/audit-logs');
        if (res.ok) {
          const data = await res.json();
          mapped = data
            .filter((item: any) => item.decision.includes('Blocked') || item.risk_score >= 80)
            .map((item: any) => ({
              id: item.id,
              agent: item.agent_name || item.agent_id || 'Unknown Agent',
              logo: guessLogo(item.agent_provider || item.agent_name || item.agent_id || '').logo,
              type: item.risk_score >= 90 ? 'Prompt Injection' : 'Data Exfiltration',
              severity: item.risk_score >= 90 ? 'Critical' : item.risk_score >= 70 ? 'High' : 'Medium',
              action: item.decision === 'Allowed' ? 'Flagged' : 'Blocked',
              time: new Date(item.created_at).toLocaleString(),
              timestampMs: new Date(item.created_at).getTime(),
              payload: item.action_text || item.reasoning
            }));
        }
      } catch (err) {
        console.error("Failed to fetch audit logs:", err);
      }
        
      let queueThreats: any[] = [];
      
      // Fetch local db queue
      try {
        const res2 = await fetch('/api/db');
        if (res2.ok) {
          const dbData = await res2.json();
          queueThreats = (dbData.queue || []).map((q: any) => ({
            id: q.id,
            agent: q.agentName,
            logo: guessLogo(dbData.agents?.[q.agentId]?.provider || q.agentName || q.agentId).logo,
            type: `Policy Violation`,
            severity: 'High',
            action: 'Blocked',
            time: new Date(q.time).toLocaleString(),
            timestampMs: new Date(q.time).getTime(),
            payload: q.prompt || q.action || `Triggered: ${q.policy}`
          }));
        }
      } catch (e) {
        // Silently ignore if db is down
      }

      const allThreats = [...mapped, ...queueThreats].sort((a, b) => b.timestampMs - a.timestampMs);
      setThreats(allThreats);
    } catch (err) {
      // Overall catch
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-down">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)] mb-3">Security</p>
          <h1 className="font-sans text-4xl sm:text-5xl text-[var(--app-ink)] tracking-tight">Threat Log</h1>
          <p className="text-sm text-[var(--app-muted)] mt-2">Review intercepted prompt injections and security anomalies.</p>
        </div>
        <div className="flex items-center gap-2 mt-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--app-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search threats..." className="pl-8 pr-4 py-2 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl text-sm text-[var(--app-ink)] placeholder:text-[var(--app-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--app-ink)]/10 w-52 shadow-sm" />
          </div>
          <button className="p-2 bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl shadow-sm hover:bg-[var(--app-soft)] text-[var(--app-muted)] transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {threats.map((threat, i) => (
          <MotionCard
            key={threat.id}
            index={i}
            className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-5 card-elevate card-depth transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Agent Logo (formerly ShieldAlert) */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center p-2.5 shadow-sm">
                <img src={threat.logo} alt={threat.agent} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1.5">
                  <span className="text-base font-semibold text-[var(--app-ink)]">{threat.agent}</span>
                  <span className="text-[var(--app-muted)]">·</span>
                  <span className="text-sm font-medium text-[var(--app-muted)]">{threat.type}</span>
                  <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${severityStyles(threat.severity)}`}>
                    {threat.severity}
                  </span>
                </div>
                <p className="text-sm font-mono text-[var(--app-muted)] truncate mb-3 max-w-2xl">{threat.payload}</p>
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                    threat.action === 'Blocked'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {threat.action === 'Blocked' ? <XCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    {threat.action}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--app-muted)] uppercase tracking-wider">{threat.id}</span>
                  <span className="ml-auto text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--app-canvas)] border border-[var(--app-hairline)] text-[var(--app-muted)]">{threat.time}</span>
                </div>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>
    </div>
  );
}



