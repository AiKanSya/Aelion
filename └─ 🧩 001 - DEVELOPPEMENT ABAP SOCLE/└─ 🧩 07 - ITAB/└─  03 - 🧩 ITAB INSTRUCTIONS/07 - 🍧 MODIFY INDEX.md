# 🌸 MODIDFY WITH INDEX

## 🌺 OBJECTIFS

- [ ] Comprendre le fonctionnement de `MODIFY ... INDEX`
- [ ] Savoir modifier des lignes spécifiques d’une table interne en utilisant une condition
- [ ] Identifier la différence avec `MODIFY INDEX` et `MODIFY TABLE`
- [ ] Utiliser TRANSPORTING pour limiter les champs modifiés

## 🌺 DEFINITION

> Pour l’instruction MODIFY, il existe trois formes de syntaxe possibles.

```abap
MODIFY itab [INDEX idx] FROM ls
            [TRANSPORTING comp1 comp2 ...].
```

L’instruction `MODIFY` va modifier la table interne `itab` à partir de la structure `ls_`. Il est possible d’indiquer l’index de la ligne à modifier (`INDEX idx`) ainsi que la liste des champs à modifier (`TRANSPORTING comp1 comp2`...).

## 🌺 DECLARATION ET EXEMPLE

```abap
TYPES: BEGIN OF ty_country,
         land   TYPE char3,
         age(3) TYPE i,
       END OF ty_country.

DATA: lt_country TYPE STANDARD TABLE OF ty_country WITH NON-UNIQUE KEY land,
      ls_country TYPE ty_country.

ls_country-land = 'FR'.
ls_country-age  = 23.
COLLECT ls_country INTO lt_country.

ls_country-land = 'IT'.
ls_country-age  = 20.
COLLECT ls_country INTO lt_country.

ls_country-land = 'IT'.
ls_country-age  = 55.
COLLECT ls_country INTO lt_country.

ls_country-land = 'FR'.
ls_country-age  = 5.
COLLECT ls_country INTO lt_country.

ls_country-land = 'FR'.
ls_country-age  = 10.
MODIFY lt_country INDEX 1 FROM ls_country TRANSPORTING age.
```

> [!IMPORTANT]
>
> Avant le `MODIFY`, la structure `ls_country` est initialisée avec les valeurs souhaitées. Ensuite, le programme va modifier la table interne `lt_country` à l’`index 1`, à partir de la structure `ls_country`, afin de modifier uniquement le champ `AGE`.

`lt_country` avant le MODIFY

| **LAND** | **AGE** |
| -------- | ------- |
| FR       | 28      |
| IT       | 75      |

`lt_country` après le MODIFY

| **LAND** | **AGE** |
| -------- | ------- |
| FR       | 10      |
| IT       | 75      |
