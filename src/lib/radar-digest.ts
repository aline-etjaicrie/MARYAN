import { createClient } from '@supabase/supabase-js';
import { listPublishedRadarSignals } from './radar-repository';
import { sendRadarDigestEmail } from './email';

export type RadarDigestFrequency = 'quotidien' | 'hebdomadaire';

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);
const CRON_SECRET = (import.meta.env.CRON_SECRET as string) || (process.env.CRON_SECRET as string);

type RadarProfile = {
  id: string;
  first_name: string | null;
  radar_email_frequency: RadarDigestFrequency | 'aucun' | null;
  last_radar_daily_sent_at: string | null;
  last_radar_weekly_sent_at: string | null;
};

export function isAuthorizedRadarDigestRequest(request: Request): boolean {
  if (!CRON_SECRET) return false;
  const authHeader = request.headers.get('Authorization') || '';
  return authHeader === `Bearer ${CRON_SECRET}`;
}

function toIsoDate(now: Date): string {
  return now.toISOString().slice(0, 10);
}

async function getDigestItems(frequency: RadarDigestFrequency) {
  const publishedSignals = await listPublishedRadarSignals();
  const sortedItems = publishedSignals.sort((a, b) => {
    const left = a.source.publishedAt || a.capturedAt;
    const right = b.source.publishedAt || b.capturedAt;
    return new Date(right).getTime() - new Date(left).getTime();
  });
  return sortedItems.slice(0, frequency === 'hebdomadaire' ? 5 : 3);
}

async function listAllUsers(supabase: ReturnType<typeof createClient>) {
  const users: Array<{ id: string; email: string | null }> = [];
  let page = 1;
  const perPage = 200;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

    users.push(...data.users.map((user) => ({ id: user.id, email: user.email || null })));

    if (!data.nextPage) break;
    page = data.nextPage;
  }

  return users;
}

export async function runRadarDigest(frequency: RadarDigestFrequency) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Configuration Supabase manquante.');
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const users = await listAllUsers(supabase);
  const userIds = users.map((user) => user.id);

  if (!userIds.length) {
    return { total: 0, sent: 0, skipped: 0 };
  }

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, first_name, radar_email_frequency, last_radar_daily_sent_at, last_radar_weekly_sent_at')
    .in('id', userIds);

  if (error) throw error;

  const profilesById = new Map<string, RadarProfile>(
    (profiles || []).map((profile) => [profile.id, profile as RadarProfile])
  );

  const today = toIsoDate(new Date());
  const items = await getDigestItems(frequency);

  let sent = 0;
  let skipped = 0;

  for (const user of users) {
    const profile = profilesById.get(user.id);
    if (!user.email || !profile) {
      skipped += 1;
      continue;
    }

    if (profile.radar_email_frequency !== frequency) {
      skipped += 1;
      continue;
    }

    const alreadySent = frequency === 'hebdomadaire'
      ? profile.last_radar_weekly_sent_at === today
      : profile.last_radar_daily_sent_at === today;

    if (alreadySent) {
      skipped += 1;
      continue;
    }

    await sendRadarDigestEmail({
      email: user.email,
      firstName: profile.first_name || undefined,
      frequency,
      items
    });

    const updatePayload =
      frequency === 'hebdomadaire'
        ? { last_radar_weekly_sent_at: today }
        : { last_radar_daily_sent_at: today };

    await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', user.id);

    sent += 1;
  }

  return {
    total: users.length,
    sent,
    skipped
  };
}
