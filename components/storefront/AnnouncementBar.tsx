import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-gold text-void py-2 px-4 text-center">
      <p className="text-xs font-mono uppercase tracking-widest">
        <Link href="/collections/new" className="hover:underline">Nuevo</Link> — Envío GRATIS en pedidos +$499 MXN
      </p>
    </div>
  );
}