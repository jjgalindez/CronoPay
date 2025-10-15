import { ProtectedRoute } from "@/components/auth/protected-route";
import Navbar from "@/components/layout/navbar";
import PagosClient from "@/components/pagos-client";

export default function PagosPage() {
  return (
    <ProtectedRoute>
      <Navbar variant="app" fixed={false} />
      <PagosClient />
    </ProtectedRoute>
  );
}