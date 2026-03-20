export interface ExpertiseCardData {
  title: string;
  purpose: string;
  when: string;
  support: string;
}

// Data kept flat on purpose so the page can later be fed by a CMS or API
// without changing the presentation layer.
export const transversalExpertises: ExpertiseCardData[] = [
  {
    title: 'Fonctionnement des collectivités et exercice du mandat',
    purpose:
      "Comprendre le rôle d’un élu, les circuits de décision, les rapports entre exécutif, opposition, administration, cabinet et services.",
    when:
      'Prise de fonction, sentiment de flou institutionnel, difficulté à situer sa place, besoin de mieux comprendre “qui fait quoi”.',
    support:
      'Expert du fonctionnement des collectivités locales, formateur institutions, ancien cadre territorial.'
  },
  {
    title: 'Organisation du mandat et gestion du temps politique',
    purpose:
      'Aider à prioriser, organiser son agenda, articuler mandat, réunions, terrain, administration et vie professionnelle.',
    when:
      'Surcharge, dispersion, difficulté à hiérarchiser, prise de délégation, montée en responsabilité.',
    support:
      "Ancien chef de cabinet, spécialiste de l’organisation du travail politique local, accompagnateur stratégique."
  },
  {
    title: 'Communication publique et pédagogie de l’action',
    purpose:
      'Rendre l’action publique lisible, expliquer une décision technique, clarifier un message, éviter la langue de bois.',
    when:
      'Action mal comprise, communication trop technique, besoin de mieux parler à ses administrés, difficulté à rendre visible son travail.',
    support:
      'Spécialiste de communication publique, consultant en communication institutionnelle ou politique locale.'
  },
  {
    title: 'Communication numérique et réseaux sociaux',
    purpose:
      'Mieux utiliser les réseaux sociaux, choisir les bons formats, éviter les maladresses, ajuster sa présence numérique au réel du mandat.',
    when:
      'Difficulté à publier, exposition mal maîtrisée, erreurs de ton, besoin d’une stratégie simple et soutenable.',
    support:
      'Expert en communication digitale appliquée au secteur public ou politique.'
  },
  {
    title: 'Prise de parole, posture et expression publique',
    purpose:
      'Travailler la présence, la clarté, la posture et la parole en conseil municipal, réunion publique, interview ou débat.',
    when:
      'Manque d’aisance, interventions peu lisibles, besoin de mieux incarner son rôle, stress en prise de parole.',
    support:
      'Coach en prise de parole, expert média training, spécialiste de la posture publique.'
  },
  {
    title: 'Situations sensibles, tensions et séquences à risque',
    purpose:
      'Préparer une réponse, structurer une parole en contexte conflictuel, éviter les emballements, sécuriser une séquence délicate.',
    when:
      'Polémique locale, sujet sensible, tension avec habitants, opposition, médias ou partenaires.',
    support:
      'Consultant en communication sensible, stratégie publique ou gestion de crise.'
  }
];

export const thematicExpertises: ExpertiseCardData[] = [
  {
    title: 'Urbanisme, aménagement, logement',
    purpose:
      'Accompagner des sujets techniquement complexes, souvent conflictuels et très exposés : projets urbains, logement, permis, concertation, cadre de vie.',
    when:
      'Projet urbain exposé, dossier de permis sensible, tensions de voisinage, besoin de concertation ou de pédagogie sur une opération.',
    support:
      'Expert en urbanisme, aménagement, logement, concertation territoriale.'
  },
  {
    title: 'Culture, patrimoine et projets culturels',
    purpose:
      'Accompagner la définition d’une politique culturelle, la relation aux acteurs culturels, la communication de projets symboliques ou sensibles.',
    when:
      'Lancement ou repositionnement d’un projet culturel, arbitrage visible, sujet patrimonial sensible, besoin de mieux dialoguer avec les acteurs locaux.',
    support:
      'Chargé de projet culturel, spécialiste des politiques culturelles, consultant culture/patrimoine.'
  },
  {
    title: 'Développement économique, commerce et attractivité locale',
    purpose:
      'Clarifier une stratégie économique locale, accompagner le commerce, l’emploi, l’attractivité et les partenariats du territoire.',
    when:
      'Revitalisation du centre-ville, difficulté commerciale, besoin de lisibilité stratégique, partenariats à structurer ou à relancer.',
    support:
      'Spécialiste du développement économique territorial, du commerce local ou de l’emploi.'
  },
  {
    title: 'Insertion, solidarité et action sociale',
    purpose:
      'Mieux comprendre les dispositifs, les partenaires, les politiques sociales locales et la manière d’en parler avec justesse.',
    when:
      'Sujet social sensible, coordination partenariale difficile, besoin d’expliquer une priorité publique ou de mieux lire les dispositifs existants.',
    support:
      'Expert des politiques sociales, de l’insertion ou du développement social local.'
  },
  {
    title: 'Éducation, enfance et jeunesse',
    purpose:
      'Accompagner les sujets liés à l’école, à l’enfance, à la restauration, aux loisirs, à la jeunesse et à la relation aux familles.',
    when:
      'Question scolaire très visible, tension avec des familles, arbitrage sur un service, besoin de clarifier une décision ou une organisation.',
    support:
      'Spécialiste des politiques éducatives locales, de l’enfance ou de la jeunesse.'
  },
  {
    title: 'Transition écologique, cadre de vie et propreté',
    purpose:
      'Rendre lisibles des politiques très concrètes mais parfois mal comprises : propreté, déchets, végétalisation, mobilités, écologie du quotidien.',
    when:
      'Critiques sur la propreté, projet de mobilité ou de végétalisation peu compris, besoin de relier écologie locale et usages concrets.',
    support:
      'Expert en transition écologique locale, cadre de vie, mobilités ou politiques environnementales.'
  },
  {
    title: 'Finances locales et administration générale',
    purpose:
      'Mieux comprendre les contraintes budgétaires, les arbitrages, les équilibres financiers et la façon d’en parler publiquement.',
    when:
      'Préparation budgétaire, arbitrage sensible, difficulté à lire les contraintes financières, besoin d’expliquer un choix de manière claire.',
    support:
      'Spécialiste des finances publiques locales, du budget ou de l’administration municipale.'
  },
  {
    title: 'Ressources humaines, management et organisation interne',
    purpose:
      'Travailler les rapports avec les services, les enjeux RH, l’organisation municipale et les tensions liées au fonctionnement interne.',
    when:
      'Tensions internes, besoin de clarifier les relations élus-services, réorganisation, prise de délégation ou montée en responsabilité.',
    support:
      'Spécialiste RH publiques, management territorial, organisation des services.'
  },
  {
    title: 'Sécurité, prévention et tranquillité publique',
    purpose:
      'Accompagner les élus sur des sujets politiquement très sensibles, fortement visibles et exposés à des attentes immédiates.',
    when:
      'Montée d’inquiétude locale, événement exposé, pression médiatique, besoin d’une parole juste sur un sujet très attendu.',
    support:
      'Spécialiste de prévention, sécurité locale, tranquillité publique ou médiation territoriale.'
  }
];
