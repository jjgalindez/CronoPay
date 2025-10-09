"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { User } from "@supabase/supabase-js";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = "/auth/login",
  loadingComponent 
}: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Verificar usuario actual
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error("Error getting user:", error);
          router.push(redirectTo);
          return;
        }

        if (!user) {
          // Guardar la ruta actual para redirigir después del login
          const currentPath = window.location.pathname;
          router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
          return;
        }

        setUser(user);
      } catch (error) {
        console.error("Error in auth check:", error);
        router.push(redirectTo);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push(redirectTo);
        } else if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, redirectTo, supabase.auth]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return loadingComponent || (
      <LoadingSpinner message="Verificando autenticación..." />
    );
  }

  // Solo renderizar children si el usuario está autenticado
  return user ? <>{children}</> : null;
}

// Hook personalizado para obtener el usuario actual
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return { user, loading };
}