import React from 'react';

export default function DeterministicPolicyEnginePage() {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-sans prose-h1:text-[32px] prose-h1:leading-[120%] prose-h1:tracking-tight prose-h1:mb-6 prose-p:text-[#202020] prose-p:text-[17px] prose-p:leading-[160%] prose-p:mb-6 prose-a:text-blue-600">
      
      <div className="mb-[40px] md:mb-[60px]">
        {/* Chapter pill badge */}
        <div className="inline-flex items-center px-[10px] py-[4px] rounded-full border border-[#D8D8D4] text-[12px] font-mono text-[#202020]/50 mb-[16px] tracking-[0.5px]">
          Chapter I
        </div>
        <h1 className="m-0 text-[40px] sm:text-[48px] leading-[110%] tracking-[-0.5px] font-normal text-[#262323]">The Deterministic Policy Engine (The Rulebook)</h1>
        <p className="text-[20px] leading-[150%] text-[#202020]/60 font-[460] max-w-[600px] mt-4">
          Establish unbreakable rules for your AI agents to ensure predictable, compliant, and cost-effective operations.
        </p>
      </div>

      <section>
        <h2 id="what-is-it" className="text-[24px] font-semibold text-[#202020] mb-4 mt-12">What is the Deterministic Policy Engine?</h2>
        <p>
          AI agents are inherently probabilistic—they make decisions based on statistical likelihoods. While this makes them highly adaptable, it also introduces risk. Checkpost's <strong>Deterministic Policy Engine</strong> acts as the absolute source of truth, enforcing rigid, hard-coded rules that agents cannot bypass under any circumstances.
        </p>
        
        <p>
          Think of it as the constitutional layer of your AI workforce. While the agent decides <em>how</em> to accomplish a task, the Policy Engine dictates <em>what</em> is strictly forbidden.
        </p>
      </section>

      <section>
        <h2 id="core-capabilities" className="text-[24px] font-semibold text-[#202020] mb-4 mt-12">Core Capabilities</h2>
        
        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">1. Absolute API Boundaries</h3>
        <p>
          Define exactly which endpoints, methods, and payload structures an agent is allowed to access. If an agent attempts an unauthorized <code>POST</code> request or tries to access a restricted database table, the Policy Engine blocks it instantly at the network layer.
        </p>
        <pre className="bg-[#1A1A1A] text-white p-4 rounded-lg my-6 text-sm overflow-x-auto">
          <code>{`// Example Policy Definition
{
  "agent_id": "sales-bot-01",
  "allowed_actions": ["READ_CRM", "DRAFT_EMAIL"],
  "blocked_actions": ["SEND_EMAIL", "DELETE_CONTACT"]
}`}</code>
        </pre>

        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">2. PII & Data Masking</h3>
        <p>
          Prevent sensitive data leaks before they happen. The engine automatically redacts Personally Identifiable Information (PII), credit card numbers, and proprietary code before it ever reaches the LLM provider.
        </p>

        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">3. State-Based Transitions</h3>
        <p>
          Agents can only perform actions valid for their current state. A customer support agent cannot issue a refund unless the ticket state is explicitly marked as "verified_complaint" by the policy engine.
        </p>
      </section>

      <section className="bg-white border border-[#E8E7E6] rounded-[12px] p-[24px] md:p-[32px] mt-[40px] shadow-sm">
        <h3 className="text-[18px] font-semibold mb-2">Ready to implement?</h3>
        <p className="text-[#202020]/60 mb-6 text-[15px]">
          Learn how to construct your first YAML policy file and deploy it to your testing environment.
        </p>
        <a href="#" className="inline-flex items-center justify-center h-[41px] px-4 rounded-[8px] bg-[#262323] text-white text-[15px] font-[460] tracking-[0.15px] hover:bg-[#1a1818] transition-colors no-underline">
          Read the Documentation
        </a>
      </section>

    </article>
  );
}