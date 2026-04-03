-- Migration: admin_role
-- Date: 2026-04-02
-- Description: Création de la table admin_users pour contrôle d'accès admin

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  granted_at timestamptz DEFAULT now(),
  granted_by text
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Seuls les admins peuvent voir la table admin_users
CREATE POLICY "admin_users visible par admins" ON public.admin_users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid())
  );
