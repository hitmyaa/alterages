# Images du site vitrine AlterAges

Tout fichier déposé ici est servi **statiquement** par Next.js à l'URL
`/images/<nom-du-fichier>`.

Exemple : `public/images/hero.jpg` → accessible via `/images/hero.jpg` dans le
navigateur, ou `<Image src="/images/hero.jpg" />` dans le code.

## Fichiers attendus

Dépose les visuels ici avec exactement ces noms pour qu'ils soient pris en compte
sans modifier le code (ou modifie le code pour pointer vers d'autres fichiers).

### Hero

| Fichier | Emplacement dans le code | Dimensions conseillées |
|---|---|---|
| `hero.jpg` | Section hero, colonne droite (ratio 4:5) | 1200 × 1500 px, JPG optimisé ≤ 300 Ko |

### Cartes prescripteurs (3 cartes dans la section "Vous orientez…")

| Fichier | Carte | Dimensions |
|---|---|---|
| `prescripteurs/card-1.jpg` | Zéro charge administrative | 800 × 600 px |
| `prescripteurs/card-2.jpg` | Des étudiants formés | 800 × 600 px |
| `prescripteurs/card-3.jpg` | Un suivi de confiance | 800 × 600 px |

### Profils étudiants (4 portraits)

| Fichier | Profil | Dimensions |
|---|---|---|
| `etudiants/lea.jpg` | Léa, 22 ans | 300 × 300 px, carré |
| `etudiants/theo.jpg` | Théo, 24 ans | idem |
| `etudiants/camille.jpg` | Camille, 21 ans | idem |
| `etudiants/rayan.jpg` | Rayan, 26 ans | idem |

### Signature Faustine (section Contact)

| Fichier | Emplacement | Dimensions |
|---|---|---|
| `faustine.jpg` | Avatar dans la card sombre | 200 × 200 px, carré |

## Format conseillé

- **JPG** pour les photos (meilleur ratio poids/qualité)
- **WebP** si tu veux optimiser plus loin (supporté partout aujourd'hui)
- **PNG** seulement pour les illustrations avec transparence

## Activation côté code

Actuellement, la page utilise des dégradés colorés en placeholder. Une fois les
images déposées, je peux les câbler avec `<Image>` de Next.js (optimisation
automatique, lazy loading) — dis-moi quand c'est prêt.
