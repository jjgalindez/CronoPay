import { ProtectedRoute } from "@/components/auth/protected-route";

export default function PagosPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Gestión de Pagos</h1>
          <p className="text-muted-foreground mt-2">
            Administra todos tus pagos recurrentes desde aquí
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card de resumen */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Total este mes
            </h3>
            <p className="text-3xl font-bold text-primary">$182</p>
            <p className="text-sm text-muted-foreground">4 pagos pendientes</p>
          </div>

          {/* Card de próximos pagos */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Próximo pago
            </h3>
            <p className="text-xl font-bold text-foreground">Netflix</p>
            <p className="text-sm text-muted-foreground">En 2 días - $15</p>
          </div>

          {/* Card de pagos completados */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Pagos completados
            </h3>
            <p className="text-3xl font-bold text-green-600">1</p>
            <p className="text-sm text-muted-foreground">Este mes</p>
          </div>
        </div>

        {/* Lista de pagos */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Todos los pagos
          </h2>
          <div className="bg-card rounded-lg border border-border">
            <div className="p-6">
              <p className="text-muted-foreground text-center">
                Contenido de la gestión de pagos...
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}