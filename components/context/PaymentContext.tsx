'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interfaces
export interface Pago {
  id: number;
  titulo: string;
  monto: number;
  fecha_vencimiento: Date;
  categoria: string;
  metodo_pago: string;
  estado: 'Pendiente' | 'Pagado' | 'Vencido';
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface PaymentMetrics {
  totalMes: number;
  totalPendiente: number;
  totalPagado: number;
  cantidadPagos: number;
  promedioMonto: number;
  categoriaConMasGastos: string;
  metodoMasUtilizado: string;
}

export interface UpcomingPayment {
  id: number;
  titulo: string;
  monto: number;
  fecha_vencimiento: Date;
  categoria: string;
  diasRestantes: number;
  esUrgente: boolean;
}

export interface CalendarReminder {
  fecha: Date;
  pagos: {
    id: number;
    titulo: string;
    monto: number;
    categoria: string;
  }[];
  totalDia: number;
}

// Context Interface
interface PaymentContextType {
  // Data
  pagos: Pago[];
  loading: boolean;
  error: string | null;
  
  // Metrics
  metrics: PaymentMetrics;
  upcomingPayments: UpcomingPayment[];
  calendarReminders: CalendarReminder[];
  
  // Actions
  addPayment: (payment: Omit<Pago, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePayment: (id: number, payment: Partial<Pago>) => Promise<void>;
  deletePayment: (id: number) => Promise<void>;
  markAsPaid: (id: number) => Promise<void>;
  refreshPayments: () => Promise<void>;
  
  // Filters
  filterByCategory: (category: string) => Pago[];
  filterByStatus: (status: 'Pendiente' | 'Pagado' | 'Vencido') => Pago[];
  filterByDateRange: (startDate: Date, endDate: Date) => Pago[];
}

// Create Context
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Provider Component
export function PaymentProvider({ children }: { children: ReactNode }) {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/pagos');
      if (!response.ok) {
        throw new Error('Error al cargar los pagos');
      }
      
      const data = await response.json();
      
      // Convert date strings to Date objects and update status
      const processedPayments = (data.pagos || []).map((pago: any) => ({
        id: parseInt(pago.id_pago),
        titulo: pago.titulo,
        monto: parseFloat(pago.monto),
        fecha_vencimiento: new Date(pago.fecha_vencimiento),
        categoria: pago.categoria?.nombre || 'Sin categoría',
        metodo_pago: pago.metodo_pago?.tipo || 'Sin método',
        estado: determinePaymentStatus(new Date(pago.fecha_vencimiento), pago.estado),
        user_id: pago.id_usuario,
        created_at: new Date(pago.created_at),
        updated_at: new Date(pago.updated_at)
      }));
      
      setPagos(processedPayments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Determine payment status based on due date
  const determinePaymentStatus = (dueDate: Date, currentStatus?: string): 'Pendiente' | 'Pagado' | 'Vencido' => {
    // If already paid, keep that status
    if (currentStatus === 'Pagado') return 'Pagado';

    // If the due date is in the past, mark as 'Vencido'
    if (dueDate < new Date()) return 'Vencido';

    // Since the database only allows 'Pendiente' and 'Pagado', we always return 'Pendiente' for unpaid items
    return 'Pendiente';
  };

  // Calculate metrics
  const calculateMetrics = (): PaymentMetrics => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const pagosMesActual = pagos.filter(pago => {
      const pagoDate = pago.fecha_vencimiento;
      return pagoDate.getMonth() === currentMonth && pagoDate.getFullYear() === currentYear;
    });

    const totalMes = pagosMesActual.reduce((sum, pago) => sum + pago.monto, 0);
    const totalPendiente = pagos.filter(p => p.estado === 'Pendiente').reduce((sum, pago) => sum + pago.monto, 0);
    const totalPagado = pagos.filter(p => p.estado === 'Pagado').reduce((sum, pago) => sum + pago.monto, 0);
    const cantidadPagos = pagos.length;
    const promedioMonto = cantidadPagos > 0 ? totalMes / pagosMesActual.length : 0;

    // Most used category
    const categoriaCount = pagos.reduce((acc, pago) => {
      acc[pago.categoria] = (acc[pago.categoria] || 0) + pago.monto;
      return acc;
    }, {} as Record<string, number>);
    
    const categoriaConMasGastos = Object.entries(categoriaCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

    // Most used payment method
    const metodoCount = pagos.reduce((acc, pago) => {
      acc[pago.metodo_pago] = (acc[pago.metodo_pago] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const metodoMasUtilizado = Object.entries(metodoCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

    return {
      totalMes,
      totalPendiente,
      totalPagado,
      cantidadPagos,
      promedioMonto,
      categoriaConMasGastos,
      metodoMasUtilizado
    };
  };

  // Calculate upcoming payments
  const calculateUpcomingPayments = (): UpcomingPayment[] => {
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    return pagos
      .filter(pago => 
        pago.estado === 'Pendiente' && 
        pago.fecha_vencimiento >= today && 
        pago.fecha_vencimiento <= next30Days
      )
      .map(pago => {
        const diasRestantes = Math.ceil(
          (pago.fecha_vencimiento.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        return {
          id: pago.id,
          titulo: pago.titulo,
          monto: pago.monto,
          fecha_vencimiento: pago.fecha_vencimiento,
          categoria: pago.categoria,
          diasRestantes,
          esUrgente: diasRestantes <= 7
        };
      })
      .sort((a, b) => a.diasRestantes - b.diasRestantes);
  };

  // Calculate calendar reminders
  const calculateCalendarReminders = (): CalendarReminder[] => {
    const reminderMap = new Map<string, CalendarReminder>();

    pagos
      .filter(pago => pago.estado === 'Pendiente')
      .forEach(pago => {
        const dateKey = pago.fecha_vencimiento.toDateString();
        
        if (!reminderMap.has(dateKey)) {
          reminderMap.set(dateKey, {
            fecha: pago.fecha_vencimiento,
            pagos: [],
            totalDia: 0
          });
        }

        const reminder = reminderMap.get(dateKey)!;
        reminder.pagos.push({
          id: pago.id,
          titulo: pago.titulo,
          monto: pago.monto,
          categoria: pago.categoria
        });
        reminder.totalDia += pago.monto;
      });

    return Array.from(reminderMap.values())
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  };

  // Actions
  const addPayment = async (payment: Omit<Pago, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      });

      if (!response.ok) {
        throw new Error('Error al crear el pago');
      }

      await refreshPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el pago');
      throw err;
    }
  };

  const updatePayment = async (id: number, payment: Partial<Pago>) => {
    try {
      const response = await fetch(`/api/pagos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error al actualizar el pago (${response.status})`);
      }

      await refreshPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el pago');
      throw err;
    }
  };

  const deletePayment = async (id: number) => {
    try {
      const response = await fetch(`/api/pagos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error al eliminar el pago (${response.status})`);
      }

      await refreshPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el pago');
      throw err;
    }
  };

  const markAsPaid = async (id: number) => {
    try {
      const response = await fetch(`/api/pagos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: 'Pagado' }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error al marcar como pagado (${response.status})`);
      }

      await refreshPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al marcar como pagado');
      throw err;
    }
  };

  const refreshPayments = async () => {
    await fetchPayments();
  };

  // Filters
  const filterByCategory = (category: string): Pago[] => {
    return pagos.filter(pago => pago.categoria === category);
  };

  const filterByStatus = (status: 'Pendiente' | 'Pagado' | 'Vencido'): Pago[] => {
    return pagos.filter(pago => pago.estado === status);
  };

  const filterByDateRange = (startDate: Date, endDate: Date): Pago[] => {
    return pagos.filter(pago => {
      const pagoDate = pago.fecha_vencimiento;
      return pagoDate >= startDate && pagoDate <= endDate;
    });
  };

  // Load payments on mount
  useEffect(() => {
    fetchPayments();
  }, []);

  // Calculate derived data
  const metrics = calculateMetrics();
  const upcomingPayments = calculateUpcomingPayments();
  const calendarReminders = calculateCalendarReminders();

  const value: PaymentContextType = {
    // Data
    pagos,
    loading,
    error,
    
    // Metrics
    metrics,
    upcomingPayments,
    calendarReminders,
    
    // Actions
    addPayment,
    updatePayment,
    deletePayment,
    markAsPaid,
    refreshPayments,
    
    // Filters
    filterByCategory,
    filterByStatus,
    filterByDateRange,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

// Custom hooks
export function usePayments() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayments must be used within a PaymentProvider');
  }
  return context;
}

export function usePaymentMetrics() {
  const { metrics, upcomingPayments, calendarReminders } = usePayments();
  return { metrics, upcomingPayments, calendarReminders };
}