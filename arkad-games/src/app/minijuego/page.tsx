/**
 * /minijuego/page.tsx — Página del mini-juego Pong Cyberpunk.
 *
 * El usuario llega aquí después de registrarse exitosamente,
 * como un "regalo de bienvenida". También puede acceder
 * desde el menú de usuario si ya está logueado.
 */

import PongGame from "@/components/game/PongGame";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyber Pong | Arkad Games",
  description: "Juega al Pong con estilo Cyberpunk. ¡Un mini-juego de bienvenida de Arkad Games!",
};

export default function MinijuegoPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#b026ff]/30 bg-[#b026ff]/10 px-4 py-1.5 text-sm text-[#d580ff]">
          🎁 ¡Regalo de bienvenida!
        </div>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          🏓 Cyber Pong
        </h1>
        <p className="mt-2 text-zinc-500">
          Un clásico reinventado con estética cyberpunk.
          ¡Derrota al CPU!
        </p>
      </div>

      {/* Juego */}
      <PongGame />

      {/* Link al catálogo */}
      <div className="mt-10 text-center">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#00f0ff] transition-colors hover:text-[#00d4e0]"
        >
          ← Explorar el catálogo de juegos
        </Link>
      </div>
    </section>
  );
}
