"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/lib/hooks/use-products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const { data, isLoading } = useProducts({
    search: query,
    perPage: 50,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-void">
      {/* Search Header */}
      <section className="sticky top-[73px] z-30 bg-obsidian border-b border-carbon px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" size={20} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {query && (
            <p className="text-ash mb-8">
              {isLoading ? "Buscando..." : `${data?.products.length || 0} resultados para "${query}"`}
            </p>
          )}
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-[3/4] bg-carbon animate-pulse mb-3" />
                  <div className="h-4 bg-carbon animate-pulse mb-2 w-3/4" />
                  <div className="h-4 bg-carbon animate-pulse w-1/4" />
                </div>
              ))}
            </div>
          ) : data?.products.length ? (
            <ProductGrid products={data.products} columns={4} />
          ) : query ? (
            <div className="text-center py-20">
              <p className="text-2xl font-syne font-bold mb-4">Sin resultados</p>
              <p className="text-ash mb-8">No encontramos productos para "{query}"</p>
              <form onSubmit={handleSearch} className="flex items-center gap-4 justify-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Intenta otra búsqueda..."
                  className="px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors w-64"
                />
                <button type="submit" className="px-6 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm">
                  Buscar
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-syne font-bold mb-4">Busca algo</p>
              <p className="text-ash">Ingresa tu búsqueda para encontrar productos.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}