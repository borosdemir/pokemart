export default function CatalogoLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-10 w-72 rounded-xl skeleton" />
        <div className="mt-2 h-5 w-96 rounded-lg skeleton" />
      </div>
      {/* Skeleton de filtros */}
      <div className="flex flex-wrap gap-4">
        <div className="h-11 flex-1 min-w-[220px] rounded-xl skeleton" />
        <div className="h-11 w-44 rounded-xl skeleton" />
        <div className="h-11 w-44 rounded-xl skeleton" />
        <div className="h-11 w-40 rounded-xl skeleton" />
      </div>
      {/* Skeleton de grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
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
  );
}
