export default function GameDetailLoading() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex gap-2">
        <div className="h-4 w-12 rounded skeleton" />
        <div className="h-4 w-16 rounded skeleton" />
        <div className="h-4 w-32 rounded skeleton" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Imagen principal */}
        <div className="space-y-6">
          <div className="aspect-video rounded-2xl skeleton" />
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-video rounded-xl skeleton" />
            <div className="aspect-video rounded-xl skeleton" />
            <div className="aspect-video rounded-xl skeleton" />
          </div>
        </div>
        {/* Info lateral */}
        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="h-7 w-20 rounded-full skeleton" />
            <div className="h-7 w-28 rounded-full skeleton" />
          </div>
          <div className="h-12 w-full rounded-xl skeleton" />
          <div className="h-20 w-full rounded-xl skeleton" />
          <div className="h-14 w-full rounded-xl skeleton" />
          <div className="rounded-xl border border-white/5 p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 rounded skeleton" />
                <div className="h-4 w-32 rounded skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
