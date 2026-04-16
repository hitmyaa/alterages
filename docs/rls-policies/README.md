# Documentation des policies Row Level Security

Chaque table Supabase doit avoir RLS activée et ses policies documentées ici — **un fichier par table**.

## Format recommandé

```markdown
# Policies — `<nom_table>`

## Contexte
Brève description de ce que représente la table.

## Policies actives

### SELECT
- **Qui peut lire ?** — description
- **SQL** — lien vers la migration

### INSERT / UPDATE / DELETE
- idem

## Scénarios adversaires testés
- [ ] Utilisateur A ne peut pas voir les données de l'utilisateur B
- [ ] Aidant ne peut pas modifier les données d'un bénéficiaire auquel il n'est pas lié
- [ ] etc.
```

## Règles générales

- **RLS activée sur TOUTES les tables** sans exception.
- **Aucune policy `USING (true)`** en production (hors tables de référence publiques).
- **Tests adversaires** obligatoires : pour chaque policy, écrire un test qui vérifie qu'un utilisateur non autorisé ne peut **pas** accéder aux données.
- **Logique dupliquée en TypeScript** dans [`packages/shared/src/permissions/`](../../packages/shared/src/permissions/) pour la cohérence client/serveur.
