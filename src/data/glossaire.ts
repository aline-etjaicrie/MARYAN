export type Categorie = {
  id: string;
  label: string;
  emoji: string;
  couleur: string;
  description: string;
};

export type Mot = {
  id: string;
  mot: string;
  categorie: string;
  implicite: string;
  probleme?: string;
  alternative: string;
  testMaryan?: string;
};

export const categories: Categorie[] = [
  {
    id: 'creuse',
    label: 'Mots qui creusent la distance',
    emoji: '↔️',
    couleur: '#dc2626',
    description: 'Des mots qui séparent, qui hiérarchisent, qui mettent de l\'entre-deux là où il n\'en faudrait pas.'
  },
  {
    id: 'creux',
    label: 'Mots qui sonnent creux',
    emoji: '🫧',
    couleur: '#d97706',
    description: 'Des mots usés, vidés de sens à force d\'usage. Ils donnent l\'impression de dire quelque chose sans rien dire.'
  },
  {
    id: 'piege',
    label: 'Mots qui piègent',
    emoji: '⚠️',
    couleur: '#7c3aed',
    description: 'Des formulations qui semblent anodines mais engagent plus qu\'on ne le croit, ou ferment des portes sans le dire.'
  },
  {
    id: 'bon',
    label: 'Mots à utiliser davantage',
    emoji: '✓',
    couleur: '#16a34a',
    description: 'Des mots précis, directs, qui disent ce qu\'ils font et font ce qu\'ils disent.'
  }
];

