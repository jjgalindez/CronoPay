import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { PaymentProvider } from "@/components/context/PaymentContext";

export const metadata: Metadata = {
  title: "Cronopay — Inicio",
  description: "Simplifica la administración de tus transacciones con un diseño moderno, seguro y fácil de usar.",
};


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PaymentProvider>
      <main className="min-h-screen flex flex-col">
        <Navbar variant="app" fixed={false} />
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 pt-8">
            {children}
          </div>
        </div>
      </main>
    </PaymentProvider>
  );
}
