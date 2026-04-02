// src/data/partis.ts
// Base éditoriale MARYAN — Positions des partis sur les thèmes municipaux
// Sources : programmes officiels 2022-2024, Maire-Info, AMF, Institut Montaigne
// Dernière mise à jour : avril 2026

export type NiveauCertitude = 'fort' | 'moyen' | 'interprété'

export type PositionTheme = {
  position: string              // Ce que défend le parti sur ce thème
  nuance?: string               // Les fractures internes ou exceptions notables
  source: string                // D'où vient cette info
  certitude: NiveauCertitude    // Fort = écrit noir sur blanc, moyen = position constante, interprété = Mistral+contexte
  mots_declencheurs: string[]   // Ce que l'élu dit qui active cette alerte
  alerte_douce: string          // Formulation MARYAN pour interpeller l'élu
}

export type Parti = {
  id: string
  label: string
  famille: string
  nuances_ministere: string[]   // Codes officiels ministère de l'Intérieur
  couleur: string               // Couleur hex pour l'UI
  themes: Record<string, PositionTheme>
}

// ─── THÈMES COUVERTS ─────────────────────────────────────────────────────────
// 'eau'           → gestion de l'eau potable (régie vs DSP)
// 'cantine'       → restauration scolaire (régie vs DSP, tarification)
// 'logement'      → logement social, SRU, PLU
// 'securite'      → police municipale, vidéosurveillance
// 'ecologie'      → transition énergétique, ZFE, ENR
// 'budget'        → fiscalité locale, endettement, investissement
// 'intercommunalite' → transferts de compétences, EPCI
// 'laicite'       → neutralité des services publics, subventions associations
// 'dsp'           → délégations de service public en général

