'use client'

import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto - lado izquierdo */}
          <div className="text-center lg:text-left">
            <h2 className="text-6xl font-bold text-white mb-6">
              Organiza y controla tus pagos recurrentes <span className="text-green-500">fácilmente</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cronopay simplifica la administración de tus transacciones con un diseño moderno, seguro y fácil de usar.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link
                href="/auth/sign-up"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Comenzar ahora
              </Link>
              <a
                href="#features"
                className="border border-green-500 text-green-500 hover:bg-green-500/30 dark:hover:bg-green-500/10 font-semibold px-6 py-3 rounded-lg transition"
              >
                Ver más
              </a>
            </div>
          </div>

          {/* Imagen - lado derecho */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-2xl shadow-xl bg-muted overflow-hidden">
              <img
                src="https://multipurposethemes.com/wp-content/uploads/2025/01/Power-BI-Bootstrap-Admin-Templates.jpg"
                alt="Cronopay Dashboard Preview"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
