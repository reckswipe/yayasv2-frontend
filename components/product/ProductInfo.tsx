"use client";
import { useState } from "react";
import type { WooProduct } from "@/lib/woo/types";
import { formatPrice, stripHtml } from "@/lib/woo/client";
import { useCartStore } from "@/lib/store/cart-store";
import { ShoppingBag, Heart, Minus, Plus, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: WooProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const sizeAttribute = product.attributes.find((a) =>
    a.name.toLowerCase().includes("talla") || a.name.toLowerCase().includes("size")
  );
  const sizes = sizeAttribute?.options || [];
  const description = stripHtml(product.description || product.short_description);
  const isOnSale = product.on_sale;
  const isLowStock = product.stock_quantity !== null && product.stock_quantity <= 5;

  const handleAddToCart = () => {
    addItem({
      id: Date.now(),
      product_id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity,
      image: product.images[0] ? { src: product.images[0].src, alt: product.images[0].alt } : undefined,
      sku: product.sku,
    });
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="lg:py-4 space-y-8">
      {/* Category + Title */}
      <div>
        {product.categories[0] && (
          <p className="text-gold uppercase tracking-[0.25em] text-[11px] font-mono mb-3">
            {product.categories[0].name}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-syne font-black uppercase tracking-[0.05em] leading-tight mb-6">
          {product.name}
        </h1>

        {/* Price */}
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-3xl text-gold font-medium">{formatPrice(product.price)}</span>
          {isOnSale && product.regular_price && (
            <span className="text-lg text-ash line-through">{formatPrice(product.regular_price)}</span>
          )}
          {isOnSale && (
            <span className="px-2 py-1 bg-blood text-white text-[11px] font-mono uppercase">Ahorra {Math.round((1 - parseFloat(product.price) / parseFloat(product.regular_price)) * 100)}%</span>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 mb-6">
          {product.stock_status === "instock" ? (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-500 font-medium">En stock</span>
              {isLowStock && (
                <span className="text-sm text-blood font-medium">— Solo {product.stock_quantity} disponibles</span>
              )}
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-blood" />
              <span className="text-sm text-blood">Agotado</span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-carbon pt-6">
        <p className="text-ash leading-relaxed text-sm md:text-base">{description}</p>
      </div>

      {/* Size selector */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-ash font-mono">Talla</p>
            {selectedSize && (
              <span className="text-xs text-gold">{selectedSize}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "min-w-[48px] px-4 py-3 border text-sm uppercase tracking-wider transition-all duration-300",
                  selectedSize === size
                    ? "border-gold bg-gold text-void font-bold"
                    : "border-carbon hover:border-gold text-cream hover:bg-carbon"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex gap-3">
        <div className="flex items-center border border-carbon">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-14 flex items-center justify-center hover:text-gold transition-colors text-lg"
          >
            <Minus size={16} />
          </button>
          <span className="w-14 text-center text-lg font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-14 flex items-center justify-center hover:text-gold transition-colors text-lg"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock_status !== "instock"}
          className={cn(
            "flex-1 flex items-center justify-center gap-3 h-14 px-6 font-syne uppercase tracking-[0.15em] text-sm font-bold transition-all duration-300",
            added
              ? "bg-green-600 text-white"
              : product.stock_status !== "instock"
              ? "bg-carbon text-ash cursor-not-allowed"
              : "bg-gold text-void hover:bg-gold-dim hover:shadow-lg hover:shadow-gold/20"
          )}
        >
          {added ? (
            <>
              <Check size={20} />
              Añadido
            </>
          ) : (
            <>
              <ShoppingBag size={20} />
              {product.stock_status !== "instock" ? "Agotado" : "Añadir al Carrito"}
            </>
          )}
        </button>

        <button className="w-14 h-14 border border-carbon flex items-center justify-center hover:border-blood hover:text-blood transition-all duration-300">
          <Heart size={20} />
        </button>
      </div>

      {/* Trust signals */}
      <div className="border-t border-carbon pt-6 space-y-3">
        {[
          { icon: Truck, text: "Envío gratis en pedidos +$499 MXN" },
          { icon: RotateCcw, text: "Devolución gratis en 30 días" },
          { icon: Shield, text: "Pago 100% seguro — Tarjeta, OXXO, SPEI" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-sm text-ash">
            <Icon size={16} className="text-gold flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
