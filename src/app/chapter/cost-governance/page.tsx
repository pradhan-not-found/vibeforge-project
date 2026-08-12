import React from 'react';
import Link from 'next/link';
import { DollarSign, AlertCircle, Ban, TrendingUp } from 'lucide-react';

export default function CostGovernance() {
  return (
    <article className="animate-fade-down text-[#262323]">
      <header className="mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-[10px] font-mono uppercase tracking-wider mb-4 border border-blue-100">
          Chapter II
        </span>
        <h1 className="text-4xl md:text-5xl font-normal leading-[110%] tracking-tight mb-6">
          Cost Governance & Loop Protection
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed font-[460]">
          Prevent catastrophic bills caused by agent hallucinations. Checkpost enforces hard-stops at the network level, ensuring an infinite loop never translates to infinite API charges.
        </p>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">The Infinite Loop Problem</h2>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          Autonomous agents operate in loops (e.g., ReAct, Plan-and-Execute). If an agent fails to achieve its goal or misunderstands an API response, it can retry endlessly. When connected to paid external APIs or cloud infrastructure, a simple bug can drain thousands of dollars in hours.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-red-50 p-5 rounded-xl border border-red-100">
            <TrendingUp className="w-6 h-6 text-red-500 mb-3" />
            <h4 className="font-semibold text-red-900 mb-1">Runaway API Calls</h4>
            <p className="text-xs text-red-700">An agent retrying a failed payment API 10,000 times a minute.</p>
          </div>
          <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
            <DollarSign className="w-6 h-6 text-amber-500 mb-3" />
            <h4 className="font-semibold text-amber-900 mb-1">Inference Drain</h4>
            <p className="text-xs text-amber-700">Wasting $500/day on LLM tokens just to process the repeated failures.</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
            <Ban className="w-6 h-6 text-blue-500 mb-3" />
            <h4 className="font-semibold text-blue-900 mb-1">Silent Failures</h4>
            <p className="text-xs text-blue-700">The loop often goes unnoticed until the billing cycle ends.</p>
          </div>
        </div>
      </section>

      {/* Visual Block */}
      <div className="my-14 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50 p-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-gray-500" />
            Checkpost Hard Stop Mechanism
          </h3>
        </div>
        <div className="p-8">
          <div className="flex flex-col gap-6 max-w-lg mx-auto">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-sm font-medium">Daily Token Limit</span>
              <span className="text-sm font-mono bg-white px-2 py-1 rounded border border-gray-200">100,000</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-sm font-medium">Max Spend / Action</span>
              <span className="text-sm font-mono bg-white px-2 py-1 rounded border border-gray-200">$5.00</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 border border-red-200 ring-2 ring-red-500/20">
              <span className="text-sm font-medium text-red-900">API Call Rate Limit</span>
              <span className="text-sm font-mono text-red-700 bg-white px-2 py-1 rounded border border-red-200">10 / minute</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 text-gray-300 p-4 text-xs font-mono text-center">
          SYSTEM: Agent exceeded rate limit. Network connections severed. Pending HITL review.
        </div>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">How Checkpost Intervenes</h2>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          Checkpost tracks every outbound byte at the wire level. It isn't dependent on the agent's internal logging (which can fail if the agent crashes). You define budgets in the policy config, and Checkpost enforces them mercilessly.
        </p>
      </section>
      
      {/* CTA Block */}
      <div className="my-16 bg-[#262323] rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Stop burning money</h3>
          <p className="text-gray-300 max-w-md">
            Implement hard caps on your agents today and sleep peacefully knowing your infrastructure is protected.
          </p>
        </div>
        <Link href="/dashboard" className="shrink-0 bg-white text-[#262323] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm">
          Set Up Budgets
        </Link>
      </div>

    </article>
  );
}