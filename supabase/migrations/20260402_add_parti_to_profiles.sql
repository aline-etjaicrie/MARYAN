-- Migration: add_parti_to_profiles
-- Date: 2026-04-02
-- Description: Ajout des champs parti_id et parti_label à la table profiles

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS parti_id text,
ADD COLUMN IF NOT EXISTS parti_label text;
