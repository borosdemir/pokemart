import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Performance: muestra fuente del sistema mientras carga
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ─── SEO: Viewport optimizado ──────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ─── SEO: Metadata global ──────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Arkad Games | Tu portal de juegos gratuitos",
    template: "%s | Arkad Games",
  },
  description:
    "Descubre los mejores juegos gratuitos para PC y navegador. Explora cientos de títulos: shooters, MMORPGs, MOBAs y mucho más. ¡Todo gratis!",
  keywords: [
    "juegos gratis",
    "free to play",
    "gaming",
    "PC games",
    "browser games",
    "MMORPG",
    "shooter",
    "battle royale",
    "juegos online",
    "juegos gratuitos",
  ],
  authors: [{ name: "Arkad Games" }],
  creator: "Arkad Games",
  metadataBase: new URL("https://arkad-games.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Arkad Games",
    title: "Arkad Games | Tu portal de juegos gratuitos",
    description:
      "Descubre los mejores juegos gratuitos para PC y navegador. ¡Cientos de títulos esperándote!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arkad Games",
    description: "Tu portal de juegos gratuitos. Descubre, juega y compite.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

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
      <head>
        {/* JSON-LD: Datos estructurados para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Arkad Games",
              url: "https://arkad-games.vercel.app",
              description: "Portal de juegos gratuitos para PC y navegador",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://arkad-games.vercel.app/catalogo?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#ededed]">
        <ClientProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
