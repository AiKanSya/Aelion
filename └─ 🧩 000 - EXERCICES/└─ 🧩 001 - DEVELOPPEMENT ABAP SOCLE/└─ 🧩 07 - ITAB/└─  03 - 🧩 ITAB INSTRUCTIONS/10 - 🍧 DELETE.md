# 🌸 EXERCICES — DELETE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [DELETE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/10 - 🍧 DELETE.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **DELETE**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le fonctionnement de l’instruction `DELETE` pour les tables internes dans un exemple différent de celui du cours.
- [ ] Savoir supprimer des lignes en fonction de l’index, de la clé ou d’une condition `WHERE` dans un exemple différent de celui du cours.
- [ ] Identifier les limitations selon le type de table interne dans un exemple différent de celui du cours.
- [ ] Utiliser DELETE de manière sûre et performante dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – DELETE PAR INDEX

> [!IMPORTANT]
> supprimer la première ligne de lt_country.

<details>
  <summary>SOLUTION</summary>

    DELETE lt_country INDEX 1.

</details>

---

### 🍧 2 – DELETE PAR STRUCTURE / CLE

> [!IMPORTANT]
> supprimer la ligne avec LAND = 'IT'.

<details>
  <summary>SOLUTION</summary>

    CLEAR ls_country-land.
    ls_country-land = 'IT'.
    DELETE lt_country FROM ls_country.

</details>

---

### 🍧 3 – DELETE AVEC WHERE

> [!IMPORTANT]
> supprimer toutes les lignes où AGE < 25.

<details>
  <summary>SOLUTION</summary>

    DELETE lt_country WHERE age < 25.

</details>

---

### 🍧 4 – COMPARAISON DES METHODES

> [!IMPORTANT]
> expliquer quand utiliser INDEX, FROM, WHERE.

<details>
  <summary>Explication</summary>

- `DELETE INDEX` : rapide, applicable uniquement aux STANDARD TABLE
- `DELETE FROM` : supprime la ligne correspondant à la clé ou à la structure
- `DELETE WHERE` : supprime toutes les lignes correspondant à un critère, utile pour des suppressions conditionnelles
- Utiliser WHERE pour des suppressions multiples et INDEX/FROM pour des suppressions ciblées

</details>

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **DELETE**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
