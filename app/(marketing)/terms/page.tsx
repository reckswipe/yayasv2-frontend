import type { Metadata } from "next";
export const metadata: Metadata = { title: "Términos", description: "Términos y condiciones YAYAS." };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-void py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-syne font-bold uppercase tracking-wider mb-8">Términos y Condiciones</h1>
        <div className="space-y-6 text-ash leading-relaxed text-sm">
          <p>Al comprar en yayas.mx aceptas nuestros términos. Los precios se muestran en MXN e incluyen IVA. Las imágenes son representativas del producto real.</p>
          <p>YAYAS se reserva el derecho de modificar precios sin previo aviso. Las órdenes fraudulentas serán canceladas.</p>
        </div>
      </div>
    </div>
  );
}