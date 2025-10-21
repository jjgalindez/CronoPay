'use client';

import { usePaymentMetrics } from '@/components/context/PaymentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, Calendar } from 'lucide-react';

export default function UpcomingPaymentsCard() {
  const { upcomingPayments } = usePaymentMetrics();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const getDaysText = (days: number) => {
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Mañana';
    return `${days} días`;
  };

  const getBadgeVariant = (esUrgente: boolean, diasRestantes: number) => {
    if (diasRestantes === 0) return 'destructive';
    if (esUrgente) return 'outline';
    return 'secondary';
  };

  if (upcomingPayments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Próximos Pagos (30 días)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay pagos pendientes en los próximos 30 días</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Próximos Pagos (30 días)
          <Badge variant="outline" className="ml-2">
            {upcomingPayments.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {upcomingPayments.map((payment) => (
            <div
              key={payment.id}
              className={`p-4 rounded-lg border ${
                payment.diasRestantes === 0
                  ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                  : payment.esUrgente
                  ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20'
                  : 'border-border bg-muted/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">
                      {payment.titulo}
                    </h4>
                    {payment.diasRestantes === 0 && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(payment.monto)}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(payment.fecha_vencimiento)}
                      </span>
                      <Badge
                        variant={getBadgeVariant(payment.esUrgente, payment.diasRestantes)}
                        className="text-xs"
                      >
                        {getDaysText(payment.diasRestantes)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground capitalize">
                      {payment.categoria}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {upcomingPayments.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Total próximos pagos:
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrency(
                  upcomingPayments.reduce((sum, payment) => sum + payment.monto, 0)
                )}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-red-600 dark:text-red-400">
                Urgentes (≤7 días):
              </span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {upcomingPayments.filter(p => p.esUrgente).length}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}