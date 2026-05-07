import { Truck, RotateCcw, Shield, MessageCircle } from "lucide-react";

const BADGES = [
  { icon: Truck, label: "Envío gratis +$499 MXN", sub: "Llega en 2-5 días hábiles" },
  { icon: RotateCcw, label: "30 días de devolución", sub: "Sin preguntas, gratis" },
  { icon: Shield, label: "Pago 100% seguro", sub: "Tarjeta, OXXO, SPEI" },
  { icon: MessageCircle, label: "¿Dudas? Escríbenos", sub: "WhatsApp — respuesta rápida" },
];

export function TrustBadges() {
  return (
    <section className="py-20 px-6 bg-obsidian border-y border-carbon/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {BADGES.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={label}
              className="flex items-center gap-5 lg:flex-col lg:text-center lg:gap-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 flex-shrink-0 bg-carbon/70 border border-carbon/70 flex items-center justify-center hover:border-gold/50 hover:bg-gold/5 transition-all duration-400 group cursor-default rounded-sm">
                <Icon size={22} className="text-gold/80 group-hover:text-gold group-hover:scale-110 transition-all duration-400" />
              </div>
              <div>
                <p className="text-sm font-medium leading-tight mb-1">{label}</p>
                <p className="text-xs text-ash/80">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}