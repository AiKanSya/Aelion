# 🌸 EXERCICES — MODIFY WHERE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MODIFY WHERE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/06 - 🍧 MODIFY WHERE.md>)

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter le cours lors du premier essai.
- Produire une preuve vérifiable : code, résultat, capture ou explication structurée.
- Consulter le cours uniquement après avoir identifié précisément le blocage.
- Ne pas utiliser la solution de l'évaluation finale comme exemple.

## 🌺 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir **MODIFY WHERE**, expliquer son utilité et citer une erreur d'utilisation possible.

## 🌺 EXERCICE 2 — MISE EN PRATIQUE

- [ ] Comprendre le fonctionnement de `MODIFY ... WHERE` dans un exemple différent de celui du cours.
- [ ] Savoir modifier des lignes spécifiques d’une table interne en utilisant une condition dans un exemple différent de celui du cours.
- [ ] Identifier la différence avec `MODIFY INDEX` et `MODIFY TABLE` dans un exemple différent de celui du cours.
- [ ] Utiliser TRANSPORTING pour limiter les champs modifiés dans un exemple différent de celui du cours.

### Exercice repris du cours

### 🍧 1 – MODIFIER PAR CONDITION SIMPLE

> [!IMPORTANT]
> Modifier l’âge des pays `'FR'` à 35.

<details>
  <summary>SOLUTION</summary>

    CLEAR ls_country-land.
    ls_country-age = 35.
    MODIFY lt_country FROM ls_country TRANSPORTING age
                      WHERE land = 'FR'.

</details>

---

### 🍧 2 – MODIFIER PLUSIEURS LIGNES AVEC CONDITION

> [!IMPORTANT]
> Ajouter 5 ans à tous les pays dont l’âge est inférieur à 30.

<details>
  <summary>SOLUTION</summary>

    LOOP AT lt_country INTO ls_country.
      IF ls_country-age < 30.
        ls_country-age = ls_country-age + 5.
        MODIFY lt_country FROM ls_country TRANSPORTING age
                          WHERE land = ls_country-land.
      ENDIF.
    ENDLOOP.

</details>

---

### 🍧 3 – COMPARAISON AVEC MODIFY TABLE

> [!IMPORTANT]
> Expliquer la différence pratique entre `MODIFY TABLE` et `MODIFY WHERE`.

<details>
  <summary>Explication</summary>

- `MODIFY TABLE` : modifie une ligne via la clé
- `MODIFY WHERE` : modifie une ou plusieurs lignes via une condition
- WHERE est nécessaire lorsque la clé n’est pas connue ou plusieurs lignes doivent être mises à jour
- TRANSPORTING reste utile pour modifier uniquement certains champs

</details>

## 🌺 EXERCICE 3 — DIAGNOSTIC

1. Construire volontairement un cas incorrect lié à **MODIFY WHERE**.
2. Décrire le symptôme observable.
3. Identifier la cause technique ou fonctionnelle.
4. Corriger le cas et prouver la non-régression avec un cas nominal et un cas limite.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le résultat peut être expliqué sans relire le cours.
- [ ] L'exemple est exécutable ou vérifiable.
- [ ] Le cas d'erreur est distingué du cas nominal.
- [ ] Aucun élément propre à la solution de l'évaluation finale n'est utilisé.
