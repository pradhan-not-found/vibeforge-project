'use client';

import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: 'Landing Page Updates',
    task: 'Create a website for Checkpost',
    reply: 'Let me check your codebase to investigate this build/caching issue.\n\nIt seems I don\'t have access to your repositories via the GitHub integration. Could you share the repository URL (e.g., https://github.com/org/repo) so I can investigate the build issue?',
    agentColor: '#10b981',
  },
  {
    title: 'API Integration',
    task: 'Connect the new Stripe payment gateway',
    reply: 'I will implement the Stripe integration by creating the necessary API endpoints and webhooks.\n\nI have added the Stripe secret key to the environment variables and created the checkout session endpoint. Let me know if you want to test it in development mode first.',
    agentColor: '#3b82f6',
  },
  {
    title: 'Database Optimization',
    task: 'Optimize the user query for faster loading',
    reply: 'I will analyze the query performance and add appropriate indexes.\n\nI found that adding a composite index on (workspace_id, created_at) improves the query speed by 400%. The migration has been created and applied to the staging database.',
    agentColor: '#8b5cf6',
  }
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full max-w-[1000px] mx-auto">
      {/* Outer Glass Container */}
      <div
        className="flex w-full overflow-hidden rounded-[20px] transition-all duration-500 ease-in-out"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.5) inset',
        }}
      >
        {/* Left Panel: App Preview */}
        <div className="flex-1 p-4 bg-white/40 border-r border-white/30 flex flex-col gap-4 relative">
          {/* Tabs */}
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-white/60 rounded-full border border-black/5 text-[10px] font-mono text-black/60 shadow-sm backdrop-blur-md transition-all duration-300">
              {slide.title}
            </div>
          </div>
          
          {/* App Window */}
          <div className="flex-1 rounded-xl bg-white shadow-sm overflow-hidden relative border border-black/5">
             <div className="absolute inset-0 backdrop-blur-xl bg-white/20 z-10" />
             {/* Fake blurred content underneath */}
             <div className="w-full h-full p-8 flex flex-col gap-8 opacity-40 blur-sm">
                <div className="w-3/4 h-12 bg-blue-100 rounded-lg mx-auto transition-all duration-500" style={{ opacity: currentSlide === 0 ? 1 : 0.6 }} />
                <div className="w-1/2 h-6 bg-gray-200 rounded-md mx-auto" />
                <div className="w-full h-32 rounded-xl mt-4 transition-all duration-500" style={{ backgroundColor: slide.agentColor, opacity: 0.2 }} />
             </div>
             
             {/* Bottom bar overlay */}
             <div className="absolute bottom-0 left-0 w-full h-10 bg-gray-50/80 border-t border-black/5 z-20 flex items-center px-4">
                <span className="text-[10px] text-black/40 font-medium transition-all duration-300">{slide.title}</span>
             </div>
          </div>
        </div>

        {/* Right Panel: Chat Interface */}
        <div className="w-[420px] bg-[#fdfdfd] flex flex-col relative shrink-0 h-[400px]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-black/5">
            <div className="text-[11px] font-medium text-black/50 transition-all duration-300">
              Engineer / <span className="text-black/80 font-semibold">{slide.title}</span>
            </div>
          </div>

          <div className="flex-1 p-5 flex flex-col gap-6 overflow-hidden">
            {/* User Message */}
            <div className="flex justify-end animate-fade-in-up" key={"user" + currentSlide}>
              <div className="bg-gray-100/80 border border-black/5 rounded-[20px] rounded-tr-sm px-4 py-3 max-w-[85%] shadow-sm">
                <p className="text-[13px] font-medium text-black/80 leading-relaxed">
                  {slide.task}
                </p>
              </div>
            </div>

            {/* Agent Message */}
            <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '150ms' }} key={"agent" + currentSlide}>
              {/* Agent Avatar */}
              <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm transition-colors duration-500" style={{ background: slide.agentColor }}>
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="12" cy="12" r="10"/>
                   <circle cx="12" cy="12" r="2"/>
                 </svg>
              </div>
              
              <div className="flex flex-col gap-3 max-w-[85%]">
                <p className="text-[13.5px] font-medium text-black/80 leading-[1.6]">
                  {slide.reply.split('\n\n')[0]}
                </p>
                <p className="text-[13px] text-black/60 leading-[1.6]">
                  {slide.reply.split('\n\n')[1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-[6px] mt-5 relative z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="h-[6px] w-[6px] rounded-full transition-all duration-300 cursor-pointer"
            style={{ background: i === currentSlide ? 'white' : 'rgba(255,255,255,0.3)', transform: i === currentSlide ? 'scale(1.2)' : 'scale(1)' }}
          />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}