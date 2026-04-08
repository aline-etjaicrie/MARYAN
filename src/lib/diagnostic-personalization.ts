import type { DiagnosticProfile, MaryanResource } from '../data/types';

type DiagnosticSeed = {
  diagnostic_key?: string | null;
  diagnostic_label?: string | null;
  profile?: string | null;
  tension?: string | null;
  lack?: string | null;
  feeling?: string | null;
  seniority?: string | null;
  vigilance?: string | null;
  role?: string | null;
  recommended_slugs?: string[] | null;
};

const DIAGNOSTIC_PROFILES: DiagnosticProfile[] = [
  'mandat_recent',
  'arbitrage',
  'isolement',
  'surcharge',
  'exposition',
  'tension_relationnelle',
  'besoin_methode',
  'prise_de_parole',
  'gouvernance'
];

export const LEGACY_DIAGNOSTIC_TO_PROFILE: Record<string, DiagnosticProfile> = {
  'vigilance-institutionnelle': 'besoin_methode',
  'isolation-politique': 'isolement',
  'surcharge-operationnelle': 'surcharge',
  'mandat-recent': 'mandat_recent',
  'tension-relationnelle': 'tension_relationnelle'
};

export const DIAGNOSTIC_LABELS: Record<DiagnosticProfile, string> = {
  mandat_recent: 'Prise de repères',
  arbitrage: 'Arbitrage à clarifier',
  isolement: 'Isolement dans le mandat',
  surcharge: 'Surcharge opérationnelle',
  exposition: 'Exposition publique',
  tension_relationnelle: 'Tension relationnelle',
  besoin_methode: 'Besoin de méthode',
  prise_de_parole: 'Prise de parole à sécuriser',
  gouvernance: 'Gouvernance à clarifier'
};

export const DIAGNOSTIC_ACCROCHES: Record<DiagnosticProfile, string> = {
  mandat_recent: 'Vous débutez votre mandat. MARYAN vous aide à prendre vos repères plus vite et plus clairement.',
  arbitrage: 'Vous avez besoin de mieux cadrer les décisions sensibles avant d’avancer.',
  isolement: 'Vous portez trop de choses seul·e. MARYAN vous aide à retrouver des relais et du recul.',
  surcharge: 'Vous êtes en surcharge. MARYAN vous aide à prioriser et à revenir à l’essentiel.',
  exposition: 'Votre mandat est exposé. MARYAN vous aide à tenir une ligne claire dans les séquences visibles.',
  tension_relationnelle: 'Des tensions relationnelles compliquent votre mandat. MARYAN vous aide à relire la situation et à agir plus justement.',
  besoin_methode: 'Vous avez besoin d’un cadre plus lisible pour comprendre, décider et agir dans le bon ordre.',
  prise_de_parole: 'La parole compte beaucoup dans votre situation. MARYAN vous aide à préparer vos prises de position avec plus de justesse.',
  gouvernance: 'Votre point de friction se situe dans la conduite des dossiers et les relations avec l’administration ou l’exécutif.'
};

