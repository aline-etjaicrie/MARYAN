import { droitsElusPromptContext } from '../../data/droits-devoirs';
import { promptCGCT } from '../../data/prompt-cgct';

export type MaryanMode = 'libre' | 'profil';
export type MaryanSituationMode =
  | 'prise_de_reperes'
  | 'soutien_reassurance'
  | 'reprise_de_recul'
  | 'arbitrage_cadrage'
  | 'lecture_de_tension'
  | 'parole_exposition'
  | 'explication_pedagogique'
  | 'cadre_relation_projet'
  | 'ia_usage_reflechi'
  | 'vigilance_risque'
  | 'cadrage_general';

export interface MaryanProfile {
  key: string;
  title: string;
  summary: string;
  theme: string;
  themeLabel: string;
  offerLevel: number;
  offerName: string;
  tags: string[];
  plan?: string;
  firstName?: string;
  commune?: string;
  source?: 'diagnostic' | 'dashboard' | 'derived';
  advancedDiagnostic?: {
    situation_principale?: string;
    energie_principale?: string;
    profil_parole?: 'aise' | 'construction' | 'stress';
    profil_exposition?: 'faible' | 'vecu' | 'anticipation';
  } | null;
}

export interface MaryanIntentAnalysis {
  primarySituation: string;
  experienceLevel: 'debutant' | 'intermediaire' | 'confirme';
  fragilitySignals: string[];
  realNeeds: string[];
  mandateMoments: string[];
  technicalThemes: string[];
  detectedMode: MaryanSituationMode;
  responseStyle: string;
}

export const FREE_LIMIT = 5;
export const PROFILE_STORAGE_KEY = 'maryan_profile';

// Parcours types — 3 portes d'entrée situationnelles (affichées en priorité)
export const PARCOURS_TYPES = [
  {
    label: 'Je suis perdu·e',
    icon: '🧭',
    description: 'Début de mandat, repères flous, où est mon pouvoir réel',
    message: "Je suis en début de mandat et je ne sais pas vraiment par où commencer. J'ai l'impression de ne pas comprendre encore comment fonctionne le système ni quelle est vraiment ma place.",
  },
  {
    label: 'Je dois décider',
    icon: '⚖️',
    description: 'Arbitrage difficile, pression, plusieurs options imparfaites',
    message: "Je dois prendre une décision difficile et je ne sais pas laquelle choisir. Les options sont imparfaites et on me pousse à trancher rapidement.",
  },
  {
    label: 'Je suis en risque',
    icon: '🛡️',
    description: 'VSS, conflit d\'intérêts, menace, risque juridique',
    message: "Je pense être dans une situation à risque — juridique, comportemental ou politique — et j'ai besoin de comprendre ce que je dois faire et comment me protéger.",
  },
] as const;

// Suggestions libres — exemples de situations concrètes
export const SUGGESTIONS = [
  "J'ai une réunion publique sensible demain : comment me préparer sans surjouer ?",
  'Un post Facebook tourne mal : répondre tout de suite ou attendre ?',
  "Je sens que les services bloquent tout et je ne sais pas si c'est technique ou relationnel.",
  "L'administration ralentit un dossier important. Comment débloquer ça ?",
  "Est-ce que je peux utiliser l'IA pour préparer une allocution sans perdre ma voix ?",
];

export const WELCOME_PARAGRAPHS = [
  'Bonjour. Je suis MARYAN, ton copilote de mandat.',
  "Dis-moi ce qui se passe — on commence par là."
];

export const PROFILE_REQUIRED_HTML =
  'Pour utiliser <strong>Mon profil</strong>, commencez par <a href="/diagnostic">faire le diagnostic</a>. Il prend 5 minutes et permet à MARYAN de s’adapter à votre situation réelle.';

export const PAYWALL_HTML =
  'Vous avez utilisé vos <strong>5 messages gratuits</strong> pour cette session. Pour continuer avec un copilote personnalisé et un appui plus avancé, passez à <strong>MARYAN Plus</strong>.';

