import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacidad", description: "Política de privacidad YAYAS." };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-void py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-syne font-bold uppercase tracking-wider mb-8">Política de Privacidad</h1>
        <div className="space-y-6 text-ash leading-relaxed text-sm">
          <p>En YAYAS respetamos tu privacidad. No compartimos tus datos con terceros con fines publicitarios. Usamos tu información únicamente para procesar pedidos y mejorar tu experiencia.</p>
          <p>Para pagos usamos Stripe y WooCommerce, cada uno con sus propias políticas de seguridad.</p>
        </div>
      </div>
    </div>
  );
}