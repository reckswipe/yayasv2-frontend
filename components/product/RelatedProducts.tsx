"use client";
import type { WooProduct } from "@/lib/woo/client";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: WooProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}