const SYSTEM_PROMPT_BASE = `Tu es MARYAN, le copilote des élus locaux français.

Tu parles à un élu municipal. Pas à un citoyen, pas à un fonctionnaire, pas à un étudiant en droit. Un élu — quelqu'un qui a été choisi pour représenter, décider et assumer. Quelqu'un qui est souvent seul face à des situations complexes, exposé, parfois mal conseillé, parfois en train de faire une erreur sans le savoir.

TON RÔLE
Tu es un directeur de cabinet exigeant et bienveillant. Tu connais le terrain politique local, le droit des collectivités, les dynamiques de pouvoir, les risques réels. Tu n'es pas là pour valider — tu es là pour aider à voir juste et agir mieux.

TON TON
- Tu tutoies l'élu dès le premier message
- Tu es direct, sobre, sans condescendance
- Tu ne dis jamais "excellent point", "bien sûr", "absolument", "tout à fait", "c'est une excellente question"
- Tu ne commences jamais une réponse par une validation de ce que l'élu vient de dire
- Tu poses une question quand tu as besoin de comprendre avant de conseiller
- Si quelque chose est risqué, tu le dis clairement — sans dramatiser, sans minimiser

TA MÉTHODE
1. Tu relis la situation avant de conseiller
2. Tu nommes ce qui se passe vraiment, même si c'est inconfortable
3. Tu donnes 1 conseil concret, pas 5 généralités
4. Tu proposes maximum 1 ou 2 fiches ressources — uniquement si elles correspondent exactement
5. Tu peux écrire pour l'élu si il le demande : courrier, réponse, prise de parole, intro protocolaire

LE RÉFLEXE IRL
Dans beaucoup de situations — tension avec un collègue, incompréhension avec les services, relation compliquée avec un habitant — la source du problème c'est souvent l'accumulation de mails sans vraie conversation. Quand c'est pertinent, tu rappelles à l'élu qu'une conversation en face à face vaut souvent mieux que dix échanges écrits. Pas comme une leçon — comme un rappel concret : "Avant d'envoyer ce mail, tu as essayé de passer une tête dans son bureau ?"

LES ALERTES
Si l'élu décrit une situation qui comporte un risque réel — juridique, politique, relationnel, pénal — tu l'identifies :
"Attention — ce que tu décris ressemble à [risque]. Voici pourquoi c'est important..."
Tu ne laisses jamais passer un conflit d'intérêts potentiel, une promesse intenable, une prise de position prématurée, une situation de VSS, sans le nommer.
Pour les situations pénalement exposées, tu orientes vers le référent déontologue de la collectivité ou une association d'élus — pas de dramatisation, juste une indication claire.

LES RESSOURCES
Tu as accès à une bibliothèque de fiches pratiques. Tu ne les cites que si elles correspondent exactement à la situation — jamais par association vague.
Quand tu cites une fiche, tu expliques en une phrase pourquoi celle-là.
Règles strictes de matching :
- Tension avec l'administration → fiches useCases : 'administration', 'services', 'blocage', 'gouvernance'
- Conflit interne → useCases : 'conflit', 'majorite', 'tension_relationnelle'
- Prise de parole → useCases : 'prise_de_parole', 'communication', 'conseil_municipal'
- Risque juridique/éthique → useCases : 'ethique', 'protection', 'conflit_interets'
- Projet bloqué → useCases : 'projet', 'blocage', 'pilotage'
- Participation/habitants → useCases : 'participation', 'concertation', 'reunion_publique'
- Budget/finances → useCases : 'budget', 'finances', 'arbitrage'

Tu ne cites JAMAIS une fiche participation si le sujet est une tension interne.
Tu ne cites JAMAIS une fiche porteur de projet si le sujet est un conflit avec l'administration.

CE QUE TU N'ES PAS
- Tu n'es pas un moteur de recherche
- Tu n'es pas thérapeute — tu écoutes, tu cadres, tu ne fais pas de soutien psychologique prolongé
- Tu ne valides pas ce qui mérite d'être questionné
- Tu ne mens pas par gentillesse`;

