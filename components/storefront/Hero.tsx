import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-[95vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Deep black overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 via-void/70 to-obsidian z-10" />
      
      {/* Hero image — dark moody fashion shot */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&auto=format&q=80')",
          filter: "brightness(0.35) contrast(1.1)",
        }}
      />
      
      {/* Subtle grain/noise texture */}
      <div className="absolute inset-0 z-10 opacity-[0.04]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")"}} />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <p className="text-gold uppercase tracking-[0.4em] text-xs font-mono mb-8 animate-fade-in-up">
          Streetwear Mexicano · Temporada 2026
        </p>
        
        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-syne font-black uppercase tracking-[0.05em] leading-[0.85] mb-8 animate-fade-in-up delay-100">
          <span className="block text-cream">LA ÚNICA</span>
          <span className="block text-gradient-gold-subtle">CERTEZA ES</span>
          <span className="block text-cream">EL CAOS</span>
        </h1>
        
        <p className="text-ash text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed animate-fade-in-up delay-200">
          Dark gothic. Urbano. Artesanal.<br />
          <span className="text-smoke">Hecho en México para el mundo.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <Link
            href="/collections/all"
            className="group px-12 py-4 bg-gold text-void font-syne uppercase tracking-[0.2em] text-sm font-bold hover:bg-parchment transition-all duration-300 glow-gold"
          >
            <span className="flex items-center gap-3">
              Explorar Colección
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <Link
            href="/about"
            className="group px-12 py-4 border border-gold/40 text-cream font-syne uppercase tracking-[0.2em] text-sm hover:border-gold hover:bg-gold/5 transition-all duration-300"
          >
            Nuestra Historia
          </Link>
        </div>
      </div>

      {/* Scroll indicator — animated */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-fade-in-up delay-500">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ash">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </div>

      {/* Corner decoration */}
      <div className="absolute top-8 right-8 z-20 hidden lg:block">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-mono">SS26</span>
      </div>
    </section>
  );
}