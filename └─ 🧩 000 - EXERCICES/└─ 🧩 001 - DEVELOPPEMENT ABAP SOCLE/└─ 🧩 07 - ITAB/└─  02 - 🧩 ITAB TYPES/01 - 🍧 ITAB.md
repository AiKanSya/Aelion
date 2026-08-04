# 🌸 EXERCICES — ITAB TYPE TABLE OF

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ITAB TYPE TABLE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/01 - 🍧 ITAB.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **ITAB TYPE TABLE OF**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre ce qu’est une `TABLE INTERNE` en ABAP dans un exemple différent de celui du cours.
- [ ] Déclarer un type de structure avec TYPES dans un exemple différent de celui du cours.
- [ ] Créer une variable de type structure pour les lignes dans un exemple différent de celui du cours.
- [ ] Créer une variable de type `TABLE INTERNE` dans un exemple différent de celui du cours.
- [ ] Remplir une `TABLE INTERNE` avec des données structurées dans un exemple différent de celui du cours.
- [ ] Assimiler l’analogie entre `TABLE INTERNE` et carnet d’adresses dans un exemple différent de celui du cours.
- [ ] Appliquer les bonnes pratiques pour manipuler les tables internes dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – CREER UNE TABLE INTERNE DE LIVRES

> [!IMPORTANT]
> Déclarer une `TABLE INTERNE` `lt_livres` avec une `STRUCTURE` `ty_livre` contenant
>
> - titre (CHAR30)
> - auteur (CHAR30)
> - annee (I)
> - genre (CHAR20)
>   Ajouter une ligne à la table.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_livre,
             titre  TYPE char30,
             auteur TYPE char30,
             annee  TYPE i,
             genre  TYPE char20,
           END OF ty_livre.

    DATA: lt_livres TYPE TABLE OF ty_livre,
          ls_livre TYPE ty_livre.

    ls_livre-titre  = '1984'.
    ls_livre-auteur = 'George Orwell'.
    ls_livre-annee  = 1949.
    ls_livre-genre  = 'Dystopie'.

    APPEND ls_livre TO lt_livres.

</details>

---

### 🍧 2 – AJOUTER UNE DEUXIEME LIGNE

> [!IMPORTANT]
> Ajouter un deuxième livre dans la même table `lt_livres`.

<details>
  <summary>SOLUTION</summary>

    ls_livre-titre  = 'Le Petit Prince'.
    ls_livre-auteur = 'Antoine de Saint-Exupéry'.
    ls_livre-annee  = 1943.
    ls_livre-genre  = 'Conte'.

    APPEND ls_livre TO lt_livres.

</details>

---

### 🍧 3 – CREER UNE TABLE DE CLIENTS

> [!IMPORTANT]
> Déclarer une `TABLE INTERNE lt_clients` avec une `STRUCTURE ty_client` contenant
>
> - nom (CHAR20)
> - prenom (CHAR20)
> - age (I)
> - ville (CHAR20)
>   Ajouter deux clients différents.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_client,
             nom    TYPE char20,
             prenom TYPE char20,
             age    TYPE i,
             ville  TYPE char20,
           END OF ty_client.

    DATA: lt_clients TYPE TABLE OF ty_client,
          ls_client TYPE ty_client.

    ls_client-nom    = 'Martin'.
    ls_client-prenom = 'Claire'.
    ls_client-age    = 28.
    ls_client-ville  = 'Lyon'.
    APPEND ls_client TO lt_clients.

    ls_client-nom    = 'Bernard'.
    ls_client-prenom = 'Paul'.
    ls_client-age    = 45.
    ls_client-ville  = 'Marseille'.
    APPEND ls_client TO lt_clients.

</details>

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **ITAB TYPE TABLE OF**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
