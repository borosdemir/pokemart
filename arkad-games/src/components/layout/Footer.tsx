/**
 * Footer.tsx — Pie de página de la aplicación.
 *
 * ¿Qué hace este componente?
 * Aparece al final de todas las páginas. Contiene información
 * de copyright, enlaces útiles e iconos de redes sociales.
 *
 * Nota para principiantes:
 * Los iconos de redes sociales los dibujamos con SVG (gráficos vectoriales).
 * SVG es como "dibujar con código": defines formas (círculos, líneas, etc.)
 * y el navegador las renderiza. La ventaja es que se ven perfectos
 * en cualquier tamaño de pantalla.
 */

import Link from "next/link";

// ─── Columnas de enlaces del footer ────────────────────────────
const FOOTER_SECTIONS = [
  {
    title: "Plataforma",
    links: [
      { label: "Catálogo", href: "/catalogo" },
      { label: "Géneros", href: "/generos" },
      { label: "🏓 Cyber Pong", href: "/minijuego" },
      { label: "Torneos", href: "/torneos" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Sobre nosotros", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos de uso", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

// ─── Iconos de redes sociales ──────────────────────────────────
const SOCIAL_LINKS = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      id="main-footer"
      className="mt-auto border-t border-white/5 bg-[#09090b]"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Grid principal ── */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Columna de marca */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">ARKAD</span>
              <span className="text-[#b026ff]"> GAMES</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Tu portal definitivo de juegos gratuitos.
              Descubre, juega y compite con jugadores de todo el mundo.
            </p>
            {/* Iconos de redes sociales */}
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-lg p-2 text-zinc-500 transition-colors hover:text-[#b026ff] hover:bg-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de enlaces */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-[#00f0ff]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Línea de copyright ── */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Arkad Games. Todos los derechos reservados.
            Datos proporcionados por{" "}
            <a
              href="https://www.freetogame.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-[#00f0ff] transition-colors"
            >
              FreeToGame.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
