import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-void text-cream px-6">
      <h1 className="text-8xl font-syne font-bold text-gold mb-4">404</h1>
      <p className="text-xl text-ash mb-8">El caos no fue encontrado</p>
      <Link
        href="/"
        className="px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors"
      >
        Volver al caos
      </Link>
    </div>
  );
}