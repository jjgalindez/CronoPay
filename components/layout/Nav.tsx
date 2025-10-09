import Link from "next/link";
//import { AuthButton } from "@/components/auth-button";
import { AuthButtonClient } from "@/components/auth-button-client";
import { Bell } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Nav() {
  return (
    <nav className="w-full flex justify-center border-b border-border bg-background text-foreground shadow-sm">
      <div className="w-full max-w-6xl flex items-center justify-between h-16 px-6 text-sm">
        {/* Logo + nombre */}
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-xl p-2">
            <span className="text-primary-foreground font-bold text-lg">C</span>
          </div>
          <span className="font-semibold text-lg">CronoPay</span>
        </div>

        {/* Menú de navegación */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/protected" className="hover:text-primary transition-colors">Inicio</Link>
          <Link href="/features" className="hover:text-primary transition-colors">Funcionalidades</Link>
          <Link href="/payments" className="hover:text-primary transition-colors">Pagos</Link>
          <Link href="/reports" className="hover:text-primary transition-colors">Reportes</Link>
          <Link href="/settings" className="hover:text-primary transition-colors">Configuración</Link>
        </div>

        {/* Usuario */}
        <div className="flex items-center gap-4">
          <button
            className="relative text-foreground hover:text-primary transition-colors"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <ThemeSwitcher />

          <AuthButtonClient />
        </div>
      </div>
    </nav>
  );
}
