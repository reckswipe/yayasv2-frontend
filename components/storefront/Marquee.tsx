export function Marquee({ text = "LA ÚNICA CERTEZA ES EL CAOS — STREETWEAR MEXICANO — ENVÍO GRATIS +$499 MXN —" }: { text?: string }) {
  return (
    <div className="py-3 bg-gold text-void overflow-hidden">
      <div className="flex whitespace-nowrap">
        <div className="flex gap-12 animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-syne uppercase tracking-[0.2em] text-[11px] font-bold flex-shrink-0">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}