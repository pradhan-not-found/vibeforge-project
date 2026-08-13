import React from 'react';

export default function EnterpriseReadyPage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter IV
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="security">
        Enterprise Ready & Secure
      </h1>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Built from the ground up for SOC2 compliance, auditability, and massive scale.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="/books-covers/UI%2004/Frame%202147239727.png" alt="Enterprise Ready" className="w-full rounded-[10px] object-cover" />
      </div>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Deploying autonomous agents in a production enterprise environment introduces entirely new attack vectors: prompt injection, data exfiltration through tool use, and unauthorized lateral movement.
      </p>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Checkpost secures the perimeter around your agent, ensuring that even if an LLM is compromised via malicious prompt injection, the blast radius is tightly contained.
      </p>

      <h2 id="core-features" className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">Core Enterprise Features</h2>
      
      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">1. Immutable Audit Logs</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Every decision, API call, and state transition made by an agent is cryptographically signed and stored in an immutable ledger. When compliance auditors ask "Why did the system do this?", you can instantly replay the agent's exact reasoning trace and tool execution history.
      </p>

      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">2. Ephemeral Execution Environments</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Agents execute external code (like generated Python scripts) in strictly isolated, ephemeral sandboxes. These environments are torn down immediately after execution, preventing persistent threats and ensuring complete memory safety between sessions.
      </p>
      
      <h3 className="text-[20px] font-medium text-[#202020] mt-[32px] mb-3">3. Role-Based Access Control (RBAC)</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Agents assume IAM roles just like human employees. An HR parsing agent has read-only access to specific S3 buckets, while a deployment agent has write access to staging environments. Checkpost natively integrates with AWS IAM, Okta, and Azure AD.
      </p>

      <div className="bg-[#1C1B1B] p-[20px] rounded-[12px] my-[32px]">
        <h4 className="text-[16px] font-[500] text-[#E4E4E4] mb-[12px]">SOC2 Type II Certified</h4>
        <p className="text-[15px] leading-[160%] text-[#A0A0A0] m-0">
          Checkpost has achieved SOC2 Type II compliance, ensuring our internal security protocols meet the rigorous standards required by Fortune 500 organizations.
        </p>
      </div>

    </article>
  );
}