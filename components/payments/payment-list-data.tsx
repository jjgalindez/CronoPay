"use client";

import { Calendar, CreditCard, Tag, DollarSign, MoreHorizontal, CheckCircle, Trash2 } from 'lucide-react';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { usePayments } from '@/components/context/PaymentContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PaymentListDataProps {
  refreshKey?: number;
}

export default function PaymentListData({ refreshKey }: PaymentListDataProps) {
  const { pagos, loading, error, markAsPaid, deletePayment } = usePayments();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const getCategoryIcon = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case 'entretenimiento':
        return '🎬';
      case 'servicios':
        return '⚡';
      case 'suscripciones':
        return '📱';
      case 'facturas':
        return '📄';
      case 'alimentación':
        return '🍽️';
      case 'transporte':
        return '🚗';
      case 'salud':
        return '🏥';
      default:
        return '💰';
    }
  };

  const handleMarkAsPaid = async (id: number) => {
    try {
      await markAsPaid(id);
    } catch (error) {
      console.error('Error al marcar como pagado:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este pago?')) {
      try {
        await deletePayment(id);
      } catch (error) {
        console.error('Error al eliminar el pago:', error);
      }
    }
  };

  if (loading) {
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
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              </div>
              <div className="h-6 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        <p>Error al cargar los pagos: {error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  if (pagos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No hay pagos registrados
        </h3>
        <p className="text-sm text-muted-foreground">
          Comienza agregando tu primer pago usando el formulario de arriba.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pagos.map((pago) => (
        <div
          key={pago.id}
          className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              {/* Título y estado */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(pago.categoria)}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">
                    {pago.titulo}
                  </h3>
                  <div className="mt-1">
                    <PaymentStatusBadge status={pago.estado} />
                  </div>
                </div>
              </div>

              {/* Detalles */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span className="capitalize">{pago.categoria}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(pago.fecha_vencimiento)}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="capitalize">{pago.metodo_pago}</span>
                </div>
              </div>
            </div>

            {/* Monto y acciones */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(pago.monto)}
                </div>
              </div>
              
              {/* Menú de acciones */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {pago.estado === 'Pendiente' && (
                    <DropdownMenuItem 
                      onClick={() => handleMarkAsPaid(pago.id)}
                      className="text-green-600"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Marcar como pagado
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={() => handleDelete(pago.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}