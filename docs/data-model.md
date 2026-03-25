# Schéma de données minimum

## Table `users`
- id
- email
- first_name (optionnel)
- commune_size (optionnel)
- mandate_type (optionnel)
- created_at
- consent_newsletter
- consent_privacy

## Table `diagnostic_sessions`
- id
- user_id (nullable si anonyme avant capture)
- started_at
- completed_at
- source
- current_step
- profile_result
- maturity_score
- isolation_score
- communication_score
- institutional_confidence_score
- premium_intent_score

## Table `diagnostic_answers`
- id
- diagnostic_session_id
- question_key
- answer_value
- answer_label

# Schéma de données minimum

## Table `users`
- id
- email
- first_name (optionnel)
- commune_size (optionnel)
- mandate_type (optionnel)
- created_at
- consent_newsletter
- consent_privacy
- is_subscribed (boolean, pour accès au dashboard)
- subscription_plan (free, premium, plus)
- subscription_start_date
- subscription_renewal_date
- last_diagnostic_profile (lien vers le dernier profil diagnostique)

## Table `diagnostic_sessions`
- id
- user_id (nullable si anonyme avant capture)
- started_at
- completed_at
- source
- current_step
- profile_result
- maturity_score
- isolation_score
- communication_score
- institutional_confidence_score
- premium_intent_score

## Table `diagnostic_answers`
- id
- diagnostic_session_id
- question_key
- answer_value
- answer_label

## Table `resources`
- id
- slug
- title
- summary
- body
- category
- audience
- access_level (free/premium)
- theme
- urgency_level
- published

## Table `recommendations`
- id
- profile_key
- title
- description
- cta_type
- cta_target

## Table `crm_segments`
- id
- user_id
- main_need
- profile_key
- lead_temperature
- offer_fit
- last_activity_at

## Table `chat_sessions` (optionnel MVP+)
- id
- user_id
- started_at
- topic
- last_message_at

## Table `comptes_rendus` (NOUVEAU - Abonnés uniquement)
Archivage et classification des comptes rendus de réunion

- id
- user_id (required)
- title (titre du CR)
- content (contenu markdown)
- date_reunion (date de la réunion)
- created_at
- updated_at
- tags (array : thèmes, sujets)
- type (réunion_conseil, réunion_interne, réunion_citoyenne, etc.)
- participants (array : noms des participants)
- follow_up_items (array : actions à suivre avec responsables)
- archived (boolean)
- linked_resources (array : IDs de ressources MARYAN connexes)
- linked_discussions (array : IDs de discussions copilote associées)

## Table `discussions` (NOUVEAU - Historique copilote abonnés)
Archive des discussions avec le copilote MARYAN, organisées par thème

- id
- user_id (required)
- copilote_session_id (session UUID du copilote)
- title (titre/résumé de la discussion, généré ou manuel)
- messages (array : [{ role: 'user'|'assistant', content, timestamp }])
- theme (sujet principal : budget, personnel, gouvernance, etc.)
- created_at
- updated_at
- archived (boolean)
- tagged_as_useful (boolean, pour favoris)
- linked_comptes_rendus (array : IDs de CR associés)
- summary_generated (résumé IA de la discussion)

## Table `user_library` (NOUVEAU - Bibliothèque personnalisée)
Association entre utilisateurs et ressources favorites/recommandées

- id
- user_id (required)
- resource_id (lien vers `resources`)
- diagnostic_profile (le profil qui a recommandé cette ressource)
- status (unread, reading, completed, favorite)
- added_at
- completed_at (nullable)
- user_notes (notes personnelles de l'utilisateur)
- relevance_score (score de pertinence pour le profil, 0-10)

## Profils de sortie possibles
- elu_debutant_isole
- adjoint_sous_pression
- elu_en_difficulte_de_parole_publique
- elu_desoriente_sur_le_fonctionnement_local
- elu_cherchant_outils_et_ressources
- besoin_methode
- surcharge
- isolement
- exposition
- arbitrage
- gouvernance
- tension_relationnelle

## Relations clés
- `users` → `diagnostic_sessions` : 1:N (un utilisateur, plusieurs diagnostics)
- `users` → `comptes_rendus` : 1:N (un abonné, plusieurs CR)
- `users` → `discussions` : 1:N (un abonné, plusieurs discussions)
- `users` → `user_library` : 1:N (favoris personnalisés)
- `resources` → `user_library` : 1:N (une ressource pour plusieurs utilisateurs)
- `comptes_rendus` ↔ `discussions` : N:N (un CR peut être associé à plusieurs discussions)
- `discussions` ↔ `resources` : N:N (une discussion peut recommander plusieurs ressources)

## Migrations pour les abonnés

### V1.0 → V1.1 (Ajout support abonnement)
```sql
ALTER TABLE users ADD COLUMN is_subscribed BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN subscription_plan VARCHAR(50) DEFAULT 'free';
ALTER TABLE users ADD COLUMN subscription_start_date TIMESTAMP;
ALTER TABLE users ADD COLUMN subscription_renewal_date TIMESTAMP;
ALTER TABLE users ADD COLUMN last_diagnostic_profile VARCHAR(100);

CREATE TABLE comptes_rendus (...);
CREATE TABLE discussions (...);
CREATE TABLE user_library (...);
```
