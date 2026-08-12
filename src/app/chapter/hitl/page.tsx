export default function Page() {
  return (
    <div className="prose prose-blue max-w-none">
      <div className="inline-block px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-500 mb-6">Chapter III</div>
      <h1 className="text-4xl font-normal text-gray-900 mb-8">Human-in-the-Loop (HITL) Interruption</h1>
      
      
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        When the agent attempts to use a highly sensitive tool (like dropping a database table or authorizing a refund), the firewall executes a "synchronous hold".
      </p>
      
      <p className="text-gray-600 leading-relaxed mb-8">
        The SDK pauses the agent's run entirely and returns an interruption status. This triggers an alert on a live visual dashboard, showing the human operator exactly what the agent wants to do and its reasoning. The human can then manually click "Approve" (which resumes the workflow) or "Reject" (which blocks the action and sends a rejection message back to the model).
      </p>

      {/* Flowchart UI */}
      <div className="my-12 p-8 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">Synchronous Hold Flow</h4>
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 w-full bg-white border border-gray-300 rounded-lg shadow-sm text-center">Agent requests: <code className="bg-gray-100 px-2 py-1 rounded">DROP TABLE users;</code></div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="p-4 w-full bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm text-center font-medium text-yellow-700">Execution Paused & Dashboard Alert Triggered</div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="flex w-full gap-4">
            <div className="flex-1 p-4 bg-green-50 border border-green-200 rounded-lg text-center font-medium text-green-700 cursor-pointer hover:bg-green-100">User Approves &rarr; Runs</div>
            <div className="flex-1 p-4 bg-red-50 border border-red-200 rounded-lg text-center font-medium text-red-700 cursor-pointer hover:bg-red-100">User Rejects &rarr; Blocked</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-normal text-gray-900 mt-12 mb-4">Why should I use it?</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-600">
        <li><strong>Safe Autonomy:</strong> Give agents high-leverage tools without the anxiety of catastrophic mistakes.</li>
        <li><strong>Auditability:</strong> Humans can see the exact reasoning context the LLM used to decide on an action before allowing it.</li>
        <li><strong>Seamless Resumption:</strong> The SDK handles state management so the agent can smoothly resume after approval.</li>
      </ul>
    
    </div>
  );
}