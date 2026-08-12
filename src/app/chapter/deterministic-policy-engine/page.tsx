import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, FileJson, Zap } from 'lucide-react';

export default function DeterministicPolicyEngine() {
  return (
    <article className="animate-fade-down text-[#262323]">
      <header className="mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-[10px] font-mono uppercase tracking-wider mb-4 border border-blue-100">
          Chapter I
        </span>
        <h1 className="text-4xl md:text-5xl font-normal leading-[110%] tracking-tight mb-6">
          The Deterministic Policy Engine
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed font-[460]">
          Instead of relying on unpredictable secondary AI models to monitor your primary agents, Checkpost employs a lightning-fast, rules-based engine. It evaluates every request against your strict policies in under 5 milliseconds.
        </p>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">Why Not AI for Security?</h2>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          A common approach to agent security is pointing a "supervisor LLM" at the acting agent to evaluate its choices. This is fundamentally flawed for three reasons:
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">1</div>
            <div>
              <strong className="block text-gray-900 font-semibold">Latency Overhead</strong>
              <span className="text-gray-600">Waiting 2-3 seconds for a supervisor LLM to approve an action breaks real-time agent workflows.</span>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">2</div>
            <div>
              <strong className="block text-gray-900 font-semibold">Compounding Hallucinations</strong>
              <span className="text-gray-600">LLMs hallucinate. A supervisor LLM can easily be tricked or misunderstand context, falsely blocking good actions or allowing dangerous ones.</span>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">3</div>
            <div>
              <strong className="block text-gray-900 font-semibold">Astronomical Costs</strong>
              <span className="text-gray-600">Running a supervisor model doubles your inference costs per action.</span>
            </div>
          </li>
        </ul>
      </section>

      {/* Visual Block */}
      <div className="my-14 rounded-2xl border border-gray-200 bg-[#FAFAF7] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-semibold text-lg">Policy Evaluation Flow</h3>
          <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">&lt; 5ms Latency</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="mx-auto w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold">Agent Request</div>
            <div className="text-xs text-gray-500 mt-1">Stripe Refund API</div>
          </div>
          
          <ArrowRight className="w-6 h-6 text-gray-300 rotate-90 md:rotate-0" />
          
          <div className="flex-1 bg-gray-900 text-white p-4 rounded-xl border border-gray-800 shadow-lg text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/10 pattern-grid-lg"></div>
            <div className="relative z-10">
              <div className="mx-auto w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                <FileJson className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold">YAML Policy Engine</div>
              <div className="text-xs text-gray-400 mt-1">Checks allow-lists & limits</div>
            </div>
          </div>
          
          <ArrowRight className="w-6 h-6 text-gray-300 rotate-90 md:rotate-0" />
          
          <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="mx-auto w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold">Action Allowed</div>
            <div className="text-xs text-gray-500 mt-1">Forwarded to API</div>
          </div>
        </div>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">The Checkpost Rulebook</h2>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          Instead of prompting a model, you configure Checkpost using declarative YAML. It operates on a strict "deny-by-default" methodology. If an API endpoint or parameter isn't explicitly allowed, the request is intercepted.
        </p>
        
        <div className="bg-[#1E1E1E] rounded-xl p-6 overflow-x-auto shadow-inner border border-gray-800">
          <pre className="text-sm font-mono leading-loose text-gray-300">
<span className="text-blue-400">agent_id:</span> <span className="text-green-400">"refund_agent_01"</span>
<br/>
<span className="text-blue-400">allowed_endpoints:</span>
<br/>
&nbsp;&nbsp;- <span className="text-blue-400">url:</span> <span className="text-green-400">"https://api.stripe.com/v1/refunds"</span>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">method:</span> <span className="text-green-400">"POST"</span>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">parameter_constraints:</span>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">amount:</span> <span className="text-yellow-300">"&lt;= 500.00"</span>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">currency:</span> <span className="text-green-400">"USD"</span>
          </pre>
        </div>
      </section>
      
      {/* CTA Block */}
      <div className="my-16 bg-blue-600 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Ready to secure your agents?</h3>
          <p className="text-blue-100 max-w-md">
            Start writing deterministic policies in minutes. Stop worrying about what your agents might do next.
          </p>
        </div>
        <Link href="/dashboard" className="shrink-0 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm">
          Try the Policy Engine
        </Link>
      </div>

    </article>
  );
}