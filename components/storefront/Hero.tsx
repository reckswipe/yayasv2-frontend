import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Deep black overlay with layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/85 via-void/60 to-obsidian z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/50 to-transparent z-10" />
      
      {/* Hero image — dark moody fashion shot */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&auto=format&q=85')",
          filter: "brightness(0.3) contrast(1.15) saturate(0.8)",
        }}
      />
      
      {/* Subtle grain/noise texture */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.05]" 
        style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")"}} 
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-mono mb-10 animate-fade-in-up opacity-80">
          Streetwear Mexicano · SS26
        </p>
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-black uppercase tracking-[0.04em] leading-[0.92] mb-10 animate-fade-in-up delay-100">
          <span className="block text-cream">La única certeza</span>
          <span className="block text-gradient-gold-subtle">es el caos</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-ash text-base md:text-lg mb-14 max-w-lg mx-auto leading-relaxed animate-fade-in-up delay-200">
          Dark gothic. Urbano. Artesanal.
          <br />
          <span className="text-smoke text-sm">Hecho en México para el mundo.</span>
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up delay-300">
          <Link
            href="/collections/all"
            className="group px-14 py-4.5 bg-gold text-void font-syne uppercase tracking-[0.2em] text-[13px] font-bold hover:bg-parchment transition-all duration-400 glow-gold"
          >
            <span className="flex items-center justify-center gap-3">
              Explorar Colección
              <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <Link
            href="/about"
            className="group px-14 py-4.5 border border-cream/20 text-cream font-syne uppercase tracking-[0.2em] text-[13px] hover:border-gold hover:bg-gold/5 transition-all duration-400"
          >
            Nuestra Historia
          </Link>
        </div>
      </div>

      {/* Scroll indicator — animated with label */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 animate-fade-in-up delay-500">
        <span className="text-[10px] uppercase tracking-[0.35em] text-ash font-mono">Scroll</span>
        <div className="relative">
          <div className="w-px h-14 bg-gradient-to-b from-gold/60 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full animate-pulse" />
        </div>
      </div>

      {/* Corner decoration — season label */}
      <div className="absolute top-8 right-8 z-20 hidden lg:block">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold/30 font-mono">SS26</span>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-10" />
    </section>
  );
}