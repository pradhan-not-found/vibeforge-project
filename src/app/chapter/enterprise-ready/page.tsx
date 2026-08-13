import React from 'react';

export default function EnterpriseReadyPage() {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-sans prose-h1:text-[32px] prose-h1:leading-[120%] prose-h1:tracking-tight prose-h1:mb-6 prose-p:text-[#202020] prose-p:text-[17px] prose-p:leading-[160%] prose-p:mb-6 prose-a:text-blue-600">
      
      <div className="mb-[40px] md:mb-[60px]">
        {/* Chapter pill badge */}
        <div className="inline-flex items-center px-[10px] py-[4px] rounded-full border border-[#D8D8D4] text-[12px] font-mono text-[#202020]/50 mb-[16px] tracking-[0.5px]">
          Chapter IV
        </div>
        <h1 className="m-0 text-[40px] sm:text-[48px] leading-[110%] tracking-[-0.5px] font-normal text-[#262323]">Enterprise Ready &amp; Secure</h1>
        <p className="text-[20px] leading-[150%] text-[#202020]/60 font-[460] max-w-[600px] mt-4">
          Built from the ground up for SOC2 compliance, auditability, and massive scale.
        </p>
      </div>

      <section>
        <h2 id="security" className="text-[24px] font-semibold text-[#202020] mb-4 mt-12">Security is not an afterthought</h2>
        <p>
          Deploying autonomous agents in a production enterprise environment introduces entirely new attack vectors: prompt injection, data exfiltration through tool use, and unauthorized lateral movement.
        </p>
        
        <p>
          Checkpost secures the perimeter around your agent, ensuring that even if an LLM is compromised via malicious prompt injection, the blast radius is tightly contained.
        </p>
      </section>

      <section>
        <h2 id="core-features" className="text-[24px] font-semibold text-[#202020] mb-4 mt-12">Core Enterprise Features</h2>
        
        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">1. Immutable Audit Logs</h3>
        <p>
          Every decision, API call, and state transition made by an agent is cryptographically signed and stored in an immutable ledger. When compliance auditors ask "Why did the system do this?", you can instantly replay the agent's exact reasoning trace and tool execution history.
        </p>

        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">2. Ephemeral Execution Environments</h3>
        <p>
          Agents execute external code (like generated Python scripts) in strictly isolated, ephemeral sandboxes. These environments are torn down immediately after execution, preventing persistent threats and ensuring complete memory safety between sessions.
        </p>
        
        <h3 className="text-[20px] font-medium text-[#202020] mt-8 mb-3">3. Role-Based Access Control (RBAC)</h3>
        <p>
          Agents assume IAM roles just like human employees. An HR parsing agent has read-only access to specific S3 buckets, while a deployment agent has write access to staging environments. Checkpost natively integrates with AWS IAM, Okta, and Azure AD.
        </p>

        <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-lg my-8">
          <h4 className="text-[16px] font-bold text-blue-900 mb-2">SOC2 Type II Certified</h4>
          <p className="text-[15px] text-blue-800 m-0">
            Checkpost has achieved SOC2 Type II compliance, ensuring our internal security protocols meet the rigorous standards required by Fortune 500 organizations.
          </p>
        </div>

      </section>

    </article>
  );
}