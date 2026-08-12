"use client";
import { HelpCircle, Mail, MessageSquare, BookOpen, ExternalLink } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 py-12 animate-fade-down">
      <div className="w-full max-w-lg bg-white border border-[var(--app-hairline)] rounded-[2rem] p-8 sm:p-10 card-elevate shadow-xl">
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-md">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--app-ink)] tracking-tight mb-2">Help Center</h1>
            <p className="text-sm text-[var(--app-muted)] max-w-[250px] mx-auto">Everything you need to manage your agents, security, and integration.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-between p-5 rounded-2xl border border-[var(--app-hairline)] bg-[var(--app-canvas)] hover:bg-[var(--app-soft)] hover:border-[var(--app-ink)]/20 transition-all text-left group card-elevate">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[var(--app-hairline)] flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-[var(--app-ink)]" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[var(--app-ink)] group-hover:text-black transition-colors">Documentation</div>
                <div className="text-[12px] text-[var(--app-muted)] mt-0.5">Read our guides and API references</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--app-muted)] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
          </button>
          
          <button className="flex items-center justify-between p-5 rounded-2xl border border-[var(--app-hairline)] bg-[var(--app-canvas)] hover:bg-[var(--app-soft)] hover:border-[var(--app-ink)]/20 transition-all text-left group card-elevate">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[var(--app-hairline)] flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5 text-[var(--app-ink)]" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[var(--app-ink)] group-hover:text-black transition-colors">Chat Support</div>
                <div className="text-[12px] text-[var(--app-muted)] mt-0.5">Talk to our team (9AM-5PM EST)</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--app-muted)] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
          </button>
          
          <button className="flex items-center justify-between p-5 rounded-2xl border border-[var(--app-hairline)] bg-[var(--app-canvas)] hover:bg-[var(--app-soft)] hover:border-[var(--app-ink)]/20 transition-all text-left group card-elevate">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[var(--app-hairline)] flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5 text-[var(--app-ink)]" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[var(--app-ink)] group-hover:text-black transition-colors">Email Us</div>
                <div className="text-[12px] text-[var(--app-muted)] mt-0.5">support@checkpost.app</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--app-muted)] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
