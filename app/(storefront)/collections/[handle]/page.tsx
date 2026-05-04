import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getCategoryBySlug } from "@/lib/woo/client";
import { ProductGrid } from "@/components/product/ProductGrid";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const category = await getCategoryBySlug(handle);
  if (!category) return { title: "Colección no encontrada" };
  return {
    title: category.name,
    description: category.description || `${category.name} — YAYAS Streetwear`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const [category, { products }] = await Promise.all([
    getCategoryBySlug(handle),
    getProducts({ category: handle, perPage: 100 }),
  ]);

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-void">
      <section className="relative py-20 px-6 bg-obsidian overflow-hidden">
        {category.image ? (
          <div className="absolute inset-0">
            <Image src={category.image} alt={category.name} fill className="object-cover opacity-30" priority />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-void" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-gold uppercase tracking-[0.3em] text-xs font-mono mb-3">Colección</p>
          <h1 className="text-4xl md:text-6xl font-syne font-bold uppercase tracking-wider mb-4">{category.name}</h1>
          {category.description && <p className="text-ash max-w-xl text-lg">{category.description}</p>}
          <p className="text-ash text-sm mt-4">{products.length} productos</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<div className="h-96" />}>
            <ProductGrid products={products} columns={4} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}