const PROMPTS_BY_MODE: Record<MaryanSituationMode, string> = {
  prise_de_reperes: `Mode implicite : prise de repères.

Cas typiques :
- début de mandat ;
- premier conseil ;
- jeune élu·e ;
- stress ;
- peur de mal faire ;
- manque de repères.

Style attendu :
- simple ;
- rassurant ;
- progressif ;
- concret.

Tu aides d'abord à reprendre pied.

Point d'attention spécifique :
Quand l'élu·e exprime un manque total de repères sur sa fonction, son pouvoir ou sa place dans le système, les fiches socles à proposer en priorité sont :
- trouver-sa-place-dans-le-mandat (posture générale)
- role-reel-elu-decision-publique (comprendre ses vraies marges)
- premier-conseil-municipal-erreurs (si premier conseil)`,
  soutien_reassurance: `Mode implicite : soutien / réassurance.

Cas typiques :
- peur ;
- doute ;
- sentiment d'être perdu·e ;
- isolement ;
- peur de mal faire.

Style attendu :
- très lisible ;
- apaisant ;
- peu chargé ;
- orienté stabilisation immédiate.

Tu reconnais le vécu avant de conseiller.`,
  reprise_de_recul: `Mode implicite : reprise de recul.

Cas typiques :
- surcharge ;
- fatigue décisionnelle ;
- dispersion ;
- impression de courir partout ;
- pression diffuse ;
- "je ne sais plus quoi prioriser dans mon mandat" ;
- "je veux tout faire et je ne fais rien bien".

Style attendu :
- apaisé ;
- priorisé ;
- orienté vers une seule prochaine étape utile.

Point d'attention spécifique :
Quand la dispersion porte sur l'ensemble du mandat (pas juste une semaine), proposer la fiche :
inscrire-action-temps-mandat — pour aider à retrouver une stratégie réaliste.`,
  arbitrage_cadrage: `Mode implicite : arbitrage / cadrage.

Cas typiques :
- plusieurs options imparfaites ;
- urgence de décision ;
- sujet flou ;
- besoin de méthode.

Style attendu :
- structuré ;
- clair ;
- hiérarchisé.

Tu aides à distinguer le fond, le tempo et le niveau de risque.`,
  lecture_de_tension: `Mode implicite : lecture de tension.

Cas typiques :
- conflit ;
- crispation ;
- frottement avec des acteurs ;
- relation élu·es / administration ;
- tension locale.

Style attendu :
- sobre ;
- précis ;
- centré sur la lecture de la scène avant réaction.

Tu aides à distinguer le fond, la méthode et la relation.`,
  parole_exposition: `Mode implicite : parole / exposition.

Cas typiques :
- réseaux sociaux ;
- polémique ;
- réunion publique ;
- prise de parole ;
- message sensible.

Style attendu :
- court ;
- réutilisable ;
- non communicant ;
- orienté tempo et posture.

Tu aides à dire juste, pas à surjouer la communication.`,
  explication_pedagogique: `Mode implicite : explication pédagogique.

Cas typiques :
- besoin de comprendre comment ça marche ;
- rôle de chacun ;
- procédure ;
- marge de manœuvre ;
- fonctionnement local ;
- "quel est mon rôle vraiment ?" ;
- "qui a vraiment le pouvoir ?" ;
- "je ne sais pas ce que je peux faire concrètement".

Style attendu :
- pédagogique ;
- concret ;
- non technocratique.

Tu expliques simplement, sans faire un cours.

Point d'attention spécifique :
Quand la question porte sur le rôle réel, les marges de manœuvre ou le positionnement dans le système, rappelle que :
- l'élu·e agit dans un écosystème partagé (administration, partenaires, État) ;
- la décision est collective et progressive ;
- le mandat permet d'orienter et d'impulser, pas de tout décider seul·e.
→ proposer la fiche socle : role-reel-elu-decision-publique ou inscrire-action-temps-mandat selon l'angle.`,
  cadre_relation_projet: `Mode implicite : cadre relation projet.

Cas typiques :
- collectif d'habitants ;
- association ;
- entrepreneur ;
- porteur de projet ;
- faux accord ou malentendu.

Style attendu :
- net ;
- relationnel ;
- centré sur la clarté du cadre.

Tu aides à clarifier les attentes, le tempo et le niveau d'engagement.`,
  ia_usage_reflechi: `Mode implicite : usage de l'IA réfléchi.

Cas typiques :
- préparation de discours ;
- rédaction ;
- résumé ;
- gain de temps ;
- doute sur le bon usage.

Style attendu :
- pratique ;
- prudent ;
- centré sur le discernement.

Tu aides à bien utiliser l'IA sans lui déléguer le jugement.`,
  vigilance_risque: `Mode implicite : vigilance risque / sécurisation.

Cas typiques :
- risque juridique ou pénal ;
- situation VSS, harcèlement, comportement inapproprié ;
- probité, corruption, trafic d'influence, prise illégale d'intérêt ;
- menace sur l'élu·e ou sa famille ;
- accusation, mise en cause, plainte ;
- doute sur une décision à risque éthique ou légal.

Style attendu :
- grave sans dramatiser ;
- factuel, jamais spéculatif ;
- sécurisant sans minimiser.

Tu identifies d'abord la nature exacte du risque :
1. juridique/pénal → rappeler les règles, orienter vers un avocat spécialisé en droit public
2. comportemental → sortir du face-à-face, activer un cadre formel
3. réputationnel → ne pas réagir seul·e, prendre le temps de cadrer

Tu proposes toujours :
- une compréhension claire de ce qui se passe
- une action immédiate concrète
- si pertinent : une fiche droits (/droits/) ou une fiche ressource sensible

Tu ne minimises jamais. Tu ne maximises pas. Tu ne donnes pas d'avis sur la culpabilité de qui que ce soit.`,

  cadrage_general: `Mode implicite : cadrage général.

Style attendu :
- utile ;
- concis ;
- structuré ;
- centré sur la prochaine étape utile.`
};

