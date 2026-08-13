import React from 'react';

export default function HITLPage() {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-sans prose-h1:text-[32px] prose-h1:leading-[120%] prose-h1:tracking-tight prose-h1:mb-6 prose-p:text-[#202020] prose-p:text-[17px] prose-p:leading-[160%] prose-p:mb-6 prose-a:text-blue-600">
      
      <div className="mb-[40px] md:mb-[60px]">
        {/* Chapter pill badge */}
        <div className="inline-flex items-center px-[10px] py-[4px] rounded-full border border-[#D8D8D4] text-[12px] font-mono text-[#202020]/50 mb-[16px] tracking-[0.5px]">
          Chapter III
        </div>
        <h1 className="m-0 text-[40px] sm:text-[48px] leading-[110%] tracking-[-0.5px] font-normal text-[#262323]">Human-in-the-Loop (HITL) Interruption</h1>
        <p className="text-[20px] leading-[150%] text-[#202020]/60 font-[460] max-w-[600px] mt-4">
          Seamlessly hand off critical decisions from autonomous agents to human operators.
        </p>
      </div>

      <section>
        <h2 id="delegation-protocol" className="text-[24px] font-semibold text-[#202020] mb-4 mt-12">The Delegation Protocol</h2>
        <p>
          Not all actions should be fully autonomous. High-stakes operations—like authorizing a large financial transaction, sending a sensitive client email, or modifying production infrastructure—require a human's judgment.
        </p>
        
        <p>
          Checkpost provides a native <strong>HITL Interruption Framework</strong>. When an agent reaches a predefined high-stakes node in its execution graph, it automatically suspends its state and requests human authorization.
        </p>
      </section>

      <section>
        <h2 id="how-it-works" className="text-[24px] font-semibold text-[#202020] mb-4 mt-12">How it works</h2>
        
        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">1. State Suspension</h3>
        <p>
          The agent packages its current context, reasoning chain, and the proposed action payload, then enters a <code>WAITING_ON_HUMAN</code> state. It consumes zero compute resources while waiting.
        </p>

        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">2. Operator Notification</h3>
        <p>
          Checkpost routes the approval request to the appropriate human operator via Slack, Microsoft Teams, or the Checkpost Dashboard, complete with a diff of the proposed changes.
        </p>
        
        <div className="bg-[#1A1A1A] p-6 rounded-lg my-8 shadow-inner">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-white font-mono text-sm">Action Requires Approval</span>
          </div>
          <p className="text-gray-300 font-mono text-sm leading-relaxed m-0">
            <strong>Agent:</strong> deploy-bot-01<br/>
            <strong>Action:</strong> MERGE_PR<br/>
            <strong>Target:</strong> main-branch<br/>
            <strong>Reasoning:</strong> Unit tests passed, vulnerability scan clean. Ready for staging.<br/>
          </p>
          <div className="mt-6 flex gap-3">
            <button className="bg-white text-black px-4 py-1.5 rounded text-sm font-bold">Approve</button>
            <button className="bg-red-500/20 text-red-400 px-4 py-1.5 rounded text-sm font-bold border border-red-500/30">Reject</button>
          </div>
        </div>

        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">3. Feedback Injection</h3>
        <p>
          If the operator rejects the action, they can provide natural language feedback (e.g., "Do not merge, wait for the QA team's manual sign-off"). This feedback is injected back into the agent's context window, allowing it to dynamically adjust its strategy and learn from the correction.
        </p>
      </section>

    </article>
  );
}