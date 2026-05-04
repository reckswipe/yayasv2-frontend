import { Truck, RotateCcw, Shield, MessageCircle } from "lucide-react";

const BADGES = [
  { icon: Truck, label: "Envío gratis +$499 MXN", sub: "Llega en 2-5 días hábiles" },
  { icon: RotateCcw, label: "30 días de devolución", sub: "Sin preguntas, gratis" },
  { icon: Shield, label: "Pago 100% seguro", sub: "Tarjeta, OXXO, SPEI" },
  { icon: MessageCircle, label: "¿Dudas? Escríbenos", sub: "WhatsApp — respuesta en minutos" },
];

export function TrustBadges() {
  return (
    <section className="py-16 px-6 bg-obsidian border-y border-carbon">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {BADGES.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={label}
              className="flex items-center gap-4 lg:flex-col lg:text-center lg:gap-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 flex-shrink-0 bg-carbon border border-carbon flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300 group">
                <Icon size={22} className="text-gold group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-sm font-medium leading-tight">{label}</p>
                <p className="text-xs text-ash mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}