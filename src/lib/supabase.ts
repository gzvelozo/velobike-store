import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-side client using service_role key — bypasses RLS for trusted operations.
// NEVER expose this key to the browser (no NEXT_PUBLIC_ prefix).
// Lazy-initialized to avoid build-time crashes when env vars aren't available.
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
    }
    _supabaseAdmin = createClient(url, key);
  }
  return _supabaseAdmin;
}

// Public client for browser-safe read operations (respects RLS policies).
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
