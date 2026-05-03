import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[12rem] leading-none font-syne font-bold text-gold mb-4">404</h1>
      <p className="text-xl text-ash mb-8">El caos no fue encontrado</p>
      <Link href="/" className="px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">
        Volver al caos
      </Link>
    </div>
  );
}