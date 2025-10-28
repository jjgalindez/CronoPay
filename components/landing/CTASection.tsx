import Link from "next/link"

export default function CTASection() {
  return (
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
  )
}
