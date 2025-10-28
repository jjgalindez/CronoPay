export default function AppDownloadSection() {
  return (
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
  )
}
