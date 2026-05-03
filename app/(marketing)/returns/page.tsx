import type { Metadata } from "next";
export const metadata: Metadata = { title: "Devoluciones", description: "Política de devoluciones YAYAS — 30 días, sin preguntas." };

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-void py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-syne font-bold uppercase tracking-wider mb-8">Devoluciones</h1>
        <div className="space-y-6 text-ash leading-relaxed">
          <p>Tienes <strong className="text-cream">30 días</strong> para devolver cualquier producto que no te convenza. Sin preguntas. Sin complicaciones.</p>
          <div className="border border-carbon p-6">
            <h3 className="font-medium mb-3">¿Cómo devolver?</h3>
            <p className="text-sm">Escríbenos por WhatsApp con tu número de orden y te enviamos la guía de devolución sin costo.</p>
          </div>
          <div className="border border-carbon p-6">
            <h3 className="font-medium mb-3">Condiciones</h3>
            <p className="text-sm">El producto debe estar en su estado original, con etiquetas y empaque. No aceptamos productos usados o dañados.</p>
          </div>
          <div className="border border-carbon p-6">
            <h3 className="font-medium mb-3">Reembolso</h3>
            <p className="text-sm">Recibirás tu reembolso en 5-7 días hábiles después de recibido el producto. Se aplica al mismo método de pago.</p>
          </div>
        </div>
      </div>
    </div>
  );
}