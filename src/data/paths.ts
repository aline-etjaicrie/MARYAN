import type { MaryanPath, DiagnosticProfile } from './types';

export const maryanPaths: MaryanPath[] = [
  {
    id: "prise-de-fonction",
    title: "Prendre sa place dans le mandat",
    slug: "prise-de-fonction",
    promise: "Aider un élu ou une élue à trouver ses repères sans se disperser ni surjouer la fonction.",
    description:
      "Ce parcours est conçu pour les débuts de mandat, les changements de rôle ou les moments où la fonction est là, mais la posture pas encore complètement installée. Il aide à clarifier sa place, comprendre les rôles autour de soi et prendre ses marques sans se crisper.",
    diagnosticProfiles: ["mandat_recent", "isolement"],
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire"],
    priorities: [
      "Trouver sa place sans se disperser",
      "Comprendre les rôles autour de soi",
      "Installer une posture juste dans le mandat"
    ],
    resourceIds: [
      "trouver-sa-place-dans-le-mandat",
      "quand-on-a-le-mandat-mais-pas-encore-la-posture",
      "elus-administration-qui-fait-quoi"
    ],
    ctaType: "formation_irl",
    irlPotential: true
  },
  {
    id: "arbitrer-avec-plus-de-recul",
    title: "Arbitrer avec plus de recul",
    slug: "arbitrer-avec-plus-de-recul",
    promise: "Retrouver un cadre pour décider sans laisser l’urgence ou la pression imposer le choix.",
    description:
      "Ce parcours aide à clarifier les options, remettre de l’ordre dans le dossier et retrouver une manière plus lisible de trancher. Il est particulièrement utile quand tout semble urgent, flou ou exposé.",
    diagnosticProfiles: ["arbitrage", "besoin_methode", "exposition"],
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    priorities: [
      "Remettre du cadre dans la décision",
      "Distinguer urgence et arbitrage réel",
      "Sécuriser la manière de trancher"
    ],
    resourceIds: [
      "arbitrer-une-decision-sensible",
      "cadrer-un-dossier-avant-qu-il-ne-t-echappe",
      "prioriser-quand-tout-semble-urgent"
    ],
    ctaType: "offre_individuelle",
    irlPotential: true
  },
  {
    id: "tenir-dans-une-situation-sensible",
    title: "Tenir dans une situation sensible",
    slug: "tenir-dans-une-situation-sensible",
    promise: "Aider à répondre avec justesse quand la pression monte.",
    description:
      "Ce parcours est utile quand une situation devient exposée, tendue ou fragile. Il aide à éviter les réactions trop rapides, à préparer une parole sobre et à tenir une ligne sans s’abîmer inutilement.",
    diagnosticProfiles: ["exposition", "prise_de_parole", "tension_relationnelle"],
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    priorities: [
      "Répondre sans sur-réagir",
      "Tenir une position lisible",
      "Protéger la relation et la clarté"
    ],
    resourceIds: [
      "repondre-a-une-situation-sensible-sans-sur-reagir",
      "preparer-une-prise-de-parole-delicate",
      "se-positionner-sans-se-griller"
    ],
    ctaType: "offre_individuelle",
    irlPotential: true
  },
  {
    id: "mieux-travailler-avec-ladministration",
    title: "Mieux travailler avec l’administration",
    slug: "mieux-travailler-avec-ladministration",
    promise: "Clarifier les rôles, éviter les malentendus et rendre les relations plus fluides.",
    description:
      "Ce parcours aide à mieux comprendre le rôle des services, les circuits de décision et les zones classiques de malentendu entre logique politique et logique administrative.",
    diagnosticProfiles: ["gouvernance", "besoin_methode", "tension_relationnelle"],
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    priorities: [
      "Clarifier les rôles respectifs",
      "Comprendre où se prennent les décisions",
      "Réduire les tensions inutiles"
    ],
    resourceIds: [
      "elus-administration-qui-fait-quoi",
      "comment-se-prend-une-decision-dans-une-commune",
      "qui-decide-quoi-dans-la-collectivite"
    ],
    ctaType: "formation_irl",
    irlPotential: true
  },
  {
    id: "retrouver-de-la-clarte-dans-la-surcharge",
    title: "Retrouver de la clarté dans la surcharge",
    slug: "retrouver-de-la-clarte-dans-la-surcharge",
    promise: "Aider à reprendre la main quand tout semble urgent, dispersé ou trop pesant.",
    description:
      "Ce parcours est utile quand le problème principal n’est pas un seul dossier, mais l’impression de devoir tout gérer en même temps. Il aide à remettre de l’ordre, du rythme et du discernement.",
    diagnosticProfiles: ["surcharge", "isolement", "exposition"],
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    priorities: [
      "Sortir de la dispersion",
      "Retrouver du recul",
      "Réinstaller un ordre de priorités"
    ],
    resourceIds: [
      "prioriser-quand-tout-semble-urgent",
      "gerer-la-fatigue-decisionnelle",
      "se-rendre-utile-sans-se-disperser"
    ],
    ctaType: "offre_individuelle",
    irlPotential: true
  },
  {
    id: "gouvernance-et-tensions-internes",
    title: "Gouvernance et tensions internes",
    slug: "gouvernance-et-tensions-internes",
    promise: "Mieux lire les tensions d’équipe avant qu’elles ne s’enkystent ou se personnalisent.",
    description:
      "Ce parcours aide à repérer ce qui relève du fond, de la méthode ou de la relation dans les tensions internes. Il est utile quand la majorité, l’exécutif ou les relations de travail commencent à se durcir.",
    diagnosticProfiles: ["gouvernance", "tension_relationnelle", "exposition"],
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    priorities: [
      "Nommer la vraie nature de la tension",
      "Éviter la personnalisation du conflit",
      "Recréer un cadre de travail plus stable"
    ],
    resourceIds: [
      "gerer-une-tension-dans-la-majorite-ou-l-executif",
      "dire-non-sans-casser-la-relation",
      "elus-administration-qui-fait-quoi"
    ],
    ctaType: "formation_irl",
    irlPotential: true
  },
  {
    id: "mieux-se-positionner-publiquement",
    title: "Mieux se positionner publiquement",
    slug: "mieux-se-positionner-publiquement",
    promise: "Tenir une ligne lisible et sobre dans des moments où la parole et le tempo comptent beaucoup.",
    description:
      "Ce parcours s’adresse aux élu·es qui doivent prendre position, répondre à une séquence publique ou porter une décision sans se crisper ni s’exposer inutilement.",
    diagnosticProfiles: ["prise_de_parole", "exposition"],
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["intermediaire", "confirme"],
    priorities: [
      "Trouver la bonne ligne",
      "Préparer une parole juste",
      "Éviter les erreurs de ton ou de tempo"
    ],
    resourceIds: [
      "se-positionner-sans-se-griller",
      "preparer-une-prise-de-parole-delicate",
      "eviter-les-erreurs-politiques-evitables"
    ],
    ctaType: "offre_individuelle",
    irlPotential: true
  },
  {
    id: "mieux-comprendre-les-fondamentaux-locaux",
    title: "Mieux comprendre les fondamentaux locaux",
    slug: "mieux-comprendre-les-fondamentaux-locaux",
    promise: "Donner les repères de base pour comprendre comment fonctionne vraiment une collectivité.",
    description:
      "Ce parcours convient bien aux élu·es qui veulent gagner vite en lisibilité sur les circuits de décision, les responsabilités et les grandes logiques de fonctionnement local.",
    diagnosticProfiles: ["mandat_recent", "besoin_methode"],
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire"],
    priorities: [
      "Comprendre les circuits de décision",
      "Clarifier qui décide quoi",
      "Lire le fonctionnement local sans jargon"
    ],
    resourceIds: [
      "comment-se-prend-une-decision-dans-une-commune",
      "qui-decide-quoi-dans-la-collectivite",
      "le-conseil-municipal-a-quoi-il-sert-vraiment"
    ],
    ctaType: "copilote",
    irlPotential: true
  },
  {
    id: "tenir-la-proximite-sans-s-epuiser",
    title: "Tenir la proximité sans s’épuiser",
    slug: "tenir-la-proximite-sans-s-epuiser",
    promise: "Aider à rester proche, accessible et humain sans devenir poreux à toutes les sollicitations.",
    description:
      "Ce parcours est utile quand la proximité devient pesante, que les demandes s’accumulent et que l’élu·e sent qu’il ou elle absorbe trop sans réussir à poser un cadre tenable.",
    diagnosticProfiles: ["surcharge", "isolement", "exposition"],
    targetRoles: ["maire", "adjoint", "majorite", "opposition"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    priorities: [
      "Poser des limites sans se fermer",
      "Préserver son énergie",
      "Rester proche sans se dissoudre"
    ],
    resourceIds: [
      "etre-proche-sans-devenir-poreux-a-tout",
      "dire-non-sans-casser-la-relation",
      "gerer-la-fatigue-decisionnelle"
    ],
    ctaType: "offre_individuelle",
    irlPotential: true
  },
  {
    id: "mieux-lire-les-arbitrages-budgetaires",
    title: "Mieux lire les arbitrages budgétaires",
    slug: "mieux-lire-les-arbitrages-budgetaires",
    promise: "Aider à comprendre les choix derrière les chiffres et à poser de meilleures questions.",
    description:
      "Ce parcours s’adresse aux élu·es qui veulent mieux lire un budget, comprendre les marges de manœuvre et articuler choix financiers et priorités politiques.",
    diagnosticProfiles: ["besoin_methode", "arbitrage"],
    targetRoles: ["maire", "adjoint", "majorite", "opposition", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    priorities: [
      "Comprendre les grands équilibres",
      "Identifier les marges réelles",
      "Relier budget et priorités politiques"
    ],
    resourceIds: [
      "lire-un-budget-local-sans-etre-specialiste",
      "qui-decide-quoi-dans-la-collectivite",
      "comment-se-prend-une-decision-dans-une-commune"
    ],
    ctaType: "formation_irl",
    irlPotential: true
  },
  {
    id: "mieux-conduire-une-demarche-participative",
    title: "Mieux conduire une démarche participative",
    slug: "mieux-conduire-une-demarche-participative",
    promise: "Clarifier le cadre, éviter les faux accords et rendre la participation plus lisible et plus utile.",
    description:
      "Ce parcours aide à préparer une démarche participative sans confusion sur le niveau d’ouverture, à mieux tenir une réunion publique, et à rendre compte ensuite de ce qui a été entendu et transformé. Il est utile pour les sujets locaux sensibles, les projets exposés ou les démarches de concertation encore floues.",
    diagnosticProfiles: ["gouvernance", "tension_relationnelle", "besoin_methode", "exposition"],
    targetRoles: ["maire", "adjoint", "majorite", "interco"],
    experienceLevels: ["debutant", "intermediaire", "confirme"],
    priorities: [
      "Clarifier ce qui est réellement ouvert à discussion",
      "Choisir le bon niveau de participation et le bon vocabulaire",
      "Rendre la suite de la démarche lisible pour les habitants"
    ],
    resourceIds: [
      "avant-dorganiser-une-reunion-participative-qu-est-ce-qui-est-vraiment-ouvert",
      "concertation-consultation-information-co-construction-ne-pas-tout-confondre",
      "que-faire-des-contributions-apres-une-demarche-participative"
    ],
    ctaType: "formation_irl",
    irlPotential: true
  }
];

export function getRecommendedPaths(
  paths: MaryanPath[],
  profile: DiagnosticProfile,
  limit = 1
) {
  return paths
    .filter((p) => p.diagnosticProfiles.includes(profile))
    .slice(0, limit);
}
