"use client";

import { useState, useMemo } from "react";
import { usePayments } from "@/components/context/PaymentContext";
import { parseDate, formatDate } from '@/utils/formatters';
import { useRouter } from "next/navigation";
import { MonthSelector } from "@/components/reports/MonthSelector";
import { MetricsCards } from "@/components/reports/MetricsCards";
import { PaymentsTable } from "@/components/reports/PaymentsTable";
import { CategoryChart } from "@/components/reports/CategoryChart";
import { ReportActions } from "@/components/reports/ReportActions";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  const router = useRouter();
  const { pagos, loading } = usePayments();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const monthlyPayments = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);
    return pagos.filter((pago) => {
      const pagoDate = parseDate(pago.fecha_vencimiento);
      return pagoDate.getFullYear() === year && pagoDate.getMonth() === month - 1;
    });
  }, [pagos, selectedMonth]);

  const metrics = useMemo(() => {
    const total = monthlyPayments.length;
    const completados = monthlyPayments.filter((p) => p.estado === "Pagado").length;
    const pendientes = monthlyPayments.filter((p) => p.estado === "Pendiente").length;
    const vencidos = monthlyPayments.filter((p) => p.estado === "Vencido").length;
    
    const totalMonto = monthlyPayments.reduce((sum, p) => sum + p.monto, 0);
    const completadosMonto = monthlyPayments
      .filter((p) => p.estado === "Pagado")
      .reduce((sum, p) => sum + p.monto, 0);
    const pendientesMonto = monthlyPayments
      .filter((p) => p.estado === "Pendiente" || p.estado === "Vencido")
      .reduce((sum, p) => sum + p.monto, 0);

    return {
      total,
      completados,
      pendientes: pendientes + vencidos,
      totalMonto,
      completadosMonto,
      pendientesMonto,
      completadosPercentage: total > 0 ? Math.round((completados / total) * 100) : 0,
      pendientesPercentage: total > 0 ? Math.round(((pendientes + vencidos) / total) * 100) : 0,
    };
  }, [monthlyPayments]);

  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, number>();
    
    monthlyPayments.forEach((pago) => {
      const current = categoryMap.get(pago.categoria) || 0;
      categoryMap.set(pago.categoria, current + pago.monto);
    });

    const sortedCategories = Array.from(categoryMap.entries())
      .sort(([, a], [, b]) => b - a);

    return {
      labels: sortedCategories.map(([cat]) => cat),
      values: sortedCategories.map(([, val]) => val),
      total: sortedCategories.reduce((sum, [, val]) => sum + val, 0),
    };
  }, [monthlyPayments]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateWrapper = (date: Date | string) => formatDate(date);

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Reportes Mensuales
          </h1>
          <p className="text-muted-foreground mt-2">
            Consulta y descarga informes detallados de tus pagos organizados por mes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            onRefresh={() => router.refresh()}
          />
          <Button
            variant="outline"
            onClick={() => router.push("/protected/reports/saved")}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Ver Guardados
          </Button>
        </div>
      </div>

      <MetricsCards metrics={metrics} formatCurrency={formatCurrency} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PaymentsTable
            payments={monthlyPayments}
            loading={loading}
            formatCurrency={formatCurrency}
            formatDate={formatDateWrapper}
          />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <CategoryChart
            categoryData={categoryData}
            formatCurrency={formatCurrency}
          />
          <ReportActions
            selectedMonth={selectedMonth}
            totalPagado={metrics.completadosMonto}
            totalPendiente={metrics.pendientesMonto}
            onSaveSuccess={() => router.refresh()}
          />
        </div>
      </div>
    </div>
  );
}
