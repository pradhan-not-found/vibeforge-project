export default function PoliciesPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[550] tracking-[-0.03em] mb-1 text-ink">Deterministic Policy Engine</h1>
          <p className="text-[14px] text-ink-muted">Configure zero-latency YAML rules to enforce boundaries on your agents.</p>
        </div>
        <button className="px-4 py-2 bg-ink text-white font-medium rounded-lg hover:bg-black transition-colors text-[14px]">
          Save Policy
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-ink">Active Rulebook: <span className="text-lime-600">strict_db_read_only.yaml</span></label>
        <div className="bg-[#0D0D0D] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] shadow-inner">
          <pre className="text-[13px] text-gray-300 font-mono overflow-x-auto leading-relaxed">
            <code>
{`name: Strict Database Read-Only
description: Blocks all destructive database commands (DROP, DELETE, TRUNCATE, UPDATE, INSERT)
default_action: allow

rules:
  - id: block_destructive_sql
    target_tool: execute_sql
    condition: regex_match
    parameters:
      query: "(?i)(DROP|DELETE|TRUNCATE|UPDATE|INSERT|ALTER)"
    action: block
    message: "Destructive database operations are strictly prohibited."

  - id: require_human_review_for_users
    target_tool: execute_sql
    condition: regex_match
    parameters:
      query: "(?i)(SELECT .* FROM users)"
    action: pause_for_review
    message: "Accessing the users table requires human approval."

budget:
  max_tokens_per_run: 50000
  action_on_exceed: block
  loop_detection:
    max_identical_tool_calls: 3
    action: pause_for_review
`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
