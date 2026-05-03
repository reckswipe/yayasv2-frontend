"use client";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, total } = useCartStore();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-void/80 backdrop-blur-sm z-50 transition-opacity",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setCartOpen(false)}
      />
      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-obsidian border-l border-carbon z-50 transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-carbon">
            <h2 className="font-syne text-lg font-bold uppercase tracking-widest">Mi Carrito</h2>
            <button onClick={() => setCartOpen(false)} className="p-2 hover:text-gold transition-colors">
              <X size={20} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <p className="text-ash mb-4">Tu carrito está vacío</p>
              <button
                onClick={() => setCartOpen(false)}
                className="px-6 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm"
              >
                Explorar Colecciones
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-carbon flex-shrink-0">
                      {item.image?.src && (
                        <Image src={item.image.src} alt={item.name} width={80} height={80} className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1">{item.name}</h4>
                      <p className="text-gold text-sm mb-2">${item.price.toLocaleString("es-MX")} MXN</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-carbon flex items-center justify-center text-xs hover:bg-smoke transition-colors"
                        >
                          −
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-carbon flex items-center justify-center text-xs hover:bg-smoke transition-colors"
                        >
                          +
                        </button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto text-ash hover:text-blood text-xs">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-carbon space-y-4">
                <div className="flex justify-between">
                  <span className="text-ash">Subtotal</span>
                  <span className="font-medium">${total().toLocaleString("es-MX")} MXN</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm text-center hover:bg-gold-dim transition-colors"
                >
                  Ir al Checkout
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="block w-full py-3 border border-carbon text-ash font-syne uppercase tracking-widest text-sm text-center hover:border-smoke transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}