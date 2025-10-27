'use client'

import { createClient } from "@/lib/supabase/client";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  //const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  async function handleSignInWithGoogle(response: any) {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      if (error) throw error;

      // Si el login es exitoso, redirigir a la página protegida
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred with Google sign-in");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      
      {/* Opcional: También puedes mostrar el botón personalizado */}
      {/* <GoogleSignInButton buttonId="google-sso-hero" /> */}
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

          {/* App Download Section */}
          <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-4">
                  📱 Disponible en móviles
                </span>
                <h3 className="text-4xl font-bold text-white mb-4">
                  Lleva Cronopay contigo
                </h3>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                  Descarga nuestra app móvil y gestiona tus pagos desde cualquier lugar. 
                  Disponible para Android e iOS.
                </p>
              </div>

              {/* Botones de descarga */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3.5 rounded-xl transition shadow-lg"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Disponible en</div>
                    <div className="text-base font-bold">Google Play</div>
                  </div>
                </a>
                
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3.5 rounded-xl transition shadow-lg"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Descarga en</div>
                    <div className="text-base font-bold">App Store</div>
                  </div>
                </a>
              </div>

              {/* Features de la app */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                <div className="text-white">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-semibold mb-1">Rápido y seguro</h4>
                  <p className="text-sm text-white/80">Acceso instantáneo a tus datos</p>
                </div>
                <div className="text-white">
                  <div className="text-3xl mb-2">🔔</div>
                  <h4 className="font-semibold mb-1">Notificaciones</h4>
                  <p className="text-sm text-white/80">Recordatorios de pagos</p>
                </div>
                <div className="text-white">
                  <div className="text-3xl mb-2">☁️</div>
                  <h4 className="font-semibold mb-1">Sincronización</h4>
                  <p className="text-sm text-white/80">En todos tus dispositivos</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-20 bg-card text-center">
            <h3 className="text-4xl font-bold mb-6 text-foreground">
              ¿Listo para comenzar con Cronopay?
            </h3>
            <p className="text-muted-foreground mb-10">
              Regístrate hoy y transforma la forma en que manejas tus pagos.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-block bg-blue-500 hover:bg-blue-400 dark:bg-blue-900 dark:hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition"
            >
              Crear cuenta
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}