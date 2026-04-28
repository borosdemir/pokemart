/**
 * ClientProviders.tsx — Wrapper para los Providers del lado del cliente.
 *
 * ¿Por qué necesitamos esto?
 * En Next.js, el layout.tsx es un Server Component por defecto.
 * Pero AuthProvider usa hooks de React (useState, useEffect),
 * que solo funcionan en Client Components.
 *
 * La solución es crear este componente "puente":
 * - Él es un Client Component ("use client").
 * - El layout lo importa y le pasa los `children`.
 * - Así el layout sigue siendo Server Component (más rápido)
 *   y la autenticación funciona en el cliente.
 */

"use client";

import { AuthProvider } from "@/context/AuthContext";
import type { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