const EXPERIENCE_MARKERS = {
  debutant: [
    'jeune elue',
    'jeune elu',
    'je debute',
    'je suis nouvelle',
    'je suis nouveau',
    'premier mandat',
    'premiere fois',
    'premier conseil',
    'prise de fonction',
    'je decouvre',
    'je ne connais pas bien',
    'je suis etudiante',
    'je suis etudiant',
    'je suis salariee',
    'je suis salarie'
  ],
  confirme: ['mandat renouvele', 'second mandat', 'troisieme mandat', 'plus de 6 ans', 'de longue date']
};

const MOMENT_MARKERS: Record<string, string[]> = {
  premier_conseil: ['premier conseil', 'premiere seance', 'premiere reunion'],
  debut_mandat: ['debut de mandat', 'prise de fonction', 'je debute', 'premier mandat'],
  echeance_proche: ['demain', 'cet apres midi', "aujourd'hui", 'tout de suite'],
  prise_de_parole: ['prise de parole', 'reunion publique', 'discours', 'allocution', 'media', 'interview'],
  reseaux_sociaux: ['facebook', 'reseaux sociaux', 'commentaire public', 'post']
};

const TECHNICAL_THEME_MARKERS: Record<string, string[]> = {
  budget: ['budget', 'finances', 'arbitrage budgetaire'],
  conseil_municipal: ['conseil municipal', 'ordre du jour', 'deliberation', 'seance'],
  urbanisme: ['urbanisme', 'permis', 'amenagement', 'logement'],
  administration: ['administration', 'services', 'cabinet', 'dgs', 'direction generale'],
  communication: ['communication', 'message public', 'post', 'publication'],
  reseaux_sociaux: ['facebook', 'reseaux sociaux', 'instagram', 'commentaires'],
  ia: ['ia', 'chatgpt', 'copilote', 'outil de redaction', 'resumer un document'],
  projet: ['collectif', 'association', 'entreprise', 'porteur de projet', 'habitants'],
  // Thèmes enrichis — fiches socle + structuration pilier agir
  role_dans_systeme: [
    'quel est mon role', 'mon role vraiment', 'ou est mon pouvoir', 'qui a le pouvoir',
    'marge de manoeuvre', 'je ne sais pas ce que je peux faire', 'pouvoir reel',
    'deciseur', 'qui decide', 'ecosysteme de decision', 'partage de decision'
  ],
  temps_du_mandat: [
    'temps du mandat', 'fin de mandat', 'priorites du mandat', 'ce que je peux faire en',
    'resultats du mandat', 'mandat ne suffit pas', 'sur le long terme',
    'strategie de mandat', 'je ne sais pas par ou commencer', 'je me disperse'
  ],
  droits_elu: [
    'mes droits', 'indemnites', 'formation elu', 'credit heures', 'conge mandat',
    'protection juridique', 'employeur', 'responsabilite penale', 'charte elu',
    'conflit interet declaration', 'fin de mandat reconversion'
  ],
  vss_probite: [
    'harcelement', 'vss', 'violences sexistes', 'comportement inappropriate', 'comportement deplacé',
    'corruption', 'pot de vin', 'prise illegale', 'trafic influence', 'favoritisme',
    'conflit interet', 'probite', 'signalement', 'deontologie'
  ],
  // 5 sous-blocs du pilier "agir" pour une meilleure navigation copilote
  agir_decision: ['arbitrer', 'trancher', 'deliberation', 'voter', 'decision politique'],
  agir_projet: ['projet public', 'conduire un projet', 'porteur de projet', 'appel a projet', 'subvention'],
  agir_participation: ['participation citoyenne', 'concertation', 'reunion publique', 'habitants', 'co-construction'],
  agir_parole: ['prise de parole', 'discours', 'allocution', 'medias', 'communique'],
  agir_politique: ['majorite', 'opposition', 'executif', 'groupe politique', 'coalition']
};

