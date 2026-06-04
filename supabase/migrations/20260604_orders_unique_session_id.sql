-- Ensure idempotent webhook processing: prevent duplicate orders
-- from concurrent Stripe webhook deliveries
ALTER TABLE public.orders
ADD CONSTRAINT orders_stripe_session_id_key UNIQUE (stripe_session_id);
