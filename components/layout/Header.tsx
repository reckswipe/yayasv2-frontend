"use client";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-void/95 backdrop-blur-md border-b border-carbon/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left nav — desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/collections/all" className="text-sm uppercase tracking-widest text-ash hover:text-gold transition-colors duration-300 underline-grow">
              Colecciones
            </Link>
            <Link href="/about" className="text-sm uppercase tracking-widest text-ash hover:text-gold transition-colors duration-300 underline-grow">
              Nosotros
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-ash hover:text-gold transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="font-syne text-2xl lg:text-3xl font-bold uppercase tracking-[0.2em] text-gradient-gold transition-all duration-300 hover:brightness-110">
            YAYAS
          </Link>

          {/* Right — desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/search" className="p-2 text-ash hover:text-gold transition-all duration-300 hover:scale-110">
              <Search size={20} />
            </Link>
            <button
              onClick={toggleCart}
              className="p-2 text-ash hover:text-gold transition-all duration-300 hover:scale-110 relative"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-void text-xs font-bold rounded-full flex items-center justify-center animate-fade-in-up">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile — right */}
          <div className="flex lg:hidden items-center gap-4">
            <Link href="/search" className="p-2 text-ash hover:text-gold transition-colors">
              <Search size={20} />
            </Link>
            <button onClick={toggleCart} className="p-2 text-ash hover:text-gold transition-colors relative">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-void text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("lg:hidden overflow-hidden transition-all duration-300 bg-void border-t border-carbon/50", mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0")}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          <Link href="/collections/all" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest text-ash hover:text-gold transition-colors py-2 border-b border-carbon/30">
            Colecciones
          </Link>
          <Link href="/search" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest text-ash hover:text-gold transition-colors py-2 border-b border-carbon/30">
            Buscar
          </Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest text-ash hover:text-gold transition-colors py-2 border-b border-carbon/30">
            Nosotros
          </Link>
          <Link href="/faq" onClick={() => setMobileOpen(false)} className="text-sm uppercase tracking-widest text-ash hover:text-gold transition-colors py-2">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}