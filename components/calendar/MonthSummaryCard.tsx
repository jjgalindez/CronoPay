"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthSummaryCardProps {
  monthName: string;
  summary: {
    total: number;
    completados: number;
    pendientes: number;
    vencidos: number;
    totalMonto: number;
  };
}

export function MonthSummaryCard({ monthName, summary }: MonthSummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Resumen de {monthName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Total pagos</span>
          <span className="font-bold">{summary.total}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Completados</span>
          <span className="font-bold text-green-600">
            {summary.completados}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Pendientes</span>
          <span className="font-bold text-orange-600">
            {summary.pendientes}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Vencidos</span>
          <span className="font-bold text-red-600">{summary.vencidos}</span>
        </div>
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Monto total</span>
            <span className="font-bold text-lg">
              {formatCurrency(summary.totalMonto)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
