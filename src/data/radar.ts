import type {
  RadarProofStatus,
  RadarSignal,
  RadarSignalLevel,
  RadarSignalType,
  RadarSourceKind
} from '../lib/radar-contract';

export type MaryanRadarType = RadarSignalType;
export type MaryanRadarLevel = RadarSignalLevel;
export type MaryanRadarProofStatus = RadarProofStatus;

export const maryanRadarTypes: MaryanRadarType[] = [
  'loi',
  'décret',
  'jurisprudence',
  'signal',
  'article de presse'
];

export const maryanRadarLevels: MaryanRadarLevel[] = ['national', 'interco', 'local'];

export const maryanRadarThemes = [
  'Compétences',
  'Gouvernance',
  'Procédure',
  'Statut de l’élu',
  'Subventions',
  'Probité',
  'Prise de parole'
] as const;

export type MaryanRadarTheme = (typeof maryanRadarThemes)[number];

export interface MaryanRadarItem extends RadarSignal {
  promptKey: string | null;
}

interface CreateRadarSignalInput {
  id: string;
  slug: string;
  capturedAt: string;
  title: string;
  sourcePublisher: string;
  type: MaryanRadarType;
  level: MaryanRadarLevel;
  theme: MaryanRadarTheme;
  promptKey: string;
  factSummary: string;
  publicSummary: string;
  importanceScore: number;
  mandateScore: number;
  whyImportant: string;
  whoIsConcerned: string;
  mandateImpact: string;
  watchpoints: string;
  actions: string[];
  sourceKind?: RadarSourceKind;
  status?: MaryanRadarItem['status'];
  isPriority?: boolean;
  priorityRank?: number | null;
  sourceDocumentType?: string | null;
}

function inferSourceKind(sourcePublisher: string): RadarSourceKind {
  return sourcePublisher === 'Signal MARYAN' ? 'internal_maryan' : 'external';
}

function createRadarSignal(input: CreateRadarSignalInput): MaryanRadarItem {
  const sourceKind = input.sourceKind ?? inferSourceKind(input.sourcePublisher);

  return {
    id: input.id,
    slug: input.slug,
    status: input.status ?? 'review',
    capturedAt: input.capturedAt,
    title: input.title,
    type: input.type,
    level: input.level,
    theme: input.theme,
    isPriority: input.isPriority ?? false,
    priorityRank: input.priorityRank ?? null,
    importanceScore: input.importanceScore,
    mandateScore: input.mandateScore,
    sourceKind,
    proofStatus: sourceKind === 'internal_maryan' ? 'internal' : 'unverified',
    source: {
      title: null,
      publisher: input.sourcePublisher,
      url: null,
      domain: null,
      publishedAt: null,
      checkedAt: null,
      documentType: input.sourceDocumentType ?? input.type
    },
    factSummary: input.factSummary,
    publicSummary: input.publicSummary,
    analysis: {
      whyImportant: input.whyImportant,
      whoIsConcerned: input.whoIsConcerned,
      mandateImpact: input.mandateImpact,
      watchpoints: input.watchpoints,
      actions: input.actions
    },
    promptKey: input.promptKey,
    internalNotes: null,
    reviewerName: null,
    publishedAt: null
  };
}

