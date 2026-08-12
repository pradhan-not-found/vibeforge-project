"use client";
import { useEffect } from "react";

export function NavbarScrollEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('site-header');
      if (!header) return;
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    // Attach listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return null;
}
