"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to WordPress JWT auth when backend is ready
    if (email && password) {
      setError("Inicia sesión en tu cuenta de WordPress para continuar.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-syne font-bold uppercase tracking-wider mb-8 text-center">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="bg-obsidian border border-carbon p-8 space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com" className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
        </div>
        {error && <p className="text-blood text-sm">{error}</p>}
        <button type="submit" className="w-full py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">
          Iniciar Sesión
        </button>
      </form>
      <p className="text-center text-ash text-sm mt-6">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="text-gold hover:underline">Regístrate</Link>
      </p>
    </div>
  );
}