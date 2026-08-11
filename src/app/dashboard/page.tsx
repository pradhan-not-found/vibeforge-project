'use client';

import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Zap, AlertTriangle, Bot } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

function MiniSparkline({ data, width = 200, height = 32, color = "text-gray-900" }: { data: number[]; width?: number; height?: number; color?: string }) {
	const path = React.useMemo(() => {
		if (data.length < 2) return "";
		const max = Math.max(...data, 1);
		const min = Math.min(...data, 0);
		const range = max - min || 1;
		const stepX = width / (data.length - 1);
		return data
			.map((val, i) => {
				const x = i * stepX;
				const y = height - ((val - min) / range) * height;
				return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
			})
			.join(" ");
	}, [data, width, height]);

	if (data.length < 2) {
		return <div className="h-8 w-full rounded-md bg-gray-100" />;
	}

	return (
		<svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
			<path d={path} fill="none" className={`stroke-current ${color}`} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
		</svg>
	);
}

interface MotionCardProps extends HTMLMotionProps<"div"> {
	index?: number;
	children?: React.ReactNode;
}
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function MotionCard({ index = 0, children, ...props }: MotionCardProps) {
	const reduce = useReducedMotion();
	return (
		<motion.div
			initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: reduce ? 0.15 : 0.42, delay: index * 0.05, ease: EASE_OUT }}
			{...props}
		>
			{children}
		</motion.div>
	);
}

function AnalyticsBlock({
  value,
  label,
  icon,
  subtitle,
  index,
  sparkline,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  subtitle: string;
  index: number;
  sparkline?: number[];
}) {
  return (
    <MotionCard
      index={index}
      className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-4 sm:p-5 card-elevate card-depth flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] sm:text-xs font-medium text-[var(--app-muted)] uppercase tracking-wide">{label}</span>
        <span className="inline-flex items-center justify-center size-7 rounded-md bg-[var(--app-canvas)] border border-[var(--app-hairline)] text-[var(--app-ink)]">
          {icon}
        </span>
      </div>
      <div className="text-2xl sm:text-3xl font-semibold text-[var(--app-ink)] tracking-tight" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>{value}</div>
      <p className="text-[10px] sm:text-xs text-[var(--app-muted)] mt-1 truncate">{subtitle}</p>
      {sparkline && sparkline.length > 1 && (
        <div className="mt-3 pt-3 border-t border-[var(--app-hairline)]">
          <MiniSparkline data={sparkline} />
        </div>
      )}
    </MotionCard>
  );
}

