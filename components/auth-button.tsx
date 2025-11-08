import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { UserDropdown } from "./user-dropdown";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/auth/login">Iniciar Sesion</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/auth/sign-up">Registrarse</Link>
        </Button>
      </div>
    );
  }

  // Intentar obtener perfil desde la tabla usuarios_perfil
  let perfil = null;
  try {
    perfil = await prisma.usuarios_perfil.findUnique({ where: { id: user.id } });
  } catch (e) {
    // Si falla la consulta, seguimos mostrando la info desde supabase
    console.error('Error obteniendo perfil:', e);
  }

  // Construir objeto que espera UserDropdown
  const userForDropdown = {
    user_metadata: {
      full_name: perfil?.nombre || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
      avatar_url: perfil?.avatar_url || user.user_metadata?.avatar_url || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
    },
    email: perfil?.email || user.email || ''
  };

  return <UserDropdown user={userForDropdown} />;
}
