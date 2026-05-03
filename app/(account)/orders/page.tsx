import type { Metadata } from "next";
export const metadata: Metadata = { title: "Mis Pedidos" };

export default function OrdersPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-syne font-bold uppercase tracking-wider mb-8">Mis Pedidos</h1>
      <div className="text-center py-16 text-ash">
        <p className="text-lg mb-2">No tienes pedidos aún</p>
        <p className="text-sm">Cuando hagas tu primera compra, aparecerán aquí.</p>
      </div>
    </div>
  );
}