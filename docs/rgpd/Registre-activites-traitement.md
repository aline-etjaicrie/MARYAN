# Registre des activités de traitement — MARYAN
## Article 30 du Règlement (UE) 2016/679 (RGPD)

---

**Responsable de traitement :** MARYAN
**Représentant :** Aline Weber
**Contact DPO / référent RGPD :** aline@etjaicrie.com
**Date de création :** Avril 2026
**Dernière mise à jour :** Avril 2026

---

> Ce registre recense l'ensemble des activités de traitement de données à caractère personnel menées par MARYAN, conformément à l'obligation prévue à l'article 30 du RGPD.

---

## TRAITEMENT N°1 — Gestion des comptes utilisateurs

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Création et gestion des comptes utilisateurs |
| **Finalité** | Permettre l'authentification et l'accès au service MARYAN |
| **Base légale** | Exécution d'un contrat (art. 6(1)(b) RGPD) |
| **Catégories de personnes** | Élus locaux inscrits sur maryanapp.fr |
| **Catégories de données** | Email, prénom (optionnel), date d'inscription, plan d'abonnement (gratuit/plus) |
| **Données sensibles (art. 9)** | Non |
| **Destinataires** | Supabase (hébergement BDD, sous-traitant) |
| **Transfert hors UE** | Non — Supabase EU (Frankfurt) |
| **Durée de conservation** | Durée du compte + 3 ans après suppression (obligations comptables) → données anonymisées |
| **Mesures de sécurité** | Auth JWT via Supabase, RLS (Row Level Security) sur toutes les tables, HTTPS |
| **Sous-traitants** | Supabase Inc. (infrastructure BDD + auth) |

---

