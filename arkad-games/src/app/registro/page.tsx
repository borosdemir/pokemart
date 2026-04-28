/**
 * /registro/page.tsx — Página de registro de usuarios.
 *
 * Formulario con nombre, email y contraseña.
 * Al registrarse exitosamente → redirige al mini-juego Pong
 * como "regalo de bienvenida".
 */

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones locales antes de enviar a Supabase
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, name);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      // ¡Registro exitoso! → Al mini-juego de bienvenida
      router.push("/minijuego");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Título */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white">
            Únete a Arkad Games
          </h1>
          <p className="mt-2 text-zinc-500">
            Crea tu cuenta y recibe un regalo de bienvenida 🎮
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

          {/* Campo Nombre */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-zinc-400"
            >
              Nombre de jugador
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre de jugador"
              className="w-full rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#b026ff]/50"
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              className="w-full rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#b026ff]/50"
            />
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1.5 block text-sm font-medium text-zinc-400"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              className="w-full rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#b026ff]/50"
            />
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            disabled={loading}
            id="register-btn"
            className="flex w-full items-center justify-center rounded-xl bg-[#b026ff] py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#9b1fe0] hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
                </svg>
                Creando cuenta...
              </span>
            ) : (
              "Crear cuenta 🚀"
            )}
          </button>

          {/* Link a login */}
          <p className="text-center text-sm text-zinc-500">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#00f0ff] hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
