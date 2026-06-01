import { createClient } from "@supabase/supabase-js";

// Server-side client using service_role key — bypasses RLS for trusted operations.
// NEVER expose this key to the browser (no NEXT_PUBLIC_ prefix).
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Public client for browser-safe read operations (respects RLS policies).
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
