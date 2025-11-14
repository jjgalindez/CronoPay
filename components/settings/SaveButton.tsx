"use client";

import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

interface SaveButtonProps {
  saving: boolean;
  onSave: () => void;
}

export function SaveButton({ saving, onSave }: SaveButtonProps) {
  return (
    <div className="flex justify-end">
      <Button
        onClick={onSave}
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
  );
}
