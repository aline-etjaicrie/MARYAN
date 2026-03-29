// src/data/glossaire.ts

export type NiveauAlerte = 'distance' | 'vide' | 'technique' | 'piege' | 'bon';

export interface MotGlossaire {
  id: string;
  mot: string;
  categorie: NiveauAlerte;
  implicite: string;
  probleme: string;
  alternative: string;
  testMaryan?: string;
}

export interface CategorieGlossaire {
  id: NiveauAlerte;
  label: string;
  description: string;
  couleur: string;
  emoji: string;
}

export const categories: CategorieGlossaire[] = [
  {
    id: 'distance',
    label: 'Les mots qui creusent une distance',
    description: 'Des mots qui installent, sans le dire, une hiérarchie entre ceux qui décident et ceux qui vivent.',
    couleur: '#C0392B',
    emoji: '↕️'
  },
  {
    id: 'vide',
    label: 'Les mots qui sonnent creux',
    description: 'Des mots qui donnent l\'illusion d\'agir — sans dire ce qu\'on fait vraiment.',
    couleur: '#8E44AD',
    emoji: '🫥'
  },
  {
    id: 'technique',
    label: 'Les mots techniques',
    description: 'Des sigles et termes administratifs qui désorientent les élus et les citoyens.',
    couleur: '#2471A3',
    emoji: '⚙️'
  },
  {
    id: 'piege',
    label: 'Les mots piégés',
    description: 'Des mots qui semblent clairs mais que chacun entend différemment — souvent utilisés pour exclure autant que pour rassembler.',
    couleur: '#D35400',
    emoji: '⚠️'
  },
  {
    id: 'bon',
    label: 'Les mots qu\'on devrait dire davantage',
    description: 'Des mots simples, concrets, qui créent de la confiance et de la relation.',
    couleur: '#1E8449',
    emoji: '✓'
  }
];

