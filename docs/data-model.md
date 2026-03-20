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
-
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

## Profils de sortie possibles
- elu_debutant_isole
- adjoint_sous_pression
- elu_en_difficulte_de_parole_publique
- elu_desoriente_sur_le_fonctionnement_local
- elu_cherchant_outils_et_ressources