export const partis: Parti[] = [

  // ─── LA FRANCE INSOUMISE ───────────────────────────────────────────────────
  {
    id: 'LFI',
    label: 'La France Insoumise',
    famille: 'Gauche radicale',
    nuances_ministere: ['LEXG', 'LGAU'],
    couleur: '#CC0029',
    themes: {
      eau: {
        position: "Passage intégral de la gestion de l'eau en régie publique locale. Opposition ferme à toute délégation à des opérateurs privés (Veolia, Suez). Modèle de référence : la régie de Paris.",
        source: "Programme L'Avenir en commun 2022 + programme NFP 2024 (Maire-Info, juin 2024)",
        certitude: 'fort',
        mots_declencheurs: ['déléguer', 'concession', 'DSP', 'Veolia', 'Suez', 'affermage', 'opérateur privé'],
        alerte_douce: "Tu sais que LFI a tendance à défendre le retour en régie publique pour l'eau, et s'oppose aux DSP avec des opérateurs privés. Si tu pars dans une autre direction, il peut être utile de préparer comment tu vas l'expliquer à ton groupe."
      },
      cantine: {
        position: "Service public de la cantine scolaire généralisé, avec tarification sociale. Le NFP propose la gratuité progressive avec compensation intégrale de l'État aux collectivités.",
        source: "Programme NFP législatives 2024 (Maire-Info, juin 2024)",
        certitude: 'fort',
        mots_declencheurs: ['privatiser', 'externaliser', 'prestataire', 'appel d\'offres cantine', 'délégataire restauration'],
        alerte_douce: "Tu sais que LFI défend un service de cantine en régie et gratuit. Une externalisation ou une DSP serait probablement mal vécue par ton groupe."
      },
      logement: {
        position: "Application stricte de la loi SRU et aggravation des sanctions contre les communes hors-la-loi. Encadrement obligatoire des loyers dans les zones tendues. Opposition à l'assouplissement du PLU au profit des promoteurs.",
        source: "Programme NFP 2024 + positions LFI à l'Assemblée",
        certitude: 'fort',
        mots_declencheurs: ['assouplir SRU', 'réduire logement social', 'dérogation PLU', 'promoteur', 'densification'],
        alerte_douce: "Tu sais que LFI est très attaché à la loi SRU et à l'encadrement des loyers. Un assouplissement de ces règles risque de créer une tension avec ta famille politique."
      },
      securite: {
        position: "Méfiance vis-à-vis de l'extension des polices municipales et de la vidéosurveillance. Préférence pour la prévention et le travail social. Opposition à l'armement systématique des polices municipales.",
        source: "Positions LFI à l'Assemblée nationale, 2022-2024",
        certitude: 'moyen',
        mots_declencheurs: ['armer la police municipale', 'étendre la vidéosurveillance', 'caméras', 'police municipale armée'],
        alerte_douce: "Tu sais que LFI a plutôt tendance à privilégier la prévention à l'extension de la police municipale armée. Ça peut créer un désaccord dans ton groupe."
      },
      ecologie: {
        position: "Planification écologique à l'échelle locale. Soutien aux ENR citoyennes et locales. Opposition à la ZFE si elle pénalise les ménages modestes sans alternative de transport.",
        source: "Programme L'Avenir en commun 2022 + livrets thématiques LFI",
        certitude: 'fort',
        mots_declencheurs: ['nucléaire', 'contre les éoliennes', 'suspendre ZFE', 'reporter transition'],
        alerte_douce: "Tu sais que LFI est favorable à la transition écologique accélérée et aux ENR. Une position de freinage risque d'être perçue comme en contradiction avec le programme de ta famille."
      },
      budget: {
        position: "Opposition aux politiques d'austérité locales. Favorable à l'investissement public, même au prix d'un endettement maîtrisé. Critique de la contractualisation imposée par l'État.",
        source: "Positions LFI sur les finances locales, débats parlementaires 2022-2024",
        certitude: 'moyen',
        mots_declencheurs: ['réduire les dépenses', 'désendetter', 'austérité', 'ne pas augmenter les impôts'],
        alerte_douce: "Tu sais que LFI est en général critique des politiques de rigueur budgétaire locale et préfère l'investissement public. Un discours très axé sur la réduction des dépenses peut surprendre dans ton groupe."
      },
      intercommunalite: {
        position: "Favorable à une décentralisation renforcée mais méfiant des transferts de compétences qui éloignent la décision des citoyens. Défense de la démocratie directe à l'échelon local.",
        source: "Programme 6e République LFI + positions parlementaires",
        certitude: 'moyen',
        mots_declencheurs: ['transférer à l\'agglo', 'mutualiser', 'rationaliser les compétences'],
        alerte_douce: "Tu sais que LFI défend la démocratie de proximité et peut être méfiant vis-à-vis des transferts qui éloignent la décision du terrain. Ça vaut le coup de préparer ton argumentaire."
      },
      laicite: {
        position: "Laïcité stricte dans les services publics locaux. Mais opposition aux mesures discriminatoires ou aux restrictions de subventions ciblant des associations sur critère religieux.",
        nuance: "Fracture interne : certains élus LFI sont plus proches d'une laïcité 'ouverte', d'autres défendent une application stricte.",
        source: "Positions publiques LFI, débats sur la laïcité 2022-2024",
        certitude: 'moyen',
        mots_declencheurs: ['subvention association religieuse', 'interdire voile services', 'laïcité stricte'],
        alerte_douce: "La laïcité est un sujet de débat interne à LFI. Selon comment tu la formules, tu peux te retrouver en tension avec une partie de ton groupe."
      },
      dsp: {
        position: "Opposition de principe aux délégations de service public. Préférence pour la régie directe ou les régies autonomes. Retour en régie défendu pour l'eau, les déchets, le stationnement.",
        source: "Programme L'Avenir en commun 2022 + NFP 2024",
        certitude: 'fort',
        mots_declencheurs: ['déléguer', 'concéder', 'opérateur privé', 'PPP', 'partenariat public-privé'],
        alerte_douce: "Tu sais que LFI s'oppose en principe aux DSP et aux PPP. Si tu vas vers une délégation à un acteur privé, il sera utile de pouvoir expliquer pourquoi dans le cadre de ta famille politique."
      }
    }
  },

  // ─── PARTI SOCIALISTE ──────────────────────────────────────────────────────
  {
    id: 'PS',
    label: 'Parti Socialiste',
    famille: 'Gauche',
    nuances_ministere: ['LSOC', 'LDVG'],
    couleur: '#FF69A7',
    themes: {
      eau: {
        position: "Favorable à la gestion publique de l'eau, mais pragmatique : certaines délégations historiques sont maintenues dans les villes PS (Lyon, Bordeaux avant 2020). Tendance à renforcer le contrôle public sans rupture brutale.",
        nuance: "Fracture entre aile gauche (retour en régie pur) et aile gestionnaire (DSP avec régulation renforcée).",
        source: "Pratiques des exécutifs PS, programme NFP 2024",
        certitude: 'moyen',
        mots_declencheurs: ['laisser à Veolia', 'renouveler DSP eau', 'pas changer le contrat eau'],
        alerte_douce: "Tu sais que le PS a tendance à favoriser le retour en régie ou un contrôle public renforcé sur l'eau. Renouveler une DSP sans débat peut créer un inconfort dans ton groupe."
      },
      logement: {
        position: "Défense active de la loi SRU. Objectif de 150 000 logements sociaux par an. Sanctions contre les communes qui ne respectent pas les 25%. Encadrement des loyers dans les zones tendues.",
        source: "Programme PS 2022 (tous-les-programmes.fr)",
        certitude: 'fort',
        mots_declencheurs: ['réduire quotas logement social', 'assouplir SRU', 'trop de HLM'],
        alerte_douce: "Tu sais que le PS défend fermement la loi SRU et les quotas de logement social. Un assouplissement de ces règles serait difficile à porter dans ton groupe."
      },
      securite: {
        position: "Police municipale comme complément à la police nationale, pas comme substitut. Favorable à la vidéosurveillance dans certains contextes urbains, avec encadrement. Accent mis sur la prévention.",
        source: "Positions PS, pratiques dans les villes dirigées par le PS",
        certitude: 'moyen',
        mots_declencheurs: ['remplacer police nationale', 'armer systématiquement', 'vidéosurveillance partout'],
        alerte_douce: "Tu sais que le PS tend à positionner la police municipale comme complémentaire, pas comme substitut à la police nationale. Un discours très sécuritaire peut créer un décalage."
      },
      ecologie: {
        position: "Transition écologique progressive. Soutien aux ENR. Position intermédiaire sur le nucléaire (ni pour ni contre l'extension). Opposé aux ZFE sans alternatives de mobilité.",
        source: "Programme PS-Place Publique 2024, réponse WWF",
        certitude: 'moyen',
        mots_declencheurs: ['bloquer les éoliennes', 'reporter la transition', 'contre la ZFE'],
        alerte_douce: "Tu sais que le PS soutient la transition écologique. Une position de freinage sur les ENR ou la mobilité durable peut créer un décalage avec ta famille politique."
      },
      budget: {
        position: "Favorable au renforcement des ressources des collectivités. Opposition aux transferts de charges sans compensation. Contrôle a posteriori préféré au contrôle a priori par l'État.",
        source: "Programme PS 2022",
        certitude: 'moyen',
        mots_declencheurs: ['réduire massivement les dépenses', 'baisser les effectifs fonctionnaires'],
        alerte_douce: "Tu sais que le PS défend des collectivités bien dotées en ressources et en personnel. Un discours trop orienté vers la réduction des dépenses publiques locales peut surprendre dans ton groupe."
      },
      logement_social: {
        position: "Sanctions contre les maires ne respectant pas l'obligation de 25% de logements sociaux. Construction massive de logements très sociaux.",
        source: "Programme PS 2022",
        certitude: 'fort',
        mots_declencheurs: ['on ne peut pas faire 25%', 'trop de logements sociaux', 'exempter de SRU'],
        alerte_douce: "Tu sais que le PS est très clair sur l'application de la loi SRU. Invoquer des difficultés à atteindre les quotas sans plan d'action concret peut créer une tension dans ton groupe."
      },
      dsp: {
        position: "Pragmatique : maintien possible des DSP existantes, mais préférence pour la régie ou les SPL (Sociétés Publiques Locales) pour les nouveaux services. Contrôle renforcé des délégataires.",
        source: "Pratiques dans les villes PS, programme NFP 2024",
        certitude: 'moyen',
        mots_declencheurs: ['confier au privé', 'nouveau contrat DSP', 'opérateur privé pour'],
        alerte_douce: "Tu sais que le PS est plutôt favorable aux SPL ou à la régie quand c'est possible. Créer une nouvelle DSP sans explorer ces alternatives peut surprendre dans ton groupe."
      }
    }
  },

  // ─── LES ÉCOLOGISTES / EELV ────────────────────────────────────────────────
  {
    id: 'EELV',
    label: 'Les Écologistes (ex-EELV)',
    famille: 'Gauche / Centre-gauche',
    nuances_ministere: ['LVEC', 'LDVG'],
    couleur: '#33A02C',
    themes: {
      eau: {
        position: "Retour en régie publique de l'eau. Modèle de référence : Grenoble (première ville à revenir en régie en 2000). Gestion 100% publique défendue.",
        source: "Manifeste écologiste local + pratiques à Grenoble, Poitiers, Strasbourg",
        certitude: 'fort',
        mots_declencheurs: ['DSP eau', 'Veolia', 'Suez', 'déléguer eau', 'concession eau'],
        alerte_douce: "Tu sais que les Écologistes défendent le retour en régie pour l'eau — c'est même l'un de leurs emblèmes depuis Grenoble. Une DSP eau sera difficile à défendre dans ton groupe."
      },
      ecologie: {
        position: "Transition écologique comme priorité absolue. ZFE défendues si accompagnées d'alternatives de mobilité. ENR citoyennes et locales. Rénovation thermique des bâtiments publics. Végétalisation des espaces publics.",
        source: "Manifeste EELV, pratiques dans les villes écologistes",
        certitude: 'fort',
        mots_declencheurs: ['suspendre ZFE', 'bloquer ENR', 'pas d\'urgence écologique', 'reporter', 'trop coûteux'],
        alerte_douce: "Tu sais que l'écologie c'est la raison d'être des Écologistes. Un discours de freinage ou de report sera très difficile à porter dans ton groupe."
      },
      logement: {
        position: "Anti-étalement urbain. Densification qualitative. Objectifs de logement social respectés. Opposition aux grands projets d'aménagement consommateurs de foncier.",
        nuance: "Tension entre objectifs de densification et défense des espaces verts. Certains élus EELV s'opposent à des projets de logements denses pour protéger des jardins.",
        source: "Positions EELV en conseil municipal dans les grandes villes",
        certitude: 'moyen',
        mots_declencheurs: ['artificialiser', 'construire en périphérie', 'grand projet urbain', 'bétonner'],
        alerte_douce: "Tu sais que les Écologistes sont très attentifs à la sobriété foncière. Un projet qui artificialise des terres ou détruit des espaces verts va créer un débat dans ton groupe."
      },
      securite: {
        position: "Prévention et médiation avant répression. Méfiance vis-à-vis de la vidéosurveillance (efficacité contestée). Opposition à l'armement des polices municipales.",
        source: "Positions EELV, pratiques dans les villes écologistes",
        certitude: 'fort',
        mots_declencheurs: ['armer police municipale', 'étendre vidéosurveillance', 'tolérance zéro'],
        alerte_douce: "Tu sais que les Écologistes défendent la prévention plutôt que la répression et sont très critiques de la vidéosurveillance. Ça peut créer un vrai débat dans ton groupe."
      },
      budget: {
        position: "Investissement public dans la transition écologique. Oppose les économies qui touchent aux services écologiques ou à la prévention.",
        source: "Positions EELV aux débats budgétaires locaux",
        certitude: 'moyen',
        mots_declencheurs: ['couper le budget environnement', 'réduire les effectifs espaces verts'],
        alerte_douce: "Tu sais que les Écologistes défendent l'investissement dans la transition. Des coupes sur les budgets environnement ou mobilité douce vont être mal accueillis."
      },
      dsp: {
        position: "Opposition aux DSP, sauf exception justifiée. Préférence pour les régies ou les sociétés à capital public. Vigilance sur les clauses environnementales dans les contrats.",
        source: "Pratiques EELV dans les exécutifs locaux",
        certitude: 'moyen',
        mots_declencheurs: ['confier au privé', 'DSP', 'opérateur privé'],
        alerte_douce: "Tu sais que les Écologistes préfèrent la gestion directe ou les structures publiques. Une DSP doit être vraiment justifiée pour passer dans ton groupe."
      }
    }
  },

  // ─── LES RÉPUBLICAINS ──────────────────────────────────────────────────────
  {
    id: 'LR',
    label: 'Les Républicains',
    famille: 'Droite',
    nuances_ministere: ['LLRM', 'LDVD'],
    couleur: '#003189',
    themes: {
      budget: {
        position: "Maîtrise de la dépense publique locale. Opposition à toute hausse des impôts locaux. Recherche d'économies et de mutualisation. Méfiance vis-à-vis de l'endettement.",
        source: "Programme LR, contre-budget 2024, positions AMF (historiquement LR)",
        certitude: 'fort',
        mots_declencheurs: ['augmenter les impôts locaux', 'nouvelle taxe', 'emprunter pour fonctionner'],
        alerte_douce: "Tu sais que LR défend la maîtrise de la dépense et s'oppose aux hausses d'impôts locaux. Proposer une augmentation fiscale sans plan de réduction en parallèle va créer un débat."
      },
      securite: {
        position: "Police municipale forte, armée, bien dotée. Vidéosurveillance défendue comme outil efficace. Partenariat renforcé avec la police nationale. Tolérance zéro sur les incivilités.",
        source: "Programme LR + positions des maires LR",
        certitude: 'fort',
        mots_declencheurs: ['réduire police municipale', 'contre vidéosurveillance', 'désarmer'],
        alerte_douce: "Tu sais que LR défend une politique sécuritaire affirmée avec police municipale armée et vidéosurveillance. Un discours plus nuancé sur ces sujets peut surprendre dans ton groupe."
      },
      logement: {
        position: "Favorable à l'assouplissement de la loi SRU pour les communes rurales et périurbaines. Critique des quotas contraignants. Préférence pour l'accession à la propriété.",
        nuance: "Fracture entre maires LR urbains (respectent SRU) et ruraux/périurbains (critiquent les quotas).",
        source: "Positions LR à l'Assemblée, débats sur la loi SRU",
        certitude: 'moyen',
        mots_declencheurs: ['construire beaucoup de HLM', 'respecter strictement SRU', 'social d\'abord'],
        alerte_douce: "Tu sais que LR est plutôt favorable à l'accession à la propriété et critique vis-à-vis des contraintes SRU. Un programme très centré sur le logement social peut créer une tension."
      },
      ecologie: {
        position: "Transition écologique acceptée si elle est 'réaliste et économiquement supportable'. Défense du nucléaire. Méfiance vis-à-vis des ZFE et des contraintes environnementales sur les entreprises.",
        source: "Réponse LR au questionnaire WWF 2024, positions parlementaires",
        certitude: 'fort',
        mots_declencheurs: ['accélérer ZFE', 'interdire thermique vite', '100% renouvelable'],
        alerte_douce: "Tu sais que LR défend une transition 'au rythme de l'économie' et soutient le nucléaire. Un discours très radical sur la transition ou contre le nucléaire peut créer un désaccord."
      },
      dsp: {
        position: "Favorable aux DSP comme outil de bonne gestion. Le privé est perçu comme plus efficace pour certains services. Contrôle des coûts mis en avant.",
        source: "Positions LR, pratiques dans les villes LR",
        certitude: 'fort',
        mots_declencheurs: ['reprendre en régie', 'renationaliser', 'pas de privé'],
        alerte_douce: "Tu sais que LR est plutôt favorable aux DSP comme outil de gestion efficace. Un retour en régie doit être justifié économiquement pour être bien reçu dans ton groupe."
      },
      intercommunalite: {
        position: "Méfiance vis-à-vis des transferts de compétences qui affaiblissent les communes. Défense de la clause générale de compétence. Opposition à la suppression d'échelons locaux imposée d'en haut.",
        source: "Positions LR, AMF",
        certitude: 'moyen',
        mots_declencheurs: ['transférer à l\'agglo', 'supprimer la commune', 'régionaliser'],
        alerte_douce: "Tu sais que LR défend l'autonomie communale et se méfie des transferts imposés vers l'intercommunalité. C'est un sujet sensible dans ta famille politique."
      }
    }
  },

  // ─── RASSEMBLEMENT NATIONAL ────────────────────────────────────────────────
  {
    id: 'RN',
    label: 'Rassemblement National',
    famille: 'Extrême droite',
    nuances_ministere: ['LRPR', 'LEXD'],
    couleur: '#1E3A8A',
    themes: {
      budget: {
        position: "Stabilité fiscale absolue — la charte RN pour les municipales 2026 impose l'engagement de ne pas augmenter les taux pendant tout le mandat. 'Gestion en bon père de famille', lutte contre les 'gabegies'.",
        source: "Charte RN municipales 2026 (Public Sénat, décembre 2025)",
        certitude: 'fort',
        mots_declencheurs: ['augmenter les impôts locaux', 'nouvelle taxe', 'hausse de taux'],
        alerte_douce: "Tu sais que la charte RN pour les municipales impose l'engagement de ne pas augmenter les impôts locaux. Proposer une hausse, même justifiée, sera très compliqué à défendre dans ton groupe."
      },
      securite: {
        position: "Toute police municipale doit être armée — c'est un engagement explicite de la charte RN. Extension de la vidéosurveillance. Priorité absolue à la sécurité.",
        source: "Charte RN municipales 2026",
        certitude: 'fort',
        mots_declencheurs: ['police municipale non armée', 'réduire vidéo', 'moins de police'],
        alerte_douce: "Tu sais que le RN a fait de l'armement de la police municipale un engagement incontournable de sa charte. Une position différente sera difficile à tenir dans ton groupe."
      },
      laicite: {
        position: "Laïcité stricte dans tous les secteurs de la vie communale. Aucune subvention aux organisations communautaristes. Aucune subvention aux associations liées à l'immigration.",
        source: "Charte RN municipales 2026",
        certitude: 'fort',
        mots_declencheurs: ['subvention association culturelle', 'financer', 'soutenir association'],
        alerte_douce: "Tu sais que le RN applique une définition stricte de la laïcité et refuse de subventionner certaines associations. Avant de voter une subvention, vérifie que ça ne rentre pas en contradiction avec les engagements de ta charte."
      },
      ecologie: {
        position: "Transition écologique sceptique. Opposition aux ZFE. Pas d'objectif ENR affiché. Soutien au nucléaire. Le mot 'climat' n'apparaît pas dans le programme 2024.",
        source: "Programme RN législatives 2024, Réseau Action Climat juin 2024",
        certitude: 'fort',
        mots_declencheurs: ['accélérer ZFE', 'éoliennes', 'renouvelables', 'urgence climatique'],
        alerte_douce: "Tu sais que le RN est très en retrait sur la transition écologique et les ENR. Un discours pro-éolien ou très militant sur le climat peut surprendre dans ton groupe."
      },
      intercommunalite: {
        position: "Simplification 'drastique' du millefeuille territorial pour réduire la dépense. Proposition de suppression des régions évoquée. 'Rendre du pouvoir aux élus de proximité'.",
        source: "Programme RN législatives 2024 (Maire-Info, juin 2024)",
        certitude: 'fort',
        mots_declencheurs: ['renforcer l\'agglo', 'transférer à la région', 'plus d\'intercommunalité'],
        alerte_douce: "Tu sais que le RN veut réduire les échelons intermédiaires et rendre du pouvoir aux élus de proximité. Un discours pro-intercommunalité peut créer un décalage."
      },
      dsp: {
        position: "Pas de position officielle claire sur les DSP. Pragmatisme revendiqué. Gestion 'efficace' et 'sans gaspillage' comme boussole.",
        source: "Programme RN + pratiques dans les villes RN (Perpignan, Hayange)",
        certitude: 'interprété',
        mots_declencheurs: [],
        alerte_douce: "Le RN n'a pas de position claire sur les DSP. Je peux pas te dire si ta position crée une tension — c'est quelque chose à vérifier avec ton groupe."
      }
    }
  },

  // ─── PARTI COMMUNISTE FRANÇAIS ─────────────────────────────────────────────
  {
    id: 'PCF',
    label: 'Parti Communiste Français',
    famille: 'Gauche',
    nuances_ministere: ['LCOM', 'LGAU'],
    couleur: '#CC0000',
    themes: {
      eau: {
        position: "Gestion 100% publique de l'eau. Retour en régie partout où c'est possible. Longue tradition de défense des services publics municipaux.",
        source: "Positions PCF, pratiques dans les villes PCF",
        certitude: 'fort',
        mots_declencheurs: ['déléguer eau', 'DSP eau', 'opérateur privé eau'],
        alerte_douce: "Tu sais que le PCF est historiquement très attaché à la gestion publique de l'eau. Une DSP va créer un désaccord profond dans ton groupe."
      },
      budget: {
        position: "Investissement public, refus de l'austérité locale. Défense des services publics contre toute restriction budgétaire. Critique de la contractualisation imposée par l'État.",
        source: "Positions PCF aux débats parlementaires et locaux",
        certitude: 'fort',
        mots_declencheurs: ['réduire services publics', 'baisser les effectifs', 'externaliser'],
        alerte_douce: "Tu sais que le PCF défend les services publics et s'oppose aux réductions de moyens. Un discours d'austérité locale va créer une vraie tension dans ton groupe."
      },
      dsp: {
        position: "Opposition de principe aux DSP. Défense du secteur public et de la régie directe. Critique des PPP et des concessions.",
        source: "Positions PCF historiques et actuelles",
        certitude: 'fort',
        mots_declencheurs: ['DSP', 'déléguer', 'confier au privé', 'PPP'],
        alerte_douce: "Tu sais que le PCF s'oppose aux DSP par principe. C'est un sujet où le désaccord sera frontal si tu pars vers une délégation privée."
      }
    }
  },

  // ─── RENAISSANCE / MAJORITÉ PRÉSIDENTIELLE ────────────────────────────────
  {
    id: 'REN',
    label: 'Renaissance / Majorité présidentielle',
    famille: 'Centre',
    nuances_ministere: ['LREM', 'LMDM'],
    couleur: '#FFC107',
    themes: {
      budget: {
        position: "Contractualisation avec l'État pour maîtriser les dépenses locales. Soutien à l'investissement via les dotations (DSIL, DETR). Modernisation de la gestion publique.",
        source: "Programme Ensemble 2024, pratiques gouvernementales",
        certitude: 'moyen',
        mots_declencheurs: ['refuser la contractualisation', 's\'opposer à l\'État', 'dépenser sans limite'],
        alerte_douce: "Tu sais que la majorité présidentielle défend la maîtrise des dépenses dans le cadre de la contractualisation avec l'État. Un discours de rupture avec ce cadre peut créer un inconfort."
      },
      ecologie: {
        position: "Transition écologique 'pragmatique'. Soutien aux ENR mais aussi au nucléaire. ZFE accompagnées. DSIL fléchée sur la rénovation thermique.",
        source: "Programme Ensemble 2024, LFI 2025-2026 (Sénat)",
        certitude: 'moyen',
        mots_declencheurs: ['bloquer transition', 'contre les ENR', 'ignorer le climat'],
        alerte_douce: "Tu sais que la majorité présidentielle défend une transition 'à la française' — ni trop lente ni trop radicale. Un positionnement extrême dans un sens ou l'autre peut créer un écart."
      },
      dsp: {
        position: "Pragmatique. DSP et régie traitées comme des outils équivalents selon le contexte. Pas de dogmatisme dans un sens ou l'autre.",
        source: "Pratiques dans les villes Ensemble",
        certitude: 'moyen',
        mots_declencheurs: [],
        alerte_douce: "La majorité présidentielle est pragmatique sur les DSP. Je peux pas te signaler de tension forte — mais vérifie avec ton groupe selon le service concerné."
      }
    }
  }
]

