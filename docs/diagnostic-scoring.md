# Scoring et profils de sortie — MARYAN

## Dimensions scorées
Chaque réponse alimente une ou plusieurs dimensions.

- **experience_score** — expérience de mandat
- **isolation_score** — niveau d'isolement perçu
- **institutional_confidence_score** — compréhension du fonctionnement local
- **communication_confidence_score** — aisance de parole publique
- **pressure_score** — niveau de pression / exposition
- **method_need_score** — besoin d'outils, de cadre, de méthode
- **human_support_need_score** — besoin d'appui humain
- **premium_intent_score** — appétence à un accompagnement léger/payant

## Logique simple de calcul
- chaque réponse ajoute de 0 à 3 points sur certaines dimensions
- les scores sont normalisés sur 100
- le profil principal est déterminé par la combinaison des 2 ou 3 dimensions les plus hautes

## Profils MVP recommandés

### 1. Élu débutant isolé
**Signaux** : faible expérience + isolement élevé + faible confiance institutionnelle
**Besoin dominant** : repères, compréhension, rassurance
**Orientation** : ressources d'entrée + parcours guidé + newsletter ciblée

### 2. Adjoint sous pression
**Signaux** : forte pression + délégation + temps contraint + besoin d'arbitrage
**Besoin dominant** : priorisation, méthode, cadrage
**Orientation** : ressources premium + visio de cadrage possible

### 3. Élu en difficulté de parole publique
**Signaux** : communication faible + gêne réseaux sociaux + besoin de reformulation
**Besoin dominant** : parole publique, communication, prudence d'exposition
**Orientation** : copilote conversationnel + trames + mini-parcours dédié

### 4. Élu désorienté face à la machine institutionnelle
**Signaux** : difficulté sur fonctionnement local + manque de repères + besoin de compréhension
**Besoin dominant** : clarification du rôle, circuits, marges de manoeuvre
**Orientation** : bibliothèque ciblée + FAQ + accompagnement ponctuel si blocage

### 5. Élu en recherche d'outils et de méthode
**Signaux** : besoin d'organisation + recherche d'outils + appétence numérique modérée
**Besoin dominant** : outils concrets, checklists, routines de mandat
**Orientation** : ressources premium + veille + copilote léger

## Niveaux d'appui suggérés

### Niveau 1 — Autonomie
- bibliothèque de ressources
- FAQ
- fiches pratiques

### Niveau 2 — Freemium / abonnement léger
- veille ciblée
- ressources premium
- mini-parcours

### Niveau 3 — Distanciel accompagné
- visio de cadrage
- diagnostic approfondi
- parcours accompagné

### Niveau 4 — Intervention humaine
- consultant spécialisé
- binôme d'experts
- situation sensible ou complexe

## Exemple de règle d'orientation
- si `isolation_score >= 70` et `experience_score <= 30` → profil `elu_debutant_isole`
- si `pressure_score >= 70` et `method_need_score >= 50` → profil `adjoint_sous_pression`
- si `communication_confidence_score <= 35` et `pressure_score >= 50` → profil `elu_en_difficulte_de_parole_publique`
- si `institutional_confidence_score <= 35` → profil `elu_desoriente_face_machine_institutionnelle`
- sinon si `method_need_score >= 60` → profil `elu_en_recherche_outils_et_methode`
