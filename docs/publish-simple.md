# Publication simple — MARYAN

## Objectif
Avoir une version en ligne propre, partageable rapidement, sans setup pénible.

## Étapes

### 1. Installer
```bash
cd /Users/alineweber/.openclaw/maryan-mvp
npm install
```

### 2. Vérifier en local
```bash
npm run dev
```

### 3. Générer la version partageable
```bash
npm run build
```

### 4. Dossier à publier
Le site prêt à mettre en ligne est dans :
```bash
/Users/alineweber/.openclaw/maryan-mvp/dist
```

## Pages incluses
- /
- /diagnostic
- /ressources
- /copilote
- /offres
- /methode
- /contact
- /equipe

## Recommandation pratique
Pour un premier partage :
- publier le build statique tel quel
- ne pas ajouter d'analytics lourds
- ne pas brancher tout de suite de scripts marketing
- garder le site léger pour rester cohérent avec l'objectif EcoIndex A

## Ce qu'il faudra ensuite
- formulaire de contact réel
- capture email réelle sur le diagnostic
- stockage des réponses
- branchement progressif du copilote
