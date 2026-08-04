# 🌸 EXERCICES — TYPE RANGE OF

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TYPE RANGE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/04 - 🍧 ITAB TYPE RANGE.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **TYPE RANGE OF**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le rôle d’une `RANGE TABLE` dans un exemple différent de celui du cours.
- [ ] Identifier les champs prédéfinis : `SIGN`, `OPTION`, `LOW`, `HIGH` dans un exemple différent de celui du cours.
- [ ] Comprendre la notion d’inclusion/exclusion et d’intervalles dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – CREER UNE RANGE TABLE DE PRODUITS

> [!IMPORTANT]
> Déclarer une `RANGE TABLE` `lr_prod` pour le type `matnr`.
> Ajouter un intervalle inclus de 500 à 1000 et une exclusion pour 750.

<details>
  <summary>SOLUTION</summary>

    DATA: lr_prod TYPE RANGE OF matnr,
          ls_prod TYPE LINE OF lr_prod.

    " Inclure 500 à 1000
    ls_prod-sign   = 'I'.
    ls_prod-option = 'BT'.
    ls_prod-low    = '500'.
    ls_prod-high   = '1000'.
    APPEND ls_prod TO lr_prod.

    " Exclure 750
    ls_prod-sign   = 'E'.
    ls_prod-option = 'EQ'.
    ls_prod-low    = '750'.
    ls_prod-high   = ''.
    APPEND ls_prod TO lr_prod.

</details>

---

### 🍧 2 – AJOUTER UN NOUVEL INTERVALLE

> [!IMPORTANT]
> Ajouter un intervalle inclus de 1100 à 1200 et afficher la `RANGE TABLE`.

<details>
  <summary>SOLUTION</summary>

    ls_prod-sign   = 'I'.
    ls_prod-option = 'BT'.
    ls_prod-low    = '1100'.
    ls_prod-high   = '1200'.
    APPEND ls_prod TO lr_prod.

    LOOP AT lr_prod INTO ls_prod.
      WRITE: / 'SIGN:', ls_prod-sign,
               'OPTION:', ls_prod-option,
               'LOW:', ls_prod-low,
               'HIGH:', ls_prod-high.
    ENDLOOP.

</details>

---

### 🍧 3 – AJOUTER UNE EXCLUSION

> [!IMPORTANT]
> Exclure le produit 1120 et afficher toute la `RANGE TABLE`.

<details>
  <summary>SOLUTION</summary>

    ls_prod-sign   = 'E'.
    ls_prod-option = 'EQ'.
    ls_prod-low    = '1120'.
    ls_prod-high   = ''.
    APPEND ls_prod TO lr_prod.

    LOOP AT lr_prod INTO ls_prod.
      WRITE: / 'SIGN:', ls_prod-sign,
               'OPTION:', ls_prod-option,
               'LOW:', ls_prod-low,
               'HIGH:', ls_prod-high.
    ENDLOOP.

</details>

> [!CAUTION]
> L’ordre des lignes n’a pas d’importance. Chaque ligne est évaluée lors du filtrage.

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **TYPE RANGE OF**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
