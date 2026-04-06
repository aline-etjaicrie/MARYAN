import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { addContactToAudience, sendWelcomeEmail } from '../../lib/email';
import { ensureProfileRecord, extractFirstNameFromUser } from '../../lib/profiles';

export const prerender = false;

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

export const POST: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return json({ ok: false, error: 'Non authentifié.' }, 401);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user?.email) {
    return json({ ok: false, error: 'Token invalide.' }, 401);
  }

  try {
    const { created, profile } = await ensureProfileRecord(supabase, user);
    const firstName =
      (typeof profile?.first_name === 'string' && profile.first_name.trim()) ||
      extractFirstNameFromUser(user) ||
      undefined;

    const existingMetadata = user.user_metadata || {};
    const welcomeEmailSentAt =
      typeof existingMetadata.welcome_email_sent_at === 'string'
        ? existingMetadata.welcome_email_sent_at
        : null;

    if (!welcomeEmailSentAt) {
      await Promise.allSettled([
        sendWelcomeEmail(user.email, firstName),
        addContactToAudience(user.email, firstName)
      ]);

      await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...existingMetadata,
          welcome_email_sent_at: new Date().toISOString()
        }
      });
    }

    return json({
      ok: true,
      profileCreated: created,
      redirectTo: created ? '/bienvenue' : '/mon-compte'
    });
  } catch (error) {
    console.error('[account-bootstrap] bootstrap failed:', error);
    return json({ ok: false, error: 'Bootstrap compte impossible.' }, 500);
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
