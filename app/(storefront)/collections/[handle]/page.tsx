import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProducts, getCategoryBySlug } from "@/lib/woo/client";
import { ProductGrid } from "@/components/product/ProductGrid";

interface Props {
  params: { handle: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.handle);
  if (!category) return { title: "Colección no encontrada" };
  return {
    title: category.name,
    description: category.description || `${category.name} - YAYAS Streetwear`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const [category, { products }] = await Promise.all([
    getCategoryBySlug(params.handle),
    getProducts({ category: params.handle, perPage: 100 }),
  ]);

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative py-20 px-6 bg-obsidian overflow-hidden">
        {category.image && (
          <div className="absolute inset-0">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-void" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-gold uppercase tracking-[0.3em] text-xs font-mono mb-3">Colección</p>
          <h1 className="text-4xl md:text-6xl font-syne font-bold uppercase tracking-wider mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-ash max-w-xl text-lg">{category.description}</p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <p className="text-ash text-sm">{products.length} productos</p>
          </div>
          <Suspense fallback={<div className="h-96" />}>
            <ProductGrid products={products} columns={4} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}