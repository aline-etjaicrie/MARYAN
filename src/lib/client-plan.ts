import { createClient, type Session } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function normalizePlan(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const plan = value.trim().toLowerCase();
  return plan || null;
}

export function getBrowserSupabase() {
  return supabase;
}

export async function getCurrentSessionPlan(): Promise<{ session: Session | null; plan: string | null }> {
  if (!supabase) {
    return { session: null, plan: null };
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return { session: null, plan: null };
  }

  let plan =
    normalizePlan(session.user.user_metadata?.plan) ||
    normalizePlan(session.user.app_metadata?.plan);

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', session.user.id)
      .single();

    plan = normalizePlan(profile?.plan) || plan;
  } catch {
    // Fallback silencieux sur les métadonnées auth si la table profiles est indisponible.
  }

  return { session, plan };
}
