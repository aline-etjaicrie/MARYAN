# Stack recommandée

## Option MVP la plus sobre
### Front
- **Astro** pour un site rapide et léger
- HTML/CSS simple, très peu de JS
- composants interactifs uniquement là où nécessaire

### Design system
- CSS maison simple
- variables CSS
- pas de framework lourd au départ

### Données / backend
- **Supabase**
  - auth simple si besoin
  - base PostgreSQL
  - stockage des résultats diagnostic
  - table ressources

### CRM / emails
- **Brevo** ou **Loops**
  - segmentation simple
  - séquences email
  - formulaires légers

### Agent conversationnel
- première version via endpoint serveur + modèle LLM
- garde-fous système + corpus métier
- journaux limités et sobres

### CMS contenu
Deux options :
1. ressources stockées directement en base
2. Markdown / MDX si production éditoriale légère

## Pourquoi Astro
- excellent pour la sobriété
- très bon score de performance
- pages statiques naturelles
- bon pour Eco-Index
- migration possible ensuite

## Si besoin d'app plus tard
- Astro + îlots interactifs en V1
- puis évolution vers Next seulement si nécessaire
