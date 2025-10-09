import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import HeroSection from "@/components/heroSection";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header/Navbar */}
      <header className="fixed w-full bg-background/70 backdrop-blur z-50 border-b border-border">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Cronopay
          </Link>
          <ul className="hidden md:flex space-x-8 font-medium">
            <li><a href="#features" className="text-foreground hover:text-primary transition">Características</a></li>
            <li><a href="#benefits" className="text-foreground hover:text-primary transition">Beneficios</a></li>
            <li><a href="#contact" className="text-foreground hover:text-primary transition">Contacto</a></li>
          </ul>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
      </header>
      <HeroSection />
    </div>
  );
}
