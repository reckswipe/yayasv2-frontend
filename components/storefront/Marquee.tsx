"use client";

export function Marquee({ text = "LA ÚNICA CERTEZA ES EL CAOS — STREETWEAR MEXICANO — ENVÍO GRATIS +$499 MXN —" }: { text?: string }) {
  return (
    <div className="py-4 bg-gold text-void overflow-hidden">
      <div className="flex whitespace-nowrap">
        <div className="flex gap-8 animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-syne uppercase tracking-widest text-sm font-bold flex-shrink-0">{text}</span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
}
