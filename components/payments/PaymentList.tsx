"use client";

//import { Badge } from "@/components/ui/badge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { formatDate } from '@/utils/formatters';

type Payment = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "Pendiente" | "Pagado";
};

export function PaymentList({ payments }: { payments: Payment[] }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-5 flex-1">
      <h2 className="font-bold text-lg mb-4">Recordatorios de pagos</h2>
      <ul className="space-y-3">
        {payments.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border-b pb-2 last:border-none"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                Vence: {formatDate(p.dueDate)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">${p.amount.toFixed(2)}</span>
              <PaymentStatusBadge status={p.status} />

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
