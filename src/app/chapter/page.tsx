import Link from 'next/link';

export default function DocsIndex() {
  return (
    <div className="prose prose-blue max-w-none">
      <div className="inline-block px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-500 mb-6">Chapter I</div>
      <h1 className="text-4xl font-normal text-gray-900 mb-8">Introduction to Checkpost</h1>
      
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Great AI agents usually start with a simple belief: autonomous execution should exist, but it must be secure.
      </p>
      
      <p className="text-gray-600 leading-relaxed mb-8">
        At zero, you do not need a perfect plan, but as companies give AI agents access to live databases, internal systems, and corporate credit cards, they face a massive security risk: if the agent hallucinates or enters an infinite loop, it can cause catastrophic financial or data loss.
      </p>

      <p className="text-gray-600 leading-relaxed mb-12">
        This documentation is about what you do to protect your systems from literal zero to enterprise scale.
      </p>

      <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center mb-12">
        {/* Placeholder for an image like the 8-bit rocket in the screenshot */}
        <div className="text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <p className="text-gray-400 font-medium">Checkpost WAF Architecture</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/docs/deterministic-policy-engine" className="block p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Deterministic Policy Engine &rarr;</h3>
          <p className="text-sm text-gray-500">Learn how the rulebook works at the wire-level.</p>
        </Link>
        <Link href="/docs/cost-governance" className="block p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Governance &rarr;</h3>
          <p className="text-sm text-gray-500">Understand loop protection and hard stops.</p>
        </Link>
      </div>
    </div>
  );
}