export const mots: MotGlossaire[] = [

  // ── DISTANCE ──────────────────────────────────────────────
  {
    id: 'terrain',
    mot: 'Aller sur le terrain',
    categorie: 'distance',
    implicite: 'La décision se prend ailleurs. On "descend" vers les gens.',
    probleme: 'Installe une distance symbolique entre les élus et les habitants. Comme si leur rue, leur quartier, étaient un espace à visiter — pas un endroit où on vit.',
    alternative: 'Aller chez les gens / être présent dans les quartiers / rencontrer les habitants',
    testMaryan: 'Puis-je dire où exactement, et avec qui ?'
  },
  {
    id: 'vraie-vie',
    mot: 'La vraie vie',
    categorie: 'distance',
    implicite: 'Votre vie serait plus authentique que la mienne.',
    probleme: 'Sous-entend que la vie des élus serait déconnectée, artificielle — et crée une condescendance inversée qui ne règle rien.',
    alternative: 'La vie quotidienne / ce que vivent les gens / le quotidien des habitants',
    testMaryan: 'Est-ce que je suis en train de me dévaloriser pour valoriser les autres ?'
  },
  {
    id: 'publics',
    mot: 'Nos publics',
    categorie: 'distance',
    implicite: 'Les habitants sont une audience à gérer, à "toucher", à "cibler".',
    probleme: 'Transforme des personnes en catégories. Langage emprunté au marketing, étranger à la relation politique.',
    alternative: 'Les habitants / les personnes concernées / les gens',
    testMaryan: 'Est-ce que je parlerais à ces personnes en face à face de la même façon ?'
  },
  {
    id: 'societe-civile',
    mot: 'La société civile',
    categorie: 'distance',
    implicite: 'Nous les élus, vous les autres.',
    probleme: 'Un mot hérité d\'un temps où il fallait distinguer le peuple du clergé ou de la noblesse. Aujourd\'hui il creuse une frontière artificielle entre "eux" et "nous" — alors que les élus font partie de la société.',
    alternative: 'Les citoyens / les habitants / les associations / les personnes engagées',
    testMaryan: 'Est-ce que je suis moi-même dans cette "société civile" ?'
  },
  {
    id: 'populations',
    mot: 'Les populations',
    categorie: 'distance',
    implicite: 'Une masse à administrer, pas des personnes.',
    probleme: 'Déshumanise la relation. Vocabulaire de la démographie ou de l\'aide humanitaire — déplacé dans la politique locale.',
    alternative: 'Les gens / les personnes / les habitants',
    testMaryan: 'Parlerais-je à "les populations" ou à "ces gens" ?'
  },
  {
    id: 'remonter',
    mot: 'Remonter les besoins',
    categorie: 'distance',
    implicite: 'Les habitants sont "en bas". La décision est "en haut".',
    probleme: 'Installe une hiérarchie spatiale implicite. Les besoins ne "remontent" pas — ils sont là, présents, exprimés.',
    alternative: 'Écouter / recueillir / prendre en compte ce que disent les habitants',
    testMaryan: 'Qui est en bas ? Qui est en haut ?'
  },
  {
    id: 'usagers',
    mot: 'Les usagers',
    categorie: 'distance',
    implicite: 'Relation administrative froide, réduite à l\'usage d\'un service.',
    probleme: 'Efface la dimension citoyenne. Une personne n\'est pas que l\'utilisateur d\'un service public.',
    alternative: 'Les habitants / les personnes / les citoyens',
    testMaryan: 'Est-ce que cette personne est juste un "usager" ou est-ce qu\'elle habite ici ?'
  },
  {
    id: 'administres',
    mot: 'Les administrés',
    categorie: 'distance',
    implicite: 'Vision verticale de la relation — on administre des gens.',
    probleme: 'Place les habitants en position passive, objets d\'une gestion plutôt que sujets d\'une démocratie.',
    alternative: 'Les habitants / les citoyens',
    testMaryan: 'Est-ce que j\'administre des gens ou est-ce que je les représente ?'
  },

  // ── VIDE ──────────────────────────────────────────────────
  {
    id: 'concertation',
    mot: 'Concertation',
    categorie: 'vide',
    implicite: 'Vous pouvez donner votre avis — mais la décision est souvent déjà cadrée.',
    probleme: 'Crée une illusion de participation sans toujours partager le pouvoir de décider. Quand le mot est utilisé seul, il ne dit rien sur qui décide à la fin.',
    alternative: 'Réunion publique / échanges avec les habitants / décision partagée — en précisant qui décide',
    testMaryan: 'Qui décide à la fin ?'
  },
  {
    id: 'gouvernance',
    mot: 'Gouvernance',
    categorie: 'vide',
    implicite: 'Il existe une organisation — mais on ne dit pas clairement qui décide.',
    probleme: 'Mot écran. Remplace "comment on décide" sans le dire. Souvent utilisé pour éviter de nommer les responsabilités.',
    alternative: 'Qui décide, à quel moment, et comment',
    testMaryan: 'Puis-je nommer les personnes qui décident ?'
  },
  {
    id: 'territoire',
    mot: 'Territoire(s)',
    categorie: 'vide',
    implicite: 'On parle d\'un espace abstrait plutôt que de lieux concrets.',
    probleme: 'Rend le discours flou. Difficile à se représenter. Les gens n\'habitent pas "un territoire" — ils habitent une commune, une rue, un quartier.',
    alternative: 'Une commune / un quartier / une rue / un lieu précis',
    testMaryan: 'Puis-je nommer l\'endroit précis dont je parle ?'
  },
  {
    id: 'dynamiques',
    mot: 'Créer des dynamiques',
    categorie: 'vide',
    implicite: 'Quelque chose va se passer — mais on ne sait pas quoi.',
    probleme: 'Mot flou utilisé quand on ne sait pas décrire une action précise. Donne l\'illusion du mouvement sans le nommer.',
    alternative: 'Organiser / lancer / mettre en place (préciser l\'action)',
    testMaryan: 'Qu\'est-ce qui va concrètement changer, et pour qui ?'
  },
  {
    id: 'transversalite',
    mot: 'Transversalité',
    categorie: 'vide',
    implicite: 'Plusieurs services doivent travailler ensemble.',
    probleme: 'Jargon interne qui ne parle qu\'aux initiés. Ne dit rien de concret sur comment les choses s\'organisent.',
    alternative: 'Travail commun entre services / coordination entre la mairie et X',
    testMaryan: 'Qui fait quoi avec qui ?'
  },
  {
    id: 'dispositif',
    mot: 'Dispositif',
    categorie: 'vide',
    implicite: 'Il existe quelque chose — mais on ne sait pas quoi.',
    probleme: 'Masque la réalité concrète de l\'action. Mot valise qui peut désigner n\'importe quoi.',
    alternative: 'Une aide / un service / une action (expliquer clairement ce que c\'est)',
    testMaryan: 'Puis-je le décrire en une phrase simple ?'
  },
  {
    id: 'accompagnement',
    mot: 'Accompagnement',
    categorie: 'vide',
    implicite: 'On est présent — mais sans dire ce qui est réellement fait.',
    probleme: 'Peut masquer un manque d\'action concrète. Être "accompagné" ne dit rien sur ce qu\'on reçoit vraiment.',
    alternative: 'Aider / former / financer / orienter (préciser l\'action)',
    testMaryan: 'Concrètement, on fait quoi ?'
  },
  {
    id: 'co-construction',
    mot: 'Co-construction',
    categorie: 'vide',
    implicite: 'On construit ensemble — mais souvent de façon décorative.',
    probleme: 'Mot à la mode, rarement défini. Qui construit quoi, avec qui, et avec quel pouvoir réel ?',
    alternative: 'Décider ensemble / construire avec les habitants (en précisant comment)',
    testMaryan: 'Qui a le pouvoir de changer quoi dans cette "co-construction" ?'
  },
  {
    id: 'il-faut',
    mot: 'Il faut / On doit',
    categorie: 'vide',
    implicite: 'Quelque chose est nécessaire — mais personne n\'est responsable.',
    probleme: 'Efface les acteurs. Empêche d\'identifier qui agit et qui est redevable.',
    alternative: 'Nous faisons / la mairie met en place / tel service agit',
    testMaryan: 'Qui fait quoi, et d\'ici quand ?'
  },

  // ── TECHNIQUE ─────────────────────────────────────────────
  {
    id: 'dgs',
    mot: 'DGS',
    categorie: 'technique',
    implicite: 'Un acronyme qui désigne une personne clé — souvent sans que l\'élu sache exactement à qui il parle.',
    probleme: 'Le Directeur Général des Services est la personne qui fait tourner la mairie au quotidien. Ne pas savoir qui c\'est, c\'est naviguer sans boussole.',
    alternative: 'Directeur·rice général·e des services — la personne qui coordonne tous les services de la collectivité',
    testMaryan: 'Est-ce que je sais qui c\'est et comment travailler avec elle ou lui ?'
  },
  {
    id: 'plu',
    mot: 'PLU',
    categorie: 'technique',
    implicite: 'Un document technique qui régit ce qu\'on peut construire — et donc transformer — sur un territoire.',
    probleme: 'Le Plan Local d\'Urbanisme détermine ce qui peut être construit, transformé ou protégé. C\'est un document de pouvoir concret, souvent méconnu des élus débutants.',
    alternative: 'Plan local d\'urbanisme — le document qui décide ce qu\'on peut construire ou non',
    testMaryan: 'Est-ce que je sais ce que dit le PLU sur le sujet dont je parle ?'
  },
  {
    id: 'epci',
    mot: 'EPCI',
    categorie: 'technique',
    implicite: 'Une structure qui regroupe plusieurs communes — et où se jouent souvent des décisions importantes.',
    probleme: 'L\'Établissement Public de Coopération Intercommunale est souvent l\'endroit où se décident des sujets majeurs (transports, déchets, économie). Mal connu des nouveaux élus.',
    alternative: 'Intercommunalité — le niveau où les communes s\'associent pour décider ensemble',
    testMaryan: 'Qu\'est-ce qui se décide à l\'EPCI plutôt qu\'à ma commune ?'
  },
  {
    id: 'dsp',
    mot: 'DSP',
    categorie: 'technique',
    implicite: 'La collectivité confie un service à une entreprise — avec tout ce que ça implique.',
    probleme: 'La Délégation de Service Public engage la collectivité sur le long terme. Un élu doit comprendre ce qu\'il délègue, à qui, et ce qu\'il garde comme contrôle.',
    alternative: 'Délégation de service public — quand une commune confie la gestion d\'un service à une entreprise privée',
    testMaryan: 'Qu\'est-ce que la commune garde comme pouvoir de contrôle ?'
  },
  {
    id: 'zac',
    mot: 'ZAC',
    categorie: 'technique',
    implicite: 'Un projet urbain structuré sur un périmètre défini.',
    probleme: 'La Zone d\'Aménagement Concerté est un outil complexe qui engage des financements importants. Souvent évoquée sans être expliquée.',
    alternative: 'Zone d\'aménagement concerté — un grand projet de construction ou de rénovation urbaine',
    testMaryan: 'Qui pilote ce projet et quelles décisions restent à prendre ?'
  },
  {
    id: 'clect',
    mot: 'CLECT',
    categorie: 'technique',
    implicite: 'Un mécanisme financier qui détermine qui paie quoi entre communes.',
    probleme: 'La Commission Locale d\'Évaluation des Charges Transférées est un lieu de pouvoir financier méconnu. Elle détermine les compensations financières lors des transferts de compétences.',
    alternative: 'Commission qui décide comment les charges sont partagées entre communes',
    testMaryan: 'Est-ce que je sais ce que ma commune paie ou reçoit via cette commission ?'
  },

  // ── PIÉGÉ ─────────────────────────────────────────────────
  {
    id: 'republicain',
    mot: 'Républicain',
    categorie: 'piege',
    implicite: 'Conforme à nos valeurs communes — mais ces valeurs ne sont pas toujours définies.',
    probleme: 'Utilisé autant pour rassembler que pour exclure. Dire qu\'une chose est "républicaine" sous-entend que son opposé ne l\'est pas — sans débat.',
    alternative: 'Nommer précisément la valeur ou le principe en jeu',
    testMaryan: 'Qu\'est-ce que je veux dire précisément par ce mot ?'
  },
  {
    id: 'populaire',
    mot: 'Populaire',
    categorie: 'piege',
    implicite: 'Appartenant au peuple — mais avec des connotations très différentes selon le contexte.',
    probleme: 'Quartier populaire (notion sociale) vs populisme (démagogie). Le même mot porte deux significations opposées selon qui l\'utilise.',
    alternative: 'Préciser : quartier à revenus modestes / classe ouvrière / ancrage local…',
    testMaryan: 'Dans quel sens est-ce que j\'utilise ce mot, et mon interlocuteur l\'entend-il de la même façon ?'
  },
  {
    id: 'progressiste',
    mot: 'Progressiste',
    categorie: 'piege',
    implicite: 'En faveur du changement et du progrès — mais personne ne s\'accorde sur la direction.',
    probleme: 'Chacun se croit progressiste. Le mot ne dit rien sur le contenu réel des positions.',
    alternative: 'Nommer ce qui change, dans quelle direction, pour qui',
    testMaryan: 'Quel progrès précis est-ce que je défends ici ?'
  },
  {
    id: 'modere',
    mot: 'Modéré',
    categorie: 'piege',
    implicite: 'Raisonnable, équilibré, ni extrémiste.',
    probleme: 'Toujours utilisé comme compliment, jamais défini. Qui décide de ce qui est modéré ? Par rapport à quoi ?',
    alternative: 'Nommer clairement ses positions plutôt que de se qualifier par contraste',
    testMaryan: 'Modéré par rapport à quoi ?'
  },
  {
    id: 'securite',
    mot: 'Sécurité',
    categorie: 'piege',
    implicite: 'La protection des personnes — mais dans quel sens et avec quels moyens ?',
    probleme: 'Mot consensuel dans son intention, très conflictuel dans son contenu. Souvent utilisé pour imposer une approche sans débattre des alternatives.',
    alternative: 'Nommer ce dont on parle : prévention / présence / répression / protection',
    testMaryan: 'De quelle sécurité est-ce que je parle exactement ?'
  },
  {
    id: 'bon-sens',
    mot: 'Le bon sens',
    categorie: 'piege',
    implicite: 'Ce que tout le monde pense — mais en réalité ce que je pense.',
    probleme: 'Argument d\'autorité déguisé. Présente une opinion comme une évidence partagée, et coupe court au débat.',
    alternative: 'Dire clairement ce qu\'on pense et pourquoi',
    testMaryan: 'Est-ce que je justifie cette position ou est-ce que je l\'impose comme une évidence ?'
  },

  // ── BON ───────────────────────────────────────────────────
  {
    id: 'concretement',
    mot: 'Concrètement',
    categorie: 'bon',
    implicite: 'Je vais vous dire ce qui change vraiment.',
    probleme: '',
    alternative: 'À utiliser systématiquement avant d\'annoncer une décision ou une action.',
    testMaryan: 'Est-ce que je peux finir cette phrase ?'
  },
  {
    id: 'avec-vous',
    mot: 'Avec vous',
    categorie: 'bon',
    implicite: 'Pas pour vous. Pas à votre place. Avec.',
    probleme: '',
    alternative: 'À préférer à "pour vous" ou "en faveur de" — change entièrement la posture.',
    testMaryan: 'Est-ce que c\'est réellement fait avec les personnes concernées ?'
  },
  {
    id: 'decider',
    mot: 'Décider / Choisir / Arbitrer',
    categorie: 'bon',
    implicite: 'Je prends une responsabilité. Je l\'assume.',
    probleme: '',
    alternative: 'Des mots rares en politique — et pourtant essentiels pour créer de la confiance.',
    testMaryan: 'Est-ce que je nomme clairement que c\'est une décision que je prends ?'
  },
  {
    id: 'ici',
    mot: 'Ici / Dans ce quartier / À cet endroit',
    categorie: 'bon',
    implicite: 'Je sais de quoi je parle. Je sais où c\'est.',
    probleme: '',
    alternative: 'À préférer à "territoire" ou "terrain". Ancre le discours dans le réel.',
    testMaryan: 'Puis-je nommer l\'endroit précis dont je parle ?'
  },
  {
    id: 'tenir',
    mot: 'Tenir / Rendre compte',
    categorie: 'bon',
    implicite: 'J\'ai pris un engagement. Je viens vous dire où on en est.',
    probleme: '',
    alternative: 'Des mots qui créent de la confiance dans la durée. La redevabilité n\'est pas une faiblesse.',
    testMaryan: 'Est-ce que je peux revenir devant les mêmes personnes et leur dire ce qu\'il s\'est passé ?'
  }
];
