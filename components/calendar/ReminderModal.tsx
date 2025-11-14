"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { Pago } from "@/components/context/PaymentContext";

interface ReminderModalProps {
  pago: Pago | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReminderModal({ pago, onClose, onSuccess }: ReminderModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fecha_aviso: "",
    mensaje: "",
  });

  if (!pago) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recordatorios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_pago: pago.id,
          fecha_aviso: formData.fecha_aviso,
          mensaje: formData.mensaje || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear recordatorio");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Crear Recordatorio</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Info del pago */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Pago seleccionado</h3>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{pago.titulo}</p>
              <p className="text-muted-foreground">{pago.categoria}</p>
              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <span className="text-muted-foreground">Vencimiento:</span>
                <span className="font-medium">
                  {formatDate(pago.fecha_vencimiento)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monto:</span>
                <span className="font-bold">{formatCurrency(pago.monto)}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fecha_aviso">
                Fecha del Recordatorio *
              </Label>
              <Input
                id="fecha_aviso"
                type="date"
                required
                value={formData.fecha_aviso}
                onChange={(e) =>
                  setFormData({ ...formData, fecha_aviso: e.target.value })
                }
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Recibirás una notificación en esta fecha
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje">Mensaje Personalizado (Opcional)</Label>
              <Input
                id="mensaje"
                type="text"
                placeholder="Ej: Recordar pagar antes del mediodía"
                value={formData.mensaje}
                onChange={(e) =>
                  setFormData({ ...formData, mensaje: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Recordatorio"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
