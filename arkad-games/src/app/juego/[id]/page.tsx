/**
 * /juego/[id]/page.tsx — Página de detalle de un juego.
 *
 * ¿Qué es [id]?
 * Los corchetes en el nombre de la carpeta indican una
 * "ruta dinámica" en Next.js. Significa que la URL puede ser:
 * /juego/521, /juego/123, /juego/999, etc.
 * Next.js captura el número (521, 123...) y nos lo pasa
 * como parámetro `params.id`.
 *
 * Esta página muestra TODA la información de un juego:
 * screenshots, descripción larga, requisitos del sistema, etc.
 */

import { getGameById, getGames } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// ── Metadata dinámica ────────────────────────────────────────
// Generamos el título y descripción basados en el juego.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const game = await getGameById(Number(id));
  return {
    title: `${game.title} | Arkad Games`,
    description: game.short_description,
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await getGameById(Number(id));

  // Para las recomendaciones "Juegos similares" del mismo género
  const allGames = await getGames(50);
  const similarGames = allGames
    .filter((g) => g.genre === game.genre && g.id !== game.id)
    .slice(0, 4);

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ── Breadcrumb (navegación jerárquica) ── */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-white transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/catalogo" className="hover:text-white transition-colors">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{game.title}</span>
      </nav>

      {/* ════════════════════════════════════════════════════════
          HERO DEL JUEGO
          ════════════════════════════════════════════════════════ */}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Columna izquierda: imagen principal */}
        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5">
            <Image
              src={
                game.screenshots.length > 0
                  ? game.screenshots[0].image
                  : game.thumbnail
              }
              alt={game.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Galería de screenshots */}
          {game.screenshots.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {game.screenshots.slice(1, 4).map((ss) => (
                <div
                  key={ss.id}
                  className="relative aspect-video overflow-hidden rounded-xl border border-white/5 transition-transform hover:scale-105"
                >
                  <Image
                    src={ss.image}
                    alt={`${game.title} screenshot`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha: info del juego */}
        <div className="space-y-6">
          {/* Título y badges */}
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-[#b026ff]/15 px-3 py-1 text-xs font-medium text-[#d580ff]">
                {game.genre}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#00f0ff]/10 px-3 py-1 text-xs font-medium text-[#00f0ff]">
                {game.platform}
              </span>
              {game.status === "Live" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Activo
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-white lg:text-4xl">
              {game.title}
            </h1>
          </div>

          {/* Descripción breve */}
          <p className="text-zinc-400 leading-relaxed">
            {game.short_description}
          </p>

          {/* Botón de jugar */}
          <a
            href={game.game_url}
            target="_blank"
            rel="noopener noreferrer"
            id="play-btn"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b026ff] py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-[#9b1fe0] hover:shadow-[0_0_30px_rgba(176,38,255,0.4)] hover:scale-[1.02]"
          >
            🎮 Jugar Ahora — Gratis
          </a>

          {/* Tabla de información */}
          <div className="rounded-xl border border-white/5 bg-[#18181b] p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Información
            </h3>
            <dl className="space-y-3">
              {[
                { label: "Desarrollador", value: game.developer },
                { label: "Publisher", value: game.publisher },
                { label: "Género", value: game.genre },
                { label: "Plataforma", value: game.platform },
                {
                  label: "Lanzamiento",
                  value: new Date(game.release_date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
                >
                  <dt className="text-sm text-zinc-500">{label}</dt>
                  <dd className="text-sm font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          DESCRIPCIÓN COMPLETA
          ════════════════════════════════════════════════════════ */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold text-white">Acerca de {game.title}</h2>
        <div className="rounded-xl border border-white/5 bg-[#18181b] p-6">
          <p className="whitespace-pre-line text-zinc-400 leading-relaxed">
            {game.description}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          REQUISITOS DEL SISTEMA
          ════════════════════════════════════════════════════════ */}
      {game.minimum_system_requirements && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-white">
            Requisitos Mínimos del Sistema
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: "💻", label: "Sistema Operativo", value: game.minimum_system_requirements.os },
              { icon: "⚙️", label: "Procesador", value: game.minimum_system_requirements.processor },
              { icon: "🧠", label: "Memoria", value: game.minimum_system_requirements.memory },
              { icon: "🎨", label: "Gráficos", value: game.minimum_system_requirements.graphics },
              { icon: "💾", label: "Almacenamiento", value: game.minimum_system_requirements.storage },
            ].map(
              ({ icon, label, value }) =>
                value && (
                  <div
                    key={label}
                    className="rounded-xl border border-white/5 bg-[#18181b] p-4"
                  >
                    <p className="text-lg">{icon}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-zinc-300">{value}</p>
                  </div>
                )
            )}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          JUEGOS SIMILARES
          ════════════════════════════════════════════════════════ */}
      {similarGames.length > 0 && (
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Juegos similares
            </h2>
            <Link
              href={`/catalogo?genre=${game.genre.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-[#00f0ff] hover:underline"
            >
              Ver más →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similarGames.map((sg) => (
              <Link
                key={sg.id}
                href={`/juego/${sg.id}`}
                className="group overflow-hidden rounded-xl border border-white/5 bg-[#18181b] transition-all hover:border-[#b026ff]/30"
              >
                <div className="relative aspect-video">
                  <Image
                    src={sg.thumbnail}
                    alt={sg.title}
                    fill
                    sizes="250px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-white line-clamp-1">
                    {sg.title}
                  </p>
                  <p className="text-xs text-zinc-500">{sg.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
