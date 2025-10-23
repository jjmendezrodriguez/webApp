// Configuration file for Supabase database connection
// This file provides typed access to Supabase client for the entire application

/**
 * Environment variables schema for Supabase
 * Required variables in .env file:
 * - VITE_SUPABASE_URL: Your Supabase project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase anonymous/public API key
 */

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
} as const;

/**
 * Validates that all required Supabase environment variables are present
 * @throws Error if any required variable is missing
 */
export function validateSupabaseConfig(): void {
  if (!supabaseConfig.url) {
    throw new Error(
      "VITE_SUPABASE_URL is not defined in environment variables",
    );
  }

  if (!supabaseConfig.anonKey) {
    throw new Error(
      "VITE_SUPABASE_ANON_KEY is not defined in environment variables",
    );
  }
}
