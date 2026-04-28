import type { NextConfig } from "next";

/**
 * next.config.ts — Configuración de Next.js.
 *
 * ¿Por qué necesitamos esto?
 * Next.js bloquea por seguridad las imágenes que vienen
 * de servidores externos. Como usamos imágenes de FreeToGame,
 * debemos decirle explícitamente: "confía en este dominio".
 *
 * `remotePatterns` es la forma recomendada de hacerlo.
 * Le decimos: "acepta imágenes que vengan de www.freetogame.com".
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.freetogame.com",
        pathname: "/g/**",
      },
    ],
  },
};

export default nextConfig;
