# ADR 001 — Choix de stack technique

**Date** : 2026-04-16
**Statut** : Accepté
**Décideurs** : Équipe projet Alterages

## Contexte

Le projet Alterages vise à construire une plateforme d'accompagnement s'adressant à trois publics (bénéficiaires, aidants, intervenants) avec quatre interfaces : site vitrine, back-office admin, espace personnel web et application mobile. La contrainte majeure est de pouvoir livrer vite avec une équipe réduite (potentiellement un seul développeur au démarrage) tout en maintenant une base de code saine et scalable jusqu'à plusieurs milliers d'utilisateurs.

## Décisions

### Frontend

- **Next.js 14 (App Router)** pour le site vitrine et le back-office admin. Rendu serveur, SEO, routage filesystem.
- **Expo (SDK 51+) avec React Native + React Native Web** pour l'espace personnel web et l'app mobile. Un seul codebase pour iOS, Android et web.
- **TypeScript strict** obligatoire dans tout le monorepo.
- **shadcn/ui + Tailwind CSS** pour Next.js.
- **Tamagui** pour Expo — choisi pour ses performances (compiler) et sa maturité cross-platform (web + native).
- **react-hook-form + Zod** pour les formulaires et la validation.
- **TanStack Query** pour le cache des requêtes.

### Backend

- **Supabase** comme backend principal : PostgreSQL, Auth, Storage, Realtime, Row Level Security, Edge Functions.
- **Supabase CLI** pour les migrations versionnées.

### Intégrations

- **Stripe Checkout** pour les paiements (simplifie la conformité PCI).
- **Daily.co** pour la visioconférence (API appelée exclusivement côté serveur via Edge Functions).
- **Resend** pour les emails transactionnels.
- **Sentry** pour le suivi des erreurs.

### Infrastructure

- **Vercel** pour les deux apps web.
- **Expo EAS** pour les builds iOS/Android.
- **Supabase Cloud** pour le backend.
- **GitHub Actions** pour la CI/CD.

### Monorepo

- **pnpm workspaces** + **Turborepo**.
- Structure : `apps/{web,mobile}` + `packages/{shared,config/*}` + `supabase/` + `docs/`.

## Principe fondamental : couche d'abstraction API

**Aucun appel direct à Supabase n'est autorisé depuis un composant ou un écran**. Tous les appels transitent par `packages/shared/src/api/*.ts`. Cette règle protège le projet d'un verrouillage sur Supabase et permet de migrer ou de tester indépendamment la couche de données.

## Sécurité

- Row Level Security activée sur **toutes** les tables, sans exception.
- Logique de permissions dupliquée en TypeScript dans `packages/shared/src/permissions/` pour les tests et la cohérence.
- Secrets jamais dans le code — uniquement dans les variables d'environnement.
- Validation systématique côté serveur (Zod dans les Edge Functions), même si déjà validée côté client.

## Alternatives considérées

- **create-t3-turbo** comme template de départ : écarté car orienté tRPC + Prisma, ce qui entrait en conflit avec l'approche Supabase direct + couche d'abstraction maison.
- **gluestack-ui** pour Expo : écarté au profit de Tamagui pour ses performances et son écosystème plus mature côté web.
- **Backend custom** (NestJS, Fastify) : écarté pour ne pas alourdir la maintenance en équipe réduite.

## Planning recommandé

Voir le document `projet-architecture.md` section 8 pour les cinq phases (fondations, MVP, fonctionnalités avancées, pré-lancement, lancement).

## Conséquences

- La couche d'abstraction API doit être respectée dès le premier écran — c'est une règle non négociable.
- Tout nouveau fichier de migration doit être accompagné d'une documentation RLS dans `docs/rls-policies/`.
- Chaque décision d'architecture majeure ultérieure fait l'objet d'un nouvel ADR.
