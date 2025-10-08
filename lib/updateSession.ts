"use server"

import { createClient } from "@/lib/supabase/server"

/*
  Obtiene la sesión actual del usuario desde Supabase (lado servidor)
 */
export async function updateSession() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error("Error al obtener sesión:", error.message)
    return null
  }

  return user
}
