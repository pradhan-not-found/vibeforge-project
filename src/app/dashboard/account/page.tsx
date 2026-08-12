"use client";
import { Cloud, CreditCard, Shield, Zap, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { user } = useAuth();
  
  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 py-12 animate-fade-down">
      <div className="w-full max-w-md bg-[var(--app-canvas)] border border-[var(--app-hairline)] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[var(--app-soft)] border border-[var(--app-hairline)] flex items-center justify-center text-[var(--app-ink)] shadow-sm">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--app-ink)] tracking-tight">Account</h1>
            <p className="text-sm text-[var(--app-muted)]">Billing and subscription</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--app-soft)] border border-[var(--app-hairline)] mb-6 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-[var(--app-ink)] flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              Pro Plan
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-600">Active</div>
          </div>
          <div className="text-xs text-[var(--app-muted)] mb-4">You are currently on the Pro tier. $99/mo.</div>
          
          <div className="w-full bg-[var(--app-hairline)] rounded-full h-1.5 mb-2 overflow-hidden">
            <div className="bg-[var(--app-ink)] h-1.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--app-muted)] font-medium">
            <span>2.25M tokens used</span>
            <span>5M limit</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-between p-4 rounded-2xl border border-[var(--app-hairline)] hover:bg-[var(--app-soft)] hover:border-[var(--app-muted)] transition-all text-left group">
            <div className="flex items-center gap-3.5">
              <CreditCard className="w-5 h-5 text-[var(--app-muted)] group-hover:text-[var(--app-ink)] transition-colors" />
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-[var(--app-ink)]">Payment Methods</div>
                <div className="text-[11px] text-[var(--app-muted)] mt-0.5">Visa ending in 4242</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--app-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="flex items-center justify-between p-4 rounded-2xl border border-[var(--app-hairline)] hover:bg-[var(--app-soft)] hover:border-[var(--app-muted)] transition-all text-left group">
            <div className="flex items-center gap-3.5">
              <Shield className="w-5 h-5 text-[var(--app-muted)] group-hover:text-[var(--app-ink)] transition-colors" />
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-[var(--app-ink)]">Security</div>
                <div className="text-[11px] text-[var(--app-muted)] mt-0.5">Manage 2FA and sessions</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
