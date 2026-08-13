import React from 'react';
import { Callout } from '@/components/Callout';

export const metadata = {
  title: 'How to monitor agents with Checkpost',
  description: 'Track agent usage, latency, and costs.',
};

export default function MonitorPage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter III
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="logs">
        How To Monitor
      </h1>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        You can't improve what you don't measure. When building autonomous systems, 
        observability isn't a luxury—it's a requirement to ensure your agents are behaving correctly.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="https://cofounder.co/og/og-how-to-build.png" alt="How to monitor" className="w-full rounded-[10px] object-cover" />
      </div>

      <h2 className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">
        Agent Logging
      </h2>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Checkpost automatically logs the entire lifecycle of every request made by your agents. 
        This includes the exact prompt sent, the raw completion received, token usage, latency, 
        and the specific model used.
      </p>

      <Callout badge="Observability" title="Real-time Streaming Dashboard" ctaText="View Dashboard" ctaLink="/dashboard">
        You don't need to refresh. The Checkpost dashboard uses real-time WebSockets to stream 
        agent executions as they happen. You can watch your agents think and respond live.
      </Callout>

      <h2 className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]" id="analytics">
        Usage Analytics
      </h2>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.7)]">
        LLM costs can spiral out of control if left unchecked. By proxying requests through Checkpost, 
        you get an automatic ledger of exactly how many tokens each agent is consuming, sliced by model 
        and time period.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-[32px]">
        <div className="bg-[#FAFAF7] border border-[#E8E7E6] p-[24px] rounded-[12px]">
          <div className="text-[12px] font-[600] tracking-[0.05em] uppercase mb-[8px]" style={{ color: 'rgba(32,32,32,0.5)' }}>Total Tokens</div>
          <div className="text-[32px] font-normal tracking-[-0.02em] text-[#111]">1.2M</div>
          <div className="text-[13px] font-[500] mt-[8px]" style={{ color: '#2D9D5A' }}>↑ 12% from last week</div>
        </div>
        <div className="bg-[#FAFAF7] border border-[#E8E7E6] p-[24px] rounded-[12px]">
          <div className="text-[12px] font-[600] tracking-[0.05em] uppercase mb-[8px]" style={{ color: 'rgba(32,32,32,0.5)' }}>Threats Blocked</div>
          <div className="text-[32px] font-normal tracking-[-0.02em] text-[#111]">24</div>
          <div className="text-[13px] font-[500] mt-[8px]" style={{ color: 'rgba(32,32,32,0.5)' }}>In the last 30 days</div>
        </div>
      </div>

      <p className="text-[17px] leading-[170%] mt-[32px] text-[rgba(38,35,35,0.7)]">
        This level of granularity helps you identify inefficient prompts, switch to cheaper models where 
        appropriate, and ensure your agent architecture remains cost-effective as you scale.
      </p>

    </article>
  );
}
