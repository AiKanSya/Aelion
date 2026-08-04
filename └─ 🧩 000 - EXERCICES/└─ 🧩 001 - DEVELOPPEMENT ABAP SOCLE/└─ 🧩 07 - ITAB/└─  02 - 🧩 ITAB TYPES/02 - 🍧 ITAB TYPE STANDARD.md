# 🌸 EXERCICES — ITAB TYPE STANDARD TABLE OF

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ITAB TYPE STANDARD TABLE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/02 - 🍧 ITAB TYPE STANDARD.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **ITAB TYPE STANDARD TABLE OF**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre la différence entre `TYPE TABLE OF` et `TYPE STANDARD TABLE OF` dans un exemple différent de celui du cours.
- [ ] Savoir déclarer un type standard de table interne dans un exemple différent de celui du cours.
- [ ] Assimiler le comportement spécifique d’une table standard (index implicite, ordre d’insertion) dans un exemple différent de celui du cours.
- [ ] Identifier les cas d’usage pertinents dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – TABLE DE CLIENTS

> [!IMPORTANT]
> Déclarer une table standard `lt_clients` avec une structure `ty_client` contenant
>
> - nom (CHAR20)
> - prenom (CHAR20)
> - age (I)
> - ville (CHAR20)
>   Ajouter deux clients et afficher leurs noms.

<details>
  <summary>SOLUTION</summary>

    TYPES: BEGIN OF ty_client,
             nom    TYPE char20,
             prenom TYPE char20,
             age    TYPE i,
             ville  TYPE char20,
           END OF ty_client.

    DATA: lt_clients TYPE STANDARD TABLE OF ty_client,
          ls_client  TYPE ty_client.

    ls_client-nom = 'Martin'.
    ls_client-prenom = 'Claire'.
    ls_client-age = 28.
    ls_client-ville = 'Lyon'.
    APPEND ls_client TO lt_clients.

    ls_client-nom = 'Bernard'.
    ls_client-prenom = 'Paul'.
    ls_client-age = 45.
    ls_client-ville = 'Marseille'.
    APPEND ls_client TO lt_clients.

</details>

---

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **ITAB TYPE STANDARD TABLE OF**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
