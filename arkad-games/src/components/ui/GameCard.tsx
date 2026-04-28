/**
 * GameCard.tsx — Tarjeta visual para cada juego.
 *
 * ¿Qué hace este componente?
 * Muestra la información de UN juego en formato de tarjeta (card).
 * Incluye: imagen, título, género, plataforma y descripción.
 *
 * ¿Por qué es un componente separado?
 * Porque vamos a reutilizarlo muchas veces (una vez por cada juego).
 * Si necesitamos cambiar cómo se ve una tarjeta, solo editamos
 * ESTE archivo y TODAS las tarjetas se actualizan automáticamente.
 * Esto se llama "componente reutilizable".
 */

import Image from "next/image";
import type { Game } from "@/lib/api";

// ─── Props del componente ──────────────────────────────────────
// Las "props" son los datos que el componente padre le pasa
// a este componente hijo. Es como los ingredientes de una receta:
// le pasamos un objeto `game` y él se encarga de "cocinarlo"
// visualmente.

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    // El enlace envuelve toda la tarjeta para que sea clickeable.
    <a
      href={game.game_url}
      target="_blank"
      rel="noopener noreferrer"
      id={`game-card-${game.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#18181b] border border-white/5 transition-all duration-300 hover:border-[#b026ff]/40 hover:shadow-[0_0_30px_rgba(176,38,255,0.15)] hover:-translate-y-1"
    >
      {/* ── Imagen del juego ── */}
      {/* 
        `relative` + `aspect-video` crea un contenedor con proporción 16:9.
        La imagen llena todo el contenedor gracias a `fill` + `object-cover`.
        Al pasar el mouse (hover), la imagen hace un zoom sutil (scale-105).
      */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradiente oscuro en la parte inferior de la imagen para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent" />
      </div>

      {/* ── Contenido textual ── */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Badges de género y plataforma */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-[#b026ff]/15 px-2.5 py-0.5 text-xs font-medium text-[#d580ff]">
            {game.genre}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#00f0ff]/10 px-2.5 py-0.5 text-xs font-medium text-[#00f0ff]">
            {game.platform}
          </span>
        </div>

        {/* Título del juego */}
        <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">
          {game.title}
        </h3>

        {/* Descripción breve — `line-clamp-2` limita a 2 líneas */}
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
          {game.short_description}
        </p>

        {/* Pie de la tarjeta: desarrollador + CTA */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-xs text-zinc-500 truncate max-w-[60%]">
            {game.developer}
          </span>
          <span className="text-xs font-semibold text-[#00f0ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Jugar gratis →
          </span>
        </div>
      </div>
    </a>
  );
}
