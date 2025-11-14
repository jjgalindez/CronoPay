"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

export function SecurityCard() {
  return (
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
  );
}
