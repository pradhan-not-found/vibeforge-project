'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { MessageSquare, Cpu, TrendingUp, Zap, RefreshCw, Activity, Bot, ShieldAlert, CheckCircle2, Server } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardOverview() {
  const [userName, setUserName] = useState('User');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [greeting, setGreeting] = useState('');

  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName?.split(' ')[0] || 'User');
        setAvatar(user.photoURL);
      }
    });
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    return () => unsubscribe();
  }, []);

  const fetchDb = async () => {
    try {
      const res = await fetch('/api/db');
      const data = await res.json();
      setDb(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDb();
    const interval = setInterval(fetchDb, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-8 text-[rgba(38,35,35,0.5)]">Loading Live Telemetry...</div>;
  if (!db) return <div className="p-8 text-red-500">Failed to connect to backend DB.</div>;

  // AGGREGATE KPIS
  const totalTokens = Object.values(db.agents).reduce((acc: number, curr: any) => acc + curr.totalTokens, 0);
  const totalCost = Object.values(db.agents).reduce((acc: number, curr: any) => acc + curr.totalSpend, 0);
  const totalRequests = db.traces.length + db.queue.length;

  // AGGREGATE ACTIVITY FEED
  const traces = db.traces.map((t: any) => ({
    agent: t.agentName,
    tool: 'execute_prompt',
    threat: 'Low',
    color: '#10b981',
    status: t.success ? 'Allowed' : 'Error',
    time: new Date(t.timestamp),
    isBlocked: false
  }));
  const queue = db.queue.map((q: any) => ({
    agent: q.agentName,
    tool: q.action,
    threat: 'Critical',
    color: '#e05252',
    status: 'Blocked',
    time: new Date(q.time),
    isBlocked: true
  }));
  const allActivity = [...traces, ...queue].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 10);

  // AGGREGATE BLOCKED POLICIES
  const policyCounts: Record<string, number> = {};
  db.queue.forEach((q: any) => {
    policyCounts[q.policy] = (policyCounts[q.policy] || 0) + 1;
  });
  const policyData = Object.entries(policyCounts).map(([name, count]) => ({ name, count }));
  if (policyData.length === 0) policyData.push({ name: 'None yet', count: 0 });

  // AGGREGATE TRAFFIC DATA
  // Show token usage over the last 10 traces reversed for chronology
  const trafficData = db.traces.slice(0, 15).reverse().map((t: any, i: number) => ({
    time: i,
    volume: t.tokensUsed || 0
  }));
  if (trafficData.length === 0) trafficData.push({ time: 0, volume: 0 });

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-[12px] overflow-hidden border border-[#E5E5E5] bg-white flex items-center justify-center shrink-0 shadow-sm relative">
            {avatar ? (
              <img src={avatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#1A1A1A] font-medium text-[15px]" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>
                {userName.substring(0, 2).toUpperCase()}
              </span>
            )}
            <div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <h1 className="text-[24px] font-medium tracking-[-0.01em] text-[#1A1A1A]" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>
            {greeting ? `${greeting}, ${userName}` : userName}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Real-Time Connected
          </span>
          <button onClick={fetchDb} className="w-9 h-9 rounded-[8px] bg-white border border-[#E5E5E5] flex items-center justify-center text-[rgba(38,35,35,0.6)] hover:text-[#1A1A1A] hover:bg-[#FAFAF7] transition-colors shadow-sm">
            <RefreshCw className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { 
            label: 'TOTAL CAPTURED', 
            value: totalRequests.toLocaleString(), 
            subtext: 'Traces + Queue', 
            icon: Server,
          },
          { 
            label: 'TOTAL TOKENS', 
            value: totalTokens > 1000 ? `${(totalTokens / 1000).toFixed(1)}k` : totalTokens, 
            subtext: 'Across all managed agents', 
            icon: Cpu,
          },
          { 
            label: 'TOTAL COST', 
            value: `$${totalCost.toFixed(5)}`, 
            subtext: 'Based on active models', 
            icon: TrendingUp,
          },
          { 
            label: 'ACTIVE AGENTS', 
            value: Object.keys(db.agents).length, 
            subtext: 'Gemini, Groq Llama3', 
            icon: Zap,
          }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 sm:p-5 rounded-[16px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-semibold text-[rgba(38,35,35,0.4)] uppercase tracking-wide">{stat.label}</span>
              <span className="inline-flex items-center justify-center size-7 text-[rgba(38,35,35,0.5)]">
                <stat.icon className="size-4" />
              </span>
            </div>
            
            <div className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] tracking-tight tabular-nums" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>
              {stat.value}
            </div>
            <p className="text-[10px] sm:text-xs text-[rgba(38,35,35,0.5)] mt-1 truncate font-medium">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Col (Live Activity Feed) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col h-full relative">
            <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAF7]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <h2 className="text-[15px] font-semibold text-[#1A1A1A]">Live Agent Activity Log</h2>
              </div>
            </div>
            <div className="overflow-x-auto min-h-[300px]">
              {allActivity.length === 0 ? (
                <div className="p-12 flex flex-col items-center justify-center text-[rgba(38,35,35,0.4)] font-medium">
                  <Activity className="w-8 h-8 mb-2 opacity-50" />
                  No agent activity recorded yet. <br/> Run a prompt in the Test LLM tab!
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E5] text-[11px] text-[rgba(38,35,35,0.5)] font-semibold uppercase tracking-wider">
                      <th className="px-5 py-3 font-medium">Time</th>
                      <th className="px-5 py-3 font-medium">Agent</th>
                      <th className="px-5 py-3 font-medium">Tool Execution</th>
                      <th className="px-5 py-3 font-medium text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] relative">
                    {allActivity.map((row, i) => (
                      <tr key={i} className="border-b border-[#E5E5E5] last:border-0 hover:bg-[#FAFAF7] transition-colors">
                        <td className="px-5 py-3 font-mono text-[11px] text-[rgba(38,35,35,0.5)]">
                          {row.time.toLocaleTimeString()}
                        </td>
                        <td className="px-5 py-3 font-medium text-[#1A1A1A] whitespace-nowrap flex items-center gap-2">
                          <Bot className="w-4 h-4 text-[rgba(38,35,35,0.4)]" />
                          {row.agent}
                        </td>
                        <td className="px-5 py-3">
                          <span className="font-mono text-[11px] text-[rgba(38,35,35,0.7)] bg-[#F5F5F5] rounded-[6px] px-2 py-1 border border-[#EBEBEA] whitespace-nowrap">
                            {row.tool}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          {row.status === 'Blocked' ? (
                            <div className="flex items-center justify-end gap-2 text-red-600 font-semibold text-[12px]">
                              <ShieldAlert className="w-3.5 h-3.5" /> Blocked
                            </div>
                          ) : row.status === 'Allowed' ? (
                            <div className="flex items-center justify-end gap-2 text-green-600 font-semibold text-[12px]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Allowed
                            </div>
                          ) : (
                            <span className="text-[12px] font-medium text-red-500">{row.status}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right Col (Charts) */}
        <div className="flex flex-col gap-4">
          
          <div className="bg-white p-5 rounded-[16px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-4 h-[220px]">
            <h2 className="text-[13px] font-semibold text-[#1A1A1A] uppercase tracking-wider flex items-center justify-between">
              Live Token Processing
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </h2>
            <div className="h-full w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[16px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-4 h-[220px]">
            <h2 className="text-[13px] font-semibold text-[#1A1A1A] uppercase tracking-wider">Blocked Policies</h2>
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={policyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'rgba(38,35,35,0.6)', fontSize: 11, fontWeight: 500 }} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.02)'}}
                    contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                    {policyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#e05252' : '#1A1A1A'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
