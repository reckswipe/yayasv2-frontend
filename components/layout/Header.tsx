"use client";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import Image from "next/image";
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
          {/* Left nav */}
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
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image src="https://compra.yayas.com.mx/wp-content/uploads/2026/05/transparent-Photoroom.png" alt="YAYAS" width={180} height={60} className="h-14 w-auto object-contain" />
          </Link>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-5">
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

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-3">
            <Link href="/search" className="p-2 text-ash hover:text-gold">
              <Search size={20} />
            </Link>
            <button onClick={toggleCart} className="p-2 text-ash hover:text-gold relative">
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
      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-300 bg-void border-t border-carbon/50",
        mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col px-6 py-4 gap-1">
          {[
            { href: "/collections/all", label: "Colecciones" },
            { href: "/search", label: "Buscar" },
            { href: "/about", label: "Nosotros" },
            { href: "/faq", label: "FAQ" },
            { href: "/contact", label: "Contacto" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-sm uppercase tracking-widest text-ash hover:text-gold transition-colors py-3 border-b border-carbon/30 hover:border-gold/30"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}