// ─── MAPPING étiquette login → parti(s) probable(s) ──────────────────────────
// Basé sur les nuances ministérielles et les étiquettes courantes
export const LABEL_TO_PARTI: Record<string, string[]> = {
  'sans_etiquette': [],
  'gauche':         ['LFI', 'PS', 'PCF'],
  'centre_gauche':  ['PS', 'EELV'],
  'ecologiste':     ['EELV'],
  'centre':         ['REN'],
  'centre_droit':   ['LR'],
  'droite':         ['LR', 'RN'],
  'autre':          []
}

// ─── FONCTIONS UTILITAIRES ────────────────────────────────────────────────────

/** Récupère le parti d'un élu et détecte les tensions potentielles sur un thème */
export function detecterTension(partiId: string, theme: string): PositionTheme | null {
  const parti = partis.find(p => p.id === partiId)
  if (!parti) return null
  return parti.themes[theme] || null
}

/** Récupère tous les mots déclencheurs d'un parti (pour injection dans Mistral) */
export function getMotsDeclencheurs(partiId: string): Record<string, string[]> {
  const parti = partis.find(p => p.id === partiId)
  if (!parti) return {}
  return Object.entries(parti.themes).reduce((acc, [theme, pos]) => {
    if (pos.mots_declencheurs.length > 0) {
      acc[theme] = pos.mots_declencheurs
    }
    return acc
  }, {} as Record<string, string[]>)
}

