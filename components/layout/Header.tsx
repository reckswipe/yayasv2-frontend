"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-void/98 backdrop-blur-lg border-b border-carbon/80 shadow-lg shadow-void/20" 
          : "bg-void/90 backdrop-blur-md border-b border-carbon/30"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-22">
          {/* Left nav — desktop */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link 
              href="/collections/all" 
              className="text-xs uppercase tracking-[0.2em] text-ash hover:text-gold transition-colors duration-300 relative group"
            >
              Colecciones
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              href="/about" 
              className="text-xs uppercase tracking-[0.2em] text-ash hover:text-gold transition-colors duration-300 relative group"
            >
              Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              href="/contact" 
              className="text-xs uppercase tracking-[0.2em] text-ash hover:text-gold transition-colors duration-300 relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 text-ash hover:text-gold transition-all duration-300 hover:scale-110"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo — centered */}
          <Link 
            href="/" 
            className="transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
          >
            <Image 
              src="https://compra.yayas.com.mx/wp-content/uploads/2026/05/transparent-Photoroom-e1777858237211.png" 
              alt="YAYAS" 
              width={110} 
              height={37}
              className="h-9 lg:h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right — desktop */}
          <div className="hidden lg:flex items-center gap-5">
            <Link 
              href="/search" 
              className="p-2.5 text-ash hover:text-gold transition-all duration-300 hover:scale-110"
              aria-label="Buscar"
            >
              <Search size={19} />
            </Link>
            <button
              onClick={toggleCart}
              className="p-2.5 text-ash hover:text-gold transition-all duration-300 hover:scale-110 relative"
              aria-label="Ver carrito"
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-void text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in-up shadow-lg">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile — right */}
          <div className="flex lg:hidden items-center gap-3">
            <Link 
              href="/search" 
              className="p-2 text-ash hover:text-gold transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </Link>
            <button 
              onClick={toggleCart} 
              className="p-2 text-ash hover:text-gold transition-colors relative"
              aria-label="Ver carrito"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-void text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — improved styling */}
      <div 
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-400 ease-out",
          mobileOpen 
            ? "max-h-80 opacity-100" 
            : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col px-6 py-6 gap-1 bg-void/98 border-t border-carbon/50 backdrop-blur-lg">
          <Link 
            href="/collections/all" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm uppercase tracking-[0.15em] text-ash hover:text-gold transition-colors py-4 border-b border-carbon/30 flex items-center justify-between group"
          >
            Colecciones
            <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link 
            href="/search" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm uppercase tracking-[0.15em] text-ash hover:text-gold transition-colors py-4 border-b border-carbon/30 flex items-center justify-between group"
          >
            Buscar
            <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm uppercase tracking-[0.15em] text-ash hover:text-gold transition-colors py-4 border-b border-carbon/30 flex items-center justify-between group"
          >
            Nosotros
            <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm uppercase tracking-[0.15em] text-ash hover:text-gold transition-colors py-4 border-b border-carbon/30 flex items-center justify-between group"
          >
            Contacto
            <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link 
            href="/faq" 
            onClick={() => setMobileOpen(false)} 
            className="text-sm uppercase tracking-[0.15em] text-ash hover:text-gold transition-colors py-4"
          >
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}