import { validateServerSession } from "@/lib/auth/server-auth";
import { PaymentList } from "@/components/payments/PaymentList";
import { PaymentCalendar } from "@/components/payments/PaymentCalendar";
import { PaymentSummary } from "@/components/payments/PaymentSummary";

export default async function ProtectedPage() {
  // Validar sesión - redirige automáticamente si no está autenticado
  const user = await validateServerSession();

  const payments = [
    { id: "1", name: "Netflix - Suscripción", amount: 15, dueDate: "2025-11-06", status: "Pendiente" as const },
    { id: "2", name: "Internet Claro", amount: 38, dueDate: "2025-11-08", status: "Pagado" as const},
    { id: "3", name: "Spotify Premium", amount: 9, dueDate: "2025-11-10", status: "Pendiente" as const},
    { id: "4", name: "Energía Ceo", amount: 120, dueDate: "2025-11-15", status: "Pendiente" as const},
  ];

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bienvenido, {user.email}</h1>
        <p className="text-muted-foreground">Gestiona tus pagos de forma eficiente</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista ocupa 2 columnas */}
        <div className="md:col-span-2">
          <PaymentList payments={payments} />
        </div>
        {/* Calendario */}
        <PaymentCalendar />
      </div>

      {/* Resumen */}
      <PaymentSummary total={144} paid={38} upcoming={3} />
    </div>
     
  );
}
