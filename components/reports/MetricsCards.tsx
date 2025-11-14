"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2, AlertCircle, DollarSign } from "lucide-react";

interface Metrics {
  total: number;
  completados: number;
  pendientes: number;
  totalMonto: number;
  completadosMonto: number;
  pendientesMonto: number;
  completadosPercentage: number;
  pendientesPercentage: number;
}

interface MetricsCardsProps {
  metrics: Metrics;
  formatCurrency: (amount: number) => string;
}

export function MetricsCards({ metrics, formatCurrency }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Pagos
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{metrics.total}</div>
          <p className="text-xs text-muted-foreground mt-1">Este mes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completados
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            {metrics.completados}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {metrics.completadosPercentage}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pendientes
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-600">
            {metrics.pendientes}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {metrics.pendientesPercentage}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total General
          </CardTitle>
          <DollarSign className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(metrics.totalMonto)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">COP</p>
        </CardContent>
      </Card>
    </div>
  );
}
