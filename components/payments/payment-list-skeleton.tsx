import { DollarSign } from 'lucide-react';

export default function PaymentListSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6">
        <div className="space-y-4">
          {/* Skeleton para múltiples pagos */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-border rounded-lg animate-pulse"
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Icono skeleton */}
                <div className="w-10 h-10 rounded-lg bg-muted"></div>

                {/* Información skeleton */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-5 bg-muted rounded w-16"></div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-3 bg-muted rounded w-20"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
              </div>

              {/* Monto skeleton */}
              <div className="text-right space-y-1">
                <div className="h-5 bg-muted rounded w-16 ml-auto"></div>
                <div className="h-3 bg-muted rounded w-12 ml-auto"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado de carga en el centro */}
        <div className="flex items-center justify-center py-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-muted-foreground">Cargando pagos...</p>
          </div>
        </div>
      </div>
    </div>
  );
}