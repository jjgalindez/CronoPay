
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PaymentCalendar } from "@/components/payments/PaymentCalendar";
import { PaymentSummary } from "@/components/payments/PaymentSummary";
import PaymentListWrapper from "@/components/payments/payment-list-wrapper";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PaymentListWrapper title="Recordatorios de pagos" />
        </div>
        <PaymentCalendar />
      </div>
      <PaymentSummary total={144} paid={38} upcoming={3} />
    </div>
  );
}
