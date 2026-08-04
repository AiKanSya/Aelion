# 🌸 EXERCICES — DELETE ADJACENT DUPLICATES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [DELETE ADJACENT DUPLICATES](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/11 - 🍧 DELETE ADJACENT DUPLICATES.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **DELETE ADJACENT DUPLICATES**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le fonctionnement de `DELETE ADJACENT DUPLICATES` dans un exemple différent de celui du cours.
- [ ] Savoir supprimer les doublons dans une table interne selon une clé ou des champs spécifiques dans un exemple différent de celui du cours.
- [ ] Identifier les contraintes liées au type de table et à l’ordre des données dans un exemple différent de celui du cours.
- [ ] Utiliser correctement `COMPARING` pour sélectionner les champs pertinents dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – SUPPRIMER LES DOUBLONS SUR SORTED TABLE

> [!IMPORTANT]
> supprimer les doublons consécutifs sur la clé country.

<details>
  <summary>SOLUTION</summary>

    DELETE ADJACENT DUPLICATES FROM lt_citizen.

</details>

### 🍧 2 – SUPPRIMER LES DOUBLONS SUR STANDARD TABLE

> [!IMPORTANT]
> supprimer les doublons consécutifs sur le champ country.

<details>
  <summary>SOLUTION</summary>

    SORT lt_citizen_std BY country.
    DELETE ADJACENT DUPLICATES FROM lt_citizen_std COMPARING country.

</details>

### 🍧 3 – SUPPRIMER LES DOUBLONS SUR PLUSIEURS CHAMPS

> [!IMPORTANT]
> supprimer les doublons où country et age sont identiques.

<details>
  <summary>SOLUTION</summary>

    SORT lt_citizen_std BY country age.
    DELETE ADJACENT DUPLICATES FROM lt_citizen_std COMPARING country age.

</details>

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **DELETE ADJACENT DUPLICATES**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
