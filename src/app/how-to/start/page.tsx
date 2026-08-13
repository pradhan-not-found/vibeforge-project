import React from 'react';
import { Callout } from '@/components/Callout';

export const metadata = {
  title: 'How to start with Checkpost',
  description: 'Learn the basics of deploying secure AI agents using Checkpost.',
};

export default function StartPage() {
  return (
    <article className="prose prose-lg prose-slate max-w-none text-[#2D2D2D]">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-8" id="introduction">
        How to start
      </h1>
      
      <p className="text-lg text-[#5B5B5B] mb-12">
        Building AI agents is easier than ever, but deploying them securely remains a massive challenge. 
        If you are embedding your raw OpenAI or Anthropic API keys directly into your agent code, 
        you are exposing yourself to billing attacks, prompt injections, and data leaks.
      </p>

      <h2 className="text-2xl font-semibold text-black mt-16 mb-6">
        Why use Checkpost?
      </h2>
      <p>
        When you give an autonomous agent access to an API key, you are writing a blank check. 
        If a malicious user manages to jailbreak your agent, they can siphon your credits or perform 
        unauthorized actions on your behalf.
      </p>
      <p>
        Checkpost acts as a secure, intelligent proxy layer between your agents and your LLM providers. 
        Instead of giving your agents your real API keys, you give them a Checkpost Proxy Token.
      </p>

      <Callout badge="Checkpost Feature" title="Zero-Trust Architecture">
        <p>
          Checkpost automatically monitors every single prompt and completion that passes through your agent. 
          If it detects a prompt injection or a malicious payload, the request is immediately blocked—before it 
          ever reaches OpenAI, saving you money and protecting your system.
        </p>
      </Callout>

      <h2 className="text-2xl font-semibold text-black mt-16 mb-6" id="setup">
        Setting up your workspace
      </h2>
      <p>
        Starting with Checkpost takes less than 3 minutes.
      </p>

      <ol className="list-decimal pl-6 space-y-4 text-[#4A4A4A]">
        <li>
          <strong>Create an account:</strong> Sign up for Checkpost using your email or GitHub. 
          You'll immediately be placed into your default secure Workspace.
        </li>
        <li>
          <strong>Add your Provider Keys:</strong> Navigate to the Settings tab and securely store your real 
          API keys (like your `sk-proj-...` OpenAI key or your Gemini API key). Checkpost encrypts these at rest.
        </li>
        <li>
          <strong>Register an Agent:</strong> Go to the Agents tab and create a new Agent profile. 
          Checkpost will generate a unique Proxy URL and a safe `cp_live_...` token.
        </li>
      </ol>

      <div className="mt-12 bg-white rounded-xl border border-black/10 overflow-hidden shadow-sm">
        <div className="bg-[#F8F9FA] border-b border-black/10 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>
          <span className="text-xs text-gray-500 font-mono ml-2">agent.ts</span>
        </div>
        <div className="p-4 overflow-x-auto bg-[#1E1E1E]">
          <pre className="text-sm font-mono text-[#D4D4D4] m-0">
            <code>
<span className="text-[#569CD6]">import</span> {'{'} OpenAI {'}'} <span className="text-[#569CD6]">from</span> <span className="text-[#CE9178]">'openai'</span>;{'\n\n'}
<span className="text-[#6A9955]">// Initialize OpenAI with your Checkpost Proxy URL and Token</span>{'\n'}
<span className="text-[#569CD6]">const</span> client = <span className="text-[#569CD6]">new</span> OpenAI({'{'}{'\n'}
{'  '}baseURL: <span className="text-[#CE9178]">'https://api.checkpost.app/v1'</span>,{'\n'}
{'  '}apiKey: process.env.CHECKPOST_AGENT_TOKEN,{'\n'}
{'}'});
            </code>
          </pre>
        </div>
      </div>

      <p className="mt-8">
        Once you've swapped out your base URL and API key, you're done. Your agent's requests will now be 
        securely routed through Checkpost's threat detection engine.
      </p>

    </article>
  );
}
