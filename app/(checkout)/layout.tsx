import { BackButton } from "@/components/checkout/BackButton";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-void">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </div>
  );
}