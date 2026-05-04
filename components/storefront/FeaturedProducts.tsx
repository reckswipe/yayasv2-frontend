"use client";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedProducts } from "@/lib/hooks/use-products";
import { formatPrice } from "@/lib/woo/client";

export function FeaturedProducts() {
  const { data, isLoading } = useFeaturedProducts();
  const products = data || [];

  return (
    <section className="py-24 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-gold uppercase tracking-[0.3em] text-[11px] font-mono mb-3">Colecciones</p>
            <h2 className="text-3xl md:text-5xl font-syne font-black uppercase tracking-[0.05em]">Best Sellers</h2>
          </div>
          <Link
            href="/collections/all"
            className="hidden md:flex items-center gap-3 text-sm uppercase tracking-widest text-ash hover:text-gold transition-colors group"
          >
            Ver todo
            <span className="w-0 group-hover:w-6 h-px bg-current transition-all duration-300" />
          </Link>
        </div>

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-carbon mb-4" />
                <div className="h-4 bg-carbon mb-2 w-3/4" />
                <div className="h-4 bg-carbon w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 4).map((product, i) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group block animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-obsidian mb-5 overflow-hidden">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt || product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-75"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Quick view */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="block text-center py-3 bg-gold text-void text-xs font-bold uppercase tracking-widest">
                      Ver Producto
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.on_sale && (
                      <span className="px-2.5 py-1 bg-blood text-white text-[10px] font-mono uppercase tracking-wider font-bold">Sale</span>
                    )}
                    {product.featured && !product.on_sale && (
                      <span className="px-2.5 py-1 bg-gold text-void text-[10px] font-mono uppercase tracking-wider font-bold">Bestseller</span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-sm font-medium mb-1.5 group-hover:text-gold transition-colors line-clamp-1 tracking-wide">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-gold">{formatPrice(product.price)}</span>
                  {product.on_sale && product.regular_price && (
                    <span className="text-ash text-xs line-through">{formatPrice(product.regular_price)}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/collections/all"
            className="inline-block px-8 py-3 border border-carbon text-ash font-syne uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-colors"
          >
            Ver todo
          </Link>
        </div>
      </div>
    </section>
  );
}