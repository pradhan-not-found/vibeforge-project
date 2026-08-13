import React from 'react';

export default function CostGovernancePage() {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-sans prose-h1:text-[32px] prose-h1:leading-[120%] prose-h1:tracking-tight prose-h1:mb-6 prose-p:text-[#202020] prose-p:text-[17px] prose-p:leading-[160%] prose-p:mb-6 prose-a:text-blue-600">
      
      <div className="mb-[40px] md:mb-[60px]">
        {/* Chapter pill badge */}
        <div className="inline-flex items-center px-[10px] py-[4px] rounded-full border border-[#D8D8D4] text-[12px] font-mono text-[#202020]/50 mb-[16px] tracking-[0.5px]">
          Chapter II
        </div>
        <h1 className="m-0 text-[40px] sm:text-[48px] leading-[110%] tracking-[-0.5px] font-normal text-[#262323]">Cost Governance and Loop Protection</h1>
        <p className="text-[20px] leading-[150%] text-[#202020]/60 font-[460] max-w-[600px] mt-4">
          Prevent infinite loops and runaway API costs with hard expenditure limits at the agent level.
        </p>
      </div>

      <section>
        <h2 id="runaway-agent" className="text-[24px] font-semibold text-[#202020] mb-4 mt-12">The Runaway Agent Problem</h2>
        <p>
          AI agents are designed to autonomously solve problems. When an agent encounters an unexpected error or an edge case in its environment, its default behavior is often to retry, pivot, and attempt alternative solutions. 
        </p>
        
        <p>
          Without strict governance, this persistence can result in <strong>infinite reasoning loops</strong>, where an agent repeatedly calls an LLM API and executing external functions, draining thousands of dollars in a matter of minutes.
        </p>
      </section>

      <section>
        <h2 id="governance-controls" className="text-[24px] font-semibold text-[#202020] mb-4 mt-12">Checkpost Governance Controls</h2>
        
        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">1. Token & API Call Budgets</h3>
        <p>
          Assign strict budgets per session, per task, or per day for each agent. Once the budget is consumed, the agent is automatically paused, and the session is suspended until a human administrator approves an override.
        </p>

        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">2. Recursive Loop Detection</h3>
        <p>
          Checkpost analyzes the execution trace of the agent in real-time. If the engine detects identical state transitions or repetitive API payload generation over a defined threshold, it classifies the behavior as a loop and halts execution immediately.
        </p>
        
        <div className="bg-[#FAFAF7] border border-[#E8E7E6] p-6 rounded-lg my-8">
          <h4 className="text-[16px] font-bold mb-2">Example Scenario</h4>
          <p className="text-[15px] m-0">
            A web-scraping agent fails to find a CSS selector on a target site. Instead of retrying 50,000 times and racking up GPT-4 vision costs, Checkpost detects the loop at iteration #5, halts the process, and flags the failure for human review.
          </p>
        </div>

        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">3. Rate Limiting</h3>
        <p>
          Enforce traditional rate limits (e.g., max 10 requests per minute) on agent-to-external-API interactions to prevent your agents from accidentally DDOSing your partners or your internal microservices.
        </p>
      </section>

    </article>
  );
}