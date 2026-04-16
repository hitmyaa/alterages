# Alterages

Plateforme d'accompagnement à destination des **bénéficiaires**, **aidants familiaux** et **intervenants professionnels**. Monorepo regroupant :

- **`apps/web`** — Site vitrine public + back-office administrateur (Next.js 14).
- **`apps/mobile`** — Espace personnel des utilisateurs (Expo / React Native + Web).
- **`packages/shared`** — Code métier partagé : couche d'abstraction API, client Supabase, types, validateurs Zod, logique de permissions.
- **`packages/config/*`** — Configurations partagées (TypeScript, ESLint, Tailwind).
- **`supabase/`** — Migrations SQL, Edge Functions, configuration locale.
- **`docs/`** — ADR, documentation base de données, policies RLS, runbooks.

## Démarrage rapide

```bash
# Prérequis : Node >= 20, pnpm >= 10
pnpm install

# Lancer l'app web (site vitrine + admin) sur http://localhost:3000
pnpm dev:web

# Lancer l'app mobile (Expo) — à configurer avant usage
pnpm dev:mobile
```

## Scripts globaux

| Script | Description |
|--------|-------------|
| `pnpm dev` | Lance toutes les apps en parallèle |
| `pnpm dev:web` | Lance uniquement Next.js |
| `pnpm dev:mobile` | Lance uniquement Expo |
| `pnpm build` | Build de production pour toutes les apps |
| `pnpm lint` | ESLint sur tout le monorepo |
| `pnpm typecheck` | Vérification TypeScript sur tout le monorepo |
| `pnpm format` | Formatte le code avec Prettier |

## Architecture

Voir [`docs/architecture/001-choix-stack.md`](docs/architecture/001-choix-stack.md) pour les décisions d'architecture.

**Règle absolue** : aucun appel direct à Supabase depuis un composant ou un écran. Tous les appels passent par [`packages/shared/src/api/`](packages/shared/src/api/).

## Environnements

Trois environnements Supabase strictement séparés :

- **Développement** — base `alterages-dev`, utilisée localement uniquement
- **Staging** — base `alterages-staging`, déployée depuis la branche `staging`
- **Production** — base `alterages-prod`, déployée depuis la branche `main`

Copier `.env.example` en `.env.local` dans chaque app et remplir les valeurs.

## Statut

Phase 1 — fondations. Voir le [plan de développement](docs/architecture/001-choix-stack.md#planning-recommandé).
