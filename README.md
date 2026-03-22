# MARYAN — MVP

Socle de lancement pour un premier site sobre numériquement autour de **MARYAN**, plateforme d'appui pour élus municipaux.

## Direction retenue

- **Framework** : Astro
- **Hébergement MVP** : Vercel
- **Cap sobriété** : Green IT natif + objectif **EcoIndex A**
- **Design** : bleu clair, beige, rose revisité, pointe de vert néon

## Contenu

- `docs/vision.md` — vision, proposition de valeur, principes produit
- `docs/mvp-architecture.md` — architecture fonctionnelle du MVP
- `docs/user-flows.md` — parcours utilisateurs
- `docs/pages.md` — arborescence et pages à prévoir
- `docs/components.md` — composants essentiels
- `docs/data-model.md` — schéma de données minimum
- `docs/stack.md` — stack recommandée
- `docs/ux-rgpd-sobriete.md` — points d'attention UX / RGPD / sobriété
- `docs/diagnostic-mvp.md` — structure du diagnostic d'entrée
- `docs/diagnostic-scoring.md` — scoring et profils de sortie
- `docs/diagnostic-restitution.md` — logique de restitution utilisateur
- `docs/diagnostic-crm.md` — segmentation CRM simple
- `src/pages/index.astro` — homepage Astro
- `src/pages/diagnostic.astro` — diagnostic MVP
- `src/pages/ressources.astro` — bibliothèque
- `src/pages/copilote.astro` — page copilote
- `src/pages/offres.astro` — niveaux d'appui
- `src/pages/methode.astro` — méthode
- `src/pages/contact.astro` — contact
- `src/layouts/BaseLayout.astro` — layout global
- `src/styles/global.css` — base visuelle sobre
- `docs/deploy-scaleway.md` — guide de mise en ligne simple

## Palette de départ

- Bleu clair institutionnel doux : `#7FA7C9`
- Beige clair : `#F5EBDD`
- Rose revisité : `#D88FA0`
- Vert néon d'accent : `#8CFF98`
- Texte profond : `#1E2A32`

## Lancer le projet

```bash
npm install
npm run dev
```

## Copilote réel

Le copilote MARYAN appelle Mistral via une route serveur Astro : `src/pages/api/chat.ts`.

Configuration locale :

```bash
cp .env.example .env
```

Puis renseigner :

```bash
MISTRAL_API_KEY=...
MISTRAL_MODEL=mistral-large-latest
MISTRAL_AGENT_ID=... # optionnel
STRIPE_SECRET_KEY=...
PUBLIC_SITE_URL=http://localhost:4321
```

En production, les mêmes variables doivent aussi être configurées dans Vercel.

## Intention

Créer une V1 :
- légère
- rassurante
- rapide à charger
- compréhensible par des utilisateurs peu technophiles
- extensible vers un produit freemium/premium
- alignée avec une exigence Green IT visible dès la home et le footer
