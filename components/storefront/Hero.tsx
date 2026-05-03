import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-obsidian z-10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30" />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <p className="text-gold uppercase tracking-[0.3em] text-sm mb-6 font-mono">Streetwear Mexicano</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-syne font-bold uppercase tracking-wider mb-6 leading-none">
          LA ÚNICA<br />
          <span className="text-gradient-gold">CERTEZA ES</span><br />
          EL CAOS
        </h1>
        <p className="text-ash text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Dark gothic. Urbano. Artesanal.<br />
          Vela por ti mismo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/collections/new"
            className="px-10 py-4 bg-gold text-void font-syne uppercase tracking-widest text-sm font-bold hover:bg-gold-dim transition-all"
          >
            Explorar Colección
          </Link>
          <Link
            href="/about"
            className="px-10 py-4 border border-gold/50 text-cream font-syne uppercase tracking-widest text-sm hover:border-gold hover:bg-obsidian transition-all"
          >
            Nuestra Historia
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}