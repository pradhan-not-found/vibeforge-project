"use client";
import { useState } from 'react';
import { Settings as SettingsIcon, Key, User, Bell, Trash2, Copy, Check } from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';
import { useAuth } from '@/context/AuthContext';

export default function Page() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('tw_live_a8f9c2d4e5b61a2b');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SETTINGS_SECTIONS = [
    {
      title: 'Workspace',
      icon: <User className="w-4 h-4" />,
      fields: [
        { label: 'Workspace Name', value: user?.workspaceName || 'Trustworthy HQ', type: 'text' },
        { label: 'Owner Email', value: user?.email || 'admin@trustworthy.ai', type: 'email' },
        { label: 'Plan', value: 'Pro — 10 agents, 5M tokens/mo', type: 'badge' },
      ],
    },
    {
      title: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      fields: [
        { label: 'Threat Alerts', value: 'Email + Slack', type: 'text' },
        { label: 'Weekly Digest', value: 'Enabled', type: 'badge' },
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto animate-fade-down">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)] mb-3">Account</p>
        <h1 className="font-sans text-4xl sm:text-5xl text-[var(--app-ink)] tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--app-muted)] mt-2">Manage your workspace, API keys, and preferences.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Config sections */}
        {SETTINGS_SECTIONS.map((section, i) => (
          <MotionCard
            key={section.title}
            index={i}
            className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-6 card-elevate card-depth"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center text-[var(--app-muted)] shadow-sm">
                {section.icon}
              </div>
              <h2 className="font-sans text-xl text-[var(--app-ink)] tracking-tight">{section.title}</h2>
            </div>
            <div className="flex flex-col gap-3">
              {section.fields.map((field) => (
                <div key={field.label} className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3">
                  <span className="text-sm text-[var(--app-muted)] font-medium">{field.label}</span>
                  {field.type === 'badge' ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--app-soft)] ring-1 ring-inset ring-[var(--app-hairline)] text-[var(--app-muted)]">
                      {field.value}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-[var(--app-ink)]">{field.value}</span>
                  )}
                </div>
              ))}
            </div>
          </MotionCard>
        ))}

        {/* API Key Section */}
        <MotionCard
          index={2}
          className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-6 card-elevate card-depth"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] flex items-center justify-center text-[var(--app-muted)] shadow-sm">
              <Key className="w-4 h-4" />
            </div>
            <h2 className="font-sans text-xl text-[var(--app-ink)] tracking-tight">API Keys</h2>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-[var(--app-canvas)] border border-[var(--app-hairline)] px-4 py-3 mb-3">
            <div>
              <p className="text-xs text-[var(--app-muted)] font-medium mb-0.5">Proxy Gateway Key</p>
              <p className="text-sm font-mono text-[var(--app-ink)]">tw_live_••••••••••••••••••1a2b</p>
            </div>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border ${copied ? 'bg-green-50 text-green-700 border-green-200' : 'bg-[var(--app-canvas)] text-[var(--app-muted)] border-[var(--app-hairline)] hover:text-[var(--app-ink)] hover:bg-[var(--app-soft)]'}`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} 
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <button className="w-full mt-1 py-2.5 text-sm font-semibold text-[var(--app-ink)] bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-xl hover:bg-[var(--app-soft)] transition-colors shadow-sm">
            Regenerate Key
          </button>
        </MotionCard>

        {/* Danger Zone */}
        <MotionCard
          index={3}
          className="bg-red-50 rounded-2xl border-2 border-red-100 p-6 shadow-sm"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-white border border-red-200 flex items-center justify-center text-red-500 shadow-sm overflow-hidden p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <h2 className="font-sans text-xl text-red-700 tracking-tight">Danger Zone</h2>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-white border border-red-200 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-red-700">Delete Workspace</p>
              <p className="text-xs text-red-400 mt-0.5">This action is irreversible. All agents and logs will be deleted.</p>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-700 bg-red-100 border border-red-200 rounded-xl hover:bg-red-200 transition-colors shrink-0">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </MotionCard>
      </div>
    </div>
  );
}


