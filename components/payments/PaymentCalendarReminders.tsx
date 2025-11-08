'use client';

import { usePaymentMetrics } from '@/components/context/PaymentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function PaymentCalendarReminders() {
  const { calendarReminders } = usePaymentMetrics();
  const [currentDate] = useState(new Date());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() === today.getTime();
  };

  const isPastDue = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const isThisWeek = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneWeek = new Date();
    oneWeek.setDate(today.getDate() + 7);
    oneWeek.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    return compareDate >= today && compareDate <= oneWeek;
  };

  const getCardStyle = (date: Date) => {
    if (isPastDue(date)) {
      return 'border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20';
    }
    if (isToday(date)) {
      return 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20';
    }
    if (isThisWeek(date)) {
      return 'border-orange-300 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/20';
    }
    return 'border-border bg-muted/50';
  };

  const getDaysBadge = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const diffTime = compareDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: `Vencido hace ${Math.abs(diffDays)} día${Math.abs(diffDays) !== 1 ? 's' : ''}`, variant: 'destructive' as const };
    if (diffDays === 0) return { text: 'Hoy', variant: 'destructive' as const };
    if (diffDays === 1) return { text: 'Mañana', variant: 'outline' as const };
    if (diffDays <= 7) return { text: `En ${diffDays} días`, variant: 'secondary' as const };
    return { text: `En ${diffDays} días`, variant: 'outline' as const };
  };

  if (calendarReminders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendario de Recordatorios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay recordatorios de pagos pendientes</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group reminders by month for better organization
  const remindersByMonth = calendarReminders.reduce((acc, reminder) => {
    const monthKey = reminder.fecha.toLocaleString('es-CO', { 
      year: 'numeric', 
      month: 'long' 
    });
    
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(reminder);
    
    return acc;
  }, {} as Record<string, typeof calendarReminders>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendario de Recordatorios
          <Badge variant="outline" className="ml-2">
            {calendarReminders.length} días con pagos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {Object.entries(remindersByMonth).map(([month, reminders]) => (
            <div key={month}>
              <h3 className="font-semibold text-foreground mb-3 capitalize">
                {month}
              </h3>
              
              <div className="space-y-3">
                {reminders.map((reminder, index) => {
                  const daysBadge = getDaysBadge(reminder.fecha);
                  
                  return (
                    <div
                      key={`${reminder.fecha.toISOString()}-${index}`}
                      className={`p-4 rounded-lg border ${getCardStyle(reminder.fecha)}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-foreground capitalize">
                            {formatDate(reminder.fecha)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={daysBadge.variant}>
                              {daysBadge.text}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {reminder.pagos.length} pago{reminder.pagos.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-lg font-bold text-foreground">
                            <DollarSign className="h-4 w-4" />
                            {formatCurrency(reminder.totalDia)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {reminder.pagos.map((pago) => (
                          <div
                            key={pago.id}
                            className="flex items-center justify-between p-2 bg-card rounded border border-border"
                          >
                            <div>
                              <p className="font-medium text-sm text-foreground">
                                {pago.titulo}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {pago.categoria}
                              </p>
                            </div>
                            <p className="font-semibold text-sm text-foreground">
                              {formatCurrency(pago.monto)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {calendarReminders.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total recordatorios:</span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(
                    calendarReminders.reduce((sum, reminder) => sum + reminder.totalDia, 0)
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Días con pagos:</span>
                <span className="font-semibold text-foreground">
                  {calendarReminders.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}