"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pago } from "@/components/context/PaymentContext";

interface CalendarGridProps {
  year: number;
  month: number;
  paymentsByDay: Map<number, Pago[]>;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({
  year,
  month,
  paymentsByDay,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const calendarDays = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getDayStatus = (day: number) => {
    const payments = paymentsByDay.get(day) || [];
    if (payments.length === 0) return null;

    const hasVencido = payments.some((p) => p.estado === "Vencido");
    const hasPendiente = payments.some((p) => p.estado === "Pendiente");
    const allPagado = payments.every((p) => p.estado === "Pagado");

    if (hasVencido) return "vencido";
    if (hasPendiente) return "pendiente";
    if (allPagado) return "pagado";
    return null;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelectedDay = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  return (
    <Card>
      <CardHeader>
        {/* Mini leyenda */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">Pagado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-muted-foreground">Próximo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-muted-foreground">Vencido</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const status = getDayStatus(day);
            const dayPayments = paymentsByDay.get(day) || [];
            const today = isToday(day);
            const selected = isSelectedDay(day);

            let bgColor = "bg-background hover:bg-muted";
            let borderColor = "border-border";

            if (today) {
              borderColor = "border-blue-500 border-2";
            }

            if (selected) {
              bgColor = "bg-primary/10";
              borderColor = "border-primary border-2";
            }

            if (status === "vencido") {
              bgColor = "bg-red-100 dark:bg-red-950/30 hover:bg-red-200 dark:hover:bg-red-950/50";
            } else if (status === "pendiente") {
              bgColor = "bg-orange-100 dark:bg-orange-950/30 hover:bg-orange-200 dark:hover:bg-orange-950/50";
            } else if (status === "pagado") {
              bgColor = "bg-green-100 dark:bg-green-950/30 hover:bg-green-200 dark:hover:bg-green-950/50";
            }

            return (
              <button
                key={`day-${day}`}
                onClick={() => onSelectDate(new Date(year, month, day))}
                className={`aspect-square rounded-lg border ${borderColor} ${bgColor} transition-all flex flex-col items-center justify-center p-1 relative group`}
              >
                <span className="text-sm font-medium">{day}</span>
                {dayPayments.length > 0 && (
                  <>
                    <div className="flex gap-0.5 mt-1">
                      {dayPayments.slice(0, 3).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-current opacity-60"
                        />
                      ))}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold flex items-center justify-center">
                      {dayPayments.length}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
