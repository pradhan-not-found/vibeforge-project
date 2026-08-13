import React from 'react';

export default function EnterpriseReadyPage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter IV
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="introduction">
        Enterprise Ready & Secure
      </h1>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Built from the ground up for SOC2 compliance, immutable auditability, and massive scale. Protect your infrastructure from novel AI-specific attack vectors.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="/books-covers/UI%2004/Frame%202147239727.png" alt="Enterprise Ready" className="w-full rounded-[10px] object-cover" />
      </div>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Deploying autonomous agents in a production enterprise environment introduces entirely new attack vectors that traditional security perimeters were not designed to handle. These include advanced prompt injection attacks, data exfiltration through authorized tool use, and the risk of unauthorized lateral movement by agents with overly permissive roles.
      </p>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Checkpost explicitly secures the perimeter <em>around</em> your agent. By creating a zero-trust envelope, Checkpost ensures that even in a worst-case scenario where an underlying LLM is compromised via malicious prompt injection, the blast radius is tightly contained and system integrity remains uncompromised.
      </p>

      {/* Flowchart Diagram */}
      <div className="w-full bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-[64px] mt-[40px] p-[32px] flex flex-col items-center">
        <h3 id="zero-trust" className="text-[14px] font-[500] text-[#262323] mb-[32px] tracking-wide uppercase opacity-70">Security Perimeter Architecture</h3>
        
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-row gap-6 w-full justify-center">
            <div className="flex flex-col items-center p-4 bg-[#F9F9F8] border border-[#E8E7E6] rounded-[12px] w-[160px] shadow-sm">
              <span className="text-[14px] font-[600] text-[#262323]">User Input</span>
              <span className="text-[11px] text-[#7D7C78] mt-1 text-center font-mono bg-white px-1 py-0.5 rounded border border-[#E8E7E6] mt-2">Potential Threat</span>
            </div>
          </div>
          
          <div className="h-[24px] w-[2px] bg-[#D6D5D0]"></div>
          
          <div className="w-full max-w-[480px] border-2 border-[#166534] bg-[#F0FDF4] p-6 rounded-[16px] relative flex flex-col items-center shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#166534] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Zero-Trust Envelope</div>
            
            <div className="flex flex-row justify-between w-full gap-4 relative z-10">
              <div className="flex flex-col items-center p-3 bg-white border border-[#BBF7D0] rounded-[8px] flex-1 text-center shadow-sm">
                <span className="text-[12px] font-[600] text-[#166534]">Input Sanitization</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white border border-[#BBF7D0] rounded-[8px] flex-1 text-center shadow-sm">
                <span className="text-[12px] font-[600] text-[#166534]">Execution Sandbox</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white border border-[#BBF7D0] rounded-[8px] flex-1 text-center shadow-sm">
                <span className="text-[12px] font-[600] text-[#166534]">Output Filtering</span>
              </div>
            </div>
          </div>

          <div className="h-[24px] w-[2px] bg-[#D6D5D0]"></div>
          
          <div className="flex flex-col items-center p-4 bg-[#F9F9F8] border border-[#E8E7E6] rounded-[12px] w-[180px] shadow-sm">
            <span className="text-[14px] font-[600] text-[#262323]">Enterprise Systems</span>
            <span className="text-[11px] text-[#7D7C78] mt-1 text-center">Safely accessed</span>
          </div>
        </div>
      </div>

      <h2 id="core-features" className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">Core Enterprise Features</h2>
      
      <h3 id="audit-logs" className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">1. Immutable Audit Logs</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Every decision, API call, state transition, and tool execution made by an agent is cryptographically signed and stored in a read-only, immutable ledger. When compliance auditors or security teams ask "Why did the system do this?", you can instantly replay the agent's exact reasoning trace, prompt context, and execution history with absolute certainty.
      </p>

      {/* White Dashboard Snippet for Audit Logs */}
      <div className="bg-white border border-[#E8E7E6] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px] rounded-[16px] my-[40px] overflow-hidden relative">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#F0F0F0]">
          <span className="text-[14px] font-[600] text-[#262323]">Cryptographic Audit Trail</span>
          <span className="text-[11px] px-2 py-1 bg-[#F5F5F2] text-[#5B5B5B] font-mono rounded-[6px]">SHA-256</span>
        </div>
        <div className="font-mono text-[12px] flex flex-col gap-2">
          <div className="flex items-center gap-3 bg-[#F9F9F8] p-2 rounded">
            <span className="text-[#059669]">✓</span>
            <span className="text-[#5B5B5B]">Hash:</span>
            <span className="text-[#262323]">a9b4f7c2...d1e8</span>
            <span className="text-[#7D7C78] ml-auto">14:02:45 UTC</span>
          </div>
          <div className="flex items-center gap-3 bg-[#F9F9F8] p-2 rounded">
            <span className="text-[#059669]">✓</span>
            <span className="text-[#5B5B5B]">Hash:</span>
            <span className="text-[#262323]">c4e2a1b9...f8a3</span>
            <span className="text-[#7D7C78] ml-auto">14:02:46 UTC</span>
          </div>
          <div className="flex items-center gap-3 bg-[#F9F9F8] p-2 rounded">
            <span className="text-[#059669]">✓</span>
            <span className="text-[#5B5B5B]">Hash:</span>
            <span className="text-[#262323]">f7d3e9c1...b2a5</span>
            <span className="text-[#7D7C78] ml-auto">14:02:48 UTC</span>
          </div>
        </div>
      </div>

      <h3 id="ephemeral-environments" className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">2. Ephemeral Execution Environments</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Agents frequently need to execute dynamically generated code (like Python scripts for data analysis). Checkpost runs these scripts in strictly isolated, ephemeral Docker sandboxes. These micro-environments have zero network access by default and are torn down and destroyed immediately after execution. This prevents persistent threats, malware installation, and ensures complete memory safety between agent sessions.
      </p>
      
      <h3 className="text-[20px] font-medium text-[#202020] mt-[40px] mb-4">3. Role-Based Access Control (RBAC)</h3>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.8)]">
        Agents assume Identity and Access Management (IAM) roles just like human employees. An HR parsing agent operates with strict read-only access to specific S3 buckets, while an infrastructure deployment agent has write access exclusively to staging environments. Checkpost natively integrates with enterprise identity providers including AWS IAM, Okta, and Azure AD to map agent identities to your existing corporate hierarchy.
      </p>

      {/* Light SOC2 Badge */}
      <div className="bg-white border border-[#E8E7E6] p-[24px] rounded-[16px] my-[40px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 bg-[#F5F5F2] rounded-full flex items-center justify-center border border-[#E8E7E6]">
          <svg className="w-6 h-6 text-[#262323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h4 className="text-[16px] font-[600] text-[#262323] mb-[8px]">SOC2 Type II Certified</h4>
          <p className="text-[15px] leading-[160%] text-[#5B5B5B] m-0">
            Checkpost has achieved SOC2 Type II compliance. Our internal security protocols, data handling procedures, and infrastructure isolation meet the rigorous auditable standards required by Fortune 500 organizations.
          </p>
        </div>
      </div>

      {/* What comes next block */}
      <div className="mt-[120px] pt-[40px]">
        <h4 className="text-[17px] font-[460] text-[#7D7C78] mb-[24px]">What comes next:</h4>
        <p className="text-[17px] leading-[170%] mb-[32px] text-[#262323]">
          You have learned all the fundamentals of deploying secure, governed AI agents. The next step is to create an account and configure your first agent.
        </p>
        
        <a href="/login" className="inline-flex items-center bg-[#111] text-white px-[16px] py-[10px] rounded-[8px] font-[500] text-[14px] hover:opacity-90 transition-opacity no-underline">
          Go to Checkpost Dashboard
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}