export default function Dashboard() {
  const [userName, setUserName] = useState('User');
  const [isAttacking, setIsAttacking] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName?.split(' ')[0] || 'User');
      }
    });
    return () => unsubscribe();
  }, []);

  const [metrics, setMetrics] = useState({ blocked: 1204, riskScore: 14, total: 3100000, active: 14 });
  const [topAgents, setTopAgents] = useState<{name: string, count: number, provider?: string}[]>([
    { name: 'Support Bot', count: 8432, provider: 'OpenAI' },
    { name: 'Sales Agent', count: 4120, provider: 'Anthropic' },
    { name: 'Billing Bot', count: 2150, provider: 'Anthropic' },
    { name: 'Data Scraper', count: 1840, provider: 'Google' }
  ]);
  const [recentViolations, setRecentViolations] = useState<{policy: string, agent: string, time: string, provider?: string}[]>([
    { policy: 'DELETE FROM users', agent: 'Support Agent', time: 'Just now', provider: 'OpenAI' },
    { policy: 'eval(system("env"))', agent: 'GPT-4 Main', time: '2m ago', provider: 'OpenAI' },
    { policy: 'PII Exfil', agent: 'Sales Bot', time: '15m ago', provider: 'Anthropic' },
    { policy: 'Stripe Payment Intent', agent: 'Billing Bot', time: '1h ago', provider: 'Anthropic' }
  ]);

  const now = new Date();
  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const simulateAttack = () => {
    setIsAttacking(true);
    setTimeout(() => {
      setMetrics(prev => ({ ...prev, blocked: prev.blocked + 1, total: prev.total + 1 }));
      setRecentViolations(prev => [
        { policy: 'Ignore previous instructions', agent: 'Support Bot', time: 'Just now', provider: 'OpenAI' },
        ...prev.slice(0, 3)
      ]);
      setIsAttacking(false);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* Greeting section */}
      <div className="flex items-start justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] text-[var(--app-muted)]">
            {dateLabel}
          </p>
          <div className="mt-5 sm:mt-6">
            <p className="text-sm sm:text-base text-[var(--app-muted)]">Good afternoon,</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mt-1 text-[var(--app-ink)] [overflow-wrap:anywhere] capitalize" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>
              {userName}.
            </h1>
            <p className="mt-3 text-sm text-[var(--app-muted)] max-w-md">
              Here's a clear trace of your AI usage across {metrics.active} connected tools.
            </p>
          </div>
        </div>

        <button 
          onClick={simulateAttack}
          disabled={isAttacking}
          className="flex items-center gap-2 bg-[var(--app-canvas)] hover:bg-[var(--app-soft)] text-red-600 border border-[var(--app-hairline)] px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm disabled:opacity-50 mt-1"
        >
          {isAttacking ? (
            <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Zap className="w-3.5 h-3.5" />
          )}
          {isAttacking ? 'Simulating...' : 'Simulate Threat'}
        </button>
      </div>

      {/* Activity overview */}
      <div className="mb-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)]">Activity Overview</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
        <AnalyticsBlock
          index={0}
          value={metrics.active.toString()}
          label="Active Agents"
          icon={<Activity className="size-4" />}
          subtitle="Online and functioning normally"
          sparkline={[2, 3, 3, 3, 2, 3, 3]}
        />
        <AnalyticsBlock
          index={1}
          value="3.1M"
          label="Total Actions"
          icon={<Activity className="size-4" />}
          subtitle="Processed in the last 24h"
          sparkline={[12, 18, 14, 25, 32, 28, 45, 60, 65]}
        />
        <AnalyticsBlock
          index={2}
          value={metrics.blocked.toString()}
          label="Threats Blocked"
          icon={<ShieldAlert className="size-4" />}
          subtitle="Anomalous behavior stopped"
          sparkline={[1, 0, 2, 1, 4, 3, 1, 5]}
        />
        <AnalyticsBlock
          index={3}
          value={metrics.riskScore.toString()}
          label="Fleet Risk"
          icon={<AlertTriangle className="size-4" />}
          subtitle="Current risk score / 100"
          sparkline={[10, 12, 15, 14, 20, 22, 14]}
        />
      </div>

      {/* Top Models + Provider Usage equivalent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 lg:mb-8">
        {/* Top Active Agents */}
        <MotionCard
          index={4}
          className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-4 sm:p-6 card-elevate card-depth"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-normal text-[var(--app-ink)] tracking-tight" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>Top Active Agents</h2>
            <span className="text-[10px] sm:text-xs font-medium text-[var(--app-muted)] uppercase tracking-wide">By action count</span>
          </div>
          <div className="space-y-2.5">
            {topAgents.length === 0 ? (
              <p className="text-sm text-[var(--app-muted)] text-center py-4">No agents active yet.</p>
            ) : (
              topAgents.map((agent, i) => (
                <div
                  key={agent.name + i}
                  className="flex items-center gap-3 rounded-lg border border-[var(--app-hairline)] bg-[var(--app-canvas)] p-2.5"
                >
                <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 border bg-[var(--app-soft)] border-[var(--app-hairline)] text-[var(--app-ink)] overflow-hidden`}>
                  <Bot className="w-5 h-5 text-[var(--app-muted)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--app-ink)] truncate">{agent.name}</p>
                  <div className="mt-1.5 h-1.5 bg-[var(--app-hairline)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--app-ink)] rounded-full transition-all"
                      style={{ width: `${(agent.count / 10000) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-[var(--app-ink)]">{agent.count.toLocaleString()}</p>
                  <p className="text-[10px] text-[var(--app-muted)]">actions</p>
                </div>
              </div>
              ))
            )}
          </div>
        </MotionCard>

        {/* Recent Violations */}
        <MotionCard
          index={5}
          className="bg-[var(--app-soft)] rounded-2xl border-2 border-[var(--app-hairline)] p-4 sm:p-6 card-elevate card-depth"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-normal text-[var(--app-ink)] tracking-tight" style={{ fontFamily: 'var(--font-geist-pixel-grid, monospace)' }}>Recent Violations</h2>
            <span className="text-[10px] sm:text-xs font-medium text-[var(--app-muted)] uppercase tracking-wide">
              Last 24 hours
            </span>
          </div>
          <div className="space-y-3">
            {recentViolations.length === 0 ? (
              <p className="text-sm text-[var(--app-muted)] text-center py-4">No recent violations.</p>
            ) : (
              recentViolations.map((violation, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-[var(--app-hairline)] bg-[var(--app-canvas)] p-2.5"
                >
                <div className="size-8 rounded-lg border-[var(--app-hairline)] border text-red-600 bg-[var(--app-soft)] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--app-ink)] truncate font-mono">{violation.policy}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--app-ink)] text-[var(--app-canvas)] shrink-0">{violation.time}</span>
                  </div>
                  <div className="h-1.5 bg-[var(--app-hairline)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${100 - i * 15}%` }}
                    />
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </MotionCard>
      </div>

    </div>
  );
}
