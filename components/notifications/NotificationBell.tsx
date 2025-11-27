'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { combineDateTime, formatDate as formatDateUtil, formatDateTime as formatDateTimeUtil, formatReminderTime } from '@/utils/formatters';

interface Recordatorio {
  id_recordatorio: string;
  id_pago: string;
  fecha_aviso: string;
  hora?: string | null;
  mensaje: string | null;
  notification_id?: string | null;
  pago: {
    id_pago: string;
    titulo: string;
    monto: number;
    fecha_vencimiento: string;
    estado: string;
    categoria: {
      nombre: string;
    };
    metodo_pago: {
      nombre: string;
    };
  };
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cargar recordatorios
  useEffect(() => {
    if (isOpen) {
      fetchRecordatorios();
    }
  }, [isOpen]);

  // DEBUG: log received reminders for debugging time issues
  useEffect(() => {
    if (recordatorios.length > 0) {
      console.debug('[NotificationBell] received recordatorios:', recordatorios);
      recordatorios.forEach(r => {
        try {
          const combined = combineDateTime(r.fecha_aviso, r.hora);
          console.debug('[NotificationBell] computed:', { id: r.id_recordatorio, fecha_aviso: r.fecha_aviso, hora: r.hora, combined: combined.toISOString(), formatted: formatReminderTime(r.fecha_aviso, r.hora) });
        } catch (e) {
          console.error('[NotificationBell] error computing reminder date:', e);
        }
      });
    }
  }, [recordatorios]);

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

  const fetchRecordatorios = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recordatorios');
      const data = await response.json();
      
      if (response.ok) {
        // Filtrar solo recordatorios futuros (considerando hora si existe) y pagos no completados
        const now = new Date();

        const filtered = data.recordatorios
          .filter((r: Recordatorio) => {
            if (r.pago.estado === 'Pagado') return false;
            const reminderDate = combineDateTime(r.fecha_aviso, r.hora);
            return reminderDate >= now;
          })
          .map((r: Recordatorio) => ({
            ...r,
            // attach computed timestamp to help sorting and rendering
            __reminderDate: combineDateTime(r.fecha_aviso, r.hora).getTime(),
          } as any));

        // Ordenar por fecha+hora (más cercano primero)
        filtered.sort((a: any, b: any) => {
          return a.__reminderDate - b.__reminderDate;
        });

        // strip helper field before setting state
        const cleaned = filtered.map((r: any) => {
          const { __reminderDate, ...rest } = r;
          return rest as Recordatorio;
        });

        setRecordatorios(cleaned);
      }
    } catch (error) {
      console.error('Error al cargar recordatorios:', error);
    } finally {
      setLoading(false);
    }
  };

  const notificationCount = recordatorios.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (date: string, hora?: string | null) => {
    return formatDateTimeUtil(date, hora);
  };

  const formatDate = (date: string) => {
    return formatDateUtil(date);
  };

  const getTimeUntilReminder = (fechaAviso: string, hora?: string | null) => {
    const now = new Date();
    const reminderDate = combineDateTime(fechaAviso, hora);

    const diffMs = reminderDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Si ya pasó
    if (diffMs < 0) {
      return { text: 'Vencido', variant: 'destructive' as const };
    }

    // Si es hoy
    if (
      now.getFullYear() === reminderDate.getFullYear() &&
      now.getMonth() === reminderDate.getMonth() &&
      now.getDate() === reminderDate.getDate()
    ) {
      // mostrar como 'Hoy a las HH:MM'
      return {
        text: `Hoy`,
        variant: 'destructive' as const,
      };
    }

    if (diffDays === 1) {
      return { text: 'Mañana', variant: 'default' as const };
    }

    if (diffDays <= 7) {
      return { text: `En ${diffDays} días`, variant: 'secondary' as const };
    }

    return { text: `En ${diffDays} días`, variant: 'outline' as const };
  };

  const deleteRecordatorio = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('¿Eliminar este recordatorio?')) return;

    try {
      const response = await fetch(`/api/recordatorios?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRecordatorios(recordatorios.filter(r => r.id_recordatorio !== id));
      } else {
        alert('Error al eliminar el recordatorio');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el recordatorio');
    }
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
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] px-1 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
            {notificationCount}
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
              {loading ? (
                <div className="p-8 text-center">
                  <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Cargando recordatorios...</p>
                </div>
              ) : recordatorios.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">Sin recordatorios</p>
                  <p className="text-sm">No tienes recordatorios programados</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recordatorios.map((recordatorio) => {
                    const timeInfo = getTimeUntilReminder(recordatorio.fecha_aviso, recordatorio.hora);
                    const isUrgent = timeInfo.variant === 'destructive';

                    return (
                      <div
                        key={recordatorio.id_recordatorio}
                        className={`p-4 hover:bg-muted/50 transition-colors ${
                          isUrgent ? 'bg-red-50 dark:bg-red-950/20 border-l-4 border-l-red-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate">
                              {recordatorio.pago.titulo}
                            </h4>
                            {recordatorio.mensaje && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                "{recordatorio.mensaje}"
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <span>{recordatorio.pago.categoria.nombre}</span>
                              <span>•</span>
                              <span>Vence: {formatDate(recordatorio.pago.fecha_vencimiento)}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={timeInfo.variant}>
                                🔔 {timeInfo.text}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Aviso: {formatDateUtil(recordatorio.fecha_aviso)}, {formatReminderTime(recordatorio.fecha_aviso, recordatorio.hora)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <div className={`font-bold text-base ${
                              isUrgent ? 'text-red-600 dark:text-red-400' : 'text-foreground'
                            }`}>
                              {formatCurrency(recordatorio.pago.monto)}
                            </div>
                            <button
                              onClick={(e) => deleteRecordatorio(recordatorio.id_recordatorio, e)}
                              className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {recordatorios.length > 0 && (
              <div className="p-3 border-t bg-muted/30 text-center">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/protected/calendar';
                  }}
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Ver calendario →
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
