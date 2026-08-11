export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[550] tracking-[-0.03em] mb-1 text-ink">Managed Agents</h1>
          <p className="text-[14px] text-ink-muted">View and add AI agents to the Checkpost firewall.</p>
        </div>
        <button className="px-4 py-2 bg-ink text-white font-medium rounded-lg hover:bg-black transition-colors text-[14px]">
          + Add Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Agent Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-border-card shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-700 font-bold">
                CS
              </div>
              <div className="flex flex-col">
                <span className="font-[550] text-ink text-[15px]">Customer Support Bot</span>
                <span className="text-[12px] text-ink-muted">LangChain / OpenAI</span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" title="Active"></span>
          </div>
          <div className="text-[13px] text-ink-muted">
            Attached Policy: <span className="font-mono text-ink bg-surface-raised px-1 py-0.5 rounded">strict_db_read_only.yaml</span>
          </div>
          <div className="border-t border-border-card pt-4 mt-2 flex gap-4">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Calls (24h)</span>
              <span className="font-[550] text-ink text-[14px]">1,240</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Blocked</span>
              <span className="font-[550] text-red-500 text-[14px]">12</span>
            </div>
          </div>
        </div>

        {/* Agent Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-border-card shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 font-bold">
                DS
              </div>
              <div className="flex flex-col">
                <span className="font-[550] text-ink text-[15px]">Data Scraper Bot</span>
                <span className="text-[12px] text-ink-muted">Custom Python SDK</span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" title="Paused (Loop detected)"></span>
          </div>
          <div className="text-[13px] text-ink-muted">
            Attached Policy: <span className="font-mono text-ink bg-surface-raised px-1 py-0.5 rounded">network_egress_allow.yaml</span>
          </div>
          <div className="border-t border-border-card pt-4 mt-2 flex gap-4">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Calls (24h)</span>
              <span className="font-[550] text-ink text-[14px]">8,901</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-ink-muted uppercase tracking-wider">Blocked</span>
              <span className="font-[550] text-red-500 text-[14px]">45</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
