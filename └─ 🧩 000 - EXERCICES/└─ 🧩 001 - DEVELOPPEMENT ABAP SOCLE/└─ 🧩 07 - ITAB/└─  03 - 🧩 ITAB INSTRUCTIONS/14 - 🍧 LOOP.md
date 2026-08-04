# 🌸 EXERCICES — LOOP AT

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [LOOP AT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/14 - 🍧 LOOP.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **LOOP AT**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Parcourir une table interne ligne par ligne avec `LOOP AT` dans un exemple différent de celui du cours.
- [ ] Utiliser les options `INTO`, `ASSIGNING <fs>` et `TRANSPORTING NO FIELDS` dans un exemple différent de celui du cours.
- [ ] Filtrer avec `WHERE`, `FROM` et `TO` dans un exemple différent de celui du cours.
- [ ] Déclarer dynamiquement les structures et FIELD-SYMBOLS pour plus de flexibilité dans un exemple différent de celui du cours.
- [ ] Modifier directement les lignes via FIELD-SYMBOLS dans un exemple différent de celui du cours.
- [ ] Comprendre les variables système `SY-SUBRC` et `SY-TABIX` dans un exemple différent de celui du cours.
- [ ] Utiliser les ruptures `AT FIRST`, `AT NEW`, `AT END OF`, `AT LAST` dans un exemple différent de celui du cours.
- [ ] Utiliser des filtres complexes avec `WHERE` sur un ou plusieurs champs dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – WHERE SUR UN SEUL CHAMP

> [!IMPORTANT]
> Parcourir `lt_citizen` et afficher les citoyens dont `country = 'FR'`.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_citizen INTO ls_citizen WHERE country = 'FR'.
      WRITE:/ 'Pays:', ls_citizen-country, 'Nom:', ls_citizen-name.
    ENDLOOP.

</details>

---

### 🍧 2 – WHERE SUR PLUSIEURS CHAMPS

> [!IMPORTANT]
> Afficher les citoyens dont `country = 'ES'` et `age > 30`.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_citizen ASSIGNING <lfs_citizen> WHERE country = 'ES' AND age > '30'.
      WRITE:/ 'Nom:', <lfs_citizen>-name, 'Pays:', <lfs_citizen>-country, 'Âge:', <lfs_citizen>-age.
    ENDLOOP.

</details>

---

### 🍧 3 – WHERE AVEC PLAGE D’AGE

> [!IMPORTANT]
> Afficher les citoyens âgés entre 25 et 32 ans.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_citizen INTO ls_citizen WHERE age >= '25' AND age <= '32'.
      WRITE:/ 'Nom:', ls_citizen-name, 'Âge:', ls_citizen-age.
    ENDLOOP.

</details>

---

### 🍧 4 – WHERE DYNAMIQUE

> [!IMPORTANT]
> Afficher tous les citoyens dont `country = lv_country` et `age > 30`.

<details>
  <summary>SOLUTION</summary>

    DATA: lv_country TYPE char3 VALUE 'ES'.

    LOOP AT lt_citizen ASSIGNING FIELD-SYMBOLS(<dyn_citizen>) WHERE country = lv_country AND age > '30'.
      WRITE:/ 'Nom:', <dyn_citizen>-name, 'Pays:', <dyn_citizen>-country, 'Âge:', <dyn_citizen>-age.
    ENDLOOP.

</details>

---

### 🍧 5 – WHERE COMPLEXE AVEC OR ET AND

> [!IMPORTANT]
> Afficher tous les citoyens dont `country = 'BR'` ou `country = 'IT'` et `age < 30`.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_citizen INTO ls_citizen WHERE (country = 'BR' OR country = 'IT') AND age < '30'.
      WRITE:/ 'Nom:', ls_citizen-name, 'Pays:', ls_citizen-country, 'Âge:', ls_citizen-age.
    ENDLOOP.

</details>

---

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **LOOP AT**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
