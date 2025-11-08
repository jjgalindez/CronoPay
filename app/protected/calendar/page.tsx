"use client";

import { useState, useMemo } from "react";
import { usePayments } from "@/components/context/PaymentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  DollarSign,
} from "lucide-react";
import AddPaymentModal from "@/components/payments/add-payment-modal";

export default function CalendarPage() {
  const { pagos, loading } = usePayments();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Nombres de meses y días
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Obtener primer día y días del mes
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  // Filtrar pagos del mes actual
  const monthlyPayments = useMemo(() => {
    return pagos.filter((pago) => {
      const pagoDate = new Date(pago.fecha_vencimiento);
      return (
        pagoDate.getFullYear() === year &&
        pagoDate.getMonth() === month
      );
    }).sort((a, b) => 
      new Date(a.fecha_vencimiento).getTime() - new Date(b.fecha_vencimiento).getTime()
    );
  }, [pagos, year, month]);

  // Agrupar pagos por día
  const paymentsByDay = useMemo(() => {
    const map = new Map<number, typeof pagos>();
    monthlyPayments.forEach((pago) => {
      const day = new Date(pago.fecha_vencimiento).getDate();
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

  // Generar días del calendario
  const calendarDays = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
    });
  };

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

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
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
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Calendario de Pagos
          </h1>
          <p className="text-muted-foreground mt-2">
            Consulta y organiza tus pagos recurrentes según su fecha de vencimiento.
          </p>
        </div>

        <AddPaymentModal />
      </div>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario - 2 columnas */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              {/* Navegación del mes */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousMonth}
                  className="gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="text-center">
                  <h2 className="text-xl font-bold">
                    {monthNames[month]} {year}
                  </h2>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextMonth}
                  className="gap-1"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Filtros de categoría - mini leyenda */}
              <div className="flex flex-wrap items-center gap-3 pt-4 text-xs">
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
                  let textColor = "text-foreground";

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
                      onClick={() => {
                        const newDate = new Date(year, month, day);
                        setSelectedDate(newDate);
                      }}
                      className={`aspect-square rounded-lg border ${borderColor} ${bgColor} ${textColor} transition-all flex flex-col items-center justify-center p-1 relative group`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      {dayPayments.length > 0 && (
                        <div className="flex gap-0.5 mt-1">
                          {dayPayments.slice(0, 3).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-1 rounded-full bg-current opacity-60"
                            />
                          ))}
                        </div>
                      )}
                      {dayPayments.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold flex items-center justify-center">
                          {dayPayments.length}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Pagos del día seleccionado */}
              {selectedDate && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg mb-4">
                    Pagos del {selectedDate.getDate()} de {monthNames[month]}
                  </h3>
                  {selectedDayPayments.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">
                      No hay pagos programados para este día
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {selectedDayPayments.map((pago) => (
                        <div
                          key={pago.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{pago.titulo}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {pago.categoria}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 ml-3">
                            <span className="font-bold text-sm">
                              {formatCurrency(pago.monto)}
                            </span>
                            <Badge
                              variant={
                                pago.estado === "Pagado"
                                  ? "default"
                                  : pago.estado === "Vencido"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className={
                                pago.estado === "Pagado"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : pago.estado === "Vencido"
                                  ? ""
                                  : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                              }
                            >
                              {pago.estado}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 columna */}
        <div className="lg:col-span-1 space-y-6">
          {/* Resumen del mes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Resumen de {monthNames[month]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total pagos</span>
                <span className="font-bold">{monthSummary.total}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Completados</span>
                <span className="font-bold text-green-600">
                  {monthSummary.completados}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Pendientes</span>
                <span className="font-bold text-orange-600">
                  {monthSummary.pendientes}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Vencidos</span>
                <span className="font-bold text-red-600">
                  {monthSummary.vencidos}
                </span>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monto total</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(monthSummary.totalMonto)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos pagos del mes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Próximos Pagos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyPayments.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No hay pagos este mes
                </p>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {monthlyPayments.map((pago) => (
                    <div
                      key={pago.id}
                      className="p-2 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer"
                      onClick={() => {
                        const pagoDate = new Date(pago.fecha_vencimiento);
                        setSelectedDate(pagoDate);
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">
                            {pago.titulo}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(pago.fecha_vencimiento)}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-bold">
                            {formatCurrency(pago.monto)}
                          </div>
                          <Badge
                            variant="outline"
                            className={`mt-1 text-[10px] ${
                              pago.estado === "Pagado"
                                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400"
                                : pago.estado === "Vencido"
                                ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400"
                                : "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400"
                            }`}
                          >
                            {pago.estado}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
