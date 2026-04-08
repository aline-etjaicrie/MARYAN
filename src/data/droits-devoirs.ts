// src/data/droits-devoirs.ts
// Fiches "Droits & devoirs" issues de la Charte de l'élu local
// et des articles L.2123-1 à L.2123-35 du CGCT

export interface FicheDroit {
  slug: string;
  titre: string;
  accroche: string;
  pilier: 'ethique' | 'travail' | 'formation' | 'indemnite' | 'protection';
  niveau: 'debutant' | 'tous';
  sections: {
    titre: string;
    contenu: string;
  }[];
  encadre_pratique?: string;
  source_juridique: {
    reference: string;
    texte: string;
  };
  mots_cles: string[];
}

export const fichesDroitsDevoirs: FicheDroit[] = [

  // ── ÉTHIQUE ─────────────────────────────────────────────────────────────────

  {
    slug: 'charte-elu-principes',
    titre: 'La Charte de l\'élu local : ce que vous vous engagez à respecter',
    accroche: 'Dès votre première réunion de conseil, le maire vous remet la Charte de l\'élu local. Ce n\'est pas une formalité. C\'est le cadre éthique de tout votre mandat.',
    pilier: 'ethique',
    niveau: 'debutant',
    sections: [
      {
        titre: 'Ce que dit concrètement la charte',
        contenu: `La charte pose 14 engagements. Les plus importants à retenir dès le début de mandat :

**Impartialité et intérêt général.** Vous exercez vos fonctions dans l'intérêt de tous — pas de votre famille, de vos amis, de vos partenaires professionnels. Si vous avez un intérêt personnel dans un dossier, vous devez le dire avant le débat et ne pas voter.

**Probité et dignité.** Vous n'utilisez pas les moyens de la commune (voiture, matériel, personnel) à des fins personnelles.

**Assiduité.** Vous participez aux réunions du conseil et des commissions dont vous êtes membre.

**Transparence.** Tout don, avantage ou invitation d'une valeur supérieure à 150 € doit être déclaré dans un registre tenu par la collectivité.

**Redevabilité.** Vous rendez compte de vos actes et décisions devant les citoyens qui vous ont élu.`
      },
      {
        titre: 'Ce que ça veut dire en pratique',
        contenu: `Un voisin vous demande un passe-droit pour un permis de construire → vous refusez et, si le dossier passe en conseil, vous vous déclarez en conflit d'intérêts.

Une entreprise vous offre un dîner à 200 € lors d'un salon → vous le déclarez dans le registre.

Vous manquez régulièrement les réunions sans motif → c'est un manquement à la charte, et votre indemnité peut être réduite.`
      },
      {
        titre: 'Le référent déontologue',
        contenu: `Vous avez le droit de consulter un référent déontologue si vous avez un doute sur une situation. Ce n'est pas un aveu de faiblesse — c'est exactement ce pour quoi ce dispositif existe. Demandez à votre DGS comment y accéder dans votre département.`
      }
    ],
    encadre_pratique: 'Si vous n\'êtes pas sûr qu\'une situation crée un conflit d\'intérêts, posez-vous cette question : "Si les habitants le savaient, est-ce qu\'ils trouveraient ça normal ?" Si la réponse est non ou hésitante — déclarez.',
    source_juridique: {
      reference: 'Article L.1111-12 et L.1111-13 du CGCT — Charte de l\'élu local',
      texte: 'L\'élu local exerce ses fonctions avec impartialité, diligence, dignité, probité et intégrité. Dans ce cadre, il poursuit le seul intérêt général, à l\'exclusion de tout intérêt qui lui soit personnel, directement ou indirectement, ou de tout autre intérêt particulier. (Article 2 de la Charte)'
    },
    mots_cles: ['charte', 'éthique', 'conflit d\'intérêts', 'probité', 'déontologie', 'référent déontologue']
  },

  {
    slug: 'conflit-interets',
    titre: 'Conflit d\'intérêts : comment le reconnaître et quoi faire',
    accroche: 'Un conflit d\'intérêts, ce n\'est pas forcément de la corruption. C\'est simplement une situation où vos intérêts personnels pourraient — même involontairement — influencer une décision publique.',
    pilier: 'ethique',
    niveau: 'tous',
    sections: [
      {
        titre: 'Qu\'est-ce qu\'un conflit d\'intérêts ?',
        contenu: `Un conflit d'intérêts existe quand vous avez un intérêt **personnel, direct ou indirect** dans une affaire soumise au conseil ou à une instance dont vous faites partie.

Exemples concrets :
- Un marché public attribué à l'entreprise de votre conjoint
- Un permis de construire qui concerne votre parcelle ou celle d'un proche
- Une subvention demandée par une association dont vous êtes membre du bureau
- Un recrutement où vous connaissez personnellement un candidat`
      },
      {
        titre: 'Ce que vous devez faire',
        contenu: `**Avant le débat :** déclarez votre intérêt. Dites-le à voix haute, en séance. C'est noté au procès-verbal.

**Pendant le débat :** ne prenez pas part à la discussion.

**Au moment du vote :** quittez la salle. Vous ne votez pas.

Ce n'est pas une sanction. C'est une procédure de protection — pour vous autant que pour la décision.`
      },
      {
        titre: 'Ce qui se passe si vous ne le faites pas',
        contenu: `La décision peut être annulée. Vous pouvez être poursuivi pour prise illégale d'intérêts — même si vous n'avez rien gagné personnellement. La jurisprudence est sévère sur ce point : l'intention de se favoriser n'est pas nécessaire pour que l'infraction soit constituée.`
      }
    ],
    encadre_pratique: 'En cas de doute, déclarez. Il n\'y a aucun inconvénient à déclarer un conflit d\'intérêts qui n\'en est pas un. Il y a des conséquences graves à ne pas déclarer celui qui en est un.',
    source_juridique: {
      reference: 'Article 3 de la Charte de l\'élu local — Articles L.1111-13 du CGCT — Article 432-12 du Code pénal (prise illégale d\'intérêts)',
      texte: 'L\'élu local veille à prévenir ou à faire cesser immédiatement tout conflit d\'intérêts réprimé par la loi. Lorsque ses intérêts personnels sont en cause dans les affaires soumises à l\'organe délibérant dont il est membre, l\'élu local s\'engage à les faire connaître avant le débat et le vote.'
    },
    mots_cles: ['conflit d\'intérêts', 'prise illégale d\'intérêts', 'déport', 'vote', 'séance', 'procès-verbal']
  },

  // ── TRAVAIL ─────────────────────────────────────────────────────────────────

  {
    slug: 'absences-autorisees-travail',
    titre: 'Votre employeur doit vous laisser partir pour vos réunions',
    accroche: 'Si vous êtes salarié, votre employeur est légalement obligé de vous accorder le temps nécessaire pour exercer votre mandat. Ce n\'est pas une faveur — c\'est un droit.',
    pilier: 'travail',
    niveau: 'debutant',
    sections: [
      {
        titre: 'Pour quelles réunions ?',
        contenu: `Votre employeur doit vous laisser partir pour :

- Les séances plénières du conseil municipal
- Les réunions des commissions dont vous êtes membre (instituées par délibération)
- Les réunions des organismes où vous représentez la commune
- Les réunions organisées par l'intercommunalité quand vous y représentez votre commune

**Ce que vous devez faire :** prévenir votre employeur dès que vous connaissez la date. Il n'a pas à être prévenu des semaines à l'avance, mais le plus tôt est le mieux.`
      },
      {
        titre: 'Votre employeur est-il obligé de vous payer ces absences ?',
        contenu: `Non. La loi lui impose de vous laisser partir, pas de vous payer ce temps. C'est à la commune ou à l'organisme concerné de compenser éventuellement les pertes de revenu — dans certaines conditions.

Si vous ne percevez pas d'indemnité de fonction, la commune peut compenser vos pertes de revenu dans la limite de 100 heures par an et par élu, chaque heure ne pouvant pas dépasser deux fois le SMIC horaire.`
      },
      {
        titre: 'Protections importantes',
        contenu: `Ces absences **ne peuvent pas** :
- Être comptées comme du temps de travail non effectué
- Entraîner une modification de vos horaires sans votre accord
- Justifier un licenciement, une sanction disciplinaire ou un déclassement professionnel
- Être prises en compte pour l'embauche, la formation, l'avancement ou la rémunération

Si votre employeur fait l'une de ces choses : la décision est nulle et vous avez droit à des dommages et intérêts.`
      },
      {
        titre: 'L\'entretien annuel avec votre employeur',
        contenu: `Au début de votre mandat, puis une fois par an, vous pouvez demander un entretien avec votre employeur pour organiser concrètement la conciliation entre votre travail et votre mandat. C'est un droit. Utilisez-le pour anticiper plutôt que de gérer les conflits au cas par cas.`
      }
    ],
    encadre_pratique: 'Gardez une trace écrite de toutes vos demandes d\'absence et des réponses de votre employeur. En cas de conflit, c\'est votre première ligne de défense.',
    source_juridique: {
      reference: 'Articles L.2123-1, L.2123-7, L.2123-8 du CGCT',
      texte: 'L\'employeur est tenu de laisser à tout salarié de son entreprise membre d\'un conseil municipal le temps nécessaire pour se rendre et participer aux séances plénières de ce conseil, aux réunions de commissions dont il est membre et instituées par une délibération du conseil municipal. (Article L.2123-1 I)'
    },
    mots_cles: ['salarié', 'employeur', 'absence', 'séance', 'conseil municipal', 'protection', 'licenciement']
  },

  {
    slug: 'credit-heures',
    titre: 'Le crédit d\'heures : du temps pour préparer votre mandat',
    accroche: 'En plus des absences pour les réunions, vous avez droit à un crédit d\'heures trimestriel pour préparer votre mandat et administrer la commune. Son montant dépend de votre fonction et de la taille de votre commune.',
    pilier: 'travail',
    niveau: 'tous',
    sections: [
      {
        titre: 'Combien d\'heures par trimestre ?',
        contenu: `Le crédit est calculé par rapport à la durée légale du travail (35h/semaine).

**Maires :**
- Commune de moins de 10 000 habitants → 3,5 × 35h = **122,5h par trimestre**
- Commune de 10 000 habitants et plus → 4 × 35h = **140h par trimestre**

**Adjoints :**
- Commune de moins de 10 000 habitants → 2 × 35h = **70h par trimestre**
- Commune de 10 000 à 29 999 habitants → 3,5 × 35h = **122,5h par trimestre**
- Commune de 30 000 habitants et plus → 4 × 35h = **140h par trimestre**

**Conseillers municipaux :**
- Commune de moins de 3 500 habitants → 30% × 35h = **10,5h par trimestre**
- Commune de 3 500 à 9 999 habitants → 30% × 35h = **10,5h par trimestre**
- Commune de 10 000 à 29 999 habitants → 60% × 35h = **21h par trimestre**
- Commune de 30 000 à 99 999 habitants → 1 × 35h = **35h par trimestre**
- Commune de 100 000 habitants et plus → 2 × 35h = **70h par trimestre**`
      },
      {
        titre: 'Comment l\'utiliser ?',
        contenu: `Vous demandez à votre employeur l'autorisation d'utiliser ces heures. Il est **tenu de vous les accorder** — il ne peut pas refuser.

Il n'est **pas obligé de vous les payer**.

Les heures non utilisées dans un trimestre sont **perdues** : elles ne se reportent pas au trimestre suivant.

Si vous travaillez à temps partiel, votre crédit est réduit proportionnellement.`
      },
      {
        titre: 'À quoi ça sert concrètement ?',
        contenu: `Préparer les dossiers avant une séance. Lire les documents transmis par les services. Rencontrer des habitants sur un sujet en cours. Visiter un équipement communal. Travailler sur un projet de délibération.

C'est du temps pour exercer votre mandat sérieusement — pas seulement pour aller aux réunions.`
      }
    ],
    encadre_pratique: 'Planifiez l\'utilisation de votre crédit d\'heures en début de trimestre. Une fois les heures perdues, elles ne reviennent pas.',
    source_juridique: {
      reference: 'Article L.2123-2 du CGCT',
      texte: 'Indépendamment des autorisations d\'absence dont ils bénéficient dans les conditions prévues à l\'article L.2123-1, les maires, les adjoints et les conseillers municipaux ont droit à un crédit d\'heures leur permettant de disposer du temps nécessaire à l\'administration de la commune ou de l\'organisme auprès duquel ils la représentent et à la préparation des réunions des instances où ils siègent.'
    },
    mots_cles: ['crédit d\'heures', 'trimestre', 'employeur', 'temps', 'mandat', 'préparation', 'adjoint', 'conseiller']
  },

  // ── FORMATION ───────────────────────────────────────────────────────────────

  {
    slug: 'droit-formation-elu',
    titre: 'Votre droit à la formation : ce que vous pouvez demander',
    accroche: 'Être élu, ça s\'apprend. La loi vous reconnaît un droit à la formation dès le début de votre mandat. Et si vous avez reçu une délégation, une formation est obligatoire dans votre première année.',
    pilier: 'formation',
    niveau: 'debutant',
    sections: [
      {
        titre: 'Ce à quoi vous avez droit',
        contenu: `**Une formation adaptée à vos fonctions.** Le conseil municipal doit délibérer sur les orientations et les crédits formation dans les 3 mois suivant son renouvellement.

**Une formation obligatoire si vous avez une délégation.** Si le maire vous a délégué une compétence, une formation doit être organisée au cours de votre première année de mandat. C'est une obligation légale — pas une option.

**Un congé de formation de 24 jours** sur toute la durée de votre mandat (renouvelable si vous êtes réélu), en plus de vos absences et crédits d'heures habituels.

**Un droit individuel à la formation (DIF élu)**, comptabilisé en euros, cumulable sur la durée du mandat. Il est financé par une cotisation prélevée sur vos indemnités.`
      },
      {
        titre: 'Les formations peuvent-elles ne pas concerner le mandat ?',
        contenu: `Oui. Le DIF élu peut financer des formations **sans lien direct avec l'exercice du mandat** — notamment pour préparer votre réinsertion professionnelle après le mandat, si vous n'avez pas encore liquidé vos droits à pension.`
      },
      {
        titre: 'Qui paye ?',
        contenu: `Les frais de déplacement, de séjour et d'enseignement sont remboursés. Les pertes de revenu subies par les salariés sont compensées par la commune dans la limite de 21 jours par mandat, à hauteur de 1,5 fois le SMIC horaire par heure.

Le budget formation de la commune ne peut pas être inférieur à 2 % du total des indemnités de fonction des élus, ni supérieur à 20 % de ce même total.`
      },
      {
        titre: 'Attention : seuls les organismes agréés comptent',
        contenu: `La formation doit être dispensée par un organisme agréé par le ministère chargé des collectivités territoriales. Vérifiez l'agrément avant de vous inscrire — sinon, les dépenses ne seront pas remboursées.`
      }
    ],
    encadre_pratique: 'Dès le début de votre mandat, demandez à votre DGS quel est le budget formation du conseil, quelles formations sont prévues, et comment accéder à votre DIF élu. Ne laissez pas ces droits dormir.',
    source_juridique: {
      reference: 'Articles L.2123-12, L.2123-12-1, L.2123-13, L.2123-14 du CGCT',
      texte: 'Les membres d\'un conseil municipal ont droit à une formation adaptée à leurs fonctions. Une formation est obligatoirement organisée au cours de la première année de mandat pour les élus ayant reçu une délégation. (Article L.2123-12)'
    },
    mots_cles: ['formation', 'DIF élu', 'délégation', 'congé formation', 'agrément', 'budget formation', 'remboursement']
  },

  {
    slug: 'fin-mandat-reconversion',
    titre: 'Fin de mandat : vos droits pour rebondir',
    accroche: 'Quitter un mandat, surtout quand on y a consacré beaucoup de temps, peut déstabiliser une trajectoire professionnelle. La loi prévoit des dispositifs pour vous aider à rebondir.',
    pilier: 'formation',
    niveau: 'tous',
    sections: [
      {
        titre: 'Si vous avez arrêté de travailler pour votre mandat',
        contenu: `Si vous êtes maire ou adjoint et que vous avez **cessé votre activité professionnelle** pour exercer votre mandat, vous avez droit à plusieurs protections à la fin du mandat :

**Droit à la réintégration dans votre emploi** (ou un emploi équivalent) jusqu'à l'expiration de deux mandats consécutifs.

**Un stage de remise à niveau** dans votre ancienne entreprise, pour tenir compte de l'évolution de votre poste.

**Un bilan de compétences** et une **formation professionnelle** à votre demande.

**Une allocation différentielle de fin de mandat** si vous vous retrouvez sans emploi ou avec un revenu inférieur à vos anciennes indemnités. Elle est versée pendant 2 ans maximum (100 % la première année, 80 % à partir du 13e mois).`
      },
      {
        titre: 'La validation des acquis de l\'expérience (VAE)',
        contenu: `Tous les élus — pas seulement ceux qui ont arrêté de travailler — peuvent faire valider les compétences acquises pendant leur mandat via la VAE. Le temps passé en tant qu'élu est assimilé à une durée d'activité professionnelle pour accéder à ces dispositifs.

Gérer un budget, animer des réunions, conduire des projets, négocier, prendre des décisions sous pression : ce sont des compétences réelles, reconnues.`
      },
      {
        titre: 'Le contrat de sécurisation de l\'engagement',
        contenu: `Si vous bénéficiez de l'allocation différentielle de fin de mandat, France Travail vous propose un contrat de sécurisation de l'engagement — un parcours d'accompagnement vers le retour à l'emploi ou la reconversion, avec des phases de bilan et de formation.`
      }
    ],
    encadre_pratique: 'N\'attendez pas la fin du mandat pour y penser. Deux ans avant la fin de votre mandat, faites le point sur votre situation professionnelle et les dispositifs auxquels vous aurez droit.',
    source_juridique: {
      reference: 'Articles L.2123-9, L.2123-11, L.2123-11-1, L.2123-11-2, L.2123-11-3 du CGCT',
      texte: 'A l\'issue de son mandat, tout maire ou tout adjoint qui, pour l\'exercice de son mandat, a cessé son activité professionnelle salariée a droit sur sa demande à une formation professionnelle et à un bilan de compétences. (Article L.2123-11-1)'
    },
    mots_cles: ['fin de mandat', 'reconversion', 'allocation différentielle', 'VAE', 'réintégration', 'bilan de compétences', 'France Travail']
  },

  // ── INDEMNITÉ ───────────────────────────────────────────────────────────────

  {
    slug: 'indemnites-fonction',
    titre: 'Les indemnités de fonction : ce que vous pouvez percevoir',
    accroche: 'Les fonctions d\'élu sont gratuites en droit — mais la loi prévoit des indemnités pour compenser le temps consacré au mandat. Leur montant dépend de votre fonction et de la taille de votre commune.',
    pilier: 'indemnite',
    niveau: 'tous',
    sections: [
      {
        titre: 'Qui perçoit une indemnité ?',
        contenu: `Les **maires** perçoivent une indemnité automatiquement, fixée par la loi selon la population de la commune.

Les **adjoints** perçoivent une indemnité votée par le conseil municipal, dans les limites fixées par la loi.

Les **conseillers municipaux** peuvent percevoir une indemnité dans les communes de 100 000 habitants et plus (maximum 6 % de l'indice brut terminal de la fonction publique). Dans les communes plus petites, c'est possible mais limité.

Le conseil municipal délibère sur les indemnités dans les 3 mois suivant son installation.`
      },
      {
        titre: 'Les montants pour les maires (barème légal)',
        contenu: `Les indemnités sont calculées en pourcentage de l'indice brut terminal de la fonction publique :

- Moins de 500 habitants → 28,1 %
- 500 à 999 habitants → 44,3 %
- 1 000 à 3 499 habitants → 55,7 %
- 3 500 à 9 999 habitants → 58,3 %
- 10 000 à 19 999 habitants → 67,6 %
- 20 000 à 49 999 habitants → 90 %
- 50 000 à 99 999 habitants → 110 %
- 100 000 habitants et plus → 145 %

Ces montants peuvent être réduits par délibération à la demande du maire.`
      },
      {
        titre: 'Le plafond global',
        contenu: `Si vous cumulez plusieurs mandats ou fonctions, le total de vos indemnités ne peut pas dépasser 1,5 fois le montant de l'indemnité parlementaire. La part qui dépasse ce plafond est reversée au budget de la collectivité où vous exercez le mandat le plus récent.`
      },
      {
        titre: 'Indemnité et assiduité',
        contenu: `Votre règlement intérieur peut prévoir que l'indemnité soit modulée en fonction de votre participation effective aux séances et réunions. La réduction ne peut pas dépasser la moitié de l'indemnité.`
      }
    ],
    encadre_pratique: 'Vérifiez que le conseil municipal a bien délibéré sur les indemnités dans les 3 mois suivant son installation. Si ce n\'est pas fait, les indemnités des adjoints et conseillers ne peuvent pas être versées.',
    source_juridique: {
      reference: 'Articles L.2123-17, L.2123-20, L.2123-23, L.2123-24, L.2123-20-1 du CGCT',
      texte: 'Sans préjudice des dispositions du présent chapitre, les fonctions de maire, d\'adjoint et de conseiller municipal sont gratuites. (Article L.2123-17) — Les indemnités allouées au titre de l\'exercice des fonctions de maire sont fixées par référence au montant du traitement correspondant à l\'indice brut terminal de l\'échelle indiciaire de la fonction publique. (Article L.2123-20)'
    },
    mots_cles: ['indemnité', 'maire', 'adjoint', 'conseiller', 'barème', 'délibération', 'plafond', 'assiduité']
  },

  {
    slug: 'remboursements-frais',
    titre: 'Frais de déplacement, de garde, d\'urgence : ce qui peut être remboursé',
    accroche: 'Exercer un mandat coûte parfois de l\'argent — déplacements, garde d\'enfants, frais engagés en urgence. La loi prévoit des remboursements. Encore faut-il les demander.',
    pilier: 'indemnite',
    niveau: 'tous',
    sections: [
      {
        titre: 'Les frais de mandat spécial',
        contenu: `Quand le conseil vous confie une mission spéciale (négociation, représentation, déplacement au nom de la commune), les frais engagés peuvent être remboursés sur présentation d'un état de frais, après délibération du conseil municipal.

Les frais de transport sont remboursés selon des modalités fixées par délibération.`
      },
      {
        titre: 'Les frais de déplacement pour représenter la commune',
        contenu: `Si vous participez à des réunions **hors du territoire de votre commune** dans le cadre de votre mandat, vous avez droit au remboursement de vos frais de transport et de séjour.

Si vous êtes en situation de handicap, les frais spécifiques de déplacement et d'aide technique sont également remboursés, y compris pour les réunions qui ont lieu sur le territoire de la commune.`
      },
      {
        titre: 'Les frais de garde d\'enfants et d\'assistance',
        contenu: `Si votre participation à une réunion vous oblige à faire garder vos enfants ou à recourir à une assistance pour une personne âgée ou handicapée dont vous vous occupez, la commune peut vous rembourser ces frais.

Le remboursement ne peut pas dépasser le SMIC horaire par heure de garde.

Dans les communes de moins de 10 000 habitants, l'État compense ce remboursement à la commune.`
      },
      {
        titre: 'Les dépenses d\'urgence',
        contenu: `Si vous engagez des dépenses exceptionnelles d'assistance ou de secours sur vos deniers personnels en cas d'urgence (catastrophe, accident, situation de crise), vous pouvez être remboursé par la commune sur présentation d'un justificatif, après délibération du conseil.`
      }
    ],
    encadre_pratique: 'Gardez systématiquement vos justificatifs : billets de train, reçus de garde, notes de frais. Un remboursement demandé sans pièce justificative ne peut pas être accordé.',
    source_juridique: {
      reference: 'Articles L.2123-18, L.2123-18-1, L.2123-18-2, L.2123-18-3 du CGCT',
      texte: 'Les membres du conseil municipal bénéficient d\'un remboursement par la commune des frais de garde d\'enfants ou d\'assistance aux personnes âgées, handicapées ou ayant besoin d\'une aide personnelle à leur domicile qu\'ils ont engagés en raison de leur participation aux réunions mentionnées à l\'article L. 2123-1. (Article L.2123-18-2)'
    },
    mots_cles: ['remboursement', 'frais', 'déplacement', 'garde d\'enfants', 'mandat spécial', 'urgence', 'justificatif']
  },

  // ── PROTECTION ──────────────────────────────────────────────────────────────

  {
    slug: 'protection-juridique-elu',
    titre: 'Protection juridique : la commune doit vous défendre',
    accroche: 'En tant qu\'élu, vous pouvez faire l\'objet d\'attaques — violences, menaces, diffamations, ou poursuites pénales liées à vos fonctions. La loi oblige la commune à vous protéger. Voici comment.',
    pilier: 'protection',
    niveau: 'tous',
    sections: [
      {
        titre: 'Protection en cas de violences, menaces, outrages',
        contenu: `Si vous êtes victime de violences, menaces, injures, diffamations ou outrages **en raison de vos fonctions**, la commune est tenue de vous accorder sa protection et de réparer l'intégralité du préjudice subi.

Cette protection s'étend à votre conjoint, vos enfants et vos ascendants directs si eux aussi sont visés à cause de vos fonctions.

Elle peut être accordée même après la fin de votre mandat, si les faits sont liés à vos anciennes fonctions.`
      },
      {
        titre: 'Protection en cas de poursuites pénales',
        contenu: `Si vous êtes mis en cause pénalement pour des faits commis dans l'exercice de vos fonctions — et que ces faits ne constituent pas une faute personnelle détachable de vos fonctions — la commune est tenue de vous accorder sa protection.

Concrètement : la commune prend en charge le conseil juridique et l'assistance psychologique.

**Important :** la commune doit obligatoirement souscrire un contrat d'assurance couvrant cette protection. Dans les communes de moins de 10 000 habitants, l'État compense ce coût.`
      },
      {
        titre: 'Responsabilité pénale : quand vous pouvez être condamné',
        contenu: `Pour les faits non intentionnels commis dans l'exercice de vos fonctions, vous ne pouvez être condamné que si vous n'avez pas accompli les diligences normales compte tenu de vos compétences, de vos pouvoirs et des moyens dont vous disposiez.

Autrement dit : la loi tient compte de la réalité de votre situation. Un maire d'une petite commune avec peu de moyens n'est pas jugé avec les mêmes exigences qu'une grande collectivité dotée de services experts.`
      },
      {
        titre: 'Comment demander la protection ?',
        contenu: `Vous adressez une demande de protection au maire. Le maire adresse sa propre demande à un adjoint ou élu délégué. Le représentant de l'État dans le département doit être informé dans les 10 jours. La protection est effective à compter de la réception par la préfecture.

Le conseil municipal peut retirer cette protection par délibération motivée dans un délai de 4 mois.`
      }
    ],
    encadre_pratique: 'Si vous recevez des menaces ou êtes victime de violences en lien avec votre mandat, déposez plainte immédiatement et adressez dans la foulée une demande de protection à la mairie. Ne laissez pas passer.',
    source_juridique: {
      reference: 'Articles L.2123-34, L.2123-35 du CGCT',
      texte: 'La commune accorde sa protection au maire, aux autres membres du conseil municipal ou à l\'un de ces élus ayant cessé ses fonctions lorsqu\'ils sont victimes de violences, de menaces ou d\'outrages à l\'occasion ou du fait de leurs fonctions actuelles ou passées. Elle répare, le cas échéant, l\'intégralité du préjudice qui en a résulté. (Article L.2123-35)'
    },
    mots_cles: ['protection', 'violences', 'menaces', 'poursuites pénales', 'assurance', 'préfecture', 'responsabilité pénale']
  },

  {
    slug: 'securite-sociale-retraite-elu',
    titre: 'Sécurité sociale et retraite : votre couverture en tant qu\'élu',
    accroche: 'Votre mandat génère des droits sociaux : affiliation à la sécurité sociale, cotisations retraite, prise en charge des accidents survenus dans l\'exercice de vos fonctions.',
    pilier: 'protection',
    niveau: 'tous',
    sections: [
      {
        titre: 'Affiliation à la sécurité sociale',
        contenu: `Les élus municipaux sont affiliés au **régime général de la sécurité sociale** pour l'exercice de leur mandat. Les cotisations sont calculées sur le montant des indemnités effectivement perçues.

Si vous tombez malade ou avez un accident pendant votre mandat et que vous ne pouvez plus exercer vos fonctions, votre indemnité est réduite à la différence entre ce que vous perceviez et les indemnités journalières versées par votre régime de protection sociale.`
      },
      {
        titre: 'Accidents dans l\'exercice des fonctions',
        contenu: `La commune est responsable des dommages résultant des accidents subis par les élus dans l'exercice de leurs fonctions. Si vous êtes victime d'un accident, la commune règle directement les frais médicaux aux praticiens et établissements concernés, selon les tarifs de l'assurance maladie.`
      },
      {
        titre: 'Retraite',
        contenu: `Les élus qui perçoivent une indemnité de fonction peuvent cotiser à un régime de retraite par rente spécifique. La cotisation est partagée : moitié à la charge de l'élu, moitié à la charge de la commune.

Ils sont également affiliés au régime complémentaire de retraite des agents non titulaires des collectivités publiques.

Si vous êtes salarié, les crédits d'heures utilisés sont pris en compte dans le calcul de vos droits à l'assurance chômage.`
      }
    ],
    encadre_pratique: 'Vérifiez avec votre DGS ou le service RH de votre collectivité que vos cotisations sociales sont bien prélevées sur vos indemnités. Des erreurs administratives arrivent et peuvent avoir des conséquences sur vos droits futurs.',
    source_juridique: {
      reference: 'Articles L.2123-25-2, L.2123-27, L.2123-28, L.2123-31, L.2123-32 du CGCT',
      texte: 'Les communes sont responsables des dommages résultant des accidents subis par les maires et les autres membres du conseil municipal. (Article L.2123-31) — Les élus qui perçoivent une indemnité de fonction peuvent constituer une retraite par rente à la gestion de laquelle doivent participer les élus affiliés. La constitution de cette rente incombe pour moitié à l\'élu et pour moitié à la commune. (Article L.2123-27)'
    },
    mots_cles: ['sécurité sociale', 'retraite', 'accident', 'cotisation', 'indemnités journalières', 'régime général', 'chômage']
  }
];

