"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Ingresa un email válido");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-24 px-6 bg-carbon relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"}} />

      <div className="relative max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-syne font-black uppercase tracking-[0.05em] mb-4">
          Únete al <span className="text-gradient-gold">Caos</span>
        </h2>
        <p className="text-ash mb-10 leading-relaxed">
          Primer acceso a nuevas colecciones, ofertas exclusivas y contenido detrás del scenes.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 py-4 px-6 bg-gold/10 border border-gold/30 text-gold animate-fade-in-up">
            <Check size={20} />
            <span className="font-medium">¡Listo! Pronto recibirás noticias del caos.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-5 py-4 bg-obsidian border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors text-sm"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gold text-void font-syne uppercase tracking-widest text-sm font-bold hover:bg-gold-dim transition-all duration-300 flex items-center justify-center gap-2 glow-gold"
            >
              Unirme
              <ArrowRight size={16} />
            </button>
          </form>
        )}
        {error && <p className="text-blood text-sm mt-2">{error}</p>}

        <p className="text-xs text-ash mt-6">
          También en{" "}
          <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener" className="text-gold hover:underline">
            WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}