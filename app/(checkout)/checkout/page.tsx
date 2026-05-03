"use client";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/woo/client";
import { Check, CreditCard, Building, Truck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Step = "info" | "shipping" | "payment";
type PaymentMethod = "card" | "oxxo" | "spei";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("info");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    email: "", name: "", phone: "",
    address: "", city: "", state: "", zip: "",
    instructions: "",
  });

  const subtotal = total();
  const freeShipping = subtotal >= 499;
  const shippingCost = freeShipping ? 0 : 99;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => clearCart(), 3000);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check size={40} className="text-gold" />
        </div>
        <h1 className="text-3xl font-syne font-bold uppercase tracking-wider mb-4">¡Orden Recibida!</h1>
        <p className="text-ash mb-2">Gracias por tu compra. Te enviamos un email de confirmación.</p>
        <p className="text-sm text-ash mb-8">Número de orden: <span className="text-gold">#YAY-{Date.now().toString().slice(-6)}</span></p>
        <Link href="/" className="px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-syne font-bold uppercase tracking-wider mb-4">Tu carrito está vacío</h1>
        <Link href="/collections/all" className="px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">
          Explorar Colecciones
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-20">
      {/* Form */}
      <div className="lg:col-span-2">
        {/* Step indicators */}
        <div className="flex items-center gap-4 mb-8">
          {(["info", "shipping", "payment"] as Step[]).map((s, i) => {
            const stepIndex = ["info", "shipping", "payment"].indexOf(step);
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={cn("w-8 h-8 flex items-center justify-center text-sm font-bold", step === s ? "bg-gold text-void" : i < stepIndex ? "bg-green-600 text-white" : "bg-carbon text-ash")}>
                  {i < stepIndex ? <Check size={16} /> : i + 1}
                </div>
                <span className="text-sm uppercase tracking-widest hidden sm:block">
                  {s === "info" ? "Info" : s === "shipping" ? "Envío" : "Pago"}
                </span>
                {i < 2 && <div className="w-8 h-px bg-carbon" />}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === "info" && (
            <div className="bg-obsidian border border-carbon p-6 space-y-4">
              <h2 className="font-syne text-lg font-bold uppercase tracking-widest">Información de Contacto</h2>
              <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
              <input type="text" required placeholder="Nombre completo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
              <input type="tel" required placeholder="Teléfono (con LADA)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
              <button type="button" onClick={() => setStep("shipping")} className="w-full py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">
                Continuar a Envío
              </button>
            </div>
          )}

          {step === "shipping" && (
            <div className="bg-obsidian border border-carbon p-6 space-y-4">
              <h2 className="font-syne text-lg font-bold uppercase tracking-widest mb-4">Dirección de Envío</h2>
              <input type="text" required placeholder="Dirección" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="Ciudad" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none" />
                <input type="text" required placeholder="Estado" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none" />
              </div>
              <input type="text" required placeholder="Código Postal" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none" />
              <textarea placeholder="Instrucciones de entrega (opcional)" value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none resize-none h-20" />
              <div className="flex items-center gap-3 py-3 px-4 border border-carbon">
                <Truck size={20} className="text-gold" />
                <div>
                  <p className="text-sm font-medium">{freeShipping ? "Envío Estándar — GRATIS" : "Envío Estándar — $99 MXN"}</p>
                  <p className="text-xs text-ash">2-5 días hábiles</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setStep("info")} className="px-6 py-3 border border-carbon text-ash font-syne uppercase tracking-widest text-sm hover:border-smoke">← Atrás</button>
                <button type="button" onClick={() => setStep("payment")} className="flex-1 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">Continuar a Pago</button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-obsidian border border-carbon p-6 space-y-4">
              <h2 className="font-syne text-lg font-bold uppercase tracking-widest mb-4">Método de Pago</h2>
              <div className="space-y-3">
                {(["card", "oxxo", "spei"] as PaymentMethod[]).map((m) => {
                  const methods = { card: { label: "Tarjeta de Crédito/Débito", sub: "Visa, Mastercard, AMEX", Icon: CreditCard }, oxxo: { label: "OXXO", sub: "Pago en efectivo en cualquier OXXO", Icon: Building }, spei: { label: "SPEI / Transferencia", sub: "Transferencia desde cualquier banco MX", Icon: Building } };
                  const { label, sub, Icon } = methods[m];
                  return (
                    <button key={m} type="button" onClick={() => setPayment(m)} className={cn("w-full flex items-center gap-4 p-4 border transition-colors", payment === m ? "border-gold bg-gold/5" : "border-carbon hover:border-smoke")}>
                      <Icon size={20} className={payment === m ? "text-gold" : "text-ash"} />
                      <div className="text-left"><p className="font-medium">{label}</p><p className="text-xs text-ash">{sub}</p></div>
                      {payment === m && <Check size={20} className="ml-auto text-gold" />}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setStep("shipping")} className="px-6 py-3 border border-carbon text-ash font-syne uppercase tracking-widest text-sm hover:border-smoke">← Atrás</button>
                <button type="submit" className="flex-1 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">
                  Completar Orden — {formatPrice(grandTotal)}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-obsidian border border-carbon p-6 sticky top-8">
          <h2 className="font-syne text-lg font-bold uppercase tracking-widest mb-6">Tu Orden</h2>
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-16 h-16 bg-carbon flex-shrink-0 overflow-hidden">
                  {item.image?.src && <Image src={item.image.src} alt={item.name} width={64} height={64} className="object-cover w-full h-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <p className="text-xs text-ash">Qty: {item.quantity}</p>
                  <p className="text-sm text-gold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t border-carbon pt-4">
            <div className="flex justify-between text-sm"><span className="text-ash">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-ash">Envío</span><span>{freeShipping ? "Gratis" : "$99 MXN"}</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-carbon pt-3"><span>Total</span><span className="text-gold">{formatPrice(grandTotal)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}