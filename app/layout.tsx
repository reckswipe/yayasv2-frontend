import type { Metadata } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "YAYAS — Streetwear Mexicano",
    template: "%s | YAYAS",
  },
  description: "La única certeza es el caos. Streetwear mexicano que fusiona la oscuridad mística con la cultura urbana contemporánea.",
  keywords: ["streetwear", "moda mx", "streetwear mexicano", "moda urbana"],
  authors: [{ name: "YAYAS" }],
  openGraph: {
    type: "website",
    siteName: "YAYAS",
    title: "YAYAS — Streetwear Mexicano",
    description: "La única certeza es el caos",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-void text-cream antialiased">{children}</body>
    </html>
  );
}