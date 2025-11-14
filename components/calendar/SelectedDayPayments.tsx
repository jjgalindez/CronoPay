"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pago } from "@/components/context/PaymentContext";
import { Bell } from "lucide-react";

interface SelectedDayPaymentsProps {
  selectedDate: Date | null;
  payments: Pago[];
  monthName: string;
  onCreateReminder: (pago: Pago) => void;
}

export function SelectedDayPayments({
  selectedDate,
  payments,
  monthName,
  onCreateReminder,
}: SelectedDayPaymentsProps) {
  if (!selectedDate) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="font-semibold text-lg mb-4">
        Pagos del {selectedDate.getDate()} de {monthName}
      </h3>
      {payments.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">
          No hay pagos programados para este día
        </p>
      ) : (
        <div className="space-y-2">
          {payments.map((pago) => (
            <div
              key={pago.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{pago.titulo}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {pago.categoria}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-3">
                <span className="font-bold text-sm">
                  {formatCurrency(pago.monto)}
                </span>
                <Badge
                  variant={
                    pago.estado === "Pagado"
                      ? "default"
                      : pago.estado === "Vencido"
                      ? "destructive"
                      : "secondary"
                  }
                  className={
                    pago.estado === "Pagado"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : pago.estado === "Vencido"
                      ? ""
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                  }
                >
                  {pago.estado}
                </Badge>
                {pago.estado !== "Pagado" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCreateReminder(pago)}
                    className="gap-1"
                  >
                    <Bell className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
