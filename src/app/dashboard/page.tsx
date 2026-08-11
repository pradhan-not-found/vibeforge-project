'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { MessageSquare, Cpu, TrendingUp, Zap, RefreshCw } from 'lucide-react';

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

  return (
    <div className="flex flex-col gap-8 w-full" style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)' }}>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#111111] p-6 rounded-[16px] border border-[#222222]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#333333] bg-[#222222] flex items-center justify-center shrink-0">
            {avatar ? (
              <img src={avatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-medium text-sm">{userName.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          <h1 className="text-[22px] font-medium text-white tracking-tight">
            {getGreeting()}, {userName}
          </h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:text-white hover:bg-[#222222] transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Dark KPI Cards */}
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
          <div key={i} className="bg-[#1A1A1A] p-5 rounded-[12px] border border-[#2A2A2A] flex flex-col relative overflow-hidden h-[160px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-medium text-[#777777] uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-[#777777]" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-[28px] font-medium text-white leading-none mb-1">{stat.value}</span>
              <span className="text-[11px] text-[#666666]">{stat.subtext}</span>
            </div>

            {/* Sparkline */}
            <div className="absolute bottom-4 left-5 right-5 h-6">
              <svg width="100%" height="100%" viewBox="0 0 160 24" preserveAspectRatio="none" className="overflow-visible">
                <path 
                  d={stat.sparkline} 
                  fill="none" 
                  stroke="#CCCCCC" 
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (Interventions Table) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-medium text-[#1A1A1A]">Recent Interventions (Human-in-the-Loop)</h2>
            <button className="text-[13px] font-medium text-[rgba(38,35,35,0.6)] hover:text-[#1A1A1A] transition-colors">View All &rarr;</button>
          </div>
          
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#FAFAF7] text-[12px] text-[rgba(38,35,35,0.6)] font-medium uppercase tracking-wider">
                  <th className="p-4 py-3 font-medium">Agent</th>
                  <th className="p-4 py-3 font-medium">Tool Attempted</th>
                  <th className="p-4 py-3 font-medium">Threat Level</th>
                  <th className="p-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {[
                  { agent: 'Customer Support Bot', tool: 'execute_sql(DROP TABLE users;)', threat: 'Critical', color: '#e05252', status: 'Blocked' },
                  { agent: 'Data Scraper', tool: 'fetch_url(internal-billing.local)', threat: 'High', color: '#e05252', status: 'Blocked' },
                  { agent: 'Sales Outreach', tool: 'send_email(mass_list_v2)', threat: 'Medium', color: '#f59e0b', status: 'Rate Limited' },
                  { agent: 'Analytics Engine', tool: 'read_file(/etc/passwd)', threat: 'Critical', color: '#e05252', status: 'Blocked' },
                  { agent: 'Github CI Agent', tool: 'git_push(force=true)', threat: 'Low', color: '#10b981', status: 'Allowed' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#E5E5E5] last:border-0 hover:bg-[#FAFAF7] transition-colors">
                    <td className="p-4 py-3 font-medium text-[#1A1A1A]">{row.agent}</td>
                    <td className="p-4 py-3 font-mono text-[11.5px] text-[rgba(38,35,35,0.7)] bg-[#f5f5f5] rounded px-2 m-4 inline-block border border-[#EBEBEA]">{row.tool}</td>
                    <td className="p-4 py-3">
                      <span className="text-[12px] font-medium px-2 py-1 rounded-[4px] bg-opacity-10 border" style={{ color: row.color, backgroundColor: `${row.color}15`, borderColor: `${row.color}30` }}>
                        {row.threat}
                      </span>
                    </td>
                    <td className="p-4 py-3 text-right">
                      {row.status === 'Blocked' ? (
                        <button className="px-3 py-1.5 bg-[#1A1A1A] text-white rounded-[6px] text-[12px] font-medium hover:bg-[#2A2A2A] transition-colors shadow-sm">Review</button>
                      ) : (
                        <span className="text-[13px] font-medium text-[rgba(38,35,35,0.5)]">{row.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col (Active Policies & Activity) */}
        <div className="flex flex-col gap-6">
          {/* Activity Graph Placeholder */}
          <div className="flex flex-col gap-4">
             <h2 className="text-[18px] font-medium text-[#1A1A1A]">Traffic Volume</h2>
             <div className="bg-white p-5 rounded-[12px] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-4 h-[180px] justify-end relative">
               {/* Fake Graph */}
               <div className="flex items-end justify-between w-full h-[100px] gap-1 opacity-80">
                 {[40, 25, 60, 45, 80, 55, 90, 70, 110, 85, 120, 95, 130, 105].map((h, i) => (
                   <div key={i} className="w-full bg-[#1A1A1A] rounded-t-[2px] transition-all hover:bg-[#e05252]" style={{ height: `${h}%` }}></div>
                 ))}
               </div>
               <div className="flex justify-between text-[11px] font-mono text-[rgba(38,35,35,0.4)] uppercase">
                 <span>00:00</span>
                 <span>12:00</span>
                 <span>24:00</span>
               </div>
             </div>
          </div>

          {/* Top Policies */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[18px] font-medium text-[#1A1A1A]">Top Blocked Policies</h2>
            <div className="bg-white rounded-[12px] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-3">
              {[
                { name: 'Prevent SSRF Attacks', count: 1240 },
                { name: 'Restrict Shell Execution', count: 852 },
                { name: 'Block PII Exfiltration', count: 641 },
                { name: 'Enforce Token Limits', count: 430 }
              ].map((policy, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[13.5px] font-medium text-[#1A1A1A]">{policy.name}</span>
                  <span className="text-[12px] font-mono text-[rgba(38,35,35,0.6)] bg-[#FAFAF7] px-2 py-0.5 rounded-[4px] border border-[#E5E5E5]">{policy.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
