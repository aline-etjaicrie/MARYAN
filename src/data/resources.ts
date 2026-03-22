export type DiagnosticProfile =
  | "mandat_recent"
  | "arbitrage"
  | "isolement"
  | "surcharge"
  | "exposition"
  | "tension_relationnelle"
  | "besoin_methode"
  | "prise_de_parole"
  | "gouvernance";

export type MaryanResource = {
  id: string;
  title: string;
  slug: string;
  pillar: "se_situer" | "comprendre" | "agir" | "se_proteger";
  format: "fiche" | "guide" | "checklist" | "repere" | "parcours";
  promise: string;
  intro: string;
  understand: string[];
  commonTrap: string;
  actions: string[];
  reflex: string;
  sensitiveNote?: string;
  targetRoles: Array<"maire" | "adjoint" | "majorite" | "opposition" | "interco">;
  experienceLevels: Array<"debutant" | "intermediaire" | "confirme">;
  diagnosticProfiles: Array<DiagnosticProfile>;
  useCases: string[];
  tags: string[];
  ctaType: "copilote" | "offre_individuelle" | "offre_collectivite" | "formation_irl";
  irlPotential: boolean;
  priority: "haute" | "moyenne";
};

export const maryanResources: MaryanResource[] = [
  {
    id: "trouver-sa-place-dans-le-mandat",
    title: "Trouver sa place dans le mandat",
    slug: "trouver-sa-place-dans-le-mandat",
    pillar: "se_situer",
    format: "fiche",
    promise: "Aider l’élu·e à se repérer dans sa fonction réelle, sans surjouer ni se disperser.",
    intro: "Être élu·e ne veut pas dire tout savoir, ni tout porter immédiatement. Au début d’un mandat, il y a souvent un décalage entre la fonction obtenue et la posture encore en construction. Trouver sa place, ce n’est pas prendre toute la place : c’est comprendre où vous êtes utile, où vous êtes attendu·e, et où vous devez encore vous repérer.",
    understand: [
      "Un mandat commence souvent avec plus de responsabilités que de repères.",
      "La bonne posture se construit dans le temps, pas dans la surenchère.",
      "Être juste dans sa place vaut mieux qu’être visible partout."
    ],
    commonTrap: "Vouloir compenser le manque de repères par de l’hyperprésence, des réactions trop rapides ou une prise de position sur tout.",
    actions: [
      "Clarifier ce qui relève vraiment de votre rôle.",
      "Repérer vos zones de responsabilité directe.",
      "Accepter une phase d’apprentissage sans vous dévaloriser."
    ],
    reflex: "Ne cherchez pas à paraître déjà installé·e. Cherchez d’abord à devenir juste dans votre place.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent", "isolement", "surcharge"],
    useCases: ["prise_de_fonction", "posture", "repères"],
    tags: ["place", "posture", "mandat", "prise_de_fonction"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "majorite-opposition-ce-que-ca-change-vraiment",
    title: "Majorité, opposition : ce que ça change vraiment",
    slug: "majorite-opposition-ce-que-ca-change-vraiment",
    pillar: "se_situer",
    format: "fiche",
    promise: "Clarifier les marges de manœuvre selon la place occupée dans l’assemblée locale.",
    intro: "On n’exerce pas un mandat de la même manière selon qu’on est dans la majorité, dans l’opposition ou dans une position plus transversale. Les attentes, les leviers, les responsabilités et les risques ne sont pas les mêmes.",
    understand: [
      "La majorité agit avec une responsabilité d’exécution et de cohérence.",
      "L’opposition agit avec une responsabilité de vigilance, d’interpellation et de proposition.",
      "Comprendre sa place évite les frustrations inutiles et les postures mal ajustées."
    ],
    commonTrap: "Se comparer à une autre position politique sans tenir compte des responsabilités réelles qui l’accompagnent.",
    actions: [
      "Identifier les leviers réels de votre position.",
      "Ajuster vos attentes à votre place institutionnelle.",
      "Choisir une manière d’être utile cohérente avec votre rôle."
    ],
    reflex: "La bonne posture ne consiste pas à imiter l’autre camp, mais à habiter lucidement sa place.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["mandat_recent", "gouvernance", "exposition"],
    useCases: ["majorite", "opposition", "positionnement"],
    tags: ["majorité", "opposition", "posture", "rôle"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "moyenne"
  },
  {
    id: "elus-administration-qui-fait-quoi",
    title: "Élus / administration : qui fait quoi",
    slug: "elus-administration-qui-fait-quoi",
    pillar: "se_situer",
    format: "guide",
    promise: "Éviter les malentendus de rôle entre décision politique et mise en œuvre administrative.",
    intro: "Une collectivité fonctionne mieux quand les rôles sont clairs. Les élu·es donnent une direction, arbitrent, représentent et portent politiquement. L’administration prépare, instruit, alerte, met en œuvre, sécurise. Quand cette frontière devient floue, les tensions montent vite.",
    understand: [
      "Les élu·es décident et assument politiquement.",
      "Les services instruisent, exécutent et sécurisent.",
      "La confusion des rôles use tout le monde."
    ],
    commonTrap: "Attendre des services qu’ils portent la décision politique à votre place, ou inversement intervenir trop directement dans l’exécution.",
    actions: [
      "Distinguer ce qui relève de la décision, de l’instruction et de l’exécution.",
      "Poser les attentes clairement.",
      "Éviter les injonctions floues ou contradictoires."
    ],
    reflex: "Plus les rôles sont clairs, moins les relations s’usent inutilement.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["mandat_recent", "tension_relationnelle", "gouvernance"],
    useCases: ["relations_internes", "services", "gouvernance"],
    tags: ["administration", "services", "rôles", "gouvernance"],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "ne-pas-confondre-visibilite-et-pouvoir-reel",
    title: "Ne pas confondre visibilité et pouvoir réel",
    slug: "ne-pas-confondre-visibilite-et-pouvoir-reel",
    pillar: "se_situer",
    format: "fiche",
    promise: "Aider à distinguer présence publique, influence et capacité réelle d’action.",
    intro: "Dans la vie locale, on peut être très visible sans avoir beaucoup de prise, ou au contraire avoir une influence réelle sans forte exposition publique. Confondre les deux brouille souvent la lecture du mandat.",
    understand: [
      "La visibilité n’est pas toujours synonyme de pouvoir.",
      "Le pouvoir réel tient aussi à la qualité des leviers, des alliances et du timing.",
      "Mieux lire ces écarts aide à moins se disperser."
    ],
    commonTrap: "Croire qu’il faut être vu partout pour être utile politiquement.",
    actions: [
      "Identifier vos vrais leviers d’action.",
      "Distinguer présence symbolique et capacité de décision.",
      "Choisir vos lieux et moments d’intervention."
    ],
    reflex: "Être partout n’est pas une stratégie. Être utile au bon endroit, si.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["exposition", "surcharge"],
    useCases: ["positionnement", "visibilite", "posture"],
    tags: ["visibilité", "influence", "pouvoir", "posture"],
    ctaType: "copilote",
    irlPotential: false,
    priority: "moyenne"
  },
  {
    id: "quand-on-a-le-mandat-mais-pas-encore-la-posture",
    title: "Quand on a le mandat mais pas encore la posture",
    slug: "quand-on-a-le-mandat-mais-pas-encore-la-posture",
    pillar: "se_situer",
    format: "fiche",
    promise: "Mettre des mots sur le décalage fréquent entre fonction obtenue et assurance intérieure.",
    intro: "On peut avoir été élu·e, avoir une responsabilité réelle, et ne pas encore se sentir légitime, à l’aise ou pleinement en place. Ce décalage est fréquent, surtout en début de mandat ou lors d’un changement de rôle.",
    understand: [
      "La posture ne tombe pas avec l’écharpe ou la délégation.",
      "La légitimité se construit aussi par la pratique et les repères.",
      "Reconnaître ce décalage évite de le compenser maladroitement."
    ],
    commonTrap: "Jouer un personnage plus dur, plus sûr ou plus omniprésent que ce qu’on peut tenir réellement.",
    actions: [
      "Nommer ce qui vous manque : repères, méthode, recul, appui.",
      "Chercher des points d’ancrage concrets dans le mandat.",
      "Travailler une présence sobre plutôt qu’une posture surjouée."
    ],
    reflex: "Une posture solide se construit. Elle ne se mime pas.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent", "isolement", "exposition"],
    useCases: ["legitimite", "prise_de_fonction", "posture"],
    tags: ["légitimité", "posture", "mandat", "prise_de_fonction"],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "se-rendre-utile-sans-se-disperser",
    title: "Se rendre utile sans se disperser",
    slug: "se-rendre-utile-sans-se-disperser",
    pillar: "se_situer",
    format: "checklist",
    promise: "Aider à choisir où mettre son énergie sans répondre à tout.",
    intro: "Dans un mandat local, la bonne volonté pousse souvent à dire oui à trop de sujets, trop de réunions, trop de sollicitations. Mais l’utilité réelle ne vient pas du volume de présence. Elle vient du discernement.",
    understand: [
      "Tout ce qui sollicite n’a pas la même importance.",
      "Être utile, ce n’est pas répondre à tout, mais intervenir là où cela compte.",
      "La dispersion use et brouille la ligne."
    ],
    commonTrap: "Prendre toutes les sollicitations comme des urgences ou des obligations personnelles.",
    actions: [
      "Lister ce qui relève vraiment de votre rôle.",
      "Identifier les sujets qui demandent votre présence personnelle.",
      "Assumer de ne pas être partout."
    ],
    reflex: "Votre énergie est une ressource politique. Protégez-la.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["surcharge", "exposition"],
    useCases: ["priorisation", "agenda", "dispersion"],
    tags: ["priorisation", "énergie", "dispersion", "agenda"],
    ctaType: "copilote",
    irlPotential: false,
    priority: "moyenne"
  },
  {
    id: "comment-se-prend-une-decision-dans-une-commune",
    title: "Comment se prend une décision dans une commune",
    slug: "comment-se-prend-une-decision-dans-une-commune",
    pillar: "comprendre",
    format: "guide",
    promise: "Rendre lisible le vrai circuit d’une décision locale.",
    intro: "Une décision locale n’est presque jamais un simple oui ou non. Elle passe souvent par plusieurs niveaux : besoin repéré, cadrage, faisabilité, arbitrage, traduction administrative, validation, mise en œuvre. Beaucoup de tensions viennent du fait qu’on veut aller trop vite sans voir où en est réellement le dossier.",
    understand: [
      "Une intention politique n’est pas encore une décision opérationnelle.",
      "Un dossier passe par plusieurs étapes avant sa mise en œuvre.",
      "Voir où en est réellement un sujet évite bien des frustrations."
    ],
    commonTrap: "Croire qu’une décision est prise parce qu’une intention a été exprimée.",
    actions: [
      "Demander où se situe réellement le dossier.",
      "Distinguer intention, arbitrage et mise en œuvre.",
      "Vérifier les conditions concrètes avant d’annoncer."
    ],
    reflex: "Avant de trancher, demandez toujours : où en est vraiment le sujet ?",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["besoin_methode", "arbitrage", "mandat_recent"],
    useCases: ["decision", "dossier", "circuit_de_decision"],
    tags: ["décision", "dossier", "circuit", "commune"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "le-conseil-municipal-a-quoi-il-sert-vraiment",
    title: "Le conseil municipal : à quoi il sert vraiment",
    slug: "le-conseil-municipal-a-quoi-il-sert-vraiment",
    pillar: "comprendre",
    format: "fiche",
    promise: "Rendre lisible la fonction réelle du conseil municipal, au-delà du rituel.",
    intro: "Le conseil municipal est à la fois un lieu de délibération, de validation, de mise en scène démocratique et de visibilité politique. Il ne sert pas seulement à voter : il sert aussi à rendre les décisions lisibles et assumées.",
    understand: [
      "Le conseil a une fonction formelle, démocratique et politique.",
      "Ce qui s’y joue dépasse souvent le vote lui-même.",
      "Mieux comprendre son rôle permet de mieux s’y préparer."
    ],
    commonTrap: "Réduire le conseil municipal à une simple formalité technique.",
    actions: [
      "Identifier ce qui s’y joue politiquement.",
      "Préparer les points sensibles en amont.",
      "Faire du conseil un moment lisible, pas seulement une obligation."
    ],
    reflex: "Un conseil bien tenu est aussi un moment de lisibilité politique.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent", "prise_de_parole", "gouvernance"],
    useCases: ["conseil_municipal", "deliberation", "preparation"],
    tags: ["conseil municipal", "délibération", "préparation"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "moyenne"
  },
  {
    id: "lire-un-budget-local-sans-etre-specialiste",
    title: "Lire un budget local sans être spécialiste",
    slug: "lire-un-budget-local-sans-etre-specialiste",
    pillar: "comprendre",
    format: "guide",
    promise: "Donner les repères essentiels pour comprendre les choix derrière les chiffres.",
    intro: "Vous n’avez pas besoin d’être expert·e des finances pour poser de bonnes questions. Ce qu’il faut comprendre, c’est surtout les grands équilibres, les marges de manœuvre et les arbitrages cachés derrière les chiffres. Le budget est aussi un récit politique.",
    understand: [
      "Le budget exprime des choix politiques, pas seulement des montants.",
      "Il faut repérer les grandes masses, pas tout maîtriser techniquement.",
      "Les marges de manœuvre comptent autant que les chiffres affichés."
    ],
    commonTrap: "Soit se noyer dans les détails techniques, soit renoncer complètement à comprendre.",
    actions: [
      "Identifier les trois masses principales du budget.",
      "Demander où sont les marges réelles.",
      "Lire les arbitrages comme des priorités politiques."
    ],
    reflex: "Le bon niveau de lecture n’est pas l’expertise comptable. C’est la compréhension des choix.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["besoin_methode", "arbitrage"],
    useCases: ["budget", "finances", "arbitrage"],
    tags: ["budget", "finances", "arbitrage", "priorités"],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "qui-decide-quoi-dans-la-collectivite",
    title: "Qui décide quoi dans la collectivité",
    slug: "qui-decide-quoi-dans-la-collectivite",
    pillar: "comprendre",
    format: "repere",
    promise: "Clarifier les niveaux de décision et éviter les confusions de responsabilité.",
    intro: "Dans beaucoup de tensions locales, le vrai problème n’est pas le désaccord, mais la confusion sur qui décide quoi, à quel moment et dans quel cadre. Clarifier les niveaux de décision permet de mieux cadrer les attentes et les responsabilités.",
    understand: [
      "Tout le monde n’a pas la même place dans le processus de décision.",
      "Les compétences, délégations et circuits de validation comptent.",
      "La clarté des responsabilités réduit les conflits inutiles."
    ],
    commonTrap: "Attribuer à une personne ou à une instance une décision qui dépend en réalité d’un autre niveau.",
    actions: [
      "Identifier l’instance vraiment compétente.",
      "Clarifier les délégations et responsabilités.",
      "Expliquer le cadre avant de promettre ou de refuser."
    ],
    reflex: "Avant de juger un blocage, vérifiez qui a vraiment la main.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["besoin_methode", "tension_relationnelle", "gouvernance"],
    useCases: ["competences", "responsabilites", "decision"],
    tags: ["compétences", "responsabilités", "décision", "collectivité"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "pourquoi-certains-dossiers-avancent-lentement",
    title: "Pourquoi certains dossiers avancent lentement",
    slug: "pourquoi-certains-dossiers-avancent-lentement",
    pillar: "comprendre",
    format: "fiche",
    promise: "Aider à lire les freins d’un dossier sans tomber dans la caricature.",
    intro: "Quand un dossier traîne, on a vite fait de l’expliquer par la mauvaise volonté, la lourdeur ou le blocage politique. Parfois c’est vrai. Mais souvent, plusieurs causes se superposent : cadrage insuffisant, faisabilité incertaine, arbitrage non tranché, coordination incomplète.",
    understand: [
      "La lenteur a souvent plusieurs causes, pas une seule.",
      "Un sujet peut ralentir faute de cadrage autant que faute de volonté.",
      "Mieux lire les freins aide à agir plus utilement."
    ],
    commonTrap: "Réduire le blocage à un seul responsable ou à une explication simpliste.",
    actions: [
      "Demander à quel niveau le dossier bloque réellement.",
      "Identifier ce qui manque : arbitrage, méthode, moyens, clarté.",
      "Reprendre le sujet à l’endroit exact où il se fige."
    ],
    reflex: "Un dossier lent n’est pas forcément un dossier bloqué. Il est souvent un dossier mal relu.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["surcharge", "besoin_methode", "arbitrage"],
    useCases: ["dossier", "pilotage", "blocage"],
    tags: ["dossier", "pilotage", "blocage", "méthode"],
    ctaType: "copilote",
    irlPotential: false,
    priority: "moyenne"
  },
  {
    id: "intercommunalite-ce-qu-il-faut-comprendre-sans-s-y-perdre",
    title: "Intercommunalité : ce qu’il faut comprendre sans s’y perdre",
    slug: "intercommunalite-ce-qu-il-faut-comprendre-sans-s-y-perdre",
    pillar: "comprendre",
    format: "guide",
    promise: "Donner une lecture simple de l’intercommunalité et de ses enjeux réels.",
    intro: "L’intercommunalité est souvent vécue comme un espace complexe, lointain ou opaque. Pourtant, elle concentre une part importante des décisions qui structurent la vie locale. Il ne s’agit pas de tout maîtriser, mais de comprendre ce qui s’y joue vraiment.",
    understand: [
      "L’interco pèse sur des sujets structurants du quotidien local.",
      "Ses logiques ne sont pas toujours visibles pour les élu·es communaux.",
      "Mieux la lire permet de moins la subir."
    ],
    commonTrap: "Soit s’en désintéresser complètement, soit s’y perdre faute de repères simples.",
    actions: [
      "Identifier les compétences stratégiques exercées à l’interco.",
      "Comprendre où se prennent réellement les arbitrages.",
      "Repérer les lieux utiles d'influence et de préparation."
    ],
    reflex: "L’interco se comprend mieux quand on la lit par ses effets concrets.",
    targetRoles: ["maire", "adjoint", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["gouvernance", "besoin_methode"],
    useCases: ["intercommunalite", "gouvernance", "competences"],
    tags: ["intercommunalité", "gouvernance", "compétences"],
    ctaType: "offre_collectivite",
    irlPotential: true,
    priority: "moyenne"
  },
  {
    id: "arbitrer-une-decision-sensible",
    title: "Arbitrer une décision sensible",
    slug: "arbitrer-une-decision-sensible",
    pillar: "agir",
    format: "fiche",
    promise: "Aider à trancher sans laisser l’urgence ou la pression décider à votre place.",
    intro: "Une décision sensible n’est pas forcément une grosse décision. C’est une décision qui expose, qui engage, ou qui peut produire des effets politiques, humains ou symboliques importants. Dans ces moments-là, le vrai danger est souvent de laisser l’urgence, la fatigue ou la pression décider à votre place.",
    understand: [
      "Une décision sensible engage au-delà de son contenu immédiat.",
      "La pression peut brouiller le cadre de choix.",
      "Décider vite n’est pas toujours décider juste."
    ],
    commonTrap: "Confondre vitesse et clarté.",
    actions: [
      "Poser les options réelles.",
      "Identifier ce qui est en jeu politiquement, techniquement et relationnellement.",
      "Décider à partir d’un cadre, pas d’une réaction."
    ],
    reflex: "Une bonne décision n’est pas une décision prise vite. C’est une décision tenue.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["arbitrage", "exposition", "isolement"],
    useCases: ["decision", "arbitrage", "situation_sensible"],
    tags: ["arbitrage", "décision", "pression", "cadrage"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "preparer-une-prise-de-parole-delicate",
    title: "Préparer une prise de parole délicate",
    slug: "preparer-une-prise-de-parole-delicate",
    pillar: "agir",
    format: "checklist",
    promise: "Structurer une parole claire dans une situation sensible ou exposée.",
    intro: "Dans une situation sensible, on ne parle pas seulement pour informer. On parle pour cadrer, rassurer, assumer, tenir une ligne. Une parole fragile ou brouillée peut exposer davantage que le sujet lui-même.",
    understand: [
      "La parole publique sert aussi à cadrer une situation.",
      "Le bon message vaut mieux qu’un trop-plein de mots.",
      "Le tempo de parole compte autant que son contenu."
    ],
    commonTrap: "Parler trop tôt, trop longtemps, ou vouloir tout dire d’un coup.",
    actions: [
      "Clarifier le message principal.",
      "Distinguer ce qu’il faut dire, ce qu’il faut garder, ce qu’il faut encore vérifier.",
      "Parler avec sobriété plutôt qu’avec nervosité."
    ],
    reflex: "Avant de parler, demandez-vous : qu’est-ce qui doit être compris, pas seulement entendu ?",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["prise_de_parole", "exposition", "tension_relationnelle"],
    useCases: ["prise_de_parole", "communication", "situation_sensible"],
    tags: ["parole", "communication", "message", "tempo"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "porter-un-projet-sans-promettre-trop-vite",
    title: "Porter un projet sans promettre trop vite",
    slug: "porter-un-projet-sans-promettre-trop-vite",
    pillar: "agir",
    format: "fiche",
    promise: "Aider à porter une ambition sans s’enfermer dans une promesse prématurée.",
    intro: "Dans un mandat, l’envie d’agir peut pousse à annoncer trop vite ce qu’on veut faire. Mais entre l’intention, le projet, la faisabilité et le calendrier réel, il y a souvent un écart. Le sujet n’est pas de freiner l’élan, mais de le rendre tenable.",
    understand: [
      "Une annonce trop précoce peut fragiliser un projet.",
      "La lisibilité politique ne suppose pas de promettre trop vite.",
      "Mieux cadrer en amont protège la suite."
    ],
    commonTrap: "Confondre impulsion politique et engagement déjà tenable.",
    actions: [
      "Clarifier ce qui est décidé, envisagé ou simplement souhaité.",
      "Vérifier les conditions de faisabilité.",
      "Parler du cap sans sur-promettre le détail."
    ],
    reflex: "Un projet tient mieux quand on annonce ce qu’on peut réellement porter.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["arbitrage", "mandat_recent", "exposition"],
    useCases: ["projet", "annonce", "pilotage"],
    tags: ["projet", "annonce", "faisabilité", "cap"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "moyenne"
  },
  {
    id: "prioriser-quand-tout-semble-urgent",
    title: "Prioriser quand tout semble urgent",
    slug: "prioriser-quand-tout-semble-urgent",
    pillar: "agir",
    format: "checklist",
    promise: "Retrouver un ordre d’action quand la pression monte de partout.",
    intro: "Dans un mandat local, beaucoup de choses arrivent en même temps, mais tout n’a pas le même poids. L’urgence perçue, la pression des sollicitations et la valeur politique réelle d’un sujet ne coïncident pas toujours.",
    understand: [
      "Tout ce qui presse n’a pas la même importance.",
      "Le bruit n’est pas un bon critère de priorité.",
      "Prioriser, c’est aussi protéger le cap."
    ],
    commonTrap: "Traiter en priorité ce qui fait le plus de bruit.",
    actions: [
      "Distinguer l’urgent, l’important et le structurant.",
      "Repérer ce qui demande votre arbitrage personnel.",
      "Protéger des temps de recul dans l’agenda."
    ],
    reflex: "Le bon ordre d’action ne se lit pas dans le volume de pression.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["surcharge", "arbitrage", "exposition"],
    useCases: ["priorisation", "agenda", "pression"],
    tags: ["priorisation", "urgence", "pression", "agenda"],
    ctaType: "offre_individuelle",
    irlPotential: false,
    priority: "haute"
  },
  {
    id: "cadrer-un-dossier-avant-qu-il-ne-t-echappe",
    title: "Cadrer un dossier avant qu’il ne t’échappe",
    slug: "cadrer-un-dossier-avant-qu-il-ne-t-echappe",
    pillar: "agir",
    format: "fiche",
    promise: "Reprendre la main sur un sujet flou, mouvant ou trop diffus.",
    intro: "Certains dossiers deviennent épuisants non pas parce qu’ils sont impossibles, mais parce qu’ils restent mal cadrés trop longtemps. Plus un sujet reste flou, plus il attire de demandes contradictoires, de malentendus et de tensions.",
    understand: [
      "Un dossier mal cadré devient vite un dossier usant.",
      "Le flou attire la dispersion et la conflictualité.",
      "Reprendre le cadre évite de subir le sujet."
    ],
    commonTrap: "Continuer à avancer sur un sujet dont les contours ne sont plus clairs.",
    actions: [
      "Redire l’objet précis du dossier.",
      "Lister les options réellement ouvertes.",
      "Distinguer ce qui est tranché, ce qui reste à arbitrer et ce qui dépend d’autres acteurs."
    ],
    reflex: "Quand un sujet vous échappe, revenez d’abord à son cadre.",
    sensitiveNote: "Si le dossier est déjà exposé publiquement, recadrez d’abord en interne avant de reprendre la parole à l’extérieur.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["besoin_methode", "arbitrage", "surcharge"],
    useCases: ["dossier", "cadrage", "pilotage"],
    tags: ["cadrage", "dossier", "pilotage", "méthode"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "gerer-une-tension-dans-la-majorite-ou-l-executif",
    title: "Gérer une tension dans la majorité ou l’exécutif",
    slug: "gerer-une-tension-dans-la-majorite-ou-l-executif",
    pillar: "agir",
    format: "guide",
    promise: "Aider à lire et contenir une tension interne sans la personnaliser trop vite.",
    intro: "Une tension interne n’est pas toujours un conflit de personnes. Elle peut révéler un désaccord de méthode, un problème de rôle, un manque de cadrage ou une accumulation de non-dits. Si elle n’est pas lue correctement, elle se personnalise vite.",
    understand: [
      "Le conflit visible n’est pas toujours le vrai sujet.",
      "Une tension mal lue devient vite personnelle.",
      "Le cadrage relationnel compte autant que le cadrage politique."
    ],
    commonTrap: "Réagir uniquement sur le ton ou sur l’émotion du moment.",
    actions: [
      "Identifier ce qui relève du fond, de la méthode et de la relation.",
      "Éviter de traiter un problème politique comme une simple humeur.",
      "Recréer un cadre de discussion plus net."
    ],
    reflex: "Avant de répondre à la tension, nommez sa vraie nature.",
    sensitiveNote: "Si la tension est déjà sortie du cercle interne, commencez par réduire l’exposition avant de rouvrir le fond.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "gouvernance", "exposition"],
    useCases: ["conflit", "majorite", "executif"],
    tags: ["tension", "majorité", "exécutif", "gouvernance"],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "se-positionner-sans-se-griller",
    title: "Se positionner sans se griller",
    slug: "se-positionner-sans-se-griller",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Trouver une ligne juste sans se rigidifier ni se brûler trop tôt.",
    intro: "Se positionner, ce n’est ni se taire, ni surjouer l’autorité. C’est rendre sa ligne lisible sans se rigidifier ni se brûler politiquement trop tôt.",
    understand: [
      "Une position lisible peut rester nuancée.",
      "La solidité ne suppose pas la rigidité.",
      "Le bon positionnement tient aussi au tempo."
    ],
    commonTrap: "Croire qu’il faut choisir entre fermeté et nuance.",
    actions: [
      "Clarifier votre ligne avant de la communiquer.",
      "Éviter les réactions trop définitives à chaud.",
      "Distinguer ce que vous affirmez, ouvrez ou réservez."
    ],
    reflex: "Une position solide n’est pas une position raide.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["exposition", "prise_de_parole", "tension_relationnelle"],
    useCases: ["positionnement", "parole", "posture"],
    tags: ["positionnement", "posture", "parole", "exposition"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "eviter-les-erreurs-politiques-evitables",
    title: "Éviter les erreurs politiques évitables",
    slug: "eviter-les-erreurs-politiques-evitables",
    pillar: "se_proteger",
    format: "checklist",
    promise: "Repérer les fautes de tempo, de ton et de méthode avant qu’elles coûtent cher.",
    intro: "Dans le mandat local, beaucoup d’erreurs ne viennent pas du fond d’une décision, mais de sa manière d’être portée : trop tôt, trop sèchement, sans cadrage, sans relais ou sans lecture du contexte.",
    understand: [
      "Les erreurs politiques sont souvent des erreurs de méthode ou de tempo.",
      "Le fond ne suffit pas à sécuriser une décision.",
      "La prévention évite des séquences inutiles."
    ],
    commonTrap: "Se concentrer uniquement sur le contenu en oubliant la manière de faire.",
    actions: [
      "Vérifier le bon moment pour agir ou parler.",
      "Relire le contexte avant de trancher.",
      "Préparer la manière de porter autant que la décision elle-même."
    ],
    reflex: "Une décision juste peut devenir fragile si elle est mal portée.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["exposition", "surcharge", "arbitrage"],
    useCases: ["prevention", "tempo", "risque_politique"],
    tags: ["erreurs", "tempo", "méthode", "risque politique"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "dire-non-sans-casser-la-relation",
    title: "Dire non sans casser la relation",
    slug: "dire-non-sans-casser-la-relation",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Refuser ou cadrer une demande sans humilier ni abîmer inutilement le lien.",
    intro: "Dire non fait partie du mandat. Le sujet n’est pas d’éviter le refus, mais de le formuler sans humilier, sans mépriser et sans créer un conflit inutile.",
    understand: [
      "Un refus peut être ferme sans être brutal.",
      "La manière de dire non conditionne souvent la suite de la relation.",
      "Le cadre est aussi important que la formule."
    ],
    commonTrap: "Soit céder pour éviter l’inconfort, soit refuser de manière trop sèche.",
    actions: [
      "Reconnaître la demande avant d’y répondre.",
      "Expliquer la limite ou le cadre.",
      "Proposer si possible une alternative ou une suite."
    ],
    reflex: "Un non bien posé protège souvent mieux la relation qu’un oui flou.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "exposition", "surcharge"],
    useCases: ["refus", "relation", "arbitrage"],
    tags: ["refus", "relation", "cadre", "demande"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "gerer-la-fatigue-decisionnelle",
    title: "Gérer la fatigue décisionnelle",
    slug: "gerer-la-fatigue-decisionnelle",
    pillar: "se_proteger",
    format: "repere",
    promise: "Mettre des mots sur l’usure des arbitrages et retrouver du discernement.",
    intro: "Quand on décide beaucoup, vite et sous pression, l’usure ne se voit pas toujours tout de suite. Elle se manifeste par de l’irritation, du flottement, des décisions défensives, des difficultés à hiérarchiser ou une envie de répondre trop vite ou plus du tout.",
    understand: [
      "La fatigue décisionnelle altère le discernement sans toujours se dire.",
      "Elle peut ressembler à un problème d’humeur alors qu’elle relève d’une surcharge de décisions.",
      "Retrouver du recul est souvent un besoin stratégique, pas un confort."
    ],
    commonTrap: "Prendre cette fatigue pour un problème de motivation ou de caractère.",
    actions: [
      "Repérer les moments où votre discernement baisse.",
      "Ralentir avant les décisions exposées.",
      "Recréer des appuis ou des espaces de cadrage."
    ],
    reflex: "Quand tout semble devoir être décidé tout de suite, c’est souvent le moment où il faut recréer du recul.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["surcharge", "isolement", "arbitrage"],
    useCases: ["fatigue", "decision", "endurance"],
    tags: ["fatigue", "décision", "discernement", "endurance"],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "repondre-a-une-situation-sensible-sans-sur-reagir",
    title: "Répondre à une situation sensible sans sur-réagir",
    slug: "repondre-a-une-situation-sensible-sans-sur-reagir",
    pillar: "se_proteger",
    format: "checklist",
    promise: "Aider à tenir une réponse juste, proportionnée et lisible sous pression.",
    intro: "Quand une situation monte, l’enjeu n’est pas seulement de répondre. L’enjeu est de ne pas aggraver ce qui est déjà fragile : relation, image, confiance, lisibilité.",
    understand: [
      "Toute situation sensible ne demande pas la même intensité de réponse.",
      "La réaction immédiate soulage parfois, mais clarifie rarement.",
      "Une réponse tenue vaut mieux qu’une réaction nerveuse."
    ],
    commonTrap: "Répondre pour se soulager, plutôt que pour clarifier la situation.",
    actions: [
      "Identifier ce qui est vraiment en jeu.",
      "Distinguer émotion, pression et nécessité d’action.",
      "Préparer une réponse courte, nette et proportionnée."
    ],
    reflex: "Tout ne mérite pas une réaction immédiate. Mais ce qui mérite une réponse mérite une réponse tenue.",
    sensitiveNote: "En cas d’exposition publique, relisez toujours le tempo avant le ton.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "exposition", "prise_de_parole"],
    useCases: ["situation_sensible", "reponse", "crise"],
    tags: ["sensible", "réponse", "crise", "tempo"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "etre-proche-sans-devenir-poreux-a-tout",
    title: "Être proche sans devenir poreux à tout",
    slug: "etre-proche-sans-devenir-poreux-a-tout",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Tenir la proximité sans se laisser absorber par toutes les demandes et émotions.",
    intro: "La proximité est une force du mandat local. Mais si elle n’est pas cadrée, elle peut devenir une porosité permanente : surcharge, sollicitations sans filtre, difficulté à dire non, confusion entre écoute et disponibilité totale.",
    understand: [
      "La proximité ne suppose pas la disponibilité illimitée.",
      "Être à l’écoute ne signifie pas tout absorber.",
      "Un cadre protège autant la relation que l’élu·e."
    ],
    commonTrap: "Croire que poser des limites revient à devenir distant·e ou froid·e.",
    actions: [
      "Définir ce qui relève de l’écoute, du suivi et de la décision.",
      "Poser des limites de disponibilité claires.",
      "Créer des modalités de réponse tenables dans la durée."
    ],
    reflex: "La bonne proximité ne vous vide pas. Elle vous relie sans vous dissoudre.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["surcharge", "isolement", "exposition"],
    useCases: ["proximite", "sollicitations", "limites"],
    tags: ["proximité", "limites", "sollicitations", "relation"],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "moyenne"
  }
];

export function getRecommendedResources(
  resources: MaryanResource[],
  profile: DiagnosticProfile,
  limit = 3
) {
  return resources
    .filter((r) => r.diagnosticProfiles.includes(profile))
    .sort((a, b) => {
      if (a.priority === "haute" && b.priority !== "haute") return -1;
      if (a.priority !== "haute" && b.priority === "haute") return 1;
      return 0;
    })
    .slice(0, limit);
}
