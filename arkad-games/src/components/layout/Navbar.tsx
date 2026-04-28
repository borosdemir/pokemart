/**
 * Navbar.tsx — Barra de navegación principal.
 *
 * ¿Qué hace este componente?
 * Es la barra superior que aparece en TODAS las páginas de la app.
 * Contiene el logo de Arkad Games y los enlaces de navegación.
 *
 * Características visuales:
 * - Efecto "glassmorphism" (cristal ahumado): se ve el fondo
 *   borroso detrás de la barra cuando haces scroll.
 * - `sticky top-0`: se queda "pegada" arriba al hacer scroll.
 * - `z-50`: se asegura de estar siempre por encima del contenido.
 */

import Link from "next/link";

// ─── Links de navegación ───────────────────────────────────────
// Los definimos como un arreglo (array) para poder recorrerlos
// con `.map()` y no repetir código HTML por cada enlace.
const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Géneros", href: "/generos" },
  { label: "Torneos", href: "/torneos" },
];

export default function Navbar() {
  return (
    <header
      id="main-navbar"
      className="glass sticky top-0 z-50 w-full"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* 
            Icono SVG personalizado: un "joystick" simplificado.
            Lo creamos directamente en SVG en lugar de usar una imagen
            para que sea infinitamente escalable sin perder calidad.
          */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="transition-transform duration-300 group-hover:rotate-12"
          >
            {/* Cuerpo del controlador */}
            <rect
              x="4"
              y="10"
              width="24"
              height="14"
              rx="7"
              className="fill-[#b026ff]"
            />
            {/* D-pad horizontal */}
            <rect x="10" y="15" width="6" height="2" rx="1" fill="white" />
            {/* D-pad vertical */}
            <rect x="12" y="13" width="2" height="6" rx="1" fill="white" />
            {/* Botón A */}
            <circle cx="22" cy="15" r="1.5" fill="#00f0ff" />
            {/* Botón B */}
            <circle cx="25" cy="17" r="1.5" fill="#ff00ea" />
          </svg>

          {/* Nombre de la marca */}
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">ARKAD</span>
            <span className="text-[#b026ff]"> GAMES</span>
          </span>
        </Link>

        {/* ── Enlaces de navegación ── */}
        {/* 
          En pantallas pequeñas (`sm:` para abajo) los ocultamos.
          Un menú hamburguesa se podría agregar después.
        */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Botón de acción ── */}
        <Link
          href="/login"
          className="hidden rounded-full bg-[#b026ff] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#9b1fe0] hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] sm:inline-flex"
        >
          Iniciar Sesión
        </Link>

        {/* ── Botón hamburguesa (móvil) ── */}
        <button
          id="mobile-menu-btn"
          className="flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-white/5 md:hidden"
          aria-label="Abrir menú"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
