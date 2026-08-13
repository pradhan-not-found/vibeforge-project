import React from 'react';
import { Callout } from '@/components/Callout';

export const metadata = {
  title: 'How to start with Checkpost',
  description: 'Learn the basics of deploying secure AI agents using Checkpost.',
};

export default function StartPage() {
  return (
    <article className="max-w-[700px] pb-32">
      <span className="inline-block px-[10px] py-[3px] rounded-full border border-[#D6D5D0] text-[12px] font-medium text-[#7D7C78] mb-[20px]">
        Chapter I
      </span>
      <h1 className="text-[44px] leading-[110%] font-[460] mb-[32px] tracking-[-0.02em] text-[#262323]" id="introduction">
        How To Start
      </h1>
      
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Great companies usually start with a simple belief: something should exist that does not exist yet.
      </p>

      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Building AI agents is easier than ever, but deploying them securely remains a massive challenge. 
        If you are embedding your raw OpenAI or Anthropic API keys directly into your agent code, 
        you are exposing yourself to billing attacks, prompt injections, and data leaks.
      </p>

      <div className="p-[8px] bg-white rounded-[16px] border border-[#E8E7E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-[64px] mt-[32px]">
        <img src="https://cofounder.co/og/og-how-to-build.png" alt="How to build" className="w-full rounded-[10px] object-cover" />
      </div>

      <h2 className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]">
        Why use Checkpost?
      </h2>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.7)]">
        When you give an autonomous agent access to an API key, you are writing a blank check. 
        If a malicious user manages to jailbreak your agent, they can siphon your credits or perform 
        unauthorized actions on your behalf.
      </p>
      <p className="text-[17px] leading-[170%] mb-8 text-[rgba(38,35,35,0.7)]">
        Checkpost acts as a secure, intelligent proxy layer between your agents and your LLM providers. 
        Instead of giving your agents your real API keys, you give them a Checkpost Proxy Token.
      </p>

      <Callout badge="Checkpost Feature" title="Zero-Trust Architecture">
        Checkpost automatically monitors every single prompt and completion that passes through your agent. 
        If it detects a prompt injection or a malicious payload, the request is immediately blocked—before it 
        ever reaches OpenAI, saving you money and protecting your system.
      </Callout>

      <h2 className="text-[28px] font-[500] tracking-[-0.01em] mt-[64px] mb-[24px] text-[#262323]" id="setup">
        Setting up your workspace
      </h2>
      <p className="text-[17px] leading-[170%] mb-6 text-[rgba(38,35,35,0.7)]">
        Starting with Checkpost takes less than 3 minutes.
      </p>

      <ol className="list-decimal pl-[24px] space-y-[16px] mb-12 text-[17px] leading-[170%] text-[rgba(38,35,35,0.7)]">
        <li className="pl-[8px]">
          <strong className="font-[500] text-[#262323]">Create an account:</strong> Sign up for Checkpost using your email or GitHub. 
          You'll immediately be placed into your default secure Workspace.
        </li>
        <li className="pl-[8px]">
          <strong className="font-[500] text-[#262323]">Add your Provider Keys:</strong> Navigate to the Settings tab and securely store your real 
          API keys (like your <code className="text-[13px] bg-black/5 px-[6px] py-[2px] rounded-[4px] font-mono">sk-proj-...</code> OpenAI key or your Gemini API key). Checkpost encrypts these at rest.
        </li>
        <li className="pl-[8px]">
          <strong className="font-[500] text-[#262323]">Register an Agent:</strong> Go to the Agents tab and create a new Agent profile. 
          Checkpost will generate a unique Proxy URL and a safe <code className="text-[13px] bg-black/5 px-[6px] py-[2px] rounded-[4px] font-mono">cp_live_...</code> token.
        </li>
      </ol>

      <div className="mt-[48px] rounded-[12px] overflow-hidden" style={{ border: '1px solid rgba(32,32,32,0.1)' }}>
        <div className="bg-[#F8F9FA] px-[16px] py-[10px] flex items-center gap-[12px]" style={{ borderBottom: '1px solid rgba(32,32,32,0.1)' }}>
          <div className="flex gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-[#27C93F]"></div>
          </div>
          <span className="text-[12px] font-mono" style={{ color: 'rgba(32,32,32,0.5)' }}>agent.ts</span>
        </div>
        <div className="p-[20px] overflow-x-auto bg-[#1C1B1B]">
          <pre className="text-[13px] leading-[160%] font-mono text-[#E4E4E4] m-0">
            <code>
<span className="text-[#F286C4]">import</span> {'{'} OpenAI {'}'} <span className="text-[#F286C4]">from</span> <span className="text-[#E7C664]">'openai'</span>;{'\n\n'}
<span className="text-[#7A828E]">// Initialize OpenAI with your Checkpost Proxy URL and Token</span>{'\n'}
<span className="text-[#F286C4]">const</span> client = <span className="text-[#F286C4]">new</span> OpenAI({'{'}{'\n'}
{'  '}baseURL: <span className="text-[#E7C664]">'https://api.checkpost.app/v1'</span>,{'\n'}
{'  '}apiKey: process.env.CHECKPOST_AGENT_TOKEN,{'\n'}
{'}'});
            </code>
          </pre>
        </div>
      </div>

      <p className="text-[17px] leading-[170%] mt-[32px] text-[rgba(38,35,35,0.7)]">
        Once you've swapped out your base URL and API key, you're done. Your agent's requests will now be 
        securely routed through Checkpost's threat detection engine.
      </p>

    </article>
  );
}
