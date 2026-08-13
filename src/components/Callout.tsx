'use client';
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

/**
 * Feature callout card — cloned from cofounder.co/how-to/sell.
 * Light warm background, colored badge pill on the left,
 * dark "Try in Checkpost →" CTA on the right.
 */
export function Callout({
  badge,
  title,
  children,
  ctaText = 'Try in Checkpost',
  ctaLink = '/signup',
}: CalloutProps) {
  return (
    <div
      className="rounded-[12px] my-10 overflow-hidden"
      style={{
        border: '1px solid #E8E7E6',
        background: '#FAFAF7',
      }}
    >
      {/* Top bar: badge + CTA */}
      <div
        className="flex w-full items-center justify-between px-[20px] md:px-[24px] py-[14px]"
        style={{ borderBottom: '1px solid #E8E7E6' }}
      >
        {/* Badge pill */}
        <span
          className="inline-flex items-center gap-[6px] text-[12px] font-[500] leading-[150%] tracking-[0.12px] px-[10px] py-[4px] rounded-full"
          style={{
            background: 'rgba(255,255,255,0.70)',
            border: '1px solid rgba(32,32,32,0.12)',
            color: 'rgba(32,32,32,0.60)',
          }}
        >
          <span
            className="w-[6px] h-[6px] rounded-full shrink-0"
            style={{ background: '#2D9D5A' }}
          />
          {badge}
        </span>

        {/* CTA */}
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-[8px] text-white text-[13px] font-[500] px-[14px] py-[7px] rounded-[8px] no-underline bg-[#262323] hover:bg-[#111] transition-colors"
          >
            {ctaText} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Body */}
      <div className="px-[20px] md:px-[24px] py-[20px]">
        {title && (
          <p
            className="text-[15px] font-[560] leading-[150%] tracking-[0.15px] mb-[8px]"
            style={{ color: 'rgba(32,32,32,0.90)' }}
          >
            {title}
          </p>
        )}
        <div
          className="text-[15px] leading-[160%]"
          style={{ color: 'rgba(32,32,32,0.65)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
