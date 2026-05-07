import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/storefront/Hero";
import { Marquee } from "@/components/storefront/Marquee";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { TrustBadges } from "@/components/storefront/TrustBadges";
import { NewsletterSignup } from "@/components/storefront/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      
      {/* About/Editorial Section */}
      <section className="py-24 lg:py-32 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-obsidian">
              <Image
                src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=1000&fit=crop&auto=format"
                alt="YAYAS Editorial"
                fill
                className="object-cover brightness-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative corner */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-gold/30" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-gold/30" />
            </div>
            
            {/* Content */}
            <div className="flex flex-col justify-center lg:pl-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Nuestra Historia</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em] leading-[0.95] mb-8 break-words">
                Más que tela,<br />
                <span className="text-gradient-gold-subtle break-words">portamos identidades</span>
              </h2>
              
              <p className="text-ash leading-relaxed mb-8 max-w-md">
                Cada pieza nace de la oscuridad de las calles y la luz de los rituales.
                Somos la voz de una generación que no pide permiso, que camina entre el
                caos y la certeza de quien sabe quién es.
              </p>
              
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] text-gold hover:text-gold-dim transition-colors group"
              >
                Lee nuestra historia
                <span className="w-0 group-hover:w-8 h-px bg-current transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="py-20 bg-obsidian border-y border-carbon/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-2 mb-10">
            <span className="w-2 h-2 bg-gold rounded-full" />
            <span className="w-2 h-2 bg-gold/50 rounded-full" />
            <span className="w-2 h-2 bg-gold/30 rounded-full" />
          </div>
          <blockquote className="text-xl lg:text-2xl text-cream leading-relaxed mb-8">
            "No vestimos cuerpos, vestimos historias. Cada thread es un capítulo de quien se atreve a ser diferente en un mundo que pide conformidad."
          </blockquote>
          <p className="text-xs uppercase tracking-[0.3em] text-ash">— Comunidad YAYAS</p>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-24 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold" />
                <p className="text-gold uppercase tracking-[0.35em] text-[10px] font-mono">Explorar</p>
              </div>
              <h2 className="text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em]">
                Categorías
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              { name: 'Hoodies', href: '/collections/hoodies', img: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400&h=500&fit=crop' },
              { name: 'Playeras', href: '/collections/playeras', img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop' },
              { name: 'Chaquetas', href: '/collections/chaquetas', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop' },
              { name: 'Pantalones', href: '/collections/pantalones', img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop' },
              { name: 'Accesorios', href: '/collections/accesorios', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop' },
              { name: 'Premium', href: '/collections/premium', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=500&fit=crop' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative aspect-[3/4] overflow-hidden bg-obsidian"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-75"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-syne text-lg font-bold uppercase tracking-wider text-cream group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      <TrustBadges />
      <NewsletterSignup />
    </>
  );
}