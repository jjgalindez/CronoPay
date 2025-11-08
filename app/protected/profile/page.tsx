import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile/profile-form";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/auth/login");
  }

  // Obtener perfil del usuario
  let perfil = await prisma.usuarios_perfil.findUnique({
    where: { id: user.id }
  });

  // Si no existe, crear uno por defecto
  if (!perfil) {
    perfil = await prisma.usuarios_perfil.create({
      data: {
        id: user.id,
        email: user.email || '',
        nombre: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
        avatar_url: user.user_metadata?.avatar_url || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
      }
    });
  }

  // Convertir BigInt a string y Date a string para serialización
  const perfilSerializable = {
    id: perfil.id,
    nombre: perfil.nombre,
    email: perfil.email,
    avatar_url: perfil.avatar_url,
    creado_en: perfil.creado_en?.toISOString() || null
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Configuración de Perfil</h1>
              <p className="text-muted-foreground mt-1">
                Administra tu información personal y preferencias de cuenta
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileForm profile={perfilSerializable} />
      </div>
    </div>
  );
}
