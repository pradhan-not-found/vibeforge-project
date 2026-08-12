export default function Page() {
  return (
    <div className="prose prose-blue max-w-none">
      <div className="inline-block px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-500 mb-6">Chapter I</div>
      <h1 className="text-4xl font-normal text-gray-900 mb-8">The Deterministic Policy Engine (The Rulebook)</h1>
      
      
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Instead of using another expensive AI model to monitor the agent, your firewall uses a deterministic, sub-millisecond rule engine based on a simple, declarative YAML configuration file.
      </p>
      
      <p className="text-gray-600 leading-relaxed mb-8">
        This file defines "deny-by-default" rules, allow-lists for safe tools, and exact parameter matching to block destructive shell commands or unauthorized database queries. Because it uses pure rule evaluation (no machine learning models required for the check), it adds practically zero latency (less than a millisecond) to the agent's workflow.
      </p>

      {/* Flowchart UI */}
      <div className="my-12 p-8 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">Request Evaluation Flow</h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-center font-medium">AI Agent</div>
          <div className="text-gray-400">&rarr;</div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm text-center font-bold text-blue-700">Checkpost Engine (Sub-ms)</div>
          <div className="text-gray-400">&rarr;</div>
          <div className="flex flex-col gap-2">
            <div className="p-2 bg-green-50 border border-green-200 rounded text-center text-sm font-medium text-green-700">Allow (Safe Tool)</div>
            <div className="p-2 bg-red-50 border border-red-200 rounded text-center text-sm font-medium text-red-700">Deny (Destructive)</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-normal text-gray-900 mt-12 mb-4">Why should I use it?</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-600">
        <li><strong>Zero Latency:</strong> ML-based monitors add seconds to every tool call. Deterministic rules add &lt;1ms.</li>
        <li><strong>Absolute Certainty:</strong> No hallucinations in the monitor itself. "Deny" means deny.</li>
        <li><strong>Developer Friendly:</strong> Configured via standard YAML that lives alongside your code.</li>
      </ul>
    
    </div>
  );
}