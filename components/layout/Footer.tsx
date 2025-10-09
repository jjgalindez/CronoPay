"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* logo + columnas */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Descripción */}
          <div className="md:w-1/3">
            <h3 className="text-2xl font-semibold">CronoPay</h3>
            <p className="mt-3 text-sm text-muted">
              La mejor herramienta para gestionar tus pagos recurrentes
            </p>
          </div>

          {/* Columnas de enlaces */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:w-2/3">
            <div>
              <h4 className="text-sm font-semibold mb-3">Producto</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/features" className="hover:text-foreground transition-colors">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Planes
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-foreground transition-colors">
                    Seguridad
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-foreground transition-colors">
                    Estado del servicio
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-foreground transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* copyright + redes */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">© {year} CronoPay. Todos los derechos reservados.</p>

          <div className="flex items-center gap-4">
            {/* Twitter */}
            <a href="#" aria-label="Twitter" className="p-2 rounded transition-colors text-muted hover:text-foreground inline-flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 5.92c-.63.28-1.31.47-2.02.56a3.5 3.5 0 0 0 1.53-1.93 7.02 7.02 0 0 1-2.22.85 3.48 3.48 0 0 0-5.93 3.17A9.88 9.88 0 0 1 3.15 4.6a3.48 3.48 0 0 0 1.08 4.64c-.52-.02-1.02-.16-1.45-.4v.04a3.48 3.48 0 0 0 2.79 3.41c-.46.12-.95.12-1.43.05a3.49 3.49 0 0 0 3.25 2.42A6.99 6.99 0 0 1 2 18.57a9.86 9.86 0 0 0 5.34 1.56c6.41 0 9.92-5.31 9.92-9.92v-.45A7.08 7.08 0 0 0 22 5.92z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="p-2 rounded transition-colors text-muted hover:text-foreground inline-flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.6h.05c.53-.99 1.82-2 3.75-2 4 0 4.74 2.63 4.74 6.05V21h-4v-5.1c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.31-1.93 2.66V21H9z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="p-2 rounded transition-colors text-muted hover:text-foreground inline-flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm8 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
