import React from 'react';
import { Callout } from '@/components/Callout';

export const metadata = {
  title: 'How to scale agents with Checkpost',
  description: 'Manage rate limits and custom policies.',
};

export default function ScalePage() {
  return (
    <article className="prose prose-lg prose-slate max-w-none text-[#2D2D2D]">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-8" id="ratelimits">
        How to scale
      </h1>
      
      <p className="text-lg text-[#5B5B5B] mb-12">
        As your agents move from internal testing to production, you will face new challenges: 
        denial of wallet attacks, strict API rate limits from providers, and the need for 
        custom compliance rules.
      </p>

      <h2 className="text-2xl font-semibold text-black mt-16 mb-6">
        Rate Limiting
      </h2>
      <p>
        If your agent is exposed to the public internet, a single malicious user could write a script 
        to spam it with thousands of requests, draining your OpenAI credits in minutes.
      </p>
      
      <p>
        Checkpost allows you to configure strict rate limits per agent or per end-user. 
        You can limit requests by:
      </p>

      <ul className="list-disc pl-6 space-y-2 text-[#4A4A4A] mt-4 mb-8">
        <li><strong>Requests per minute (RPM):</strong> E.g., max 50 requests per minute per user.</li>
        <li><strong>Tokens per day (TPD):</strong> E.g., max 100,000 tokens per day per agent.</li>
        <li><strong>Budget Caps:</strong> Hard limits on dollar spend per billing cycle.</li>
      </ul>

      <Callout badge="Cost Control" title="Denial of Wallet Protection" ctaText="Set up Policies" ctaLink="/dashboard/policies">
        <p>
          Once a rate limit is hit, Checkpost blocks the request instantly at the proxy edge, returning 
          a 429 Too Many Requests status. Your upstream provider never sees the traffic, and you never 
          pay for the tokens.
        </p>
      </Callout>

      <h2 className="text-2xl font-semibold text-black mt-16 mb-6" id="policies">
        Custom Policies
      </h2>
      <p>
        Not all threats are generic. Sometimes you need to enforce business-specific rules on your agents.
      </p>

      <p>
        With Checkpost Custom Policies, you can write natural language rules that evaluate every prompt 
        and completion. For example:
      </p>

      <div className="bg-[#1E1E1E] p-6 rounded-xl border border-black/10 my-8 shadow-sm">
        <pre className="text-sm font-mono text-[#D4D4D4] m-0 whitespace-pre-wrap">
          {`# Policy: Support Agent Restrictions
- Do not discuss topics outside of company billing and account management.
- Do not mention competitor names (e.g., CompetitorA, CompetitorB).
- If the user asks for a refund over $500, escalate to human and return a predefined message.`}
        </pre>
      </div>

      <p>
        Checkpost evaluates these policies using a parallel, low-latency LLM router before forwarding 
        your request. If the policy is violated, the execution is blocked. This gives you 
        unprecedented control over what your autonomous agents are allowed to say and do.
      </p>

      <p className="mt-16 font-semibold">
        Ready to deploy production-grade agents? 
      </p>
      
      <a href="/login" className="inline-block mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
        Create your Checkpost Account
      </a>

    </article>
  );
}
