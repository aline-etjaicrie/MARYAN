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
  },
  {
    slug: 'pouvoir-reel-elu-impuissance-marges-manoeuvre',
    title: 'Pourquoi les élus se sentent impuissants (et comment retrouver un pouvoir réel)',
    description: 'Pourquoi les élus se sentent impuissants ? Comprendre les limites du mandat et retrouver des marges de manœuvre concrètes.',
    date: '2026-04-03',
    author: 'Équipe MARYAN',
    category: 'methode',
    tags: ['pouvoir réel', 'impuissance', 'marge de manœuvre', 'rôle élu', 'frustration', 'mandat'],
    readingTime: 6,
    published: true,
    excerpt: 'Beaucoup d\'élus arrivent avec la conviction qu\'ils vont pouvoir agir, décider, transformer. Très vite, un sentiment s\'installe : celui de ne pas avoir autant de pouvoir que prévu. Ce décalage n\'est pas un problème individuel — c\'est une réalité structurelle du mandat.',
    metaTitle: 'Pouvoir réel des élus : pourquoi vous vous sentez impuissant | MARYAN',
    metaDescription: 'Pourquoi les élus se sentent impuissants ? Comprendre les limites du mandat et retrouver des marges de manœuvre concrètes.',
    content: `
<h2>Le choc du réel : un pouvoir encadré</h2>
<p>Contrairement à une idée répandue, un élu ne décide pas seul. Chaque décision dépend de l'administration, du cadre juridique, des budgets disponibles, des autres collectivités, des partenaires et des équilibres politiques.</p>
<p><strong>Le pouvoir de l'élu est réel… mais partagé et encadré.</strong></p>
<p>→ <a href="https://maryanapp.fr/ressources/role-reel-elu-decision-publique">Le rôle réel de l'élu dans la décision publique</a></p>

<h2>Pourquoi ce sentiment d'impuissance apparaît</h2>
<p><strong>Une attente initiale trop élevée.</strong> Imaginer pouvoir agir rapidement et directement. Le mandat commence souvent avec une projection de pouvoir qui ne correspond pas à la réalité institutionnelle.</p>
<p><strong>Une complexité sous-estimée.</strong> Les processus sont longs, techniques, multi-acteurs. Ce qui semble simple depuis l'extérieur révèle, de l'intérieur, une série de contraintes imbriquées.</p>
<p><strong>Une confusion sur le rôle.</strong> Vouloir faire à la place de l'administration… ou attendre d'elle qu'elle décide. Les deux postures produisent les mêmes blocages.</p>
<p>→ <a href="https://maryanapp.fr/ressources/elus-administration-qui-fait-quoi">Élus / administration : qui fait quoi</a></p>

<h2>Le vrai pouvoir de l'élu : moins visible, mais déterminant</h2>
<p>Le pouvoir de l'élu n'est pas un pouvoir d'exécution. C'est un pouvoir d'orientation, de priorisation, d'arbitrage et d'impulsion. Vous ne faites pas tout — mais vous influencez ce qui se fait, dans quel ordre, et avec qui.</p>
<p>Cette distinction est fondamentale. La confondre avec de l'impuissance, c'est se priver des leviers réels du mandat.</p>

<h2>Là où vous avez réellement de la marge</h2>
<p>Même dans un cadre contraint, vous avez un pouvoir réel sur <strong>l'agenda</strong> (ce qui est traité ou non), <strong>les priorités</strong> (ce qui est urgent ou secondaire), <strong>les arbitrages</strong> (ce qui est retenu entre plusieurs options) et <strong>les alliances</strong> (avec qui vous travaillez).</p>
<p>Autrement dit : vous ne contrôlez pas tout — mais vous orientez beaucoup. Et c'est précisément là que se joue l'efficacité d'un mandat.</p>

<h2>Le piège : vouloir reprendre un pouvoir direct</h2>
<p>Face à la frustration, certains élus tentent de contourner les services, d'accélérer sans cadre, d'imposer sans concertation. Le résultat est systématiquement le même : blocages, tensions avec l'administration, perte d'efficacité et fragilisation de la relation politique.</p>
<p><strong>La tentation du court-circuit est le principal ennemi du pouvoir réel.</strong></p>

<h2>Retrouver du pouvoir, concrètement</h2>
<p><strong>Comprendre le système.</strong> Identifier qui fait quoi, à quel moment, avec quels leviers. La carte du pouvoir réel est rarement celle qu'on imagine.</p>
<p><strong>Clarifier votre rôle.</strong> Vous n'êtes pas exécutant. Vous orientez, arbitrez, impulsez. Assumer ce rôle pleinement, c'est déjà reprendre du pouvoir.</p>
<p><strong>Travailler les leviers.</strong> Acteurs, timing, priorités. L'influence s'exerce souvent en amont des décisions — pas au moment du vote.</p>
<p><strong>Accepter le temps.</strong> Une décision produit ses effets dans la durée. Inscrire son action dans le temps du mandat, c'est travailler pour des résultats réels plutôt que pour des apparences immédiates.</p>
<p>→ <a href="https://maryanapp.fr/ressources/inscrire-action-temps-mandat">Inscrire son action dans le temps du mandat</a></p>

<h2>Ce qui change tout</h2>
<p>Le basculement se fait ici : passer de <em>"je veux décider"</em> à <em>"je veux faire avancer"</em>. Ce n'est pas une capitulation — c'est une compréhension plus juste du mandat. Et c'est là que le pouvoir devient réel.</p>

<h2>Un pouvoir différent, mais essentiel</h2>
<p>Être élu, ce n'est pas contrôler. C'est orienter, arbitrer, impulser, tenir un cap dans la durée. Le pouvoir n'est pas absolu — mais il est structurant. Les élus qui le comprennent sont ceux qui agissent le mieux.</p>

<div style="background:#0A192F;border-radius:10px;padding:1.5rem 2rem;margin-top:2rem;">
<p style="color:#ADFF2F;font-weight:800;margin:0 0 0.5rem;">Vous avez le sentiment de ne pas avoir de prise sur une situation ?</p>
<p style="color:rgba(255,255,255,0.8);margin:0 0 1rem;font-size:0.9rem;">Décrivez-la. MARYAN vous aide à comprendre où se situe votre pouvoir… et comment l'exercer concrètement.</p>
<a href="https://maryanapp.fr/copilote" style="display:inline-block;background:#ADFF2F;color:#0A192F;padding:0.6rem 1.25rem;border-radius:6px;font-weight:800;text-decoration:none;font-size:0.88rem;">Essayer le copilote →</a>
</div>
`
  },
  {
    slug: 'role-elu-local-pouvoirs-limites',
    title: 'Le rôle de l\'élu local : ce que vous pouvez vraiment faire (et ce que vous ne contrôlez pas)',
    description: 'Quel est le vrai rôle d\'un élu local ? Pouvoirs, limites, relations avec l\'administration : comprendre la réalité du mandat pour agir efficacement.',
    date: '2026-04-03',
    author: 'Équipe MARYAN',
    category: 'methode',
    tags: ['rôle', 'pouvoir réel', 'mandat', 'décision', 'administration', 'marges de manœuvre'],
    readingTime: 6,
    published: true,
    excerpt: 'Être élu local, ce n\'est pas "décider de tout". C\'est évoluer dans un système où les décisions sont partagées, les contraintes nombreuses, et les marges de manœuvre réelles… mais encadrées. Comprendre cette réalité est essentiel pour agir efficacement.',
    metaTitle: 'Rôle de l\'élu local : pouvoirs réels et limites | MARYAN',
    metaDescription: 'Quel est le vrai rôle d\'un élu local ? Pouvoirs, limites, relations avec l\'administration : comprendre la réalité du mandat.',
    content: `
<h2>Un pouvoir réel… mais jamais solitaire</h2>
<p>Contrairement à une idée répandue, un élu ne décide pas seul. Chaque décision dépend de l'administration (expertise, mise en œuvre), du cadre légal, des autres collectivités, des contraintes budgétaires et des équilibres politiques.</p>
<p><strong>Le pouvoir de l'élu est un pouvoir d'orientation et d'arbitrage — pas un pouvoir d'exécution solitaire.</strong></p>

<h2>Les 4 rôles clés de l'élu</h2>
<p><strong>Donner une direction.</strong> Fixer des priorités, porter une vision. C'est le rôle le plus structurant — et souvent le plus négligé au profit de l'urgence quotidienne.</p>
<p><strong>Mettre à l'agenda.</strong> Faire émerger des sujets et lancer des dynamiques. L'élu ne produit pas — il impulse.</p>
<p><strong>Arbitrer.</strong> Trancher entre plusieurs options imparfaites, dans des délais contraints. C'est là que le jugement politique est irremplaçable.</p>
<p><strong>Faciliter.</strong> Coordonner les acteurs, lever des blocages relationnels ou institutionnels, maintenir la cohérence d'ensemble.</p>

<h2>Pourquoi les décisions prennent du temps</h2>
<p>Un projet local passe toujours par plusieurs étapes : cadrage politique, étude technique, validation juridique, financement, mise en œuvre. Entre la décision politique et le résultat visible, il y a un temps incompressible — parfois plusieurs mois, parfois plusieurs années.</p>
<p>C'est une réalité du système, pas un dysfonctionnement. L'élu efficace l'intègre dans sa stratégie plutôt que de le subir.</p>

<h2>Le piège : surestimer son pouvoir immédiat</h2>
<p>Beaucoup d'élus pensent pouvoir agir vite, transformer rapidement, contourner les blocages administratifs. Le résultat est toujours le même : frustration, tensions avec les services, perte de crédibilité auprès des citoyens et de l'équipe.</p>
<p><strong>Promettre ce qu'on ne maîtrise pas est l'une des principales sources de fragilité politique.</strong></p>

<h2>La clé : comprendre le système pour agir efficacement</h2>
<p>Un élu efficace comprend qui décide vraiment, identifie les bons leviers au bon moment, travaille avec les bons acteurs, et accepte le temps du processus. Il ne subit pas le système — il s'y appuie.</p>
<p>Cette compréhension n'est pas une capitulation. C'est la condition d'une action durable.</p>

<h2>Un rôle stratégique, pas exécutif</h2>
<p>Être élu, ce n'est pas tout faire. C'est orienter, prioriser, arbitrer, tenir un cap dans la durée. Le pouvoir n'est pas absolu — mais il est déterminant. C'est précisément parce qu'il est limité qu'il doit être exercé avec clarté et méthode.</p>

<div style="background:#0A192F;border-radius:10px;padding:1.5rem 2rem;margin-top:2rem;">
<p style="color:#ADFF2F;font-weight:800;margin:0 0 0.5rem;">Vous vous demandez comment agir concrètement dans votre mandat ?</p>
<p style="color:rgba(255,255,255,0.8);margin:0 0 1rem;font-size:0.9rem;">MARYAN vous aide à comprendre votre rôle et à prendre les bonnes décisions, en situation réelle.</p>
<a href="https://maryanapp.fr/copilote" style="display:inline-block;background:#ADFF2F;color:#0A192F;padding:0.6rem 1.25rem;border-radius:6px;font-weight:800;text-decoration:none;font-size:0.88rem;">Essayer le copilote →</a>
</div>
`
  },
  {
    slug: 'relation-elu-administration',
    title: 'Élus et administration : comprendre la relation pour éviter les blocages',
    description: 'Comment travailler efficacement avec l\'administration en tant qu\'élu ? Rôles, tensions, erreurs à éviter et bonnes pratiques pour construire une relation durable.',
    date: '2026-04-03',
    author: 'Équipe MARYAN',
    category: 'methode',
    tags: ['administration', 'relation', 'blocages', 'fonctionnement', 'tensions', 'services'],
    readingTime: 6,
    published: true,
    excerpt: 'La relation entre élus et administration est au cœur de l\'action publique. Et pourtant, elle est souvent source de tensions et mal gérée. Bien la comprendre, c\'est éviter une grande partie des blocages.',
    metaTitle: 'Relation élus-administration : comprendre et mieux travailler | MARYAN',
    metaDescription: 'Comment travailler efficacement avec l\'administration en tant qu\'élu ? Rôles, tensions, erreurs à éviter et bonnes pratiques.',
    content: `
<h2>Qui fait quoi ? Une confusion fréquente</h2>
<p>En théorie, la distinction est simple : les élus définissent les orientations, l'administration met en œuvre. Dans la réalité, les rôles s'entremêlent : les services apportent expertise et faisabilité, les élus arbitrent et priorisent.</p>
<p><strong>C'est une relation de complémentarité, pas une hiérarchie simple.</strong> Confondre les deux registres est la source de la plupart des tensions.</p>

<h2>Pourquoi les tensions apparaissent</h2>
<p>Les causes sont souvent les mêmes : attentes irréalistes des élus sur les délais, contraintes administratives mal comprises, différences de temporalité entre temps politique et temps administratif, manque de communication régulière.</p>
<p>Le conflit vient rarement d'une mauvaise volonté. Il vient d'un décalage de perception sur ce qui est possible, légitime, urgent.</p>

<h2>Les erreurs classiques côté élus</h2>
<p>Vouloir aller trop vite, contourner les services, imposer sans expliquer, interpréter les contraintes comme des blocages volontaires. Ces comportements fragilisent durablement la relation — et ralentissent in fine l'action.</p>

<h2>Les erreurs côté administration</h2>
<p>Rigidité excessive face aux demandes politiques, manque de pédagogie sur les contraintes, protection du cadre au détriment du projet, communication insuffisante sur les avancées et blocages. La responsabilité est partagée.</p>

<h2>Comment construire une relation efficace</h2>
<p><strong>Clarifier les rôles dès le départ.</strong> Qui décide ? Qui fait ? Qui valide ? Une ambiguïté non résolue se paie toujours plus tard.</p>
<p><strong>Travailler en confiance.</strong> Partager les objectifs, expliquer les contraintes politiques, accepter les contraintes techniques. La transparence mutuelle est un accélérateur.</p>
<p><strong>Accepter le cadre légal et procédural.</strong> Le droit et les procédures ne sont pas optionnels — ils protègent aussi les élus. Les ignorer crée des risques juridiques.</p>
<p><strong>Installer un dialogue régulier.</strong> Les incompréhensions naissent dans les silences. Une réunion courte et régulière vaut mieux qu'une réunion de crise.</p>

<h2>Le bon équilibre</h2>
<p>Un élu efficace respecte l'administration sans s'effacer. Une administration efficace applique les règles tout en accompagnant le projet politique. Quand les deux côtés jouent ce rôle, l'action publique avance.</p>

<h2>Une relation structurante pour le mandat</h2>
<p>Une mauvaise relation élu-administration bloque tout — les projets, les décisions, la crédibilité. Une bonne relation permet d'accélérer les projets, de sécuriser les décisions et de renforcer la légitimité politique. C'est l'un des leviers d'efficacité les plus sous-estimés dans un mandat.</p>

<div style="background:#0A192F;border-radius:10px;padding:1.5rem 2rem;margin-top:2rem;">
<p style="color:#ADFF2F;font-weight:800;margin:0 0 0.5rem;">En tension avec votre administration ou vous ne savez pas comment vous positionner ?</p>
<p style="color:rgba(255,255,255,0.8);margin:0 0 1rem;font-size:0.9rem;">MARYAN vous aide à trouver la bonne posture et à débloquer les situations concrètes.</p>
<a href="https://maryanapp.fr/copilote" style="display:inline-block;background:#ADFF2F;color:#0A192F;padding:0.6rem 1.25rem;border-radius:6px;font-weight:800;text-decoration:none;font-size:0.88rem;">Essayer le copilote →</a>
</div>
`
  },
  {
    slug: 'irreprochable-politique-probite-confiance-democratie',
    title: 'Pourquoi être irréprochable en politique est essentiel',
    description: 'Probité, confiance, démocratie : pourquoi l\'exemplarité des élus est devenue indispensable pour renouer avec les citoyens.',
    date: '2026-04-02',
    author: 'Équipe MARYAN',
    category: 'droits',
    tags: ['probité', 'exemplarité', 'confiance', 'démocratie', 'éthique publique', 'comportement élus'],
    readingTime: 8,
    published: true,
    excerpt: 'Dans un contexte de défiance croissante, la probité des élus est devenue un pilier essentiel pour maintenir la confiance et faire vivre la démocratie. Être irréprochable, ce n\'est pas être parfait — c\'est être clair, responsable, aligné et conscient de sa position.',
    metaTitle: 'Pourquoi être irréprochable en politique est essentiel',
    metaDescription: 'Probité, confiance, démocratie : pourquoi l\'exemplarité des élus est devenue indispensable pour renouer avec les citoyens.',
    content: `
<h2>La confiance : socle fragile de la démocratie</h2>
<p>La démocratie repose sur un principe simple : les citoyens acceptent les règles parce qu'ils font confiance à celles et ceux qui les incarnent. Lorsque cette confiance s'érode, les conséquences sont immédiates : hausse de l'abstention, rejet des institutions, montée des tensions politiques, affaiblissement du dialogue démocratique.</p>
<p><strong>La confiance démocratique n'est pas acquise. Elle se construit et se maintient.</strong></p>

<h2>Pourquoi l'exemplarité des élus est devenue indispensable</h2>
<p>Être élu aujourd'hui, c'est évoluer dans un environnement ultra-visible, numérique, instantané et fortement exposé médiatiquement. Chaque comportement peut être observé, capturé, diffusé, interprété.</p>
<p><strong>L'exemplarité politique n'est plus une option. C'est une condition d'exercice du mandat.</strong></p>

<h2>Probité : bien plus qu'une obligation légale</h2>
<p>La probité des élus ne se limite pas au respect de la loi. Elle inclut l'absence de conflits d'intérêts, le refus des avantages indus, la transparence des pratiques, la maîtrise des situations ambiguës.</p>
<p>La frontière entre légal et acceptable est devenue plus exigeante. Un comportement peut être légal… mais fragiliser la confiance publique.</p>

<h2>Le soupçon : un risque systémique pour la vie publique</h2>
<p>Le problème aujourd'hui n'est pas seulement la faute. C'est le soupçon permanent. Des perceptions comme "les élus sont au-dessus des lois" ou "ils profitent du système" affaiblissent profondément la démocratie en bloquant l'action publique, les réformes et le dialogue avec les citoyens.</p>

<h2>Renouer avec les citoyens : une question de cohérence</h2>
<p>Les citoyens n'attendent pas des élus parfaits. Ils attendent des élus cohérents, responsables, transparents, capables d'assumer leurs décisions. L'écart entre discours et comportement est aujourd'hui le principal facteur de défiance.</p>

<h2>Dialogue démocratique : sans confiance, tout se crispe</h2>
<p>Sans confiance, chaque décision est suspectée, chaque action contestée, chaque parole remise en cause. À l'inverse, une posture claire permet un dialogue apaisé, une meilleure acceptation des décisions, une relation plus saine avec les citoyens.</p>
<p><strong>L'éthique publique est une condition du dialogue démocratique.</strong></p>

<h2>Être irréprochable : une protection pour les élus eux-mêmes</h2>
<p>Adopter une posture irréprochable permet aussi de limiter les risques juridiques, éviter les crises médiatiques, se protéger des accusations et réduire les zones grises. L'exemplarité est aussi une stratégie de sécurisation du mandat.</p>

<h2>Une responsabilité individuelle et collective</h2>
<p>La confiance ne dépend pas uniquement des lois. Elle repose sur les comportements individuels, les pratiques collectives, la capacité à réagir en cas de problème et la clarté des règles internes. Chaque élu contribue à renforcer… ou fragiliser la confiance démocratique.</p>

<h2>Conclusion : une exigence politique majeure</h2>
<p>Être irréprochable, ce n'est pas être parfait. C'est être clair, responsable, aligné, conscient de sa position. La probité est aujourd'hui une condition de légitimité politique. <strong>Sans confiance, il n'y a pas de démocratie vivante.</strong></p>

<h2>Ressources utiles sur la probité et l'éthique publique</h2>
<p>Plusieurs institutions encadrent et accompagnent les élus sur ces sujets :</p>
<ul>
<li><strong><a href="https://www.hatvp.fr" target="_blank" rel="noopener">Haute Autorité pour la transparence de la vie publique (HATVP)</a></strong> — Déclarations d'intérêts, contrôle du patrimoine, prévention des conflits d'intérêts</li>
<li><strong><a href="https://www.agence-francaise-anticorruption.gouv.fr" target="_blank" rel="noopener">Agence française anticorruption (AFA)</a></strong> — Recommandations pour prévenir la corruption et les atteintes à la probité</li>
<li><strong><a href="https://www.transparency.fr" target="_blank" rel="noopener">Transparency International France</a></strong> — Analyses, rapports et plaidoyer sur l'intégrité publique</li>
<li><strong><a href="https://www.defenseurdesdroits.fr" target="_blank" rel="noopener">Défenseur des droits</a></strong> — Protection des droits, signalements, accompagnement des lanceurs d'alerte</li>
</ul>
<div style="background:#0A192F;border-radius:10px;padding:1.5rem 2rem;margin-top:2rem;">
<p style="color:#64FFDA;font-weight:800;margin:0 0 0.5rem;">Vous êtes élu·e ou en responsabilité publique ?</p>
<p style="color:rgba(255,255,255,0.8);margin:0 0 1rem;font-size:0.9rem;">MARYAN vous aide à décider dans les situations sensibles, en temps réel.</p>
<a href="https://maryanapp.fr/copilote" style="display:inline-block;background:#64FFDA;color:#0A192F;padding:0.6rem 1.25rem;border-radius:6px;font-weight:800;text-decoration:none;font-size:0.88rem;">Essayer le copilote →</a>
</div>
`
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
