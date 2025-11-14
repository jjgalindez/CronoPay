"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Calendar } from "lucide-react";

interface NotificationsCardProps {
  settings: {
    notificaciones_email: boolean;
    notificaciones_push: boolean;
    recordatorio_dias: number;
  };
  onInputChange: (field: string, value: any) => void;
}

export function NotificationsCard({ settings, onInputChange }: NotificationsCardProps) {
  return (
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
              onInputChange(
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
              onInputChange(
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
              onInputChange("recordatorio_dias", parseInt(e.target.value) || 3)
            }
          />
          <p className="text-xs text-muted-foreground">
            Te notificaremos {settings.recordatorio_dias} días antes del vencimiento
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
