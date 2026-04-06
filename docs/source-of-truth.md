# Source de vérité — MARYAN

## 1) Profil et diagnostic (backend)

Table canonique : `profiles`

Champs courants (actifs) :

- `first_name`, `commune`, `role`, `plan`
- `parti_id`, `parti_label`
- `diagnostic_key`, `diagnostic_label`, `diagnostic_completed`
- `last_diagnostic_summary`
- `profile_context`, `profile_context_updated_at`

Règle :

- Le diagnostic persisté doit être synchronisé via `profile_context.diagnostic`.
- `diagnostic_key` et `diagnostic_label` sont des index d’accès rapide alignés avec `profile_context.diagnostic`.

## 2) Profil et diagnostic (front)

Clés locales canoniques :

- `maryan_profile`
- `maryan_v4_diag`

Règle :

- `maryan_v4_diag` est la source locale du diagnostic courant.
- `maryan_profile` est dérivé/synchronisé depuis le diagnostic et le profil backend.

## 3) API à utiliser

Chemin unique recommandé pour la personnalisation :

- `GET /api/profile-context`
- `POST /api/profile-context`

`/api/profile-update` reste limité aux champs d’identité simple (`first_name`, `commune`, `role`, `parti_id`, `parti_label`) et ne doit plus être utilisé pour le diagnostic.

## 4) Compatibilité legacy

Champs legacy encore présents dans le schéma :

- `diagnostic_profile`
- `diagnostic_payload`
- `diagnostic_completed_at`

Règle :

- Ces champs ne sont plus la source primaire.
- L’export utilisateur les expose sous `profile.legacy_diagnostic` pour traçabilité.
