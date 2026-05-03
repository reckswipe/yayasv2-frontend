"use client";
import { useCartStore } from "@/lib/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/woo/client";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const subtotal = total();
  const freeShippingThreshold = 499;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="min-h-screen bg-void">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-syne font-bold uppercase tracking-wider mb-8">Mi Carrito</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={64} className="text-carbon mx-auto mb-6" />
            <p className="text-2xl font-syne font-bold mb-4">Tu carrito está vacío</p>
            <p className="text-ash mb-8">El caos aún no ha seleccionado nada.</p>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors"
            >
              Explorar Colecciones
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-obsidian border border-carbon">
                  <div className="w-24 h-24 bg-carbon flex-shrink-0">
                    {item.image?.src && (
                      <Image
                        src={item.image.src}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-ash hover:text-blood transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                    {item.sku && <p className="text-xs text-ash mb-2">SKU: {item.sku}</p>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-carbon">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:text-gold transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:text-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-gold font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-obsidian border border-carbon p-6 sticky top-32">
                <h2 className="font-syne text-lg font-bold uppercase tracking-widest mb-6">Resumen</h2>

                {/* Free shipping progress */}
                {amountToFreeShipping > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-ash mb-2">
                      <span>Para envío gratis (+$499)</span>
                      <span className="text-gold">{formatPrice(amountToFreeShipping)} MXN</span>
                    </div>
                    <div className="h-1 bg-carbon overflow-hidden">
                      <div
                        className="h-full bg-gold transition-all"
                        style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-ash">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ash">Envío</span>
                    <span>{subtotal >= freeShippingThreshold ? "Gratis" : "Calculado en checkout"}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg border-t border-carbon pt-4 mb-6">
                  <span>Total</span>
                  <span className="text-gold">{formatPrice(subtotal)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm text-center hover:bg-gold-dim transition-colors mb-3"
                >
                  Ir al Checkout
                </Link>
                <Link
                  href="/collections/all"
                  className="block w-full py-3 border border-carbon text-ash font-syne uppercase tracking-widest text-sm text-center hover:border-smoke transition-colors"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}