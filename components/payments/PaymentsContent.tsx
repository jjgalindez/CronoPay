"use client";

import { useState, Suspense } from "react";
import AddPaymentForm from "@/components/payments/add-payment-form";
import PaymentListData from "@/components/payments/payment-list-data";
import PaymentListSkeleton from "@/components/payments/payment-list-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePayments } from "@/components/context/PaymentContext";
import { Calendar, DollarSign } from "lucide-react";
import { PaymentCalendar } from "@/components/payments/PaymentCalendar";
import { parseDate, formatDate as formatDateUtil } from "@/utils/formatters";

export function PaymentsContent() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { pagos, loading } = usePayments();
  
  const handlePaymentAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Calcular próximos pagos
  const calcularProximosPagos = () => {
    const ahora = new Date();
    ahora.setHours(0, 0, 0, 0);

    // Filtrar solo pagos pendientes y futuros
    const pagosPendientes = pagos.filter(pago => {
      const fechaPago = parseDate(pago.fecha_vencimiento);
      fechaPago.setHours(0, 0, 0, 0);
      return pago.estado === 'Pendiente' && fechaPago >= ahora;
    });

    // Ordenar por fecha más cercana
    const pagosOrdenados = [...pagosPendientes].sort((a, b) => 
      parseDate(a.fecha_vencimiento).getTime() - parseDate(b.fecha_vencimiento).getTime()
    );

    // Tomar solo los primeros 3
    return pagosOrdenados.slice(0, 3);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const formatDate = (date: Date | string) => formatDateUtil(date);

  const proximosPagos = calcularProximosPagos();

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          Registrar un pago recurrente
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Añade un nuevo pago con monto, fecha, categoría y método de pago para mantener tu organización financiera al día.
        </p>
      </div>

      {/* Layout principal: 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: Formulario */}
        <div className="lg:col-span-2 space-y-6">
          {/* Formulario de Agregar Pago */}
          <Card>
            <CardContent className="pt-6">
              <AddPaymentForm onSuccess={handlePaymentAdded} />
            </CardContent>
          </Card>

          {/* Lista de pagos */}
          <div>
            <Suspense fallback={<PaymentListSkeleton />}>
              <PaymentListData refreshKey={refreshKey} />
            </Suspense>
          </div>
        </div>

        {/* Columna derecha: Próximos pagos y Calendario */}
        <div className="lg:col-span-1 space-y-6">
          {/* Próximos pagos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-500" />
                Próximos pagos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-muted rounded animate-pulse" />
                  ))}
                </div>
              ) : proximosPagos.length > 0 ? (
                proximosPagos.map((pago) => (
                  <div
                    key={pago.id}
                    className="flex justify-between items-start p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">
                        {pago.titulo}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(pago.fecha_vencimiento)}
                      </p>
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <div className="font-bold text-sm text-foreground">
                        {formatCurrency(Number(pago.monto))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No hay pagos pendientes próximos
                </div>
              )}
            </CardContent>
          </Card>

          {/* Calendario */}
          <PaymentCalendar />
        </div>
      </div>
    </div>
  );
}
