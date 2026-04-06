import type { SupabaseClient, User } from '@supabase/supabase-js';

function metadataString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function extractFirstNameFromUser(user: User): string | null {
  const directFirstName =
    metadataString(user.user_metadata?.first_name) ||
    metadataString(user.user_metadata?.given_name);

  if (directFirstName) return directFirstName;

  const fullName =
    metadataString(user.user_metadata?.full_name) ||
    metadataString(user.user_metadata?.name);

  if (!fullName) return null;

  return fullName.split(/\s+/)[0] || null;
}

export async function ensureProfileRecord(supabase: SupabaseClient, user: User) {
  const { data: existingProfile, error: selectError } = await supabase
    .from('profiles')
    .select('id, first_name, plan, radar_email_frequency')
    .eq('id', user.id)
    .maybeSingle();

  if (selectError) throw selectError;
  if (existingProfile) {
    return { created: false, profile: existingProfile };
  }

  const partiId =
    metadataString(user.user_metadata?.parti_id) ||
    metadataString(user.user_metadata?.political_label);
  const partiLabel =
    metadataString(user.user_metadata?.parti_label) ||
    partiId;
  const firstName = extractFirstNameFromUser(user);

  const payload: Record<string, unknown> = {
    id: user.id,
    plan: 'gratuit',
    radar_email_frequency: 'aucun'
  };

  if (firstName) payload.first_name = firstName;
  if (partiId) payload.parti_id = partiId;
  if (partiLabel) payload.parti_label = partiLabel;

  const { data: insertedProfile, error: insertError } = await supabase
    .from('profiles')
    .insert(payload)
    .select('id, first_name, plan, radar_email_frequency')
    .single();

  if (!insertError) {
    return { created: true, profile: insertedProfile };
  }

  if (insertError.code === '23505') {
    const { data: concurrentProfile, error: concurrentError } = await supabase
      .from('profiles')
      .select('id, first_name, plan, radar_email_frequency')
      .eq('id', user.id)
      .single();

    if (concurrentError) throw concurrentError;
    return { created: false, profile: concurrentProfile };
  }

  throw insertError;
}
