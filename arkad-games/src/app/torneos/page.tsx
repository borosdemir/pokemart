/**
 * /torneos/page.tsx — Página de torneos (próximamente).
 *
 * Por ahora es una página placeholder que muestra un mensaje
 * de "próximamente" con un diseño atractivo.
 */

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torneos | Arkad Games",
  description: "Próximamente: Compite en torneos de juegos gratuitos con jugadores de todo el mundo.",
};

export default function TorneosPage() {
  return (
    <section className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-6xl">🏆</p>
        <h1 className="mt-6 text-3xl font-extrabold text-white">
          Torneos
        </h1>
        <p className="mt-3 text-zinc-500 leading-relaxed">
          Estamos preparando algo épico. Muy pronto podrás competir
          en torneos con jugadores de todo el mundo.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#b026ff]/30 bg-[#b026ff]/10 px-5 py-2 text-sm text-[#d580ff]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b026ff] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#b026ff]" />
          </span>
          Próximamente
        </div>
        <div className="mt-8">
          <Link
            href="/catalogo"
            className="text-sm font-medium text-[#00f0ff] hover:underline"
          >
            ← Mientras tanto, explora el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
