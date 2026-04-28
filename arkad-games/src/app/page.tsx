/**
 * page.tsx — Página de inicio (Home) de Arkad Games.
 *
 * ¿Qué hace esta página?
 * Es lo primero que ve el usuario cuando entra a nuestra web.
 * Tiene dos secciones principales:
 *
 * 1. HERO: Una gran sección de bienvenida con un título llamativo,
 *    una descripción y un botón de acción.
 *
 * 2. FEATURED GAMES: Una cuadrícula (grid) con las tarjetas de los
 *    juegos más populares, obtenidos en tiempo real desde la API
 *    de FreeToGame.
 *
 * NOTA IMPORTANTE: Este es un "Server Component" (Componente de Servidor).
 * Eso significa que el código se ejecuta en el SERVIDOR de Next.js,
 * no en el navegador del usuario. Por eso podemos usar `await`
 * directamente para llamar a la API sin useEffect ni useState.
 * ¡Es más simple y más rápido!
 */

import { getGames } from "@/lib/api";
import GameCard from "@/components/ui/GameCard";
import Link from "next/link";

export default async function Home() {
  // Obtenemos 12 juegos desde la API.
  // Al ser Server Component, esto se ejecuta en el servidor.
  const games = await getGames(12);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          SECCIÓN 1: HERO
          ════════════════════════════════════════════════════════ */}
      <section
        id="hero-section"
        className="relative overflow-hidden px-4 pt-20 pb-28 sm:px-6 lg:px-8"
      >
        {/* ── Efectos de fondo decorativos ──
            Estos divs crean los "halos" de luz neón que se ven
            detrás del texto. Son puramente decorativos.
            `pointer-events-none` hace que no interfieran con clicks.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {/* Halo púrpura superior izquierdo */}
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#b026ff]/10 blur-[120px]" />
          {/* Halo cian inferior derecho */}
          <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-[#00f0ff]/8 blur-[120px]" />
          {/* Grid decorativo sutil */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* ── Contenido del Hero ── */}
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge superior */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#b026ff]/30 bg-[#b026ff]/10 px-4 py-1.5 text-sm text-[#d580ff]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b026ff] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#b026ff]" />
            </span>
            +{games.length * 40} juegos gratuitos disponibles
          </div>

          {/* Título principal */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Descubre una nueva{" "}
            <span className="bg-gradient-to-r from-[#b026ff] via-[#00f0ff] to-[#ff00ea] bg-clip-text text-transparent">
              forma de jugar
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Explora cientos de juegos gratuitos para PC y navegador.
            Desde shooters épicos hasta mundos abiertos masivos,
            encuentra tu próxima aventura sin gastar un centavo.
          </p>

          {/* Botones de acción */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/catalogo"
              id="cta-explore"
              className="inline-flex items-center gap-2 rounded-full bg-[#b026ff] px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-[#9b1fe0] hover:shadow-[0_0_30px_rgba(176,38,255,0.4)] hover:scale-105"
            >
              Explorar catálogo
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/generos"
              id="cta-genres"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-base font-semibold text-zinc-300 transition-all duration-300 hover:border-[#00f0ff]/40 hover:text-white hover:bg-white/5"
            >
              Ver por géneros
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECCIÓN 2: JUEGOS DESTACADOS
          ════════════════════════════════════════════════════════ */}
      <section
        id="featured-games"
        className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        {/* Encabezado de sección */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              🔥 Juegos Destacados
            </h2>
            <p className="mt-1 text-zinc-500">
              Los títulos más populares del momento
            </p>
          </div>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-[#00f0ff] transition-colors hover:text-[#00d4e0]"
          >
            Ver todos →
          </Link>
        </div>

        {/* ── Grid de tarjetas ──
            Tailwind hace el diseño responsivo SUPER fácil:
            - En móvil (default): 1 columna
            - En tablet (sm:): 2 columnas
            - En desktop (lg:): 3 columnas
        */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </>
  );
}
