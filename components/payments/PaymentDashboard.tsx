'use client';

import { Suspense, useMemo } from 'react';
import { usePayments } from '@/components/context/PaymentContext';
import PaymentMetricsCard from '@/components/payments/PaymentMetricsCard';
import UpcomingPaymentsCard from '@/components/payments/UpcomingPaymentsCard';
import PaymentCalendarReminders from '@/components/payments/PaymentCalendarReminders';
import { PaymentCalendar } from '@/components/payments/PaymentCalendar';
import PaymentListData from '@/components/payments/payment-list-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Calendar, 
  CreditCard, 
  List,
  TrendingUp,
  Download,
  FileText,
  FileSpreadsheet,
  Mail
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Loading components
function MetricsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ListLoading() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-card rounded-lg border border-border p-6 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 bg-muted rounded w-24"></div>
              </div>
            </div>
            <div className="h-6 bg-muted rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PaymentDashboard() {
  const { pagos, loading } = usePayments();

  // Obtener últimos 6 meses para el historial
  const paymentHistory = useMemo(() => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth();
      
      const monthPayments = pagos.filter((pago) => {
        const pagoDate = new Date(pago.fecha_vencimiento);
        return pagoDate.getFullYear() === year && pagoDate.getMonth() === month;
      });

      const totalMonto = monthPayments.reduce((sum, p) => sum + p.monto, 0);
      
      months.push({
        label: date.toLocaleDateString("es-CO", { month: "short" }),
        fullLabel: date.toLocaleDateString("es-CO", { year: "numeric", month: "long" }),
        total: totalMonto,
      });
    }
    
    return months;
  }, [pagos]);

  // Distribución por categoría (mes actual)
  const categoryDistribution = useMemo(() => {
    const now = new Date();
    const currentMonthPayments = pagos.filter((pago) => {
      const pagoDate = new Date(pago.fecha_vencimiento);
      return (
        pagoDate.getFullYear() === now.getFullYear() &&
        pagoDate.getMonth() === now.getMonth()
      );
    });

    const categoryMap = new Map<string, number>();
    
    currentMonthPayments.forEach((pago) => {
      const current = categoryMap.get(pago.categoria) || 0;
      categoryMap.set(pago.categoria, current + pago.monto);
    });

    const sortedCategories = Array.from(categoryMap.entries())
      .sort(([, a], [, b]) => b - a);

    const total = sortedCategories.reduce((sum, [, val]) => sum + val, 0);

    return {
      labels: sortedCategories.map(([cat]) => cat),
      values: sortedCategories.map(([, val]) => val),
      percentages: sortedCategories.map(([, val]) => 
        total > 0 ? ((val / total) * 100).toFixed(1) : "0"
      ),
      total,
    };
  }, [pagos]);

  // Actividad reciente (últimos 10 pagos)
  const recentActivity = useMemo(() => {
    return [...pagos]
      .sort((a, b) => {
        const dateA = new Date(a.fecha_vencimiento);
        const dateB = new Date(b.fecha_vencimiento);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 10);
  }, [pagos]);

  // Gráfico de historial de pagos
  const historyChartData = {
    labels: paymentHistory.map((m) => m.label),
    datasets: [
      {
        label: "Monto Total",
        data: paymentHistory.map((m) => m.total),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const historyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y;
            return `$${value.toLocaleString("es-CO")}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "$" + value.toLocaleString("es-CO");
          },
        },
      },
    },
  };

  // Gráfico de distribución por categoría
  const categoryChartData = {
    labels: categoryDistribution.labels,
    datasets: [
      {
        data: categoryDistribution.values,
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(234, 179, 8, 0.8)",
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

  const categoryChartOptions = {
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
            const percentage = categoryDistribution.total > 0
              ? ((value / categoryDistribution.total) * 100).toFixed(1)
              : "0";
            return `${label}: $${value.toLocaleString("es-CO")} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Función para descargar actividad reciente
  const downloadActivityReport = (format: 'pdf' | 'excel' | 'email') => {
    if (format === 'pdf') {
      alert('Funcionalidad de exportación a PDF en desarrollo');
    } else if (format === 'excel') {
      // Generar CSV simple
      const headers = ['Fecha', 'Titulo', 'Categoría', 'Monto', 'Estado'];
      const rows = recentActivity.map(pago => [
        new Date(pago.fecha_vencimiento).toLocaleDateString('es-CO'),
        pago.titulo,
        pago.categoria,
        `$${pago.monto.toLocaleString('es-CO')}`,
        pago.estado
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `actividad_reciente_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } else if (format === 'email') {
      alert('Funcionalidad de envío por email en desarrollo');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Estadísticas Financieras</h1>
          <p className="text-muted-foreground mt-1">
            Visualiza tus pagos, gastos y hábitos financieros de manera clara y sencilla.
          </p>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="space-y-6">
        <Suspense fallback={<MetricsLoading />}>
          <PaymentMetricsCard />
        </Suspense>
      </div>

      {/* Gráficos */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Historial de Pagos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Historial de Pagos</span>
              <select 
                className="text-sm border rounded px-3 py-1 bg-background"
                defaultValue="6"
              >
                <option value="6">Últimos 6 meses</option>
              </select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Line data={historyChartData} options={historyChartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Distribución por Categoría */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {categoryDistribution.labels.length > 0 ? (
                <Doughnut data={categoryChartData} options={categoryChartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No hay datos para el mes actual
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad Reciente */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Actividad Reciente</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadActivityReport('excel')}
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Descargar reporte
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-blue-600"
              >
                Ver detalles
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Fecha</th>
                  <th className="pb-3 font-medium text-muted-foreground">Título</th>
                  <th className="pb-3 font-medium text-muted-foreground">Categoría</th>
                  <th className="pb-3 font-medium text-muted-foreground">Monto</th>
                  <th className="pb-3 font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.length > 0 ? (
                  recentActivity.map((pago) => (
                    <tr key={pago.id} className="border-b last:border-0">
                      <td className="py-4">
                        {new Date(pago.fecha_vencimiento).toLocaleDateString("es-CO", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4">{pago.titulo}</td>
                      <td className="py-4">{pago.categoria}</td>
                      <td className="py-4 font-semibold">
                        ${pago.monto.toLocaleString("es-CO")}
                      </td>
                      <td className="py-4">
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
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : pago.estado === "Vencido"
                              ? ""
                              : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                          }
                        >
                          {pago.estado}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No hay actividad reciente
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Vista General
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Mis Pagos
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendario
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96"></div>}>
              <UpcomingPaymentsCard />
            </Suspense>
            
            <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96"></div>}>
              <PaymentCalendarReminders />
            </Suspense>
          </div>
        </TabsContent>

        {/* Payments List Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Lista de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ListLoading />}>
                <PaymentListData />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96"></div>}>
              <PaymentCalendar />
            </Suspense>
            <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96"></div>}>
              <PaymentCalendarReminders />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}