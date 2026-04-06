-- Migration: profile_context
-- Date: 2026-04-06
-- Description: Renforce la persistance du profil utilisateur, du diagnostic et du suivi abonnement.

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS diagnostic_profile text,
ADD COLUMN IF NOT EXISTS diagnostic_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS diagnostic_completed_at timestamptz,
ADD COLUMN IF NOT EXISTS stripe_customer_id text,
ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
ADD COLUMN IF NOT EXISTS stripe_price_id text,
ADD COLUMN IF NOT EXISTS plan_updated_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_profiles_diagnostic_profile
  ON public.profiles(diagnostic_profile);

CREATE INDEX IF NOT EXISTS idx_profiles_plan
  ON public.profiles(plan);

CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id
  ON public.profiles(stripe_customer_id);