// ── DONNÉES POUR LE PROMPT COPILOTE ─────────────────────────────────────────
// Ce bloc est injecté dans le système de prompt de Mistral
// pour que le Copilote puisse répondre aux questions sur les droits des élus

export const droitsElusPromptContext = `
## Droits et devoirs des élus municipaux (source : CGCT)

### Absences et crédit d'heures (L.2123-1, L.2123-2)
- L'employeur DOIT laisser partir tout salarié élu pour les séances du conseil, commissions, et réunions de représentation. Il n'est pas obligé de payer ce temps.
- Crédit d'heures trimestriel (en plus des absences) :
  * Maires < 10 000 hab : 122,5h/trimestre | Maires ≥ 10 000 hab : 140h/trimestre
  * Adjoints < 10 000 hab : 70h | 10 000-29 999 hab : 122,5h | ≥ 30 000 hab : 140h
  * Conseillers < 3 500 hab : 10,5h | 3 500-9 999 hab : 10,5h | 10 000-29 999 hab : 21h | 30 000-99 999 hab : 35h | ≥ 100 000 hab : 70h
- Heures non reportables d'un trimestre à l'autre
- Licenciement ou sanction pour ces absences = nul de plein droit + dommages et intérêts

### Protection (L.2123-34, L.2123-35)
- La commune DOIT protéger l'élu victime de violences, menaces, outrages liés à ses fonctions
- La commune DOIT prendre en charge la défense juridique si l'élu est poursuivi pour des faits non détachables de ses fonctions
- La commune doit souscrire une assurance couvrant cette protection
- Protection étendue au conjoint, enfants, ascendants directs si visés à cause des fonctions de l'élu

### Formation (L.2123-12, L.2123-12-1, L.2123-13)
- Droit à une formation adaptée aux fonctions pour tous les élus
- Formation OBLIGATOIRE la 1ère année pour les élus ayant reçu une délégation
- DIF élu : droit individuel à la formation comptabilisé en euros, cumulable sur le mandat
- Congé formation : 24 jours sur la durée du mandat (renouvelable)
- Budget formation communal : minimum 2 % et maximum 20 % du total des indemnités de fonction

### Indemnités (L.2123-17, L.2123-20, L.2123-23, L.2123-24)
- Fonctions d'élu : gratuites en droit, mais indemnités prévues par la loi
- Maires : indemnité automatique selon barème lié à la population (28,1 % à 145 % de l'indice brut terminal FP)
- Adjoints et conseillers : indemnités votées par le conseil municipal dans les 3 mois suivant l'installation
- Plafond global : 1,5 fois l'indemnité parlementaire pour cumul de mandats

### Fin de mandat (L.2123-9, L.2123-11-1, L.2123-11-2)
- Maires et adjoints ayant cessé leur activité pro : droit à réintégration, formation pro, bilan de compétences
- Allocation différentielle de fin de mandat : 2 ans max (100% puis 80% à partir du 13e mois)
- VAE possible pour valoriser les compétences acquises pendant le mandat

### Sécurité sociale et retraite (L.2123-25-2, L.2123-27, L.2123-31)
- Affiliation au régime général de la sécurité sociale
- Retraite par rente possible : moitié élu / moitié commune
- Accident dans l'exercice des fonctions : commune responsable, prise en charge directe des frais médicaux
`;
