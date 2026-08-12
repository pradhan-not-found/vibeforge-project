"use client";
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Plus, CheckCircle2, Clock, MoreVertical, X, ChevronDown, Zap,
  Lock, ShieldOff, ShieldAlert, UserCheck, KeyRound, Timer, Globe, ScanSearch,
  FileText, ClipboardList, CreditCard, Ban, Gauge, BookLock, Network, EyeOff, Server
} from 'lucide-react';
import { MotionCard } from '@/components/MotionCard';
import { useAuth } from '@/context/AuthContext';

// ─── Icon system ──────────────────────────────────────────────────────────────
// Each icon key maps to: { icon component, bg color, icon color }
const ICON_MAP: Record<string, { el: React.ReactNode; bg: string; fg: string }> = {
  lock:       { el: <Lock className="w-4 h-4" />,         bg: 'bg-slate-100',   fg: 'text-slate-600'   },
  shield:     { el: <ShieldOff className="w-4 h-4" />,    bg: 'bg-blue-100',    fg: 'text-blue-600'    },
  shieldalert:{ el: <ShieldAlert className="w-4 h-4" />,  bg: 'bg-red-100',     fg: 'text-red-600'     },
  user:       { el: <UserCheck className="w-4 h-4" />,    bg: 'bg-violet-100',  fg: 'text-violet-600'  },
  key:        { el: <KeyRound className="w-4 h-4" />,     bg: 'bg-amber-100',   fg: 'text-amber-600'   },
  timer:      { el: <Timer className="w-4 h-4" />,        bg: 'bg-orange-100',  fg: 'text-orange-600'  },
  globe:      { el: <Globe className="w-4 h-4" />,        bg: 'bg-cyan-100',    fg: 'text-cyan-600'    },
  scan:       { el: <ScanSearch className="w-4 h-4" />,   bg: 'bg-purple-100',  fg: 'text-purple-600'  },
  file:       { el: <FileText className="w-4 h-4" />,     bg: 'bg-indigo-100',  fg: 'text-indigo-600'  },
  clipboard:  { el: <ClipboardList className="w-4 h-4" />,bg: 'bg-teal-100',    fg: 'text-teal-600'    },
  credit:     { el: <CreditCard className="w-4 h-4" />,   bg: 'bg-emerald-100', fg: 'text-emerald-600' },
  ban:        { el: <Ban className="w-4 h-4" />,           bg: 'bg-rose-100',    fg: 'text-rose-600'    },
  gauge:      { el: <Gauge className="w-4 h-4" />,        bg: 'bg-sky-100',     fg: 'text-sky-600'     },
  booklock:   { el: <BookLock className="w-4 h-4" />,     bg: 'bg-zinc-100',    fg: 'text-zinc-600'    },
  network:    { el: <Network className="w-4 h-4" />,      bg: 'bg-lime-100',    fg: 'text-lime-600'    },
  eyeoff:     { el: <EyeOff className="w-4 h-4" />,       bg: 'bg-pink-100',    fg: 'text-pink-600'    },
  server:     { el: <Server className="w-4 h-4" />,       bg: 'bg-fuchsia-100', fg: 'text-fuchsia-600' },
  zap:        { el: <Zap className="w-4 h-4" />,          bg: 'bg-yellow-100',  fg: 'text-yellow-600'  },
};

function PolicyIcon({ iconKey }: { iconKey: string }) {
  const def = ICON_MAP[iconKey] || ICON_MAP['shield'];
  return (
    <div className={`shrink-0 w-9 h-9 rounded-xl ${def.bg} ${def.fg} flex items-center justify-center shadow-sm`}>
      {def.el}
    </div>
  );
}

