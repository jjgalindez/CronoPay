import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PaymentList } from "@/components/payments/PaymentList";
import { PaymentCalendar } from "@/components/payments/PaymentCalendar";
import { PaymentSummary } from "@/components/payments/PaymentSummary";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const payments = [
    { id: "1", name: "Netflix - Suscripción", amount: 15, dueDate: "2025-11-06", status: "Pendiente" as const },
    { id: "2", name: "Internet Claro", amount: 38, dueDate: "2025-11-08", status: "Pagado" as const},
    { id: "3", name: "Spotify Premium", amount: 9, dueDate: "2025-11-10", status: "Pendiente" as const},
    { id: "4", name: "Enel - Energía", amount: 120, dueDate: "2025-11-15", status: "Pendiente" as const},
  ];

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista ocupa 2 columnas */}
        <div className="md:col-span-2">
          <PaymentList payments={payments} />
        </div>
        {/* Calendario */}
        <PaymentCalendar />
      </div>

      {/* Resumen */}
      <PaymentSummary total={287} paid={38} upcoming={3} />
    </div>
     
  );
}
