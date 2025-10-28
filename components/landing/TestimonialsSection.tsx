export default function TestimonialsSection() {
  return (
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
  )
}
