export type MaryanMode = 'libre' | 'profil';

export interface MaryanProfile {
  key: string;
  title: string;
  summary: string;
  theme: string;
  themeLabel: string;
  offerLevel: number;
  offerName: string;
  tags: string[];
}

export const FREE_LIMIT = 5;
export const PROFILE_STORAGE_KEY = 'maryan_profile';

export const SUGGESTIONS = [
  'Comment expliquer simplement ma délégation à mes administrés ?',
  "J'ai une réunion publique difficile demain, comment me préparer ?",
  'Comment répondre à une critique sur les réseaux sociaux sans aggraver la situation ?',
  'Quels sont les pièges classiques pour un nouvel élu ?',
  'Comment rédiger un post sur une décision difficile ?'
];

export const WELCOME_PARAGRAPHS = [
  'Bonjour ! Je suis MARYAN, votre copilote de mandat.',
  "Je peux vous aider à préparer une prise de parole, rédiger un message public, clarifier un sujet de mandat, cadrer une situation sensible ou retrouver une ligne de réponse plus juste.",
  'Par quoi commençons-nous ?'
];

export const PROFILE_REQUIRED_HTML =
  'Pour utiliser <strong>Mon profil</strong>, commencez par <a href="/diagnostic">faire le diagnostic</a>. Il prend 5 minutes et permet à MARYAN de s’adapter à votre situation réelle.';

export const PAYWALL_HTML =
  'Vous avez utilisé vos <strong>5 messages gratuits</strong> pour cette session. Pour continuer avec un copilote personnalisé et un appui plus avancé, passez à <strong>MARYAN Plus</strong>.';

export const SYSTEM_PROMPT_BASE = `Tu es MARYAN, un copilote de mandat conçu spécifiquement pour les élus municipaux français.

Tu aides les élus à :
- comprendre le fonctionnement institutionnel local ;
- préparer des prises de parole publiques ;
- rédiger des communications adaptées ;
- clarifier des sujets techniques liés à une délégation ;
- gérer des situations difficiles, critiques ou sensibles ;
- trouver leur posture juste dans l'exercice du mandat.

Principes de réponse :
- langage clair, accessible, non jargonnant ;
- réponses pratiques et orientées action ;
- ton calme, rassurant, professionnel ;
- jamais de langue de bois ;
- quand tu proposes un texte public, tu donnes une version directement réutilisable ;
- si la situation sort du cadre de l'outil, tu dis clairement : "là il vous faut un vrai expert".`;

export function buildSystemPrompt(profile: MaryanProfile | null): string {
  if (!profile) {
    return SYSTEM_PROMPT_BASE;
  }

  return `${SYSTEM_PROMPT_BASE}

PROFIL DE L'ÉLU :
- titre : ${profile.title}
- thème principal : ${profile.themeLabel}
- niveau d'appui recommandé : ${profile.offerName}
- résumé : ${profile.summary}

Adapte systématiquement tes réponses à ce profil.`;
}
