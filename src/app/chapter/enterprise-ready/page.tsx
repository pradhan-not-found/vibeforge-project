import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Server, CheckCircle2 } from 'lucide-react';

export default function EnterpriseReady() {
  return (
    <article className="animate-fade-down text-[#262323]">
      <header className="mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-[10px] font-mono uppercase tracking-wider mb-4 border border-blue-100">
          Chapter IV
        </span>
        <h1 className="text-4xl md:text-5xl font-normal leading-[110%] tracking-tight mb-6">
          Enterprise Ready & Secure
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed font-[460]">
          Checkpost is built from the ground up for massive scale, zero-trust environments, and strict compliance requirements.
        </p>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">Built for Scale</h2>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          Deploying autonomous agents across an enterprise requires infrastructure that won't buckle under load. Checkpost's proxy architecture is designed to handle thousands of concurrent agent requests with sub-millisecond added latency.
        </p>
      </section>

      {/* Visual Block */}
      <div className="my-14 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Zero-Trust Architecture</h3>
              <p className="text-sm text-gray-600">Every agent request is cryptographically verified and authenticated before evaluation.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">SOC2 Compliance</h3>
              <p className="text-sm text-gray-600">Full audit logging of every action an agent takes, ready for compliance export.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">On-Premise Deployment</h3>
              <p className="text-sm text-gray-600">Deploy Checkpost entirely within your own VPC to ensure data never leaves your network.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">99.99% Uptime SLA</h3>
              <p className="text-sm text-gray-600">Enterprise grade reliability backed by comprehensive SLAs.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Block */}
      <div className="my-16 bg-[#1E1E1E] rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Need Enterprise Support?</h3>
          <p className="text-gray-400 max-w-md">
            Talk to our engineering team about custom integrations, volume pricing, and on-premise deployments.
          </p>
        </div>
        <Link href="mailto:enterprise@checkpost.app" className="shrink-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          Contact Sales
        </Link>
      </div>

    </article>
  );
}