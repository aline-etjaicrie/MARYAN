import type { MaryanResource, DiagnosticProfile } from './types';

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
      "Repérer les lieux utiles d’influence et de préparation."
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
      "La parole publique servant aussi à cadrer une situation.",
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
    commonTrap: "Croire qu’il faut poser des limites revient à devenir distant·e ou froid·e.",
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
  },
  {
    id: "accompagner-un-projet-citoyen-sans-letouffer-ni-promettre-trop-vite",
    title: "Accompagner un projet citoyen sans l’étouffer ni promettre trop vite",
    slug: "accompagner-un-projet-citoyen-sans-letouffer-ni-promettre-trop-vite",
    pillar: "agir",
    format: "fiche",
    promise: "Accueillir une initiative citoyenne avec sérieux, sans casser l’élan ni créer de faux accords.",
    intro: "Un projet citoyen arrive souvent avec de l’énergie, de la sincérité, une envie d’agir et parfois un vrai bénéfice pour le territoire. C’est une richesse. Mais ce n’est pas parce qu’un projet est sympathique, mobilisateur ou porteur de sens qu’il peut être soutenu immédiatement, tel quel, ou par la collectivité. Le rôle de l’élu n’est pas de refroidir l’initiative. Il n’est pas non plus de valider trop vite pour ne pas décevoir. Il est d’accueillir le projet sérieusement, de clarifier le cadre, et d’éviter les faux accords.",
    understand: [
      "Un projet citoyen a souvent besoin à la fois de reconnaissance et de lisibilité.",
      "L’écoute seule ne suffit pas si le cadre n’est pas explicité.",
      "Encourager un projet ne signifie pas encore l’engager politiquement ou administrativement."
    ],
    commonTrap: "Confondre écoute, encouragement et engagement réel de la collectivité.",
    actions: [
      "Reconnaître la valeur ou l’intérêt du projet sans promettre trop vite.",
      "Clarifier ce qui relève de l’écoute, du soutien possible, de l’autorisation, du financement ou du partenariat.",
      "Dire rapidement ce qui doit être précisé pour que le projet puisse être regardé sérieusement."
    ],
    reflex: "Un projet citoyen a besoin d’écoute, mais aussi de cadre. L’un sans l’autre produit vite de la déception.",
    sensitiveNote: "Si le collectif est déjà mobilisé publiquement, mieux vaut une réponse honnête et structurée qu’une ouverture vague qui sera ensuite vécue comme une trahison.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "gouvernance", "besoin_methode", "exposition"],
    useCases: ["projet_citoyen", "initiative_locale", "collectif_habitants", "relation_partenaire"],
    tags: [
      "projet citoyen",
      "initiative",
      "collectif",
      "cadre",
      "relation partenaires",
      "écoute",
      "engagement"
    ],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "accompagner-un-projet-dentreprise-sans-creer-de-faux-accords",
    title: "Accompagner un projet d’entreprise sans créer de faux accords",
    slug: "accompagner-un-projet-dentreprise-sans-creer-de-faux-accords",
    pillar: "agir",
    format: "fiche",
    promise: "Accueillir un projet économique avec clarté, sans entretenir d’ambiguïté sur le niveau réel d’engagement de la collectivité.",
    intro: "Un projet d’entreprise avance souvent avec une logique de délai, de faisabilité, de visibilité et de décision rapide. Le porteur de projet veut savoir si c’est possible, dans quels délais, avec quels interlocuteurs et à quelles conditions. La collectivité, elle, doit regarder l’intérêt territorial, la cohérence avec le cadre public, les impacts, l’équité entre acteurs et les conditions réelles de mise en œuvre. Le problème n’est pas que l’un ait raison et l’autre tort. Le problème, c’est qu’ils n’ont pas le même logiciel du temps, du risque ni de la décision.",
    understand: [
      "Le porteur de projet économique cherche surtout de la lisibilité et du tempo.",
      "La collectivité doit arbitrer dans un cadre plus large que la seule faisabilité du projet.",
      "Une ouverture mal formulée peut être interprétée comme un accord en cours."
    ],
    commonTrap: "Donner des signes d’ouverture trop vagues, que le porteur de projet interprète comme un accord en cours.",
    actions: [
      "Distinguer clairement accueil, instruction, facilitation et décision.",
      "Expliciter les étapes, les délais et les limites.",
      "Éviter toute ambiguïté sur le niveau réel d’engagement de la collectivité."
    ],
    reflex: "Avec un projet d’entreprise, la clarté vaut mieux qu’une bienveillance floue.",
    sensitiveNote: "Quand un porteur de projet est pressé, il faut éviter de répondre sous pression. Une réponse rapide mais imprécise peut coûter plus cher qu’un cadrage un peu plus lent mais clair.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["gouvernance", "besoin_methode", "arbitrage", "tension_relationnelle"],
    useCases: ["projet_entreprise", "developpement_economique", "implantation", "relation_partenaire"],
    tags: [
      "projet entreprise",
      "développement économique",
      "cadre",
      "décision",
      "tempo",
      "engagement"
    ],
    ctaType: "offre_collectivite",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "quand-ca-frotte-avec-un-porteur-de-projet-relire-le-vrai-probleme",
    title: "Quand ça frotte avec un porteur de projet : relire le vrai problème",
    slug: "quand-ca-frotte-avec-un-porteur-de-projet-relire-le-vrai-probleme",
    pillar: "agir",
    format: "guide",
    promise: "Mieux lire les frictions avec un porteur de projet avant de les personnaliser ou de les durcir inutilement.",
    intro: "Quand la relation se tend avec un porteur de projet, le problème n’est pas toujours le projet lui-même. Souvent, la friction vient d’autre chose : un décalage de temporalité, un flou sur qui décide, une ambiguïté sur ce qui a été dit, des attentes implicites, une différence de langage ou de culture, ou un niveau de maturité du projet mal évalué. Si on traite la tension comme un simple problème de caractère ou de bonne volonté, on passe à côté du vrai nœud.",
    understand: [
      "Le conflit apparent masque souvent un décalage de cadre, de temps ou de langage.",
      "Une tension mal relue se personnalise très vite.",
      "Revenir aux faits et aux engagements réels permet souvent de dégonfler la friction."
    ],
    commonTrap: "Personnaliser trop vite le conflit : “ils sont impatients”, “ils ne comprennent rien”, “la mairie bloque”, “ils veulent forcer”.",
    actions: [
      "Revenir aux faits, aux étapes et aux engagements réellement pris.",
      "Distinguer problème de cadre, de tempo, de langage ou de posture.",
      "Reformuler clairement ce qui est possible, ce qui ne l’est pas, et ce qui reste ouvert."
    ],
    reflex: "Avant de gérer la tension, relisez le décalage entre les mondes en présence.",
    sensitiveNote: "Quand la tension est déjà émotionnelle, mieux vaut remettre du cadre avant de vouloir “réparer la relation”. Sans clarification, l’apaisement reste fragile.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "gouvernance", "exposition", "besoin_methode"],
    useCases: ["relation_partenaire", "tension", "projet_citoyen", "projet_entreprise"],
    tags: [
      "friction",
      "porteur de projet",
      "tension",
      "cadre",
      "tempo",
      "langage",
      "relation"
    ],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "clarifier-ce-que-la-collectivite-peut-soutenir-faciliter-ou-refuser",
    title: "Clarifier ce que la collectivité peut soutenir, faciliter ou refuser",
    slug: "clarifier-ce-que-la-collectivite-peut-soutenir-faciliter-ou-refuser",
    pillar: "agir",
    format: "repere",
    promise: "Nommer clairement le niveau d’implication possible de la collectivité pour éviter les malentendus.",
    intro: "Beaucoup de malentendus naissent du fait que la collectivité ne dit pas assez clairement à quel niveau elle se situe. Or entre écouter un projet, l’orienter, le faciliter, le soutenir politiquement, le financer, l’autoriser ou le porter elle-même, il y a des différences majeures. Si ces niveaux ne sont pas clarifiés rapidement, chacun projette ce qu’il veut entendre.",
    understand: [
      "Un accueil positif n’équivaut pas à un soutien politique ou administratif.",
      "Tous les niveaux d’appui n’engagent pas la collectivité de la même manière.",
      "Le flou sur le degré d’engagement abîme souvent plus que le refus."
    ],
    commonTrap: "Laisser penser qu’un accueil positif vaut soutien, ou qu’un soutien relationnel vaut accord politique ou administratif.",
    actions: [
      "Nommer explicitement le niveau d’implication possible de la collectivité.",
      "Distinguer ce qui est envisageable, conditionnel, impossible ou prématuré.",
      "Reformuler le cadre à chaque étape importante."
    ],
    reflex: "Ce qui abîme souvent la relation, ce n’est pas le refus. C’est le flou sur le degré réel d’engagement.",
    sensitiveNote: "En cas d’attente forte ou de pression, mieux vaut nommer une limite claire que laisser grandir une interprétation erronée.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["besoin_methode", "gouvernance", "tension_relationnelle", "arbitrage"],
    useCases: ["cadre", "engagement", "projet_citoyen", "projet_entreprise", "relation_partenaire"],
    tags: [
      "cadre",
      "engagement",
      "soutien",
      "facilitation",
      "refus",
      "collectivité"
    ],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "tenir-une-relation-constructive-avec-un-porteur-de-projet-impatient",
    title: "Tenir une relation constructive avec un porteur de projet impatient",
    slug: "tenir-une-relation-constructive-avec-un-porteur-de-projet-impatient",
    pillar: "agir",
    format: "fiche",
    promise: "Préserver une relation utile avec un porteur de projet pressé, sans céder à la précipitation ni au flou.",
    intro: "L’impatience d’un porteur de projet n’est pas toujours un problème de comportement. Elle peut traduire un besoin de visibilité, une contrainte économique, une peur de l’enlisement, une difficulté à lire le fonctionnement public ou simplement une logique d’action différente. Le sujet n’est pas de céder à cette impatience. Le sujet est de ne pas la laisser dégrader la relation ou pousser la collectivité à répondre dans de mauvaises conditions.",
    understand: [
      "L’impatience signale souvent un besoin de lisibilité, pas seulement une mauvaise posture.",
      "Répondre dans le rythme de l’autre peut produire plus de flou que de solution.",
      "Un cadre clair apaise souvent mieux que des promesses rapides."
    ],
    commonTrap: "Se laisser contaminer par le rythme de l’autre, puis répondre trop vite, trop sèchement ou trop flouement.",
    actions: [
      "Reconnaître la demande de lisibilité sans promettre ce qu’on ne tient pas.",
      "Poser un cadre de tempo réaliste.",
      "Donner des repères concrets sur les prochaines étapes."
    ],
    reflex: "On n’apaise pas l’impatience en promettant plus. On l’apaise en rendant le cadre plus lisible.",
    sensitiveNote: "Si l’impatience se transforme en pression ou en critique publique, il faut éviter la réaction défensive. Revenir à la séquence, aux faits et au cadre est souvent la meilleure manière de reprendre la main.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "exposition", "gouvernance", "arbitrage"],
    useCases: ["relation_partenaire", "tempo", "pression", "projet_entreprise", "projet_citoyen"],
    tags: [
      "impatience",
      "tempo",
      "relation",
      "cadre",
      "lisibilité",
      "porteur de projet"
    ],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "moyenne"
  },
  {
    id: "avant-dorganiser-une-reunion-participative-qu-est-ce-qui-est-vraiment-ouvert",
    title: "Avant d’organiser une réunion participative : qu’est-ce qui est vraiment ouvert ?",
    slug: "avant-dorganiser-une-reunion-participative-qu-est-ce-qui-est-vraiment-ouvert",
    pillar: "agir",
    format: "fiche",
    promise: "Clarifier le cadre réel d’une réunion participative avant de parler de méthode ou d’animation.",
    intro: "Une réunion participative n’est utile que si les participant·es comprennent ce qui est réellement ouvert à discussion. Si tout semble ouvert alors que les marges de décision sont très faibles, la frustration est presque inévitable. Avant de penser format, animation ou mobilisation, il faut clarifier ce qui est déjà décidé, ce qui peut encore évoluer, et ce que la réunion peut vraiment produire.",
    understand: [
      "Une démarche participative n’est utile que si son cadre est lisible.",
      "Les habitants supportent mieux une marge limitée mais claire qu’une ouverture fictive.",
      "Le bon niveau de participation doit être défini avant le format."
    ],
    commonTrap: "Inviter à “co-construire” sans avoir défini ce qui peut réellement être discuté.",
    actions: [
      "Lister clairement les points ouverts et non ouverts.",
      "Expliciter le niveau de participation attendu.",
      "Formuler en amont ce que la réunion peut vraiment produire."
    ],
    reflex: "La qualité d’une démarche participative dépend d’abord de la clarté de son cadre.",
    sensitiveNote: "Plus le sujet est exposé ou conflictuel, plus le cadre doit être formulé sans ambiguïté dès l’ouverture.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["gouvernance", "tension_relationnelle", "besoin_methode", "exposition"],
    useCases: ["participation", "reunion_publique", "concertation", "cadre"],
    tags: [
      "participation",
      "concertation",
      "co-construction",
      "réunion publique",
      "cadre",
      "habitants"
    ],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "concertation-consultation-information-co-construction-ne-pas-tout-confondre",
    title: "Concertation, consultation, information, co-construction : ne pas tout confondre",
    slug: "concertation-consultation-information-co-construction-ne-pas-tout-confondre",
    pillar: "comprendre",
    format: "repere",
    promise: "Clarifier les mots de la participation pour éviter les mauvaises attentes.",
    intro: "Ces mots sont souvent utilisés comme s’ils étaient équivalents. Ils ne le sont pas. Informer, consulter, concerter et co-construire n’ouvrent pas le même espace politique ni le même niveau d’implication. Quand on utilise le mauvais mot, on crée de mauvaises attentes et on fragilise la relation avec les habitants.",
    understand: [
      "Informer, consulter, concerter et co-construire ne produisent pas le même rapport à la décision.",
      "Le mot utilisé donne déjà un cadre d’attente.",
      "Mal nommer une démarche, c’est souvent la rendre plus fragile."
    ],
    commonTrap: "Employer “co-construction” pour qualifier une réunion où les habitants peuvent surtout réagir à un cadre déjà très fermé.",
    actions: [
      "Choisir le mot juste avant de communiquer sur la démarche.",
      "Expliquer ce que ce mot implique concrètement.",
      "Assumer publiquement le niveau réel d’ouverture."
    ],
    reflex: "Nommer juste, c’est déjà éviter une partie des malentendus.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["besoin_methode", "gouvernance", "tension_relationnelle"],
    useCases: ["participation", "concertation", "co_construction", "communication_publique"],
    tags: [
      "concertation",
      "consultation",
      "information",
      "co-construction",
      "cadre",
      "méthode"
    ],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "comment-eviter-de-promettre-de-la-participation-la-ou-la-decision-est-deja-presque-faite",
    title: "Comment éviter de promettre de la participation là où la décision est déjà presque faite",
    slug: "comment-eviter-de-promettre-de-la-participation-la-ou-la-decision-est-deja-presque-faite",
    pillar: "agir",
    format: "fiche",
    promise: "Éviter de créer de fausses attentes quand le cadre de décision est déjà très avancé.",
    intro: "Il n’est pas illégitime qu’une collectivité arrive à une réunion avec un cadre déjà très avancé. Ce qui pose problème, ce n’est pas qu’un projet soit mûr. C’est de faire croire qu’il est encore largement ouvert s’il ne l’est plus vraiment. Les habitants acceptent souvent mieux une marge de discussion limitée mais claire qu’une pseudo-ouverture qui se referme ensuite sans explication.",
    understand: [
      "Un projet avancé n’empêche pas le dialogue, mais il change sa nature.",
      "Le problème vient souvent moins de la fermeture que du faux sentiment d’ouverture.",
      "La clarté sur les marges de discussion protège la suite."
    ],
    commonTrap: "Mettre en scène une ouverture de débat que la décision ne permet plus réellement.",
    actions: [
      "Dire clairement ce qui a déjà été arbitré.",
      "Identifier ce qui peut encore être ajusté.",
      "Ne pas utiliser le registre participatif comme habillage d’une décision verrouillée."
    ],
    reflex: "Une marge de discussion limitée mais assumée vaut mieux qu’une ouverture fictive.",
    sensitiveNote: "Sur des sujets déjà polarisés, toute ambiguïté sur le niveau réel d’ouverture sera relue comme une manipulation.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["gouvernance", "exposition", "tension_relationnelle", "arbitrage"],
    useCases: ["participation", "projet_expose", "reunion_publique", "communication_publique"],
    tags: [
      "participation",
      "promesse",
      "cadre",
      "attentes",
      "réunion publique",
      "décision"
    ],
    ctaType: "offre_individuelle",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "faire-une-reunion-publique-utile-pas-seulement-defoulatoire",
    title: "Faire une réunion publique utile, pas seulement défoulatoire",
    slug: "faire-une-reunion-publique-utile-pas-seulement-defoulatoire",
    pillar: "agir",
    format: "guide",
    promise: "Donner à une réunion publique un objectif réel, un cadre et une utilité politique claire.",
    intro: "Une réunion publique ne sert pas seulement à “laisser s’exprimer” les gens. Elle doit permettre de rendre une situation lisible, de poser un cadre, de faire apparaître les vrais sujets et d’éviter que tout se transforme en accumulation de frustrations. Une réunion sans objectif clair devient vite un lieu de décharge émotionnelle, souvent coûteux politiquement et peu utile pour la suite.",
    understand: [
      "Une réunion publique a besoin d’un objectif précis.",
      "L’expression ne suffit pas si elle n’est reliée à aucun cadre.",
      "Une bonne réunion fait émerger de la clarté, pas seulement de l’intensité."
    ],
    commonTrap: "Organiser une réunion parce qu’il “faut bien en faire une”, sans clarifier ce qu’on attend d’elle.",
    actions: [
      "Définir l’objectif précis de la réunion.",
      "Choisir ce qui doit être présenté, discuté, entendu ou cadré.",
      "Structurer les temps de parole pour éviter la confusion totale."
    ],
    reflex: "Une réunion utile n’est pas une réunion où tout sort. C’est une réunion où quelque chose devient plus clair.",
    sensitiveNote: "Si le sujet est conflictuel, prévoir le cadre de parole et le mode d’animation avant de communiquer sur la réunion.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "gouvernance", "exposition"],
    useCases: ["reunion_publique", "participation", "tension_locale", "animation"],
    tags: [
      "réunion publique",
      "participation",
      "animation",
      "cadre",
      "habitants",
      "tension locale"
    ],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "que-faire-des-contributions-apres-une-demarche-participative",
    title: "Que faire des contributions après une démarche participative ?",
    slug: "que-faire-des-contributions-apres-une-demarche-participative",
    pillar: "agir",
    format: "fiche",
    promise: "Rendre compte clairement de ce qui a été entendu, retenu, transformé ou écarté.",
    intro: "Le moment le plus fragile d’une démarche participative n’est pas toujours la réunion elle-même. C’est l’après. Si les contributions recueillies disparaissent, ne sont pas reformulées, ne sont pas reliées à une décision ou ne reçoivent aucun retour, la confiance se dégrade vite. Les participant·es n’attendent pas forcément que tout soit repris. Mais ils attendent de savoir ce qui a été entendu, retenu, écarté ou transformé.",
    understand: [
      "Une démarche participative se juge aussi à la qualité du retour fait aux participant·es.",
      "Le silence après coup affaiblit fortement la confiance.",
      "Expliquer ce qui n’est pas retenu compte autant que valoriser ce qui l’est."
    ],
    commonTrap: "Faire participer, puis ne pas rendre compte clairement de ce qui est fait de cette parole.",
    actions: [
      "Restituer ce qui a été exprimé.",
      "Expliquer ce qui est retenu, non retenu ou encore en discussion.",
      "Relier les contributions à une suite concrète, même limitée."
    ],
    reflex: "La participation ne se juge pas seulement à l’écoute. Elle se juge à la manière dont on rend compte ensuite.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["gouvernance", "tension_relationnelle", "besoin_methode"],
    useCases: ["participation", "restitution", "suite_de_demarche", "habitants"],
    tags: [
      "participation",
      "restitution",
      "suite",
      "contributions",
      "habitants",
      "confiance"
    ],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "quand-une-reunion-participative-devient-un-lieu-de-colere",
    title: "Quand une réunion participative devient un lieu de colère",
    slug: "quand-une-reunion-participative-devient-un-lieu-de-colere",
    pillar: "agir",
    format: "fiche",
    promise: "Aider à relire la colère dans une réunion participative sans laisser le cadre se dissoudre.",
    intro: "Une réunion participative n’est pas ratée simplement parce qu’il y a de la colère. La colère peut être un signal d’usure, un symptôme de défiance, une réaction à un sentiment de non-écoute ou l’expression d’un désaccord réel. Le problème n’est donc pas la colère en soi. Le problème, c’est ce qu’on en fait : l’ignorer, la subir sans cadre ou y répondre de manière défensive. Quand une réunion devient uniquement un lieu de décharge, elle cesse d’être utile. Mais quand la colère est reconnue, recadrée et reliée à des enjeux concrets, elle peut parfois être traversée sans tout faire exploser.",
    understand: [
      "La colère n’est pas forcément un échec de la réunion, mais elle demande un cadre.",
      "L’enjeu n’est pas de l’éteindre à tout prix, mais de la relier à ce qui se joue vraiment.",
      "Une réunion tendue reste utile si le désaccord retrouve une forme lisible."
    ],
    commonTrap: "Croire qu’il faut soit laisser tout sortir sans limite, soit reprendre la main brutalement pour “tenir la salle”.",
    actions: [
      "Reconnaître la tension sans dramatiser ni mépriser.",
      "Rappeler le cadre de la réunion et ce qui peut être utilement discuté.",
      "Reformuler les points de fond derrière les réactions les plus vives."
    ],
    reflex: "Dans une réunion tendue, il ne s’agit pas seulement de calmer. Il s’agit de redonner une forme au désaccord.",
    sensitiveNote: "Si la colère est très forte, l’enjeu n’est pas de sauver la réunion à tout prix. Parfois, il vaut mieux resserrer, reformuler, différer un point ou changer de format plutôt que laisser la situation s’abîmer davantage.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "exposition", "gouvernance"],
    useCases: ["participation", "reunion_publique", "tension_locale", "cadre"],
    tags: [
      "participation",
      "concertation",
      "co_construction",
      "réunion publique",
      "habitants",
      "tension locale",
      "cadre",
      "désaccord",
      "confiance"
    ],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "co-construire-sans-abandonner-la-responsabilite-politique",
    title: "Co-construire sans abandonner la responsabilité politique",
    slug: "co-construire-sans-abandonner-la-responsabilite-politique",
    pillar: "agir",
    format: "fiche",
    promise: "Clarifier ce que la co-construction ouvre réellement sans effacer le rôle politique des élus.",
    intro: "La co-construction ne veut pas dire que l’élu disparaît du processus de décision. Elle ne veut pas dire non plus que toutes les paroles se valent de la même manière dans l’arbitrage final. Associer des habitants, des acteurs ou des partenaires à l’élaboration d’un projet peut être très utile. Mais la responsabilité politique reste entière : clarifier le cadre, arbitrer, assumer une décision et expliquer ce qui a été retenu ou non. Le risque, sinon, est double : faire semblant de co-construire ou se défausser sur la participation pour ne plus porter la décision.",
    understand: [
      "La participation peut nourrir la décision sans s’y substituer.",
      "La responsabilité politique ne disparaît pas parce qu’un cadre participatif est ouvert.",
      "Une co-construction plus honnête renforce souvent la lisibilité finale."
    ],
    commonTrap: "Présenter la co-construction comme un partage intégral de la responsabilité politique.",
    actions: [
      "Expliciter ce qui est partagé, ce qui ne l’est pas et ce qui relève de l’arbitrage final.",
      "Assumer que la participation nourrit la décision sans s’y substituer.",
      "Expliquer ensuite comment les contributions ont été prises en compte."
    ],
    reflex: "Co-construire n’efface pas la responsabilité politique. Cela oblige à l’exercer plus clairement.",
    sensitiveNote: "Sur un sujet exposé, il vaut mieux assumer le niveau réel d’ouverture que laisser croire à une horizontalité totale qu’aucune décision publique ne pourra tenir ensuite.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["gouvernance", "besoin_methode", "tension_relationnelle", "exposition"],
    useCases: ["participation", "co_construction", "arbitrage", "cadre"],
    tags: [
      "participation",
      "concertation",
      "co_construction",
      "gouvernance",
      "cadre",
      "responsabilité politique",
      "confiance"
    ],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  },
  {
    id: "comment-preparer-un-cadre-de-participation-lisible-pour-les-habitants",
    title: "Comment préparer un cadre de participation lisible pour les habitants",
    slug: "comment-preparer-un-cadre-de-participation-lisible-pour-les-habitants",
    pillar: "agir",
    format: "fiche",
    promise: "Rendre une démarche participative plus honnête et plus utile en clarifiant d’emblée ses règles du jeu.",
    intro: "Une démarche participative devient vite confuse si les habitants ne savent pas pourquoi ils sont là, sur quoi ils peuvent agir, ce qui est déjà décidé, ce qui sera fait de leur parole et ce qui se passera après. Un bon cadre ne ferme pas la participation. Il la rend plus honnête, plus lisible et souvent plus utile. Le niveau d’adhésion ne dépend pas seulement de la qualité de l’animation. Il dépend aussi de la qualité de la promesse faite au départ.",
    understand: [
      "Le cadre de participation n’est pas un détail logistique, mais le cœur de la confiance.",
      "La clarté sur les règles du jeu rend souvent la participation plus tenable.",
      "Une promesse mal formulée fragilise toute la suite de la démarche."
    ],
    commonTrap: "Soigner l’invitation ou la forme de la réunion sans expliciter clairement les règles du jeu.",
    actions: [
      "Dire à quoi sert la démarche.",
      "Préciser ce qui est ouvert, fermé ou en discussion.",
      "Expliquer ce que deviendront les contributions et annoncer la suite dès le départ."
    ],
    reflex: "Le cadre de participation n’est pas un détail logistique. C’est le cœur de la confiance.",
    sensitiveNote: "Plus le sujet est conflictuel, plus il faut réduire les ambiguïtés au minimum. Quand le cadre est flou, chacun projette sa propre promesse et la déception arrive vite.",
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["besoin_methode", "gouvernance", "tension_relationnelle", "exposition"],
    useCases: ["participation", "concertation", "cadre", "habitants"],
    tags: [
      "participation",
      "concertation",
      "co_construction",
      "réunion publique",
      "habitants",
      "tension locale",
      "cadre",
      "confiance",
      "restitution"
    ],
    ctaType: "formation_irl",
    irlPotential: true,
    priority: "haute"
  }
];

export function getRecommendedResources(
  resources: any[],
  profile: string,
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
