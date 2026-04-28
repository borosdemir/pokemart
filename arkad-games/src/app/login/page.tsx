/**
 * /login/page.tsx — Página de inicio de sesión.
 *
 * Formulario con email y contraseña que usa Supabase Auth.
 * Si el login es exitoso, redirige al catálogo.
 */

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir recarga de la página
    setError(null);
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      // Login exitoso → redirigir al catálogo
      router.push("/catalogo");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Título */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white">
            Bienvenido de vuelta
          </h1>
          <p className="mt-2 text-zinc-500">
            Inicia sesión en tu cuenta de Arkad Games
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/5 bg-[#18181b] p-8 space-y-5"
        >
          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-zinc-400"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#b026ff]/50"
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-zinc-400"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#b026ff]/50"
            />
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            disabled={loading}
            id="login-btn"
            className="flex w-full items-center justify-center rounded-xl bg-[#b026ff] py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#9b1fe0] hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          {/* Link a registro */}
          <p className="text-center text-sm text-zinc-500">
            ¿No tienes cuenta?{" "}
            <Link
              href="/registro"
              className="font-semibold text-[#00f0ff] hover:underline"
            >
              Regístrate gratis
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