// ─── Prebuilt templates ───────────────────────────────────────────────────────
const PREBUILT_TEMPLATES = [
  {
    category: 'Data Protection',
    categoryIcon: <ShieldOff className="w-3.5 h-3.5" />,
    color: 'text-blue-600',
    templates: [
      { icon: 'shield',   name: 'Block PII Exfiltration',    description: 'Prevent SSN, credit card numbers, and passport numbers from being sent to external LLMs or APIs.' },
      { icon: 'key',      name: 'Encrypt Sensitive Data',    description: 'Require AES-256 encryption for all data fields classified as PII before storage or transmission.' },
      { icon: 'ban',      name: 'No External Data Transfer', description: 'Block any agent action that attempts to send internal data to external endpoints not on the allowlist.' },
    ],
  },
  {
    category: 'Rate & Usage Controls',
    categoryIcon: <Gauge className="w-3.5 h-3.5" />,
    color: 'text-sky-600',
    templates: [
      { icon: 'gauge',  name: 'Global Rate Limiting',     description: 'Limit all AI agent API calls to 100 requests per minute per workspace globally.' },
      { icon: 'credit', name: 'Token Budget Enforcement', description: 'Hard-cap monthly LLM token usage per agent at 500K tokens. Suspend agent if budget exceeded.' },
      { icon: 'timer',  name: 'Off-Hours Restriction',    description: 'Restrict autonomous agent actions to business hours only (Mon–Fri, 9am–6pm local time).' },
    ],
  },
  {
    category: 'Prompt Safety',
    categoryIcon: <Zap className="w-3.5 h-3.5" />,
    color: 'text-yellow-600',
    templates: [
      { icon: 'zap',      name: 'Prompt Injection Guard',  description: 'Block all prompts containing "ignore previous instructions", "jailbreak", or "DAN mode" patterns.' },
      { icon: 'scan',     name: 'Output Content Filter',   description: 'Scan all LLM responses for harmful content, hate speech, or NSFW material before returning to user.' },
      { icon: 'booklock', name: 'System Prompt Lock',      description: 'Prevent agents from modifying or overriding their assigned system prompt at runtime.' },
    ],
  },
  {
    category: 'Human-in-the-Loop',
    categoryIcon: <UserCheck className="w-3.5 h-3.5" />,
    color: 'text-violet-600',
    templates: [
      { icon: 'user',      name: 'Require Manager Approval',       description: 'Require explicit human approval for all database DELETE or DROP operations initiated by an AI agent.' },
      { icon: 'credit',    name: 'Financial Transaction Review',    description: 'Flag and hold any agent-initiated payment or refund over $500 for human review before execution.' },
      { icon: 'clipboard', name: 'Audit Before Execute',           description: 'Log and review all agent-generated SQL queries before they are executed on production databases.' },
    ],
  },
  {
    category: 'Network & Access',
    categoryIcon: <Globe className="w-3.5 h-3.5" />,
    color: 'text-cyan-600',
    templates: [
      { icon: 'network', name: 'API Allowlist Enforcement',   description: 'Restrict agent outbound calls to a pre-approved list of external APIs and domains only.' },
      { icon: 'eyeoff',  name: 'Least Privilege Access',      description: 'Automatically revoke agent permissions to any resource it has not accessed in the last 30 days.' },
      { icon: 'server',  name: 'Sandbox Production Access',   description: 'Prevent agents from directly accessing production databases. Route all reads through a read-only replica.' },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Page() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPolicyName, setNewPolicyName] = useState('');
  const [newPolicyDesc, setNewPolicyDesc] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('shield');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      fetchPolicies();
    }
  }, [user]);

  const fetchPolicies = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/policies?user_id=${user?.email}`);
      if (res.ok) {
        const data = await res.json();
        setPolicies(data);
      }
    } catch (err) {
      console.error('Failed to fetch policies', err);
    }
  };

  const toggleTemplate = (tplName: string) => {
    if (selectedTemplates.includes(tplName)) {
      setSelectedTemplates(selectedTemplates.filter(n => n !== tplName));
    } else {
      setSelectedTemplates([...selectedTemplates, tplName]);
    }
  };

  const handleAddPolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPolicyName && selectedTemplates.length === 0) return;
    
    try {
      const policiesToCreate: any[] = [];

      if (selectedTemplates.length > 0) {
        PREBUILT_TEMPLATES.forEach(cat => {
          cat.templates.forEach(tpl => {
            if (selectedTemplates.includes(tpl.name)) {
              policiesToCreate.push({
                user_id: user?.email || 'admin',
                name: tpl.name,
                description: tpl.description,
                icon: tpl.icon
              });
            }
          });
        });
      }

      if (newPolicyName) {
        policiesToCreate.push({
          user_id: user?.email || 'admin',
          name: newPolicyName,
          description: newPolicyDesc,
          icon: selectedIcon
        });
      }

      await Promise.all(
        policiesToCreate.map(pol =>
          fetch('http://localhost:8000/api/policies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pol)
          })
        )
      );

      await fetchPolicies();
      closeModal();
    } catch (err) {
      console.error('Failed to create policies', err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewPolicyName('');
    setNewPolicyDesc('');
    setSelectedIcon('shield');
    setOpenCategory(null);
    setSelectedTemplates([]);
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-down">
        {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)] mb-3">Security</p>
          <h1 className="font-sans text-4xl sm:text-5xl text-[var(--app-ink)] tracking-tight">Policies</h1>
          <p className="text-sm text-[var(--app-muted)] mt-2">Configure access controls, guardrails, and data boundaries.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="cta-btn-dark text-on-dark shadow-sm shrink-0 mt-2 flex items-center justify-center gap-[10px] px-[16px] py-[10px] text-[14px] font-[500] rounded-[8px] transition-all"
        >
          <Plus className="w-4 h-4" /> Create Policy
        </button>
      </div>

      {/* Policy Cards */}
      <div className="flex flex-col gap-3">
        {policies.map((policy, i) => (
          <MotionCard
            key={policy.id}
            index={i}
            className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-5 card-elevate card-depth"
          >
            <div className="flex items-start gap-4">
              <PolicyIcon iconKey={policy.icon} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="text-sm font-semibold text-[var(--app-ink)]">{policy.name}</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${
                      policy.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                        : 'bg-[var(--app-soft)] text-[var(--app-muted)] ring-[var(--app-hairline)]'
                    }`}>
                      {policy.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {policy.status}
                    </div>
                    <button className="text-[var(--app-muted)] hover:text-[var(--app-ink)] transition-colors p-1 rounded-md hover:bg-[var(--app-canvas)]">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[var(--app-muted)] leading-relaxed">{policy.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--app-muted)]" />
                  <span className="text-[10px] font-mono text-[var(--app-muted)] uppercase tracking-wider">{policy.id}</span>
                  <span className="ml-auto text-xs text-[var(--app-muted)]">Updated {policy.updated}</span>
                </div>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>
      </div>

      {/* Create Policy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--app-canvas)] rounded-2xl shadow-xl border border-[var(--app-hairline)] w-full max-w-lg overflow-hidden animate-fade-up flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[var(--app-hairline)] flex items-center justify-between shrink-0">
              <h2 className="text-lg font-semibold text-[var(--app-ink)]">Create Policy</h2>
              <button onClick={closeModal} className="text-[var(--app-muted)] hover:text-[var(--app-ink)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPolicy} className="p-6 space-y-5 overflow-y-auto">

              {/* Prebuilt Templates */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <label className="text-sm font-semibold text-[var(--app-ink)]">Prebuilt Templates</label>
                  <span className="text-xs text-[var(--app-muted)]">— select multiple to bulk create</span>
                </div>
                <div className="space-y-1.5">
                  {PREBUILT_TEMPLATES.map((cat) => (
                    <div key={cat.category} className="rounded-xl border border-[var(--app-hairline)] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-[var(--app-soft)] hover:bg-[var(--app-hairline)] transition-colors text-left"
                      >
                        <div className={`flex items-center gap-2 text-xs font-semibold ${cat.color}`}>
                          {cat.categoryIcon}
                          {cat.category}
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-[var(--app-muted)] transition-transform ${openCategory === cat.category ? 'rotate-180' : ''}`} />
                      </button>
                      {openCategory === cat.category && (
                        <div className="divide-y divide-[var(--app-hairline)]">
                          {cat.templates.map((tpl) => {
                            const iconDef = ICON_MAP[tpl.icon] || ICON_MAP['shield'];
                            const isSelected = selectedTemplates.includes(tpl.name);
                            return (
                              <label
                                key={tpl.name}
                                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors cursor-pointer group ${isSelected ? 'bg-blue-50/50' : 'hover:bg-[var(--app-soft)]'}`}
                              >
                                <div className="flex items-center h-9 pt-1">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleTemplate(tpl.name)}
                                    className="w-4 h-4 rounded border-[var(--app-hairline)] text-blue-600 focus:ring-blue-500"
                                  />
                                </div>
                                <div className={`shrink-0 w-9 h-9 rounded-xl ${iconDef.bg} ${iconDef.fg} flex items-center justify-center shadow-sm border border-black/5`}>
                                  {iconDef.el}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-[var(--app-ink)] group-hover:text-blue-600 transition-colors">{tpl.name}</p>
                                  <p className="text-xs text-[var(--app-muted)] leading-relaxed mt-0.5 line-clamp-2">{tpl.description}</p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[var(--app-hairline)]" />
                <span className="text-xs text-[var(--app-muted)] font-medium">or write custom</span>
                <div className="flex-1 h-px bg-[var(--app-hairline)]" />
              </div>

              {/* Policy Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--app-ink)] mb-1.5">Policy Name</label>
                <input
                  type="text"
                  required={selectedTemplates.length === 0}
                  value={newPolicyName}
                  onChange={(e) => setNewPolicyName(e.target.value)}
                  placeholder="e.g. Block PII"
                  className="w-full px-4 py-2.5 border border-[var(--app-hairline)] rounded-xl focus:ring-1 focus:ring-[var(--app-ink)] focus:border-[var(--app-ink)] text-sm bg-transparent text-[var(--app-ink)] placeholder:text-[var(--app-muted)]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[var(--app-ink)] mb-1.5">Description</label>
                <textarea
                  required={selectedTemplates.length === 0}
                  value={newPolicyDesc}
                  onChange={(e) => setNewPolicyDesc(e.target.value)}
                  placeholder="e.g. Prevent SSN from being sent to external APIs."
                  className="w-full px-4 py-2.5 border border-[var(--app-hairline)] rounded-xl focus:ring-1 focus:ring-[var(--app-ink)] focus:border-[var(--app-ink)] text-sm bg-transparent text-[var(--app-ink)] placeholder:text-[var(--app-muted)] resize-none h-24"
                />
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-[var(--app-ink)] bg-transparent border border-[var(--app-hairline)] rounded-xl hover:bg-[var(--app-soft)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cta-btn-dark text-on-dark shadow-sm flex items-center justify-center gap-[10px] px-[16px] py-[10px] text-[14px] font-[500] rounded-[8px] transition-all"
                >
                  Create Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