export const DIAGNOSTIC_INSTRUCTIONS: Record<string, string> = {
  'vigilance-institutionnelle': "L'utilisateur·ice est particulièrement sensible à ses droits formels en tant qu'élu·e. Insiste sur les textes réglementaires, les droits statutaires et les procédures officielles.",
  'isolation-politique': "L'utilisateur·ice souffre d'isolement politique. Insiste sur les stratégies de coalition, les alliances possibles, et les leviers collectifs.",
  'surcharge-operationnelle': "L'utilisateur·ice est en surcharge. Va à l'essentiel, sois très concis, donne des réponses courtes et actionnables. Pas de développements inutiles.",
  'mandat-recent': "L'utilisateur·ice débute ou consolide encore ses repères de mandat. Aide à clarifier les rôles, les circuits de décision et les premiers points d'appui.",
  'tension-relationnelle': "L'utilisateur·ice traverse des tensions relationnelles. Aide à relire la situation avant de réagir, à distinguer le fond de la relation et à retrouver du cadre.",
  mandat_recent: "L'utilisateur·ice a besoin de prendre ses repères dans le mandat. Clarifie qui fait quoi, les marges de manœuvre et les premiers points d'appui utiles.",
  arbitrage: "L'utilisateur·ice a besoin de cadrer plus clairement les décisions sensibles. Aide à distinguer urgence, arbitrage réel et tempo juste.",
  isolement: "L'utilisateur·ice se sent isolé·e dans son mandat. Aide à retrouver des relais, des appuis et des stratégies moins solitaires.",
  surcharge: "L'utilisateur·ice est en surcharge. Va à l'essentiel, hiérarchise, et propose des réponses sobres, courtes et actionnables.",
  exposition: "L'utilisateur·ice traverse une séquence visible ou exposée. Aide à tenir une ligne claire, à préparer la parole et à éviter la sur-réaction.",
  tension_relationnelle: "L'utilisateur·ice fait face à des tensions relationnelles. Aide à relire les dynamiques en présence et à agir avec plus de justesse.",
  besoin_methode: "L'utilisateur·ice a besoin d'un cadre de méthode. Structure les réponses en étapes simples, lisibles et directement réutilisables.",
  prise_de_parole: "L'utilisateur·ice a besoin de sécuriser une parole ou une prise de position. Aide à trouver le bon ton, le bon tempo et la bonne formulation.",
  gouvernance: "L'utilisateur·ice rencontre une friction de gouvernance ou d'interface avec l'administration. Aide à clarifier rôles, circuits, arbitrages et commandes utiles."
};

const DEFAULT_RECOMMENDED_SLUGS_BY_PROFILE: Record<DiagnosticProfile, string[]> = {
  mandat_recent: [
    'trouver-sa-place-dans-le-mandat',
    'qui-decide-quoi-dans-la-collectivite',
    'le-conseil-municipal-a-quoi-il-sert-vraiment'
  ],
  arbitrage: [
    'arbitrer-une-decision-sensible',
    'cadrer-un-dossier-avant-qu-il-ne-t-echappe',
    'prioriser-quand-tout-semble-urgent'
  ],
  isolement: [
    'trouver-sa-place-dans-le-mandat',
    'se-rendre-utile-sans-se-disperser',
    'seul-contre-tous-reunion'
  ],
  surcharge: [
    'prioriser-quand-tout-semble-urgent',
    'gerer-la-fatigue-decisionnelle',
    'gerer-boite-mail-elu'
  ],
  exposition: [
    'preparer-une-prise-de-parole-delicate',
    'se-positionner-sans-se-griller',
    'repondre-a-une-situation-sensible-sans-sur-reagir'
  ],
  tension_relationnelle: [
    'gerer-une-tension-dans-la-majorite-ou-l-executif',
    'dire-non-sans-casser-la-relation',
    'repondre-a-une-situation-sensible-sans-sur-reagir'
  ],
  besoin_methode: [
    'comment-se-prend-une-decision-dans-une-commune',
    'cadrer-un-dossier-avant-qu-il-ne-t-echappe',
    'pourquoi-certains-dossiers-avancent-lentement'
  ],
  prise_de_parole: [
    'preparer-une-prise-de-parole-delicate',
    'prendre-la-parole-en-conseil',
    'ecrire-discours-elu'
  ],
  gouvernance: [
    'qui-decide-quoi-dans-la-collectivite',
    'administration-qui-freine',
    'faire-remonter-sujet-executif'
  ]
};

const TENSION_TO_PROFILE: Record<string, DiagnosticProfile> = {
  administration: 'gouvernance',
  conflit: 'tension_relationnelle',
  exposition: 'exposition',
  sollicitations: 'surcharge',
  flou: 'arbitrage',
  duree: 'besoin_methode'
};

const LACK_TO_PROFILE: Record<string, DiagnosticProfile> = {
  recul: 'arbitrage',
  cadre: 'besoin_methode',
  relais: 'isolement',
  mots: 'prise_de_parole',
  priorites: 'surcharge'
};

const FEELING_TO_PROFILE: Record<string, DiagnosticProfile> = {
  seul: 'isolement',
  surcharge: 'surcharge',
  expose_sans_prise: 'exposition'
};

