import type { Metadata } from "next";
export const metadata: Metadata = { title: "Envíos", description: "Información sobre envíos YAYAS — costos, tiempos y opciones." };

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-void py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-syne font-bold uppercase tracking-wider mb-8">Envíos y Entregas</h1>
        <div className="space-y-8 text-ash leading-relaxed">
          <div className="border border-carbon p-6">
            <h3 className="font-medium mb-3">Envío Estándar — GRATIS en pedidos +$499 MXN</h3>
            <p className="text-sm">2-5 días hábiles. En pedidos menores a $499 MXN: $99 MXN.</p>
          </div>
          <div className="border border-carbon p-6">
            <h3 className="font-medium mb-3">Envío Express</h3>
            <p className="text-sm">1-2 días hábiles. Costo calculado según dirección de entrega.</p>
          </div>
          <div className="border border-carbon p-6">
            <h3 className="font-medium mb-3">Rastrea tu orden</h3>
            <p className="text-sm">Recibirás un email de confirmación con enlace de seguimiento una vez enviada tu orden.</p>
          </div>
        </div>
      </div>
    </div>
  );
}