export const maryanRadarItems: MaryanRadarItem[] = [
  createRadarSignal({
    id: 'radar-convocations-delais',
    slug: 'convocations-delais-forme-securite-politique',
    capturedAt: '2026-04-05',
    title: 'Convocations et délais : la forme reste une question de sécurité politique',
    sourcePublisher: 'DGCL',
    type: 'décret',
    level: 'local',
    theme: 'Procédure',
    promptKey: 'prompt_loi',
    isPriority: true,
    priorityRank: 1,
    factSummary:
      'Sur les assemblées locales, une erreur de forme peut faire basculer un débat politique sur un terrain purement procédural.',
    publicSummary:
      'Sur les assemblées locales, une erreur de forme peut faire basculer un débat politique sur un terrain purement procédural.',
    importanceScore: 5,
    mandateScore: 5,
    whyImportant:
      'Sur les assemblées locales, une fragilité de procédure suffit à déplacer le débat du fond vers la forme. C’est un sujet de méthode autant que de sécurité politique.',
    whoIsConcerned:
      'Les exécutifs, les secrétariats d’assemblée, les services juridiques et les groupes politiques sont concernés.',
    mandateImpact:
      'Il faut traiter les convocations, délais et pièces comme un bloc de sécurisation. Le bon réflexe est de vérifier la chaîne administrative avant la séquence politique.',
    watchpoints:
      'Les pratiques locales trop installées peuvent masquer des angles morts. Les périodes chargées augmentent le risque d’approximation.',
    actions: [
      'Vérifier les délais et les pièces diffusées.',
      'Identifier le point de contrôle interne avant envoi.',
      'Repartir d’une check-list simple sur les assemblées sensibles.'
    ]
  }),
  createRadarSignal({
    id: 'radar-absences-elus',
    slug: 'autorisations-absence-elus-salaries',
    capturedAt: '2026-04-05',
    title: 'Autorisations d’absence : mieux cadrer les demandes des élu·es salariés',
    sourcePublisher: 'Journal officiel',
    type: 'loi',
    level: 'national',
    theme: 'Statut de l’élu',
    promptKey: 'prompt_loi',
    factSummary:
      'Le sujet touche directement l’exercice du mandat et la relation avec l’employeur. Une lecture imprécise crée vite de la tension.',
    publicSummary:
      'Le sujet touche directement l’exercice du mandat et la relation avec l’employeur. Une lecture imprécise crée vite de la tension.',
    importanceScore: 5,
    mandateScore: 4,
    whyImportant:
      'Le sujet touche directement l’exercice du mandat et la relation avec l’employeur. Une lecture imprécise crée vite de la tension ou de fausses attentes.',
    whoIsConcerned:
      'Les communes, les exécutifs locaux, les élu·es salariés et les services en charge des ressources humaines sont les premiers concernés.',
    mandateImpact:
      'Il faut sécuriser les demandes en s’appuyant sur un cadre lisible. Ce n’est pas seulement une question de principe, mais aussi d’organisation concrète.',
    watchpoints:
      'Les modalités pratiques d’application peuvent varier selon les situations professionnelles. Les consignes internes de la collectivité doivent rester cohérentes avec le cadre général.',
    actions: [
      'Relire les pratiques internes sur les autorisations d’absence.',
      'Préparer une formulation claire pour les élu·es concernés.',
      'Vérifier qui, côté administration, suit ces demandes.'
    ]
  }),
  createRadarSignal({
    id: 'radar-protection-fonctionnelle',
    slug: 'protection-fonctionnelle-menaces-formaliser-plus-tot',
    capturedAt: '2026-04-05',
    title: 'Protection fonctionnelle : formaliser plus tôt quand les attaques montent',
    sourcePublisher: 'Signal MARYAN',
    type: 'signal',
    level: 'local',
    theme: 'Statut de l’élu',
    promptKey: 'prompt_signal',
    factSummary:
      'Quand une situation bascule en menaces, le retard de cadrage pèse autant que l’attaque elle-même.',
    publicSummary:
      'Quand une situation bascule en menaces, le retard de cadrage pèse autant que l’attaque elle-même.',
    importanceScore: 5,
    mandateScore: 5,
    whyImportant:
      'Quand un conflit se dégrade, la question n’est plus seulement politique. Elle devient aussi une question de protection de l’élu, d’exemplarité et de coordination interne.',
    whoIsConcerned:
      'Les maires, adjoint·es exposé·es, directions générales et services juridiques sont les premiers concernés.',
    mandateImpact:
      'Il faut anticiper le passage d’un incident à une situation nécessitant une protection fonctionnelle. Le bon moment est souvent plus tôt qu’on ne le croit.',
    watchpoints:
      'Le risque principal est d’attendre trop longtemps et de laisser chaque acteur gérer la situation seul. Les preuves et traces doivent être conservées immédiatement.',
    actions: [
      'Désigner qui centralise les signalements.',
      'Constituer un dossier de traces simple et daté.',
      'Qualifier rapidement si une saisine formelle est nécessaire.'
    ]
  }),
  createRadarSignal({
    id: 'radar-eau-interco',
    slug: 'eau-assainissement-chaine-decision-interco',
    capturedAt: '2026-04-04',
    title: 'Eau et assainissement : relire la chaîne de décision avant toute annonce',
    sourcePublisher: 'Banque des Territoires',
    type: 'article de presse',
    level: 'interco',
    theme: 'Compétences',
    promptKey: 'prompt_signal',
    factSummary:
      'Avant de promettre une évolution, il faut clarifier qui arbitre, qui instruit et à quel rythme au niveau intercommunal.',
    publicSummary:
      'Avant de promettre une évolution, il faut clarifier qui arbitre, qui instruit et à quel rythme au niveau intercommunal.',
    importanceScore: 4,
    mandateScore: 5,
    whyImportant:
      'Le sujet semble souvent technique, mais il engage en réalité les compétences, le calendrier et la relation entre communes et intercommunalité. Une annonce mal cadrée peut exposer politiquement avant même qu’une décision soit mûre.',
    whoIsConcerned:
      'Les intercommunalités, les maires, les vice-présidences concernées et les directions techniques sont directement concernés.',
    mandateImpact:
      'Avant de promettre une évolution, il faut clarifier qui arbitre, qui instruit et à quel rythme. Le sujet demande une lecture institutionnelle, pas seulement une prise de position publique.',
    watchpoints:
      'Le calendrier réel de décision et la répartition exacte des marges de manœuvre peuvent rester flous. Il faut aussi surveiller les effets sur la relation entre exécutifs communaux et intercommunaux.',
    actions: [
      'Cartographier rapidement qui décide et qui prépare.',
      'Relire le calendrier avant toute prise de parole.',
      'Distinguer ce qui relève de l’interco et ce qui reste communal.'
    ]
  }),
  createRadarSignal({
    id: 'radar-subventions-exceptionnelles',
    slug: 'subventions-exceptionnelles-criteres-arbitrage',
    capturedAt: '2026-04-04',
    title: 'Subventions exceptionnelles : resserrer les critères avant l’arbitrage',
    sourcePublisher: 'Signal MARYAN',
    type: 'signal',
    level: 'local',
    theme: 'Subventions',
    promptKey: 'prompt_signal',
    factSummary:
      'Sans cadre simple, une aide “évidente” devient vite un précédent fragile, difficile à justifier politiquement.',
    publicSummary:
      'Sans cadre simple, une aide “évidente” devient vite un précédent fragile, difficile à justifier politiquement.',
    importanceScore: 4,
    mandateScore: 5,
    whyImportant:
      'Ce sont souvent des demandes politiquement sensibles parce qu’elles paraissent simples à accorder. Sans cadre, elles ouvrent vite une difficulté d’équité et de justification.',
    whoIsConcerned:
      'Les communes, les adjoint·es concerné·es, les services instructeurs et les porteurs de projet sont concernés.',
    mandateImpact:
      'Le bon niveau d’arbitrage consiste à clarifier les critères, les conditions et la possibilité d’un refus motivé. Il faut éviter les réponses improvisées au cas par cas.',
    watchpoints:
      'Le risque principal est la création d’un précédent fragile. Il faut aussi surveiller l’écart entre message politique et capacité administrative réelle.',
    actions: [
      'Écrire trois critères simples avant de répondre.',
      'Prévoir une option de réorientation si le financement direct n’est pas tenable.',
      'Faire relire la justification par les services concernés.'
    ]
  }),
  createRadarSignal({
    id: 'radar-probite-deport',
    slug: 'conflit-interets-deports-abstentions',
    capturedAt: '2026-04-03',
    title: 'Conflit d’intérêts : mieux documenter les déports et les abstentions',
    sourcePublisher: 'Conseil d’État',
    type: 'jurisprudence',
    level: 'national',
    theme: 'Probité',
    promptKey: 'prompt_jurisprudence',
    factSummary:
      'La prudence ne suffit pas : ce qui protège, c’est la trace claire et une pratique de déport documentée.',
    publicSummary:
      'La prudence ne suffit pas : ce qui protège, c’est la trace claire et une pratique de déport documentée.',
    importanceScore: 5,
    mandateScore: 4,
    whyImportant:
      'Le sujet n’est jamais seulement juridique. Il touche aussi la crédibilité politique et la capacité de l’exécutif à montrer une ligne claire.',
    whoIsConcerned:
      'Tous les exécutifs locaux, les élu·es en situation de proximité avec un dossier et les services juridiques sont concernés.',
    mandateImpact:
      'Il faut penser le déport comme une pratique documentée, pas comme un geste ponctuel. Une trace claire protège davantage qu’une simple intention de prudence.',
    watchpoints:
      'Les situations grises restent les plus délicates. Les habitudes locales peuvent conduire à minimiser un risque pourtant visible de l’extérieur.',
    actions: [
      'Identifier les dossiers à vigilance renforcée.',
      'Formaliser les cas de déport ou d’abstention.',
      'Prévoir une relecture juridique sur les séquences les plus sensibles.'
    ]
  }),
  createRadarSignal({
    id: 'radar-plm-prise-parole',
    slug: 'plm-parole-arrondissement-decision-centrale',
    capturedAt: '2026-04-03',
    title: 'PLM : distinguer parole d’arrondissement, décision centrale et calendrier',
    sourcePublisher: 'Signal MARYAN',
    type: 'signal',
    level: 'local',
    theme: 'Gouvernance',
    promptKey: 'prompt_core_radar',
    factSummary:
      'Dans les systèmes PLM, la confusion entre visibilité locale et pouvoir réel revient très vite et coûte politiquement.',
    publicSummary:
      'Dans les systèmes PLM, la confusion entre visibilité locale et pouvoir réel revient très vite et coûte politiquement.',
    importanceScore: 4,
    mandateScore: 5,
    whyImportant:
      'Dans les systèmes PLM, la confusion entre visibilité locale et pouvoir réel revient très vite. Cela change directement la manière de parler, de promettre et de remonter un sujet.',
    whoIsConcerned:
      'Les élu·es d’arrondissement, les mairies centrales, les cabinets et les directions concernées sont les premiers touchés.',
    mandateImpact:
      'Il faut séparer ce qui relève de la parole locale, de la décision centrale et du calendrier de validation. Cette distinction évite beaucoup de malentendus publics et internes.',
    watchpoints:
      'Le risque principal est de parler trop vite comme si tout se décidait au même endroit. Les circuits peuvent rester politiquement lisibles mais administrativement plus longs.',
    actions: [
      'Clarifier qui porte la parole et qui valide.',
      'Reformuler les annonces dans un cadre réaliste.',
      'Prévoir un point d’interface avec les fonctions centrales concernées.'
    ]
  }),
  createRadarSignal({
    id: 'radar-budget-primitif',
    slug: 'budget-primitif-cap-politique-calage',
    capturedAt: '2026-04-02',
    title: 'Budget primitif : sécuriser ce qui relève du cap politique et ce qui relève du calage',
    sourcePublisher: 'Signal MARYAN',
    type: 'signal',
    level: 'local',
    theme: 'Gouvernance',
    promptKey: 'prompt_core_radar',
    factSummary:
      'Le risque n’est pas seulement budgétaire : c’est de politiser trop tôt des arbitrages encore techniques, ou l’inverse.',
    publicSummary:
      'Le risque n’est pas seulement budgétaire : c’est de politiser trop tôt des arbitrages encore techniques, ou l’inverse.',
    importanceScore: 4,
    mandateScore: 5,
    whyImportant:
      'Le budget concentre vite beaucoup d’attentes contradictoires. Une mauvaise distinction entre cap politique et ajustements techniques brouille le message et fragilise les arbitrages.',
    whoIsConcerned:
      'Les maires, adjoint·es aux finances, directions financières et groupes majoritaires ou d’opposition sont concernés.',
    mandateImpact:
      'Il faut expliciter plus tôt ce qui est déjà arbitrable politiquement et ce qui reste encore à consolider techniquement.',
    watchpoints:
      'Les chiffres provisoires peuvent circuler trop tôt et devenir des points d’appui politiques difficiles à reprendre ensuite.',
    actions: [
      'Séparer une note de cap et une note de calage.',
      'Nommer les hypothèses encore fragiles.',
      'Préparer une prise de parole compatible avec l’état réel du dossier.'
    ]
  }),
  createRadarSignal({
    id: 'radar-commission-absence',
    slug: 'commissions-cadrage-conflits-secondaires',
    capturedAt: '2026-04-02',
    title: 'Commissions : l’absence de cadrage peut recréer du conflit sur des sujets secondaires',
    sourcePublisher: 'Signal MARYAN',
    type: 'signal',
    level: 'local',
    theme: 'Procédure',
    promptKey: 'prompt_signal',
    factSummary:
      'Quand la place des commissions n’est pas relue, des tensions périphériques viennent polluer des décisions pourtant gérables.',
    publicSummary:
      'Quand la place des commissions n’est pas relue, des tensions périphériques viennent polluer des décisions pourtant gérables.',
    importanceScore: 3,
    mandateScore: 4,
    whyImportant:
      'Les commissions paraissent parfois secondaires, mais elles servent souvent de soupape politique. Un cadre flou nourrit les frustrations et dégrade la confiance de travail.',
    whoIsConcerned:
      'Les exécutifs, présidences de commission, élu·es majoritaires et opposition sont concernés.',
    mandateImpact:
      'Il faut reclarifier ce que les commissions produisent réellement, ce qui relève de l’information et ce qui prépare une vraie décision.',
    watchpoints:
      'Le problème surgit souvent quand une commission est présentée comme décisionnelle alors qu’elle ne l’est pas, ou inversement.',
    actions: [
      'Relire le rôle politique et technique de chaque commission.',
      'Clarifier ce qui y est arbitré ou seulement préparé.',
      'Sécuriser les comptes rendus et suites données.'
    ]
  }),
  createRadarSignal({
    id: 'radar-associations-transparence',
    slug: 'subventions-associations-transparence-criteres',
    capturedAt: '2026-04-01',
    title: 'Subventions aux associations : mieux relier transparence, critères et parole publique',
    sourcePublisher: 'AMF',
    type: 'article de presse',
    level: 'local',
    theme: 'Subventions',
    promptKey: 'prompt_signal',
    factSummary:
      'La difficulté n’est pas seulement d’attribuer, mais d’expliquer pourquoi telle association est soutenue et telle autre non.',
    publicSummary:
      'La difficulté n’est pas seulement d’attribuer, mais d’expliquer pourquoi telle association est soutenue et telle autre non.',
    importanceScore: 4,
    mandateScore: 5,
    whyImportant:
      'Les aides aux associations créent souvent des attentes fortes parce qu’elles touchent à des relations locales concrètes. La lisibilité des critères protège autant que la décision elle-même.',
    whoIsConcerned:
      'Les adjoint·es à la vie associative, services instructeurs, associations et cabinets sont concernés.',
    mandateImpact:
      'Il faut articuler plus finement critères, procédure et prise de parole. Le sujet ne se traite pas seulement en commission ou sur un tableau de suivi.',
    watchpoints:
      'Le risque principal est de laisser croire à un traitement au cas par cas alors qu’un cadre existe, ou de promettre une aide avant l’instruction complète.',
    actions: [
      'Rendre les critères plus lisibles publiquement.',
      'Préparer des formulations de refus ou de report robustes.',
      'Relire les cas politiquement sensibles avant annonce.'
    ]
  }),
  createRadarSignal({
    id: 'radar-mobilites-interco',
    slug: 'mobilites-quotidien-interco-maire',
    capturedAt: '2026-04-01',
    title: 'Mobilités du quotidien : un sujet interco qui rejaillit très vite sur le maire',
    sourcePublisher: 'Banque des Territoires',
    type: 'article de presse',
    level: 'interco',
    theme: 'Compétences',
    promptKey: 'prompt_signal',
    factSummary:
      'Même quand la compétence est intercommunale, l’attente politique et citoyenne revient presque toujours à l’échelle communale.',
    publicSummary:
      'Même quand la compétence est intercommunale, l’attente politique et citoyenne revient presque toujours à l’échelle communale.',
    importanceScore: 4,
    mandateScore: 5,
    whyImportant:
      'Les mobilités structurent une grande part du rapport concret au mandat. Quand les circuits de décision sont flous, la pression se reporte sur la personne la plus visible localement.',
    whoIsConcerned:
      'Les maires, vice-présidences mobilités, directions techniques et services relation usagers sont concernés.',
    mandateImpact:
      'Il faut préparer une parole locale qui reconnaît le niveau intercommunal sans donner l’impression d’un renvoi de responsabilité.',
    watchpoints:
      'Les habitants jugent souvent la réactivité locale sans distinguer les compétences. Le langage institutionnel brut ne suffit pas.',
    actions: [
      'Écrire une réponse type qui explicite les bons niveaux de décision.',
      'Prévoir un point régulier avec l’interco sur les sujets sensibles.',
      'Traduire les délais institutionnels en calendrier compréhensible.'
    ]
  }),
  createRadarSignal({
    id: 'radar-medias-locaux',
    slug: 'medias-locaux-reaction-chaude-silence-strategique',
    capturedAt: '2026-03-31',
    title: 'Médias locaux : mieux distinguer réaction chaude, parole utile et silence stratégique',
    sourcePublisher: 'La Gazette des communes',
    type: 'article de presse',
    level: 'local',
    theme: 'Prise de parole',
    promptKey: 'prompt_signal',
    factSummary:
      'Une réaction trop rapide peut vous enfermer. Une absence de parole totale peut laisser le cadre à d’autres.',
    publicSummary:
      'Une réaction trop rapide peut vous enfermer. Une absence de parole totale peut laisser le cadre à d’autres.',
    importanceScore: 3,
    mandateScore: 4,
    whyImportant:
      'Dans les séquences locales, la pression médiatique agit souvent plus vite que la maturation réelle d’un dossier. Le bon enjeu n’est pas de parler vite, mais de parler juste.',
    whoIsConcerned:
      'Les maires, adjoint·es exposé·es, cabinets et toute personne amenée à répondre aux médias locaux sont concernés.',
    mandateImpact:
      'Il faut distinguer la prise de position, l’élément de contexte et le silence temporaire assumé. Ces trois options ne relèvent pas du même moment.',
    watchpoints:
      'Le risque principal est de combler un vide médiatique avec une parole insuffisamment calée, puis de devoir la corriger publiquement.',
    actions: [
      'Préparer trois niveaux de réponse selon l’état du dossier.',
      'Identifier qui parle et qui s’abstient.',
      'Vérifier l’alignement entre cabinet, exécutif et services.'
    ]
  }),
  createRadarSignal({
    id: 'radar-commande-publique-proximite',
    slug: 'commande-publique-situations-proximite',
    capturedAt: '2026-03-30',
    title: 'Commande publique : les situations de proximité doivent être relues avant la phase visible',
    sourcePublisher: 'Conseil d’État',
    type: 'jurisprudence',
    level: 'national',
    theme: 'Probité',
    promptKey: 'prompt_jurisprudence',
    factSummary:
      'Le risque n’apparaît pas seulement à l’attribution. Il se construit bien plus tôt, quand les proximités sont mal relues.',
    publicSummary:
      'Le risque n’apparaît pas seulement à l’attribution. Il se construit bien plus tôt, quand les proximités sont mal relues.',
    importanceScore: 5,
    mandateScore: 4,
    whyImportant:
      'La commande publique reste un terrain où le soupçon peut naître très tôt, y compris avant la décision finale. Les situations de proximité mal traitées contaminent ensuite toute la séquence.',
    whoIsConcerned:
      'Les élu·es décisionnaires, services marchés, directions opérationnelles et cabinets sont concernés.',
    mandateImpact:
      'La vigilance doit intervenir plus tôt dans la chaîne. Il faut relire les zones de proximité et d’influence avant que le dossier ne devienne politiquement visible.',
    watchpoints:
      'Le risque est de penser que la procédure suffira à elle seule à éteindre un doute qui, politiquement, s’est déjà installé.',
    actions: [
      'Identifier les situations de proximité à signaler en amont.',
      'Documenter les précautions prises avant publicité.',
      'Prévoir qui arbitre en cas de doute sur un dossier sensible.'
    ]
  })
];
