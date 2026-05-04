import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-gold text-void py-2.5 px-4 text-center relative overflow-hidden">
      <p className="text-xs font-mono uppercase tracking-[0.2em] font-bold">
        <Link href="/collections/all" className="hover:underline">Nuevo</Link>
        {" "}— Envío GRATIS en pedidos +$499 MXN
      </p>
    </div>
  );
}