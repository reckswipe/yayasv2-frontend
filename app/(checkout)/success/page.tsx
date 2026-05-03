import Link from "next/link";
import { Check } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check size={40} className="text-gold" />
        </div>
        <h1 className="text-3xl font-syne font-bold uppercase tracking-wider mb-4">¡Orden Recibida!</h1>
        <p className="text-ash mb-8 leading-relaxed">
          Gracias por tu compra. Te hemos enviado un email de confirmación con los detalles de tu orden y seguimiento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">
            Volver al Inicio
          </Link>
          <Link href="/collections/all" className="px-8 py-3 border border-carbon text-ash font-syne uppercase tracking-widest text-sm hover:border-smoke transition-colors">
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}