export type MaryanRadarType = 'loi' | 'décret' | 'jurisprudence' | 'signal' | 'article de presse';
export type MaryanRadarLevel = 'national' | 'interco' | 'local';

export interface MaryanRadarItem {
  id: string;
  title: string;
  source: string;
  sourceUrl?: string;
  date: string;
  type: MaryanRadarType;
  level: MaryanRadarLevel;
  theme: string;
  promptKey: string;
  summary: {
    whyImportant: string;
    whoConcerned: string;
    whatChanges: string;
    toWatch: string;
    toDo: string[];
  };
}

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

export const maryanRadarItems: MaryanRadarItem[] = [
  {
    id: 'radar-absences-elus',
    title: 'Autorisations d’absence : mieux cadrer les demandes des élu·es salariés',
    source: 'Journal officiel',
    sourceUrl: 'https://www.legifrance.gouv.fr',
    date: '2026-04-05',
    type: 'loi',
    level: 'national',
    theme: 'Statut de l’élu',
    promptKey: 'prompt_loi',
    summary: {
      whyImportant:
        'Le sujet touche directement l’exercice du mandat et la relation avec l’employeur. Une lecture imprécise crée vite de la tension ou de fausses attentes.',
      whoConcerned:
        'Les communes, les exécutifs locaux, les élu·es salariés et les services en charge des ressources humaines sont les premiers concernés.',
      whatChanges:
        'Il faut sécuriser les demandes en s’appuyant sur un cadre lisible. Ce n’est pas seulement une question de principe, mais aussi d’organisation concrète.',
      toWatch:
        'Les modalités pratiques d’application peuvent varier selon les situations professionnelles. Les consignes internes de la collectivité doivent rester cohérentes avec le cadre général.',
      toDo: [
        'Relire les pratiques internes sur les autorisations d’absence.',
        'Préparer une formulation claire pour les élu·es concernés.',
        'Vérifier qui, côté administration, suit ces demandes.'
      ]
    }
  },
  {
    id: 'radar-eau-interco',
    title: 'Eau et assainissement : relire la chaîne de décision avant toute annonce',
    source: 'Banque des Territoires',
    sourceUrl: 'https://www.banquedesterritoires.fr',
    date: '2026-04-05',
    type: 'article de presse',
    level: 'interco',
    theme: 'Compétences',
    promptKey: 'prompt_signal',
    summary: {
      whyImportant:
        'Le sujet semble souvent technique, mais il engage en réalité les compétences, le calendrier et la relation entre communes et intercommunalité. Une annonce mal cadrée peut exposer politiquement avant même qu’une décision soit mûre.',
      whoConcerned:
        'Les intercommunalités, les maires, les vice-présidences concernées et les directions techniques sont directement concernés.',
      whatChanges:
        'Avant de promettre une évolution, il faut clarifier qui arbitre, qui instruit et à quel rythme. Le sujet demande une lecture institutionnelle, pas seulement une prise de position publique.',
      toWatch:
        'Le calendrier réel de décision et la répartition exacte des marges de manœuvre peuvent rester flous. Il faut aussi surveiller les effets sur la relation entre exécutifs communaux et intercommunaux.',
      toDo: [
        'Cartographier rapidement qui décide et qui prépare.',
        'Relire le calendrier avant toute prise de parole.',
        'Distinguer ce qui relève de l’interco et ce qui reste communal.'
      ]
    }
  },
  {
    id: 'radar-convocations-delais',
    title: 'Convocations et délais : la forme reste une question de sécurité politique',
    source: 'DGCL',
    sourceUrl: 'https://www.collectivites-locales.gouv.fr',
    date: '2026-04-04',
    type: 'décret',
    level: 'local',
    theme: 'Procédure',
    promptKey: 'prompt_loi',
    summary: {
      whyImportant:
        'Sur les assemblées locales, une fragilité de procédure suffit à déplacer le débat du fond vers la forme. C’est un sujet de méthode autant que de sécurité politique.',
      whoConcerned:
        'Les exécutifs, les secrétariats d’assemblée, les services juridiques et les groupes politiques sont concernés.',
      whatChanges:
        'Il faut traiter les convocations, délais et pièces comme un bloc de sécurisation. Le bon réflexe est de vérifier la chaîne administrative avant la séquence politique.',
      toWatch:
        'Les pratiques locales trop installées peuvent masquer des angles morts. Les périodes chargées augmentent le risque d’approximation.',
      toDo: [
        'Vérifier les délais et les pièces diffusées.',
        'Identifier le point de contrôle interne avant envoi.',
        'Repartir d’une check-list simple sur les assemblées sensibles.'
      ]
    }
  },
  {
    id: 'radar-subventions-exceptionnelles',
    title: 'Subventions exceptionnelles : resserrer les critères avant l’arbitrage',
    source: 'Signal MARYAN',
    sourceUrl: 'https://www.maryanapp.fr/radar',
    date: '2026-04-04',
    type: 'signal',
    level: 'local',
    theme: 'Subventions',
    promptKey: 'prompt_signal',
    summary: {
      whyImportant:
        'Ce sont souvent des demandes politiquement sensibles parce qu’elles paraissent simples à accorder. Sans cadre, elles ouvrent vite une difficulté d’équité et de justification.',
      whoConcerned:
        'Les communes, les adjoint·es concerné·es, les services instructeurs et les porteurs de projet sont concernés.',
      whatChanges:
        'Le bon niveau d’arbitrage consiste à clarifier les critères, les conditions et la possibilité d’un refus motivé. Il faut éviter les réponses improvisées au cas par cas.',
      toWatch:
        'Le risque principal est la création d’un précédent fragile. Il faut aussi surveiller l’écart entre message politique et capacité administrative réelle.',
      toDo: [
        'Écrire trois critères simples avant de répondre.',
        'Prévoir une option de réorientation si le financement direct n’est pas tenable.',
        'Faire relire la justification par les services concernés.'
      ]
    }
  },
  {
    id: 'radar-probite-deport',
    title: 'Conflit d’intérêts : mieux documenter les déports et les abstentions',
    source: 'Conseil d’État',
    sourceUrl: 'https://www.conseil-etat.fr',
    date: '2026-04-03',
    type: 'jurisprudence',
    level: 'national',
    theme: 'Probité',
    promptKey: 'prompt_jurisprudence',
    summary: {
      whyImportant:
        'Le sujet n’est jamais seulement juridique. Il touche aussi la crédibilité politique et la capacité de l’exécutif à montrer une ligne claire.',
      whoConcerned:
        'Tous les exécutifs locaux, les élu·es en situation de proximité avec un dossier et les services juridiques sont concernés.',
      whatChanges:
        'Il faut penser le déport comme une pratique documentée, pas comme un geste ponctuel. Une trace claire protège davantage qu’une simple intention de prudence.',
      toWatch:
        'Les situations grises restent les plus délicates. Les habitudes locales peuvent conduire à minimiser un risque pourtant visible de l’extérieur.',
      toDo: [
        'Identifier les dossiers à vigilance renforcée.',
        'Formaliser les cas de déport ou d’abstention.',
        'Prévoir une relecture juridique sur les séquences les plus sensibles.'
      ]
    }
  },
  {
    id: 'radar-plm-prise-parole',
    title: 'PLM : distinguer parole d’arrondissement, décision centrale et calendrier',
    source: 'Signal MARYAN',
    sourceUrl: 'https://www.maryanapp.fr/radar',
    date: '2026-04-03',
    type: 'signal',
    level: 'local',
    theme: 'Gouvernance',
    promptKey: 'prompt_core_radar',
    summary: {
      whyImportant:
        'Dans les systèmes PLM, la confusion entre visibilité locale et pouvoir réel revient très vite. Cela change directement la manière de parler, de promettre et de remonter un sujet.',
      whoConcerned:
        'Les élu·es d’arrondissement, les mairies centrales, les cabinets et les directions concernées sont les premiers touchés.',
      whatChanges:
        'Il faut séparer ce qui relève de la parole locale, de la décision centrale et du calendrier de validation. Cette distinction évite beaucoup de malentendus publics et internes.',
      toWatch:
        'Le risque principal est de parler trop vite comme si tout se décidait au même endroit. Les circuits peuvent rester politiquement lisibles mais administrativement plus longs.',
      toDo: [
        'Clarifier qui porte la parole et qui valide.',
        'Reformuler les annonces dans un cadre réaliste.',
        'Prévoir un point d’interface avec les fonctions centrales concernées.'
      ]
    }
  }
];
