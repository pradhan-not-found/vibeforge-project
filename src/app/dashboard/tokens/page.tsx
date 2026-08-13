"use client";
import { useState, useEffect } from 'react';
import { CreditCard, Key } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';
import { useAuth } from '@/context/AuthContext';

import { guessLogo } from '@/lib/guessLogo';
import { useDatabase } from '@/context/DatabaseContext';

export default function Page() {
  const [tokens, setTokens] = useState<any[]>([]);
  const { user } = useAuth();
  const { dbData } = useDatabase();

  useEffect(() => {
    if (!user?.email || !dbData?.agents) return;
    
    const mapped = Object.entries(dbData.agents)
      .filter(([_, info]: [string, any]) => info.owner === user.email)
      .map(([id, info]: [string, any]) => {
        const policyId = info.policyId || 'default';
        const policy = dbData.policyProfiles?.[policyId] || dbData.policyProfiles?.['default'] || { maxTokens: 100000, maxSpend: 50 };
        
        return {
          id: id,
          name: info.name,
          provider: info.provider || 'Custom',
          logo: guessLogo(info.provider || info.name).logo,
          used: Math.round((info.totalTokens || 0) / 1000), 
          limit: Math.round((policy.maxTokens || 100000) / 1000),
          unit: 'K',
          status: 'Healthy'
        };
      });
    setTokens(mapped);
  }, [user, dbData]);

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
          <h1 className="font-sans text-4xl sm:text-5xl text-[var(--app-ink)] tracking-tight">API Tokens</h1>
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


