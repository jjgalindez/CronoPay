"use client";

export function PaymentCalendar() {
  // Datos del mes actual (octubre 2025)
  const currentDate = new Date(2025, 9, 9); // 9 de octubre de 2025
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
  
  // Días con pagos (ejemplo)
  const paymentDays = [6, 8, 10, 15]; // Días con pagos programados
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
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-5">
      <h2 className="font-bold text-lg mb-4">Calendario</h2>
      
      {/* Header del mes */}
      <div className="text-center mb-4">
        <h3 className="font-semibold text-base">
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
            return <div key={index} className="p-2"></div>;
          }
          
          const isToday = day === today;
          const hasPayment = paymentDays.includes(day);
          
          return (
            <div
              key={day}
              className={`
                p-2 text-center text-sm cursor-pointer rounded transition-colors
                ${isToday 
                  ? 'bg-green-500 text-primary-foreground font-bold' 
                  : hasPayment 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
      
      {/* Leyenda */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-muted-foreground">Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 rounded"></div>
          <span className="text-muted-foreground">Pagos programados</span>
        </div>
      </div>
    </div>
  );
}
