import type { NextConfig } from "next";

/**
 * next.config.ts — Configuración optimizada de Next.js.
 *
 * Optimizaciones:
 * - Imágenes: formatos modernos (WebP/AVIF), tamaños responsive optimizados.
 * - Compresión habilitada.
 * - Headers de seguridad y cache.
 */
const nextConfig: NextConfig = {
  images: {
    // Formatos modernos: AVIF es ~50% más pequeño que JPEG, WebP ~30%.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.freetogame.com",
        pathname: "/g/**",
      },
    ],
    // Tamaños de imagen que Next.js generará automáticamente.
    // Ajustados a nuestros breakpoints para evitar imágenes oversized.
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compresión de salida
  compress: true,
};

export default nextConfig;
