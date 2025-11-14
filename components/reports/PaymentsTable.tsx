"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, RefreshCw } from "lucide-react";
import { Pago } from "@/components/context/PaymentContext";

interface PaymentsTableProps {
  payments: Pago[];
  loading: boolean;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export function PaymentsTable({ 
  payments, 
  loading, 
  formatCurrency, 
  formatDate 
}: PaymentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Detalle de Pagos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium">No hay pagos este mes</p>
            <p className="text-sm">Selecciona otro mes para ver datos</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-semibold">Fecha</th>
                    <th className="text-left py-3 px-2 font-semibold">Nombre</th>
                    <th className="text-left py-3 px-2 font-semibold hidden sm:table-cell">
                      Categoría
                    </th>
                    <th className="text-left py-3 px-2 font-semibold hidden md:table-cell">
                      Método
                    </th>
                    <th className="text-center py-3 px-2 font-semibold">Estado</th>
                    <th className="text-right py-3 px-2 font-semibold">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((pago) => (
                    <tr
                      key={pago.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-2 text-muted-foreground">
                        {formatDate(pago.fecha_vencimiento)}
                      </td>
                      <td className="py-3 px-2 font-medium">{pago.titulo}</td>
                      <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">
                        {pago.categoria}
                      </td>
                      <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">
                        {pago.metodo_pago}
                      </td>
                      <td className="py-3 px-2 text-center">
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
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                          }
                        >
                          {pago.estado}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-right font-semibold">
                        {formatCurrency(pago.monto)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
              <span>
                Mostrando {payments.length} de {payments.length} pagos
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
