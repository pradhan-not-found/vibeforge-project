import React from 'react';

export default function CostGovernancePage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter II
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="runaway-agent">
        Cost Governance
      </h1>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Prevent infinite loops and runaway API costs with hard expenditure limits at the agent level.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="/books-covers/UI%2004/Frame%202147239728.png" alt="Cost Governance" className="w-full rounded-[10px] object-cover" />
      </div>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        The most common failure mode for autonomous agents is the "infinite loop." An agent encounters an error, attempts to retry, fails again, and repeats this process thousands of times per minute. If you are paying per token, a single runaway agent can easily cost thousands of dollars overnight.
      </p>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Checkpost provides a specialized proxy layer that tracks spending in real-time and automatically severs the API connection the moment an agent exceeds its predefined budget.
      </p>

      <h2 id="governance-controls" className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">Governance Controls</h2>
      
      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">1. Dynamic Budget Caps</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Assign a strict daily, weekly, or monthly budget limit per agent or per workspace. Once the limit is hit, all subsequent requests are blocked with a <code>402 Payment Required</code> response.
      </p>

      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">2. Loop Detection (Heuristic)</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Checkpost analyzes prompt similarity and request frequency. If an agent submits the exact same prompt 10 times in a row within a short time window, the system flags it as an infinite loop and pauses the agent until human intervention.
      </p>

      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">3. Rate Limiting (Token & Request)</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Enforce strict Rate Limits on Requests Per Minute (RPM) and Tokens Per Minute (TPM) to prevent sudden spikes in usage from draining your allocated quota.
      </p>

      <p className="text-[17px] leading-[170%] mt-[64px] font-[500] text-[#262323]">
        Ready to take control?
      </p>
      
      <a href="/login" className="inline-flex mt-4 items-center justify-center bg-[#262323] hover:bg-[#111] text-white px-[20px] py-[12px] rounded-[8px] text-[15px] font-[500] transition-colors no-underline">
        View Pricing Options
      </a>
    </article>
  );
}