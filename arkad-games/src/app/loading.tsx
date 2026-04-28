/**
 * loading.tsx — Skeleton de carga para la página principal.
 *
 * ¿Para qué sirve?
 * Next.js muestra este componente AUTOMÁTICAMENTE mientras
 * el Server Component (page.tsx) está obteniendo datos de la API.
 * El usuario ve una animación de carga en vez de una pantalla en blanco.
 * Esto se llama "Streaming" y hace que la app se sienta INSTANTÁNEA.
 */

export default function HomeLoading() {
  return (
    <>
      {/* Skeleton del Hero */}
      <section className="px-4 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 h-8 w-64 rounded-full skeleton" />
          <div className="mx-auto h-16 w-full max-w-xl rounded-2xl skeleton" />
          <div className="mx-auto mt-4 h-16 w-full max-w-md rounded-2xl skeleton" />
          <div className="mx-auto mt-6 h-12 w-96 rounded-xl skeleton" />
          <div className="mt-10 flex justify-center gap-4">
            <div className="h-14 w-48 rounded-full skeleton" />
            <div className="h-14 w-48 rounded-full skeleton" />
          </div>
        </div>
      </section>

      {/* Skeleton de los juegos */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-10">
          <div className="h-9 w-64 rounded-xl skeleton" />
          <div className="mt-2 h-5 w-48 rounded-lg skeleton" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/5">
              <div className="aspect-video skeleton" />
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="h-6 w-20 rounded-lg skeleton" />
                  <div className="h-6 w-24 rounded-lg skeleton" />
                </div>
                <div className="h-6 w-3/4 rounded-lg skeleton" />
                <div className="h-10 w-full rounded-lg skeleton" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
