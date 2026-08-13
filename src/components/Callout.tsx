import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CalloutProps {
  badge: string;
  title?: string;
  children: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
}

export function Callout({ badge, title, children, ctaText = "Try in Checkpost", ctaLink = "/login" }: CalloutProps) {
  return (
    <div className="bg-[#EDF2F7] rounded-xl p-6 md:p-8 my-10 flex flex-col items-start gap-4 border border-[#E2E8F0]">
      <div className="flex w-full items-start justify-between gap-4 flex-wrap">
        <span className="bg-white/60 text-[#3182CE] border border-[#3182CE]/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {badge}
        </span>
        
        {ctaText && ctaLink && (
          <Link 
            href={ctaLink}
            className="inline-flex items-center gap-2 bg-[#2D3748] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A202C] transition-colors"
          >
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {title && (
        <h3 className="text-xl font-bold text-[#2D3748] mt-2">{title}</h3>
      )}

      <div className="text-[#4A5568] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
