"use client";
import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";

export function Header() {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-obsidian/95 backdrop-blur-md border-b border-carbon">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-syne text-2xl font-bold uppercase tracking-widest text-gold">
          YAYAS
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/collections/new" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">Nuevo</Link>
          <Link href="/collections/all" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">Colecciones</Link>
          <Link href="/search" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">Buscar</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 hover:text-gold transition-colors">
            <Search size={20} />
          </Link>
          <button onClick={toggleCart} className="p-2 hover:text-gold transition-colors relative">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-void text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button className="p-2 md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}