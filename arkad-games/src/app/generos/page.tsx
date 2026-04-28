/**
 * /generos/page.tsx — Exploración por géneros (OPTIMIZADO).
 *
 * Optimización de rendimiento:
 * ANTES: Hacíamos 16 llamadas a la API (una por género) = LENTO.
 * AHORA: Hacemos UNA sola llamada (todos los juegos) y agrupamos
 * por género en el servidor. ¡16x más rápido!
 */

import Link from "next/link";
import { GENRES, getGames } from "@/lib/api";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Géneros",
  description:
    "Explora juegos gratuitos por género: Shooter, MMORPG, MOBA, Battle Royale, Carreras, Estrategia y muchos más.",
};

export default async function GenerosPage() {
  // UNA sola llamada a la API — obtenemos todos los juegos
  const allGames = await getGames();

  // Agrupamos los juegos por género para contar y obtener thumbnails
  const genreData = GENRES.map((genre) => {
    const matching = allGames.filter(
      (g) => g.genre.toLowerCase().replace(/\s+/g, "-") === genre.slug
    );
    return {
      ...genre,
      thumbnail: matching[0]?.thumbnail || null,
      count: matching.length,
    };
  }).filter((g) => g.count > 0); // Solo mostramos géneros que tengan juegos

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      aria-labelledby="genres-title"
    >
      <div className="mb-10 animate-fade-in-up">
        <h1 id="genres-title" className="text-3xl font-bold text-white sm:text-4xl">
          🏷️ Explorar por Género
        </h1>
        <p className="mt-2 text-zinc-500">
          Elige tu género favorito y descubre juegos increíbles
        </p>
      </div>

      {/* Grid de géneros con stagger */}
      <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {genreData.map((genre) => (
          <Link
            key={genre.slug}
            href={`/catalogo?genre=${genre.slug}`}
            id={`genre-${genre.slug}`}
            className="
              group relative flex h-44 items-end overflow-hidden rounded-2xl
              border border-white/[0.06]
              transition-all duration-500 ease-out
              hover:border-[#b026ff]/40
              hover:shadow-[0_8px_40px_rgba(176,38,255,0.15)]
              hover:-translate-y-1 hover:scale-[1.02]
              animate-fade-in-up
            "
          >
            {/* Imagen de fondo */}
            {genre.thumbnail && (
              <Image
                src={genre.thumbnail}
                alt={`Juegos de ${genre.label} gratuitos`}
                fill
                sizes="300px"
                loading="lazy"
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
            )}

            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-all duration-500 group-hover:from-black/95 group-hover:via-black/40" />

            {/* Contenido */}
            <div className="relative z-10 w-full p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                    {genre.emoji}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {genre.label}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {genre.count} juego{genre.count !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="
                  flex items-center gap-1 rounded-full
                  bg-white/10 backdrop-blur-sm
                  px-3 py-1.5 text-xs font-semibold text-white
                  translate-y-2 opacity-0
                  transition-all duration-300 ease-out
                  group-hover:translate-y-0 group-hover:opacity-100
                ">
                  Explorar
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
