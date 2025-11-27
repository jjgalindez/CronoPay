"use client";

import { usePayments } from '@/components/context/PaymentContext';
import { parseDate } from '@/utils/formatters';

export function PaymentCalendar() {
  const { pagos, loading } = usePayments();
  
  // Datos del mes actual (dinámico)
  const currentDate = new Date(); // Fecha actual del sistema
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Obtener el primer día del mes y cuántos días tiene
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // 0 = domingo, 1 = lunes, etc.
  
  // Nombres de los días y mes
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  
  // Procesar pagos del mes actual
  const getPaymentsForCurrentMonth = () => {
    if (!pagos || loading) return [];
    
    return pagos.filter(pago => {
      const pagoDate = parseDate(pago.fecha_vencimiento);
      return pagoDate.getFullYear() === year && pagoDate.getMonth() === month;
    });
  };
  
  // Obtener días con pagos
  const paymentsThisMonth = getPaymentsForCurrentMonth();
  const paymentDaysByDate = paymentsThisMonth.reduce((acc, pago) => {
    const day = parseDate(pago.fecha_vencimiento).getDate();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(pago);
    return acc;
  }, {} as Record<number, typeof pagos>);
  
  const paymentDays = Object.keys(paymentDaysByDate).map(Number);
  const today = currentDate.getDate();
  
  // Generar array de días del calendario
  const calendarDays = [];
  
  // Días vacíos del mes anterior
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow p-5 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Calendario de Pagos</h2>
        {paymentsThisMonth.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {paymentsThisMonth.length} pago(s) este mes
          </span>
        )}
      </div>
      
      {/* Header del mes */}
      <div className="text-center mb-4">
        <h3 className="font-semibold text-base text-foreground">
          {monthNames[month]} {year}
        </h3>
      </div>
      
      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="p-2"></div>;
          }
          
          const isToday = day === today && month === currentDate.getMonth() && year === currentDate.getFullYear();
          const dayPayments = paymentDaysByDate[day] || [];
          const hasPayments = dayPayments.length > 0;
          
          // Contar pagos por estado (el contexto ya asigna 'Vencido' automáticamente)
          const pendingPayments = dayPayments.filter((p) => p.estado === 'Pendiente');
          const vencidoPayments = dayPayments.filter((p) => p.estado === 'Vencido');
          const paidPayments = dayPayments.filter((p) => p.estado === 'Pagado');
          
          // Determinar si es vencido: fecha del día es ANTERIOR a hoy (sin incluir hoy)
          const dayDate = new Date(year, month, day);
          dayDate.setHours(0, 0, 0, 0);
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          const isPastDue = vencidoPayments.length > 0;
          
          let dayStyle = 'hover:bg-gray-100 dark:hover:bg-gray-800';
          
          if (isToday) {
            // Hoy tiene prioridad visual
            dayStyle = 'bg-blue-500 text-white font-bold';
          } else if (hasPayments) {
            if (isPastDue) {
              // Vencidos: rojo intenso
              dayStyle = 'bg-red-500 text-white font-medium';
            } else if (pendingPayments.length > 0) {
              // Pendientes futuros: naranja
              dayStyle = 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium';
            } else {
              // Todos pagados: verde
              dayStyle = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium';
            }
          }
          
          return (
            <div
              key={`day-${index}-${day}`}
              className={`
                p-1 text-center text-sm cursor-pointer rounded transition-colors relative
                ${dayStyle}
              `}
              title={hasPayments ? 
                dayPayments.map((p) => 
                  `${p.titulo} - $${p.monto.toLocaleString()} (${p.estado})`
                ).join('\n') : 
                ''
              }
            >
              <div>{day}</div>
              {hasPayments && (
                <div className="flex justify-center mt-0.5 gap-0.5">
                  {vencidoPayments.length > 0 && (
                    <div className="w-1.5 h-1.5 bg-current rounded-full opacity-90"></div>
                  )}
                  {pendingPayments.length > 0 && (
                    <div className="w-1.5 h-1.5 bg-current rounded-full opacity-70"></div>
                  )}
                  {paidPayments.length > 0 && (
                    <div className="w-1.5 h-1.5 bg-current rounded-full opacity-50"></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Leyenda */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-muted-foreground">Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 rounded"></div>
          <span className="text-muted-foreground">Pagos pendientes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-muted-foreground">Pagos vencidos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 border border-green-300 rounded"></div>
          <span className="text-muted-foreground">Pagos completados</span>
        </div>
        {loading && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
            <span className="text-muted-foreground">Cargando pagos...</span>
          </div>
        )}
      </div>
      
      {/* Resumen del mes */}
      {paymentsThisMonth.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="font-medium text-sm mb-2 text-foreground">Resumen del mes:</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
              <div className="font-medium text-orange-600 dark:text-orange-400 text-base">
                {paymentsThisMonth.filter((p) => p.estado === 'Pendiente').length}
              </div>
              <div className="text-muted-foreground">Pendientes</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
              <div className="font-medium text-red-600 dark:text-red-400 text-base">
                {paymentsThisMonth.filter((p) => p.estado === 'Vencido').length}
              </div>
              <div className="text-muted-foreground">Vencidos</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
              <div className="font-medium text-green-600 dark:text-green-400 text-base">
                {paymentsThisMonth.filter((p) => p.estado === 'Pagado').length}
              </div>
              <div className="text-muted-foreground">Pagados</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
              <div className="font-medium text-foreground text-base">
                ${paymentsThisMonth.reduce((sum, p) => sum + p.monto, 0).toLocaleString('es-CO')}
              </div>
              <div className="text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
