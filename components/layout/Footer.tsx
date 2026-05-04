import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-carbon">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="block mb-4 hover:opacity-80 transition-opacity">
              <Image src="https://compra.yayas.com.mx/wp-content/uploads/2026/05/transparent-Photoroom.png" alt="YAYAS" width={140} height={47} className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-ash text-sm leading-relaxed">La única certeza es el caos. Streetwear mexicano que fusiona la oscuridad mística con la cultura urbana contemporánea.</p>
          </div>
          <div>
            <h4 className="font-syne text-sm font-bold uppercase tracking-widest mb-6">Tienda</h4>
            <ul className="space-y-3">
              <li><Link href="/collections/new" className="text-ash hover:text-gold text-sm transition-colors">Nuevo</Link></li>
              <li><Link href="/collections/all" className="text-ash hover:text-gold text-sm transition-colors">Colecciones</Link></li>
              <li><Link href="/search" className="text-ash hover:text-gold text-sm transition-colors">Buscar</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-syne text-sm font-bold uppercase tracking-widest mb-6">Información</h4>
            <ul className="space-y-3">
              <li><Link href="/shipping" className="text-ash hover:text-gold text-sm transition-colors">Envíos</Link></li>
              <li><Link href="/returns" className="text-ash hover:text-gold text-sm transition-colors">Devoluciones</Link></li>
              <li><Link href="/faq" className="text-ash hover:text-gold text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-ash hover:text-gold text-sm transition-colors">Contacto</Link></li>
              <li><Link href="/about" className="text-ash hover:text-gold text-sm transition-colors">Nosotros</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-syne text-sm font-bold uppercase tracking-widest mb-6">Síguenos</h4>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/yayas.mx" target="_blank" rel="noopener" className="text-ash hover:text-gold text-sm transition-colors">Instagram</a>
              <a href="https://tiktok.com/@yayas.mx" target="_blank" rel="noopener" className="text-ash hover:text-gold text-sm transition-colors">TikTok</a>
              <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener" className="text-ash hover:text-gold text-sm transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-carbon">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ash text-xs uppercase tracking-widest">© 2026 YAYAS. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-ash hover:text-gold text-xs uppercase tracking-widest transition-colors">Privacidad</Link>
              <Link href="/terms" className="text-ash hover:text-gold text-xs uppercase tracking-widest transition-colors">Términos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}