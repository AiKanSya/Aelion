# 🌸 EXERCICES — BINARY SEARCH

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [BINARY SEARCH](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/13 - 🍧 BINARY SEARCH.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **BINARY SEARCH**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre l’option `BINARY SEARCH` avec `READ TABLE` dans un exemple différent de celui du cours.
- [ ] Savoir l’utiliser pour optimiser les recherches dans une table interne dans un exemple différent de celui du cours.
- [ ] Connaître la condition nécessaire pour que la recherche binaire fonctionne dans un exemple différent de celui du cours.
- [ ] Identifier les avantages par rapport à une recherche linéaire dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – RECHERCHE BINAIRE SIMPLE + DECLARATION DYNAMIQUE EN FIELD-SYMBOL

> [!IMPORTANT]
> Trier `lt_citizen` par `country` puis `name` et lire l’enregistrement dont `country = 'ES'` et `name = 'Luis'` en utilisant `BINARY SEARCH`. Afficher `age`.

<details>
  <summary>SOLUTION</summary>

    SORT lt_citizen BY country name.

    READ TABLE lt_citizen WITH KEY country = 'ES' name = 'Luis' BINARY SEARCH ASSIGNING FIELD-SYMBOL(<lfs_citizen>).
    IF sy-subrc = 0.
      WRITE:/ 'Âge du citoyen Luis en ES :', <lfs_citizen>-age.
    ENDIF.

</details>

---

### 🍧 2 – VERIFIER L’EXISTENCE SANS COPIER

> [!IMPORTANT]
> Vérifier si un enregistrement `country = 'BR'` et `name = 'Renata'` existe dans `lt_citizen` avec `BINARY SEARCH`, sans copier la ligne (`TRANSPORTING NO FIELDS`). Afficher un message.

<details>
  <summary>SOLUTION</summary>

    READ TABLE lt_citizen WITH KEY country = 'BR' name = 'Renata' BINARY SEARCH TRANSPORTING NO FIELDS.
    IF sy-subrc = 0.
      WRITE:/ 'Enregistrement BR-Renata trouvé !'.
    ELSE.
      WRITE:/ 'Enregistrement BR-Renata non trouvé.'.
    ENDIF.

</details>

---

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **BINARY SEARCH**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
