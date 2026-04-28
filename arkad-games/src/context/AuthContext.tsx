/**
 * AuthContext.tsx — Contexto global de autenticación.
 *
 * ¿Qué es un Context en React?
 * Es un "canal de radio" global: cualquier componente puede
 * "sintonizarse" para recibir los datos de autenticación
 * sin necesidad de pasar props manualmente.
 *
 * Este Context tiene DOS modos de operación:
 *
 * 1. MODO SUPABASE (producción):
 *    Cuando las credenciales de Supabase están configuradas
 *    en el archivo .env.local, usa el servicio real.
 *
 * 2. MODO DEMO (desarrollo):
 *    Cuando NO hay credenciales, usa localStorage para
 *    simular el sistema de autenticación. Así puedes
 *    probar la app sin necesidad de crear un proyecto
 *    en Supabase. Los datos se guardan solo en tu navegador.
 */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// ─── Tipo del usuario (compatible con Supabase y modo demo) ──
interface AppUser {
  id: string;
  email: string;
  user_metadata: {
    display_name: string;
  };
}

// ─── Tipo del contexto ─────────────────────────────────────────
interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isDemo: boolean;                // true si estamos en modo demo
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Clave de localStorage para modo demo ────────────────────
const DEMO_USERS_KEY = "arkad_demo_users";
const DEMO_SESSION_KEY = "arkad_demo_session";

// ─── Provider ──────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemo = !isSupabaseConfigured;

  // ═══════════════════════════════════════════════════════════
  // MODO SUPABASE (producción)
  // ═══════════════════════════════════════════════════════════
  useEffect(() => {
    if (!isDemo && supabase) {
      // Obtener sesión actual
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            user_metadata: {
              display_name:
                session.user.user_metadata?.display_name ||
                session.user.email?.split("@")[0] ||
                "Jugador",
            },
          });
        }
        setLoading(false);
      });

      // Escuchar cambios de sesión
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            user_metadata: {
              display_name:
                session.user.user_metadata?.display_name ||
                session.user.email?.split("@")[0] ||
                "Jugador",
            },
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }

    // ═══════════════════════════════════════════════════════════
    // MODO DEMO (desarrollo con localStorage)
    // ═══════════════════════════════════════════════════════════
    if (isDemo) {
      try {
        const savedSession = localStorage.getItem(DEMO_SESSION_KEY);
        if (savedSession) {
          setUser(JSON.parse(savedSession));
        }
      } catch {
        // Si hay un error al leer localStorage, simplemente ignoramos
      }
      setLoading(false);
    }
  }, [isDemo]);

  // ─── Registro ──────────────────────────────────────────────
  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      if (!isDemo && supabase) {
        // Modo Supabase real
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: name } },
        });
        return { error: error?.message ?? null };
      }

      // Modo demo: guardar en localStorage
      try {
        const usersRaw = localStorage.getItem(DEMO_USERS_KEY);
        const users: Record<string, { password: string; name: string }> =
          usersRaw ? JSON.parse(usersRaw) : {};

        if (users[email]) {
          return { error: "Este correo ya está registrado." };
        }

        users[email] = { password, name };
        localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));

        const newUser: AppUser = {
          id: crypto.randomUUID(),
          email,
          user_metadata: { display_name: name },
        };
        localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(newUser));
        setUser(newUser);

        return { error: null };
      } catch {
        return { error: "Error al crear la cuenta." };
      }
    },
    [isDemo]
  );

  // ─── Login ─────────────────────────────────────────────────
  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!isDemo && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { error: error?.message ?? null };
      }

      // Modo demo
      try {
        const usersRaw = localStorage.getItem(DEMO_USERS_KEY);
        const users: Record<string, { password: string; name: string }> =
          usersRaw ? JSON.parse(usersRaw) : {};

        const userData = users[email];
        if (!userData || userData.password !== password) {
          return { error: "Correo o contraseña incorrectos." };
        }

        const loggedUser: AppUser = {
          id: crypto.randomUUID(),
          email,
          user_metadata: { display_name: userData.name },
        };
        localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(loggedUser));
        setUser(loggedUser);

        return { error: null };
      } catch {
        return { error: "Error al iniciar sesión." };
      }
    },
    [isDemo]
  );

  // ─── Logout ────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    if (!isDemo && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(DEMO_SESSION_KEY);
    }
    setUser(null);
  }, [isDemo]);

  return (
    <AuthContext.Provider
      value={{ user, loading, isDemo, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook personalizado ────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }
  return context;
}
