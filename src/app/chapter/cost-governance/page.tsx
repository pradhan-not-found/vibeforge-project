import React from 'react';

export default function CostGovernancePage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter II
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="introduction">
        Cost Governance
      </h1>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Prevent infinite loops and runaway API costs with hard expenditure limits at the agent level. Implement bulletproof financial controls without sacrificing the autonomy of your AI workforce.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="/books-covers/UI%2004/Frame%202147239728.png" alt="Cost Governance" className="w-full rounded-[10px] object-cover" />
      </div>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        One of the most critical and common failure modes for autonomous agents is the dreaded "infinite loop." Due to their iterative nature, when an agent encounters an unexpected error or an edge case, its default behavior is often to self-correct and try again. While this persistence is valuable, it becomes dangerous when the agent fails to resolve the error and repeats the retry cycle thousands of times per minute.
      </p>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        In a pay-per-token ecosystem, a single runaway agent can effortlessly burn through thousands of dollars overnight. Traditional monitoring alerts are often too slow to prevent this rapid expenditure. Checkpost addresses this by providing a specialized proxy layer that tracks computational spending in real-time. It acts as an unbreakable financial circuit breaker, automatically severing the API connection the exact millisecond an agent exceeds its predefined budget.
      </p>

      {/* Flowchart Diagram */}
      <div className="w-full bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-[64px] mt-[40px] p-[32px] flex flex-col items-center">
        <h3 id="budget-enforcement" className="text-[14px] font-[500] text-[#262323] mb-[32px] tracking-wide uppercase opacity-70">Budget Enforcement Pipeline</h3>
        
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center p-4 bg-[#F9F9F8] border border-[#E8E7E6] rounded-[12px] w-[200px] shadow-sm z-10">
            <span className="text-[14px] font-[600] text-[#262323]">Agent Request</span>
            <span className="text-[12px] text-[#7D7C78] mt-1 text-center">Calculates estimated tokens</span>
          </div>
          
          <div className="h-[30px] w-[2px] bg-[#D6D5D0]"></div>

          <div className="flex flex-col items-center p-4 bg-white border-[2px] border-[#262323] rounded-[12px] w-[220px] shadow-md z-10 relative">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#262323] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase whitespace-nowrap">Proxy Layer</div>
            <span className="text-[14px] font-[600] text-[#262323] mt-2">Real-time Ledger</span>
            <span className="text-[12px] text-[#7D7C78] mt-1 text-center">Checks against $50.00 daily limit</span>
          </div>

          <div className="h-[30px] w-[2px] bg-[#D6D5D0]"></div>
          
          <div className="flex flex-row w-full max-w-[400px] justify-between relative">
             <div className="absolute top-0 left-[25%] right-[25%] h-[2px] bg-[#D6D5D0]"></div>
             <div className="absolute top-0 left-[25%] h-[20px] w-[2px] bg-[#D6D5D0]"></div>
             <div className="absolute top-0 right-[25%] h-[20px] w-[2px] bg-[#D6D5D0]"></div>
          </div>
          
          <div className="flex flex-row w-full max-w-[400px] justify-between pt-[20px]">
             <div className="flex flex-col items-center p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-[12px] w-[160px] shadow-sm mt-[-20px]">
              <span className="text-[13px] font-[600] text-[#166534]">Under Budget</span>
              <span className="text-[11px] text-[#15803D] mt-1 text-center">Routes to LLM Provider</span>
            </div>
             <div className="flex flex-col items-center p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] w-[160px] shadow-sm mt-[-20px]">
              <span className="text-[13px] font-[600] text-[#991B1B]">Over Budget</span>
              <span className="text-[11px] text-[#B91C1C] mt-1 text-center">402 Payment Required</span>
            </div>
          </div>
        </div>
      </div>

      <h2 id="governance-controls" className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">Governance Controls</h2>
      
      <h3 className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">1. Dynamic Budget Caps</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Assign absolute, non-negotiable daily, weekly, or monthly budget limits at a granular level. You can scope these budgets globally per workspace, per project, or down to the individual agent identity. Once the threshold is crossed, the proxy layer immediately halts execution and returns a <code>402 Payment Required</code> response, guaranteeing zero cost overruns.
      </p>

      {/* White Dashboard Snippet */}
      <div className="bg-white border border-[#E8E7E6] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px] rounded-[16px] my-[40px] overflow-hidden relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0F0F0]">
          <span className="text-[14px] font-[600] text-[#262323]">Agent Spend Analytics</span>
          <span className="text-[12px] font-[500] px-3 py-1 bg-[#EEF2FF] text-[#4338CA] rounded-full">Active</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[12px] text-[#7D7C78] mb-1 font-[500]">Current Usage (Daily)</p>
              <p className="text-[28px] font-[600] text-[#262323] leading-none">$42.50 <span className="text-[14px] text-[#7D7C78] font-[400]">/ $50.00 max</span></p>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-[#7D7C78] mb-1 font-[500]">Status</p>
              <p className="text-[13px] font-[600] text-[#D97706]">85% Utilized</p>
            </div>
          </div>
          <div className="w-full bg-[#F5F5F2] h-[8px] rounded-full overflow-hidden mt-2">
            <div className="bg-[#4338CA] h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      <h3 id="loop-detection" className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">2. Loop Detection (Heuristic Engine)</h3>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.8)]">
        Our proprietary heuristic engine actively monitors the semantic similarity of prompts and the velocity of requests.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">Infinite Loop Prevention</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">If an agent submits near-identical prompts repeatedly within a compressed time window, the system automatically flags it as an infinite loop.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">State Pausing</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">It instantly pauses the agent's execution state and alerts human operators for intervention, preventing silent token drains.</p>
          </div>
        </div>
      </div>

      <h3 id="rate-limiting" className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">3. Rate Limiting (Token & Request)</h3>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.8)]">
        Protect your shared provider limits from being monopolized by a single rogue process.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">Strict Throttle Rules</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">Enforce strict Rate Limits on both Requests Per Minute (RPM) and Tokens Per Minute (TPM).</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">Equitable Distribution</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">This ensures equitable distribution of API resources across your entire agent fleet and prevents sudden spikes from triggering provider-level throttling.</p>
          </div>
        </div>
      </div>

      {/* What comes next block */}
      <div className="mt-[120px] pt-[40px]">
        <h4 className="text-[17px] font-[460] text-[#7D7C78] mb-[24px]">What comes next:</h4>
        <p className="text-[17px] leading-[170%] mb-[32px] text-[#262323]">
          With financial boundaries secured, you might still need human judgment for high-stakes decisions before they execute. That's what Chapter III covers.
        </p>
        
        <a href="/chapter/hitl" className="inline-flex items-center text-[#7D7C78] font-mono text-[13px] hover:text-[#262323] transition-colors no-underline uppercase tracking-wider">
          Read next chapter (III)
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}