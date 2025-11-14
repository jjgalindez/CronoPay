"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";

interface ProfileInfoCardProps {
  settings: {
    nombre: string;
    email: string;
    telefono: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export function ProfileInfoCard({ settings, onInputChange }: ProfileInfoCardProps) {
  return (
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
              onChange={(e) => onInputChange("nombre", e.target.value)}
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
            onChange={(e) => onInputChange("telefono", e.target.value)}
            placeholder="+57 300 123 4567"
          />
        </div>
      </CardContent>
    </Card>
  );
}
