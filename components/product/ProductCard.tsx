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
      {/* Image */}
      <div className="relative aspect-[3/4] bg-obsidian mb-4 overflow-hidden">
        {image && (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className={`object-cover transition-all duration-700 ${isHovered ? "scale-105 brightness-75" : "brightness-90"}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
        )}
        {hoverImage && (
          <Image
            src={hoverImage.src}
            alt={hoverImage.alt || product.name}
            fill
            className={`object-cover absolute inset-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Dark overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />

        {/* Quick view button */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <span className="block w-full py-3 bg-gold text-void text-xs font-bold uppercase tracking-widest text-center hover:bg-parchment transition-colors">
            Ver Producto
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && (
            <span className="px-2.5 py-1 bg-blood text-white text-[10px] font-mono uppercase tracking-wider font-bold">Sale</span>
          )}
          {product.featured && !isOnSale && (
            <span className="px-2.5 py-1 bg-gold text-void text-[10px] font-mono uppercase tracking-wider font-bold">Bestseller</span>
          )}
          {isLowStock && (
            <span className="px-2.5 py-1 bg-void border border-gold text-gold text-[10px] font-mono uppercase tracking-wider">
              {product.stock_quantity} left
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-sm font-medium mb-1.5 group-hover:text-gold transition-colors duration-300 line-clamp-1 tracking-wide">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-gold text-sm font-medium">{formatPrice(product.price)}</span>
          {isOnSale && product.regular_price && (
            <span className="text-ash text-xs line-through">{formatPrice(product.regular_price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}