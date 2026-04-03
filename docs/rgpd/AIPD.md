# Analyse d'Impact sur la Protection des Données (AIPD)
## Article 35 du Règlement (UE) 2016/679 (RGPD)

---

**Traitement concerné :** Utilisation du copilote IA MARYAN impliquant des données de catégorie spéciale (art. 9)
**Responsable de traitement :** MARYAN — Aline Weber
**Date :** Avril 2026
**Version :** 1.0
**Statut :** Finalisée

---

## PARTIE 1 — NÉCESSITÉ DE L'AIPD

### 1.1 Critères déclencheurs (art. 35 RGPD)

L'AIPD est obligatoire lorsqu'un traitement est susceptible d'engendrer un risque élevé. MARYAN remplit les critères suivants :

| Critère | Présent | Justification |
|---------|---------|---------------|
| Données de catégorie spéciale (art. 9) | **OUI** | Le type de mandat et les questions libres peuvent révéler l'appartenance politique |
| Traitement à grande échelle | Non (MVP) | Audience limitée — à réévaluer à 5000+ utilisateurs |
| Évaluation systématique (profilage) | **OUI** | Le diagnostic MARYAN évalue et classe les profils d'élus |
| Personnes vulnérables | Partiellement | Les élus peuvent être dans des situations de vulnérabilité institutionnelle |
| Nouvelles technologies | **OUI** | IA générative (Mistral AI) appliquée à des données sensibles |

**Conclusion : AIPD obligatoire.** Au moins 3 critères sur 9 sont réunis, dont le critère absolu des données art. 9.

### 1.2 Référence CNIL
Conformément aux lignes directrices CNIL sur l'AIPD (délibération 2018-327) et la liste des traitements nécessitant une AIPD (délibération 2018-326), le traitement de données politiques par un système IA entre dans la catégorie des traitements à haut risque.

---

## PARTIE 2 — DESCRIPTION DU TRAITEMENT

### 2.1 Nature du traitement
MARYAN est un copilote IA destiné aux élus locaux français. Le cœur du service consiste à permettre aux utilisateurs de poser des questions en langage naturel sur leur mandat, leur rôle, leurs droits et leurs responsabilités.

**Pipeline de traitement :**
1. L'utilisateur se connecte (Supabase Auth)
2. Son profil de diagnostic est chargé (type de mandat, taille collectivité, thèmes prioritaires)
3. Sa question est transmise à l'API Mistral AI avec un système prompt contextualisé
4. La réponse est générée et affichée — potentiellement sauvegardée en historique (Supabase)

### 2.2 Données traitées impliquant l'art. 9

**Données structurées (diagnostic) :**
- Type de mandat : maire, adjoint, conseiller municipal, conseiller départemental, conseiller régional...
- Thèmes prioritaires déclarés : budget, RH, urbanisme, relation administration, VSS, probité...

**Données libres (copilote) :**
- Questions en langage naturel pouvant mentionner :
  - L'appartenance à un parti politique ou groupe d'opposition
  - Des situations de harcèlement, conflits interpersonnels au sein de l'exécutif
  - Des questions de probité impliquant d'autres élus nommément ou par contexte
  - Des situations personnelles révélant des données de santé (stress, burn-out mandataire)

### 2.3 Finalités

| Finalité | Base légale | Nécessité |
|----------|-------------|-----------|
| Personnalisation du copilote | Consentement explicite art. 9(2)(a) | Indispensable pour la pertinence |
| Assistance à la décision | Contrat + consentement | Cœur du service |
| Historique des sessions | Consentement | Optionnel — améliore l'expérience |

### 2.4 Acteurs impliqués

| Acteur | Rôle | Accès données |
|--------|------|---------------|
| Aline Weber | Responsable de traitement | Administration uniquement |
| Supabase Inc. | Sous-traitant — stockage | Données chiffrées, RLS |
| Mistral AI SAS | Sous-traitant — traitement IA | Prompts en temps réel uniquement |
| Utilisateur | Personne concernée | Ses propres données uniquement |

---

## PARTIE 3 — ÉVALUATION DE LA NÉCESSITÉ ET DE LA PROPORTIONNALITÉ

### 3.1 La finalité justifie-t-elle le traitement de données art. 9 ?

