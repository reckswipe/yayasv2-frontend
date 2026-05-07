"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Ingresa un email válido");
      return;
    }
    setError("");
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-28 px-6 bg-carbon relative overflow-hidden">
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"}} 
      />

      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />

      <div className="relative max-w-xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-6 h-px bg-gold/50" />
          <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Inner Circle</p>
          <span className="w-6 h-px bg-gold/50" />
        </div>

        <h2 className="text-4xl md:text-5xl font-syne font-black uppercase tracking-[0.03em] mb-5 leading-[0.95]">
          Ingresa al <span className="text-gradient-gold">Círculo</span>
        </h2>
        <p className="text-ash mb-12 leading-relaxed max-w-md mx-auto">
          Acceso antecipado a drops, ofertas exclusivas y contenido detrás del scenes. 
          <span className="text-smoke text-sm block mt-1">Cero spam. Solo caos.</span>
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3.5 py-5 px-6 bg-gold/10 border border-gold/30 text-gold animate-fade-in-up">
            <Check size={20} className="shrink-0" />
            <span className="font-medium text-sm">Inscrito. Pronto recibirás noticias del círculo.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3.5 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
              className="flex-1 px-5 py-4 bg-obsidian border border-carbon/80 text-cream placeholder:text-ash/60 focus:border-gold focus:outline-none transition-colors text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Suscribirse al newsletter"
              className="px-8 py-4 bg-gold text-void font-syne uppercase tracking-[0.15em] text-[12px] font-bold hover:bg-parchment transition-all duration-300 flex items-center justify-center gap-2.5 glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin" />
              ) : (
                <>
                  Unirme
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        )}
        {error && <p className="text-blood text-sm mt-4">{error}</p>}

        <p className="text-xs text-ash/60 mt-8">
          También en{" "}
          <a 
            href="https://chat.whatsapp.com/" 
            target="_blank" 
            rel="noopener" 
            className="text-gold hover:underline transition-colors"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}