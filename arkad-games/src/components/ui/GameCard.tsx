/**
 * GameCard.tsx — Tarjeta de juego ULTRA interactiva.
 *
 * Cada tarjeta tiene múltiples capas de interactividad:
 * - Hover: elevación + borde neón + zoom de imagen + parallax sutil
 * - Badges animados con iconos
 * - Texto CTA que aparece con transición
 * - Gradiente animado en el borde al hover
 * - Efecto de "brillo" que recorre la tarjeta
 */

import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/api";

interface GameCardProps {
  game: Game;
}

// Función para obtener un emoji según la plataforma
function getPlatformIcon(platform: string): string {
  if (platform.toLowerCase().includes("windows")) return "🖥️";
  if (platform.toLowerCase().includes("browser")) return "🌐";
  return "🎮";
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/juego/${game.id}`}
      id={`game-card-${game.id}`}
      className="
        group relative flex flex-col overflow-hidden rounded-2xl
        bg-[#18181b]/80 border border-white/[0.06]
        transition-all duration-500 ease-out
        hover:border-[#b026ff]/50
        hover:shadow-[0_8px_40px_rgba(176,38,255,0.2),0_0_0_1px_rgba(176,38,255,0.1)]
        hover:-translate-y-2 hover:scale-[1.02]
        animate-fade-in-up
      "
    >
      {/* ── Efecto de brillo (shine) al hover ── */}
      <div
        className="
          pointer-events-none absolute inset-0 z-10
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700
          bg-gradient-to-r from-transparent via-white/[0.03] to-transparent
          -translate-x-full group-hover:translate-x-full
          transition-transform duration-1000 ease-in-out
        "
      />

      {/* ── Imagen del juego ── */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={game.thumbnail}
          alt={`Portada de ${game.title} - juego ${game.genre} gratuito`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="
            object-cover
            transition-all duration-700 ease-out
            group-hover:scale-110
            group-hover:brightness-110
          "
        />
        {/* Gradiente para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/20 to-transparent" />

        {/* Badge "FREE" flotante */}
        <span className="
          absolute top-3 right-3 z-10
          rounded-full bg-green-500/20 border border-green-500/30
          px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400
          backdrop-blur-sm
          transition-transform duration-300
          group-hover:scale-110 group-hover:bg-green-500/30
        ">
          Free
        </span>
      </div>

      {/* ── Contenido textual ── */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {/* Badges de género y plataforma */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="
            inline-flex items-center gap-1 rounded-lg
            bg-[#b026ff]/10 border border-[#b026ff]/20
            px-2.5 py-1 text-[11px] font-semibold text-[#d580ff]
            transition-all duration-300
            group-hover:bg-[#b026ff]/20 group-hover:border-[#b026ff]/40
          ">
            {game.genre}
          </span>
          <span className="
            inline-flex items-center gap-1 rounded-lg
            bg-[#00f0ff]/8 border border-[#00f0ff]/15
            px-2.5 py-1 text-[11px] font-semibold text-[#00f0ff]/90
            transition-all duration-300
            group-hover:bg-[#00f0ff]/15 group-hover:border-[#00f0ff]/30
          ">
            {getPlatformIcon(game.platform)} {game.platform}
          </span>
        </div>

        {/* Título con hover neón */}
        <h3 className="
          text-[17px] font-bold text-white leading-snug line-clamp-1
          transition-all duration-300
          group-hover:text-[#e8d5ff]
        ">
          {game.title}
        </h3>

        {/* Descripción */}
        <p className="
          text-sm text-zinc-500 leading-relaxed line-clamp-2
          transition-colors duration-300
          group-hover:text-zinc-400
        ">
          {game.short_description}
        </p>

        {/* Pie de tarjeta */}
        <div className="
          mt-auto flex items-center justify-between
          pt-3 border-t border-white/[0.04]
          transition-all duration-300
          group-hover:border-[#b026ff]/10
        ">
          <span className="text-xs text-zinc-600 truncate max-w-[55%] transition-colors group-hover:text-zinc-500">
            {game.developer}
          </span>

          {/* CTA animado */}
          <span className="
            flex items-center gap-1
            text-xs font-bold text-[#00f0ff]
            translate-x-2 opacity-0
            transition-all duration-300 ease-out
            group-hover:translate-x-0 group-hover:opacity-100
          ">
            Ver más
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
