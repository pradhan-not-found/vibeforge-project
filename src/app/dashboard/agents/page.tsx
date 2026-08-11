'use client';

import { useState, useEffect } from 'react';

export default function AgentsPage() {
  const [db, setDb] = useState<any>(null);

  const fetchDb = async () => {
    const res = await fetch('/api/db');
    const data = await res.json();
    setDb(data);
  };

  useEffect(() => {
    fetchDb();
  }, []);

  if (!db) return <div className="p-8 text-ink-muted">Loading Agents Database...</div>;

  return (
    <div className="flex flex-col gap-8 max-w-5xl animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[550] tracking-[-0.03em] mb-1 text-[#1A1A1A]">Managed Agents</h1>
          <p className="text-[14px] text-[rgba(38,35,35,0.6)]">View and add AI agents to the Blast Radius firewall.</p>
        </div>
        <button onClick={fetchDb} className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#1A1A1A] font-medium rounded-xl hover:bg-[#FAFAF7] transition-colors text-[14px] shadow-sm">
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(db.agents || {}).map(([agentId, agent]: [string, any]) => (
          <div key={agentId} className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-[14px]">
                  {agent.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-[550] text-[#1A1A1A] text-[15px]">{agent.name}</span>
                  <span className="text-[12px] text-[rgba(38,35,35,0.5)]">Gemini SDK Proxy</span>
                </div>
              </div>
              <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] ${agent.blockedCount > 0 && agent.totalSpend >= db.policies.maxSpend ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-green-500'}`} title={agent.blockedCount > 0 ? "Blocked" : "Active"}></span>
            </div>
            
            <div className="text-[13px] text-[rgba(38,35,35,0.6)]">
              Agent ID: <span className="font-mono text-[#1A1A1A] bg-[#F5F5F5] px-1 py-0.5 rounded">{agentId}</span>
            </div>
            
            <div className="border-t border-[#E5E5E5] pt-4 mt-2 flex justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-[rgba(38,35,35,0.5)] uppercase tracking-wider">Total Tokens</span>
                <span className="font-[550] text-[#1A1A1A] text-[14px]">{agent.totalTokens.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-[rgba(38,35,35,0.5)] uppercase tracking-wider">Spend</span>
                <span className="font-[550] text-[#1A1A1A] text-[14px]">${agent.totalSpend.toFixed(6)}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-medium text-[rgba(38,35,35,0.5)] uppercase tracking-wider">Blocked</span>
                <span className="font-[550] text-red-500 text-[14px]">{agent.blockedCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
