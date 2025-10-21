import { Badge } from "@/components/ui/badge";

export function PaymentStatusBadge({ status }: { status: "Pendiente" | "Pagado" | "Vencido" }) {
  const getVariant = () => {
    switch (status) {
      case "Pagado":
        return "default";
      case "Vencido":
        return "destructive";
      case "Pendiente":
      default:
        return "secondary";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "Pagado":
        return "Pagado";
      case "Vencido":
        return "Vencido";
      case "Pendiente":
      default:
        return "Pendiente";
    }
  };

  return <Badge variant={getVariant()}>{getLabel()}</Badge>;
}

