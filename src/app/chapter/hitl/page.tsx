import React from 'react';

export default function HITLPage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter III
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="delegation-protocol">
        Human-in-the-Loop (HITL)
      </h1>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Seamlessly hand off critical decisions from autonomous agents to human operators.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="/books-covers/UI%2004/Frame%202147239727test-img.png" alt="Human in the loop" className="w-full rounded-[10px] object-cover" />
      </div>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Not all actions should be fully autonomous. High-stakes operations—like authorizing a large financial transaction, sending a sensitive client email, or modifying production infrastructure—require a human's judgment.
      </p>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Checkpost provides a native <strong>HITL Interruption Framework</strong>. When an agent reaches a predefined high-stakes node in its execution graph, it automatically suspends its state and requests human authorization.
      </p>

      <h2 id="how-it-works" className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">How it works</h2>
      
      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">1. State Suspension</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        The agent packages its current context, reasoning chain, and the proposed action payload, then enters a <code>WAITING_ON_HUMAN</code> state. It consumes zero compute resources while waiting.
      </p>

      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">2. Operator Notification</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Checkpost routes the approval request to the appropriate human operator via Slack, Microsoft Teams, or the Checkpost Dashboard, complete with a diff of the proposed changes.
      </p>
      
      <div className="bg-[#1C1B1B] p-[20px] rounded-[12px] my-[32px]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#E7C664]"></div>
          <span className="text-[#E4E4E4] font-mono text-[13px]">Action Requires Approval</span>
        </div>
        <p className="text-[#A0A0A0] font-mono text-[13px] leading-[160%] m-0">
          <strong className="text-[#F286C4]">Agent:</strong> deploy-bot-01<br/>
          <strong className="text-[#F286C4]">Action:</strong> MERGE_PR<br/>
          <strong className="text-[#F286C4]">Target:</strong> main-branch<br/>
          <strong className="text-[#F286C4]">Reasoning:</strong> Unit tests passed, vulnerability scan clean. Ready for staging.<br/>
        </p>
        <div className="mt-6 flex gap-3">
          <button className="bg-white text-[#262323] px-4 py-1.5 rounded text-[13px] font-[600] border-0">Approve</button>
          <button className="bg-transparent text-[#F78C6C] px-4 py-1.5 rounded text-[13px] font-[600] border border-[#F78C6C]">Reject</button>
        </div>
      </div>

      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">3. Feedback Injection</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        If the operator rejects the action, they can provide natural language feedback (e.g., "Do not merge, wait for the QA team's manual sign-off"). This feedback is injected back into the agent's context window, allowing it to dynamically adjust its strategy and learn from the correction.
      </p>
    </article>
  );
}