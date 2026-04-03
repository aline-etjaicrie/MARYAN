# Data Processing Agreement (DPA) — Accord de sous-traitance RGPD
## Article 28 du Règlement (UE) 2016/679

---

**Version :** 1.0
**Date :** Avril 2026
**Responsable de traitement :** MARYAN (Aline Weber, porteur du projet)
**Sous-traitant :** Mistral AI SAS

---

## PRÉAMBULE

Dans le cadre de l'utilisation de l'API Mistral AI par MARYAN, le présent accord de sous-traitance (ci-après « DPA ») est conclu conformément à l'article 28 du Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679).

MARYAN collecte et traite des données à caractère personnel de ses utilisateurs — élus locaux français — dans le cadre de son service de copilote de mandat. Ces données incluent des informations relatives à l'appartenance politique ou syndicale, constituant des données sensibles au sens de l'article 9 du RGPD.

Mistral AI intervient en qualité de **sous-traitant** au sens de l'article 4(8) du RGPD, en traitant ces données pour le compte et sur instruction de MARYAN.

---

## ARTICLE 1 — DÉFINITIONS

- **Responsable de traitement** : MARYAN, représentée par Aline Weber
- **Sous-traitant** : Mistral AI SAS, société par actions simplifiée immatriculée en France, 15 rue des Halles, 75001 Paris
- **Données personnelles** : toute information se rapportant à une personne physique identifiée ou identifiable (art. 4(1) RGPD)
- **Données sensibles** : données révélant l'appartenance politique ou syndicale (art. 9 RGPD)
- **Traitement** : toute opération appliquée aux données personnelles (collecte, transmission, analyse, etc.)

---

## ARTICLE 2 — OBJET ET NATURE DU TRAITEMENT

### 2.1 Objet
Mistral AI traite des données personnelles pour fournir à MARYAN des capacités de génération de texte via son API (modèles `mistral-medium`, `mistral-large` ou équivalents).

### 2.2 Nature des traitements
- Réception des prompts utilisateurs envoyés via l'API MARYAN
- Génération de réponses en langage naturel
- Aucune conservation permanente des données au-delà du traitement en temps réel (conformément aux CGS Mistral)

### 2.3 Finalité
Fourniture du service de copilote intelligent MARYAN aux élus locaux : assistance à la prise de décision, compréhension du cadre juridique et institutionnel, navigation dans les ressources documentaires MARYAN.

### 2.4 Catégories de personnes concernées
Élus locaux français (maires, adjoints, conseillers municipaux, conseillers départementaux, conseillers régionaux, etc.)

### 2.5 Catégories de données traitées
- Contenu libre des questions posées au copilote (peut contenir de manière incidente des données de catégorie spéciale : appartenance politique, syndicale, situation personnelle)
- Résultats du diagnostic de profil (mandat, taille de collectivité, thèmes prioritaires)
- **Aucune donnée d'identité directe transmise à Mistral AI** : les prompts ne contiennent pas le nom, l'email ou l'identifiant Supabase de l'utilisateur

### 2.6 Durée du traitement
Traitement en temps réel uniquement. Conformément aux conditions de service Mistral AI, les données ne sont pas utilisées pour entraîner les modèles sans accord explicite (opt-out by default pour les clients API).

---

## ARTICLE 3 — OBLIGATIONS DU SOUS-TRAITANT (MISTRAL AI)

Conformément à l'article 28(3) du RGPD, Mistral AI s'engage à :

### 3.1 Traitement sur instruction documentée
Ne traiter les données personnelles que sur instruction documentée de MARYAN (les appels API constituent ces instructions documentées).

### 3.2 Confidentialité
Garantir que les personnes autorisées à traiter les données sont soumises à une obligation de confidentialité.

### 3.3 Sécurité
Mettre en œuvre les mesures techniques et organisationnelles appropriées au sens de l'article 32 du RGPD :
- Chiffrement en transit (TLS 1.2+)
- Isolation des données par client API
- Contrôle d'accès strict aux infrastructures de traitement

### 3.4 Sous-traitance ultérieure
Informer MARYAN de tout recours à un sous-traitant ultérieur. Mistral AI publie sa liste de sous-traitants dans sa documentation de confidentialité.

### 3.5 Assistance au responsable de traitement
Aider MARYAN à s'acquitter de ses obligations (droits des personnes, notification de violations, AIPD) dans la mesure du possible.

### 3.6 Sort des données en fin de contrat
Supprimer ou restituer toutes les données à caractère personnel à l'issue du contrat.

