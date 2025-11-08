'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { usePayments } from '@/components/context/PaymentContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function NotificationBell() {
  const { pagos } = usePayments();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Obtener pagos desde hoy en adelante (pendientes y vencidos)
  const getUpcomingPayments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return pagos
      .filter((pago) => {
        // Incluir pagos vencidos, de hoy y futuros que no estén pagados
        const pagoDate = new Date(pago.fecha_vencimiento);
        pagoDate.setHours(0, 0, 0, 0);
        return (pago.estado === 'Pendiente' || pago.estado === 'Vencido');
      })
      .sort((a, b) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const aDate = new Date(a.fecha_vencimiento);
        aDate.setHours(0, 0, 0, 0);
        const bDate = new Date(b.fecha_vencimiento);
        bDate.setHours(0, 0, 0, 0);

        // Calcular días desde hoy (negativo si es pasado)
        const aDays = Math.floor((aDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const bDays = Math.floor((bDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // Primero ordenar por cercanía (más cercano primero)
        if (aDays !== bDays) {
          return aDays - bDays;
        }

        // Si tienen la misma fecha, ordenar por monto (más caro primero)
        return b.monto - a.monto;
      });
  };

  const upcomingPayments = getUpcomingPayments();
  const notificationCount = upcomingPayments.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysText = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pagoDate = new Date(date);
    pagoDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((pagoDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      const days = Math.abs(diffDays);
      return { text: `Vencido hace ${days} día${days !== 1 ? 's' : ''}`, variant: 'destructive' as const };
    }
    if (diffDays === 0) return { text: 'Vence hoy', variant: 'destructive' as const };
    if (diffDays === 1) return { text: 'Vence mañana', variant: 'default' as const };
    if (diffDays <= 7) return { text: `Vence en ${diffDays} días`, variant: 'secondary' as const };
    return { text: `Vence en ${diffDays} días`, variant: 'outline' as const };
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-1"
        aria-label={`Notificaciones (${notificationCount})`}
      >
        <Bell className="w-5 h-5" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
            {notificationCount > 99 ? '99+' : notificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 max-h-[600px] overflow-hidden shadow-lg z-50">
          <Card className="border-2">
            <div className="p-4 border-b bg-muted/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Notificaciones de Pagos</h3>
                <Badge variant="secondary">{notificationCount}</Badge>
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {upcomingPayments.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">¡Todo al día!</p>
                  <p className="text-sm">No tienes pagos pendientes</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {upcomingPayments.map((pago) => {
                    const daysInfo = getDaysText(pago.fecha_vencimiento);
                    const isUrgent = daysInfo.variant === 'destructive';

                    return (
                      <div
                        key={pago.id}
                        className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                          isUrgent ? 'bg-red-50 dark:bg-red-950/20 border-l-4 border-l-red-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate">
                              {pago.titulo}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {pago.categoria} • {formatDate(pago.fecha_vencimiento)}
                            </p>
                            <Badge variant={daysInfo.variant} className="mt-2">
                              {daysInfo.text}
                            </Badge>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`font-bold text-base ${
                              isUrgent ? 'text-red-600 dark:text-red-400' : 'text-foreground'
                            }`}>
                              {formatCurrency(pago.monto)}
                            </div>
                            <Badge 
                              variant="outline" 
                              className="mt-1 text-[10px]"
                            >
                              {pago.metodo_pago}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {upcomingPayments.length > 0 && (
              <div className="p-3 border-t bg-muted/30 text-center">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/protected/payments';
                  }}
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Ver todos los pagos →
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
