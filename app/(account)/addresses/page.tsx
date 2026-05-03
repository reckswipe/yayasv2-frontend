import type { Metadata } from "next";
export const metadata: Metadata = { title: "Mis Direcciones" };

export default function AddressesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-syne font-bold uppercase tracking-wider mb-8">Mis Direcciones</h1>
      <div className="text-center py-16 text-ash">
        <p className="text-lg mb-2">No hay direcciones guardadas</p>
        <p className="text-sm">Durante tu próximo checkout podrás guardar direcciones.</p>
      </div>
    </div>
  );
}