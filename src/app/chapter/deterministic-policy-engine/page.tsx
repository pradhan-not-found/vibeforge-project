import React from 'react';

export default function DeterministicPolicyEnginePage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter I
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="introduction">
        Deterministic Policy Engine
      </h1>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.8)]">
        Establish unbreakable, definitive rules for your AI agents to ensure predictable, compliant, and strictly governed operations within enterprise environments. 
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="/books-covers/UI%2004/Frame%202147239727test-img-2.png" alt="Deterministic Policy Engine" className="w-full rounded-[10px] object-cover" />
      </div>

      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        The fundamental challenge with autonomous AI agents is their probabilistic nature. By design, they make decisions based on statistical likelihoods, which introduces an unacceptable level of risk when deployed in high-stakes operational workflows. Without strict boundary controls, an agent might independently decide to bypass a compliance check or attempt unauthorized lateral movement through your internal APIs.
      </p>

      {/* Flowchart Diagram */}
      <div className="w-full bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-[64px] mt-[40px] p-[32px] flex flex-col items-center">
        <h3 id="architecture" className="text-[14px] font-[500] text-[#262323] mb-[24px] tracking-wide uppercase opacity-70">Architecture Flow</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          <div className="flex flex-col items-center p-4 bg-[#F9F9F8] border border-[#E8E7E6] rounded-[12px] w-[140px] shadow-sm">
            <span className="text-[14px] font-[600] text-[#262323]">AI Agent</span>
            <span className="text-[12px] text-[#7D7C78] mt-1 text-center">Generates Action</span>
          </div>
          
          <svg className="w-6 h-10 md:w-12 md:h-6 text-[#D6D5D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>

          <div className="flex flex-col items-center p-5 bg-white border-2 border-[#262323] rounded-[12px] w-[180px] shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#262323] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Policy Engine</div>
            <span className="text-[14px] font-[600] text-[#262323] mt-2">Intercept & Validate</span>
            <span className="text-[12px] text-[#7D7C78] mt-1 text-center">Applies hard constraints</span>
          </div>

          <svg className="w-6 h-10 md:w-12 md:h-6 text-[#D6D5D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>

          <div className="flex flex-col gap-3">
             <div className="flex flex-col items-center p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-[12px] w-[140px] shadow-sm">
              <span className="text-[13px] font-[600] text-[#166534]">Authorized</span>
              <span className="text-[11px] text-[#15803D] mt-0.5">Execution allowed</span>
            </div>
             <div className="flex flex-col items-center p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] w-[140px] shadow-sm">
              <span className="text-[13px] font-[600] text-[#991B1B]">Blocked</span>
              <span className="text-[11px] text-[#B91C1C] mt-0.5">Request denied</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Checkpost's <strong>Deterministic Policy Engine</strong> solves this inherent problem by acting as the absolute source of truth. It functions as a robust middleware layer that enforces rigid, hard-coded rules which your agents cannot bypass, hallucinate their way out of, or creatively misinterpret under any circumstances.
      </p>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Think of it as the constitutional foundation of your AI workforce. While the underlying Language Model is granted the autonomy to decide <em>how</em> to accomplish an objective, the Deterministic Policy Engine explicitly dictates <em>what</em> is strictly forbidden, ensuring flawless operational compliance.
      </p>

      <h2 id="core-capabilities" className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">Core Capabilities</h2>
      
      <h3 id="api-boundaries" className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">1. Absolute API Boundaries</h3>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.8)]">
        In a corporate environment, defining exactly which systems an agent can access is paramount. The engine allows you to specify permitted endpoints, HTTP methods, and exact payload schemas.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">Network-Level Severance</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">If an agent attempts an unauthorized POST request, the Policy Engine severs the connection instantly at the network layer—before the request ever reaches your internal infrastructure.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">Schema Validation</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">Every outgoing payload is statically typed and verified against a pre-defined JSON schema, blocking malformed requests instantly.</p>
          </div>
        </div>
      </div>

      {/* White Dashboard Snippet */}
      <div className="bg-white border border-[#E8E7E6] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px] rounded-[16px] my-[40px] overflow-x-auto relative">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#F0F0F0]">
          <span className="text-[14px] font-[600] text-[#262323] flex items-center gap-2">
            <svg className="w-4 h-4 text-[#7D7C78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Policy Configuration File
          </span>
          <span className="text-[11px] px-2 py-1 bg-[#F5F5F2] text-[#5B5B5B] font-mono rounded-[6px]">JSON</span>
        </div>
        <pre className="text-[13px] leading-[170%] font-mono text-[#333] m-0">
          <code>{`{
  "policy_id": "pol_sales_strict_01",
  "agent_role": "sales-bot",
  "permissions": {
    "allowed_actions": ["READ_CRM_LEADS", "DRAFT_EMAIL"],
    "blocked_actions": ["SEND_EMAIL", "DELETE_CONTACT"],
    "rate_limit_rpm": 60
  },
  "enforcement_mode": "hard_block"
}`}</code>
        </pre>
      </div>

      <h3 className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">2. PII & Data Masking</h3>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.8)]">
        Data privacy cannot be left to chance. Prevent sensitive data exfiltration before it happens with our robust scrubbing pipeline.
      </p>
      
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">Pre-execution Redaction</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">The engine automatically detects and redacts Personally Identifiable Information (PII), social security numbers, and credit card details.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">Source Code Protection</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">Proprietary logic and internal IP is masked before any context is routed to third-party LLM providers.</p>
          </div>
        </div>
      </div>

      <h3 id="state-transitions" className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">3. State-Based Transitions</h3>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.8)]">
        Context matters in execution. The engine enforces finite state machines on your agents, ensuring they can only perform actions that are logically valid for their current operational state.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">Prerequisite Enforcement</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">For example, a customer support agent cannot execute a "process refund" function unless the ticket's state is explicitly marked as "verified_complaint" and "manager_reviewed" by the policy engine.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#262323] mt-[10px] shrink-0"></div>
          <div>
            <h4 className="text-[15px] font-[600] text-[#262323] mb-1">State Rollbacks</h4>
            <p className="text-[15px] leading-[160%] text-[rgba(38,35,35,0.7)]">If an action fails downstream, the engine automatically rolls back the agent's contextual state to prevent cascading errors or hallucination loops.</p>
          </div>
        </div>
      </div>

      <div className="mt-[64px] bg-[#F5F5F2] border border-[#E8E7E6] rounded-[16px] p-[32px] flex flex-col md:flex-row gap-[24px] items-start">
        <div className="w-[64px] h-[64px] shrink-0 bg-white border border-[#D6D5D0] rounded-[12px] flex items-center justify-center p-2 shadow-sm">
          <img src="/icon.png" alt="Checkpost Icon" className="w-full h-full object-contain" />
        </div>
        <div>
          <h4 className="text-[18px] font-[600] text-[#262323] mb-[12px]">Why deploy Checkpost?</h4>
          <p className="text-[15px] leading-[160%] text-[#5B5B5B] m-0">
            Before deterministic policies, engineering teams faced constant issues with agents hallucinating actions, looping on failed API calls, and accessing endpoints outside their intended scope. Checkpost provides a rigid safety net, turning unpredictable LLM outputs into strictly typed, governed, and verifiable system interactions.
          </p>
        </div>
      </div>

      {/* What comes next block */}
      <div className="mt-[120px] pt-[40px]">
        <h4 className="text-[17px] font-[460] text-[#7D7C78] mb-[24px]">What comes next:</h4>
        <p className="text-[17px] leading-[170%] mb-[32px] text-[#262323]">
          Once your agents are bound by strict deterministic rules, the next step is to ensure they don't rack up runaway API bills from unexpected retries. That's what Chapter II covers.
        </p>
        
        <a href="/chapter/cost-governance" className="inline-flex items-center text-[#7D7C78] font-mono text-[13px] hover:text-[#262323] transition-colors no-underline uppercase tracking-wider">
          Read next chapter (II)
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}