# Documentation base de données

Ce dossier contient la documentation du modèle de données Alterages.

## Convention

- Un fichier Markdown par domaine fonctionnel (ex : `profiles.md`, `planning.md`, `messagerie.md`).
- Chaque fichier décrit les tables, les relations, les champs sensibles et les règles métier côté base.
- Les migrations SQL correspondantes vivent dans [`supabase/migrations/`](../../supabase/migrations/).

## Tables principales (à affiner)

| Table             | Rôle                                          |
| ----------------- | --------------------------------------------- |
| `profiles`        | Informations utilisateur (lié à `auth.users`) |
| `user_roles`      | Rôles d'un utilisateur (multi-rôles supporté) |
| `beneficiaries`   | Informations spécifiques aux bénéficiaires    |
| `caregivers`      | Informations spécifiques aux aidants          |
| `professionals`   | Informations spécifiques aux intervenants     |
| `relationships`   | Liens bénéficiaires ↔ aidants ↔ intervenants  |
| `planning_events` | Événements de planning                        |
| `journal_entries` | Entrées de journal de bord                    |
| `conversations`   | Groupes de messagerie                         |
| `messages`        | Messages temps réel                           |
| `documents`       | Documents partagés                            |
| `payments`        | Historique des transactions                   |
| `subscriptions`   | Abonnements actifs                            |
| `audit_log`       | Journal d'audit des actions sensibles         |

## Types TypeScript

Les types sont générés depuis le schéma Supabase :

```bash
pnpm supabase gen types typescript --project-id <project-id> > packages/shared/src/types/database.ts
```
