-- Migration: radar_preferences
-- Date: 2026-04-06
-- Description: Préférences d'envoi Radar et traçage du dernier digest

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS radar_email_frequency text NOT NULL DEFAULT 'aucun'
  CHECK (radar_email_frequency IN ('quotidien', 'hebdomadaire', 'aucun')),
ADD COLUMN IF NOT EXISTS radar_email_updated_at timestamptz,
ADD COLUMN IF NOT EXISTS last_radar_daily_sent_at date,
ADD COLUMN IF NOT EXISTS last_radar_weekly_sent_at date;

CREATE INDEX IF NOT EXISTS idx_profiles_radar_email_frequency
  ON public.profiles(radar_email_frequency);
