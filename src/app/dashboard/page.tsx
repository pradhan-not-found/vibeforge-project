
'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { MessageSquare, Cpu, TrendingUp, Zap, RefreshCw } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardOverview() {
  const [userName, setUserName] = useState('User');
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName?.split(' ')[0] || 'User');
        setAvatar(user.photoURL);
      }
    });
    return () => unsubscribe();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const trafficData = [
    { time: '00:00', volume: 40 }, { time: '02:00', volume: 25 }, { time: '04:00', volume: 60 },
    { time: '06:00', volume: 45 }, { time: '08:00', volume: 80 }, { time: '10:00', volume: 55 },
    { time: '12:00', volume: 90 }, { time: '14:00', volume: 70 }, { time: '16:00', volume: 110 },
    { time: '18:00', volume: 85 }, { time: '20:00', volume: 120 }, { time: '22:00', volume: 95 },
    { time: '23:59', volume: 130 }
  ];

  const policyData = [
    { name: 'SSRF', count: 1240 },
    { name: 'Shell Exec', count: 852 },
    { name: 'PII Exfil', count: 641 },
    { name: 'Token Lmt', count: 430 }
  ];

  return (
    <div className="flex flex-col gap-6 w-full" style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-[12px] overflow-hidden border border-[#E5E5E5] bg-white flex items-center justify-center shrink-0 shadow-sm">
            {avatar ? (
              <img src={avatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#1A1A1A] font-medium text-[15px]" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>
                {userName.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#1A1A1A]">
            {getGreeting()}, {userName}
          </h1>
        </div>
        <button className="w-9 h-9 rounded-[8px] bg-white border border-[#E5E5E5] flex items-center justify-center text-[rgba(38,35,35,0.6)] hover:text-[#1A1A1A] hover:bg-[#FAFAF7] transition-colors shadow-sm">
          <RefreshCw className="w-[14px] h-[14px]" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'TOTAL REQUESTS', 
            value: '1,918', 
            subtext: 'No active sessions', 
            icon: MessageSquare,
            sparkline: "M0 20 L20 20 L30 20 L40 20 L50 20 L60 20 L70 20 L80 18 L90 20 L100 20 L110 5 L120 20 L130 20 L140 20 L150 20 L160 20"
          },
          { 
            label: 'TOTAL TOKENS', 
            value: '12028.3k', 
            subtext: 'Input + output combined', 
            icon: Cpu,
            sparkline: "M0 20 L20 20 L40 20 L60 20 L80 20 L100 20 L110 20 L120 4 L130 20 L140 20 L150 20 L160 20"
          },
          { 
            label: 'ESTIMATED COST', 
            value: '$5.08', 
            subtext: 'Based on model pricing', 
            icon: TrendingUp,
            sparkline: "M0 20 L20 20 L30 20 L40 18 L50 19 L60 17 L70 19 L80 18 L90 20 L100 20 L110 8 L120 20 L130 20 L140 20 L150 20 L160 20"
          },
          { 
            label: 'ACTIVE PROVIDERS', 
            value: '8', 
            subtext: 'Top: claude-sonnet-4-6', 
            icon: Zap,
            sparkline: "M0 20 L20 20 L30 20 L40 20 L50 20 L60 20 L70 20 L80 20 L90 20 L100 20 L110 20 L120 20 L130 20 L140 20 L150 20 L160 20"
          }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[16px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden h-[160px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-semibold text-[rgba(38,35,35,0.4)] uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-[14px] h-[14px] text-[rgba(38,35,35,0.4)]" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-[28px] font-semibold text-[#1A1A1A] leading-none mb-1">{stat.value}</span>
              <span className="text-[11.5px] font-medium text-[rgba(38,35,35,0.5)]">{stat.subtext}</span>
            </div>

            {/* Sparkline */}
            <div className="absolute bottom-4 left-5 right-5 h-6">
              <svg width="100%" height="100%" viewBox="0 0 160 24" preserveAspectRatio="none" className="overflow-visible">
                <path 
                  d={stat.sparkline} 
                  fill="none" 
                  stroke="#1A1A1A" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Col (Interventions Table) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-[#1A1A1A]">Recent Interventions</h2>
              <button className="text-[12px] font-medium text-[rgba(38,35,35,0.6)] hover:text-[#1A1A1A] transition-colors">View All &rarr;</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E5E5] bg-[#FAFAF7] text-[11px] text-[rgba(38,35,35,0.5)] font-semibold uppercase tracking-wider">
                    <th className="px-5 py-3 font-medium">Agent</th>
                    <th className="px-5 py-3 font-medium">Tool Attempted</th>
                    <th className="px-5 py-3 font-medium">Threat Level</th>
                    <th className="px-5 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {[
                    { agent: 'Customer Support Bot', tool: 'execute_sql(DROP TABLE)', threat: 'Critical', color: '#e05252', status: 'Blocked' },
                    { agent: 'Data Scraper', tool: 'fetch_url(internal.local)', threat: 'High', color: '#e05252', status: 'Blocked' },
                    { agent: 'Sales Outreach', tool: 'send_email(mass_list_v2)', threat: 'Medium', color: '#f59e0b', status: 'Rate Limited' },
                    { agent: 'Github CI Agent', tool: 'git_push(force=true)', threat: 'Low', color: '#10b981', status: 'Allowed' }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[#E5E5E5] last:border-0 hover:bg-[#FAFAF7] transition-colors">
                      <td className="px-5 py-3 font-medium text-[#1A1A1A] whitespace-nowrap">{row.agent}</td>
                      <td className="px-5 py-3">
                        <span className="font-mono text-[11px] text-[rgba(38,35,35,0.7)] bg-[#F5F5F5] rounded-[6px] px-2 py-1 border border-[#EBEBEA] whitespace-nowrap">
                          {row.tool}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-[11px] font-semibold px-2 py-1 rounded-[4px] border" style={{ color: row.color, backgroundColor: `${row.color}10`, borderColor: `${row.color}25` }}>
                          {row.threat}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        {row.status === 'Blocked' ? (
                          <button className="px-3 py-1.5 bg-white border border-[#E5E5E5] text-[#1A1A1A] rounded-[6px] text-[11px] font-semibold hover:bg-[#FAFAF7] transition-colors shadow-sm">Review</button>
                        ) : (
                          <span className="text-[12px] font-medium text-[rgba(38,35,35,0.5)]">{row.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col (Charts) */}
        <div className="flex flex-col gap-4">
          
          <div className="bg-white p-5 rounded-[16px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-4 h-[220px]">
            <h2 className="text-[13px] font-semibold text-[#1A1A1A] uppercase tracking-wider">Traffic Volume</h2>
            <div className="h-full w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#1A1A1A" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
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
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
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
