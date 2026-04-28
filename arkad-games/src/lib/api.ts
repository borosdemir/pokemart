/**
 * api.ts — Servicio para consumir la API de FreeToGame.
 *
 * ¿Qué hace este archivo?
 * Aquí centralizamos TODAS las llamadas a la API externa.
 * Piensa en este archivo como el "mensajero" que va a buscar
 * la información de los juegos al servidor de FreeToGame
 * y nos la trae lista para usar.
 *
 * ¿Por qué lo separamos?
 * Si mañana cambiamos de API, solo tocamos ESTE archivo,
 * sin romper nada en el resto de la aplicación (Separation of Concerns).
 */

// ─── Tipos básicos (lista de juegos) ──────────────────────────
export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

// ─── Tipos detallados (un solo juego con toda la info) ─────────
// Cuando pedimos /game?id=X, la API nos devuelve MUCHA más info
// que en la lista general. Aquí definimos esa estructura completa.

export interface Screenshot {
  id: number;
  image: string;  // URL de la captura de pantalla
}

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface GameDetail {
  id: number;
  title: string;
  thumbnail: string;
  status: string;              // "Live" o "Cancelled"
  short_description: string;
  description: string;         // Descripción LARGA y detallada
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: SystemRequirements | null;
  screenshots: Screenshot[];
}

// ─── Lista de géneros disponibles ──────────────────────────────
// La API soporta estos géneros como filtro. Los usaremos para
// construir la página de géneros y los filtros del catálogo.
export const GENRES = [
  { slug: "mmorpg", label: "MMORPG", emoji: "⚔️" },
  { slug: "shooter", label: "Shooter", emoji: "🔫" },
  { slug: "moba", label: "MOBA", emoji: "🏰" },
  { slug: "strategy", label: "Estrategia", emoji: "♟️" },
  { slug: "racing", label: "Carreras", emoji: "🏎️" },
  { slug: "sports", label: "Deportes", emoji: "⚽" },
  { slug: "social", label: "Social", emoji: "👥" },
  { slug: "fighting", label: "Pelea", emoji: "🥊" },
  { slug: "mmorts", label: "MMORTS", emoji: "🗺️" },
  { slug: "survival", label: "Supervivencia", emoji: "🏕️" },
  { slug: "card", label: "Cartas", emoji: "🃏" },
  { slug: "battle-royale", label: "Battle Royale", emoji: "🎯" },
  { slug: "fantasy", label: "Fantasía", emoji: "🧙" },
  { slug: "sci-fi", label: "Ciencia Ficción", emoji: "🚀" },
  { slug: "action-rpg", label: "Action RPG", emoji: "⚡" },
  { slug: "horror", label: "Horror", emoji: "👻" },
] as const;

// ─── URL Base ──────────────────────────────────────────────────
const BASE_URL = "https://www.freetogame.com/api";

// ─── Funciones ─────────────────────────────────────────────────

/**
 * Obtiene una lista de juegos gratuitos.
 * @param limit - Cantidad máxima (0 = todos).
 */
export async function getGames(limit: number = 0): Promise<Game[]> {
  const response = await fetch(`${BASE_URL}/games`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener juegos: ${response.statusText}`);
  }

  const games: Game[] = await response.json();
  return limit > 0 ? games.slice(0, limit) : games;
}

/**
 * Obtiene el DETALLE COMPLETO de un juego por su ID.
 * Incluye screenshots, descripción larga, requisitos del sistema, etc.
 */
export async function getGameById(id: number): Promise<GameDetail> {
  const response = await fetch(`${BASE_URL}/game?id=${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener juego #${id}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Obtiene juegos filtrados por categoría/género.
 */
export async function getGamesByCategory(
  category: string,
  limit: number = 0
): Promise<Game[]> {
  const response = await fetch(
    `${BASE_URL}/games?category=${category}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`Error al obtener juegos por categoría: ${response.statusText}`);
  }

  const games: Game[] = await response.json();
  return limit > 0 ? games.slice(0, limit) : games;
}

/**
 * Obtiene juegos filtrados por plataforma.
 * @param platform - "pc", "browser" o "all".
 */
export async function getGamesByPlatform(
  platform: string,
  limit: number = 0
): Promise<Game[]> {
  const url =
    platform === "all"
      ? `${BASE_URL}/games`
      : `${BASE_URL}/games?platform=${platform}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`Error al obtener juegos por plataforma: ${response.statusText}`);
  }

  const games: Game[] = await response.json();
  return limit > 0 ? games.slice(0, limit) : games;
}

/**
 * Obtiene juegos ordenados por un criterio específico.
 */
export async function getGamesSortedBy(
  sortBy: "release-date" | "popularity" | "alphabetical" | "relevance",
  limit: number = 0
): Promise<Game[]> {
  const response = await fetch(
    `${BASE_URL}/games?sort-by=${sortBy}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`Error al obtener juegos ordenados: ${response.statusText}`);
  }

  const games: Game[] = await response.json();
  return limit > 0 ? games.slice(0, limit) : games;
}
