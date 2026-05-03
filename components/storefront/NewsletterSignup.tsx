"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 px-6 bg-carbon">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-syne font-bold uppercase tracking-wider mb-4">Únete al Caos</h2>
        <p className="text-ash mb-8">Sé el primero en ver nuevas colecciones, ofertas exclusivas y contenido detrás del scenes.</p>
        {submitted ? (
          <div className="py-4 px-6 bg-gold/10 border border-gold/30 text-gold font-medium">
            ¡Listo! Pronto recibirás noticias del caos.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if(email) setSubmitted(true); }} className="flex gap-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required className="flex-1 px-4 py-3 bg-obsidian border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
            <button type="submit" className="px-6 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors flex items-center gap-2">
              Unirme <ArrowRight size={16} />
            </button>
          </form>
        )}
        <p className="text-xs text-ash mt-4">También vía <a href="https://chat.whatsapp.com/" className="text-gold hover:underline">WhatsApp</a></p>
      </div>
    </section>
  );
}
