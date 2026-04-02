-- Migration: create_copilote_sessions
-- Date: 2026-04-02
-- Description: Table de persistance des sessions copilote avec RLS

CREATE TABLE public.copilote_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type text DEFAULT 'copilote' CHECK (session_type IN ('copilote', 'cr_reunion', 'analyse')),
  titre text,
  messages jsonb NOT NULL DEFAULT '[]',
  diagnostic_key text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.copilote_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sessions visibles par leur propriétaire"
  ON public.copilote_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_copilote_sessions_user_id ON public.copilote_sessions(user_id);
CREATE INDEX idx_copilote_sessions_type ON public.copilote_sessions(session_type);
