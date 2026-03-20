# Mise en ligne simple — MARYAN (Astro + Scaleway)

## Objectif
Mettre en ligne une version partageable de MARYAN sans s'arracher les cheveux.

## Option recommandée MVP
Déployer le site Astro comme **site statique**.

Pourquoi :
- plus simple
- plus stable
- plus sobre
- meilleur pour EcoIndex
- moins de maintenance au début

## Étapes locales
Depuis le dossier du projet :

```bash
cd /Users/alineweber/.openclaw/maryan-mvp
npm install
npm run build
```

Cela génère un dossier :
- `dist/`

## Ce que contient `dist/`
- la home
- la page diagnostic
- les pages ressources / copilote / offres / méthode / contact
- tous les assets nécessaires au partage

## Déploiement simple côté Scaleway
Deux options selon ton niveau de confort :

### Option A — hébergement statique / object storage + website
- créer un bucket public de site statique
- uploader le contenu de `dist/`
- définir `index.html` comme document d'entrée
- brancher ensuite un domaine ou sous-domaine

### Option B — service de déploiement type app statique si disponible dans ton setup
- connecter le repo
- commande d'installation : `npm install`
- commande de build : `npm run build`
- dossier de publication : `dist`

## Réglages à viser
- compression activée
- cache statique simple
- aucun script tiers inutile
- domaine ou sous-domaine dédié, ex. `maryan.aline...` ou équivalent

## Checklist avant partage
- vérifier la home
- vérifier `/diagnostic`
- vérifier les liens de navigation
- vérifier le rendu mobile
- vérifier le footer Green IT / EcoIndex
- vérifier l'absence d'éléments cassés ou vides trop visibles

## Recommandation
Pour un partage rapide à quelques personnes :
1. build Astro
2. déploiement statique simple
3. lien privé ou petit cercle

Ensuite seulement :
- analytics sobres
- formulaire réel
- stockage du diagnostic
- copilote branché
