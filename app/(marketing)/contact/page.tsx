import type { Metadata } from "next";
import { MessageCircle, Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos — WhatsApp, email y redes sociales YAYAS.",
};

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Respuesta en minutos",
    detail: "+52 1 234 567 890",
    href: "https://wa.me/521234567890",
    color: "hover:border-green-500/50",
    textColor: "text-green-500",
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "Respuesta en 24h",
    detail: "hola@yayas.mx",
    href: "mailto:hola@yayas.mx",
    color: "hover:border-gold/50",
    textColor: "text-gold",
  },
  {
    icon: Phone,
    title: "Teléfono",
    subtitle: "L-V 10am-8pm CST",
    detail: "+52 1 234 567 890",
    href: "tel:+521234567890",
    color: "hover:border-gold/50",
    textColor: "text-gold",
  },
];

const faqs = [
  {
    q: "¿Responden rápido?",
    a: "Por WhatsApp respondemos en minutos durante horario laboral (10am-8pm CST). Email en menos de 24 horas.",
  },
  {
    q: "¿Puedo hacer un pedido personalizado?",
    a: "Sí, por WhatsApp podemos discutir pedidos personalizados o pedidos al por mayor.",
  },
  {
    q: "¿Tienen tienda física?",
    a: "Por ahora somos 100% online. Envíos a todo México.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1611095962005-9c6b5a0a92f0?w=1920&h=1080&fit=crop&auto=format&q=85')",
            filter: "brightness(0.2) contrast(1.2) saturate(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-mono mb-6">Háblanos</p>
          <h1 className="text-4xl md:text-6xl font-syne font-black uppercase tracking-[0.05em] leading-[0.92] mb-6">
            <span className="text-cream">Estamos</span>
            <br />
            <span className="text-gradient-gold-subtle">aquí para ti</span>
          </h1>
          <p className="text-ash text-base max-w-lg mx-auto">
            La forma más rápida es por WhatsApp. También puedes escribirnos por redes sociales o email.
          </p>
        </div>
      </section>

      {/* Contact channels */}
      <section className="py-20 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map(({ icon: Icon, title, subtitle, detail, href, color, textColor }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group p-8 bg-void border border-carbon ${color} transition-all duration-300 hover:bg-carbon/30 text-center`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 border border-current ${textColor} rounded-full mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-syne text-lg font-bold uppercase tracking-wider text-cream mb-2">
                  {title}
                </h3>
                <p className="text-xs text-ash mb-3">{subtitle}</p>
                <p className={`text-sm font-medium ${textColor}`}>{detail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Info + FAQ */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Más Información</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-cream mb-1">Ubicación</h4>
                    <p className="text-ash text-sm">Ciudad de México, México</p>
                    <p className="text-ash text-sm">Envíos a todo México</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-cream mb-1">Horario</h4>
                    <p className="text-ash text-sm">Lunes a Viernes: 10:00 — 20:00 CST</p>
                    <p className="text-ash text-sm">Sábado: 11:00 — 18:00 CST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-cream mb-1">Teléfono</h4>
                    <p className="text-ash text-sm">+52 1 234 567 890</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Preguntas Rápidas</span>
              </div>
              
              <div className="space-y-4">
                {faqs.map(({ q, a }) => (
                  <div key={q} className="p-6 border border-carbon bg-obsidian/50">
                    <h4 className="font-medium text-cream mb-2 text-sm uppercase tracking-wide">{q}</h4>
                    <p className="text-ash text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}