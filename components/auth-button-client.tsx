"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthButtonClient() {
  const [user, setUser] = useState<any>(null);
  const placeholderAvatar = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  const [avatarSrc, setAvatarSrc] = useState<string>(placeholderAvatar);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Obtenemos usuario actual al cargar
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Escuchamos cambios de sesión (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setAvatarSrc(user.user_metadata.avatar_url);
    } else {
      setAvatarSrc(placeholderAvatar);
    }
  }, [user]);

  const isGoogleAvatar = avatarSrc.includes("googleusercontent.com");

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/auth/login">Iniciar sesión</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/auth/sign-up">Registrarse</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        {user.user_metadata.full_name || user.email}
      </span>
      <img
        src={avatarSrc}
        alt="Avatar"
        className="w-8 h-8 rounded-full"
        loading="lazy"
        referrerPolicy={isGoogleAvatar ? "no-referrer" : undefined}
        onError={() => setAvatarSrc(placeholderAvatar)}
      />
      <Button
        size="sm"
        variant="outline"
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/auth/login"); 
        }}
      >
        Logout
      </Button>
    </div>
  );
}
