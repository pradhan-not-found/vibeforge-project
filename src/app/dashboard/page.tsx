export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-[550] tracking-[-0.03em] mb-1 text-ink">Dashboard Overview</h1>
        <p className="text-[14px] text-ink-muted">Monitor your autonomous agent activity and firewall interventions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-border-card shadow-sm flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink-muted">Active Agents</span>
          <span className="text-3xl font-[550] tracking-tight">12</span>
          <span className="text-[12px] text-lime-600 font-medium bg-lime-100 w-fit px-2 py-0.5 rounded-md mt-1">+2 this week</span>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-border-card shadow-sm flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink-muted">Intercepted Actions (24h)</span>
          <span className="text-3xl font-[550] tracking-tight text-red-500">3,492</span>
          <span className="text-[12px] text-red-600 font-medium bg-red-100 w-fit px-2 py-0.5 rounded-md mt-1">Requires review: 4</span>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-border-card shadow-sm flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink-muted">Budget Saved (Infinite Loops prevented)</span>
          <span className="text-3xl font-[550] tracking-tight text-green-600">$1,204.50</span>
          <span className="text-[12px] text-ink-muted font-medium mt-1">Based on token limits</span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-[550] tracking-[-0.02em] mb-4 text-ink">Recent Interventions (Human-in-the-Loop)</h2>
        <div className="bg-white rounded-2xl border border-border-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-card bg-surface-raised text-[13px] text-ink-muted font-medium">
                <th className="p-4 font-medium">Agent</th>
                <th className="p-4 font-medium">Tool Attempted</th>
                <th className="p-4 font-medium">Reason</th>
                <th className="p-4 font-medium">Time</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              <tr className="border-b border-border-card hover:bg-surface-raised transition-colors">
                <td className="p-4 font-medium">Customer Support Bot</td>
                <td className="p-4 font-mono text-[12px] text-red-600">execute_sql(DROP TABLE users;)</td>
                <td className="p-4 text-ink-muted">Destructive action detected</td>
                <td className="p-4 text-ink-muted">2 mins ago</td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1.5 bg-ink text-white rounded-md text-[12px] font-medium hover:bg-black transition-colors">Review</button>
                </td>
              </tr>
              <tr className="border-b border-border-card hover:bg-surface-raised transition-colors">
                <td className="p-4 font-medium">Data Scraper</td>
                <td className="p-4 font-mono text-[12px]">fetch_url(internal-billing.local)</td>
                <td className="p-4 text-ink-muted">SSRF attempt blocked</td>
                <td className="p-4 text-ink-muted">14 mins ago</td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1.5 bg-ink text-white rounded-md text-[12px] font-medium hover:bg-black transition-colors">Review</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-raised transition-colors">
                <td className="p-4 font-medium">Sales Outreach</td>
                <td className="p-4 font-mono text-[12px]">send_email(mass_list)</td>
                <td className="p-4 text-ink-muted">Rate limit exceeded (Loop)</td>
                <td className="p-4 text-ink-muted">1 hour ago</td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1.5 bg-surface border border-border-card text-ink rounded-md text-[12px] font-medium hover:bg-[rgba(0,0,0,0.05)] transition-colors">Resolved</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
