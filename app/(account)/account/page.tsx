import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Mi Cuenta" };

export default function AccountPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-syne font-bold uppercase tracking-wider mb-8">Mi Cuenta</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/account/orders" className="p-6 bg-obsidian border border-carbon hover:border-gold transition-colors">
          <h3 className="font-medium mb-1">Mis Pedidos</h3>
          <p className="text-xs text-ash">Historial y seguimiento</p>
        </Link>
        <Link href="/account/addresses" className="p-6 bg-obsidian border border-carbon hover:border-gold transition-colors">
          <h3 className="font-medium mb-1">Direcciones</h3>
          <p className="text-xs text-ash">Direcciones de envío guardadas</p>
        </Link>
      </div>
    </div>
  );
}