const VIGILANCE_TO_PROFILE: Record<string, DiagnosticProfile> = {
  decision: 'arbitrage',
  maniere: 'prise_de_parole',
  relation: 'tension_relationnelle',
  tempo: 'exposition',
  impact: 'exposition'
};

const ROLE_TO_PROFILE: Record<string, DiagnosticProfile> = {
  maire: 'gouvernance',
  adjoint: 'gouvernance',
  interco: 'gouvernance'
};

function isDiagnosticProfile(value: unknown): value is DiagnosticProfile {
  return typeof value === 'string' && DIAGNOSTIC_PROFILES.includes(value as DiagnosticProfile);
}

export function resolveDiagnosticProfile(seed: DiagnosticSeed | null | undefined): DiagnosticProfile | null {
  if (!seed) return null;

  if (isDiagnosticProfile(seed.profile)) return seed.profile;
  if (isDiagnosticProfile(seed.diagnostic_key)) return seed.diagnostic_key;

  const legacyProfile = seed.diagnostic_key ? LEGACY_DIAGNOSTIC_TO_PROFILE[seed.diagnostic_key] : null;
  if (legacyProfile) return legacyProfile;

  if (seed.tension && TENSION_TO_PROFILE[seed.tension]) return TENSION_TO_PROFILE[seed.tension];
  if (seed.lack && LACK_TO_PROFILE[seed.lack]) return LACK_TO_PROFILE[seed.lack];
  if (seed.feeling && FEELING_TO_PROFILE[seed.feeling]) return FEELING_TO_PROFILE[seed.feeling];
  if (seed.vigilance && VIGILANCE_TO_PROFILE[seed.vigilance]) return VIGILANCE_TO_PROFILE[seed.vigilance];
  if (seed.role && ROLE_TO_PROFILE[seed.role]) return ROLE_TO_PROFILE[seed.role];
  if (seed.seniority === 'moins1an') return 'mandat_recent';

  return null;
}

export function getDiagnosticLabel(seed: DiagnosticSeed | null | undefined): string {
  if (seed?.diagnostic_label) return seed.diagnostic_label;
  const profile = resolveDiagnosticProfile(seed);
  return profile ? DIAGNOSTIC_LABELS[profile] : '';
}

export function getDiagnosticAccroche(seed: DiagnosticSeed | null | undefined): string {
  const profile = resolveDiagnosticProfile(seed);
  return profile ? DIAGNOSTIC_ACCROCHES[profile] : 'MARYAN adapte ses réponses à votre profil.';
}

export function getCanonicalDiagnosticKey(seed: DiagnosticSeed | null | undefined): string {
  const profile = resolveDiagnosticProfile(seed);
  return profile || seed?.diagnostic_key || '';
}

export function getRecommendedSlugsForProfile(
  resources: Pick<MaryanResource, 'slug' | 'diagnosticProfiles' | 'priority'>[],
  profile: DiagnosticProfile | null,
  limit = 3
): string[] {
  if (!profile) return [];
  if (!resources.length) return (DEFAULT_RECOMMENDED_SLUGS_BY_PROFILE[profile] || []).slice(0, limit);

  return resources
    .filter((resource) => resource.diagnosticProfiles.includes(profile))
    .sort((a, b) => {
      if (a.priority === 'haute' && b.priority !== 'haute') return -1;
      if (a.priority !== 'haute' && b.priority === 'haute') return 1;
      return 0;
    })
    .slice(0, limit)
    .map((resource) => resource.slug);
}

export function buildStoredDiagnosticEntry<T extends DiagnosticSeed>(
  seed: T | null | undefined,
  resources: Pick<MaryanResource, 'slug' | 'diagnosticProfiles' | 'priority'>[] = []
) {
  const safeSeed = (seed || {}) as T;
  const profile = resolveDiagnosticProfile(safeSeed);
  const recommendedSlugs = safeSeed.recommended_slugs?.length
    ? safeSeed.recommended_slugs
    : getRecommendedSlugsForProfile(resources, profile);

  return {
    ...safeSeed,
    profile,
    diagnostic_key: getCanonicalDiagnosticKey(safeSeed),
    diagnostic_label: getDiagnosticLabel(safeSeed),
    recommended_slugs: recommendedSlugs
  };
}
