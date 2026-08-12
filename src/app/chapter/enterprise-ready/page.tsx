export default function Page() {
  return (
    <div className="prose prose-blue max-w-none">
      <div className="inline-block px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-500 mb-6">Chapter IV</div>
      <h1 className="text-4xl font-normal text-gray-900 mb-8">Enterprise Ready & Secure</h1>
      
      
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Checkpost is built from the ground up for enterprise environments, designed to meet strict compliance and security requirements while remaining invisible to the end user.
      </p>
      
      <p className="text-gray-600 leading-relaxed mb-8">
        We ensure that as you scale your autonomous workforce, your security posture scales with it. From multi-tenant isolation to comprehensive audit logs that map to SOC2 and ISO27001 requirements.
      </p>

      {/* Grid UI */}
      <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="text-2xl mb-3">🏢</div>
          <h4 className="font-semibold text-gray-900 mb-2">Multi-Tenant Architecture</h4>
          <p className="text-sm text-gray-500">Securely isolate API keys, agent policies, and logs across different departments or external users.</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="text-2xl mb-3">📜</div>
          <h4 className="font-semibold text-gray-900 mb-2">Immutable Audit Logs</h4>
          <p className="text-sm text-gray-500">Every tool call, approval, and rejection is cryptographically hashed and stored for compliance reviews.</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="text-2xl mb-3">🔐</div>
          <h4 className="font-semibold text-gray-900 mb-2">BYO-Keys (Bring Your Own)</h4>
          <p className="text-sm text-gray-500">Never share your global OpenAI keys again. Scope keys dynamically based on agent roles.</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="text-2xl mb-3">⚡</div>
          <h4 className="font-semibold text-gray-900 mb-2">Edge Deployment</h4>
          <p className="text-sm text-gray-500">Deploy the proxy directly to the edge (Vercel/Cloudflare) for sub-10ms global routing.</p>
        </div>
      </div>

      <h2 className="text-2xl font-normal text-gray-900 mt-12 mb-4">Why should I use it?</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-600">
        <li><strong>Compliance Built-In:</strong> Easily pass security reviews when procuring AI tools.</li>
        <li><strong>Scalability:</strong> Built to handle thousands of concurrent agent requests.</li>
        <li><strong>Privacy:</strong> We don't train on your logs. Your agent's context window remains yours.</li>
      </ul>
    
    </div>
  );
}