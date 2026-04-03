-- Migration: glossaire_moderation
-- Date: 2026-04-02
-- Description: Ajout du champ statut pour modération des contributions glossaire

ALTER TABLE public.glossaire_contributions
ADD COLUMN IF NOT EXISTS statut text NOT NULL DEFAULT 'en_attente'
  CHECK (statut IN ('en_attente', 'valide', 'rejete'));

CREATE INDEX IF NOT EXISTS idx_glossaire_contributions_statut
  ON public.glossaire_contributions(statut);
