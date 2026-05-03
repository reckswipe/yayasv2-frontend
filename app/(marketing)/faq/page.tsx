import type { Metadata } from "next";
export const metadata: Metadata = { title: "FAQ", description: "Preguntas frecuentes sobre YAYAS — envíos, devoluciones, tallas y más." };

export default function FAQPage() {
  const faqs = [
    { q: "¿Cuáles métodos de pago aceptan?", a: "Tarjeta de crédito/débito (Visa, Mastercard, AMEX), OXXO y SPEI/transferencia bancaria." },
    { q: "¿Cuánto tarda el envío?", a: "Envío estándar: 2-5 días hábiles. Envío express: 1-2 días hábiles (costo adicional)." },
    { q: "¿Cuál es la política de devolución?", a: "Tienes 30 días para devolver cualquier producto en su estado original. El envío de devolución es gratis." },
    { q: "¿Cómo sé mi talla?", a: "Cada producto tiene una tabla de tallas en su página. Si tienes dudas, escríbenos por WhatsApp." },
    { q: "¿Hacen envíos fuera de México?", a: "Por el momento solo enviamos dentro de México. Pronto expandiremos a Latinoamérica." },
  ];
  return (
    <div className="min-h-screen bg-void py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-syne font-bold uppercase tracking-wider mb-8">Preguntas Frecuentes</h1>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border border-carbon p-6">
              <h3 className="font-medium mb-2">{q}</h3>
              <p className="text-ash text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}