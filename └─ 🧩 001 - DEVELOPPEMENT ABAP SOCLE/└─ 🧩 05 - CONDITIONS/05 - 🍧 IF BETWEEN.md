# 🌸 BETWEEN

## 🌺 OBJECTIFS

- [ ] Comprendre l'utilisation de `BETWEEN` pour tester si une variable est dans une plage
- [ ] Savoir appliquer `BETWEEN low AND high` avec `IF`
- [ ] Savoir appliquer `BETWEEN low AND high` avec `CASE`
- [ ] Simplifier les comparaisons numériques grâce à `BETWEEN`
- [ ] Combiner `BETWEEN` avec d'autres tests comme `IS INITIAL` pour des conditions robustes

## 🌺 DEFINITION

> L’instruction `BETWEEN` permet de tester si une variable se situe dans une plage de valeurs.
>
> - `BETWEEN low AND high` retourne vrai si la variable est comprise entre `low` et `high` inclusivement.
> - Peut être utilisé avec `IF` ou `CASE`.

> [!TIP]
> comme vérifier si une valeur se situe entre deux bornes sur une règle graduée

> [!IMPORTANT]
> idéal pour tester des intervalles de scores, des âges, ou toute variable numérique devant respecter une plage précise

## 🌺 SYNTAXE

### AVEC IF

    WRITE:/ '     - BETWEEN + IF...'.

    DATA: lv_variable TYPE i.

    IF lv_variable BETWEEN 1 AND 100.
      WRITE: 'La variable lv_variable est comprise entre 1 et 100.'.
    ELSE.
      WRITE: 'La variable lv_variable n''est pas comprise entre 1 et 100.'.
    ENDIF.

> [!IMPORTANT]
> Plutôt que d’écrire `IF lv_variable >= 1 AND lv_variable <= 100`, `BETWEEN` simplifie la lecture et réduit le risque d’erreur.

### AVEC CASE

    WRITE:/ '     - BETWEEN + CASE...'.

    DATA: lv_variable TYPE i.

    CASE lv_variable.
      WHEN BETWEEN 1 AND 100.
        WRITE: 'La variable lv_variable est comprise entre 1 et 100.'.
      WHEN OTHERS.
        WRITE: 'La variable lv_variable n''est pas comprise entre 1 et 100.'.
    ENDCASE.

> [!TIP]
> Le `BETWEEN` est compatible avec `WHEN` dans un `CASE`, ce qui rend les blocs plus lisibles pour les plages numériques.

## 🌺 RESUME

> - `BETWEEN low AND high` teste si une variable est comprise entre deux valeurs inclusives.
> - Fonctionne avec `IF` et `CASE`.
> - Simplifie les conditions comparatives sur des plages numériques.
>
> [!TIP]
> comme vérifier si une valeur se situe entre deux bornes sur une règle graduée, plus lisible et moins sujet aux erreurs que plusieurs comparaisons séparées
