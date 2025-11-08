"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  variant?: 'default' | 'dropdown';
}

export function LogoutButton({ variant = 'default' }: LogoutButtonProps) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (variant === 'dropdown') {
    return (
      <button
        onClick={logout}
        className="flex items-center gap-3 w-full px-0 py-2 text-red-500 text-sm text-destructive hover:bg-destructive/10 rounded transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Cerrar Sesión
      </button>
    );
  }

  return <Button onClick={logout}>Logout</Button>;
}
