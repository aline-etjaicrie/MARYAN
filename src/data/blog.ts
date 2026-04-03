export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string
  author: string;
  category: 'droits' | 'methode' | 'temoignage' | 'actualite' | 'outil';
  tags: string[];
  readingTime: number; // minutes
  published: boolean;
  excerpt: string;
  content: string; // Markdown-like HTML content
  metaTitle?: string;
  metaDescription?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'droits-elus-municipaux-ce-que-vous-devez-savoir',
    title: 'Droits des élus municipaux : ce que vous devez vraiment savoir',
    description: 'Formation, indemnités, protection fonctionnelle, droit à la formation — les droits statutaires des élus locaux sont souvent méconnus. Tour d\'horizon.',
    date: '2026-04-01',
    author: 'Équipe MARYAN',
    category: 'droits',
    tags: ['droits', 'statut', 'formation', 'indemnités', 'protection fonctionnelle'],
    readingTime: 6,
    published: true,
    excerpt: 'En tant qu\'élu·e municipal·e, vous disposez de droits précis — et souvent ignorés. Formation obligatoire, protection fonctionnelle, droit à la suspension d\'activité professionnelle. Voici ce que dit réellement le CGCT.',
    content: `
<h2>Des droits souvent ignorés</h2>
<p>Le Code général des collectivités territoriales (CGCT) garantit aux élus locaux un ensemble de droits destinés à leur permettre d'exercer leur mandat dans de bonnes conditions. Pourtant, une grande partie des élus — surtout en début de mandat — ne les connaît pas.</p>

<h2>Le droit à la formation</h2>
<p>Tout élu municipal dispose d'un droit à la formation, financé par la collectivité à hauteur d'un crédit annuel de 20 % de l'indemnité brute de fonction. Les formations doivent être dispensées par des organismes agréés par le ministère de l'Intérieur.</p>
<p><strong>À noter :</strong> ce droit est individuel. Le maire ne peut pas vous refuser l'accès à une formation agréée.</p>

<h2>La protection fonctionnelle</h2>
<p>Si vous êtes victime d'attaques, de diffamations ou de menaces dans le cadre de votre mandat, la commune est tenue de vous accorder sa protection. Cela couvre notamment les frais d'avocat en cas de mise en cause.</p>
<p>Ce droit s'applique aussi bien aux élus de la majorité qu'à ceux de l'opposition.</p>

<h2>Le droit à la suspension d'activité professionnelle</h2>
<p>Les élus exerçant une activité salariée peuvent suspendre leur contrat de travail pendant leur mandat pour les fonctions exécutives (maire, adjoint). Des dispositions existent pour faciliter la conciliation entre vie professionnelle et mandat.</p>

<h2>Les indemnités de fonction</h2>
<p>Les indemnités de fonction sont fixées par la loi selon la strate démographique de la commune. Elles ne sont pas automatiques pour tous les élus — les conseillers municipaux en perçoivent uniquement si la délibération du conseil le prévoit.</p>

<h2>Ce que MARYAN peut faire pour vous</h2>
<p>Le copilote MARYAN vous aide à comprendre vos droits précis selon votre situation, à préparer vos demandes, et à anticiper les tensions institutionnelles liées à leur exercice.</p>
    `,
    metaTitle: 'Droits des élus municipaux : formation, protection, indemnités | MARYAN',
    metaDescription: 'Tour d\'horizon complet des droits statutaires des élus locaux : formation, protection fonctionnelle, indemnités. Ce que dit le CGCT, expliqué clairement.'
  },
  {
    slug: 'premier-conseil-municipal-comment-se-preparer',
    title: 'Premier conseil municipal : comment se préparer efficacement',
    description: 'Vous participez à votre premier conseil municipal ? Voici comment lire l\'ordre du jour, prendre la parole, et ne pas vous retrouver dépassé.',
    date: '2026-03-28',
    author: 'Équipe MARYAN',
    category: 'methode',
    tags: ['conseil municipal', 'prise de parole', 'début de mandat', 'procédure'],
    readingTime: 5,
    published: true,
    excerpt: 'Le premier conseil municipal peut être intimidant. Comment lire l\'ordre du jour, quelle posture adopter, comment intervenir sans se tromper de registre ? Méthode pratique.',
    content: `
<h2>Avant le conseil : lire l'ordre du jour</h2>
<p>L'ordre du jour doit vous être transmis au moins 5 jours avant la séance (article L. 2121-12 du CGCT pour les communes de plus de 3 500 habitants). Lisez chaque point : un rapport, une délibération, un vote.</p>
<p>Pour chaque point, posez-vous : est-ce que je comprends ce qui est proposé ? Qui cela engage ? Pour combien de temps ?</p>

<h2>Pendant le conseil : trois postures possibles</h2>
<p><strong>L'observateur actif</strong> — vous écoutez, prenez des notes, comprenez comment fonctionne le groupe. Légitime en début de mandat.</p>
<p><strong>Le questionneur</strong> — vous demandez des clarifications sans prendre position. "Quelle est la durée d'engagement de cette délibération ?" Toujours acceptable.</p>
<p><strong>L'intervenant positionné</strong> — vous exprimez un point de vue, soutenez ou contestez. Cela engage. Préparez votre formulation à l'avance.</p>

<h2>Le vote : s'abstenir est un choix</h2>
<p>S'abstenir n'est pas voter contre — c'est exprimer une réserve sans bloquer. C'est souvent la posture juste quand vous manquez d'éléments pour vous prononcer en conscience.</p>

<h2>Après le conseil</h2>
<p>Relisez le procès-verbal dès qu'il est disponible. C'est le seul document qui fait foi. Si un point ne reflète pas ce qui a été dit, vous pouvez demander une correction lors du conseil suivant.</p>
    `,
    metaTitle: 'Premier conseil municipal : se préparer, intervenir, voter | MARYAN',
    metaDescription: 'Guide pratique pour réussir son premier conseil municipal : lire l\'ordre du jour, choisir sa posture, intervenir efficacement. Méthode MARYAN.'
  },
  {
    slug: 'conflit-au-sein-du-conseil-comment-reagir',
    title: 'Conflit au sein du conseil : comment réagir sans s\'isoler',
    description: 'Tensions avec le maire, désaccord avec votre groupe, opposition agressive — comment gérer les conflits sans perdre en efficacité ni en crédibilité.',
    date: '2026-03-20',
    author: 'Équipe MARYAN',
    category: 'methode',
    tags: ['conflit', 'relations', 'opposition', 'groupe politique', 'posture'],
    readingTime: 7,
    published: true,
    excerpt: 'Les conflits au conseil municipal sont inévitables. La question n\'est pas de les éviter mais de savoir comment les traverser sans s\'isoler et sans trahir ce pourquoi vous avez été élu·e.',
    content: `
<h2>Les conflits sont normaux — pas anodins</h2>
<p>Un conseil municipal sans tension serait suspect. Le désaccord est le signe que des intérêts différents sont en présence — c'est la définition du politique. Ce qui compte, c'est comment vous gérez ces tensions.</p>

<h2>Identifier la nature du conflit</h2>
<p><strong>Conflit de méthode</strong> : on ne s'oppose pas sur le fond, mais sur la façon de faire. Plus facile à résoudre — proposez une démarche alternative.</p>
<p><strong>Conflit de valeurs</strong> : les positions sont incompatibles en profondeur. Ici, l'enjeu est de nommer le désaccord clairement sans espérer le résoudre à court terme.</p>
<p><strong>Conflit de personnes</strong> : ce n'est plus la question qui est en jeu, c'est la relation. Le plus destructeur. La priorité est de ne pas laisser ce registre contaminer le débat public.</p>

<h2>Quand le conflit est avec votre propre groupe</h2>
<p>C'est souvent le plus difficile à gérer, car il met en jeu votre loyauté. La règle : exprimez votre désaccord en interne d'abord, clairement et sans détour. Si vous ne pouvez pas vous y résoudre, posez la question de votre positionnement dans le groupe avant de voter différemment en séance publique.</p>

<h2>Ce qui protège dans un conflit</h2>
<p>La trace écrite. Dès qu'une tension monte, consignez les faits (dates, mots échangés, décisions prises) dans un document personnel. Ce n'est pas de la paranoïa — c'est de la prudence institutionnelle.</p>
    `,
    metaTitle: 'Conflit au conseil municipal : réagir sans s\'isoler | MARYAN',
    metaDescription: 'Comment gérer un conflit au sein du conseil municipal — avec le maire, son groupe ou l\'opposition — sans perdre en efficacité ni en crédibilité.'
  }
];

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(p => p.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug && p.published);
}

export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return getPublishedPosts().filter(p => p.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getPublishedPosts().filter(p => p.tags.includes(tag));
}
