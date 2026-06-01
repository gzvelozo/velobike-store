-- Enable Row Level Security on the orders table.
-- Without RLS, anyone with the public anon key has full CRUD access.

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop any permissive public/anon policies that may have been created
DROP POLICY IF EXISTS "Allow public access" ON public.orders;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.orders;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.orders;
DROP POLICY IF EXISTS "Enable update for all users" ON public.orders;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.orders;
DROP POLICY IF EXISTS "Allow anonymous access" ON public.orders;
DROP POLICY IF EXISTS "Public Access" ON public.orders;
DROP POLICY IF EXISTS "Allow public select" ON public.orders;
DROP POLICY IF EXISTS "Allow public insert" ON public.orders;
DROP POLICY IF EXISTS "Allow public update" ON public.orders;
DROP POLICY IF EXISTS "Allow public delete" ON public.orders;

-- Allow the service_role (server-side only) full access.
-- The Stripe webhook handler uses supabaseAdmin with this role.
DROP POLICY IF EXISTS "Service role full access" ON public.orders;
CREATE POLICY "Service role full access"
  ON public.orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
