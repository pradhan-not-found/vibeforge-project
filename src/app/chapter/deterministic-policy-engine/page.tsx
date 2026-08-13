import React from 'react';

export default function DeterministicPolicyEnginePage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter I
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="what-is-it">
        Deterministic Policy Engine
      </h1>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Establish unbreakable rules for your AI agents to ensure predictable, compliant, and cost-effective operations.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="/books-covers/UI%2004/Frame%202147239727test-img-2.png" alt="Deterministic Policy Engine" className="w-full rounded-[10px] object-cover" />
      </div>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        AI agents are inherently probabilistic—they make decisions based on statistical likelihoods. While this makes them highly adaptable, it also introduces risk. Checkpost's <strong>Deterministic Policy Engine</strong> acts as the absolute source of truth, enforcing rigid, hard-coded rules that agents cannot bypass under any circumstances.
      </p>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Think of it as the constitutional layer of your AI workforce. While the agent decides <em>how</em> to accomplish a task, the Policy Engine dictates <em>what</em> is strictly forbidden.
      </p>

      <h2 id="core-capabilities" className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">Core Capabilities</h2>
      
      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">1. Absolute API Boundaries</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Define exactly which endpoints, methods, and payload structures an agent is allowed to access. If an agent attempts an unauthorized <code>POST</code> request or tries to access a restricted database table, the Policy Engine blocks it instantly at the network layer.
      </p>

      <div className="bg-[#1C1B1B] p-[20px] rounded-[12px] my-[32px] overflow-x-auto">
        <pre className="text-[13px] leading-[160%] font-mono text-[#E4E4E4] m-0">
          <code>{`// Example Policy Definition
{
  "agent_id": "sales-bot-01",
  "allowed_actions": ["READ_CRM", "DRAFT_EMAIL"],
  "blocked_actions": ["SEND_EMAIL", "DELETE_CONTACT"]
}`}</code>
        </pre>
      </div>

      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">2. PII & Data Masking</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Prevent sensitive data leaks before they happen. The engine automatically redacts Personally Identifiable Information (PII), credit card numbers, and proprietary code before it ever reaches the LLM provider.
      </p>

      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">3. State-Based Transitions</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Agents can only perform actions valid for their current state. A customer support agent cannot issue a refund unless the ticket state is explicitly marked as "verified_complaint" by the policy engine.
      </p>

      <p className="text-[17px] leading-[170%] mt-[64px] font-[500] text-[#262323]">
        Ready to implement?
      </p>
      
      <a href="/login" className="inline-flex mt-4 items-center justify-center bg-[#262323] hover:bg-[#111] text-white px-[20px] py-[12px] rounded-[8px] text-[15px] font-[500] transition-colors no-underline">
        Read the Documentation
      </a>
    </article>
  );
}