## TRAITEMENT N°2 — Diagnostic de profil élu

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Diagnostic de situation mandataire |
| **Finalité** | Personnaliser l'assistance du copilote MARYAN selon le profil de l'élu |
| **Base légale** | Consentement (art. 6(1)(a)) + consentement explicite pour données sensibles (art. 9(2)(a)) |
| **Catégories de personnes** | Utilisateurs ayant complété le diagnostic |
| **Catégories de données** | Type de mandat, taille de collectivité, thèmes prioritaires déclarés, niveau d'expérience auto-évalué |
| **Données sensibles (art. 9)** | **OUI** — le type de mandat peut révéler indirectement une appartenance politique (ex : conseil régional d'une région associée à un parti) |
| **Destinataires** | Supabase (stockage profil), Mistral AI (traitement pour personnalisation copilote) |
| **Transfert hors UE** | Non (Supabase EU + Mistral AI France) |
| **Durée de conservation** | Durée du compte — suppression à la demande (art. 17 RGPD) ou à la clôture du compte |
| **Mesures de sécurité** | RLS Supabase (chaque utilisateur ne voit que ses propres données), minimisation (données transmises à Mistral en termes génériques) |
| **Sous-traitants** | Supabase Inc., Mistral AI SAS |

---

## TRAITEMENT N°3 — Utilisation du copilote MARYAN (sessions de conversation)

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Sessions de conversation avec le copilote IA |
| **Finalité** | Fournir une assistance personnalisée à l'élu dans l'exercice de son mandat |
| **Base légale** | Exécution d'un contrat (art. 6(1)(b)) + consentement explicite pour données sensibles (art. 9(2)(a)) |
| **Catégories de personnes** | Utilisateurs actifs du copilote |
| **Catégories de données** | Contenu libre des questions posées (peut contenir des données sensibles de manière incidente : affiliation politique, situations conflictuelles, données de tiers) |
| **Données sensibles (art. 9)** | **OUI** — les questions libres peuvent contenir des données révélant l'appartenance politique ou syndicale, ou des données de catégorie spéciale de tiers mentionnés |
| **Destinataires** | Mistral AI (génération des réponses via API), Supabase (historique si activé) |
| **Transfert hors UE** | Non (Mistral AI France, Supabase EU) |
| **Durée de conservation** | Session uniquement pour Mistral AI — historique Supabase : durée du compte + suppression sur demande |
| **Mesures de sécurité** | Aucune donnée nominative transmise à Mistral AI dans les prompts systèmes ; opt-out entraînement Mistral activé ; RLS Supabase |
| **Sous-traitants** | Mistral AI SAS (traitement IA), Supabase Inc. (stockage historique) |

**Note AIPD** : Ce traitement fait l'objet d'une Analyse d'Impact sur la Protection des Données (voir AIPD.md) en raison du traitement de données de catégorie spéciale (art. 35 RGPD).

---

## TRAITEMENT N°4 — Gestion des abonnements et paiements

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Gestion des abonnements payants (plan MARYAN Plus) |
| **Finalité** | Facturation, gestion des accès premium, conformité comptable |
| **Base légale** | Exécution d'un contrat (art. 6(1)(b)), obligation légale (art. 6(1)(c)) pour la comptabilité |
| **Catégories de personnes** | Utilisateurs ayant souscrit un abonnement payant |
| **Catégories de données** | Email, données de paiement (gérées exclusivement par Stripe), statut d'abonnement, dates de facturation |
| **Données sensibles (art. 9)** | Non |
| **Destinataires** | Stripe Inc. (traitement paiement), Supabase (statut plan), Resend (emails de confirmation) |
| **Transfert hors UE** | Stripe Inc. (USA) — transfert encadré par Clauses Contractuelles Types + Stripe est certifié PCI-DSS |
| **Durée de conservation** | Données de facturation : 10 ans (obligation comptable française) ; données de paiement : gérées par Stripe selon leur politique |
| **Mesures de sécurité** | MARYAN ne stocke aucune donnée de carte bancaire — délégation complète à Stripe ; webhooks Stripe signés |
| **Sous-traitants** | Stripe Inc. (paiement), Supabase Inc. (statut), Resend (email) |

---

## TRAITEMENT N°5 — Envoi d'emails transactionnels

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Emails transactionnels (bienvenue, confirmation paiement, notifications) |
| **Finalité** | Communication de service : confirmation d'inscription, confirmation de paiement, notifications de contenu |
| **Base légale** | Exécution d'un contrat (art. 6(1)(b)) pour les emails transactionnels ; consentement (art. 6(1)(a)) pour les newsletters de contenu |
| **Catégories de personnes** | Utilisateurs inscrits, abonnés à la newsletter |
| **Catégories de données** | Email, prénom (optionnel), statut d'abonnement newsletter (opt-in/out) |
| **Données sensibles (art. 9)** | Non |
| **Destinataires** | Resend Inc. (routage email) |
| **Transfert hors UE** | Resend Inc. (USA) — vérifier les garanties de transfert Resend (SCCs) |
| **Durée de conservation** | Jusqu'au désabonnement ou suppression du compte ; logs d'envoi Resend : 30 jours |
| **Mesures de sécurité** | Clé API Resend à accès restreint (email uniquement) ; lien de désabonnement dans chaque email marketing ; gestion audience Resend |
| **Sous-traitants** | Resend Inc. |

**Action** : Vérifier et documenter les Clauses Contractuelles Types avec Resend pour le transfert hors UE.

---

## TRAITEMENT N°6 — Gestion des demandes de contact

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Formulaire de contact |
| **Finalité** | Traitement des demandes d'information et support utilisateur |
| **Base légale** | Consentement (art. 6(1)(a)), intérêt légitime (art. 6(1)(f)) |
| **Catégories de personnes** | Toute personne remplissant le formulaire de contact |
| **Catégories de données** | Nom, prénom, email, type de mandat, taille de collectivité, objet, message |
| **Données sensibles (art. 9)** | Potentiellement — le message peut contenir des données sensibles incidentes |
| **Destinataires** | Aline Weber (traitement interne), Resend (routage email) |
| **Transfert hors UE** | Resend Inc. (USA) |
| **Durée de conservation** | 3 ans à compter de la dernière interaction |
| **Mesures de sécurité** | Transmission HTTPS ; accès restreint à la boîte email de traitement |
| **Sous-traitants** | Resend Inc. |

---

## TRAITEMENT N°7 — Hébergement et infrastructure

| Champ | Valeur |
|-------|--------|
| **Nom du traitement** | Hébergement de l'application et logs serveur |
| **Finalité** | Fonctionnement technique du service, sécurité, débogage |
| **Base légale** | Intérêt légitime (art. 6(1)(f)) — nécessaire au bon fonctionnement du service |
| **Catégories de personnes** | Tous les visiteurs et utilisateurs du site |
| **Catégories de données** | Adresses IP, logs de requêtes, user-agent, timestamps |
| **Données sensibles (art. 9)** | Non |
| **Destinataires** | Vercel Inc. (hébergement application) |
| **Transfert hors UE** | Vercel Inc. (USA) — edge network global ; vérifier les garanties SCCs |
| **Durée de conservation** | Logs Vercel : 30 jours automatique |
| **Mesures de sécurité** | HTTPS obligatoire, headers de sécurité (CSP, HSTS), pas de cookies de tracking tiers |
| **Sous-traitants** | Vercel Inc. |

---

## REGISTRE DES SOUS-TRAITANTS

| Sous-traitant | Pays | Rôle | Garanties transfert |
|---------------|------|------|---------------------|
| Supabase Inc. | USA / EU (Frankfurt) | BDD, Auth | Region EU sélectionnée |
| Mistral AI SAS | France (UE) | API IA | Intra-UE, DPA à signer |
| Stripe Inc. | USA | Paiement | SCCs + PCI-DSS |
| Resend Inc. | USA | Email | SCCs à vérifier |
| Vercel Inc. | USA | Hébergement | SCCs à vérifier |

---

## DROITS DES PERSONNES — PROCÉDURES

| Droit | Article RGPD | Procédure MARYAN |
|-------|-------------|------------------|
| Accès | Art. 15 | Email à aline@etjaicrie.com → export données dans 30 jours |
| Rectification | Art. 16 | Email ou depuis le compte → correction immédiate |
| Effacement | Art. 17 | Bouton "Supprimer mon compte" → suppression en cascade dans Supabase + unsubscribe Resend |
| Portabilité | Art. 20 | Email → export JSON des données du compte |
| Opposition | Art. 21 | Email → traitement sous 30 jours |
| Limitation | Art. 18 | Email → gel du traitement pendant examen |

**Contact RGPD :** aline@etjaicrie.com
**Autorité de contrôle :** CNIL — https://www.cnil.fr

---

## HISTORIQUE DES MISES À JOUR

| Date | Version | Modification |
|------|---------|-------------|
| Avril 2026 | 1.0 | Création initiale |

---

*Document confidentiel — Usage interne MARYAN*
*Aline Weber — Responsable de traitement*