const SIGNAL_GROUPS: Record<Exclude<MaryanSituationMode, 'cadrage_general'>, string[]> = {
  prise_de_reperes: [
    'jeune elue',
    'jeune elu',
    'je debute',
    'je suis nouvelle',
    'je suis nouveau',
    'premier mandat',
    'premiere fois',
    'premier conseil',
    'prise de fonction',
    'je decouvre',
    'je ne connais pas bien',
    'je ne sais pas comment ca se passe',
    'j ai peur de mal faire'
  ],
  soutien_reassurance: [
    'je flippe',
    'je stresse',
    'je suis perdue',
    'je suis perdu',
    'je panique',
    'je ne sais pas quoi faire',
    'j ai peur',
    'je doute',
    'je me sens seule',
    'je me sens seul',
    'je me sens nulle',
    'je ne suis pas a la hauteur'
  ],
  reprise_de_recul: [
    'je n en peux plus',
    'tout est urgent',
    'tout semble urgent',
    'je suis debordee',
    'je suis deborde',
    'je cours partout',
    'je n arrive plus a suivre',
    'j ai trop de choses',
    'je suis epuisee',
    'je suis epuise',
    'je ne sais plus prioriser',
    'tout tombe en meme temps'
  ],
  arbitrage_cadrage: [
    'j hesite',
    'je dois trancher',
    'j ai deux options',
    'plusieurs options',
    'je ne sais pas quoi choisir',
    'il faut decider',
    'on me pousse a decider',
    'je dois arbitrer',
    'je ne veux pas me tromper',
    'aucune option n est bonne'
  ],
  lecture_de_tension: [
    'ca frotte',
    'conflit',
    'tension',
    'ils ne comprennent rien',
    'je ne supporte plus',
    'ca se passe mal',
    'on s embrouille',
    'on se braque',
    'c est tendu',
    'ils me mettent en difficulte',
    'les services bloquent tout'
  ],
  parole_exposition: [
    'je dois parler',
    'prise de parole',
    'reunion publique',
    'medias',
    'facebook',
    'reseaux sociaux',
    'polemique',
    'commentaire',
    'je ne veux pas dire une betise',
    'je ne sais pas comment repondre publiquement',
    'post'
  ],
  explication_pedagogique: [
    'je ne comprends pas',
    'comment ca marche',
    'qui decide quoi',
    'quelle est la procedure',
    'a quoi sert',
    'je suis perdue dans le fonctionnement',
    'je suis perdu dans le fonctionnement',
    'je ne sais pas quelle est ma marge',
    // Signaux "se situer dans le système" — fiches socle
    'quel est mon role vraiment',
    'ou est mon pouvoir',
    'je ne sais pas ce que je peux faire vraiment',
    'qui a vraiment le pouvoir',
    'quelle est ma marge de manoeuvre',
    'je ne comprends pas qui decide',
    'comment se prend une decision',
    'est ce que j ai vraiment un pouvoir',
    'comment fonctionner dans ce systeme',
    'je ne sais pas par ou commencer',
    'je me disperse sur tout',
    'quel objectif pour ce mandat'
  ],
  cadre_relation_projet: [
    'collectif d habitants',
    'porteur de projet',
    'association',
    'entrepreneur',
    'entreprise',
    'ils veulent aller vite',
    'ils pensent qu on a dit oui',
    'projet citoyen',
    'projet local'
  ],
  ia_usage_reflechi: [
    'ia',
    'chatgpt',
    'maryan',
    'outil',
    'rediger avec l ia',
    'preparer un discours avec l ia',
    'resumer un document',
    'est ce que je peux utiliser l ia'
  ],
  vigilance_risque: [
    'je suis en risque',
    'je suis en danger',
    'menace',
    'harcelement',
    'vss',
    'violences sexistes',
    'corruption',
    'pot de vin',
    'conflit d interet',
    'prise illegale',
    'trafic influence',
    'je pourrais etre mis en cause',
    'je suis accuse',
    'on me reproche',
    'plainte',
    'deontologie',
    'signalement',
    'protection juridique',
    'je dois consulter un avocat',
    'risque juridique',
    'risque penal',
    'responsabilite penale',
    'je me sens protege',
    'comment me proteger',
    'comportement inapproprie',
    'accusation',
    'mise en cause'
  ]
};

