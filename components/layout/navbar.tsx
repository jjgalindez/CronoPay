import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface NavbarProps {
  variant?: 'landing' | 'app' | 'minimal';
  fixed?: boolean;
}

export default function Navbar({ variant = 'landing', fixed = true }: NavbarProps) {
  const isLanding = variant === 'landing';
  const isApp = variant === 'app';
  const isMinimal = variant === 'minimal';
  const positionClass = fixed ? 'fixed' : 'relative';

  return (
    <header className={`${positionClass} w-full bg-background/70 backdrop-blur z-50 border-b border-border`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/assets/CronoPayLogo.svg" 
            alt="Cronopay Logo" 
            width={48} 
            height={48}
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <span className="text-2xl font-bold text-blue-500">
            𝙲𝚛𝚘𝚗𝚘𝙿𝚊𝚢
          </span>
        </Link>

        {isLanding ? (
          // Navegación para Landing Page
          <ul className="hidden md:flex space-x-8 font-medium">
            <li><a href="#features" className="text-foreground hover:text-primary transition">Características</a></li>
            <li><a href="#benefits" className="text-foreground hover:text-primary transition">Beneficios</a></li>
            <li><a href="#contact" className="text-foreground hover:text-primary transition">Contacto</a></li>
          </ul>
        ) : isApp ? (
          // Navegación para App
          <ul className="hidden md:flex space-x-8 font-medium">
            <li>
              <Link href="/protected" className="text-foreground hover:text-primary transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/protected/calendar" className="text-foreground hover:text-primary transition">
                Calendario
              </Link>
            </li>
            <li>
              <Link href="/protected/payments" className="text-foreground hover:text-primary transition">
                Pagos
              </Link>
            </li>
            <li>
              <Link href="/protected/reports" className="text-foreground hover:text-primary transition">
                Reportes
              </Link>
            </li>
          </ul>
        ) : (
          // Variante minimal - sin navegación
          <div></div>
        )}

        <div className="flex items-center gap-3">
          {isApp && <NotificationBell />}
          <ThemeSwitcher />
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
      </nav>
    </header>
  )
}
