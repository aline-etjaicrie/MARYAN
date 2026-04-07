import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

// Ce endpoint est appelé pour persister le diagnostic dans le profil
export const POST: APIRoute = async ({ request }) => {
  try {
    const diagData = await request.json();
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
    const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'mock-key';
    
    if (token) {
       const supabase = createClient(supabaseUrl, supabaseAnonKey, {
          global: {
             headers: { Authorization: `Bearer ${token}` }
          }
       });
       
       const { data: { user } } = await supabase.auth.getUser(token);
       
       if (user) {
          // On peut stocker les réponses du diag dans une colonne jsonb 'diagnostic_data'
          const { error } = await supabase.from('profiles').update({ diagnostic_data: diagData }).eq('id', user.id);
          if (error) {
             return new Response(JSON.stringify({ error: error.message }), { status: 400 });
          }
       }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("API PROFILE-CONTEXT ERROR:", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
