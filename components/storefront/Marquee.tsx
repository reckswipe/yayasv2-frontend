"use client";
import { useState, useEffect } from "react";

export function Marquee({ 
  text = "LA ÚNICA CERTEZA ES EL CAOS — STREETWEAR MEXICANO — ENVÍO GRATIS +$499 MXN —" 
}: { text?: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Shortened text for mobile to prevent horizontal scroll
  const mobileText = "EL CAOS — ENVÍO GRATIS +$499 —";

  return (
    <div className="py-3.5 bg-gold text-void relative overflow-hidden">
      {/* Subtle shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative overflow-hidden">
        {/* Gradient masks to hide overflow */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gold to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gold to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="font-syne uppercase tracking-[0.2em] md:tracking-[0.25em] text-[9px] md:text-[10px] font-bold flex-shrink-0 whitespace-nowrap px-4"
            >
              {isMobile ? mobileText : text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}