"use client";
import { MessageCircle } from "lucide-react";

export function WhatsAppCTA() {
  return (
    <a
      href="https://wa.me/521234567890?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20YAYAS"
      target="_blank"
      rel="noopener"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Escríbenos por WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
}