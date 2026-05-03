import { Fragment } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ToastProvider } from "@/components/ui/Toast";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppCTA />
      <CartDrawer />
    </ToastProvider>
  );
}
