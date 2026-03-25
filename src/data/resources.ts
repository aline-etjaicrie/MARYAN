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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    format: "guide",
    promise: "Comprendre le rôle réel du conseil municipal — ce qu’il décide, ce qu’il valide, et ce qui se joue vraiment en séance.",
    intro: "Le conseil municipal est l’organe délibérant de la commune. Il vote les décisions, mais ne les construit pas seul : entre l’idée politique et le vote, il y a un enchaînement de préparation, d’arbitrage et de mise en forme que les services et l’exécutif pilotent largement en amont. Comprendre ça, c’est ne plus être surpris par ce qui se joue — ou ne se joue pas — en séance.",
    understand: [
      "Le conseil vote les délibérations, mais la décision réelle a souvent été prise bien avant la séance.",
      "Les décisions sont préparées par les services, arbitrées par l’exécutif, et validées en commission avant d’être votées.",
      "La séance a aussi une fonction politique et démocratique : rendre les décisions lisibles, assumées, et publiquement défendues."
    ],
    commonTrap: "Croire que tout se joue en séance — ou au contraire réduire le conseil à une formalité sans enjeu.",
    actions: [
      "Préparer les dossiers en amont et lire les délibérations avant séance.",
      "Identifier ce qui est vraiment ouvert au débat et ce qui est déjà arbitré.",
      "Faire du conseil un moment de lisibilité politique, pas seulement d’obligation procédurale."
    ],
    reflex: "Le conseil valide plus qu’il ne fabrique — mais il rend la décision publique et assumée.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "majorite", "opposition"],
    institutionContexts: ["commune"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent", "prise_de_parole", "gouvernance"],
    useCases: ["institution", "deliberation", "preparation"],
    tags: ["conseil municipal", "délibération", "préparation"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune", "intercommunalite"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
    institutionContexts: ["commune"],
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
  },

  // ── LOT 2 : FICHES INSTITUTIONNELLES ──────────────────────────────────────

  {
    id: "budget-communal-qui-decide-vraiment",
    title: "Budget communal : qui décide vraiment et à quel moment",
    slug: "budget-communal-qui-decide-vraiment",
    pillar: "comprendre",
    format: "guide",
    promise: "Comprendre comment se construit un budget communal, qui l'arbitre réellement et à quel moment un élu peut encore peser.",
    intro: "Dans une commune de droit commun, le budget est l'acte politique central. Il permet de traduire un projet de mandat en décisions concrètes : dépenses de fonctionnement, investissements, subventions, recrutements, priorités de service public. Le conseil municipal vote le budget, mais il ne le fabrique pas seul. Entre l'idée d'un projet et son inscription budgétaire, il y a une chaîne de préparation, de chiffrage, de hiérarchisation et d'arbitrage dans laquelle l'exécutif et l'administration jouent un rôle décisif.",
    understand: [
      "Le conseil municipal vote le budget, mais la préparation budgétaire est pilotée en amont par le maire, les adjoints concernés, la direction générale et les services.",
      "Le vrai pouvoir budgétaire ne se joue pas seulement en séance : il se joue surtout pendant la phase de cadrage, de chiffrage et d'arbitrage.",
      "Un conseiller municipal peut peser politiquement sur les priorités, mais il ne pilote pas seul la machine budgétaire s'il n'est pas dans l'exécutif."
    ],
    commonTrap: "Croire que tout se joue au moment du vote du budget, alors que les marges de manœuvre sont souvent déjà très réduites à ce stade.",
    actions: [
      "Identifier très tôt les priorités que tu veux voir entrer dans le budget communal.",
      "Demander un chiffrage sérieux du projet avant de le défendre politiquement.",
      "Distinguer ce qui relève d'une dépense nouvelle, d'un redéploiement ou d'un financement externe."
    ],
    reflex: "En budget communal, le vote compte ; l'arbitrage amont compte davantage.",
    sensitiveNote: "Un projet politiquement populaire peut rester hors budget s'il n'a pas été travaillé assez tôt avec les services ou s'il entre en concurrence avec d'autres priorités du mandat.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "majorite", "opposition"],
    institutionContexts: ["commune"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["mandat_recent", "arbitrage", "besoin_methode", "gouvernance"],
    useCases: ["budget", "arbitrage", "gouvernance"],
    tags: ["budget communal", "conseil municipal", "arbitrage", "commune"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "budget-intercommunal-comprendre-ou-se-joue-le-pouvoir",
    title: "Budget intercommunal : comprendre où se joue le pouvoir",
    slug: "budget-intercommunal-comprendre-ou-se-joue-le-pouvoir",
    pillar: "comprendre",
    format: "guide",
    promise: "Comprendre ce que finance réellement l'intercommunalité et comment un élu peut peser dans le budget d'un EPCI.",
    intro: "Le budget intercommunal est souvent moins visible que le budget communal, alors même qu'il finance des compétences lourdes : développement économique, aménagement, mobilité, déchets, eau, habitat ou urbanisme selon les cas. C'est un budget stratégique, mais plus indirect dans son fonctionnement. Le pouvoir y est souvent plus concentré autour de l'exécutif intercommunal, des vice-présidences, du bureau et des directions. Pour un élu, la clé est donc moins la visibilité publique que la capacité à entrer dans le bon circuit de décision.",
    understand: [
      "L'intercommunalité finance les compétences qu'elle exerce effectivement, pas l'ensemble des sujets du territoire.",
      "Le budget intercommunal est voté par le conseil communautaire ou métropolitain, mais il est préparé dans un circuit plus resserré que dans beaucoup de communes.",
      "Le pouvoir réel y dépend souvent de la place occupée dans l'exécutif, dans les commissions et dans la relation au président ou aux vice-présidences."
    ],
    commonTrap: "Porter une demande au seul niveau communal alors que la compétence et donc le financement relèvent déjà de l'intercommunalité.",
    actions: [
      "Vérifier d'abord si le sujet relève bien d'une compétence intercommunale.",
      "Identifier la vice-présidence, la commission et la direction qui structurent le sujet.",
      "Construire une stratégie d'influence adaptée au circuit intercommunal plutôt qu'une simple demande politique générale."
    ],
    reflex: "À l'interco, la bonne porte d'entrée compte presque autant que le fond du projet.",
    sensitiveNote: "Un élu communal peut être exposé localement sur un dossier qu'il ne maîtrise pas budgétairement. Clarifier le bon niveau de décision protège autant qu'il éclaire.",
    targetRoles: ["interco", "conseiller_communautaire", "vice_president_interco", "maire", "adjoint", "majorite", "opposition"],
    institutionContexts: ["intercommunalite"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["mandat_recent", "gouvernance", "isolement", "besoin_methode"],
    useCases: ["budget", "intercommunalite", "gouvernance"],
    tags: ["budget intercommunal", "EPCI", "conseiller communautaire", "compétences"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "plm-comprendre-le-systeme-apres-la-reforme-2026",
    title: "PLM : comprendre le système après la réforme 2026",
    slug: "plm-comprendre-le-systeme-apres-la-reforme-2026",
    pillar: "comprendre",
    format: "guide",
    promise: "Comprendre ce que change réellement le régime PLM pour Paris, Lyon et Marseille, et ce que la réforme 2026 modifie dans la lecture des mandats.",
    intro: "Le régime PLM organise un fonctionnement spécifique pour Paris, Lyon et Marseille. Dans ces trois villes, il faut distinguer le niveau central de la ville et le niveau des arrondissements. La réforme applicable à partir des municipales de 2026 clarifie ce paysage en séparant l'élection du niveau central et celle du niveau d'arrondissement. Cela rend les mandats plus lisibles, mais ne change pas un point fondamental : les arrondissements restent des niveaux politiques de proximité, sans autonomie équivalente à celle d'une commune de plein exercice.",
    understand: [
      "Le régime PLM ne produit pas des communes internes autonomes : les arrondissements ont des compétences limitées et un pouvoir décisionnel encadré.",
      "Depuis 2026, les mandats du niveau central et ceux du niveau d'arrondissement sont politiquement mieux distingués.",
      "La proximité électorale en PLM ne coïncide pas toujours avec le pouvoir réel : beaucoup de visibilité locale, mais un centre qui continue à trancher."
    ],
    commonTrap: "Parler d'un arrondissement PLM comme d'une commune classique, avec un budget, des compétences et une autonomie comparables.",
    actions: [
      "Toujours distinguer le niveau central et le niveau d'arrondissement avant de qualifier un mandat ou une stratégie.",
      "Vérifier si le sujet relève du conseil central, de l'exécutif central ou seulement du conseil d'arrondissement.",
      "Adapter la posture politique au régime réel : proximité locale d'un côté, pouvoir central de l'autre."
    ],
    reflex: "En PLM, la proximité est locale ; le pouvoir réel reste largement central.",
    sensitiveNote: "La réforme rend les mandats plus clairs pour les électeurs, mais elle peut aussi accroître la tension entre attente locale et capacité réelle d'agir.",
    targetRoles: ["maire_arrondissement", "adjoint_arrondissement", "conseiller_arrondissement", "conseiller_paris", "conseiller_municipal", "majorite", "opposition"],
    institutionContexts: ["plm", "paris"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["mandat_recent", "gouvernance", "prise_de_parole", "besoin_methode"],
    useCases: ["institution", "posture", "gouvernance"],
    tags: ["PLM", "Paris", "Lyon", "Marseille", "réforme 2026"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "maire-de-secteur-a-marseille-role-pouvoir-limites",
    title: "Maire de secteur à Marseille : rôle, pouvoir, limites",
    slug: "maire-de-secteur-a-marseille-role-pouvoir-limites",
    pillar: "se_situer",
    format: "fiche",
    promise: "Comprendre ce qu'est un maire de secteur à Marseille, ce qu'il peut réellement faire et où s'arrêtent ses pouvoirs.",
    intro: "Marseille a une singularité supplémentaire dans le régime PLM : ses arrondissements sont regroupés en secteurs. Le maire de secteur est donc une figure locale très visible, souvent fortement identifiée par les habitants. Mais cette visibilité ne doit pas faire illusion. Le maire de secteur n'est pas un maire de commune de plein exercice. Il agit dans un cadre limité, entre ancrage territorial, gestion de proximité, expression politique locale et négociation avec la mairie centrale ou d'autres niveaux institutionnels.",
    understand: [
      "Le maire de secteur incarne politiquement un territoire local, mais il n'exerce pas l'ensemble des compétences du maire de Marseille.",
      "Son pouvoir réel repose à la fois sur le conseil de secteur, sur sa capacité d'animation politique locale et sur sa faculté à peser sur le centre.",
      "À Marseille, la lecture des responsabilités est souvent brouillée par l'empilement entre secteur, mairie centrale et métropole."
    ],
    commonTrap: "Laisser croire qu'un maire de secteur dispose des mêmes moyens d'action qu'un maire de commune autonome.",
    actions: [
      "Qualifier clairement les sujets : ce qui relève du secteur, de la mairie centrale ou de la métropole.",
      "Utiliser le secteur pour documenter les besoins, construire une légitimité locale et peser politiquement.",
      "Ne pas promettre seul ce qui dépend juridiquement ou budgétairement d'un autre niveau."
    ],
    reflex: "À Marseille, le maire de secteur incarne le territoire ; il ne concentre pas tous les pouvoirs.",
    sensitiveNote: "Le mandat expose fortement, car les habitants identifient un responsable local visible même lorsque la décision finale se prend ailleurs.",
    targetRoles: ["maire_de_secteur", "adjoint_arrondissement", "conseiller_arrondissement", "conseiller_municipal", "majorite", "opposition"],
    institutionContexts: ["plm"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    diagnosticProfiles: ["mandat_recent", "exposition", "gouvernance", "besoin_methode"],
    useCases: ["posture", "marseille", "gouvernance"],
    tags: ["Marseille", "maire de secteur", "PLM", "secteur"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 3 : FICHES PAR MANDAT ─────────────────────────────────────────────

  {
    id: "conseiller-municipal-pouvoir-reel",
    title: "Conseiller municipal : pouvoir réel et marges d'action",
    slug: "conseiller-municipal-pouvoir-reel",
    pillar: "se_situer",
    format: "fiche",
    promise: "Comprendre ce qu'un conseiller municipal peut réellement faire et comment exister dans le mandat.",
    intro: "Le conseiller municipal est souvent perçu comme un rôle secondaire. En réalité, il est au cœur du fonctionnement démocratique local, mais avec des marges d'action très variables selon sa position dans la majorité ou l'opposition. Son pouvoir n'est pas exécutif, mais il peut devenir stratégique s'il comprend les bons leviers : information, réseau, commission, prise de parole.",
    understand: [
      "Le conseiller municipal participe aux délibérations mais ne pilote pas l'exécutif s'il n'a pas de délégation.",
      "Son influence dépend fortement de sa position : majorité, opposition, proximité avec le maire ou les adjoints.",
      "Le travail en commission et en amont des conseils est souvent plus déterminant que la séance elle-même."
    ],
    commonTrap: "Attendre le conseil municipal pour exister politiquement.",
    actions: [
      "S'investir dans les commissions pour accéder à l'information et peser en amont.",
      "Identifier un ou deux sujets sur lesquels devenir référent.",
      "Construire des relations avec les services et les élus exécutifs."
    ],
    reflex: "Un conseiller efficace travaille avant la séance, pas seulement pendant.",
    targetRoles: ["conseiller_municipal", "majorite", "opposition"],
    institutionContexts: ["commune"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent", "isolement", "besoin_methode"],
    useCases: ["posture", "gouvernance"],
    tags: ["conseiller municipal", "mandat", "posture"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "adjoint-au-maire-exercer-une-delegation",
    title: "Adjoint au maire : exercer une délégation efficacement",
    slug: "adjoint-au-maire-exercer-une-delegation",
    pillar: "agir",
    format: "fiche",
    promise: "Comprendre comment piloter une délégation sans se perdre entre politique et administration.",
    intro: "Être adjoint, c'est être à la frontière entre décision politique et mise en œuvre administrative. Une délégation ne se résume pas à un portefeuille : c'est un espace de pilotage, de négociation et d'arbitrage. La difficulté n'est pas d'avoir des idées, mais de les rendre faisables dans un cadre contraint.",
    understand: [
      "Une délégation s'exerce toujours en lien étroit avec les services et la direction générale.",
      "Le pouvoir d'un adjoint dépend autant de sa relation avec le maire que de sa maîtrise des dossiers.",
      "Un adjoint arbitre en permanence entre priorités politiques, contraintes budgétaires et faisabilité technique."
    ],
    commonTrap: "Vouloir décider seul sans embarquer les services et sans sécuriser politiquement.",
    actions: [
      "Clarifier rapidement le périmètre réel de ta délégation.",
      "Mettre en place un point régulier avec les services.",
      "Hiérarchiser tes priorités pour éviter la dispersion."
    ],
    reflex: "Une délégation se pilote, elle ne s'improvise pas.",
    targetRoles: ["adjoint", "majorite"],
    institutionContexts: ["commune"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["surcharge", "arbitrage", "gouvernance"],
    useCases: ["pilotage", "decision"],
    tags: ["adjoint", "delegation", "pilotage"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "conseiller-de-paris-role-et-pouvoir",
    title: "Conseiller de Paris : rôle, pouvoir et stratégie",
    slug: "conseiller-de-paris-role-et-pouvoir",
    pillar: "se_situer",
    format: "fiche",
    promise: "Comprendre le rôle spécifique d'un conseiller de Paris et ses leviers d'action réels.",
    intro: "Le conseiller de Paris est un élu du niveau central, avec un pouvoir de décision réel. Il vote le budget, les politiques publiques et les grandes orientations de la Ville. Mais ce pouvoir est collectif et structuré : il s'exerce dans un cadre politique, en lien avec un groupe, un exécutif et une administration très organisée.",
    understand: [
      "Le Conseil de Paris est le lieu de décision centrale, avec des compétences étendues.",
      "Le pouvoir d'un conseiller dépend de son groupe politique et de sa place dans l'exécutif.",
      "La majorité des arbitrages se fait avant les séances, dans les circuits internes."
    ],
    commonTrap: "Se concentrer uniquement sur la séance publique sans travailler les circuits en amont.",
    actions: [
      "S'impliquer dans les commissions et groupes politiques.",
      "Travailler avec les directions et cabinets en amont.",
      "Construire des alliances sur les dossiers."
    ],
    reflex: "À Paris, la décision se prépare avant d'être votée.",
    targetRoles: ["conseiller_paris", "majorite", "opposition"],
    institutionContexts: ["paris", "plm"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["gouvernance", "arbitrage"],
    useCases: ["decision", "strategie"],
    tags: ["Conseil de Paris", "délibération", "pouvoir"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "conseiller-arrondissement-posture",
    title: "Conseiller d'arrondissement : exister sans pouvoir direct",
    slug: "conseiller-arrondissement-posture",
    pillar: "se_situer",
    format: "fiche",
    promise: "Comprendre comment agir efficacement en conseil d'arrondissement malgré des compétences limitées.",
    intro: "Le conseiller d'arrondissement est un élu de proximité, mais avec un pouvoir décisionnel limité. Son rôle est souvent mal compris, y compris par les habitants. Il ne décide pas des grandes politiques publiques, mais il peut influencer, alerter, relayer et construire des dynamiques locales.",
    understand: [
      "Le conseil d'arrondissement a un rôle consultatif et de gestion locale limitée.",
      "Le pouvoir réel est centralisé au niveau de la Ville.",
      "Le rôle du conseiller est d'alimenter, influencer et relayer."
    ],
    commonTrap: "Faire croire qu'on peut décider localement ce qui dépend du niveau central.",
    actions: [
      "Utiliser les vœux pour mettre des sujets à l'agenda.",
      "Construire un lien fort avec les habitants.",
      "Faire remonter les sujets vers les bons interlocuteurs."
    ],
    reflex: "En arrondissement, tu influences plus que tu ne décides.",
    targetRoles: ["conseiller_arrondissement", "majorite", "opposition"],
    institutionContexts: ["plm", "paris"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent", "prise_de_parole"],
    useCases: ["posture", "territoire"],
    tags: ["arrondissement", "proximité", "PLM"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "conseiller-communautaire-pouvoir",
    title: "Conseiller communautaire : comprendre son vrai levier",
    slug: "conseiller-communautaire-pouvoir",
    pillar: "se_situer",
    format: "fiche",
    promise: "Comprendre le rôle réel d'un conseiller communautaire et comment peser à l'intercommunalité.",
    intro: "Le conseiller communautaire intervient sur des compétences stratégiques, mais dans un système moins lisible et plus éloigné des habitants. Son pouvoir dépend fortement des circuits internes, de l'exécutif intercommunal et de sa capacité à s'y insérer.",
    understand: [
      "L'intercommunalité gère des compétences majeures.",
      "Le pouvoir est souvent concentré dans l'exécutif.",
      "La visibilité politique y est plus faible mais l'impact réel plus fort."
    ],
    commonTrap: "Sous-estimer l'intercommunalité ou la traiter comme un mandat secondaire.",
    actions: [
      "Identifier les compétences intercommunales clés.",
      "Repérer les vice-présidents et circuits décisionnels.",
      "Articuler action communale et intercommunale."
    ],
    reflex: "À l'interco, moins visible ne veut pas dire moins puissant.",
    targetRoles: ["conseiller_communautaire", "interco", "majorite", "opposition"],
    institutionContexts: ["intercommunalite"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["isolement", "gouvernance"],
    useCases: ["posture", "interco"],
    tags: ["intercommunalité", "EPCI", "mandat"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "vice-president-interco-pilotage",
    title: "Vice-président d'intercommunalité : piloter une compétence",
    slug: "vice-president-interco-pilotage",
    pillar: "agir",
    format: "fiche",
    promise: "Comprendre comment exercer une responsabilité exécutive à l'échelle intercommunale.",
    intro: "Le vice-président d'intercommunalité est un élu exécutif, avec un pouvoir réel sur des politiques structurantes. Mais ce pouvoir est partagé, négocié et encadré par l'équilibre politique de l'EPCI. Il nécessite une capacité à piloter à distance, coordonner et arbitrer.",
    understand: [
      "Le vice-président porte une compétence stratégique.",
      "Le pouvoir est collectif et dépend du président.",
      "Le pilotage repose sur les directions et les services intercommunaux."
    ],
    commonTrap: "Penser pouvoir agir seul sans composer avec l'équilibre politique.",
    actions: [
      "Clarifier ton périmètre de délégation.",
      "Structurer ta relation avec les services.",
      "Construire des alliances politiques."
    ],
    reflex: "À l'interco, le pouvoir s'exerce en réseau.",
    targetRoles: ["vice_president_interco", "interco"],
    institutionContexts: ["intercommunalite"],
    experienceLevels: ["confirme"],
    diagnosticProfiles: ["gouvernance", "arbitrage"],
    useCases: ["pilotage", "decision"],
    tags: ["intercommunalité", "exécutif", "pilotage"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 4 : AGIR — LES GESTES CLÉS DU MANDAT ─────────────────────────────

  {
    id: "faire-adopter-un-voeu",
    title: "Faire adopter un vœu : utilité réelle et stratégie",
    slug: "faire-adopter-un-voeu",
    pillar: "agir",
    format: "fiche",
    promise: "Utiliser un vœu comme levier politique sans le confondre avec une décision.",
    intro: "Le vœu est un outil fréquent dans les collectivités, notamment à Paris. Il permet d'exprimer une position, de mettre un sujet à l'agenda ou de créer un rapport de force. Mais il n'a pas de portée juridique contraignante. Son efficacité dépend donc de la stratégie politique qui l'accompagne.",
    understand: [
      "Un vœu n'est pas une décision, mais un signal politique.",
      "Il sert à mettre un sujet à l'agenda ou à interpeller l'exécutif.",
      "Son impact dépend de sa reprise en délibération ou en action concrète."
    ],
    commonTrap: "Croire qu'un vœu adopté suffit à faire avancer un projet.",
    actions: [
      "Utiliser le vœu pour ouvrir un sujet ou créer un rapport de force.",
      "Travailler en parallèle avec les services ou l'exécutif.",
      "Préparer une suite : délibération, budget ou action."
    ],
    reflex: "Un vœu ouvre une porte, il ne fait pas passer le projet.",
    targetRoles: ["conseiller_municipal", "conseiller_arrondissement", "conseiller_paris", "opposition", "majorite"],
    institutionContexts: ["commune", "paris", "plm"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["prise_de_parole", "besoin_methode"],
    useCases: ["decision", "expression"],
    tags: ["voeu", "conseil", "politique"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "faire-passer-une-deliberation",
    title: "Faire passer une délibération : le vrai circuit",
    slug: "faire-passer-une-deliberation",
    pillar: "agir",
    format: "guide",
    promise: "Comprendre les étapes réelles pour transformer une idée en décision votée.",
    intro: "Une délibération n'est jamais le fruit d'un simple vote. Elle est construite en amont, dans un enchaînement précis : travail avec les services, arbitrages politiques, validation en commission. Le vote final ne fait qu'acter un processus déjà largement sécurisé.",
    understand: [
      "Le travail principal se fait avant la séance.",
      "L'administration construit et sécurise la délibération.",
      "Les arbitrages politiques interviennent en amont."
    ],
    commonTrap: "Arriver en séance avec une idée non travaillée.",
    actions: [
      "Clarifier l'objectif exact de la délibération.",
      "Associer la direction compétente dès le départ.",
      "Sécuriser un soutien politique avant le passage en commission."
    ],
    reflex: "Une délibération se gagne avant d'être votée.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "conseiller_paris", "interco"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["arbitrage", "besoin_methode"],
    useCases: ["decision", "projet"],
    tags: ["délibération", "vote", "décision"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "administration-qui-freine",
    title: "Quand l'administration freine : comprendre et débloquer",
    slug: "administration-qui-freine",
    pillar: "agir",
    format: "fiche",
    promise: "Débloquer un dossier sans casser la relation avec les services.",
    intro: "Tous les élus vivent cette situation : un projet qui semble bloqué par l'administration. Mais ce frein est rarement politique. Il est souvent technique, juridique, budgétaire ou organisationnel. Comprendre la nature du blocage est la clé pour avancer.",
    understand: [
      "Un refus administratif est souvent un problème de faisabilité.",
      "Les services sécurisent juridiquement et techniquement.",
      "Le blocage est souvent un signal, pas une opposition."
    ],
    commonTrap: "Transformer un problème technique en conflit politique.",
    actions: [
      "Demander explicitement les raisons du blocage.",
      "Identifier ce qui est négociable ou non.",
      "Reformuler le projet pour le rendre faisable."
    ],
    reflex: "Un blocage administratif est souvent une information, pas un refus.",
    targetRoles: ["adjoint", "maire", "majorite"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["tension_relationnelle", "gouvernance"],
    useCases: ["administration", "projet"],
    tags: ["administration", "blocage", "services"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "faire-remonter-sujet-executif",
    title: "Faire remonter un sujet à l'exécutif efficacement",
    slug: "faire-remonter-sujet-executif",
    pillar: "agir",
    format: "fiche",
    promise: "Faire remonter un sujet sans le perdre dans les circuits internes.",
    intro: "Un sujet local ne devient jamais une priorité par lui-même. Il doit être formulé, qualifié, porté et relayé dans les bons circuits. La manière dont tu fais remonter un sujet est souvent plus importante que le sujet lui-même.",
    understand: [
      "Un sujet doit être reformulé pour devenir une priorité politique.",
      "Le circuit de remontée dépend du contexte : cabinet, adjoint, direction.",
      "Un sujet mal cadré disparaît rapidement."
    ],
    commonTrap: "Faire remonter une demande brute sans cadrage.",
    actions: [
      "Formuler clairement le problème et la solution.",
      "Identifier le bon interlocuteur.",
      "Accompagner la demande d'éléments concrets (coût, impact, urgence)."
    ],
    reflex: "Un bon sujet mal formulé ne remonte pas.",
    targetRoles: ["conseiller_municipal", "conseiller_arrondissement", "majorite"],
    institutionContexts: ["commune", "paris", "plm"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["isolement", "besoin_methode"],
    useCases: ["decision", "strategie"],
    tags: ["exécutif", "remontée", "dossier"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 5 : STRUCTURE DU POUVOIR & INSTANCES ──────────────────────────────

  {
    id: "les-lieux-du-pouvoir-local",
    title: "Les lieux du pouvoir local : officiels et officieux",
    slug: "les-lieux-du-pouvoir-local",
    pillar: "comprendre",
    format: "fiche",
    promise: "Identifier où se prennent réellement les décisions dans une collectivité.",
    intro: "Les décisions ne se prennent pas uniquement en séance. Elles se construisent dans plusieurs lieux : commissions, réunions internes, cabinets, relations avec l'administration. Comprendre ces espaces permet de mieux agir.",
    understand: [
      "Le conseil vote, mais ne décide pas toujours seul.",
      "Les commissions sont des lieux clés de préparation.",
      "Les arbitrages politiques se font souvent en amont."
    ],
    commonTrap: "Croire que tout se joue en séance publique.",
    actions: [
      "Identifier les lieux informels de décision.",
      "S'impliquer en commission.",
      "Travailler les circuits internes."
    ],
    reflex: "Le pouvoir ne se voit pas toujours là où il s'affiche.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "interco"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["gouvernance"],
    useCases: ["decision"],
    tags: ["pouvoir", "organisation"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "les-commissions-a-quoi-ca-sert",
    title: "Les commissions : à quoi ça sert vraiment",
    slug: "les-commissions-a-quoi-ca-sert",
    pillar: "comprendre",
    format: "fiche",
    promise: "Utiliser les commissions comme levier d'influence réel.",
    intro: "Les commissions sont souvent perçues comme secondaires. En réalité, elles sont au cœur du fonctionnement politique local. C'est là que les dossiers sont présentés, discutés, ajustés et parfois arbitrés.",
    understand: [
      "Les commissions préparent les décisions.",
      "Elles permettent d'accéder à l'information en amont.",
      "Elles sont un lieu d'influence discret mais réel."
    ],
    commonTrap: "Négliger les commissions au profit des séances.",
    actions: [
      "Participer activement aux commissions.",
      "Poser des questions en amont.",
      "Identifier les points sensibles."
    ],
    reflex: "Si tu n'es pas en commission, tu arrives trop tard.",
    targetRoles: ["conseiller_municipal", "adjoint", "interco"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent"],
    useCases: ["decision"],
    tags: ["commission", "décision"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 6 : INSTANCES & FICHE MAIRE ───────────────────────────────────────

  {
    id: "conseil-de-paris-role-et-fonctionnement",
    title: "Le Conseil de Paris : rôle, pouvoir et fonctionnement réel",
    slug: "conseil-de-paris-role-et-fonctionnement",
    pillar: "comprendre",
    format: "guide",
    promise: "Comprendre comment fonctionne réellement le Conseil de Paris et où se prennent les décisions.",
    intro: "Le Conseil de Paris est à la fois un conseil municipal et un conseil départemental. Il vote les politiques publiques, le budget et les grandes orientations de la Ville. Mais comme dans toute grande collectivité, la séance publique n'est que la partie visible d'un processus de décision largement construit en amont.",
    understand: [
      "Le Conseil de Paris vote les décisions mais ne les construit pas seul.",
      "Les délibérations sont préparées par les directions et les cabinets.",
      "Les arbitrages politiques ont lieu avant la séance, notamment en commission et en groupe."
    ],
    commonTrap: "Penser que la décision se joue pendant la séance publique.",
    actions: [
      "Travailler les dossiers en amont avec les directions et cabinets.",
      "S'impliquer dans les commissions et groupes politiques.",
      "Identifier les moments clés d'arbitrage avant le vote."
    ],
    reflex: "À Paris, la décision est prise avant d'être votée.",
    targetRoles: ["conseiller_paris", "adjoint", "maire", "majorite", "opposition"],
    institutionContexts: ["paris", "plm"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["gouvernance", "arbitrage"],
    useCases: ["decision", "institution"],
    tags: ["Conseil de Paris", "délibération", "budget"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "conseil-arrondissement-role-reel",
    title: "Le conseil d'arrondissement : rôle réel et limites",
    slug: "conseil-arrondissement-role-reel",
    pillar: "comprendre",
    format: "fiche",
    promise: "Comprendre à quoi sert un conseil d'arrondissement et comment l'utiliser efficacement.",
    intro: "Le conseil d'arrondissement est une instance de proximité dans les villes PLM. Il traite des sujets locaux, donne des avis et peut adopter des vœux. Mais il ne dispose pas du même pouvoir qu'un conseil municipal central.",
    understand: [
      "Le conseil d'arrondissement a un rôle local et souvent consultatif.",
      "Il ne décide pas des grandes politiques publiques.",
      "Il est un levier d'influence et de mise à l'agenda."
    ],
    commonTrap: "Présenter comme acquis ce qui n'est qu'un avis ou un vœu.",
    actions: [
      "Utiliser le conseil pour structurer un sujet local.",
      "Relayer les demandes vers le niveau central.",
      "S'appuyer sur les vœux pour peser politiquement."
    ],
    reflex: "Le conseil d'arrondissement influence plus qu'il ne décide.",
    targetRoles: ["conseiller_arrondissement", "adjoint_arrondissement", "maire_arrondissement"],
    institutionContexts: ["plm", "paris"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent"],
    useCases: ["institution", "territoire"],
    tags: ["arrondissement", "PLM", "proximité"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "conseil-de-secteur-marseille",
    title: "Conseil de secteur à Marseille : fonctionnement et réalité",
    slug: "conseil-de-secteur-marseille",
    pillar: "comprendre",
    format: "fiche",
    promise: "Comprendre le rôle du conseil de secteur à Marseille et ses limites réelles.",
    intro: "À Marseille, les arrondissements sont regroupés en secteurs. Le conseil de secteur fonctionne comme une instance locale importante, mais il ne dispose pas des mêmes compétences que le conseil municipal central. Il est à la fois un lieu de débat, de gestion de proximité et d'expression politique.",
    understand: [
      "Le conseil de secteur traite les affaires locales du territoire.",
      "Il ne dispose pas de l'ensemble des compétences municipales.",
      "Son rôle est à la fois politique, territorial et consultatif."
    ],
    commonTrap: "Confondre conseil de secteur et conseil municipal.",
    actions: [
      "Utiliser le conseil pour structurer une demande locale.",
      "Identifier les sujets qui doivent remonter à la mairie centrale.",
      "S'appuyer sur la légitimité territoriale du secteur."
    ],
    reflex: "Le secteur structure le territoire, mais ne décide pas tout.",
    targetRoles: ["maire_de_secteur", "conseiller_arrondissement", "adjoint_arrondissement"],
    institutionContexts: ["plm"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent"],
    useCases: ["institution", "marseille"],
    tags: ["Marseille", "secteur", "PLM"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "conseil-arrondissement-lyon",
    title: "Conseil d'arrondissement à Lyon : rôle et fonctionnement",
    slug: "conseil-arrondissement-lyon",
    pillar: "comprendre",
    format: "fiche",
    promise: "Comprendre le rôle spécifique des arrondissements à Lyon.",
    intro: "À Lyon, comme à Paris, les arrondissements disposent d'un conseil. Ils jouent un rôle important dans la vie locale, mais restent limités dans leurs compétences par rapport au conseil municipal central.",
    understand: [
      "Les arrondissements gèrent des sujets de proximité.",
      "Le pouvoir décisionnel reste au niveau central.",
      "Ils permettent un ancrage territorial fort."
    ],
    commonTrap: "Attendre du conseil d'arrondissement des décisions qu'il ne peut pas prendre.",
    actions: [
      "S'appuyer sur l'arrondissement pour capter les besoins locaux.",
      "Relayer les sujets au conseil municipal.",
      "Utiliser l'arrondissement comme levier politique."
    ],
    reflex: "À Lyon, l'arrondissement capte ; la ville décide.",
    targetRoles: ["conseiller_arrondissement", "maire_arrondissement"],
    institutionContexts: ["plm"],
    experienceLevels: ["debutant"],
    diagnosticProfiles: ["mandat_recent"],
    useCases: ["territoire"],
    tags: ["Lyon", "arrondissement"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "etre-maire-exercer-la-fonction",
    title: "Être maire : exercer réellement la fonction",
    slug: "etre-maire-exercer-la-fonction",
    pillar: "se_situer",
    format: "guide",
    promise: "Comprendre ce que signifie vraiment exercer la fonction de maire au quotidien.",
    intro: "Être maire, ce n'est pas seulement diriger une équipe ou porter un projet politique. C'est incarner une fonction, arbitrer en permanence, décider sous contrainte et assumer des responsabilités multiples : politiques, administratives, humaines et symboliques.",
    understand: [
      "Le maire est à la fois exécutif, décideur et représentant de la collectivité.",
      "Il arbitre en permanence entre contraintes politiques, budgétaires et administratives.",
      "Son pouvoir est réel mais dépend de sa capacité à structurer son équipe et ses priorités."
    ],
    commonTrap: "Vouloir tout gérer soi-même et s'épuiser.",
    actions: [
      "Structurer une équipe solide (adjoints, direction générale).",
      "Hiérarchiser les priorités du mandat.",
      "Accepter de déléguer et de trancher."
    ],
    reflex: "Être maire, c'est décider, pas tout faire.",
    sensitiveNote: "Le maire est exposé en permanence : toute décision engage politiquement et personnellement.",
    targetRoles: ["maire"],
    institutionContexts: ["commune"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["surcharge", "gouvernance", "exposition"],
    useCases: ["posture", "decision"],
    tags: ["maire", "leadership", "décision"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 7 : SITUATIONS POLITIQUES RÉELLES ─────────────────────────────────

  {
    id: "opposition-comment-peser",
    title: "Être dans l'opposition : comment peser réellement",
    slug: "opposition-comment-peser",
    pillar: "agir",
    format: "fiche",
    promise: "Trouver des leviers d'influence en opposition, sans accès direct à l'exécutif.",
    intro: "Être dans l'opposition ne signifie pas être inutile. Mais cela implique de changer de logique : tu n'es pas dans la décision directe, tu es dans l'influence. Les élu·es qui pèsent en opposition sont ceux qui maîtrisent les bons leviers : information, mise à l'agenda, alliances, pression politique et médiatisation.",
    understand: [
      "L'opposition ne décide pas, mais peut influencer.",
      "Le pouvoir passe par la capacité à structurer un débat ou créer un rapport de force.",
      "Les sujets bien documentés peuvent obliger la majorité à réagir."
    ],
    commonTrap: "Se limiter à la critique sans proposer d'alternative crédible.",
    actions: [
      "Travailler des dossiers solides et documentés.",
      "Utiliser les vœux, amendements et prises de parole.",
      "Construire des alliances ponctuelles, y compris avec la majorité."
    ],
    reflex: "En opposition, tu n'imposes pas : tu rends incontournable.",
    targetRoles: ["opposition", "conseiller_municipal", "conseiller_paris", "conseiller_communautaire"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["isolement", "prise_de_parole"],
    useCases: ["strategie", "positionnement"],
    tags: ["opposition", "influence", "politique"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "maire-bloque-dossier",
    title: "Quand le maire bloque ton dossier",
    slug: "maire-bloque-dossier",
    pillar: "agir",
    format: "fiche",
    promise: "Débloquer une situation sans se griller politiquement.",
    intro: "Un dossier bloqué par le maire est une situation fréquente, notamment pour les adjoints ou élus de majorité. Le blocage peut être politique, budgétaire ou stratégique. L'enjeu est de comprendre la vraie raison et d'adapter ta posture.",
    understand: [
      "Un blocage est rarement arbitraire : il répond à une logique.",
      "Le rapport au maire structure ton pouvoir réel.",
      "Un affrontement frontal est rarement efficace."
    ],
    commonTrap: "Forcer le passage ou contester frontalement.",
    actions: [
      "Identifier la vraie raison du blocage.",
      "Reformuler le projet pour le rendre acceptable.",
      "Chercher des appuis internes ou un autre angle."
    ],
    reflex: "Un dossier bloqué n'est pas mort, il est mal positionné.",
    targetRoles: ["adjoint", "majorite"],
    institutionContexts: ["commune"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["tension_relationnelle", "gouvernance"],
    useCases: ["blocage", "decision"],
    tags: ["maire", "blocage", "dossier"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "adjoint-sans-moyens",
    title: "Adjoint sans moyens : comment agir quand même",
    slug: "adjoint-sans-moyens",
    pillar: "agir",
    format: "fiche",
    promise: "Exercer une délégation même avec peu de budget ou de ressources.",
    intro: "Beaucoup d'adjoints se retrouvent avec une délégation mais peu de moyens. Cela peut créer frustration et perte de sens. Pourtant, il existe des leviers pour agir autrement : influence, coordination, expérimentation.",
    understand: [
      "Le pouvoir d'un adjoint ne se limite pas au budget.",
      "L'influence passe aussi par les services et les projets.",
      "Un petit levier bien utilisé peut produire des effets."
    ],
    commonTrap: "Attendre des moyens avant d'agir.",
    actions: [
      "Identifier des actions à faible coût.",
      "Mobiliser les services et partenaires.",
      "Tester des initiatives à petite échelle."
    ],
    reflex: "Moins de moyens oblige à être plus stratégique.",
    targetRoles: ["adjoint", "majorite"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["surcharge", "gouvernance"],
    useCases: ["pilotage"],
    tags: ["adjoint", "moyens", "frustration"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "seul-contre-tous-reunion",
    title: "Quand tu es seul contre tous en réunion",
    slug: "seul-contre-tous-reunion",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Tenir une position sans se griller ni se mettre en difficulté.",
    intro: "Il arrive souvent de se retrouver isolé en réunion, face à une majorité d'élus ou de services qui ne partagent pas ta position. L'enjeu n'est pas de gagner immédiatement, mais de tenir une posture utile.",
    understand: [
      "Être minoritaire ne signifie pas être illégitime.",
      "Le rapport de force n'est pas figé.",
      "La manière de s'exprimer compte autant que le fond."
    ],
    commonTrap: "Se crisper ou attaquer frontalement.",
    actions: [
      "Reformuler calmement ta position.",
      "Poser des questions plutôt que s'opposer frontalement.",
      "Garder une porte ouverte pour la suite."
    ],
    reflex: "Tenir dans la durée vaut mieux que gagner un moment.",
    targetRoles: ["adjoint", "conseiller_municipal", "majorite", "opposition"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["tension_relationnelle", "exposition"],
    useCases: ["reunion", "posture"],
    tags: ["réunion", "tension", "posture"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "projet-bloque-sans-raison",
    title: "Projet bloqué : comprendre et débloquer",
    slug: "projet-bloque-sans-raison",
    pillar: "agir",
    format: "fiche",
    promise: "Identifier les causes réelles d'un blocage et relancer le projet.",
    intro: "Un projet qui n'avance pas est rarement bloqué \"sans raison\". Le blocage peut être politique, administratif, budgétaire ou stratégique. Le problème est souvent mal identifié.",
    understand: [
      "Un blocage cache toujours une contrainte.",
      "Le problème n'est pas toujours celui que tu crois.",
      "Un projet peut être mal cadré ou mal positionné."
    ],
    commonTrap: "Insister sans comprendre le blocage.",
    actions: [
      "Identifier la nature du blocage.",
      "Reformuler le projet.",
      "Trouver un autre point d'entrée."
    ],
    reflex: "Un projet bloqué est un projet mal aligné.",
    targetRoles: ["adjoint", "maire", "majorite"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["arbitrage", "besoin_methode"],
    useCases: ["projet"],
    tags: ["blocage", "projet"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "majorite-sans-pouvoir",
    title: "Être dans la majorité sans vraiment décider",
    slug: "majorite-sans-pouvoir",
    pillar: "se_situer",
    format: "fiche",
    promise: "Comprendre comment exister politiquement sans être dans l'exécutif.",
    intro: "Être dans la majorité ne signifie pas avoir du pouvoir. Beaucoup d'élus se retrouvent dans une position intermédiaire : ils soutiennent l'exécutif sans en faire partie. Leur marge d'action dépend de leur capacité à trouver leur place.",
    understand: [
      "La majorité n'est pas homogène.",
      "Le pouvoir est concentré dans l'exécutif.",
      "L'influence reste possible."
    ],
    commonTrap: "Attendre d'être sollicité pour agir.",
    actions: [
      "Se positionner sur des sujets précis.",
      "Créer un lien avec les adjoints.",
      "Proposer des contributions concrètes."
    ],
    reflex: "Même sans décider, tu peux peser.",
    targetRoles: ["majorite", "conseiller_municipal"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["isolement"],
    useCases: ["posture"],
    tags: ["majorité", "pouvoir"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 8 : PRISE DE PAROLE & COMMUNICATION POLITIQUE ────────────────────

  {
    id: "preparer-prise-de-parole-politique",
    title: "Préparer une prise de parole politique efficace",
    slug: "preparer-prise-de-parole-politique",
    pillar: "agir",
    format: "fiche",
    promise: "Structurer une prise de parole claire, crédible et utile politiquement.",
    intro: "Une prise de parole politique ne sert pas seulement à dire quelque chose. Elle sert à clarifier une position, créer de la confiance et orienter une situation. Une parole floue fragilise, une parole claire engage.",
    understand: [
      "Une prise de parole sert d'abord à poser une position.",
      "Le fond compte, mais la clarté encore plus.",
      "Une parole engage politiquement, même quand elle se veut prudente."
    ],
    commonTrap: "Parler pour remplir un temps ou éviter un silence.",
    actions: [
      "Définir ton message principal en une phrase.",
      "Identifier ce que tu veux que les gens retiennent.",
      "Adapter ton discours au contexte et au public."
    ],
    reflex: "Si tu ne sais pas ce que tu veux dire, ne parle pas encore.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "conseiller_paris"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["prise_de_parole"],
    useCases: ["communication"],
    tags: ["prise de parole", "discours"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "prise-de-parole-reunion",
    title: "Prendre la parole en réunion sans se griller",
    slug: "prise-de-parole-reunion",
    pillar: "agir",
    format: "fiche",
    promise: "Intervenir de manière utile sans se mettre en difficulté.",
    intro: "En réunion, la parole est un outil de positionnement. Trop parler affaiblit, ne pas parler invisibilise. L'enjeu est de trouver le bon moment, le bon angle et le bon niveau d'engagement.",
    understand: [
      "Une prise de parole est toujours interprétée politiquement.",
      "Le timing est aussi important que le contenu.",
      "Dire peu mais juste vaut mieux que parler beaucoup."
    ],
    commonTrap: "Intervenir systématiquement pour exister.",
    actions: [
      "Attendre le bon moment pour intervenir.",
      "Poser une question plutôt qu'imposer une position.",
      "Conclure avec un point clair."
    ],
    reflex: "En réunion, chaque mot compte.",
    targetRoles: ["adjoint", "conseiller_municipal", "majorite", "opposition"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["prise_de_parole", "tension_relationnelle"],
    useCases: ["reunion"],
    tags: ["réunion", "posture"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "reunion-publique-utile",
    title: "Faire une réunion publique utile (pas juste défoulatoire)",
    slug: "reunion-publique-utile",
    pillar: "agir",
    format: "fiche",
    promise: "Transformer une réunion publique en moment utile plutôt qu'en défouloir.",
    intro: "Une réunion publique est un moment à haut risque : attentes fortes, tensions possibles, émotion. Mal préparée, elle devient un lieu de défoulement. Bien cadrée, elle peut produire de la clarté et de la confiance.",
    understand: [
      "Une réunion publique est d'abord un espace de projection et d'attentes.",
      "Les participants ne viennent pas tous pour la même chose.",
      "Le cadre posé au départ détermine la suite."
    ],
    commonTrap: "Ouvrir la parole sans cadrage.",
    actions: [
      "Dire clairement ce qui est ouvert ou non à discussion.",
      "Structurer les temps de parole.",
      "Clore avec des éléments concrets."
    ],
    reflex: "Une réunion publique se cadre avant de s'animer.",
    targetRoles: ["maire", "adjoint"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["exposition"],
    useCases: ["participation"],
    tags: ["réunion publique"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "repondre-critique-publique",
    title: "Répondre à une critique sans s'enfermer",
    slug: "repondre-critique-publique",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Répondre à une critique sans surréagir ni se fragiliser.",
    intro: "Une critique publique peut vite devenir un piège. Répondre trop vite ou trop fort peut amplifier le problème. Ne pas répondre peut donner l'impression de fuir. L'enjeu est de garder la maîtrise.",
    understand: [
      "Toute critique n'appelle pas une réponse immédiate.",
      "Répondre, c'est cadrer le débat.",
      "Le ton est aussi important que le fond."
    ],
    commonTrap: "Réagir à chaud.",
    actions: [
      "Prendre du recul avant de répondre.",
      "Répondre sur le fond, pas sur la personne.",
      "Recentrer sur les faits."
    ],
    reflex: "Ne réponds pas à l'émotion par de l'émotion.",
    targetRoles: ["maire", "adjoint", "majorite", "opposition"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["exposition"],
    useCases: ["communication"],
    tags: ["critique", "communication"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 8 (suite) : GESTION DE CRISE ─────────────────────────────────────

  {
    id: "gerer-situation-sensible",
    title: "Gérer une situation sensible sans surréagir",
    slug: "gerer-situation-sensible",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Garder la maîtrise dans une situation tendue.",
    intro: "Une situation sensible peut rapidement dégénérer si elle est mal gérée. L'enjeu est de ne pas ajouter de tension à la tension, tout en assumant une position claire.",
    understand: [
      "Une situation sensible est souvent émotionnelle.",
      "La réaction de l'élu structure la suite.",
      "Le silence peut être stratégique."
    ],
    commonTrap: "Réagir trop vite.",
    actions: [
      "Analyser la situation avant de parler.",
      "Limiter les prises de parole.",
      "Coordonner avec les équipes."
    ],
    reflex: "En situation sensible, moins mais mieux.",
    targetRoles: ["maire", "adjoint"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["exposition"],
    useCases: ["crise"],
    tags: ["crise", "tension"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "crise-mediatique",
    title: "Gérer une crise médiatique",
    slug: "crise-mediatique",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Limiter les dégâts et reprendre la main dans une crise médiatique.",
    intro: "Une crise médiatique amplifie tout : erreurs, tensions, contradictions. Elle impose un rythme qui n'est pas celui de l'action publique. L'objectif n'est pas de tout contrôler, mais de garder un cap.",
    understand: [
      "Une crise médiatique déforme la réalité.",
      "Le silence total est rarement viable.",
      "La cohérence est plus importante que la perfection."
    ],
    commonTrap: "Changer de position sous pression.",
    actions: [
      "Définir une ligne claire.",
      "Limiter les porte-parole.",
      "Répéter le message."
    ],
    reflex: "En crise, la cohérence protège.",
    targetRoles: ["maire", "adjoint"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["confirme"],
    diagnosticProfiles: ["exposition"],
    useCases: ["crise"],
    tags: ["média", "crise"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "situation-echappe",
    title: "Quand une situation t'échappe",
    slug: "situation-echappe",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Reprendre la main quand tu perds le contrôle.",
    intro: "Certaines situations échappent : conflit, polémique, projet qui dérape. L'enjeu n'est pas de tout reprendre immédiatement, mais de stabiliser.",
    understand: [
      "Perdre le contrôle est normal.",
      "La panique aggrave la situation.",
      "Reprendre la main prend du temps."
    ],
    commonTrap: "Vouloir tout régler immédiatement.",
    actions: [
      "Stabiliser la situation.",
      "Réduire les prises de parole.",
      "Reprendre progressivement le contrôle."
    ],
    reflex: "D'abord stabiliser, ensuite agir.",
    targetRoles: ["maire", "adjoint"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["exposition", "tension_relationnelle"],
    useCases: ["crise"],
    tags: ["crise"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 8 (suite) : DISCOURS & REGISTRES ────────────────────────────────

  {
    id: "les-3-types-de-discours-elu",
    title: "Les 3 types de discours : ne pas parler au mauvais endroit",
    slug: "les-3-types-de-discours-elu",
    pillar: "agir",
    format: "guide",
    promise: "Adapter son discours au bon registre pour être juste, crédible et efficace.",
    intro: "Tous les discours d'élu ne se valent pas. Le problème n'est pas de mal parler, mais de parler dans le mauvais registre. Un discours politique dans une cérémonie peut paraître déplacé. Un discours institutionnel face à des habitants peut sembler froid. Savoir identifier le bon type de discours est une compétence clé du mandat.",
    understand: [
      "Il existe trois grands types de discours : institutionnel, politique et relationnel.",
      "Chaque type répond à un objectif différent : représenter, positionner, relier.",
      "Le mauvais registre crée immédiatement un décalage avec le public."
    ],
    commonTrap: "Utiliser le même ton et la même structure dans toutes les situations.",
    actions: [
      "Identifier le contexte avant d'écrire : cérémonie, débat ou rencontre habitants.",
      "Clarifier l'objectif : représenter la fonction, prendre position, ou créer du lien.",
      "Adapter ton ton, ton niveau de langage et ta structure en conséquence."
    ],
    reflex: "Avant de parler, demande-toi : je suis dans quel type de discours — institutionnel, politique ou relationnel ?",
    sensitiveNote: "Les trois registres peuvent coexister dans un même événement. L'erreur fréquente est de glisser d'un registre à l'autre sans s'en rendre compte.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "conseiller_paris"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["prise_de_parole", "exposition"],
    useCases: [
      "Préparer un discours de cérémonie (hommage, inauguration, vœux)",
      "Prendre position publiquement sans être perçu comme hors-sujet",
      "Parler à des habitants sans créer de distance"
    ],
    tags: ["discours", "communication politique", "cérémonie", "prise de parole", "registre", "hommage", "allocution"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "ecrire-discours-elu",
    title: "Écrire un discours : dire juste, dire clair, dire utile",
    slug: "ecrire-discours-elu",
    pillar: "agir",
    format: "guide",
    promise: "Construire un discours politique clair, incarné et adapté au contexte.",
    intro: "Un discours d'élu n'est pas un texte littéraire ni un rapport administratif. Il sert à poser une position, créer du lien et donner du sens. Trop long, trop flou ou trop technique, il perd immédiatement son effet.",
    understand: [
      "Un discours sert à faire passer un message, pas à tout dire.",
      "Le public retient peu de choses : l'essentiel doit être clair.",
      "Le ton compte autant que le contenu."
    ],
    commonTrap: "Vouloir tout dire et produire un discours long et confus.",
    actions: [
      "Définir un message principal (une idée forte).",
      "Structurer en 3 parties simples : contexte / message / ouverture.",
      "Écrire pour être dit à voix haute, pas pour être lu."
    ],
    reflex: "Un bon discours tient en une idée forte.",
    sensitiveNote: "Un discours mal calibré peut créer un décalage avec le public ou être mal interprété politiquement.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "conseiller_paris"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["prise_de_parole"],
    useCases: [
      "Écrire un discours de vœux ou d'inauguration",
      "Préparer une allocution politique sans être confus",
      "Structurer une prise de position publique"
    ],
    tags: ["discours", "prise de parole", "communication", "allocution", "rédaction"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "protocole-elu-les-bases",
    title: "Le protocole : comprendre les règles sans se crisper",
    slug: "protocole-elu-les-bases",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Maîtriser les bases du protocole pour éviter les faux pas et rester à l'aise.",
    intro: "Le protocole peut sembler formel ou secondaire, mais il structure les relations entre élus, institutions et partenaires. Mal maîtrisé, il peut créer des tensions inutiles. Bien compris, il permet de se positionner correctement sans rigidité.",
    understand: [
      "Le protocole organise la place de chacun : ordre des prises de parole, préséance, invitations.",
      "Il est particulièrement important lors des événements publics, cérémonies et rencontres officielles.",
      "Il ne s'agit pas de rigidité, mais de respect des fonctions et des institutions."
    ],
    commonTrap: "Ignorer le protocole ou le considérer comme secondaire.",
    actions: [
      "Vérifier l'ordre protocolaire avant un événement (qui parle, dans quel ordre).",
      "S'appuyer sur les services (cabinet, communication, protocole).",
      "Observer et s'adapter plutôt que vouloir imposer."
    ],
    reflex: "Le protocole évite les malaises invisibles.",
    sensitiveNote: "Un faux pas protocolaire peut être interprété comme un manque de respect institutionnel, même s'il est involontaire.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "conseiller_paris"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent", "exposition"],
    useCases: [
      "Préparer une cérémonie officielle",
      "Comprendre l'ordre protocolaire lors d'un événement",
      "Éviter les faux pas lors d'une représentation institutionnelle"
    ],
    tags: ["protocole", "cérémonie", "représentation", "préséance", "événement"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  // ── LOT 9 : RELATION HABITANTS & RISQUES / ÉTHIQUE ────────────────────────

  {
    id: "tenir-permanence-elu",
    title: "Tenir une permanence d'élu : écouter sans promettre",
    slug: "tenir-permanence-elu",
    pillar: "agir",
    format: "fiche",
    promise: "Gérer une permanence efficacement sans s'engager au-delà de ses capacités.",
    intro: "La permanence d'élu est un moment clé du mandat : contact direct avec les habitants, remontée des problèmes, attentes fortes. Mais c'est aussi un espace à risque, où la pression individuelle peut pousser à promettre trop vite ou à s'engager sur des sujets hors de portée.",
    understand: [
      "Une permanence sert à écouter, orienter et clarifier, pas à tout résoudre.",
      "Beaucoup de demandes relèvent d'autres institutions ou de procédures encadrées.",
      "L'élu est souvent perçu comme capable d'agir sur tout, ce qui crée un décalage avec la réalité."
    ],
    commonTrap: "Dire oui pour apaiser la situation, sans vérifier la faisabilité.",
    actions: [
      "Clarifier dès le départ ton rôle et tes limites.",
      "Reformuler la demande pour vérifier la compréhension.",
      "Orienter vers le bon service ou dispositif."
    ],
    reflex: "Écouter ne veut pas dire promettre.",
    sensitiveNote: "Une promesse non tenue fragilise durablement la relation avec l'habitant et peut se retourner politiquement.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "conseiller_arrondissement"],
    institutionContexts: ["commune", "paris", "plm"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["mandat_recent", "exposition"],
    useCases: ["habitants", "relation"],
    tags: ["permanence", "habitants", "écoute"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "demande-logement-elu",
    title: "Demande de logement : ce que tu peux faire (et ne pas faire)",
    slug: "demande-logement-elu",
    pillar: "agir",
    format: "fiche",
    promise: "Répondre à une demande de logement sans créer de faux espoirs ni prendre de risques.",
    intro: "Les demandes de logement sont parmi les plus sensibles en permanence. Elles mêlent urgence sociale, attente forte et sentiment d'injustice. L'élu est souvent perçu comme décisionnaire, alors que les attributions sont encadrées par des règles strictes.",
    understand: [
      "L'attribution des logements est encadrée par des procédures et des commissions.",
      "L'élu peut orienter, appuyer, suivre, mais ne décide pas seul.",
      "Les situations individuelles sont souvent complexes et déjà connues des services."
    ],
    commonTrap: "Laisser entendre qu'on peut obtenir un logement rapidement.",
    actions: [
      "Expliquer clairement le fonctionnement des attributions.",
      "Vérifier la situation administrative du demandeur.",
      "Orienter vers les services compétents et suivre si nécessaire."
    ],
    reflex: "Tu peux accompagner, pas attribuer.",
    sensitiveNote: "Toute intervention perçue comme un favoritisme expose à des risques juridiques et politiques.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["debutant", "intermediaire"],
    diagnosticProfiles: ["exposition", "tension_relationnelle"],
    useCases: ["habitants", "logement"],
    tags: ["logement", "demande", "social"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "conflit-dinteret-elu",
    title: "Conflit d'intérêts : identifier et éviter les situations à risque",
    slug: "conflit-dinteret-elu",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Reconnaître un conflit d'intérêts et adopter la bonne posture.",
    intro: "Le conflit d'intérêts ne suppose pas une faute. Il apparaît dès qu'un intérêt personnel peut interférer avec l'exercice impartial du mandat. Ce sont des situations fréquentes, souvent mal identifiées, mais potentiellement très exposantes.",
    understand: [
      "Le conflit d'intérêts peut être réel, potentiel ou apparent.",
      "Il ne dépend pas seulement de l'intention, mais de la situation.",
      "La perception extérieure compte autant que la réalité."
    ],
    commonTrap: "Penser qu'il n'y a pas de problème tant qu'il n'y a pas d'intention frauduleuse.",
    actions: [
      "Identifier les situations à risque en amont.",
      "Se déporter des décisions concernées.",
      "Demander conseil en cas de doute."
    ],
    reflex: "Le doute suffit à créer un risque.",
    sensitiveNote: "Un conflit d'intérêts mal géré peut entraîner des conséquences juridiques, politiques et médiatiques.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal", "interco"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["exposition", "gouvernance"],
    useCases: ["ethique", "decision"],
    tags: ["conflit d'intérêt", "éthique"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "favoritisme-corruption-elu",
    title: "Favoritisme, corruption : où sont les lignes rouges",
    slug: "favoritisme-corruption-elu",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Identifier les comportements à risque et éviter les dérives.",
    intro: "Dans l'exercice d'un mandat, certaines situations peuvent rapidement devenir risquées : attribution de subventions, marchés publics, demandes individuelles. Même sans intention frauduleuse, des pratiques peuvent être qualifiées de favoritisme ou exposer à des soupçons.",
    understand: [
      "Le favoritisme concerne l'attribution injustifiée d'un avantage.",
      "Les règles sont strictes sur les marchés publics et les subventions.",
      "Le risque est autant juridique que réputationnel."
    ],
    commonTrap: "Rendre service sans mesurer les conséquences.",
    actions: [
      "Respecter les procédures et les règles formelles.",
      "Éviter toute intervention informelle dans un processus encadré.",
      "Tracer les décisions et échanges importants."
    ],
    reflex: "Ce qui n'est pas traçable devient risqué.",
    sensitiveNote: "Les infractions liées au favoritisme et à la corruption sont pénalement sanctionnées et fortement médiatisées.",
    targetRoles: ["maire", "adjoint", "interco"],
    institutionContexts: ["commune", "paris", "intercommunalite"],
    experienceLevels: ["intermediaire", "confirme"],
    diagnosticProfiles: ["exposition"],
    useCases: ["ethique"],
    tags: ["corruption", "favoritisme"],
    ctaType: "copilote",
    irlPotential: true,
    priority: "haute"
  },

  {
    id: "refuser-service-sensible",
    title: "Refuser une demande sans créer de conflit",
    slug: "refuser-service-sensible",
    pillar: "se_proteger",
    format: "fiche",
    promise: "Dire non clairement sans abîmer la relation.",
    intro: "Certaines demandes mettent l'élu en difficulté : pressions, attentes fortes, situations personnelles. Dire oui expose, dire non peut créer du conflit. L'enjeu est de refuser de manière claire et justifiée.",
    understand: [
      "Refuser fait partie du mandat.",
      "Le refus peut être accepté s'il est expliqué.",
      "La clarté protège plus que l'ambiguïté."
    ],
    commonTrap: "Dire oui pour éviter un malaise.",
    actions: [
      "Expliquer les règles et contraintes.",
      "Proposer une alternative si possible.",
      "Assumer le refus sans ambiguïté."
    ],
    reflex: "Un non clair vaut mieux qu'un oui fragile.",
    targetRoles: ["maire", "adjoint", "conseiller_municipal"],
    institutionContexts: ["commune", "paris"],
    experienceLevels: ["intermediaire"],
    diagnosticProfiles: ["tension_relationnelle"],
    useCases: ["relation"],
    tags: ["refus", "demande"],
    ctaType: "copilote",
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
