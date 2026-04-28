/**
 * FilterBar.tsx — Barra de filtros para el catálogo.
 *
 * Este es un Client Component porque necesita manejar estado
 * (qué filtro está seleccionado) e interacción del usuario.
 *
 * Los filtros se comunican hacia la página padre usando
 * funciones "callback" (onFilterChange). Cuando el usuario
 * selecciona un género, esta función le avisa a la página
 * para que filtre la lista de juegos.
 */

"use client";

import { GENRES } from "@/lib/api";

interface FilterBarProps {
  search: string;
  genre: string;
  platform: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function FilterBar({
  search,
  genre,
  platform,
  sortBy,
  onSearchChange,
  onGenreChange,
  onPlatformChange,
  onSortChange,
}: FilterBarProps) {
  // Estilo común para los selects (dropdowns)
  const selectClass =
    "rounded-xl border border-white/10 bg-[#18181b] px-3 py-2.5 text-sm text-zinc-300 outline-none transition-colors focus:border-[#b026ff]/50 hover:border-white/20";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      {/* ── Buscador ── */}
      <div className="relative flex-1 min-w-[220px]">
        {/* Icono de lupa */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="search-input"
          type="text"
          placeholder="Buscar juegos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#18181b] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-[#b026ff]/50 hover:border-white/20"
        />
      </div>

      {/* ── Filtro por género ── */}
      <select
        id="genre-filter"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        className={selectClass}
      >
        <option value="">Todos los géneros</option>
        {GENRES.map((g) => (
          <option key={g.slug} value={g.slug}>
            {g.emoji} {g.label}
          </option>
        ))}
      </select>

      {/* ── Filtro por plataforma ── */}
      <select
        id="platform-filter"
        value={platform}
        onChange={(e) => onPlatformChange(e.target.value)}
        className={selectClass}
      >
        <option value="">Todas las plataformas</option>
        <option value="pc">🖥️ PC (Windows)</option>
        <option value="browser">🌐 Navegador</option>
      </select>

      {/* ── Ordenar por ── */}
      <select
        id="sort-filter"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className={selectClass}
      >
        <option value="relevance">⭐ Relevancia</option>
        <option value="popularity">🔥 Popularidad</option>
        <option value="release-date">📅 Más recientes</option>
        <option value="alphabetical">🔤 A-Z</option>
      </select>
    </div>
  );
}
