'use client';

import { useState, useEffect } from 'react';
import { Shield, Settings, AlertTriangle, CheckCircle2, XCircle, Database, Lock, Search, CreditCard, Terminal, Bot } from 'lucide-react';

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState('caps');
  const [db, setDb] = useState<any>(null);
  
  const [maxSpend, setMaxSpend] = useState(50);
  const [maxTokens, setMaxTokens] = useState(100000);

  const fetchDb = async () => {
    const res = await fetch('/api/db');
    const data = await res.json();
    setDb(data);
    setMaxSpend(data.policies?.maxSpend || 50);
    setMaxTokens(data.policies?.maxTokens || 100000);
  };

  useEffect(() => {
    fetchDb();
  }, []);

  const savePolicies = async () => {
    await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_policies',
        policies: { maxSpend: Number(maxSpend), maxTokens: Number(maxTokens) }
      })
    });
    alert('Policies saved successfully!');
    fetchDb();
  };

  const clearQueueItem = async (id: string) => {
    await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear_queue_item', id })
    });
    fetchDb();
  };

  if (!db) return <div className="p-8 text-[rgba(38,35,35,0.5)]">Loading Firewall Database...</div>;

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-[550] tracking-[-0.03em] mb-1 text-[#1A1A1A]">Blast Radius Controller</h1>
          <p className="text-[14px] text-[rgba(38,35,35,0.6)]">Configure hard limits, manage secure credentials, and review paused agent actions.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(34,197,94,0.1)] text-green-700 rounded-lg text-[12px] font-medium border border-[rgba(34,197,94,0.2)]">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
            Firewall Active
          </span>
          <button onClick={savePolicies} className="px-4 py-2 bg-[#1A1A1A] text-white font-medium rounded-xl hover:bg-[#333333] transition-colors text-[14px] shadow-sm">
            Save Policies
          </button>
        </div>
      </div>

      {/* Custom Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E5E5E5]">
        {[
          { id: 'caps', label: 'Spend & Scope Caps', icon: Shield },
          { id: 'queue', label: `Approval Queue (${db.queue?.length || 0})`, icon: AlertTriangle },
          { id: 'credentials', label: 'Integration Bindings', icon: Lock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-[14px] font-medium transition-all relative ${
              activeTab === tab.id 
                ? 'text-[#1A1A1A]' 
                : 'text-[rgba(38,35,35,0.5)] hover:text-[#1A1A1A] hover:bg-[rgba(0,0,0,0.02)] rounded-t-lg'
            }`}
          >
            <tab.icon className={`w-[16px] h-[16px] ${activeTab === tab.id ? 'text-indigo-600' : ''}`} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#1A1A1A]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-6">
        
        {/* SPEND & SCOPE CAPS */}
        {activeTab === 'caps' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
            
            {/* Monetary & Token Limits */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <CreditCard className="w-[18px] h-[18px] text-indigo-600" />
                </div>
                <h2 className="text-[16px] font-semibold text-[#1A1A1A]">Monetary & Token Caps</h2>
              </div>
              
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[rgba(38,35,35,0.7)] uppercase tracking-wider">Max Spend Per Session</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(38,35,35,0.5)] font-medium">$</span>
                    <input 
                      type="number" 
                      value={maxSpend} 
                      onChange={(e) => setMaxSpend(Number(e.target.value))}
                      className="w-full bg-[#FDFDFB] border border-[#E5E5E5] rounded-xl pl-7 pr-4 py-2.5 text-[14px] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all" 
                    />
                  </div>
                  <p className="text-[12px] text-[rgba(38,35,35,0.5)]">Automatically pauses the agent if API costs exceed this amount.</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[rgba(38,35,35,0.7)] uppercase tracking-wider">Max Tokens Per Run</label>
                  <input 
                    type="number" 
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(Number(e.target.value))} 
                    className="w-full bg-[#FDFDFB] border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-[14px] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Execution & Loop Boundaries */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Terminal className="w-[18px] h-[18px] text-orange-600" />
                </div>
                <h2 className="text-[16px] font-semibold text-[#1A1A1A]">Execution Boundaries</h2>
              </div>
              
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[rgba(38,35,35,0.7)] uppercase tracking-wider">Loop Detection Limit</label>
                  <select className="w-full bg-[#FDFDFB] border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-[14px] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all">
                    <option>3 identical tool calls</option>
                    <option>5 identical tool calls</option>
                    <option>10 identical tool calls</option>
                  </select>
                  <p className="text-[12px] text-[rgba(38,35,35,0.5)]">Flags for human review if the agent gets stuck in a loop.</p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <label className="flex items-center gap-3 p-3 border border-[#E5E5E5] rounded-xl bg-[#FAFAF7] cursor-pointer hover:bg-white transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-[#1A1A1A]">Block Destructive DB Ops</span>
                      <span className="text-[12px] text-[rgba(38,35,35,0.5)]">Intercept DROP, DELETE, TRUNCATE queries.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APPROVAL QUEUE */}
        {activeTab === 'queue' && (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden animate-in fade-in duration-300">
            <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAF7]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                <h2 className="text-[15px] font-semibold text-[#1A1A1A]">Workflows Pending Approval</h2>
              </div>
              <button onClick={fetchDb} className="text-[12px] font-medium text-indigo-600 hover:text-indigo-800">Refresh Queue</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E5E5] text-[11px] text-[rgba(38,35,35,0.5)] font-semibold uppercase tracking-wider">
                    <th className="px-5 py-4 font-medium">Agent</th>
                    <th className="px-5 py-4 font-medium">Attempted Action</th>
                    <th className="px-5 py-4 font-medium">Triggered Policy</th>
                    <th className="px-5 py-4 font-medium">Time Paused</th>
                    <th className="px-5 py-4 font-medium text-right">Human Decision</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {db.queue?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-[rgba(38,35,35,0.5)] font-medium">No workflows are currently paused.</td>
                    </tr>
                  ) : db.queue?.map((row: any) => (
                    <tr key={row.id} className="border-b border-[#E5E5E5] last:border-0 hover:bg-[#FAFAF7] transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1A1A1A] flex items-center gap-2">
                        <Bot className="w-4 h-4 text-[rgba(38,35,35,0.4)]" />
                        {row.agentName}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-[11.5px] text-[rgba(38,35,35,0.8)] bg-white rounded-lg px-2.5 py-1.5 border border-[#E5E5E5]">
                          {row.action}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md text-orange-700 bg-orange-50 border border-orange-200">
                          {row.policy}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[rgba(38,35,35,0.6)]">
                        {new Date(row.time).toLocaleTimeString()}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => clearQueueItem(row.id)} className="p-1.5 text-[rgba(38,35,35,0.4)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors group relative" title="Deny & Terminate">
                            <XCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => clearQueueItem(row.id)} className="p-1.5 text-[rgba(38,35,35,0.4)] hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve & Continue">
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INTEGRATION BINDINGS */}
        {activeTab === 'credentials' && (
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] animate-in fade-in duration-300">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-[16px] font-semibold text-[#1A1A1A]">Secure Credential Vault</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: 'Gemini API Key', type: 'API Key', agents: ['Gemini Web Researcher'], icon: Shield },
                 { name: 'AWS Production Read-Only', type: 'IAM Role', agents: ['Data Scraper Bot'], icon: Database },
               ].map((cred, i) => (
                 <div key={i} className="border border-[#E5E5E5] rounded-xl p-4 flex flex-col gap-4 bg-[#FAFAF7] hover:bg-white transition-colors cursor-pointer group">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E5E5] flex items-center justify-center text-[rgba(38,35,35,0.6)] group-hover:text-indigo-600 transition-colors">
                         <cred.icon className="w-4 h-4" />
                       </div>
                       <div className="flex flex-col">
                         <span className="font-semibold text-[#1A1A1A] text-[14px]">{cred.name}</span>
                         <span className="text-[12px] text-[rgba(38,35,35,0.5)]">{cred.type}</span>
                       </div>
                     </div>
                   </div>
                   <div className="pt-3 border-t border-[#E5E5E5] flex flex-col gap-2">
                     <span className="text-[11px] font-semibold text-[rgba(38,35,35,0.5)] uppercase tracking-wider">Permitted Agents</span>
                     <div className="flex flex-wrap gap-2">
                       {cred.agents.map((agent, j) => (
                         <span key={j} className="text-[11px] font-medium px-2 py-1 bg-white border border-[#E5E5E5] text-[#1A1A1A] rounded-md flex items-center gap-1.5 shadow-sm">
                           <Bot className="w-3 h-3 text-indigo-600" />
                           {agent}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
