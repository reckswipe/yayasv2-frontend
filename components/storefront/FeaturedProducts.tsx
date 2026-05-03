"use client";
import Image from "next/image";
import Link from "next/link";

const DEMO_PRODUCTS = [
  { id: 1, name: "VOID TEXTURE Tee", price: 850, handle: "void-texture-tee", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop" },
  { id: 2, name: "OBSIDIAN Hoodie", price: 1450, handle: "obsidian-hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop" },
  { id: 3, name: "CARBON Crossbody", price: 680, handle: "carbon-crossbody", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop" },
  { id: 4, name: "BLOOD Logo Cap", price: 420, handle: "blood-logo-cap", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=750&fit=crop" },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-gold uppercase tracking-[0.3em] text-xs font-mono mb-2">Colecciones</p>
            <h2 className="text-3xl md:text-4xl font-syne font-bold uppercase tracking-wider">Best Sellers</h2>
          </div>
          <Link href="/collections/all" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gold transition-colors group">
            Ver todo <span className="w-0 group-hover:w-4 h-px bg-current transition-all" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {DEMO_PRODUCTS.map((product) => (
            <Link key={product.id} href={`/products/${product.handle}`} className="group block">
              <div className="relative aspect-[3/4] bg-obsidian mb-4 overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-gold text-void text-xs font-mono uppercase">Bestseller</span>
                </div>
              </div>
              <h3 className="text-sm font-medium mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
              <p className="text-gold text-sm">${product.price.toLocaleString("es-MX")} MXN</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center md:hidden">
          <Link href="/collections/all" className="px-8 py-3 border border-carbon text-ash font-syne uppercase tracking-widest text-sm hover:border-smoke transition-colors">
            Ver todo
          </Link>
        </div>
      </div>
    </section>
  );
}
