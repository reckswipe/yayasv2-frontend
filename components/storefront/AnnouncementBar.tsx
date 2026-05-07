"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("yayas-announcement-dismissed");
    if (dismissed) setIsVisible(false);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("yayas-announcement-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gold text-void py-2.5 px-4 text-center relative overflow-hidden group">
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-4">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] font-bold">
          <Link href="/collections/all" className="hover:underline transition-opacity">
            Nuevo
          </Link>
          {" "}— Envío GRATIS en pedidos +$499 MXN
        </p>
        
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute right-2 md:right-4 p-1 text-void/60 hover:text-void/90 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Cerrar"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}