"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Loader2,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const supabase = createClient();
  const { theme, setTheme } = useTheme();
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
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Configuraciones
          </h1>
          <p className="text-muted-foreground mt-1">
            Personaliza tu experiencia en CronoPay
          </p>
        </div>
        {success && (
          <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Cambios guardados
          </Badge>
        )}
      </div>

      {/* Información del Perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Información del Perfil
          </CardTitle>
          <CardDescription>
            Actualiza tu información personal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input
                id="nombre"
                value={settings.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Tu nombre"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                El email no se puede cambiar
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Teléfono (Opcional)
            </Label>
            <Input
              id="telefono"
              type="tel"
              value={settings.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              placeholder="+57 300 123 4567"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificaciones
          </CardTitle>
          <CardDescription>
            Configura cómo quieres recibir notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">
                Recibe recordatorios de pagos por correo
              </p>
            </div>
            <Button
              variant={settings.notificaciones_email ? "default" : "outline"}
              size="sm"
              onClick={() =>
                handleInputChange(
                  "notificaciones_email",
                  !settings.notificaciones_email
                )
              }
            >
              {settings.notificaciones_email ? "Activado" : "Desactivado"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones Push</Label>
              <p className="text-sm text-muted-foreground">
                Recibe notificaciones en el navegador
              </p>
            </div>
            <Button
              variant={settings.notificaciones_push ? "default" : "outline"}
              size="sm"
              onClick={() =>
                handleInputChange(
                  "notificaciones_push",
                  !settings.notificaciones_push
                )
              }
            >
              {settings.notificaciones_push ? "Activado" : "Desactivado"}
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recordatorio" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Días de anticipación para recordatorios
            </Label>
            <Input
              id="recordatorio"
              type="number"
              min="1"
              max="30"
              value={settings.recordatorio_dias}
              onChange={(e) =>
                handleInputChange("recordatorio_dias", parseInt(e.target.value) || 3)
              }
            />
            <p className="text-xs text-muted-foreground">
              Te notificaremos {settings.recordatorio_dias} días antes del vencimiento
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Apariencia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Apariencia
          </CardTitle>
          <CardDescription>
            Personaliza el tema de la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tema</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="w-full gap-2"
                onClick={() => setTheme("light")}
              >
                <Sun className="w-4 h-4" />
                Claro
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="w-full gap-2"
                onClick={() => setTheme("dark")}
              >
                <Moon className="w-4 h-4" />
                Oscuro
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="w-full gap-2"
                onClick={() => setTheme("system")}
              >
                <Laptop className="w-4 h-4" />
                Sistema
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seguridad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Seguridad
          </CardTitle>
          <CardDescription>
            Gestiona tu seguridad y privacidad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cambiar Contraseña</Label>
              <p className="text-sm text-muted-foreground">
                Actualiza tu contraseña regularmente
              </p>
            </div>
            <Button variant="outline" size="sm">
              Cambiar
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sesiones Activas</Label>
              <p className="text-sm text-muted-foreground">
                Gestiona dónde has iniciado sesión
              </p>
            </div>
            <Button variant="outline" size="sm">
              Ver sesiones
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Botón Guardar */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 min-w-[150px]"
          size="lg"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
