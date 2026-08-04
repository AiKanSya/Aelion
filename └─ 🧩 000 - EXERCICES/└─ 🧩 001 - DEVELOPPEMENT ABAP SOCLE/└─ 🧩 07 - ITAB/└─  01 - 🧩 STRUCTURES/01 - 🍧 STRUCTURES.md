# 🌸 EXERCICES — STRUCTURE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [STRUCTURE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  01 - 🧩 STRUCTURES/01 - 🍧 STRUCTURES.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **STRUCTURE**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre ce qu’est une `STRUCTURE` et à quoi elle sert dans un exemple différent de celui du cours.
- [ ] Savoir déclarer une `STRUCTURE` avec `TYPES` et `DATA` dans un exemple différent de celui du cours.
- [ ] Savoir remplir les champs d’une `STRUCTURE` dans un exemple différent de celui du cours.
- [ ] Accéder aux valeurs des champs pour lecture ou affichage dans un exemple différent de celui du cours.
- [ ] Appliquer des structures pour organiser des données hétérogènes dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – CREER UNE STRUCTURE POUR UN LIVRE

> [!IMPORTANT]
> Définir une `STRUCTURE ty_livre` avec les champs
>
> - titre (CHAR30)
> - auteur (CHAR30)
> - annee (I)
> - genre (CHAR20)
>   Déclarer une `VARIABLE ls_livre` et remplir les champs avec vos informations.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_livre,
             titre  TYPE char30,
             auteur TYPE char30,
             annee  TYPE i,
             genre  TYPE char20,
           END OF ty_livre.

    DATA: ls_livre TYPE ty_livre.

    ls_livre-titre  = '1984'.
    ls_livre-auteur = 'George Orwell'.
    ls_livre-annee  = 1949.
    ls_livre-genre  = 'Dystopie'.

    WRITE: / ls_livre-titre, ls_livre-auteur, ls_livre-annee, ls_livre-genre.

</details>

---

### 🍧 2 – ACCEDER A UN CHAMP

> [!IMPORTANT]
> Afficher uniquement l’auteur du livre précédemment déclaré.

<details>
  <summary>SOLUTION</summary>

    WRITE: / ls_livre-auteur.

> [!IMPORTANT]
> Résultat : George Orwell

</details>

---

### 🍧 3 – MODIFIER UN CHAMP

> [!IMPORTANT]
> Modifier l’année de publication à 1950 et afficher la nouvelle valeur.

<details>
  <summary>SOLUTION</summary>

    ls_livre-annee = 1950.
    WRITE: / ls_livre-annee.

> [!IMPORTANT]
> Résultat : 1950

</details>

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **STRUCTURE**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
