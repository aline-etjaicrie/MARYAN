import type { MaryanProfile } from './config';

interface DemoReplyInput {
  message: string;
  profile: MaryanProfile | null;
}

const LEGAL_KEYWORDS = [
  'juridique',
  'contentieux',
  'recours',
  'plainte',
  'diffamation',
  'mise en cause',
  'marché public',
  'procédure',
  'tribunal',
  'avocat'
];

const PUBLIC_SPEAKING_KEYWORDS = [
  'réunion',
  'réunion publique',
  'conseil municipal',
  'discours',
  'prise de parole',
  'intervention',
  'débat',
  'parler',
  'préparer'
];

const DIGITAL_KEYWORDS = [
  'réseaux sociaux',
  'facebook',
  'linkedin',
  'instagram',
  'post',
  'publier',
  'commentaire',
  'critique',
  'réponse'
];

const INSTITUTIONAL_KEYWORDS = [
  'délégation',
  'adjoint',
  'conseiller',
  'maire',
  'administration',
  'services',
  'compétence',
  'qui fait quoi',
  'collectivité',
  'intercommunalité'
];

function hasKeyword(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function profileIntro(profile: MaryanProfile | null): string {
  if (!profile) {
    return '';
  }

  return `<p><strong>Je garde en tête votre profil :</strong> ${escapeHtml(profile.title)} · ${escapeHtml(profile.themeLabel)}.</p>`;
}

function legalReply(profile: MaryanProfile | null): string {
  return `
    ${profileIntro(profile)}
    <p>Sur ce type de sujet, je préfère être très clair : <strong>là il vous faut un vrai expert</strong>.</p>
    <p>Dès qu’on touche à un risque juridique, contentieux, mise en cause personnelle ou procédure sensible, MARYAN peut vous aider à cadrer votre message, mais pas à remplacer un avocat, votre DGS ou un expert métier compétent.</p>
    <ul>
      <li>sécurisez d’abord les faits et la chronologie ;</li>
      <li>évitez toute prise de parole improvisée ;</li>
      <li>faites relire votre position par la bonne personne avant diffusion.</li>
    </ul>
    <p>Si vous voulez, je peux quand même vous aider à préparer une <strong>prise de parole prudente</strong> pendant que vous sollicitez cet appui expert.</p>
  `;
}

function speakingReply(profile: MaryanProfile | null): string {
  return `
    ${profileIntro(profile)}
    <p>Pour une prise de parole de mandat, je vous conseille une trame très simple : <strong>enjeu, cap, preuve, ouverture</strong>.</p>
    <ul>
      <li><strong>Enjeu :</strong> de quoi parle-t-on concrètement pour les habitants ?</li>
      <li><strong>Cap :</strong> quelle décision ou quelle ligne tenez-vous ?</li>
      <li><strong>Preuve :</strong> qu’est-ce qui montre que ce choix est fondé ?</li>
      <li><strong>Ouverture :</strong> quelle suite proposez-vous ?</li>
    </ul>
    <p><strong>Version directement réutilisable :</strong></p>
    <p>« Je veux être simple sur un point : notre rôle n’est pas seulement de commenter la situation, mais de prendre une décision utile, compréhensible et tenable dans la durée. Ce choix peut faire débat, mais il répond à un besoin concret et nous l’assumons clairement. »</p>
    <p>Si vous me donnez le contexte exact, je peux vous rédiger une <strong>version sur-mesure en 45 secondes</strong>, prête à dire en réunion publique ou en conseil municipal.</p>
  `;
}

function digitalReply(profile: MaryanProfile | null): string {
  return `
    ${profileIntro(profile)}
    <p>Sur les réseaux, le bon réflexe n’est pas de répondre vite. C’est de répondre <strong>sobrement, clairement et sans surjeu</strong>.</p>
    <ul>
      <li>nommez le sujet sans vous braquer ;</li>
      <li>rappelez le cadre ou l’objectif ;</li>
      <li>refermez proprement, sans relancer la polémique.</li>
    </ul>
    <p><strong>Proposition réutilisable :</strong></p>
    <p>« Je comprends que ce sujet suscite des réactions. Mon rôle est de rendre la décision lisible, d’en assumer le cap et de répondre aux questions utiles sans alimenter les malentendus. Je continuerai donc à expliquer ce choix de manière simple et factuelle. »</p>
    <p>Point de vigilance : si la séquence monte fort ou touche à une mise en cause personnelle, <strong>il vaut mieux sortir du temps réel</strong> et préparer une réponse plus cadrée.</p>
  `;
}

function institutionalReply(profile: MaryanProfile | null): string {
  return `
    ${profileIntro(profile)}
    <p>Quand un élu se sent flou sur son rôle, il faut souvent remettre de l’ordre dans <strong>qui prépare, qui décide, qui porte, qui explique</strong>.</p>
    <ul>
      <li><strong>Les services</strong> instruisent, sécurisent et préparent ;</li>
      <li><strong>les élus</strong> arbitrent, priorisent et assument politiquement ;</li>
      <li><strong>le maire ou l’exécutif</strong> tient la ligne d’ensemble ;</li>
      <li><strong>la parole publique</strong> doit ensuite rendre tout cela compréhensible.</li>
    </ul>
    <p>Si votre besoin est de mieux situer votre délégation, je peux vous proposer un <strong>cadre simple de lecture de votre place</strong>, ou une formulation pour expliquer votre rôle à vos administrés.</p>
  `;
}

function defaultReply(profile: MaryanProfile | null, message: string): string {
  return `
    ${profileIntro(profile)}
    <p>Votre question touche à un vrai sujet de mandat. Pour vous être utile sans vous noyer sous l’explication, je vous propose cette base :</p>
    <ul>
      <li>clarifier le sujet exact et le niveau de sensibilité ;</li>
      <li>identifier ce que vous devez comprendre, dire ou décider ;</li>
      <li>produire une réponse directement réutilisable, pas seulement théorique.</li>
    </ul>
    <p><strong>Ma première lecture :</strong> ${escapeHtml(message)}</p>
    <p>Si vous voulez, je peux maintenant faire l’une de ces trois choses : <strong>vous proposer une réponse publique</strong>, <strong>vous aider à préparer votre prise de parole</strong>, ou <strong>vous donner un plan d’action très concret</strong>.</p>
  `;
}

export function generateDemoReply({ message, profile }: DemoReplyInput): string {
  const normalized = message.toLowerCase();

  if (hasKeyword(normalized, LEGAL_KEYWORDS)) {
    return legalReply(profile);
  }

  if (hasKeyword(normalized, DIGITAL_KEYWORDS)) {
    return digitalReply(profile);
  }

  if (hasKeyword(normalized, PUBLIC_SPEAKING_KEYWORDS)) {
    return speakingReply(profile);
  }

  if (hasKeyword(normalized, INSTITUTIONAL_KEYWORDS)) {
    return institutionalReply(profile);
  }

  return defaultReply(profile, message);
}
