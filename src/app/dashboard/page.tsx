export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-8 max-w-[1100px] w-full" style={{ fontFamily: 'var(--font-tt-neoris, sans-serif)' }}>
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[28px] font-medium tracking-[0.01em] mb-2 text-[#1A1A1A]" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>
            Overview
          </h1>
          <p className="text-[15px] font-[430] text-[rgba(38,35,35,0.5)] tracking-[0.15px]">
            Monitor your autonomous agent activity and firewall interventions.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-[8px] text-[13px] font-medium text-[#1A1A1A] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-[#FAFAF7] transition-colors">
            Export Logs
          </button>
          <button className="px-4 py-2 bg-[#1A1A1A] border border-transparent rounded-[8px] text-[13px] font-medium text-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] hover:bg-[#2A2A2A] transition-colors">
            New Policy
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Agents', value: '142', change: '+12%', color: '#1A1A1A' },
          { label: 'Intercepted Actions (24h)', value: '8,492', change: '+2.4%', color: '#e05252' },
          { label: 'Infinite Loops Prevented', value: '18', change: '-4', color: '#e05252' },
          { label: 'Budget Saved (Est.)', value: '$4,204', change: '+$840', color: '#10b981' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[12px] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2 relative overflow-hidden group">
            <span className="text-[13px] font-medium text-[rgba(38,35,35,0.5)] uppercase tracking-wider">{stat.label}</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-3xl font-medium tracking-tight" style={{ color: stat.color, fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>{stat.value}</span>
              <span className="text-[12px] font-medium bg-[#FAFAF7] px-2 py-1 rounded-[4px] text-[rgba(38,35,35,0.7)] border border-[#E5E5E5]">
                {stat.change}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-[#1A1A1A] transition-all duration-300 w-0 group-hover:w-full" style={{ opacity: 0.1 }}></div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (Interventions Table) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-medium text-[#1A1A1A]">Recent Interventions (Human-in-the-Loop)</h2>
            <button className="text-[13px] font-medium text-[rgba(38,35,35,0.6)] hover:text-[#1A1A1A] transition-colors">View All &rarr;</button>
          </div>
          
          <div className="bg-white rounded-[12px] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#FAFAF7] text-[12px] text-[rgba(38,35,35,0.6)] font-medium uppercase tracking-wider">
                  <th className="p-4 py-3 font-medium">Agent</th>
                  <th className="p-4 py-3 font-medium">Tool Attempted</th>
                  <th className="p-4 py-3 font-medium">Threat Level</th>
                  <th className="p-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {[
                  { agent: 'Customer Support Bot', tool: 'execute_sql(DROP TABLE users;)', threat: 'Critical', color: '#e05252', status: 'Blocked' },
                  { agent: 'Data Scraper', tool: 'fetch_url(internal-billing.local)', threat: 'High', color: '#e05252', status: 'Blocked' },
                  { agent: 'Sales Outreach', tool: 'send_email(mass_list_v2)', threat: 'Medium', color: '#f59e0b', status: 'Rate Limited' },
                  { agent: 'Analytics Engine', tool: 'read_file(/etc/passwd)', threat: 'Critical', color: '#e05252', status: 'Blocked' },
                  { agent: 'Github CI Agent', tool: 'git_push(force=true)', threat: 'Low', color: '#10b981', status: 'Allowed' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#E5E5E5] last:border-0 hover:bg-[#FAFAF7] transition-colors">
                    <td className="p-4 py-3 font-medium text-[#1A1A1A]">{row.agent}</td>
                    <td className="p-4 py-3 font-mono text-[11.5px] text-[rgba(38,35,35,0.7)] bg-[#f5f5f5] rounded px-2 m-4 inline-block border border-[#EBEBEA]">{row.tool}</td>
                    <td className="p-4 py-3">
                      <span className="text-[12px] font-medium px-2 py-1 rounded-[4px] bg-opacity-10 border" style={{ color: row.color, backgroundColor: `${row.color}15`, borderColor: `${row.color}30` }}>
                        {row.threat}
                      </span>
                    </td>
                    <td className="p-4 py-3 text-right">
                      {row.status === 'Blocked' ? (
                        <button className="px-3 py-1.5 bg-[#1A1A1A] text-white rounded-[6px] text-[12px] font-medium hover:bg-[#2A2A2A] transition-colors shadow-sm">Review</button>
                      ) : (
                        <span className="text-[13px] font-medium text-[rgba(38,35,35,0.5)]">{row.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col (Active Policies & Activity) */}
        <div className="flex flex-col gap-6">
          {/* Activity Graph Placeholder */}
          <div className="flex flex-col gap-4">
             <h2 className="text-[18px] font-medium text-[#1A1A1A]">Traffic Volume</h2>
             <div className="bg-white p-5 rounded-[12px] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-4 h-[180px] justify-end relative">
               {/* Fake Graph */}
               <div className="flex items-end justify-between w-full h-[100px] gap-1 opacity-80">
                 {[40, 25, 60, 45, 80, 55, 90, 70, 110, 85, 120, 95, 130, 105].map((h, i) => (
                   <div key={i} className="w-full bg-[#1A1A1A] rounded-t-[2px] transition-all hover:bg-[#e05252]" style={{ height: `${h}%` }}></div>
                 ))}
               </div>
               <div className="flex justify-between text-[11px] font-mono text-[rgba(38,35,35,0.4)] uppercase">
                 <span>00:00</span>
                 <span>12:00</span>
                 <span>24:00</span>
               </div>
             </div>
          </div>

          {/* Top Policies */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[18px] font-medium text-[#1A1A1A]">Top Blocked Policies</h2>
            <div className="bg-white rounded-[12px] border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-3">
              {[
                { name: 'Prevent SSRF Attacks', count: 1240 },
                { name: 'Restrict Shell Execution', count: 852 },
                { name: 'Block PII Exfiltration', count: 641 },
                { name: 'Enforce Token Limits', count: 430 }
              ].map((policy, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[13.5px] font-medium text-[#1A1A1A]">{policy.name}</span>
                  <span className="text-[12px] font-mono text-[rgba(38,35,35,0.6)] bg-[#FAFAF7] px-2 py-0.5 rounded-[4px] border border-[#E5E5E5]">{policy.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
