"use client";
import { useState } from "react";
import type { WooProduct } from "@/lib/woo/client";
import { formatPrice, stripHtml } from "@/lib/woo/client";
import { useCartStore } from "@/lib/store/cart-store";
import { ShoppingBag, Heart, Minus, Plus, Check } from "lucide-react";
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

  const handleAddToCart = () => {
    addItem({
      id: Date.now(),
      product_id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity,
      image: product.images[0]?.src,
      sku: product.sku,
    });
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const description = stripHtml(product.description || product.short_description);

  return (
    <div className="lg:py-8">
      {/* Title + Price */}
      <div className="mb-6">
        {product.categories[0] && (
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-mono mb-2">
            {product.categories[0].name}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-syne font-bold uppercase tracking-wider mb-4">{product.name}</h1>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl text-gold">{formatPrice(product.price)}</span>
          {product.on_sale && product.regular_price && (
            <span className="text-xl text-ash line-through">{formatPrice(product.regular_price)}</span>
          )}
        </div>

        {/* Stock status */}
        <div className="flex items-center gap-2 mb-6">
          {product.stock_status === "instock" ? (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-green-500">En stock</span>
              {product.stock_quantity && product.stock_quantity <= 5 && (
                <span className="text-sm text-blood">— Solo {product.stock_quantity} disponibles</span>
              )}
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-blood" />
              <span className="text-sm text-blood">
                {product.stock_status === "outofstock" ? "Agotado" : "Pre-orden"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-ash leading-relaxed">{description}</p>
      </div>

      {/* Size selector */}
      {sizes.length > 0 && (
        <div className="mb-6">
          <p className="text-sm uppercase tracking-widest mb-3">
            Talla: {selectedSize && <span className="text-gold">{selectedSize}</span>}
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-4 py-2 border text-sm uppercase tracking-widest transition-all",
                  selectedSize === size
                    ? "border-gold bg-gold text-void"
                    : "border-carbon hover:border-gold text-cream"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center border border-carbon">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center hover:text-gold transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center hover:text-gold transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock_status !== "instock"}
          className={cn(
            "flex-1 flex items-center justify-center gap-3 py-3 font-syne uppercase tracking-widest text-sm transition-all",
            added
              ? "bg-green-600 text-white"
              : product.stock_status !== "instock"
              ? "bg-carbon text-ash cursor-not-allowed"
              : "bg-gold text-void hover:bg-gold-dim"
          )}
        >
          {added ? (
            <>
              <Check size={20} />
              Añadido al carrito
            </>
          ) : (
            <>
              <ShoppingBag size={20} />
              {product.stock_status !== "instock" ? "Agotado" : "Añadir al Carrito"}
            </>
          )}
        </button>

        <button className="w-12 h-12 border border-carbon flex items-center justify-center hover:border-blood hover:text-blood transition-colors">
          <Heart size={20} />
        </button>
      </div>

      {/* Shipping info */}
      <div className="border-t border-carbon pt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-ash">
          <Check size={16} className="text-gold" />
          Envío gratis en pedidos +$499 MXN
        </div>
        <div className="flex items-center gap-3 text-sm text-ash">
          <Check size={16} className="text-gold" />
          Devolución gratuita en 30 días
        </div>
        <div className="flex items-center gap-3 text-sm text-ash">
          <Check size={16} className="text-gold" />
          Pago seguro: Tarjeta, OXXO, SPEI
        </div>
      </div>
    </div>
  );
}