-- Migration: prompt_studio
-- Date: 2026-04-05
-- Description: Studio interne de prompts MARYAN avec historique de versions

CREATE TABLE IF NOT EXISTS public.maryan_prompt_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL,
  segment text NOT NULL DEFAULT 'studio' CHECK (segment IN ('studio', 'master')),
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  variables jsonb NOT NULL DEFAULT '[]'::jsonb,
  body text NOT NULL,
  is_custom boolean NOT NULL DEFAULT false,
  source_prompt_id uuid REFERENCES public.maryan_prompt_entries(id) ON DELETE SET NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.maryan_prompt_versions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt_id uuid NOT NULL REFERENCES public.maryan_prompt_entries(id) ON DELETE CASCADE,
  version_number integer NOT NULL,
  snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(prompt_id, version_number)
);

CREATE INDEX IF NOT EXISTS idx_maryan_prompt_entries_category
  ON public.maryan_prompt_entries(category);

CREATE INDEX IF NOT EXISTS idx_maryan_prompt_entries_segment
  ON public.maryan_prompt_entries(segment);

CREATE INDEX IF NOT EXISTS idx_maryan_prompt_entries_is_custom
  ON public.maryan_prompt_entries(is_custom);

CREATE INDEX IF NOT EXISTS idx_maryan_prompt_versions_prompt
  ON public.maryan_prompt_versions(prompt_id, version_number DESC);

ALTER TABLE public.maryan_prompt_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maryan_prompt_versions ENABLE ROW LEVEL SECURITY;
