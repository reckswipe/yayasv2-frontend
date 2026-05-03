import { Truck, RotateCcw, Shield, MessageCircle } from "lucide-react";

const BADGES = [
  { icon: Truck, label: "Envío gratis +$499 MXN", sub: "Llega en 2-5 días" },
  { icon: RotateCcw, label: "30 días de devolución", sub: "Sin preguntas" },
  { icon: Shield, label: "Pago 100% seguro", sub: "Tarjeta, OXXO, SPEI" },
  { icon: MessageCircle, label: "¿Dudas? WhatsApp", sub: "Te respondemos en minutos" },
];

export function TrustBadges() {
  return (
    <section className="py-12 px-6 bg-obsidian border-y border-carbon">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {BADGES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4 lg:flex-col lg:text-center lg:gap-2">
              <div className="w-10 h-10 flex-shrink-0 bg-carbon flex items-center justify-center">
                <Icon size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-ash">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}