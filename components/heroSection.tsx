'use client'

import Link from "next/link"

export default function HeroSection() {
  return (
    <>
      <div className="bg-background text-foreground">
        <main>
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


          <section id="features" className="py-20 bg-card">
            <div className="max-w-6xl mx-auto px-6">
              <h3 className="text-3xl font-bold text-center mb-4 text-foreground">
                Funcionalidades principales
              </h3>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Todo lo que necesitas para gestionar tus pagos recurrentes
              </p>
              <div className="grid md:grid-cols-4 gap-8">
                {/* Registro de pagos */}
                <div className="bg-muted rounded-2xl p-8 shadow-sm flex flex-col items-start">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="3" fill="#3B82F6"/><rect x="7" y="13" width="10" height="2" rx="1" fill="#fff"/><rect x="7" y="9" width="6" height="2" rx="1" fill="#fff"/></svg>
                    </span>
                  </div>
                  <h4 className="font-semibold text-xl mb-2 text-foreground">Registro de pagos</h4>
                  <p className="text-muted-foreground">
                    Registra montos, fechas, categorías y métodos de pago de forma simple
                  </p>
                </div>
                {/* Recordatorios */}
                <div className="bg-muted rounded-2xl p-8 shadow-sm flex flex-col items-start">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="6" fill="#22C55E"/><path d="M12 10v2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
                    </span>
                  </div>
                  <h4 className="font-semibold text-xl mb-2 text-foreground">Recordatorios</h4>
                  <p className="text-muted-foreground">
                    Recibe alertas automáticas antes del vencimiento de cada pago
                  </p>
                </div>
                {/* Panel de estadísticas */}
                <div className="bg-muted rounded-2xl p-8 shadow-sm flex flex-col items-start">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="4" height="8" rx="2" fill="#A78BFA"/><rect x="10" y="6" width="4" height="12" rx="2" fill="#A78BFA"/><rect x="16" y="13" width="4" height="5" rx="2" fill="#A78BFA"/><rect x="4" y="10" width="4" height="8" rx="2" fill="#fff" fillOpacity=".5"/><rect x="10" y="6" width="4" height="12" rx="2" fill="#fff" fillOpacity=".5"/><rect x="16" y="13" width="4" height="5" rx="2" fill="#fff" fillOpacity=".5"/></svg>
                    </span>
                  </div>
                  <h4 className="font-semibold text-xl mb-2 text-foreground">Panel de estadísticas</h4>
                  <p className="text-muted-foreground">
                    Visualiza historial y próximos pagos con gráficos claros
                  </p>
                </div>
                {/* Vista de calendario */}
                <div className="bg-muted rounded-2xl p-8 shadow-sm flex flex-col items-start">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="14" rx="4" fill="#F59E42"/><rect x="7" y="10" width="2" height="2" rx="1" fill="#fff"/><rect x="11" y="10" width="2" height="2" rx="1" fill="#fff"/><rect x="15" y="10" width="2" height="2" rx="1" fill="#fff"/></svg>
                    </span>
                  </div>
                  <h4 className="font-semibold text-xl mb-2 text-foreground">Vista de calendario</h4>
                  <p className="text-muted-foreground">
                    Organiza pagos en calendario y genera reportes mensuales
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
            <div className="max-w-6xl mx-auto px-6">
              <h3 className="text-3xl font-bold mb-12 text-foreground text-center">
                Confianza de nuestros usuarios
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Testimonio tipo X/Twitter */}
                <div className="bg-card rounded-2xl shadow-md p-0 hover:shadow-lg transition border border-border flex flex-col">
                  <div className="flex items-center gap-3 px-6 pt-6">
                    <img
                      src="https://img.freepik.com/fotos-gratis/mulher-tenra-com-cor-de-sobrancelha-adicionada-as-sobrancelhas_231208-3536.jpg"
                      alt="Laura González"
                      className="w-12 h-12 rounded-full object-cover border border-primary/30"
                    />
                    <div>
                      <span className="font-semibold text-foreground block leading-tight">Laura González</span>
                      <span className="text-muted-foreground text-sm">@lauragonzalez · 27 oct</span>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-foreground text-base mb-2">Cronopay me ha ahorrado horas en la gestión de pagos mensuales.</p>
                    <div className="flex gap-4 text-muted-foreground text-sm mt-4">
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M2.5 10a7.5 7.5 0 1115 0A7.5 7.5 0 012.5 10zm5.833-2.083a1.25 1.25 0 100 2.5h3.334a1.25 1.25 0 100-2.5H8.333z" stroke="currentColor" strokeWidth="1.5"/></svg> 12
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M4.167 10.833V7.5a5.833 5.833 0 0111.666 0v3.333M5.833 14.167l-1.666-1.667 1.666-1.667M14.167 14.167l1.666-1.667-1.666-1.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> 8
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M10 17.5l-1.45-1.32C4.4 12.36 2 10.28 2 7.5A4.5 4.5 0 016.5 3a4.5 4.5 0 013.5 2.09A4.5 4.5 0 0117.5 7.5c0 2.78-2.4 4.86-6.55 8.68L10 17.5z" stroke="currentColor" strokeWidth="1.5"/></svg> 34
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-2xl shadow-md p-0 hover:shadow-lg transition border border-border flex flex-col">
                  <div className="flex items-center gap-3 px-6 pt-6">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                      alt="Andrés Ruiz"
                      className="w-12 h-12 rounded-full object-cover border border-primary/30"
                    />
                    <div>
                      <span className="font-semibold text-foreground block leading-tight">Andrés Ruiz</span>
                      <span className="text-muted-foreground text-sm">@andresruiz · 25 oct</span>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-foreground text-base mb-2">Una plataforma moderna y fácil de entender incluso para mi equipo.</p>
                    <div className="flex gap-4 text-muted-foreground text-sm mt-4">
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M2.5 10a7.5 7.5 0 1115 0A7.5 7.5 0 012.5 10zm5.833-2.083a1.25 1.25 0 100 2.5h3.334a1.25 1.25 0 100-2.5H8.333z" stroke="currentColor" strokeWidth="1.5"/></svg> 7
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M4.167 10.833V7.5a5.833 5.833 0 0111.666 0v3.333M5.833 14.167l-1.666-1.667 1.666-1.667M14.167 14.167l1.666-1.667-1.666-1.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> 5
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M10 17.5l-1.45-1.32C4.4 12.36 2 10.28 2 7.5A4.5 4.5 0 016.5 3a4.5 4.5 0 013.5 2.09A4.5 4.5 0 0117.5 7.5c0 2.78-2.4 4.86-6.55 8.68L10 17.5z" stroke="currentColor" strokeWidth="1.5"/></svg> 21
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-2xl shadow-md p-0 hover:shadow-lg transition border border-border flex flex-col">
                  <div className="flex items-center gap-3 px-6 pt-6">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                      alt="Camila López"
                      className="w-12 h-12 rounded-full object-cover border border-primary/30"
                    />
                    <div>
                      <span className="font-semibold text-foreground block leading-tight">Camila López</span>
                      <span className="text-muted-foreground text-sm">@camilalopez · 22 oct</span>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-foreground text-base mb-2">Desde que uso Cronopay, el seguimiento de mis finanzas es mucho más claro.</p>
                    <div className="flex gap-4 text-muted-foreground text-sm mt-4">
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M2.5 10a7.5 7.5 0 1115 0A7.5 7.5 0 012.5 10zm5.833-2.083a1.25 1.25 0 100 2.5h3.334a1.25 1.25 0 100-2.5H8.333z" stroke="currentColor" strokeWidth="1.5"/></svg> 9
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M4.167 10.833V7.5a5.833 5.833 0 0111.666 0v3.333M5.833 14.167l-1.666-1.667 1.666-1.667M14.167 14.167l1.666-1.667-1.666-1.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> 6
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="inline-block"><path d="M10 17.5l-1.45-1.32C4.4 12.36 2 10.28 2 7.5A4.5 4.5 0 016.5 3a4.5 4.5 0 013.5 2.09A4.5 4.5 0 0117.5 7.5c0 2.78-2.4 4.86-6.55 8.68L10 17.5z" stroke="currentColor" strokeWidth="1.5"/></svg> 27
                      </span>
                    </div>
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