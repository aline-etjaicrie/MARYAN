import { createClient } from '@supabase/supabase-js';

export async function isAdminUser(userToken: string): Promise<boolean> {
  const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
  const supabaseServiceKey = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

  if (!supabaseUrl || !supabaseServiceKey || !userToken) return false;

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user } } = await supabase.auth.getUser(userToken);
    if (!user) return false;

    // Check profiles.plan = 'admin' OR admin_users table
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();

    return profile?.plan === 'admin';
  } catch {
    return false;
  }
}
