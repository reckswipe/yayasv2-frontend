import type { Metadata } from "next";
import { Scale, FileText, AlertTriangle, CreditCard, Truck, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos",
  description: "Términos y condiciones YAYAS — información legal sobre compras en yayas.mx.",
};

const sections = [
  {
    icon: FileText,
    title: "General",
    content: "Al realizar una compra en yayas.mx aceptas estos términos y condiciones. YAYAS se reserva el derecho de modificar precios, políticas y disponibilidad de productos sin previo aviso. Los precios se muestran en pesos mexicanos (MXN) e incluyen IVA.",
  },
  {
    icon: CreditCard,
    title: "Pago",
    content: "Aceptamos Visa, Mastercard, AMEX, OXXO y SPEI. El pago debe recibirse antes de procesar la orden. Las órdenes con pagos no confirmados serán canceladas automáticamente en 48 horas. No almacenamos datos de tarjeta.",
  },
  {
    icon: Truck,
    title: "Envíos",
    content: "Los envíos se realizan solo dentro de México. YAYAS no se hace responsable por retrasos causados por el carrier. El riesgo del producto pasa al cliente una vez entregado al transportista.",
  },
  {
    icon: RefreshCw,
    title: "Devoluciones",
    content: "Aceptamos devoluciones en productos en estado original dentro de los 30 días posteriores a la entrega. El cliente debe contactar por WhatsApp antes de iniciar una devolución. Ver política completa en /returns.",
  },
  {
    icon: AlertTriangle,
    title: "Ordenes Fraudulentas",
    content: "YAYAS se reserva el derecho de cancelar cualquier orden sospechosa de fraude. Intentos de pago fallidos múltiples pueden activar revisión manual. Las órdenes fraudulentas serán reportadas a las autoridades.",
  },
  {
    icon: Scale,
    title: "Propiedad Intelectual",
    content: "Todo el contenido del sitio (fotos, descripciones, logos, nombre YAYAS) es propiedad de YAYAS. Queda prohibida la reproducción sin consentimiento expreso.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=1080&fit=crop&auto=format&q=85')",
            filter: "brightness(0.2) contrast(1.2) saturate(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-mono mb-6">Legal</p>
          <h1 className="text-4xl md:text-6xl font-syne font-black uppercase tracking-[0.05em] leading-[0.92] mb-6">
            <span className="text-cream">Términos y</span>
            <br />
            <span className="text-gradient-gold-subtle">Condiciones</span>
          </h1>
          <p className="text-ash text-base max-w-lg mx-auto">
            Información legal sobre tus compras en YAYAS.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {sections.map((sec, i) => (
              <div key={sec.title} className="p-8 border border-carbon bg-void">
                <div className="flex items-center gap-4 mb-4">
                  <sec.icon size={18} className="text-gold flex-shrink-0" />
                  <h2 className="font-syne text-lg font-bold uppercase tracking-wider text-cream">
                    {sec.title}
                  </h2>
                </div>
                <p className="text-ash text-sm leading-relaxed pl-10">{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Last update */}
      <section className="py-10 px-6 bg-carbon border-t border-smoke/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-smoke">
            Última actualización: Mayo 2026. Para preguntas contacta: hola@yayas.mx
          </p>
        </div>
      </section>
    </div>
  );
}