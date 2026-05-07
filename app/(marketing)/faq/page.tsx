"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "¿Cuáles métodos de pago aceptan?",
    a: "Aceptamos tarjeta de crédito/débito (Visa, Mastercard, AMEX), pagos en OXXO y transferencias SPEI. Todos los pagos son 100% seguros a través de nuestro checkout cifrado.",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "Envío estándar: 2-5 días hábiles en toda la República Mexicana. Envío express: 1-2 días hábiles (costo adicional calculado en checkout). Envío gratis en pedidos mayores a $499 MXN.",
  },
  {
    q: "¿Cuál es la política de devolución?",
    a: "Tienes 30 días para devolver cualquier producto en su estado original (sin usar, con etiquetas). El envío de devolución es gratis. Contáctanos por WhatsApp para iniciar el proceso.",
  },
  {
    q: "¿Cómo sé mi talla correcta?",
    a: "Cada producto tiene una tabla de tallas detallada en su página. Si tienes dudas entre dos tallas, te recomendamos pedir la más grande. También puedes escribirnos por WhatsApp para ayuda personalizada.",
  },
  {
    q: "¿Hacen envíos fuera de México?",
    a: "Por el momento solo enviamos dentro de México. Estamos trabajando en expandinos a Latinoamérica pronto. ¡Mantente al tanto!",
  },
  {
    q: "¿Puedo rastrear mi orden?",
    a: "Sí. Una vez que enviamos tu orden, recibirás un email con el número de seguimiento y enlace directo. También puedes ver el estado en tu cuenta.",
  },
  {
    q: "¿Los productos son artesanales?",
    a: "Sí. Cada pieza YAYAS está diseñada en CDMX con atención obsesiva al detalle. Trabajamos con talleres locales especializados en streetwear de alta calidad.",
  },
  {
    q: "¿Tiene costo extra el cambio de talla?",
    a: "Si necesitas cambiar de talla, el envío de devolución del producto actual es gratis y te enviamos la nueva talla sin costo adicional. Solo contáctanos por WhatsApp.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="border border-carbon overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left bg-obsidian hover:bg-carbon/50 transition-colors duration-300 group"
        aria-expanded={open}
      >
        <span className="font-syne text-sm md:text-base font-medium uppercase tracking-wide text-cream group-hover:text-gold transition-colors pr-4">
          {q}
        </span>
        <ChevronDown 
          size={18} 
          className={cn(
            "text-gold flex-shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )} 
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="p-6 pt-4 text-ash text-sm leading-relaxed bg-void border-t border-carbon/50">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&h=1080&fit=crop&auto=format&q=85')",
            filter: "brightness(0.2) contrast(1.2) saturate(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-mono mb-6">Ayuda</p>
          <h1 className="text-4xl md:text-6xl font-syne font-black uppercase tracking-[0.05em] leading-[0.92] mb-6">
            <span className="text-cream">Preguntas</span>
            <br />
            <span className="text-gradient-gold-subtle">Frecuentes</span>
          </h1>
          <p className="text-ash text-base max-w-lg mx-auto">
            Todo lo que necesitas saber sobre tus compras, envíos y devoluciones.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <span className="px-5 py-2 bg-gold text-void text-xs font-mono uppercase tracking-widest">General</span>
            <a href="/shipping" className="px-5 py-2 bg-carbon text-ash text-xs font-mono uppercase tracking-widest hover:bg-smoke hover:text-cream transition-colors">
              Envíos
            </a>
            <a href="/returns" className="px-5 py-2 bg-carbon text-ash text-xs font-mono uppercase tracking-widest hover:bg-smoke hover:text-cream transition-colors">
              Devoluciones
            </a>
            <a href="/contact" className="px-5 py-2 bg-carbon text-ash text-xs font-mono uppercase tracking-widest hover:bg-smoke hover:text-cream transition-colors">
              Contacto
            </a>
          </div>

          {/* Questions */}
          <div className="space-y-2">
            {faqs.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 text-center p-8 border border-carbon bg-obsidian">
            <p className="font-syne text-lg font-bold uppercase tracking-wider text-cream mb-3">
              ¿No encontraste tu respuesta?
            </p>
            <p className="text-ash text-sm mb-6">
              Estamos aquí para ayudarte. Contáctanos por WhatsApp o email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/521234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-xs font-bold hover:bg-gold-dim transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="mailto:hola@yayas.mx"
                className="px-8 py-3 border border-carbon text-ash font-syne uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-colors"
              >
                Enviar Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}