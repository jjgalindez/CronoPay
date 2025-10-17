"use client";

import { useEffect, useState } from 'react';
import { Calendar, CreditCard, Tag, DollarSign } from 'lucide-react';
import { PaymentStatusBadge } from './PaymentStatusBadge';

interface Pago {
  id_pago: string;
  titulo: string;
  monto: string;
  fecha_vencimiento: string;
  estado: string;
  created_at: string;
  categoria: {
    id_categoria: string;
    nombre: string;
  } | null;
  metodo_pago: {
    id_metodo: string;
    tipo: string;
  } | null;
}

interface PaymentListDataProps {
  refreshKey: number;
}

export default function PaymentListData({ refreshKey }: PaymentListDataProps) {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/pagos');
        
        if (!response.ok) {
          throw new Error('Error al cargar los pagos');
        }

        const data = await response.json();
        setPagos(data.pagos || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPagos();
  }, [refreshKey]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Cargando pagos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-2">Error al cargar los pagos</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (pagos.length === 0) {
    return (
      <div className="text-center py-8">
        <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground mb-2">No tienes pagos registrados</p>
        <p className="text-sm text-muted-foreground">
          Haz clic en "Agregar Pago" para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {pagos.map((pago) => (
        <div
          key={pago.id_pago}
          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-start gap-4">
            {/* Icono basado en categoría */}
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {pago.categoria?.nombre === 'Entretenimiento' && <span className="text-primary">🎬</span>}
              {pago.categoria?.nombre === 'Servicios' && <span className="text-primary">⚡</span>}
              {pago.categoria?.nombre === 'Suscripciones' && <span className="text-primary">📱</span>}
              {pago.categoria?.nombre === 'Facturas' && <span className="text-primary">📄</span>}
              {!pago.categoria && <DollarSign className="h-5 w-5 text-primary" />}
            </div>

            {/* Información del pago */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">
                  {pago.titulo}
                </h4>
                <PaymentStatusBadge status={pago.estado as "Pendiente" | "Pagado"} />
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>{pago.categoria?.nombre || 'Sin categoría'}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Vence: {new Date(pago.fecha_vencimiento).toLocaleDateString('es-ES')}
                  </span>
                </div>
                
                {pago.metodo_pago && (
                  <div className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    <span>{pago.metodo_pago.tipo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Monto */}
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">
              ${parseFloat(pago.monto).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(pago.created_at).toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}