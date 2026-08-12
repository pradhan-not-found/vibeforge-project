"use client";
import { HelpCircle, Mail, MessageSquare, BookOpen, ExternalLink } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 py-12 animate-fade-down">
      <div className="w-full max-w-md bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[var(--app-soft)] border border-[var(--app-hairline)] flex items-center justify-center text-[var(--app-ink)] shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--app-ink)] tracking-tight">Help Center</h1>
            <p className="text-sm text-[var(--app-muted)]">Get support and resources</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-between p-4 rounded-2xl border border-[var(--app-hairline)] hover:bg-[var(--app-soft)] hover:border-[var(--app-muted)] transition-all text-left group">
            <div className="flex items-center gap-3.5">
              <BookOpen className="w-5 h-5 text-[var(--app-muted)] group-hover:text-[var(--app-ink)] transition-colors" />
              <div>
                <div className="text-[13px] font-semibold text-[var(--app-ink)]">Documentation</div>
                <div className="text-[11px] text-[var(--app-muted)] mt-0.5">Read our guides and API references</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--app-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="flex items-center justify-between p-4 rounded-2xl border border-[var(--app-hairline)] hover:bg-[var(--app-soft)] hover:border-[var(--app-muted)] transition-all text-left group">
            <div className="flex items-center gap-3.5">
              <MessageSquare className="w-5 h-5 text-[var(--app-muted)] group-hover:text-[var(--app-ink)] transition-colors" />
              <div>
                <div className="text-[13px] font-semibold text-[var(--app-ink)]">Chat Support</div>
                <div className="text-[11px] text-[var(--app-muted)] mt-0.5">Talk to our team (9AM-5PM EST)</div>
              </div>
            </div>
          </button>
          
          <button className="flex items-center justify-between p-4 rounded-2xl border border-[var(--app-hairline)] hover:bg-[var(--app-soft)] hover:border-[var(--app-muted)] transition-all text-left group">
            <div className="flex items-center gap-3.5">
              <Mail className="w-5 h-5 text-[var(--app-muted)] group-hover:text-[var(--app-ink)] transition-colors" />
              <div>
                <div className="text-[13px] font-semibold text-[var(--app-ink)]">Email Us</div>
                <div className="text-[11px] text-[var(--app-muted)] mt-0.5">support@checkpost.app</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
