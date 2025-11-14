"use client";

import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface SettingsHeaderProps {
  success: boolean;
}

export function SettingsHeader({ success }: SettingsHeaderProps) {
  return (
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
  );
}
