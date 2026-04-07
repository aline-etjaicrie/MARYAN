-- Migration: create_documents
-- Date: 2026-04-07
-- Description: Table de stockage des documents générés par MARYAN (comptes rendus, synthèses, notes)

CREATE TABLE public.documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('compte-rendu', 'document', 'note')),
  titre text NOT NULL DEFAULT 'Document sans titre',
  contenu text NOT NULL DEFAULT '',
  source_nom text,
  dossier text NOT NULL DEFAULT 'Documents',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Documents visibles par leur propriétaire"
  ON public.documents FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_documents_user_id ON public.documents(user_id);
CREATE INDEX idx_documents_type ON public.documents(type);
CREATE INDEX idx_documents_dossier ON public.documents(dossier);
CREATE INDEX idx_documents_created_at ON public.documents(created_at DESC);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
