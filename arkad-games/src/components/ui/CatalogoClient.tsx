/**
 * CatalogoClient.tsx — Lógica interactiva del catálogo.
 *
 * ¿Por qué separamos Server y Client?
 * La página /catalogo (page.tsx) es un Server Component que
 * obtiene TODOS los juegos de la API en el servidor (rápido).
 * Luego le pasa esos juegos a ESTE componente Client, que
 * maneja los filtros, búsqueda y paginación en el navegador.
 *
 * Ventaja: Los datos se cargan rápido en el servidor,
 * y la interactividad (filtros) ocurre sin recargar la página.
 */

"use client";

import { useState, useMemo } from "react";
import type { Game } from "@/lib/api";
import GameCard from "@/components/ui/GameCard";
import FilterBar from "@/components/ui/FilterBar";

interface CatalogoClientProps {
  allGames: Game[];
  initialGenre?: string;
}

const GAMES_PER_PAGE = 12;

export default function CatalogoClient({
  allGames,
  initialGenre = "",
}: CatalogoClientProps) {
  // ── Estado de los filtros ──
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(initialGenre);
  const [platform, setPlatform] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);

  // ── Filtrado y búsqueda ──
  // `useMemo` memoriza el resultado: solo recalcula cuando
  // los filtros o los juegos cambian. Así no filtramos
  // la lista completa en cada render innecesario.
  const filteredGames = useMemo(() => {
    let result = [...allGames];

    // Filtrar por búsqueda (nombre del juego)
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(term) ||
          g.short_description.toLowerCase().includes(term) ||
          g.developer.toLowerCase().includes(term)
      );
    }

    // Filtrar por género
    if (genre) {
      result = result.filter(
        (g) => g.genre.toLowerCase().replace(/\s+/g, "-") === genre
      );
    }

    // Filtrar por plataforma
    if (platform) {
      result = result.filter((g) => {
        if (platform === "pc") return g.platform.toLowerCase().includes("windows");
        if (platform === "browser") return g.platform.toLowerCase().includes("browser");
        return true;
      });
    }

    // Ordenar
    if (sortBy === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "release-date") {
      result.sort(
        (a, b) =>
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    }

    return result;
  }, [allGames, search, genre, platform, sortBy]);

  // ── Paginación ──
  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (page - 1) * GAMES_PER_PAGE,
    page * GAMES_PER_PAGE
  );

  // Resetear a página 1 cuando cambian los filtros
  const handleFilterChange = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  return (
    <>
      {/* ── Barra de filtros ── */}
      <FilterBar
        search={search}
        genre={genre}
        platform={platform}
        sortBy={sortBy}
        onSearchChange={handleFilterChange(setSearch)}
        onGenreChange={handleFilterChange(setGenre)}
        onPlatformChange={handleFilterChange(setPlatform)}
        onSortChange={handleFilterChange(setSortBy)}
      />

      {/* ── Contador de resultados ── */}
      <div className="mt-6 flex items-center justify-between animate-fade-in">
        <p className="text-sm text-zinc-500 tabular-nums">
          <span className="font-semibold text-zinc-300">{filteredGames.length}</span>{" "}
          juego{filteredGames.length !== 1 ? "s" : ""} encontrado{filteredGames.length !== 1 ? "s" : ""}
          {totalPages > 1 && (
            <span className="ml-2 text-zinc-600">• Página {page} de {totalPages}</span>
          )}
        </p>
        {(genre || platform || search) && (
          <button
            onClick={() => { setGenre(""); setPlatform(""); setSearch(""); setPage(1); }}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-[#00f0ff] transition-all hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/30 active:scale-95"
          >
            ✕ Limpiar filtros
          </button>
        )}
      </div>

      {/* ── Grid de juegos ── */}
      {paginatedGames.length > 0 ? (
        <div key={`page-${page}-${genre}-${platform}`} className="stagger-children mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <p className="text-4xl">🎮</p>
          <p className="mt-4 text-lg font-medium text-zinc-400">
            No se encontraron juegos
          </p>
          <p className="text-sm text-zinc-600">
            Intenta con otros filtros o términos de búsqueda.
          </p>
        </div>
      )}

      {/* ── Paginación ── */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={page === 1}
            className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            ← Anterior
          </button>

          {/* Mostrar números de página */}
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            // Lógica para mostrar páginas alrededor de la actual
            let pageNum: number;
            if (totalPages <= 7) {
              pageNum = i + 1;
            } else if (page <= 4) {
              pageNum = i + 1;
            } else if (page >= totalPages - 3) {
              pageNum = totalPages - 6 + i;
            } else {
              pageNum = page - 3 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  page === pageNum
                    ? "bg-[#b026ff] text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={page === totalPages}
            className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            Siguiente →
          </button>
        </div>
      )}
    </>
  );
}
