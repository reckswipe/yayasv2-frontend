"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to WordPress registration when backend is ready
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-syne font-bold uppercase tracking-wider mb-4">¡Registro exitoso!</h1>
        <p className="text-ash mb-8">Revisa tu email para activar tu cuenta.</p>
        <Link href="/login" className="px-8 py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">Ir a Iniciar Sesión</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-syne font-bold uppercase tracking-wider mb-8 text-center">Crear Cuenta</h1>
      <form onSubmit={handleSubmit} className="bg-obsidian border border-carbon p-8 space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Nombre</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Tu nombre" className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com" className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mínimo 8 caracteres" minLength={8} className="w-full px-4 py-3 bg-carbon border border-carbon text-cream placeholder:text-ash focus:border-gold focus:outline-none transition-colors" />
        </div>
        <button type="submit" className="w-full py-3 bg-gold text-void font-syne uppercase tracking-widest text-sm hover:bg-gold-dim transition-colors">
          Crear Cuenta
        </button>
      </form>
      <p className="text-center text-ash text-sm mt-6">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-gold hover:underline">Inicia sesión</Link>
      </p>
    </div>
  );
}