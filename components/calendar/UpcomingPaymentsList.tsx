"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import { Pago } from "@/components/context/PaymentContext";
import { parseDate, formatDate } from "@/utils/formatters";

interface UpcomingPaymentsListProps {
  payments: Pago[];
  onSelectPayment: (date: Date) => void;
}

export function UpcomingPaymentsList({
  payments,
  onSelectPayment,
}: UpcomingPaymentsListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Usar formateadores centrales para mantener consistencia

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          Próximos Pagos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">
            No hay pagos este mes
          </p>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {payments.map((pago) => (
              <div
                key={pago.id}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer"
                onClick={() => onSelectPayment(parseDate(pago.fecha_vencimiento))}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {pago.titulo}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(pago.fecha_vencimiento)}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold">
                      {formatCurrency(pago.monto)}
                    </div>
                    <Badge
                      variant="outline"
                      className={`mt-1 text-[10px] ${
                        pago.estado === "Pagado"
                          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400"
                          : pago.estado === "Vencido"
                          ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400"
                          : "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400"
                      }`}
                    >
                      {pago.estado}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
