# 🌸 EXERCICES — EXCEPTIONS CLASSIQUES

## 🌺 OBJECTIFS

- déclarer une exception classique ;
- la lever avec `RAISE` ;
- la mapper ;
- interpréter `sy-subrc` ;
- comparer avec une exception de classe.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 MODULE

```text
Z_<TRI>_DIVIDE
```

Interface :

```text
IV_NUMERATOR   TYPE DECFLOAT34
IV_DENOMINATOR TYPE DECFLOAT34
EV_RESULT      TYPE DECFLOAT34
```

Exception :

```text
DIVISION_BY_ZERO
```

## 🌺 EXERCICE 1 — IMPLÉMENTATION

```abap
IF iv_denominator = 0.
  RAISE division_by_zero.
ENDIF.
```

## 🌺 EXERCICE 2 — APPEL

```abap
CALL FUNCTION 'Z_<TRI>_DIVIDE'
  EXPORTING
    iv_numerator   = 10
    iv_denominator = 2
  IMPORTING
    ev_result      = DATA(lv_result)
  EXCEPTIONS
    division_by_zero = 1
    OTHERS           = 2.
```

## 🌺 EXERCICE 3 — MAPPING

Remplacer :

```text
DIVISION_BY_ZERO = 1
```

par :

```text
DIVISION_BY_ZERO = 8
```

Le module reste inchangé, mais `sy-subrc` devient `8`.

## 🌺 EXERCICE 4 — OTHERS

Expliquer :

- utilité ;
- perte de précision ;
- journalisation nécessaire ;
- raison de mapper explicitement les exceptions connues.

## 🌺 EXERCICE 5 — EXCEPTION DE CLASSE

Comparer :

```text
RAISE division_by_zero
```

avec :

```abap
RAISE EXCEPTION TYPE zcx_<tri>_division.
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’exception est déclarée.
- [ ] La division est protégée.
- [ ] Le cas nominal retourne `0`.
- [ ] Le cas zéro retourne le code mappé.
- [ ] Le mapping appartient à l’appelant.
- [ ] Les deux modèles sont distingués.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
FUNCTION z_<tri>_divide.

  IF iv_denominator = 0.
    RAISE division_by_zero.
  ENDIF.

  ev_result =
    iv_numerator / iv_denominator.

ENDFUNCTION.
```

</details>
