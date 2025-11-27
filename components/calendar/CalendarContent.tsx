"use client";

import { useState, useMemo } from "react";
import { usePayments, Pago } from "@/components/context/PaymentContext";
import { parseDate } from "@/utils/formatters";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { SelectedDayPayments } from "@/components/calendar/SelectedDayPayments";
import { MonthSummaryCard } from "@/components/calendar/MonthSummaryCard";
import { UpcomingPaymentsList } from "@/components/calendar/UpcomingPaymentsList";
import { ReminderModal } from "@/components/calendar/ReminderModal";

export function CalendarContent() {
  const { pagos, loading } = usePayments();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reminderPago, setReminderPago] = useState<Pago | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Filtrar pagos del mes actual
  const monthlyPayments = useMemo(() => {
    return pagos.filter((pago) => {
      const pagoDate = parseDate(pago.fecha_vencimiento);
      return pagoDate.getFullYear() === year && pagoDate.getMonth() === month;
    }).sort((a, b) => 
      parseDate(a.fecha_vencimiento).getTime() - parseDate(b.fecha_vencimiento).getTime()
    );
  }, [pagos, year, month]);

  // Agrupar pagos por día
  const paymentsByDay = useMemo(() => {
    const map = new Map<number, typeof pagos>();
    monthlyPayments.forEach((pago) => {
      const day = parseDate(pago.fecha_vencimiento).getDate();
      if (!map.has(day)) {
        map.set(day, []);
      }
      map.get(day)!.push(pago);
    });
    return map;
  }, [monthlyPayments]);

  // Pagos del día seleccionado
  const selectedDayPayments = useMemo(() => {
    if (!selectedDate) return [];
    const day = selectedDate.getDate();
    return paymentsByDay.get(day) || [];
  }, [selectedDate, paymentsByDay]);

  // Resumen del mes
  const monthSummary = useMemo(() => {
    const total = monthlyPayments.length;
    const completados = monthlyPayments.filter((p) => p.estado === "Pagado").length;
    const pendientes = monthlyPayments.filter((p) => p.estado === "Pendiente").length;
    const vencidos = monthlyPayments.filter((p) => p.estado === "Vencido").length;
    const totalMonto = monthlyPayments.reduce((sum, p) => sum + p.monto, 0);

    return { total, completados, pendientes, vencidos, totalMonto };
  }, [monthlyPayments]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const handleCreateReminder = (pago: Pago) => {
    setReminderPago(pago);
  };

  const handleReminderSuccess = () => {
    alert("Recordatorio creado exitosamente");
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario - 2 columnas */}
        <div className="lg:col-span-2">
          <CalendarGrid
            year={year}
            month={month}
            paymentsByDay={paymentsByDay}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          
          <SelectedDayPayments
            selectedDate={selectedDate}
            payments={selectedDayPayments}
            monthName={monthNames[month]}
            onCreateReminder={handleCreateReminder}
          />
        </div>

        {/* Sidebar - 1 columna */}
        <div className="lg:col-span-1 space-y-6">
          <MonthSummaryCard
            monthName={monthNames[month]}
            summary={monthSummary}
          />

          <UpcomingPaymentsList
            payments={monthlyPayments}
            onSelectPayment={setSelectedDate}
          />
        </div>
      </div>

      <ReminderModal
        pago={reminderPago}
        onClose={() => setReminderPago(null)}
        onSuccess={handleReminderSuccess}
      />
    </div>
  );
}
