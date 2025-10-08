"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/protected",
      },
    });
    if (error) throw error;
    // Si el login es exitoso, redirigir a la página protegida
    router.push("/protected");
  };

  return (
    <Button
      onClick={handleLogin}
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="#4285F4"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.96 30.47 0 24 0 14.62 0 6.51 5.45 2.56 13.37l7.98 6.19C12.15 13.49 17.58 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.98 24.55c0-1.59-.14-3.11-.39-4.55H24v9.03h12.94c-.56 2.85-2.23 5.26-4.76 6.88l7.36 5.72C43.86 37.39 46.98 31.49 46.98 24.55z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.56c-1.26-3.68-1.26-7.64 0-11.32l-7.98-6.19C-2.66 19.57-2.66 28.43 2.56 36.37l7.97-6.18z"
        />
        <path
          fill="#EA4335"
          d="M24 47.5c6.48 0 11.93-2.13 15.91-5.8l-7.36-5.72c-2.06 1.39-4.71 2.2-8.55 2.2-6.42 0-11.85-4-13.46-9.86l-7.98 6.18C6.51 42.55 14.62 47.5 24 47.5z"
        />
      </svg>
      Iniciar con Google
    </Button>
  );
}
