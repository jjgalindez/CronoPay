import { Card } from "../ui/card";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-4 text-foreground">
          Funcionalidades principales
        </h3>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Todo lo que necesitas para gestionar tus pagos recurrentes
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Registro de pagos */}
          <div className="bg-muted rounded-2xl p-8 shadow-sm flex flex-col items-start">
            <div className="mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="3" fill="#3B82F6"/><rect x="7" y="13" width="10" height="2" rx="1" fill="#fff"/><rect x="7" y="9" width="6" height="2" rx="1" fill="#fff"/></svg>
              </span>
            </div>
            <h4 className="font-semibold text-xl mb-2 text-foreground">Registro de pagos</h4>
            <p className="text-muted-foreground">
              Registra montos, fechas, categorías y métodos de pago de forma simple
            </p>
          </div>
          {/* <Card  /> Reutilizar */}
          {/* Recordatorios */}
          <div className="bg-muted rounded-2xl p-8 shadow-sm flex flex-col items-start">
            <div className="mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="6" fill="#22C55E"/><path d="M12 10v2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
              </span>
            </div>
            <h4 className="font-semibold text-xl mb-2 text-foreground">Recordatorios</h4>
            <p className="text-muted-foreground">
              Recibe alertas automáticas antes del vencimiento de cada pago
            </p>
          </div>
          {/* Panel de estadísticas */}
          <div className="bg-muted rounded-2xl p-8 shadow-sm flex flex-col items-start">
            <div className="mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="4" height="8" rx="2" fill="#A78BFA"/><rect x="10" y="6" width="4" height="12" rx="2" fill="#A78BFA"/><rect x="16" y="13" width="4" height="5" rx="2" fill="#A78BFA"/><rect x="4" y="10" width="4" height="8" rx="2" fill="#fff" fillOpacity=".5"/><rect x="10" y="6" width="4" height="12" rx="2" fill="#fff" fillOpacity=".5"/><rect x="16" y="13" width="4" height="5" rx="2" fill="#fff" fillOpacity=".5"/></svg>
              </span>
            </div>
            <h4 className="font-semibold text-xl mb-2 text-foreground">Panel de estadísticas</h4>
            <p className="text-muted-foreground">
              Visualiza historial y próximos pagos con gráficos claros
            </p>
          </div>
          {/* Vista de calendario */}
          <div className="bg-muted rounded-2xl p-8 shadow-sm flex flex-col items-start">
            <div className="mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="14" rx="4" fill="#F59E42"/><rect x="7" y="10" width="2" height="2" rx="1" fill="#fff"/><rect x="11" y="10" width="2" height="2" rx="1" fill="#fff"/><rect x="15" y="10" width="2" height="2" rx="1" fill="#fff"/></svg>
              </span>
            </div>
            <h4 className="font-semibold text-xl mb-2 text-foreground">Vista de calendario</h4>
            <p className="text-muted-foreground">
              Organiza pagos en calendario y genera reportes mensuales
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
