import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contacto", description: "Contáctanos — WhatsApp, email y redes sociales YAYAS." };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-void py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-syne font-bold uppercase tracking-wider mb-4">Contacto</h1>
        <p className="text-ash mb-12">La forma más rápida es por WhatsApp. También puedes escribirnos por redes sociales.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a href="https://wa.me/521234567890" target="_blank" rel="noopener" className="p-6 bg-obsidian border border-carbon hover:border-gold transition-colors text-center">
            <p className="text-2xl mb-2">💬</p>
            <p className="font-medium">WhatsApp</p>
            <p className="text-xs text-ash mt-1">Respuesta en minutos</p>
          </a>
          <a href="https://instagram.com/yayas.mx" target="_blank" rel="noopener" className="p-6 bg-obsidian border border-carbon hover:border-gold transition-colors text-center">
            <p className="text-2xl mb-2">📸</p>
            <p className="font-medium">Instagram</p>
            <p className="text-xs text-ash mt-1">@yayas.mx</p>
          </a>
          <a href="mailto:hola@yayas.mx" className="p-6 bg-obsidian border border-carbon hover:border-gold transition-colors text-center">
            <p className="text-2xl mb-2">✉️</p>
            <p className="font-medium">Email</p>
            <p className="text-xs text-ash mt-1">hola@yayas.mx</p>
          </a>
        </div>
      </div>
    </div>
  );
}