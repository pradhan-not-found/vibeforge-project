'use client';

import { useState, useEffect } from 'react';
import { Activity, GitMerge, AlertCircle, Database, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ObservabilityPage() {
  const [db, setDb] = useState<any>(null);
  const [selectedTrace, setSelectedTrace] = useState<any>(null);

  const fetchDb = async () => {
    const res = await fetch('/api/db');
    const data = await res.json();
    setDb(data);
    if (data.traces?.length > 0 && !selectedTrace) {
      setSelectedTrace(data.traces[0]);
    }
  };

  useEffect(() => {
    fetchDb();
  }, []);

  if (!db) return <div className="p-8 text-[rgba(38,35,35,0.5)]">Loading Observability Data...</div>;

  return (
    <div className="flex flex-col gap-8 h-full max-w-[1200px] mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-[550] tracking-[-0.03em] mb-1 text-[#1A1A1A]">Agent Observability</h1>
          <p className="text-[14px] text-[rgba(38,35,35,0.6)]">Trace multi-agent workflows, shared memory states, and pinpoint hallucinations.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="bg-white border border-[#E5E5E5] rounded-xl px-4 py-2 text-[14px] font-medium text-[#1A1A1A] shadow-sm outline-none"
            onChange={(e) => setSelectedTrace(db.traces.find((t: any) => t.id === e.target.value))}
            value={selectedTrace?.id || ''}
          >
            {db.traces?.map((trace: any) => (
              <option key={trace.id} value={trace.id}>
                Trace: {new Date(trace.timestamp).toLocaleTimeString()} - {trace.success ? 'SUCC' : 'FAIL'}
              </option>
            ))}
            {db.traces?.length === 0 && <option value="">No traces found</option>}
          </select>
          <button onClick={fetchDb} className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#1A1A1A] font-medium rounded-xl hover:bg-[#FAFAF7] transition-colors text-[14px] shadow-sm">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* GRAPH VISUALIZER (Left 2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAF7]">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#1A1A1A]">
              <GitMerge className="w-4 h-4 text-[rgba(38,35,35,0.5)]" />
              Workflow Execution Graph
            </div>
          </div>
          
          <div className="flex-1 p-8 flex items-center justify-center bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-[rgba(250,250,247,0.5)] overflow-x-auto relative">
            
            {!selectedTrace ? (
              <div className="text-[rgba(38,35,35,0.5)] font-medium">Run a prompt in the Test LLM tab to generate a trace.</div>
            ) : (
              <div className="flex items-center gap-16 relative">
                
                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <path d="M 120 40 L 220 40" stroke="#E5E5E5" strokeWidth="2" fill="none" strokeDasharray="4" />
                  <path d="M 380 40 L 480 40" stroke={selectedTrace.success ? '#10b981' : '#e05252'} strokeWidth="2" fill="none" strokeDasharray="4" className={!selectedTrace.success ? "animate-pulse" : ""} />
                </svg>

                {/* Node 1: User Request */}
                <div className={`relative z-10 flex flex-col items-center gap-3 w-[160px]`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md bg-white border-2 border-[#1A1A1A]`}>
                    <Activity className="w-8 h-8 text-[#1A1A1A]" />
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-semibold text-[#1A1A1A]">User Request</div>
                  </div>
                </div>

                {/* Node 2: Firewall Check */}
                <div className={`relative z-10 flex flex-col items-center gap-3 w-[160px]`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md bg-white border-2 border-green-500 ring-4 ring-green-50`}>
                    <ShieldAlert className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-semibold text-[#1A1A1A]">Blast Radius Proxy</div>
                    <div className="text-[11px] text-[rgba(38,35,35,0.5)]">Checks passed</div>
                  </div>
                </div>

                {/* Node 3: Agent */}
                <div className={`relative z-10 flex flex-col items-center gap-3 w-[160px]`}>
                  {!selectedTrace.success && (
                    <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg z-20 animate-bounce">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md border-2 ${selectedTrace.success ? 'bg-white border-green-500' : 'bg-red-50 border-red-500 ring-4 ring-red-50'}`}>
                    {selectedTrace.success ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <AlertCircle className="w-8 h-8 text-red-500" />}
                  </div>
                  <div className="text-center">
                    <div className={`text-[13px] font-semibold ${selectedTrace.success ? 'text-[#1A1A1A]' : 'text-red-600'}`}>{selectedTrace.agentName}</div>
                    <div className="text-[11px] text-[rgba(38,35,35,0.5)]">Duration: {selectedTrace.durationMs}ms</div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* INSPECTOR PANEL (Right 1/3) */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col h-[600px] lg:h-auto overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5] flex items-center gap-2 bg-[#FAFAF7]">
            <Activity className="w-4 h-4 text-[rgba(38,35,35,0.5)]" />
            <h2 className="text-[14px] font-semibold text-[#1A1A1A]">Inspector</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
            
            {selectedTrace ? (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[16px] font-bold text-[#1A1A1A]">{selectedTrace.agentName}</h3>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold w-max mt-1 border ${selectedTrace.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {selectedTrace.success ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {selectedTrace.success ? 'Completed Successfully' : 'Failure Detected'}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[rgba(38,35,35,0.5)] uppercase tracking-wider">
                    <Database className="w-3.5 h-3.5" />
                    Agent Metrics
                  </div>
                  <div className="bg-[#FAFAF7] p-3 rounded-xl border border-[#E5E5E5] text-[13px] text-[#1A1A1A] leading-relaxed flex flex-col gap-1">
                    <div><strong>Tokens Used:</strong> {selectedTrace.tokensUsed}</div>
                    <div><strong>Estimated Cost:</strong> ${selectedTrace.cost.toFixed(6)}</div>
                  </div>
                </div>

                {selectedTrace.response && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[rgba(38,35,35,0.5)] uppercase tracking-wider">
                      Response Output
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#333333] shadow-inner text-[12px] text-gray-300 leading-relaxed overflow-x-auto max-h-[300px]">
                      {selectedTrace.response}
                    </div>
                  </div>
                )}

                {!selectedTrace.success && selectedTrace.errorContext && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[rgba(38,35,35,0.5)] uppercase tracking-wider">
                      Error Trace
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-[13px] text-red-800 leading-relaxed overflow-x-auto">
                      {selectedTrace.errorContext}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[14px] text-[rgba(38,35,35,0.5)] text-center mt-10">Select a trace to view details.</div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
