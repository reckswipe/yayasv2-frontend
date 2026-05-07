import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "La historia detrás de YAYAS — streetwear mexicano oscuro y artesanal.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1920&h=1080&fit=crop&auto=format&q=85')",
            filter: "brightness(0.25) contrast(1.2) saturate(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.5em] text-[11px] font-mono mb-6">Nuestra Historia</p>
          <h1 className="text-4xl md:text-6xl font-syne font-black uppercase tracking-[0.05em] leading-[0.92] mb-6">
            <span className="text-cream">Nacimos del</span>
            <br />
            <span className="text-gradient-gold-subtle">caos creativo</span>
          </h1>
          <p className="text-ash text-base md:text-lg max-w-xl mx-auto">
            Streetwear mexicano que fusiona la oscuridad mística con la cultura urbana contemporánea.
          </p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-24 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-2 mb-10">
            <span className="w-2 h-2 bg-gold rounded-full" />
            <span className="w-2 h-2 bg-gold/50 rounded-full" />
            <span className="w-2 h-2 bg-gold/30 rounded-full" />
          </div>
          <blockquote className="text-xl md:text-2xl text-cream leading-relaxed mb-8 font-light">
            "La única certeza es el caos — y en ese caos encontramos nuestra identidad. No vestimos cuerpos, vestimos historias."
          </blockquote>
          <p className="text-xs uppercase tracking-[0.3em] text-ash">— Fundadores, YAYAS</p>
        </div>
      </section>

      {/* Editorial split */}
      <section className="py-24 lg:py-32 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-obsidian order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop&auto=format"
                alt="YAYAS — dark streetwear"
                fill
                className="object-cover brightness-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-gold/30" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-gold/30" />
            </div>
            <div className="order-1 lg:order-2 lg:pl-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Nuestra Esencia</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em] leading-[0.95] mb-8">
                Más que moda,<br />
                <span className="text-gradient-gold-subtle">somos una declaración</span>
              </h2>
              <div className="space-y-5 text-ash leading-relaxed">
                <p>
                  YAYAS nació de las noches interminables de Ciudad de México. De los grafitis que se resisten al amanecer, de la moda que se niega a ser cómoda, de la calle que tiene más para enseñar que cualquier escuela.
                </p>
                <p>
                  Cada pieza es diseñada para quienes caminan entre dos mundos: la oscuridad y la luz, lo artesanal y lo contemporáneo, el ritual y la calle.
                </p>
                <p>
                  Nofollow trends. Nofollow comfort. Somos la voz de una generación que no pide permiso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="py-24 px-6 bg-obsidian border-y border-carbon/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Lo Que Nos Define</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em]">
              Nuestros Pilares
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Artesanal",
                desc: "Cada pieza es diseñada y producida con atención obsesiva al detalle. No hacemos masa — hacemos arte wearable."
              },
              {
                num: "02", 
                title: "Auténtico",
                desc: "No copiamos. No seguimos tendencias. Creamos desde la raíz mexicana, desde el caos de las calles."
              },
              {
                num: "03",
                title: "Oscuro",
                desc: "Abrazamos la oscuridad. El negro no es ausencia de color — es presencia de identidad. Somos dark por convicción."
              }
            ].map((val) => (
              <div key={val.num} className="p-8 border border-carbon bg-void group hover:border-gold/50 transition-colors duration-300">
                <span className="text-gold text-[10px] font-mono tracking-widest mb-6 block">{val.num}</span>
                <h3 className="font-syne text-xl font-bold uppercase tracking-wider mb-4 text-cream group-hover:text-gold transition-colors">
                  {val.title}
                </h3>
                <p className="text-ash text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em] mb-8">
            ¿Listo para<br />
            <span className="text-gradient-gold-subtle">vestir tu caos?</span>
          </h2>
          <p className="text-ash mb-10 max-w-md mx-auto">
            Explora nuestra colección y encuentra piezas que cuentan tu historia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections/all"
              className="px-10 py-4 bg-gold text-void font-syne uppercase tracking-[0.2em] text-sm font-bold hover:bg-gold-dim transition-colors"
            >
              Ver Colección
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 border border-carbon text-ash font-syne uppercase tracking-[0.2em] text-sm hover:border-gold hover:text-gold transition-colors"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}