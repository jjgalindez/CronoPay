
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PaymentDashboard from "@/components/payments/PaymentDashboard";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/auth/login");
  }

  return <PaymentDashboard />;
}
