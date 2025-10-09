"use client";

export function PaymentSummary({
  total,
  paid,
  upcoming,
}: {
  total: number;
  paid: number;
  upcoming: number;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-5">
      <h2 className="font-bold text-lg mb-4">Resumen</h2>
      <ul className="space-y-2 text-sm">
        <li>Total a pagar: <span className="font-semibold">${total}</span></li>
        <li>Pagado: <span className="font-semibold">${paid}</span></li>
        <li>Próximos pagos: <span className="font-semibold">{upcoming}</span></li>
      </ul>
    </div>
  );
}
