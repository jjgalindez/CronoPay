"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppNavLinks() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/protected') {
      return pathname === '/protected';
    }
    return pathname?.startsWith(path);
  };

  const getLinkClass = (path: string) => {
    return isActive(path)
      ? "text-primary font-semibold border-b-2 border-primary pb-1"
      : "text-foreground hover:text-primary transition";
  };

  return (
    <ul className="hidden md:flex space-x-8 font-medium">
      <li>
        <Link href="/protected" className={getLinkClass('/protected')}>
          Inicio
        </Link>
      </li>
      <li>
        <Link href="/protected/calendar" className={getLinkClass('/protected/calendar')}>
          Calendario
        </Link>
      </li>
      <li>
        <Link href="/protected/payments" className={getLinkClass('/protected/payments')}>
          Pagos
        </Link>
      </li>
      <li>
        <Link href="/protected/reports" className={getLinkClass('/protected/reports')}>
          Reportes
        </Link>
      </li>
    </ul>
  );
}
