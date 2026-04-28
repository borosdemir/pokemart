/**
 * /catalogo/page.tsx — Página del catálogo de juegos.
 *
 * Esta es la página donde el usuario puede explorar TODOS los
 * juegos disponibles, filtrarlos, buscarlos y ordenarlos.
 *
 * Arquitectura Server + Client:
 * - ESTE archivo (Server Component) obtiene los datos de la API.
 * - CatalogoClient (Client Component) maneja la interactividad.
 */

import { getGames } from "@/lib/api";
import CatalogoClient from "@/components/ui/CatalogoClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo | Arkad Games",
  description: "Explora cientos de juegos gratuitos. Filtra por género, plataforma y encuentra tu próximo juego favorito.",
};

// `searchParams` nos permite leer los parámetros de la URL.
// Ej: /catalogo?genre=shooter → searchParams.genre = "shooter"
export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const params = await searchParams;
  // Obtenemos TODOS los juegos (sin límite) para que el
  // filtrado del lado del cliente tenga todo el catálogo.
  const allGames = await getGames();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          🎮 Catálogo de Juegos
        </h1>
        <p className="mt-2 text-zinc-500">
          Explora nuestra colección completa de juegos gratuitos
        </p>
      </div>

      <CatalogoClient allGames={allGames} initialGenre={params?.genre || ""} />
    </section>
  );
}
