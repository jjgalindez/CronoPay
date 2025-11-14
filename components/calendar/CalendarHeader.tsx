"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AddPaymentModal from "@/components/payments/add-payment-modal";

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Calendario de Pagos
        </h1>
        <p className="text-muted-foreground mt-2">
          Consulta y organiza tus pagos recurrentes según su fecha de vencimiento.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousMonth}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>
        
        <div className="text-center min-w-[150px]">
          <h2 className="text-lg font-bold">
            {monthNames[month]} {year}
          </h2>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onNextMonth}
          className="gap-1"
        >
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </Button>

        <AddPaymentModal />
      </div>
    </div>
  );
}