**Oui, avec réserves.**

La connaissance du type de mandat est strictement nécessaire pour :
- Identifier le cadre juridique applicable (CGCT différent selon l'échelon)
- Détecter les risques spécifiques (ex : conflit d'intérêt pour un maire vs conseiller d'opposition)
- Proposer des ressources pertinentes

La connaissance de l'affiliation partisane explicite n'est **jamais requise** et ne doit pas être sollicitée.

### 3.2 Mesures de minimisation appliquées

| Mesure | Description | Statut |
|--------|-------------|--------|
| Pas de champ affiliation politique | Le formulaire de diagnostic ne demande jamais l'appartenance partisane | Implémenté |
| Transmission générique à Mistral | Le type de mandat est transmis en termes fonctionnels (ex: "élu municipal"), non partisans | Implémenté |
| Aucun identifiant nominatif dans les prompts | Nom, email, identifiant Supabase exclus des prompts Mistral | Implémenté |
| Opt-out entraînement Mistral | Les données ne sont pas utilisées pour entraîner les modèles | À documenter |
| Historique optionnel | L'utilisateur contrôle si ses sessions sont sauvegardées | À implémenter |

### 3.3 Consentement — qualité et granularité

Le consentement pour les données art. 9 est recueilli :
- **À l'inscription** : mention explicite dans les CGU/Politique de confidentialité
- **Format** : case à cocher distincte pour le traitement des données sensibles incidentes
- **Droit de retrait** : via suppression du compte ou contact email

**À améliorer :** Ajouter un bandeau d'information spécifique avant la première utilisation du copilote, rappelant que les questions peuvent contenir des données sensibles.

---

## PARTIE 4 — ÉVALUATION DES RISQUES

### 4.1 Méthodologie
Évaluation selon la méthode CNIL (gravité × vraisemblance) sur 4 niveaux :
- **Gravité :** Négligeable (1) / Limitée (2) / Importante (3) / Maximale (4)
- **Vraisemblance :** Négligeable (1) / Limitée (2) / Importante (3) / Maximale (4)
- **Risque = Gravité × Vraisemblance** → Acceptable (<4) / Tolérable (4-8) / Élevé (>8)

---

### RISQUE R1 — Accès non autorisé aux données de profil et d'historique

**Scénario :** Un attaquant accède à la base Supabase et récupère les profils d'élus avec leurs questions, révélant leur appartenance politique ou des situations internes sensibles.

| Dimension | Évaluation |
|-----------|-----------|
| Sources de risque | Attaquant externe, employé malveillant sous-traitant |
| Impact sur les personnes | Exposition publique d'informations politiquement sensibles → atteinte à la réputation, risque professionnel |
| Gravité | **3 — Importante** (données sensibles, personnes en position publique) |
| Vraisemblance | **2 — Limitée** (RLS Supabase, accès restreint, pas de données nominatives chez Mistral) |
| **Niveau de risque** | **6 — Tolérable** |

**Mesures existantes :**
- Row Level Security (RLS) sur toutes les tables Supabase — chaque utilisateur ne voit que ses données
- JWT avec expiration courte
- Pas de données nominatives chez Mistral AI

**Mesures complémentaires à implémenter :**
- [ ] Activer les alertes d'accès anormaux Supabase
- [ ] Audit log des accès admin
- [ ] Chiffrement au repos des champs de contenu libre (historique copilote)

---

### RISQUE R2 — Utilisation des données par Mistral AI pour entraîner ses modèles

**Scénario :** Mistral AI utilise les prompts MARYAN (contenant des données politiques) pour entraîner ou améliorer ses modèles, exposant ces données à d'autres utilisateurs ou à des failles de mémorisation.

| Dimension | Évaluation |
|-----------|-----------|
| Sources de risque | Sous-traitant (Mistral AI), évolution des CGS |
| Impact sur les personnes | Données politiques intégrées dans un modèle public → risque de réidentification |
| Gravité | **4 — Maximale** (données sensibles intégrées dans un système global) |
| Vraisemblance | **1 — Négligeable** (Mistral AI offre l'opt-out pour les clients API ; politique documentée) |
| **Niveau de risque** | **4 — Tolérable** |

**Mesures existantes :**
- Statut client API Mistral avec opt-out entraînement par défaut
- Minimisation : aucune donnée nominative dans les prompts

**Mesures complémentaires à implémenter :**
- [ ] Obtenir confirmation écrite de Mistral AI de l'opt-out (DPA signé)
- [ ] Veille sur les évolutions des CGS Mistral AI (trimestielle)
- [ ] Clause contractuelle dans le DPA Mistral interdisant l'utilisation pour entraînement

---

### RISQUE R3 — Divulgation involontaire par l'utilisateur de données de tiers

**Scénario :** Un élu mentionne dans le copilote le nom d'un collègue ou d'un agent municipal dans un contexte sensible (VSS, probité, conflit), créant un traitement de données de tiers sans leur consentement.

| Dimension | Évaluation |
|-----------|-----------|
| Sources de risque | Comportement utilisateur |
| Impact sur les personnes | Données d'une tierce personne traitées par un système IA sans son consentement |
| Gravité | **3 — Importante** |
| Vraisemblance | **3 — Importante** (le mode vigilance_risque du copilote traite précisément ces situations) |
| **Niveau de risque** | **9 — Élevé** ⚠️ |

**Mesures existantes :**
- Le copilote MARYAN est instruit (système prompt) de traiter ces situations avec discrétion
- Les données ne sont transmises qu'à Mistral AI en temps réel, sans création de fiche tiers

**Mesures complémentaires OBLIGATOIRES :**
- [ ] **Information claire à l'utilisateur** : ajouter un avertissement avant le copilote "Ne mentionnez pas de noms ou informations identifiantes concernant des tiers"
- [ ] **Instruction Mistral renforcée** : ajouter dans le system prompt une instruction d'ignorer/masquer les données nominatives de tiers dans les réponses générées
- [ ] **Option de non-sauvegarde** : permettre à l'utilisateur de désactiver l'historique pour les sessions sensibles
- [ ] Politique de confidentialité mise à jour pour mentionner explicitement ce risque et les mesures

---

### RISQUE R4 — Violation de données chez un sous-traitant

**Scénario :** Supabase, Resend ou Vercel subit une violation de données exposant les emails et profils des utilisateurs MARYAN.

| Dimension | Évaluation |
|-----------|-----------|
| Sources de risque | Attaquant externe sur infrastructure sous-traitant |
| Impact sur les personnes | Exposition d'emails + type de mandat → spam ciblé, tentatives de hameçonnage |
| Gravité | **2 — Limitée** (email + mandat, pas de données financières ni très sensibles) |
| Vraisemblance | **2 — Limitée** (sous-traitants établis avec programmes de sécurité) |
| **Niveau de risque** | **4 — Tolérable** |

**Mesures existantes :**
- Choix de sous-traitants avec certifications de sécurité (Supabase SOC2, Stripe PCI-DSS)
- Minimisation des données transmises à chaque sous-traitant

**Mesures complémentaires :**
- [ ] DPA signés avec chaque sous-traitant (Resend, Vercel)
- [ ] Procédure de notification de violation (72h CNIL, art. 33)

---

### RISQUE R5 — Profilage discriminatoire par le copilote

**Scénario :** Le copilote, connaissant le type de mandat, produit des réponses biaisées (ex : différentes selon qu'il est dans une majorité ou minorité), créant un traitement discriminatoire.

| Dimension | Évaluation |
|-----------|-----------|
| Sources de risque | Biais du modèle IA, instructions système inadaptées |
| Impact sur les personnes | Discrimination dans l'accès aux ressources ou à l'information |
| Gravité | **2 — Limitée** (service d'information, pas de décision automatisée contraignante) |
| Vraisemblance | **2 — Limitée** (Mistral AI entraîné à la neutralité ; MARYAN n'intègre pas d'affiliation partisane) |
| **Niveau de risque** | **4 — Tolérable** |

**Mesures existantes :**
- Le diagnostic MARYAN ne collecte pas l'affiliation partisane
- Le système prompt est neutre et factuel

**Mesures complémentaires :**
- [ ] Test régulier du copilote avec profils variés pour détecter des biais
- [ ] Mention dans les CGU que MARYAN ne prend pas de décision automatisée contraignante (art. 22 RGPD)

---

## PARTIE 5 — TABLEAU DE SYNTHÈSE DES RISQUES

| Risque | Gravité | Vraisemblance | Niveau | Statut |
|--------|---------|---------------|--------|--------|
| R1 — Accès non autorisé BDD | 3 | 2 | 6 — Tolérable | Mesures partielles |
| R2 — Entraînement Mistral | 4 | 1 | 4 — Tolérable | DPA à signer |
| R3 — Données tiers dans copilote | 3 | 3 | **9 — Élevé** ⚠️ | Actions requises |
| R4 — Violation sous-traitant | 2 | 2 | 4 — Tolérable | DPA à compléter |
| R5 — Biais IA | 2 | 2 | 4 — Tolérable | Monitoring à mettre en place |

---

## PARTIE 6 — PLAN D'ACTION ET MESURES RÉSIDUELLES

### Actions prioritaires (avant lancement)

| # | Action | Risque adressé | Responsable | Délai |
|---|--------|---------------|-------------|-------|
| 1 | Ajouter avertissement tiers avant copilote | R3 | Dev | Avant lancement |
| 2 | Signer DPA avec Mistral AI | R2 | Aline | Avant lancement |
| 3 | Obtenir/vérifier DPA Resend et Vercel | R4 | Aline | Avant lancement |
| 4 | Procédure notification violation 72h | R4 | Aline | Avant lancement |
| 5 | Instruction système Mistral anti-tiers | R3 | Dev | Avant lancement |

### Actions post-lancement (dans les 3 mois)

| # | Action | Risque adressé | Responsable |
|---|--------|---------------|-------------|
| 6 | Chiffrement au repos historique copilote | R1 | Dev |
| 7 | Option désactivation historique par l'utilisateur | R3 | Dev |
| 8 | Audit log accès admin Supabase | R1 | Dev |
| 9 | Tests de neutralité copilote | R5 | Aline |
| 10 | Veille CGS Mistral AI (trimestrielle) | R2 | Aline |

---

## PARTIE 7 — AVIS SUR L'ACCEPTABILITÉ

### Risques résiduels après mesures

Après application des mesures existantes et planifiées :
- **R1** → Tolérable ✓
- **R2** → Acceptable après signature DPA ✓
- **R3** → Tolérable après avertissement + instruction système (à valider post-implémentation)
- **R4** → Tolérable après DPA complets ✓
- **R5** → Tolérable ✓

### Conclusion

Le traitement MARYAN impliquant des données de catégorie spéciale peut être mis en œuvre sous réserve de :

1. **L'implémentation des actions prioritaires** (1 à 5) avant tout lancement
2. **La mise en place du plan d'action post-lancement** dans les 3 mois
3. **La révision annuelle** de la présente AIPD

En l'état actuel (avant lancement), **le risque R3 (données de tiers) reste le point d'attention principal** et nécessite une mesure technique (avertissement utilisateur + instruction système) avant que le traitement puisse être considéré comme acceptable.

### Consultation de la CNIL

En l'absence de risque résiduel élevé non traitable après mesures, la consultation préalable de la CNIL (art. 36 RGPD) n'est **pas obligatoire**. Elle deviendrait nécessaire si :
- L'audience dépasse 10 000 utilisateurs actifs
- De nouvelles fonctionnalités impliquant des décisions automatisées contraignantes sont ajoutées
- Le traitement évolue vers une collecte explicite d'affiliation politique

---

## PARTIE 8 — RÉVISION ET MISE À JOUR

| Événement déclencheur | Action |
|----------------------|--------|
| Changement de sous-traitant IA | Nouvelle AIPD ou addendum |
| Nouvelle fonctionnalité (décision automatisée, score...) | Révision obligatoire |
| Violation de données | Révision dans les 30 jours |
| +5 000 utilisateurs actifs | Révision du critère "grande échelle" |
| Révision annuelle | Mise à jour complète |

**Prochaine révision prévue :** Avril 2027 (ou avant si événement déclencheur)

---

## SIGNATAIRE

**Responsable de traitement :** Aline Weber — MARYAN
**Date de validation :** Avril 2026

---

*Document confidentiel — Usage interne MARYAN*
*Conservé avec le Registre des activités de traitement et le DPA Mistral*
