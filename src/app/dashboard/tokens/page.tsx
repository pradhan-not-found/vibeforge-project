"use client";
import { useState, useEffect } from 'react';
import { CreditCard, Key } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';
import { useAuth } from '@/context/AuthContext';

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

export default function Page() {
  const [tokens, setTokens] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const email = user?.email || 'admin';
    fetch(`http://localhost:8000/api/agents?user_id=${email}`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((agent: any, i: number) => {
          const usedTokens = agent.action_count ? (agent.action_count * 1200) : (100 * (i + 1));
          const limitTokens = 500000;
          return {
            id: agent.id,
            name: agent.name,
            provider: agent.provider || 'Custom',
            logo: guessLogo(agent.provider || agent.name).logo,
            used: Math.round(usedTokens / 1000), 
            limit: Math.round(limitTokens / 1000),
            unit: 'K',
            status: 'Healthy'
          };
        });
        setTokens(mapped);
      })
      .catch(err => console.error(err));
  }, [user]);

  const handleTopUpAll = () => {
    setTokens(tokens.map(t => ({ ...t, used: 0, status: 'Healthy' })));
  };

  const handleManageLimit = (id: string) => {
    setTokens(tokens.map(t => t.id === id ? { ...t, used: 0, status: 'Healthy' } : t));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-down">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)] mb-3">System</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[var(--app-ink)] tracking-tight">API Tokens</h1>
          <p className="text-sm text-[var(--app-muted)] mt-2">Track real-time token usage and limits for each of your agents.</p>
        </div>
        <button 
          onClick={handleTopUpAll}
          className="shrink-0 mt-2 flex items-center gap-2 px-5 py-2.5 bg-[var(--app-ink)] text-[var(--app-canvas)] text-sm font-semibold rounded-xl hover:opacity-80 transition-opacity shadow-sm"
        >
          <CreditCard className="w-4 h-4" /> Top Up All
        </button>
      </div>

      {/* Token Rows */}
      <div className="flex flex-col gap-3">
        {tokens.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-[var(--app-canvas)] border border-[var(--app-hairline)] border-dashed rounded-2xl">
            <Key className="w-12 h-12 text-[var(--app-muted)] opacity-20 mb-4" />
            <p className="text-sm text-[var(--app-muted)] text-center max-w-sm">No agents registered yet. Head over to the Agent Registry to deploy your first Checkpost agent.</p>
          </div>
        ) : tokens.map((token, i) => {
          const percentage = (token.used / token.limit) * 100;
          const isExhausted = percentage >= 100;
          const isWarning = percentage >= 85 && percentage < 100;

          return (
            <MotionCard
              key={token.id}
              index={i}
              className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-5 card-elevate card-depth"
            >
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] p-2 flex items-center justify-center shadow-sm">
                  <img src={token.logo} alt={token.provider} className="w-full h-full object-contain" />
                </div>

                {/* Name + ID */}
                <div className="shrink-0 w-52">
                  <p className="text-sm font-semibold text-[var(--app-ink)] truncate">{token.name}</p>
                  <p className="text-[10px] font-mono text-[var(--app-muted)] uppercase tracking-wider">{token.id}</p>
                </div>

                {/* Progress bar */}
                <div className="flex-1 min-w-0">
                  <div className="w-full bg-[var(--app-hairline)] rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${isExhausted ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-[var(--app-ink)]'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Usage label */}
                <div className="shrink-0 text-right w-32">
                  <p className={`text-sm font-bold ${isExhausted ? 'text-red-600' : 'text-[var(--app-ink)]'}`}>
                    {token.used}{token.unit} <span className="text-[var(--app-muted)] font-medium">/ {token.limit}{token.unit}</span>
                  </p>
                  {isExhausted && <p className="text-[10px] font-semibold text-red-500 uppercase tracking-wide">Limit Reached</p>}
                  {isWarning && <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-wide">{Math.round(percentage)}% used</p>}
                </div>

                {/* Action */}
                <button 
                  onClick={() => handleManageLimit(token.id)}
                  className={`shrink-0 px-4 py-1.5 text-xs font-semibold rounded-xl transition-colors shadow-sm ${
                    isExhausted
                      ? 'bg-[var(--app-ink)] text-[var(--app-canvas)] hover:opacity-80'
                      : 'bg-[var(--app-canvas)] border border-[var(--app-hairline)] text-[var(--app-muted)] hover:bg-[var(--app-soft)]'
                  }`}
                >
                  {isExhausted ? 'Pay & Upgrade' : 'Reset Usage'}
                </button>
              </div>
            </MotionCard>
          );
        })}
      </div>
    </div>
  );
}

