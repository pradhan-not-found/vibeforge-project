import React from 'react';
import { Callout } from '@/components/Callout';

export const metadata = {
  title: 'How to monitor agents with Checkpost',
  description: 'Track agent usage, latency, and costs.',
};

export default function MonitorPage() {
  return (
    <article className="prose prose-lg prose-slate max-w-none text-[#2D2D2D]">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-8" id="logs">
        How to monitor
      </h1>
      
      <p className="text-lg text-[#5B5B5B] mb-12">
        You can't improve what you don't measure. When building autonomous systems, 
        observability isn't a luxury—it's a requirement to ensure your agents are behaving correctly.
      </p>

      <h2 className="text-2xl font-semibold text-black mt-16 mb-6">
        Agent Logging
      </h2>
      <p>
        Checkpost automatically logs the entire lifecycle of every request made by your agents. 
        This includes the exact prompt sent, the raw completion received, token usage, latency, 
        and the specific model used.
      </p>

      <Callout badge="Observability" title="Real-time Streaming Dashboard" ctaText="View Dashboard" ctaLink="/dashboard">
        <p>
          You don't need to refresh. The Checkpost dashboard uses real-time WebSockets to stream 
          agent executions as they happen. You can watch your agents think and respond live.
        </p>
      </Callout>

      <h2 className="text-2xl font-semibold text-black mt-16 mb-6" id="analytics">
        Usage Analytics
      </h2>
      <p>
        LLM costs can spiral out of control if left unchecked. By proxying requests through Checkpost, 
        you get an automatic ledger of exactly how many tokens each agent is consuming, sliced by model 
        and time period.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl shadow-sm">
          <div className="text-sm font-semibold text-[#718096] uppercase tracking-wider mb-2">Total Tokens</div>
          <div className="text-3xl font-bold text-[#2D3748]">1.2M</div>
          <div className="text-sm text-[#38A169] mt-2">↑ 12% from last week</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl shadow-sm">
          <div className="text-sm font-semibold text-[#718096] uppercase tracking-wider mb-2">Threats Blocked</div>
          <div className="text-3xl font-bold text-[#E53E3E]">24</div>
          <div className="text-sm text-[#718096] mt-2">In the last 30 days</div>
        </div>
      </div>

      <p>
        This level of granularity helps you identify inefficient prompts, switch to cheaper models where 
        appropriate, and ensure your agent architecture remains cost-effective as you scale.
      </p>

    </article>
  );
}
