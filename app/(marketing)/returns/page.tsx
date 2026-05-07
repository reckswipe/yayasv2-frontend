import type { Metadata } from "next";
import { RotateCcw, Clock, Package, CreditCard, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Devoluciones",
  description: "Política de devoluciones YAYAS — 30 días, sin preguntas, envío gratis.",
};

const conditions = [
  {
    title: "Estado Original",
    desc: "El producto debe tener todas las etiquetas, empaque original y no mostrar señales de uso.",
    icon: Package,
  },
  {
    title: "30 Días",
    desc: "Tienes 30 días desde la fecha de entrega para iniciar tu devolución.",
    icon: Clock,
  },
  {
    title: "Sin Costo",
    desc: "El envío de devolución es completamente gratis. Te enviamos la guía prepagada.",
    icon: RotateCcw,
  },
  {
    title: "Reembolso Rápido",
    desc: "Recibes tu reembolso en 5-7 días hábiles después de que recibimos el producto.",
    icon: CreditCard,
  },
];

const processSteps = [
  { num: "01", title: "Contáctanos", desc: "Escríbenos por WhatsApp o email con tu número de orden." },
  { num: "02", title: "Recibe tu guía", desc: "Te enviamos una guía de devolución prepagada por email." },
  { num: "03", title: "Envía el producto", desc: "Lleva tu paquete a cualquier sucursal del transportista." },
  { num: "04", title: "Reembolso", desc: "Procesamos tu reembolso en 5-7 días hábiles." },
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1920&h=1080&fit=crop&auto=format&q=85')",
            filter: "brightness(0.2) contrast(1.2) saturate(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-mono mb-6">Sin Complicaciones</p>
          <h1 className="text-4xl md:text-6xl font-syne font-black uppercase tracking-[0.05em] leading-[0.92] mb-6">
            <span className="text-cream">Devoluciones</span>
            <br />
            <span className="text-gradient-gold-subtle">Fáciles y Gratis</span>
          </h1>
          <p className="text-ash text-base max-w-lg mx-auto">
            30 días para devolver. Sin preguntas. Sin costos ocultos.
          </p>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-20 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Lo Que Necesitas Saber</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-syne font-black uppercase tracking-[0.03em]">
              Condiciones
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {conditions.map((cond) => (
              <div key={cond.title} className="p-6 border border-carbon bg-void text-center group hover:border-gold/30 transition-colors">
                <div className="w-14 h-14 bg-carbon flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/10 transition-colors">
                  <cond.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-syne text-sm font-bold uppercase tracking-wider text-cream mb-3">
                  {cond.title}
                </h3>
                <p className="text-ash text-xs leading-relaxed">{cond.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Proceso</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em]">
              ¿Cómo Devolver?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.num} className="relative p-8 border border-carbon bg-obsidian/50 group hover:border-gold/30 transition-colors">
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-carbon" />
                )}
                <span className="text-gold text-[10px] font-mono tracking-widest mb-6 block">{step.num}</span>
                <h3 className="font-syne text-lg font-bold uppercase tracking-wider text-cream mb-3">
                  {step.title}
                </h3>
                <p className="text-ash text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-syne text-2xl font-bold uppercase tracking-wider text-cream mb-4">
            ¿Listo para iniciar tu devolución?
          </h2>
          <p className="text-ash text-sm mb-8">
            Contáctanos por WhatsApp y te ayudamos en minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/521234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-void font-syne uppercase tracking-[0.2em] text-sm font-bold hover:bg-gold-dim transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-carbon text-ash font-syne uppercase tracking-[0.2em] text-sm hover:border-gold hover:text-gold transition-colors"
            >
              Ver FAQ
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}