import type { Metadata } from "next";
export const metadata: Metadata = { title: "Nosotros", description: "La historia detrás de YAYAS — streetwear mexicano oscuro y artesanal." };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-void py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold uppercase tracking-[0.3em] text-xs font-mono mb-4">Nuestra Historia</p>
        <h1 className="text-4xl md:text-5xl font-syne font-bold uppercase tracking-wider mb-8">Sobre YAYAS</h1>
        <div className="space-y-6 text-ash leading-relaxed">
          <p>YAYAS nació del caos. De las noches interminables de Ciudad de México, de los grafitis que se resisten al amanecer, de la moda que se niega a ser cómoda.</p>
          <p>Cada pieza es diseñada para quienes caminan entre dos mundos: el darkness y la calle, lo artesanal y lo contemporáneo.</p>
          <p>La única certeza es el caos — y en ese caos encontramos nuestra identidad.</p>
        </div>
      </div>
    </div>
  );
}