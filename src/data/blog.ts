export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601 : YYYY-MM-DD
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "municipales-2026-ce-qui-change",
    title: "Municipales 2026 : ce qui change pour les élus en place",
    excerpt: "Renouvellement du mandat, nouvelles contraintes, marges de manœuvre élargies — ce que les prochaines élections impliquent concrètement pour les équipes sortantes.",
    date: "2026-04-08",
    author: "Aline Weber"
  },
  {
    slug: "travailler-avec-son-administration",
    title: "Travailler avec son administration : les trois erreurs à éviter",
    excerpt: "Entre micromanagement et déresponsabilisation, trouver le bon curseur prend du temps. Voici les trois glissements les plus fréquents — et comment les corriger.",
    date: "2026-03-15",
    author: "Aline Weber"
  },
  {
    slug: "prise-de-parole-en-conseil",
    title: "Prise de parole en conseil municipal : ce qui se joue vraiment",
    excerpt: "Le conseil n'est pas un oral de rattrapage. C'est un espace politique. Ce que vous dites y compte moins que la manière dont vous le portez.",
    date: "2026-03-01",
    author: "Aline Weber"
  },
  {
    slug: "cent-premiers-jours",
    title: "Les 100 premiers jours : comment ne pas se noyer",
    excerpt: "Le début de mandat ressemble souvent à une course. Les dossiers s'accumulent, les attentes sont fortes, les repères manquent. Voici une méthode pour reprendre la main.",
    date: "2026-02-15",
    author: "Aline Weber"
  },
  {
    slug: "gerer-une-interpellation-publique",
    title: "Gérer une interpellation publique sans se fragiliser",
    excerpt: "Vous êtes interpellé en public, parfois avec agressivité. Répondre trop vite ou trop fort aggrave la situation. Ce que la méthode MARYAN propose à la place.",
    date: "2026-02-01",
    author: "Aline Weber"
  },
  {
    slug: "deliberations-techniques-comment-sy-retrouver",
    title: "Délibérations techniques : comment s'y retrouver sans se noyer",
    excerpt: "Urbanisme, marchés publics, finances — certaines délibérations sont denses, techniques, intimidantes. Une grille de lecture simple pour en dire l'essentiel.",
    date: "2026-01-15",
    author: "Aline Weber"
  },
  {
    slug: "pourquoi-un-copilote-de-mandat",
    title: "Pourquoi les élus locaux ont besoin d'un copilote",
    excerpt: "Pas d'assistants, pas de coachs, pas de conseil permanent — l'élu local décide souvent seul, vite, sous pression. MARYAN a été construit pour ce moment précis.",
    date: "2026-01-05",
    author: "Aline Weber"
  }
];

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
