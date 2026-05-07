import type { Metadata } from "next";
import { Shield, Lock, Eye, UserCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Política de privacidad YAYAS — cómo protegemos tus datos.",
};

const sections = [
  {
    icon: Shield,
    title: "Protección de Datos",
    content: "En YAYAS nos tomamos en serio la protección de tus datos personales. Toda la información que compartes con nosotros (nombre, dirección, email, datos de pago) se almacena de forma segura y nunca se vende ni comparte con terceros con fines publicitarios.",
  },
  {
    icon: Lock,
    title: "Pagos Seguros",
    content: "Procesamos todos los pagos a través de plataformas certificadas (Stripe para tarjeta, WooCommerce para OXXO/SPEI). Tus datos financieros nunca pasan por nuestros servidores. Cada transacción está cifrada con SSL de 256 bits.",
  },
  {
    icon: Eye,
    title: "Lo Que Recopilamos",
    content: "Recopilamos únicamente la información necesaria para procesar tu orden: nombre, dirección de envío, email y datos de pago. No rastreamos tu ubicación, navegación ni comportamiento más allá de lo necesario para operar la tienda.",
  },
  {
    icon: UserCheck,
    title: "Tus Derechos",
    content: "Puedes solicitar en cualquier momento acceso a tus datos, corrección de información o eliminación de tu cuenta. Solo contáctanos por email a hola@yayas.mx con tu solicitud.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1080&fit=crop&auto=format&q=85')",
            filter: "brightness(0.2) contrast(1.2) saturate(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-mono mb-6">Legal</p>
          <h1 className="text-4xl md:text-6xl font-syne font-black uppercase tracking-[0.05em] leading-[0.92] mb-6">
            <span className="text-cream">Política de</span>
            <br />
            <span className="text-gradient-gold-subtle">Privacidad</span>
          </h1>
          <p className="text-ash text-base max-w-lg mx-auto">
            Tu privacidad es importante. Así protegemos tus datos.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((sec) => (
              <div key={sec.title} className="flex gap-6 p-8 border border-carbon bg-void">
                <div className="w-12 h-12 bg-carbon flex items-center justify-center flex-shrink-0">
                  <sec.icon size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold uppercase tracking-wider text-cream mb-3">
                    {sec.title}
                  </h3>
                  <p className="text-ash text-sm leading-relaxed">{sec.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies note */}
      <section className="py-20 px-6 bg-void">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 border border-carbon bg-obsidian">
            <h2 className="font-syne text-xl font-bold uppercase tracking-wider text-cream mb-4">Cookies</h2>
            <p className="text-ash text-sm leading-relaxed mb-4">
              Usamos cookies esenciales para el funcionamiento de la tienda (carrito, sesión, seguridad). También usamos cookies analíticas básicas (Google Analytics sin datos personales) para entender cómo usas el sitio. Puedes desactivar cookies en tu navegador.
            </p>
            <p className="text-ash text-sm leading-relaxed">
              Al continuar navegando, aceptas nuestro uso de cookies.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-carbon border-t border-smoke/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-ash text-sm mb-4">¿Preguntas sobre tu privacidad?</p>
          <a href="mailto:hola@yayas.mx" className="inline-flex items-center gap-2 text-gold hover:text-gold-dim transition-colors">
            <Mail size={16} />
            hola@yayas.mx
          </a>
        </div>
      </section>
    </div>
  );
}