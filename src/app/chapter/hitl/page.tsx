import React from 'react';
import Link from 'next/link';
import { UserCog, Pause, Play, Eye } from 'lucide-react';

export default function HITL() {
  return (
    <article className="animate-fade-down text-[#262323]">
      <header className="mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-[10px] font-mono uppercase tracking-wider mb-4 border border-blue-100">
          Chapter III
        </span>
        <h1 className="text-4xl md:text-5xl font-normal leading-[110%] tracking-tight mb-6">
          Human-in-the-Loop (HITL) Interruption
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed font-[460]">
          When an agent attempts a high-risk action, Checkpost pauses the network request and alerts you. Nothing dangerous ships without your explicit approval.
        </p>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">Trust, but Verify</h2>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          AI agents are powerful, but they lack human intuition for business risk. Some actions—like processing refunds, deleting databases, or sending mass emails—should always have human oversight until the agent is fully proven.
        </p>
      </section>

      {/* Visual Block */}
      <div className="my-14 rounded-2xl border border-gray-200 bg-[#FAFAF7] p-8 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-mono px-2 py-0.5 rounded uppercase">Paused</span>
                  <span className="text-sm font-semibold text-gray-900">Database Agent</span>
                </div>
                <p className="text-xs text-gray-500 font-mono mb-4">POST /api/v1/users/drop_table</p>
                <div className="text-sm text-gray-600 mb-6">
                  Agent attempted to execute a destructive operation that exceeds its security clearance.
                </div>
              </div>
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                <Pause className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-gray-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors">
                <Play className="w-4 h-4" /> Approve & Resume
              </button>
              <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                <Eye className="w-4 h-4" /> Inspect Payload
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">The Dashboard Experience</h2>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          The Checkpost dashboard aggregates all paused actions across your entire agent fleet. You can review the exact API payload the agent generated, modify it if necessary, and then allow it to proceed—or reject it and return a simulated error to the agent to observe how it recovers.
        </p>
      </section>
      
      {/* CTA Block */}
      <div className="my-16 bg-blue-600 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Take back control</h3>
          <p className="text-blue-100 max-w-md">
            View your dashboard now to see if any agents are waiting for your approval.
          </p>
        </div>
        <Link href="/dashboard" className="shrink-0 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm">
          Open Dashboard
        </Link>
      </div>

    </article>
  );
}