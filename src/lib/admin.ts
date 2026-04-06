import { createClient } from '@supabase/supabase-js';

interface AdminContext {
  userId: string;
  email?: string;
}

export async function getAdminContext(userToken: string): Promise<AdminContext | null> {
  const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
  const supabaseServiceKey = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

  if (!supabaseUrl || !supabaseServiceKey || !userToken) return null;

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user } } = await supabase.auth.getUser(userToken);
    if (!user) return null;

    // Check profiles.plan = 'admin' OR admin_users table
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();

    if (profile?.plan === 'admin') {
      return {
        userId: user.id,
        email: user.email || undefined
      };
    }

    return null;
  } catch {
    return null;
  }
}

export async function isAdminUser(userToken: string): Promise<boolean> {
  return Boolean(await getAdminContext(userToken));
}
