export function Marquee({ text = "LA ÚNICA CERTEZA ES EL CAOS — STREETWEAR MEXICANO — ENVÍO GRATIS +$499 MXN —" }: { text?: string }) {
  return (
    <div className="py-3.5 bg-gold text-void overflow-hidden relative">
      {/* Subtle shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
      
      <div className="flex whitespace-nowrap">
        <div className="flex gap-16 animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="font-syne uppercase tracking-[0.25em] text-[10px] font-bold flex-shrink-0"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}