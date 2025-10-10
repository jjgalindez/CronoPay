'use client'

import Link from "next/link"
import { Fragment } from "react"

// import { useState } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// const navigation = [
//   { name: 'Product', href: '#' },
//   { name: 'Features', href: '#' },
//   { name: 'Marketplace', href: '#' },
//   { name: 'Company', href: '#' },
// ]

export default function HeroSection() {
  //const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header> */}
      <div className="bg-background text-foreground">
      <main>
        <section className="pt-32 pb-20 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido de texto - lado izquierdo */}
              <div className="text-center lg:text-left">
                <h2 className="text-5xl font-extrabold text-foreground mb-6">
                  Gestiona tus pagos con facilidad
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Cronopay simplifica la administración de tus transacciones con un diseño moderno, seguro y fácil de usar.
                </p>
                <div className="flex justify-center lg:justify-start gap-4">
                  <Link
                    href="/auth/sign-up"
                    className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-900 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Comenzar ahora
                  </Link>
                  <a
                    href="#features"
                    className="border border-blue-500 text-blue-500 hover:bg-blue-500/30 dark:hover:bg-blue-500/10 font-semibold px-6 py-3 rounded-lg transition"
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


        <section id="features" className="py-20 bg-card">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-center mb-14 text-foreground">
              Características principales
            </h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="p-6 rounded-2xl bg-muted hover:bg-muted/80 transition shadow-sm">
                <div className="text-primary text-4xl mb-4">💳</div>
                <h4 className="font-semibold text-xl mb-2 text-foreground">Pagos inteligentes</h4>
                <p className="text-muted-foreground">
                  Procesa y organiza tus pagos con algoritmos que optimizan tiempo y seguridad.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-muted hover:bg-muted/80 transition shadow-sm">
                <div className="text-primary text-4xl mb-4">📊</div>
                <h4 className="font-semibold text-xl mb-2 text-foreground">Reportes detallados</h4>
                <p className="text-muted-foreground">
                  Accede a estadísticas visuales de tus ingresos, gastos y flujo de efectivo.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-muted hover:bg-muted/80 transition shadow-sm">
                <div className="text-primary text-4xl mb-4">🔒</div>
                <h4 className="font-semibold text-xl mb-2 text-foreground">Seguridad avanzada</h4>
                <p className="text-muted-foreground">
                  Tu información está protegida con cifrado de nivel bancario.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Info Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido de texto - lado izquierdo */}
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Interface intuitiva y moderna
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Dashboard diseñado para facilitar la gestión de todos tus pagos recurrentes desde una sola pantalla
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-foreground font-medium">Vista rápida de próximos vencimientos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-foreground font-medium">Categorización automática de gastos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-foreground font-medium">Sincronización multiplataforma</span>
                  </div>
                </div>
              </div>
              
              {/* Imagen del dashboard - lado derecho */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-lg rounded-2xl shadow-xl bg-muted overflow-hidden">
                  <img 
                    src="https://assets.qlik.com/image/upload/w_2378/q_auto/qlik/glossary/dashboard-examples/seo-hero-dashboard-examples_uyouwd.png" 
                    alt="Cronopay Dashboard Interface" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials/Benefits Section */}
        <section id="benefits" className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-12 text-foreground">
              Confianza de nuestros usuarios
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-border">
                <p className="text-muted-foreground italic mb-6">
                  "Cronopay me ha ahorrado horas en la gestión de pagos mensuales."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary/20 overflow-hidden">
                    <img 
                      src="https://img.freepik.com/fotos-gratis/mulher-tenra-com-cor-de-sobrancelha-adicionada-as-sobrancelhas_231208-3536.jpg" 
                      alt="Laura G." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-primary">Laura G.</p>
                </div>
              </div>
              <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-border">
                <p className="text-muted-foreground italic mb-6">
                  "Una plataforma moderna y fácil de entender incluso para mi equipo."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary/20 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                      alt="Andrés P." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-primary">Andrés P.</p>
                </div>
              </div>
              <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-border">
                <p className="text-muted-foreground italic mb-6">
                  "Desde que uso Cronopay, el seguimiento de mis finanzas es mucho más claro."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary/20 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                      alt="Camila R." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-primary">Camila R.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-blue-950 text-primary-foreground text-center">
          <h3 className="text-4xl font-bold mb-6">
            ¿Listo para comenzar con Cronopay?
          </h3>
          <p className="text-primary-foreground/80 mb-10">
            Regístrate hoy y transforma la forma en que manejas tus pagos.
          </p>
          <Link
            href="/auth/sign-up"
            className="bg-background text-foreground font-semibold px-8 py-3 rounded-lg hover:bg-background/60 transition"
          >
            Crear cuenta
          </Link>
        </section>
      </main>
      </div>
    </>
  );
}