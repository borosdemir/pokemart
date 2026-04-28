/**
 * supabase.ts — Cliente de Supabase (Singleton).
 *
 * ¿Qué es Supabase?
 * Es un servicio en la nube que nos da una base de datos
 * y un sistema de autenticación (login/registro) LISTO para usar.
 *
 * ¿Qué es un Singleton?
 * Un patrón que asegura que solo exista UNA instancia del cliente.
 *
 * NOTA: Si las variables de entorno no están configuradas,
 * exportamos `supabase = null` y el AuthContext usará un
 * modo demo con localStorage. Así la app NUNCA crashea.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// ─── Verificación de credenciales ────────────────────────────
// Verificamos que las variables de entorno tengan valores reales
// (no vacíos, no placeholders).
export const isSupabaseConfigured =
  supabaseUrl.length > 0 &&
  supabaseAnonKey.length > 0 &&
  !supabaseUrl.includes("placeholder");

// ─── Cliente de Supabase ─────────────────────────────────────
// Solo creamos el cliente si las credenciales son válidas.
// Si no, exportamos `null` y el AuthContext usará localStorage.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
