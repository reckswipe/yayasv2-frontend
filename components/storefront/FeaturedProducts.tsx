"use client";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedProducts } from "@/lib/hooks/use-products";
import { formatPrice } from "@/lib/woo/client";

export function FeaturedProducts() {
  const { data, isLoading } = useFeaturedProducts();
  const products = data || [];

  return (
    <section className="py-28 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <p className="text-gold uppercase tracking-[0.35em] text-[10px] font-mono">Colecciones</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-syne font-black uppercase tracking-[0.03em] leading-[0.9]">
              Best <span className="text-gradient-gold-subtle">Sellers</span>
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="hidden md:flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-ash hover:text-gold transition-colors duration-300 group"
          >
            Ver todo
            <span className="w-0 group-hover:w-8 h-px bg-current transition-all duration-400" />
          </Link>
        </div>

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-carbon mb-5" />
                <div className="h-4 bg-carbon mb-3 w-3/4" />
                <div className="h-4 bg-carbon w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {products.slice(0, 4).map((product, i) => {
              const isOnSale = product.on_sale;
              const isLowStock = product.stock_quantity !== null && product.stock_quantity <= 3;
              
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-obsidian mb-5 overflow-hidden">
                    {product.images[0] && (
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out group-hover:brightness-75"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Quick view */}
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                      <span className="block text-center py-3.5 bg-gold text-void text-[11px] font-bold uppercase tracking-[0.2em]">
                        Ver Producto
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {isOnSale && (
                        <span className="px-3 py-1.5 bg-blood text-white text-[9px] font-mono uppercase tracking-wider font-bold">Sale</span>
                      )}
                      {product.featured && !isOnSale && (
                        <span className="px-3 py-1.5 bg-gold text-void text-[9px] font-mono uppercase tracking-wider font-bold">Bestseller</span>
                      )}
                      {isLowStock && (
                        <span className="px-3 py-1.5 bg-void/90 border border-gold/50 text-gold text-[9px] font-mono uppercase tracking-wider backdrop-blur-sm">
                          {product.stock_quantity} left
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-sm font-medium mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-1 tracking-wide">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-gold font-medium">{formatPrice(product.price)}</span>
                    {isOnSale && product.regular_price && (
                      <span className="text-ash text-xs line-through">{formatPrice(product.regular_price)}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-14 text-center md:hidden">
          <Link
            href="/collections/all"
            className="inline-block px-10 py-4 border border-carbon text-ash font-syne uppercase tracking-[0.15em] text-xs hover:border-gold hover:text-gold transition-all duration-300"
          >
            Ver todo →
          </Link>
        </div>
      </div>
    </section>
  );
}