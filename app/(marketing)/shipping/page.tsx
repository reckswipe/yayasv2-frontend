import type { Metadata } from "next";
import { Truck, Package, Clock, Shield, MapPin, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Envíos",
  description: "Información sobre envíos YAYAS — costos, tiempos y opciones de entrega.",
};

const shippingOptions = [
  {
    icon: Truck,
    title: "Envío Estándar",
    badge: "GRATIS +$499 MXN",
    badgeColor: "bg-gold text-void",
    price: "$99 MXN",
    priceNote: "en pedidos menores",
    time: "2-5 días hábiles",
    description: "Para la mayoría de destinos en México. Recibe tu orden entre 2 y 5 días hábiles.",
    features: ["Rastrea tu pedido en tiempo real", "Notificación por email al enviar", "Intentos de entrega: 3"],
  },
  {
    icon: Package,
    title: "Envío Express",
    badge: "Costo adicional",
    badgeColor: "bg-carbon text-ash",
    price: "Desde $149 MXN",
    priceNote: "según destino",
    time: "1-2 días hábiles",
    description: "Para cuando necesitas tu pedido urgente. Disponible en CDMX y principales ciudades.",
    features: ["Entrega en 24-48 horas", "Rastreamiento prioritario", "Confirmación SMS al enviar"],
  },
];

const processSteps = [
  { num: "01", title: "Confirmación", desc: "Recibes email de confirmación con los detalles de tu orden." },
  { num: "02", title: "Procesamiento", desc: "Preparamos tu pedido en 1-2 días hábiles." },
  { num: "03", title: "Envío", desc: "Te enviamos el número de seguimiento una vez despachado." },
  { num: "04", title: "Entrega", desc: "Recibirás tu pedido en la dirección proporcionada." },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop&auto=format&q=85')",
            filter: "brightness(0.2) contrast(1.2) saturate(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-mono mb-6">Entrega</p>
          <h1 className="text-4xl md:text-6xl font-syne font-black uppercase tracking-[0.05em] leading-[0.92] mb-6">
            <span className="text-cream">Envíos y</span>
            <br />
            <span className="text-gradient-gold-subtle">Entregas</span>
          </h1>
          <p className="text-ash text-base max-w-lg mx-auto">
            Envíos a todo México. Envío gratis en pedidos mayores a $499 MXN.
          </p>
        </div>
      </section>

      {/* Shipping options */}
      <section className="py-20 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingOptions.map((opt) => (
              <div key={opt.title} className="p-8 border border-carbon bg-void">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-carbon flex items-center justify-center">
                    <opt.icon size={24} className="text-gold" />
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest ${opt.badgeColor}`}>
                    {opt.badge}
                  </span>
                </div>
                
                <h3 className="font-syne text-xl font-bold uppercase tracking-wider text-cream mb-2">
                  {opt.title}
                </h3>
                <p className="text-xs text-ash mb-4">{opt.description}</p>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-medium text-gold">{opt.price}</span>
                  <span className="text-xs text-ash">{opt.priceNote}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <Clock size={14} className="text-gold" />
                  <span className="text-sm text-cream">{opt.time}</span>
                </div>
                
                <ul className="space-y-2 pt-6 border-t border-carbon">
                  {opt.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-ash">
                      <svg className="w-3 h-3 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
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
              ¿Cómo funciona?
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

      {/* Tracking + Coverage */}
      <section className="py-20 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <MapPin size={20} className="text-gold" />
                <h3 className="font-syne text-lg font-bold uppercase tracking-wider text-cream">Cobertura</h3>
              </div>
              <p className="text-ash text-sm leading-relaxed mb-4">
                Enviamos a todo México. CDMX, Guadalajara, Monterrey y cualquier otro municipio.
              </p>
              <p className="text-xs text-smoke">* Actualmente no enviamos fuera de México. Expansión internacional próximamente.</p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <RefreshCw size={20} className="text-gold" />
                <h3 className="font-syne text-lg font-bold uppercase tracking-wider text-cream">¿No recibiste tu pedido?</h3>
              </div>
              <p className="text-ash text-sm leading-relaxed mb-4">
                Si han pasado más de 7 días hábiles desde la fecha estimada, contáctanos por WhatsApp o email. Investigaremos tu orden inmediatamente.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-dim transition-colors">
                Contactar soporte
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}