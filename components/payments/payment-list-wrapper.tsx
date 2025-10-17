"use client";

import { Suspense } from "react";
import PaymentListData from "@/components/payments/payment-list-data";
import PaymentListSkeleton from "@/components/payments/payment-list-skeleton";

interface PaymentListWrapperProps {
  title?: string;
}

export default function PaymentListWrapper({ title = "Recordatorios de pagos" }: PaymentListWrapperProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-5 flex-1">
      <h2 className="font-bold text-lg mb-4">{title}</h2>
      <Suspense fallback={<PaymentListSkeleton />}>
        <PaymentListData refreshKey={0} />
      </Suspense>
    </div>
  );
}