import React from 'react';
import { Callout } from '@/components/Callout';

export const metadata = {
  title: 'How to scale agents with Checkpost',
  description: 'Manage rate limits and custom policies.',
};

export default function ScalePage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter IV
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="production">
        How To Scale
      </h1>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Taking an agent from a local script to a production service requires handling rate limits, 
        managing context windows, and dealing with inevitable API failures.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="https://cofounder.co/og/og-how-to-build.png" alt="How to scale" className="w-full rounded-[10px] object-cover" />
      </div>

      <h2 className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">
        Rate Limiting
      </h2>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.7)]">
        OpenAI and Anthropic enforce strict rate limits on requests per minute (RPM) and tokens per minute (TPM). 
        If a malicious user floods your agent with requests, they can exhaust your quota, taking down your service 
        for everyone else.
      </p>

      <div className="bg-[#1C1B1B] p-[20px] rounded-[12px] my-[32px] overflow-x-auto">
        <pre className="text-[13px] leading-[160%] font-mono text-[#E4E4E4] m-0">
          <code>
<span className="text-[#7A828E]">// Using Checkpost Rate Limiting in your API handler</span>{'\n'}
<span className="text-[#F286C4]">export async function</span> <span className="text-[#82AAFF]">POST</span>(req: Request) {'{'}{'\n'}
{'  '}<span className="text-[#F286C4]">const</span> ip = req.headers.<span className="text-[#82AAFF]">get</span>(<span className="text-[#E7C664]">'x-forwarded-for'</span>);{'\n'}
{'  '}<span className="text-[#F286C4]">const</span> isAllowed = <span className="text-[#F286C4]">await</span> checkpost.rateLimit(ip, {'{'}{'\n'}
{'    '}requestsPerMinute: <span className="text-[#F78C6C]">10</span>,{'\n'}
{'    '}tokensPerMinute: <span className="text-[#F78C6C]">5000</span>{'\n'}
{'  }'});{'\n\n'}
{'  '}<span className="text-[#F286C4]">if</span> (!isAllowed) <span className="text-[#F286C4]">return new</span> Response(<span className="text-[#E7C664]">'Too Many Requests'</span>, {'{'} status: <span className="text-[#F78C6C]">429</span> {'}'});{'\n'}
{'}'}
          </code>
        </pre>
      </div>

      <p className="text-[17px] leading-[170%] mt-[32px] text-[rgba(38,35,35,0.7)]">
        Checkpost allows you to define custom rate limiting rules at the proxy level. You can limit usage by 
        IP address, user ID, or global agent thresholds, ensuring fair usage and protecting your upstream API limits.
      </p>

      <h2 className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]" id="policies">
        Custom Policies
      </h2>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.7)]">
        Not all threats are generic. Sometimes you need to enforce business-specific rules on your agents.
      </p>

      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.7)]">
        With Checkpost Custom Policies, you can write natural language rules that evaluate every prompt 
        and completion. For example:
      </p>

      <div className="bg-[#1C1B1B] p-[20px] rounded-[12px] my-[32px]">
        <pre className="text-[13px] leading-[160%] font-mono text-[#E4E4E4] m-0 whitespace-pre-wrap">
          <span className="text-[#7A828E]">{`# Policy: Support Agent Restrictions`}</span>{`
- Do not discuss topics outside of company billing and account management.
- Do not mention competitor names (e.g., CompetitorA, CompetitorB).
- If the user asks for a refund over $500, escalate to human and return a predefined message.`}
        </pre>
      </div>

      <p className="text-[17px] leading-[170%] mt-[32px] text-[rgba(38,35,35,0.7)]">
        Checkpost evaluates these policies using a parallel, low-latency LLM router before forwarding 
        your request. If the policy is violated, the execution is blocked. This gives you 
        unprecedented control over what your autonomous agents are allowed to say and do.
      </p>

      <p className="text-[17px] leading-[170%] mt-[64px] font-[500] text-[#262323]">
        Ready to deploy production-grade agents? 
      </p>
      
      <a href="/login" className="inline-flex mt-4 items-center justify-center bg-[#262323] hover:bg-[#111] text-white px-[20px] py-[12px] rounded-[8px] text-[15px] font-[500] transition-colors no-underline">
        Create your Checkpost Account
      </a>

    </article>
  );
}
