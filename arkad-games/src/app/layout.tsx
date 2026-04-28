/**
 * layout.tsx — Layout raíz de la aplicación.
 *
 * ¿Qué es un "layout"?
 * Es una plantilla que envuelve a TODAS las páginas de la app.
 * Todo lo que pongas aquí (como el Navbar y Footer) aparecerá
 * en cada página sin necesidad de repetirlo.
 *
 * Piensa en él como el "marco" de un cuadro: el contenido cambia
 * (cada página es un cuadro diferente), pero el marco siempre
 * es el mismo.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// ─── Fuentes ───────────────────────────────────────────────────
// Next.js descarga y optimiza estas fuentes automáticamente.
// Las guardamos en variables CSS para usarlas en nuestros estilos.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── Metadata SEO ──────────────────────────────────────────────
// Estos datos son los que Google y las redes sociales leen
// para mostrar el título y la descripción de nuestra página.
export const metadata: Metadata = {
  title: "Arkad Games | Tu portal de juegos gratuitos",
  description:
    "Descubre los mejores juegos gratuitos. Explora nuestro catálogo con cientos de títulos para PC y navegador, desde shooters hasta MMORPGs.",
  keywords: ["juegos gratis", "free to play", "gaming", "PC games", "browser games"],
};

// ─── Componente Layout ─────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/*
        `min-h-full` + `flex flex-col` aseguran que el footer
        siempre quede abajo, incluso si el contenido es corto.
        El `<main>` con `flex-1` ocupa todo el espacio disponible.
      */}
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#ededed]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
