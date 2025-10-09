import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignUpForm } from "@/components/sign-up-form";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si ya hay sesión activa, redirige
  if (user) {
    redirect("/protected");
  }

  // Si no hay usuario, muestra el registro normal
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