/**
 * Construit la section du system prompt Mistral sur le contexte politique de l'élu.
 * Injecte les positions et alertes douces du ou des partis probables.
 * Si plusieurs partis correspondent à l'étiquette, injecte la convergence.
 */
export function buildPartisPromptSection(politicalLabel: string | null | undefined): string {
  if (!politicalLabel || politicalLabel === 'sans_etiquette' || politicalLabel === 'autre') {
    return `CONTEXTE POLITIQUE : L'élu·e n'a pas renseigné d'étiquette politique ou est sans étiquette. Ne fais aucune hypothèse sur ses positions politiques.`
  }

  const partiIds = LABEL_TO_PARTI[politicalLabel] || []
  if (!partiIds.length) {
    return `CONTEXTE POLITIQUE : L'élu·e a indiqué "${politicalLabel}" comme étiquette. Aucun parti précis identifié. Ne fais aucune hypothèse.`
  }

  const partisDatas = partiIds
    .map(id => partis.find(p => p.id === id))
    .filter(Boolean) as Parti[]

  const lignes: string[] = [
    `CONTEXTE POLITIQUE DE L'ÉLU·E :`,
    `Étiquette : ${politicalLabel} → famille(s) probable(s) : ${partisDatas.map(p => `${p.label} (${p.famille})`).join(' / ')}`,
    ``,
    `Positions connues de cette famille politique sur les thèmes municipaux :`,
    `(Utilise ces informations pour signaler des tensions éventuelles, jamais pour faire la politique à la place de l'élu·e)`,
    ``
  ]

  // On agrège les thèmes de tous les partis correspondants
  const themesVus = new Set<string>()
  for (const parti of partisDatas) {
    for (const [theme, pos] of Object.entries(parti.themes)) {
      if (themesVus.has(theme)) continue
      themesVus.add(theme)
      const certLabel = pos.certitude === 'fort' ? 'position ferme' : pos.certitude === 'moyen' ? 'position constante' : 'position interprétée'
      lignes.push(`— ${theme.toUpperCase()} [${certLabel}] : ${pos.position}`)
      if (pos.nuance) lignes.push(`  ↳ Nuance : ${pos.nuance}`)
      if (pos.mots_declencheurs.length) {
        lignes.push(`  ↳ Mots déclencheurs : ${pos.mots_declencheurs.join(', ')}`)
      }
      lignes.push(`  ↳ Alerte douce si tension : "${pos.alerte_douce}"`)
      lignes.push(`  ↳ Source : ${pos.source}`)
      lignes.push(``)
    }
  }

  lignes.push(
    `Règle d'utilisation :`,
    `Si l'élu·e mentionne ou envisage quelque chose qui entre en tension avec les positions ci-dessus, signale-le sobrement avec l'alerte douce correspondante.`,
    `Ne le fais QUE si le sujet est directement abordé dans la conversation — jamais en introduction, jamais de façon systématique.`,
    `Si la certitude est 'interprétée', formule avec plus de prudence.`,
    `Tu ne prends jamais parti politiquement. Tu aides l'élu·e à anticiper les tensions dans son groupe.`
  )

  return lignes.join('\n')
}
