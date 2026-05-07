"use client";
import { X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/woo/client";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, total } = useCartStore();
  const subtotal = total();
  const freeShippingThreshold = 499;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-void/90 backdrop-blur-sm z-50 transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-obsidian border-l border-carbon z-50 transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-carbon">
            <div>
              <h2 className="font-syne text-lg font-bold uppercase tracking-widest">Mi Carrito</h2>
              {items.length > 0 && (
                <p className="text-xs text-ash mt-1">{items.length} {items.length === 1 ? "producto" : "productos"}</p>
              )}
            </div>
            <button
              onClick={() => setCartOpen(false)}
              aria-label="Cerrar carrito"
              className="w-10 h-10 flex items-center justify-center border border-carbon hover:border-gold hover:text-gold transition-all duration-300"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items or empty state */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <ShoppingBag size={48} className="text-carbon mb-6" />
              <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
              <p className="text-ash text-sm text-center mb-8">El caos aún no ha seleccionado nada.</p>
              <button
                onClick={() => setCartOpen(false)}
                className="px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-xs hover:bg-gold-dim transition-colors"
              >
                Explorar Colecciones
              </button>
            </div>
          ) : (
            <>
              {/* Free shipping bar */}
              {amountToFreeShipping > 0 && (
                <div className="px-6 py-3 bg-carbon/50 border-b border-carbon">
                  <div className="flex justify-between text-xs text-ash mb-1.5">
                    <span>Envío gratis (+$499)</span>
                    <span className="text-gold">{formatPrice(amountToFreeShipping)} MXN</span>
                  </div>
                  <div className="h-0.5 bg-smoke overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-carbon/30 border border-carbon/50">
                    <div className="w-20 h-20 bg-carbon flex-shrink-0 overflow-hidden">
                      {item.image?.src && (
                        <Image src={item.image.src} alt={item.name} width={80} height={80} className="object-cover w-full h-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-1">
                        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-ash hover:text-blood transition-colors flex-shrink-0 text-xs"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-gold text-sm mb-3">{formatPrice(item.price * item.quantity)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-carbon flex items-center justify-center text-xs hover:bg-smoke transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-carbon flex items-center justify-center text-xs hover:bg-smoke transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-carbon bg-obsidian space-y-4">
                <div className="flex justify-between">
                  <span className="text-ash text-sm">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full py-4 bg-gold text-void font-syne uppercase tracking-widest text-sm text-center hover:bg-gold-dim transition-colors glow-gold"
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