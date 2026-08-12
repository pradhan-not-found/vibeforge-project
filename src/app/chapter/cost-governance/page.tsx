export default function Page() {
  return (
    <div className="prose prose-blue max-w-none">
      <div className="inline-block px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-500 mb-6">Chapter II</div>
      <h1 className="text-4xl font-normal text-gray-900 mb-8">Cost Governance and Loop Protection (The Hard Stop)</h1>
      
      
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        A major fear in the enterprise world is an agent entering a "retry loop" and consuming thousands of dollars in LLM API tokens before anyone notices.
      </p>
      
      <p className="text-gray-600 leading-relaxed mb-8">
        Your proxy tracks accumulated costs and establishes caps on loop counts, tool calls, and retries to detect low-yield execution patterns. If the agent hits the budget ceiling defined in the YAML file, the gateway cuts consumption instantly. It acts as a hard stop, not just a passive alert.
      </p>

      {/* Flowchart UI */}
      <div className="my-12 p-8 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">Loop Protection Flow</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
            <div className="flex-1 p-4 bg-white border border-gray-300 rounded-lg shadow-sm">Agent executes prompt (Cost: $0.05)</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
            <div className="flex-1 p-4 bg-white border border-gray-300 rounded-lg shadow-sm">Agent retries on failure (Cumulative: $0.10)</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">!</div>
            <div className="flex-1 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm font-medium text-red-700">Hard Stop Triggered: Max retries exceeded. Connection severed.</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-normal text-gray-900 mt-12 mb-4">Why should I use it?</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-600">
        <li><strong>Financial Safety:</strong> Prevent infinite loops from draining your OpenAI/Anthropic balance overnight.</li>
        <li><strong>Proactive Action:</strong> A Slack alert is too slow if an agent is burning $10/second. A hard stop saves money instantly.</li>
        <li><strong>Granular Budgets:</strong> Set different budgets per agent (e.g. Data Analysis Agent gets $5/day, Support gets $1/day).</li>
      </ul>
    
    </div>
  );
}