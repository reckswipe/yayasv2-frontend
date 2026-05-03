"use client";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-sm text-ash hover:text-gold transition-colors flex items-center gap-2"
    >
      ← Volver
    </button>
  );
}