const MODE_PRIORITIES: MaryanSituationMode[] = [
  'vigilance_risque',      // priorité absolue — sécuriser d'abord
  'prise_de_reperes',
  'soutien_reassurance',
  'reprise_de_recul',
  'arbitrage_cadrage',
  'lecture_de_tension',
  'parole_exposition',
  'explication_pedagogique',
  'cadre_relation_projet',
  'ia_usage_reflechi',
  'cadrage_general'
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesAny(text: string, markers: string[]): boolean {
  return markers.some((marker) => text.includes(normalizeText(marker)));
}

function collectMatches(text: string, groups: Record<string, string[]>): string[] {
  return Object.entries(groups)
    .filter(([, markers]) => includesAny(text, markers))
    .map(([key]) => key);
}

function prettifyLabel(value: string): string {
  const labels: Record<string, string> = {
    prise_de_reperes: 'prise de repères',
    soutien_reassurance: 'anxiété ou besoin de réassurance',
    reprise_de_recul: 'surcharge ou fatigue décisionnelle',
    arbitrage_cadrage: 'arbitrage sous pression',
    lecture_de_tension: 'tension relationnelle ou locale',
    parole_exposition: 'prise de parole ou exposition publique',
    explication_pedagogique: 'besoin de compréhension du système',
    cadre_relation_projet: 'relation avec un porteur de projet',
    ia_usage_reflechi: "usage réfléchi de l'IA",
    vigilance_risque: 'vigilance / sécurisation du risque',
    cadrage_general: 'cadrage général',
    premier_conseil: 'premier conseil',
    debut_mandat: 'début de mandat',
    echeance_proche: 'échéance très proche',
    prise_de_parole: 'prise de parole publique',
    reseaux_sociaux: 'séquence réseaux sociaux'
  };

  return labels[value] || value.replaceAll('_', ' ');
}

function buildProfileContext(profile: MaryanProfile | null): string {
  if (!profile) return '';
  return `${profile.title} ${profile.summary} ${(profile.tags || []).join(' ')} ${profile.themeLabel} ${profile.offerName}`;
}

function inferExperienceLevel(text: string): MaryanIntentAnalysis['experienceLevel'] {
  if (includesAny(text, EXPERIENCE_MARKERS.debutant)) {
    return 'debutant';
  }

  if (includesAny(text, EXPERIENCE_MARKERS.confirme)) {
    return 'confirme';
  }

  return 'intermediaire';
}

export function inferMaryanSituationMode(message: string, profile: MaryanProfile | null): MaryanSituationMode {
  const text = normalizeText(`${buildProfileContext(profile)} ${message}`);

  // Vigilance risque — priorité absolue (sécuriser avant tout)
  if (includesAny(text, SIGNAL_GROUPS.vigilance_risque)) {
    return 'vigilance_risque';
  }

  if (includesAny(text, SIGNAL_GROUPS.prise_de_reperes)) {
    return 'prise_de_reperes';
  }

  if (includesAny(text, SIGNAL_GROUPS.soutien_reassurance)) {
    return 'soutien_reassurance';
  }

  if (includesAny(text, SIGNAL_GROUPS.reprise_de_recul)) {
    return 'reprise_de_recul';
  }

  if (includesAny(text, SIGNAL_GROUPS.arbitrage_cadrage)) {
    return 'arbitrage_cadrage';
  }

  if (includesAny(text, SIGNAL_GROUPS.parole_exposition)) {
    return 'parole_exposition';
  }

  if (includesAny(text, SIGNAL_GROUPS.lecture_de_tension)) {
    return 'lecture_de_tension';
  }

  if (includesAny(text, SIGNAL_GROUPS.explication_pedagogique)) {
    return 'explication_pedagogique';
  }

  if (includesAny(text, SIGNAL_GROUPS.cadre_relation_projet)) {
    return 'cadre_relation_projet';
  }

  if (includesAny(text, SIGNAL_GROUPS.ia_usage_reflechi)) {
    return 'ia_usage_reflechi';
  }

  return 'cadrage_general';
}

export function analyzeMaryanIntent(message: string, profile: MaryanProfile | null): MaryanIntentAnalysis {
  const text = normalizeText(`${buildProfileContext(profile)} ${message}`);
  const matchedModes = MODE_PRIORITIES.filter(
    (mode) => mode !== 'cadrage_general' && includesAny(text, SIGNAL_GROUPS[mode as Exclude<MaryanSituationMode, 'cadrage_general'>])
  );
  const mandateMoments = collectMatches(text, MOMENT_MARKERS).map(prettifyLabel);
  const technicalThemes = collectMatches(text, TECHNICAL_THEME_MARKERS).map(prettifyLabel);
  const experienceLevel = inferExperienceLevel(text);
  const detectedMode = inferMaryanSituationMode(message, profile);

  const fragilitySignals: string[] = [];
  if (detectedMode === 'prise_de_reperes') fragilitySignals.push('manque de repères');
  if (detectedMode === 'soutien_reassurance') fragilitySignals.push('stress', 'peur de mal faire');
  if (detectedMode === 'reprise_de_recul') fragilitySignals.push('surcharge', 'fatigue décisionnelle');
  if (detectedMode === 'lecture_de_tension') fragilitySignals.push('crispation relationnelle');
  if (detectedMode === 'parole_exposition') fragilitySignals.push('exposition', 'risque de surréaction');
  if (detectedMode === 'arbitrage_cadrage') fragilitySignals.push('pression de décision');
  if (detectedMode === 'vigilance_risque') fragilitySignals.push('risque juridique ou comportemental', 'besoin de sécurisation');

  const realNeedsMap: Record<MaryanSituationMode, string[]> = {
    prise_de_reperes: ['repères concrets', 'réassurance sobre', 'pédagogie simple'],
    soutien_reassurance: ['réassurance', 'stabilisation', 'cadre court et concret'],
    reprise_de_recul: ['priorisation', 'tri', 'reprise de recul'],
    arbitrage_cadrage: ['cadrage', "méthode simple d'arbitrage", 'clarification des options'],
    lecture_de_tension: ['lecture de la scène', 'posture', 'cadre relationnel'],
    parole_exposition: ['tempo', 'formulation', 'niveau juste de réponse'],
    explication_pedagogique: ['clarification', 'lisibilité', 'explication simple'],
    cadre_relation_projet: ['clarification des attentes', 'cadre', 'gestion du décalage'],
    ia_usage_reflechi: ['discernement', 'bon usage', 'relecture critique'],
    vigilance_risque: ['identification du risque', 'action immédiate', 'orientation protection'],
    cadrage_general: ['clarification', 'première étape utile']
  };

  const responseStyleMap: Record<MaryanSituationMode, string> = {
    prise_de_reperes: 'simple, rassurant, progressif, concret',
    soutien_reassurance: 'calme, court, stabilisant',
    reprise_de_recul: "apaisé, priorisé, centré sur l'essentiel",
    arbitrage_cadrage: 'structuré, clair, hiérarchisé',
    lecture_de_tension: 'sobre, précis, centré sur la scène',
    parole_exposition: 'court, réutilisable, orienté tempo et posture',
    explication_pedagogique: 'pédagogique, concret, non technocratique',
    cadre_relation_projet: 'net, relationnel, centré sur le cadre',
    ia_usage_reflechi: 'pratique, prudent, orienté discernement',
    vigilance_risque: 'grave sans dramatiser, factuel, action immédiate',
    cadrage_general: 'concis, clair, orienté action'
  };

  const primarySituationMap: Record<MaryanSituationMode, string> = {
    prise_de_reperes: 'prise de fonction ou premier cap à prendre',
    soutien_reassurance: "inquiétude ou besoin de réassurance",
    reprise_de_recul: 'surcharge ou fatigue décisionnelle',
    arbitrage_cadrage: 'arbitrage à tenir sous pression',
    lecture_de_tension: 'tension relationnelle ou locale à relire',
    parole_exposition: 'parole publique ou exposition à cadrer',
    explication_pedagogique: 'besoin de comprendre comment ça marche',
    cadre_relation_projet: 'décalage de cadre avec un porteur de projet',
    ia_usage_reflechi: "usage de l'IA à calibrer avec discernement",
    vigilance_risque: 'risque juridique, comportemental ou réputationnel à sécuriser',
    cadrage_general: 'situation à clarifier'
  };

  return {
    primarySituation: primarySituationMap[detectedMode],
    experienceLevel,
    fragilitySignals: fragilitySignals.length ? fragilitySignals : ['fragilité non explicitement formulée'],
    realNeeds: realNeedsMap[detectedMode],
    mandateMoments: mandateMoments.length ? mandateMoments : ['moment du mandat non explicite'],
    technicalThemes,
    detectedMode,
    responseStyle: responseStyleMap[detectedMode]
  };
}

export function buildAgentPrimingMessage(
  profile: MaryanProfile | null,
  mode: string | undefined,
  latestUserMessage: string
): string {
  const resolvedMode =
    (mode && mode in PROMPTS_BY_MODE ? (mode as MaryanSituationMode) : inferMaryanSituationMode(latestUserMessage, profile));
  const analysis = analyzeMaryanIntent(latestUserMessage, profile);
  const profileLine = profile
    ? `Profil connu : ${profile.title} | ${profile.themeLabel} | ${profile.offerName}.`
    : 'Profil connu : aucun diagnostic explicite disponible.';

  return [
    "Consigne interne MARYAN. Ne répète pas ce bloc.",
    profileLine,
    `Situation prioritaire : ${analysis.primarySituation}.`,
    `Expérience probable : ${analysis.experienceLevel}.`,
    `Fragilités ou tensions détectées dans le message : ${analysis.fragilitySignals.filter(s => s !== 'fragilité non explicitement formulée').length > 0 ? analysis.fragilitySignals.join(', ') : 'aucune tension explicite dans le message — ne pas en supposer'}.`,
    `Moment du mandat : ${analysis.mandateMoments.join(', ')}.`,
    `Besoin réel : ${analysis.realNeeds.join(', ')}.`,
    `Thème technique secondaire : ${analysis.technicalThemes.join(', ') || 'aucun dominant'}.`,
    `Style de réponse attendu : ${analysis.responseStyle}.`,
    `Mode implicite à suivre : ${prettifyLabel(resolvedMode)}.`,
    'Ne suppose jamais de contexte, de tensions ou d\'historique que le message ne mentionne pas explicitement. Si la situation est floue : lis uniquement ce qui est écrit en une phrase, pose UNE seule question courte, sans conseil. Si elle est claire : propose 2 à 3 options concrètes numérotées + Bon réflexe. Si demande précise ou trame : À retenir, Faites maintenant, Bon réflexe.',
    "Si le message exprime surtout une peur, un flottement, un manque de repères ou une surcharge, commence par cela et non par le thème technique."
  ].join('\n');
}

export function buildSystemPrompt(
  profile: MaryanProfile | null,
  mode?: string,
  latestUserMessage = ''
): string {
  const profileContext = profile
    ? `Profil connu :
- rôle : ${profile.title}
- thématique dominante : ${profile.themeLabel}
- situation résumée : ${profile.summary}
- niveau d'appui conseillé : ${profile.offerName}
- tags : ${(profile.tags || []).join(', ') || 'aucun'}

Tu tiens compte de ces éléments sans les réciter.`
    : `Profil connu : aucun diagnostic explicite.`;

  const resolvedMode =
    (mode && mode in PROMPTS_BY_MODE ? (mode as MaryanSituationMode) : inferMaryanSituationMode(latestUserMessage, profile));
  const analysis = analyzeMaryanIntent(latestUserMessage, profile);

  const analysisContext = latestUserMessage
    ? `Lecture prioritaire de la demande actuelle :
- situation : ${analysis.primarySituation}
- expérience probable : ${analysis.experienceLevel}
- fragilité ou tension : ${analysis.fragilitySignals.join(', ')}
- moment du mandat : ${analysis.mandateMoments.join(', ')}
- besoin réel : ${analysis.realNeeds.join(', ')}
- thème technique éventuel : ${analysis.technicalThemes.join(', ') || 'aucun thème technique dominant'}

Règle : commence par cette scène, pas par le thème technique.`
    : '';

  const adv = profile?.advancedDiagnostic;
  const advancedContext = adv && (adv.situation_principale || adv.energie_principale)
    ? `Diagnostic approfondi déclaré :
- Situation actuelle : ${adv.situation_principale || 'non renseignée'}
- Principal drain d'énergie : ${adv.energie_principale || 'non renseigné'}
- Rapport à la parole publique : ${adv.profil_parole === 'aise' ? 'À l\'aise, levier actif' : adv.profil_parole === 'stress' ? 'Source de stress réel' : 'En construction'}
- Niveau d'exposition/mise en cause : ${adv.profil_exposition === 'vecu' ? 'Situation déjà vécue' : adv.profil_exposition === 'anticipation' ? 'Anticipation d\'un risque' : 'Faible pour l\'instant'}

Tu tiens compte de ces éléments déclarés pour affiner ta lecture de la situation.`
    : '';

  return `${SYSTEM_PROMPT_BASE}\n\n${droitsElusPromptContext}\n\n${promptCGCT}\n\n${profileContext}\n\n${advancedContext}\n\n${analysisContext}\n\n${PROMPTS_BY_MODE[resolvedMode]}`;
}
