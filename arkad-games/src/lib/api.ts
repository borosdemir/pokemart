/**
 * api.ts — Servicio para consumir la API de FreeToGame.
 *
 * ¿Qué hace este archivo?
 * Aquí centralizamos todas las llamadas a la API externa.
 * Piensa en este archivo como el "mensajero" que va a buscar
 * la información de los juegos al servidor de FreeToGame
 * y nos la trae lista para usar.
 *
 * ¿Por qué lo separamos?
 * Si mañana cambiamos de API, solo tocamos ESTE archivo,
 * sin romper nada en el resto de la aplicación. Esto se llama
 * "Separación de responsabilidades" (Separation of Concerns).
 */

// ─── Tipos (TypeScript) ────────────────────────────────────────
// Definimos la "forma" que tiene cada juego que nos llega de la API.
// TypeScript nos obliga a ser explícitos, así evitamos errores
// por datos inesperados (ej: si escribes "tittle" en vez de "title",
// TypeScript te lo marca como error).

export interface Game {
  id: number;
  title: string;
  thumbnail: string;          // URL de la imagen de portada
  short_description: string;  // Descripción breve del juego
  game_url: string;           // Enlace para jugar
  genre: string;              // Género: Shooter, MMORPG, etc.
  platform: string;           // Plataforma: PC, Browser, etc.
  publisher: string;          // Empresa que lo publicó
  developer: string;          // Empresa que lo desarrolló
  release_date: string;       // Fecha de lanzamiento
  freetogame_profile_url: string;
}

// ─── URL Base ──────────────────────────────────────────────────
// Usamos una constante para no repetir la URL en cada función.
const BASE_URL = "https://www.freetogame.com/api";

// ─── Funciones ─────────────────────────────────────────────────

/**
 * Obtiene una lista de juegos gratuitos.
 *
 * @param limit - Cantidad máxima de juegos a devolver (por defecto 12).
 * @returns Un arreglo (array) de objetos tipo `Game`.
 *
 * ¿Cómo funciona?
 * 1. Hacemos un `fetch` (petición HTTP) al endpoint de la API.
 * 2. Convertimos la respuesta a JSON (un formato que JavaScript entiende).
 * 3. Cortamos el arreglo para devolver solo los primeros `limit` juegos.
 *
 * NOTA: `fetch` en Next.js Server Components se ejecuta en el SERVIDOR,
 * no en el navegador del usuario. Esto significa:
 *   - No hay problemas de CORS (restricciones del navegador).
 *   - La página carga más rápido porque los datos llegan pre-renderizados.
 */
export async function getGames(limit: number = 12): Promise<Game[]> {
  const response = await fetch(`${BASE_URL}/games`, {
    // Next.js cachea las peticiones por defecto. Con `revalidate`,
    // le decimos que refresque los datos cada 1 hora (3600 segundos).
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener juegos: ${response.statusText}`);
  }

  const games: Game[] = await response.json();

  // `.slice(0, limit)` toma solo los primeros `limit` elementos.
  // Es como decir "dame los primeros 12 de la lista".
  return games.slice(0, limit);
}

/**
 * Obtiene juegos filtrados por categoría/género.
 *
 * @param category - El género a buscar (ej: "shooter", "mmorpg").
 * @param limit - Cantidad máxima de resultados.
 * @returns Un arreglo de juegos que pertenecen a esa categoría.
 */
export async function getGamesByCategory(
  category: string,
  limit: number = 12
): Promise<Game[]> {
  const response = await fetch(
    `${BASE_URL}/games?category=${category}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`Error al obtener juegos por categoría: ${response.statusText}`);
  }

  const games: Game[] = await response.json();
  return games.slice(0, limit);
}

/**
 * Obtiene juegos ordenados por un criterio específico.
 *
 * @param sortBy - Criterio de ordenamiento:
 *   - "release-date": Los más nuevos primero.
 *   - "popularity": Los más populares primero.
 *   - "alphabetical": Orden alfabético.
 *   - "relevance": Los más relevantes primero.
 */
export async function getGamesSortedBy(
  sortBy: "release-date" | "popularity" | "alphabetical" | "relevance",
  limit: number = 12
): Promise<Game[]> {
  const response = await fetch(
    `${BASE_URL}/games?sort-by=${sortBy}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`Error al obtener juegos ordenados: ${response.statusText}`);
  }

  const games: Game[] = await response.json();
  return games.slice(0, limit);
}
