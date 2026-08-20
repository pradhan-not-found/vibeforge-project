"use client";
import { ShieldAlert, AlertTriangle, XCircle, Search, Filter } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';
import { useDatabase } from '@/context/DatabaseContext';

import React, { useState, useEffect } from 'react';

import { guessLogo } from '@/lib/guessLogo';


import { useAuth } from '@/context/AuthContext';

function severityStyles(severity: string) {
  if (severity === 'Critical') return 'bg-red-50 text-red-700 ring-red-600/20';
  if (severity === 'High') return 'bg-orange-50 text-orange-700 ring-orange-600/20';
  return 'bg-amber-50 text-amber-700 ring-amber-600/20';
}

export default function Page() {
  const { user } = useAuth();
  const { dbData } = useDatabase();
  const [threats, setThreats] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!dbData || !user?.email) return;

    const userAgents = Object.entries(dbData.agents || {})
      .filter(([_, a]: [string, any]) => a.owner === user.email)
      .reduce((acc: any, [id, a]) => { acc[id] = a; return acc; }, {});

    // For threats we look at traces that failed/blocked and the queue
    const traceThreats = (dbData.traces || [])
      .filter((t: any) => userAgents[t.agentId] && !t.success)
      .map((t: any) => ({
        id: t.id,
        agent: t.agentName || t.agentId || 'Unknown Agent',
        logo: guessLogo(userAgents[t.agentId]?.provider || t.agentName || t.agentId || '').logo,
        type: 'Execution Blocked / Error',
        severity: 'High',
        action: 'Blocked',
        time: new Date(t.timestamp).toLocaleString(),
        timestampMs: new Date(t.timestamp).getTime(),
        payload: t.errorContext || 'Trace failed during execution'
      }));

    const queueThreats = (dbData.queue || [])
      .filter((q: any) => userAgents[q.agentId])
      .map((q: any) => ({
        id: q.id,
        agent: q.agentName,
        logo: guessLogo(userAgents[q.agentId]?.provider || q.agentName || q.agentId).logo,
        type: `Policy Violation`,
        severity: q.policy.includes('Max Spend') ? 'Critical' : 'High',
        action: 'Blocked',
        time: new Date(q.time).toLocaleString(),
        timestampMs: new Date(q.time).getTime(),
        payload: q.prompt || q.action || `Triggered: ${q.policy}`
      }));

    const allThreats = [...traceThreats, ...queueThreats].sort((a, b) => b.timestampMs - a.timestampMs);
    setThreats(allThreats);
  }, [dbData, user]);

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



