"use client";

import { useState, useMemo } from "react";
import { usePayments } from "@/components/context/PaymentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  FileDown,
  Mail, 
  FileSpreadsheet,
  RefreshCw,
} from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReportsPage() {
  const { pagos, loading } = usePayments();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  // Generar lista de meses (últimos 12 meses)
  const availableMonths = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const label = date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
      });
      months.push({ value, label });
    }
    return months;
  }, []);

  // Filtrar pagos del mes seleccionado
  const monthlyPayments = useMemo(() => {
    const [year, month] = selectedMonth.split("-").map(Number);
    return pagos.filter((pago) => {
      const pagoDate = new Date(pago.fecha_vencimiento);
      return (
        pagoDate.getFullYear() === year && pagoDate.getMonth() === month - 1
      );
    });
  }, [pagos, selectedMonth]);

  // Calcular métricas del mes
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

  // Agrupar pagos por categoría
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

  // Configuración del gráfico
  const chartData = {
    labels: categoryData.labels,
    datasets: [
      {
        data: categoryData.values,
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // blue
          "rgba(16, 185, 129, 0.8)", // green
          "rgba(249, 115, 22, 0.8)", // orange
          "rgba(139, 92, 246, 0.8)", // purple
          "rgba(236, 72, 153, 0.8)", // pink
          "rgba(234, 179, 8, 0.8)",  // yellow
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(234, 179, 8, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = categoryData.total > 0
              ? ((value / categoryData.total) * 100).toFixed(1)
              : "0";
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
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
      day: "2-digit",
      month: "short",
    });
  };

  // Funciones de exportación
  const exportToPDF = () => {
    alert("Exportación a PDF - Funcionalidad próximamente");
    // Aquí se implementaría la lógica con jsPDF o similar
  };

  const exportToExcel = () => {
    alert("Exportación a Excel - Funcionalidad próximamente");
    // Aquí se implementaría la lógica con xlsx o similar
  };

  const exportToEmail = () => {
    alert("Envío por correo - Funcionalidad próximamente");
    // Aquí se implementaría la lógica de envío por email
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
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
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {availableMonths.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
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

      {/* Contenido principal: 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: Detalle de pagos */}
        <div className="lg:col-span-2 space-y-6">
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
              ) : monthlyPayments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No hay pagos este mes</p>
                  <p className="text-sm">Selecciona otro mes para ver datos</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Tabla responsive */}
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
                        {monthlyPayments.map((pago) => (
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
                      Mostrando {monthlyPayments.length} de {monthlyPayments.length} pagos
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha: Gráfico y exportación */}
        <div className="lg:col-span-1 space-y-6">
          {/* Gráfico circular */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pagos por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryData.labels.length > 0 ? (
                <div className="h-64">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No hay datos para mostrar</p>
                  </div>
                </div>
              )}

              {categoryData.labels.length > 0 && (
                <div className="mt-4 space-y-2">
                  {categoryData.labels.slice(0, 3).map((label, index) => {
                    const percentage =
                      ((categoryData.values[index] / categoryData.total) * 100).toFixed(1);
                    return (
                      <div key={label} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: chartData.datasets[0].backgroundColor[index],
                            }}
                          />
                          <span className="truncate">{label}</span>
                        </div>
                        <span className="font-semibold">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Exportar reporte */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Exportar Reporte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={exportToPDF}
                variant="outline"
                className="w-full justify-start gap-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
              >
                <FileDown className="w-4 h-4" />
                Descargar PDF
              </Button>

              <Button
                onClick={exportToExcel}
                variant="outline"
                className="w-full justify-start gap-3 bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Exportar a Excel
              </Button>

              <Button
                onClick={exportToEmail}
                variant="outline"
                className="w-full justify-start gap-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
              >
                <Mail className="w-4 h-4" />
                Enviar por correo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
