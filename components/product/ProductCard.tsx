"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { WooProduct } from "@/lib/woo/types";
import { formatPrice } from "@/lib/woo/client";

interface ProductCardProps {
  product: WooProduct;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const image = product.images[0];
  const hoverImage = product.images[1];
  const isOnSale = product.on_sale;
  const isLowStock = product.stock_quantity !== null && product.stock_quantity <= 3;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-obsidian mb-5 overflow-hidden">
        {image && (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className={`object-cover transition-all duration-700 ease-out ${isHovered ? "scale-110 brightness-70" : "brightness-90"}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
        )}
        {hoverImage && (
          <Image
            src={hoverImage.src}
            alt={hoverImage.alt || product.name}
            fill
            className={`object-cover absolute inset-0 transition-opacity duration-700 ease-out ${isHovered ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        
        {/* Dark overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />

        {/* Quick view — shows on hover */}
        <div className={`absolute inset-x-0 bottom-0 p-5 transition-all duration-500 ease-out ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <span className="block w-full py-3.5 bg-gold text-void text-[11px] font-bold uppercase tracking-[0.2em] text-center hover:bg-parchment transition-colors duration-300">
            Ver Producto
          </span>
        </div>

        {/* Badges — top left */}
        <div className="absolute top-4 left-4 flex flex-col gap-2.5">
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

      {/* Product info */}
      <div>
        <h3 className="text-sm font-medium mb-2.5 group-hover:text-gold transition-colors duration-300 line-clamp-1 tracking-wide">
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-gold font-medium text-sm">{formatPrice(product.price)}</span>
          {isOnSale && product.regular_price && (
            <span className="text-ash text-xs line-through">{formatPrice(product.regular_price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}