export const mots: Mot[] = [
  // ── CREUSENT LA DISTANCE ──
  {
    id: 'aller-sur-le-terrain',
    mot: 'Aller sur le terrain',
    categorie: 'creuse',
    implicite: 'Que l\'élu est normalement ailleurs — dans un bureau, hors-sol, loin des réalités. Le terrain, c\'est pour les autres.',
    probleme: 'Ça installe une géographie de la légitimité : d\'un côté les décideurs, de l\'autre ceux qui "vivent" vraiment les choses. L\'élu qui le dit se disqualifie lui-même.',
    alternative: 'Rencontrer les habitants, se rendre sur place, aller voir, visiter le quartier.',
    testMaryan: 'Est-ce que vous dites ça pour décrire une action ou pour vous donner bonne conscience ?'
  },
  {
    id: 'nos-administres',
    mot: 'Nos administrés',
    categorie: 'creuse',
    implicite: 'Que les habitants sont des sujets passifs d\'une administration. Le "nos" pose l\'élu en autorité tutélaire.',
    probleme: 'Le mot administré vient du vocabulaire de la gestion publique, pas de la démocratie locale. Il efface la relation politique pour la remplacer par une relation administrative.',
    alternative: 'Les habitants, les citoyens, les gens du quartier, les résidents.',
    testMaryan: 'Utiliseriez-vous ce mot en leur présence ?'
  },
  {
    id: 'pedagogie',
    mot: 'Faire de la pédagogie',
    categorie: 'creuse',
    implicite: 'Que le problème, c\'est que les gens n\'ont pas compris. Que si on leur explique bien, ils seront d\'accord.',
    probleme: 'Le mot place l\'élu en position d\'enseignant et les citoyens en élèves. Il évacue la possibilité d\'un désaccord légitime sur le fond.',
    alternative: 'Expliquer, argumenter, dialoguer, écouter les objections.',
    testMaryan: 'Est-ce que vous cherchez à convaincre ou à comprendre pourquoi ça résiste ?'
  },

  // ── SONNENT CREUX ──
  {
    id: 'concertation',
    mot: 'Concertation',
    categorie: 'creux',
    implicite: 'Que la décision sera partagée, que les avis comptent. Mais dans la pratique, le mot est souvent utilisé pour décrire une information déguisée en dialogue.',
    probleme: 'Le mot a été tellement utilisé pour habiller des décisions déjà prises qu\'il a perdu toute crédibilité. Quand vous le dites, les habitants entendent "réunion où on va nous expliquer ce qui a été décidé".',
    alternative: 'Si c\'est une consultation : le dire. Si c\'est un vrai choix ouvert : le dire aussi. Et s\'y tenir.',
    testMaryan: 'Qu\'est-ce qui peut vraiment changer grâce à cette concertation ?'
  },
  {
    id: 'vivre-ensemble',
    mot: 'Vivre ensemble',
    categorie: 'creux',
    implicite: 'Une aspiration à l\'harmonie sociale. Mais le mot ne dit rien sur les conditions réelles de cette coexistence.',
    probleme: 'Il est devenu un mot fourre-tout qui évite de nommer les vrais sujets : discrimination, inégalités, conflits d\'usage de l\'espace public. Il donne bonne conscience sans rien engager.',
    alternative: 'Nommer ce qui coince vraiment : sécurité, partage de l\'espace, logement, discrimination.',
    testMaryan: 'Qu\'est-ce qui empêche concrètement ce "vivre ensemble" dans votre territoire ?'
  },
  {
    id: 'dynamique-territoriale',
    mot: 'Dynamique territoriale',
    categorie: 'creux',
    implicite: 'Que quelque chose bouge, que c\'est positif, que c\'est collectif. Mais quoi exactement ?',
    probleme: 'C\'est du jargon de consultant qu\'on a glissé dans le discours politique. Il sonne technique, donc sérieux, mais il ne dit rien de précis.',
    alternative: 'Dire ce qui bouge vraiment : des emplois créés, des habitants qui reviennent, un projet qui avance.',
  },

  // ── PIÈGENT ──
  {
    id: 'je-prends-note',
    mot: 'Je prends note',
    categorie: 'piege',
    implicite: 'Que vous avez entendu. Mais ça n\'engage à rien — ni à répondre, ni à agir, ni même à revenir sur le sujet.',
    probleme: 'Répété trop souvent, il devient une formule de clôture poli qui signale qu\'on ne donnera pas de suite. Les gens le savent.',
    alternative: 'Dire ce que vous allez faire de l\'information. Ou dire franchement que ce n\'est pas de votre ressort.',
    testMaryan: 'Qu\'est-ce que vous allez faire concrètement de cette information ?'
  },
  {
    id: 'on-va-etudier',
    mot: 'On va étudier la question',
    categorie: 'piege',
    implicite: 'Que la décision n\'est pas prise. Mais souvent, elle l\'est déjà.',
    probleme: 'Utilisé après une décision déjà arrêtée, il crée une attente fausse et amplifie la déception. Utilisé sincèrement, il faut ensuite revenir avec une réponse.',
    alternative: 'Si c\'est sincère : dire qui étudie, quand, et comment vous communiquerez la réponse. Si c\'est non : le dire.',
    testMaryan: 'Qui étudie quoi, et avant quelle date ?'
  },
  {
    id: 'ca-na-pas-ete-facile',
    mot: 'Ça n\'a pas été facile',
    categorie: 'piege',
    implicite: 'Que la décision prise était douloureuse, donc courageuse. Un appel implicite à la compassion pour l\'élu.',
    probleme: 'Ça déplace l\'attention du résultat vers le ressenti de celui qui décide. Les habitants n\'ont pas à gérer la difficulté psychologique de l\'élu — ils veulent comprendre pourquoi cette décision, et ce qu\'elle va changer pour eux.',
    alternative: 'Expliquer les contraintes réelles, les arbitrages faits, ce qui a été choisi et pourquoi.',
  },

  // ── À UTILISER DAVANTAGE ──
  {
    id: 'je-ne-sais-pas',
    mot: 'Je ne sais pas',
    categorie: 'bon',
    implicite: 'Honnêteté sur les limites de l\'information disponible. Un signal de fiabilité sur ce qu\'on dit par ailleurs.',
    alternative: 'L\'utiliser franchement, suivi de : qui le sait, quand on peut savoir, ou comment on va chercher.',
    testMaryan: 'Est-ce que vous l\'utilisez assez souvent ?'
  },
  {
    id: 'ce-nest-pas-de-ma-competence',
    mot: 'Ce n\'est pas de ma compétence',
    categorie: 'bon',
    implicite: 'Une clarification institutionnelle franche, qui aide les habitants à s\'adresser au bon interlocuteur.',
    alternative: 'Le dire sans s\'excuser, avec le nom de qui est compétent et comment le contacter. C\'est rendre service.',
  },
  {
    id: 'je-ne-suis-pas-daccord',
    mot: 'Je ne suis pas d\'accord',
    categorie: 'bon',
    implicite: 'Un désaccord exprimé directement, sans euphémisme ni attaque. La base d\'un débat politique sain.',
    alternative: 'L\'utiliser avec les arguments qui suivent. Sans attaque ad hominem, sans fausse politesse.',
    testMaryan: 'Est-ce que vous le dites assez clairement en séance ?'
  }
];
