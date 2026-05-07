import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian border-t border-carbon/60">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-6 group">
              <span className="font-syne text-3xl font-black uppercase tracking-[0.3em] bg-gradient-to-r from-gold via-cream to-gold bg-clip-text text-transparent group-hover:brightness-110 transition-all">
                YAYAS
              </span>
            </Link>
            <p className="text-ash text-sm leading-relaxed mb-8 max-w-xs">
              La única certeza es el caos. Streetwear mexicano que fusiona la oscuridad mística con la cultura urbana contemporánea.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/yayas.mx" 
                target="_blank" 
                rel="noopener" 
                className="p-2.5 bg-carbon/50 rounded-full text-ash hover:text-gold hover:bg-gold/10 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://chat.whatsapp.com/" 
                target="_blank" 
                rel="noopener" 
                className="p-2.5 bg-carbon/50 rounded-full text-ash hover:text-gold hover:bg-gold/10 transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a 
                href="https://tiktok.com/@yayas.mx" 
                target="_blank" 
                rel="noopener" 
                className="p-2.5 bg-carbon/50 rounded-full text-ash hover:text-gold hover:bg-gold/10 transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.1A8.16 8.16 0 0019.59 15a8.17 8.17 0 004.41 1.15V9.5a6.34 6.34 0 01-4.41-1.56v3.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-syne text-xs font-bold uppercase tracking-[0.25em] mb-7 text-cream">Tienda</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/collections/new" className="text-ash hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  Nuevo
                </Link>
              </li>
              <li>
                <Link href="/collections/all" className="text-ash hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  Colecciones
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-ash hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  Buscar
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-syne text-xs font-bold uppercase tracking-[0.25em] mb-7 text-cream">Información</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/shipping" className="text-ash hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-ash hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-ash hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ash hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ash hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter mini */}
          <div>
            <h4 className="font-syne text-xs font-bold uppercase tracking-[0.25em] mb-7 text-cream">Unirse al Círculo</h4>
            <p className="text-ash text-sm leading-relaxed mb-6">
              Accesos antecipados, ofertas y más. Sin spam.
            </p>
            <Link
              href="#newsletter"
              className="inline-block px-6 py-3 bg-gold text-void text-xs font-bold uppercase tracking-widest hover:bg-parchment transition-all duration-300"
            >
              Suscribirse
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-carbon/40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-ash text-[11px] uppercase tracking-[0.2em]">
              © {currentYear} YAYAS. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="text-ash hover:text-gold text-[11px] uppercase tracking-[0.15em] transition-colors duration-300">
                Privacidad
              </Link>
              <Link href="/terms" className="text-ash hover:text-gold text-[11px] uppercase tracking-[0.15em] transition-colors duration-300">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}