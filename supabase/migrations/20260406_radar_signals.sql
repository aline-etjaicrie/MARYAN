-- Migration: radar_signals
-- Date: 2026-04-06
-- Description: Catalogue éditorial Radar avec source vérifiable, statuts et diagnostics de publication

CREATE TABLE IF NOT EXISTS public.radar_signals (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'review', 'ready', 'published', 'archived')),
  captured_at date NOT NULL,
  title text NOT NULL,
  type text NOT NULL
    CHECK (type IN ('loi', 'décret', 'jurisprudence', 'signal', 'article de presse')),
  level text NOT NULL
    CHECK (level IN ('national', 'interco', 'local')),
  theme text NOT NULL,
  is_priority boolean NOT NULL DEFAULT false,
  priority_rank integer,
  importance_score integer NOT NULL DEFAULT 0
    CHECK (importance_score BETWEEN 0 AND 5),
  mandate_score integer NOT NULL DEFAULT 0
    CHECK (mandate_score BETWEEN 0 AND 5),
  source_kind text NOT NULL
    CHECK (source_kind IN ('external', 'internal_maryan')),
  proof_status text NOT NULL
    CHECK (proof_status IN ('verified', 'internal', 'unverified')),
  source_title text,
  source_publisher text NOT NULL,
  source_url text,
  source_domain text,
  source_published_at date,
  source_checked_at date,
  source_document_type text,
  fact_summary text NOT NULL DEFAULT '',
  public_summary text NOT NULL DEFAULT '',
  analysis_why_important text,
  analysis_who_is_concerned text,
  analysis_mandate_impact text,
  analysis_watchpoints text,
  analysis_actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  prompt_key text,
  internal_notes text,
  reviewer_name text,
  published_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (priority_rank IS NULL OR priority_rank >= 1)
);

CREATE INDEX IF NOT EXISTS idx_radar_signals_status
  ON public.radar_signals(status);

CREATE INDEX IF NOT EXISTS idx_radar_signals_proof_status
  ON public.radar_signals(proof_status);

CREATE INDEX IF NOT EXISTS idx_radar_signals_source_kind
  ON public.radar_signals(source_kind);

CREATE INDEX IF NOT EXISTS idx_radar_signals_priority
  ON public.radar_signals(is_priority DESC, priority_rank ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS idx_radar_signals_dates
  ON public.radar_signals(source_published_at DESC NULLS LAST, captured_at DESC);

ALTER TABLE public.radar_signals ENABLE ROW LEVEL SECURITY;
