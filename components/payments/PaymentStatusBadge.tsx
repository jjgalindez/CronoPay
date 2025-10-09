import { Badge } from "@/components/ui/badge";

export function PaymentStatusBadge({ status }: { status: "Pendiente" | "Pagado" }) {
  const variant = status === "Pagado" ? "default" : "destructive";
  return <Badge variant={variant}>{status}</Badge>;
}

