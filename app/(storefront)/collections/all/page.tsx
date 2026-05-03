import type { Metadata } from "next";
import { getCategories, getProducts } from "@/lib/woo/client";
import { ProductGrid } from "@/components/product/ProductGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Todas las Colecciones",
  description: "Explora todas las colecciones YAYAS — streetwear mexicano oscuro y artesanal",
};

export default async function AllCollectionsPage() {
  const [categories, { products }] = await Promise.all([
    getCategories(),
    getProducts({ perPage: 100 }),
  ]);

  return (
    <div className="min-h-screen bg-void">
      <section className="relative py-20 px-6 bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold uppercase tracking-[0.3em] text-xs font-mono mb-3">YAYAS</p>
          <h1 className="text-4xl md:text-5xl font-syne font-bold uppercase tracking-wider mb-4">Todas las Piezas</h1>
          <p className="text-ash text-lg">{products.length} productos</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="px-4 py-2 bg-gold text-void text-sm font-mono uppercase">Todo</span>
              {categories.map((cat) => (
                <a key={cat.id} href={`/collections/${cat.slug}`} className="px-4 py-2 bg-carbon text-ash text-sm hover:bg-smoke hover:text-cream transition-colors">
                  {cat.name}
                </a>
              ))}
            </div>
          )}

          <ProductGrid products={products} columns={4} />
        </div>
      </section>
    </div>
  );
}