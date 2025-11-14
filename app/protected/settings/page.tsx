"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { ProfileInfoCard } from "@/components/settings/ProfileInfoCard";
import { NotificationsCard } from "@/components/settings/NotificationsCard";
import { AppearanceCard } from "@/components/settings/AppearanceCard";
import { SecurityCard } from "@/components/settings/SecurityCard";
import { SaveButton } from "@/components/settings/SaveButton";

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Estado para configuraciones
  const [settings, setSettings] = useState({
    nombre: "",
    email: "",
    telefono: "",
    notificaciones_email: true,
    notificaciones_push: true,
    recordatorio_dias: 3,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setSettings((prev) => ({
          ...prev,
          email: user.email || "",
          nombre: user.user_metadata?.full_name || "",
        }));
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    try {
      // Aquí puedes guardar las configuraciones en Supabase o tu base de datos
      // Por ahora solo simulamos el guardado
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar las configuraciones");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <SettingsHeader success={success} />
      
      <ProfileInfoCard 
        settings={settings}
        onInputChange={handleInputChange}
      />

      <NotificationsCard 
        settings={settings}
        onInputChange={handleInputChange}
      />

      <AppearanceCard />

      <SecurityCard />

      <SaveButton 
        saving={saving}
        onSave={handleSave}
      />
    </div>
  );
}