### 3.7 Audit
Fournir à MARYAN toutes les informations nécessaires pour démontrer le respect des obligations, et permettre la réalisation d'audits (via documentation, certifications publiées).

---

## ARTICLE 4 — OBLIGATIONS DU RESPONSABLE DE TRAITEMENT (MARYAN)

### 4.1 Licéité du traitement principal
MARYAN s'engage à traiter les données personnelles sur une base légale conforme au RGPD :
- **Consentement explicite** (art. 6(1)(a) et 9(2)(a)) : recueilli à l'inscription, couvrant le traitement des données sensibles incidentes dans le copilote

### 4.2 Information des personnes
MARYAN informe les utilisateurs de l'utilisation de Mistral AI dans sa politique de confidentialité (section "Sous-traitants et tiers").

### 4.3 Minimisation des données
MARYAN met en œuvre des mesures de minimisation :
- Les prompts ne contiennent pas de données d'identification directes (nom, email) — seul le contenu fonctionnel est transmis
- La taille de collectivité et le type de mandat sont transmis en termes génériques (ex : "commune de moins de 2000 habitants") et non nominatifs

### 4.4 Responsabilité
MARYAN reste responsable de traitement au sens du RGPD et ne peut transférer cette responsabilité à Mistral AI.

---

## ARTICLE 5 — TRANSFERTS HORS UE

Mistral AI est une société française. Son infrastructure principale est localisée dans l'Union Européenne.

En cas de sous-traitance ultérieure impliquant un transfert hors UE, Mistral AI devra mettre en place des garanties appropriées (Clauses Contractuelles Types ou équivalent).

**Vérification à effectuer** : Confirmer avec Mistral AI que l'infrastructure de traitement API reste intra-UE, ou obtenir les garanties de transfert applicables.

---

## ARTICLE 6 — MESURES DE SÉCURITÉ SPÉCIFIQUES AUX DONNÉES ARTICLE 9

Compte tenu du caractère sensible des données pouvant être traitées (appartenance politique) :

1. **Minimisation renforcée côté MARYAN** : le système prompt MARYAN n'inclut jamais d'affiliation partisane explicite dans les données structurées transmises à Mistral
2. **Données incidentes dans le contenu libre** : les questions libres de l'utilisateur peuvent contenir des données politiques — traitement limité à la session, aucune conservation
3. **Opt-out entraînement** : MARYAN maintient son statut de client API avec opt-out de l'utilisation des données pour l'entraînement
4. **Surveillance** : MARYAN surveille les évolutions des conditions de service Mistral AI relatives à l'utilisation des données

---

## ARTICLE 7 — RÉFÉRENCES LÉGALES ET DOCUMENTATION MISTRAL AI

Pour la mise en conformité, se référer à :
- **Politique de confidentialité Mistral AI** : https://mistral.ai/fr/privacy/
- **Conditions d'utilisation de l'API** : https://mistral.ai/fr/terms/
- **DPA standard Mistral AI** : https://mistral.ai/fr/dpa/ *(à vérifier — Mistral propose un DPA standard pour les clients enterprise)*

**Action requise** : Contacter Mistral AI à dpo@mistral.ai pour :
1. Confirmer l'existence d'un DPA signable pour les clients API
2. Obtenir la liste complète de leurs sous-traitants ultérieurs
3. Confirmer la localisation intra-UE des serveurs de traitement

---

## ARTICLE 8 — ENTRÉE EN VIGUEUR ET DURÉE

Le présent accord entre en vigueur à compter de la date de première utilisation de l'API Mistral AI par MARYAN et reste en vigueur pendant toute la durée du contrat entre les parties.

---

## ARTICLE 9 — DROIT APPLICABLE

Le présent accord est soumis au droit français et au droit de l'Union Européenne en matière de protection des données.

---

## SIGNATURES ET ACTIONS REQUISES

| Action | Responsable | Statut |
|--------|-------------|--------|
| Contacter Mistral AI dpo@mistral.ai pour DPA | Aline Weber | À faire |
| Confirmer localisation intra-UE des serveurs | Aline Weber | À faire |
| Documenter l'opt-out entraînement (preuve) | Aline Weber | À faire |
| Mentionner Mistral AI dans politique de confidentialité | Dev MARYAN | Vérifier |

---

*Document interne MARYAN — Version 1.0 — Avril 2026*
*À conserver dans le registre RGPD de MARYAN*
