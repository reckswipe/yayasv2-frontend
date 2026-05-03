import type { Metadata } from "next";
import { getCategories } from "@/lib/woo/client";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colecciones",
  description: "Explora todas las colecciones YAYAS",
};

export default async function CollectionsPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative py-20 px-6 bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-syne font-bold uppercase tracking-wider mb-4">Colecciones</h1>
          <p className="text-ash text-lg">Explora nuestro universo de streetwear oscuro.</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/collections/${cat.slug}`}
                className={`group relative overflow-hidden ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-[4/3]" : "aspect-square"
                }`}
              >
                <div className="absolute inset-0 bg-carbon" />
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-syne text-xl font-bold uppercase tracking-wider mb-1">{cat.name}</h3>
                  <p className="text-ash text-sm">{cat.count} productos</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}