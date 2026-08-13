import React from 'react';

export default function HITLPage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter III
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="introduction">
        Human-in-the-Loop (HITL)
      </h1>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Seamlessly hand off critical decisions from autonomous agents to human operators. Ensure that high-stakes operations are always verified by human judgment before execution.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="/books-covers/UI%2004/Frame%202147239727test-img.png" alt="Human in the loop" className="w-full rounded-[10px] object-cover" />
      </div>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        While autonomy drives efficiency, not all actions should be fully delegated to AI. High-stakes operations—such as authorizing large financial transactions, executing destructive database migrations, sending sensitive legal communications, or modifying production infrastructure—inherently require the nuance and accountability of a human operator.
      </p>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Checkpost provides a native, highly integrated <strong>HITL Interruption Framework</strong>. When an agent reaches a predefined high-stakes node in its execution graph, it does not proceed blindly. Instead, it automatically suspends its internal state, freezes execution, and requests explicit human authorization to continue.
      </p>

      <h2 id="how-it-works" className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">How the Protocol Works</h2>
      
      <h3 className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">1. State Suspension</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Upon triggering a protected action, the agent securely packages its current memory context, its step-by-step reasoning chain, and the exact proposed payload. It then enters a highly optimized <code>WAITING_ON_HUMAN</code> state. During this suspension period, the agent consumes absolutely zero compute resources, meaning you aren't billed for idle time while waiting for human review.
      </p>

      {/* Flowchart Diagram */}
      <div className="w-full bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-[64px] mt-[40px] p-[32px] flex flex-col items-center">
        <h3 id="workflow" className="text-[14px] font-[500] text-[#262323] mb-[32px] tracking-wide uppercase opacity-70">HITL Workflow</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          <div className="flex flex-col items-center p-4 bg-[#F9F9F8] border border-[#E8E7E6] rounded-[12px] w-[150px] shadow-sm">
            <span className="text-[14px] font-[600] text-[#262323]">Agent Logic</span>
            <span className="text-[12px] text-[#7D7C78] mt-1 text-center">Proposes PR Merge</span>
          </div>
          
          <svg className="w-6 h-10 md:w-12 md:h-6 text-[#D6D5D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>

          <div className="flex flex-col items-center p-5 bg-white border-2 border-[#D97706] rounded-[12px] w-[180px] shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D97706] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Suspended</div>
            <span className="text-[14px] font-[600] text-[#262323] mt-2">Awaiting Approval</span>
            <span className="text-[12px] text-[#7D7C78] mt-1 text-center">Operator notified</span>
          </div>

          <svg className="w-6 h-10 md:w-12 md:h-6 text-[#D6D5D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>

          <div className="flex flex-col gap-3">
             <div className="flex flex-col items-center p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-[12px] w-[140px] shadow-sm">
              <span className="text-[13px] font-[600] text-[#166534]">Approved</span>
              <span className="text-[11px] text-[#15803D] mt-0.5">Executes Action</span>
            </div>
             <div className="flex flex-col items-center p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] w-[140px] shadow-sm">
              <span className="text-[13px] font-[600] text-[#991B1B]">Rejected</span>
              <span className="text-[11px] text-[#B91C1C] mt-0.5">Receives Feedback</span>
            </div>
          </div>
        </div>
      </div>

      <h3 id="operator-review" className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">2. Operator Notification & Review</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Checkpost instantly routes the approval request to the appropriate human operator via configured channels (e.g., Slack, Microsoft Teams, or the centralized Checkpost Dashboard). The notification includes a comprehensive, human-readable diff of the proposed changes, eliminating any ambiguity about what the agent intends to do.
      </p>
      
      {/* White Dashboard Snippet */}
      <div className="bg-white border border-[#E8E7E6] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px] rounded-[16px] my-[40px] overflow-hidden relative">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F0F0F0]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D97706] animate-pulse"></div>
          <span className="text-[#262323] font-[600] text-[14px]">Action Requires Operator Approval</span>
        </div>
        <div className="grid grid-cols-[100px_1fr] gap-y-3 gap-x-4 mb-6 text-[13px]">
          <div className="text-[#7D7C78] font-[500]">Agent</div>
          <div className="text-[#262323] font-mono bg-[#F5F5F2] px-2 py-0.5 rounded inline-block w-max">deploy-bot-01</div>
          
          <div className="text-[#7D7C78] font-[500]">Action</div>
          <div className="text-[#262323] font-mono bg-[#EEF2FF] text-[#4338CA] px-2 py-0.5 rounded inline-block w-max">MERGE_PR</div>
          
          <div className="text-[#7D7C78] font-[500]">Target</div>
          <div className="text-[#262323] font-mono bg-[#F5F5F2] px-2 py-0.5 rounded inline-block w-max">main-branch</div>
          
          <div className="text-[#7D7C78] font-[500] pt-1">Reasoning</div>
          <div className="text-[#262323] leading-[160%] bg-[#F9F9F8] p-3 rounded-[8px] border border-[#E8E7E6]">
            "Unit tests passed successfully. Security vulnerability scan returned clean. Infrastructure diff reviewed. Changes are safe to merge and deploy to staging."
          </div>
        </div>
        <div className="mt-6 flex gap-3 pt-4 border-t border-[#F0F0F0]">
          <button className="bg-[#166534] hover:bg-[#14532D] text-white px-5 py-2 rounded-[8px] text-[13px] font-[600] border-0 transition-colors shadow-sm">
            Approve & Execute
          </button>
          <button className="bg-white hover:bg-[#FEF2F2] text-[#991B1B] px-5 py-2 rounded-[8px] text-[13px] font-[600] border border-[#FECACA] transition-colors shadow-sm">
            Reject & Provide Feedback
          </button>
        </div>
      </div>

      <h3 id="dynamic-feedback" className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">3. Dynamic Feedback Injection</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        If the human operator rejects the action, the workflow doesn't simply crash. The operator can provide explicit natural language feedback (e.g., "Do not merge yet, wait for the QA team's manual sign-off on the staging environment"). This feedback is instantly injected back into the agent's context window. The agent seamlessly resumes its execution state, processes the correction, dynamically adjusts its strategic plan, and learns from the human intervention for future tasks.
      </p>

      {/* What comes next block */}
      <div className="mt-[120px] pt-[40px]">
        <h4 className="text-[17px] font-[460] text-[#7D7C78] mb-[24px]">What comes next:</h4>
        <p className="text-[17px] leading-[170%] mb-[32px] text-[#262323]">
          With humans securely in the loop, the final step is ensuring the underlying infrastructure meets the strict auditing and security compliance required by modern organizations. That's what Chapter IV covers.
        </p>
        
        <a href="/chapter/enterprise-ready" className="inline-flex items-center text-[#7D7C78] font-mono text-[13px] hover:text-[#262323] transition-colors no-underline uppercase tracking-wider">
          Read next chapter (IV)
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}