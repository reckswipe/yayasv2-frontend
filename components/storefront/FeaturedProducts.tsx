"use client";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedProducts } from "@/lib/hooks/use-products";
import { formatPrice } from "@/lib/woo/client";

export function FeaturedProducts() {
  const { data, isLoading } = useFeaturedProducts();
  const products = data || [];

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-gold uppercase tracking-[0.3em] text-xs font-mono mb-2">Colecciones</p>
              <h2 className="text-3xl md:text-4xl font-syne font-bold uppercase tracking-wider">Best Sellers</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-carbon animate-pulse mb-4" />
                <div className="h-4 bg-carbon animate-pulse mb-2 w-3/4" />
                <div className="h-4 bg-carbon animate-pulse w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group block">
              <div className="relative aspect-[3/4] bg-obsidian mb-4 overflow-hidden">
                {product.images[0] && (
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                {product.on_sale && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-blood text-white text-xs font-mono uppercase">Sale</span>
                  </div>
                )}
                {!product.on_sale && product.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-gold text-void text-xs font-mono uppercase">Bestseller</span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-gold text-sm">{formatPrice(product.price)}</span>
                {product.on_sale && product.regular_price && (
                  <span className="text-ash text-xs line-through">{formatPrice(product.regular_price)}</span>
                )}
              </div>
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