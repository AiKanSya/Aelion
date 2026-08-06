# 🌸 EXERCICES — VALIDATION D'UNE DATE PAR MODULE FONCTION

## 🌺 OBJECTIFS

- distinguer chaîne et date interne ;
- contrôler le format `AAAAMMJJ` ;
- utiliser `DATE_CHECK_PLAUSIBILITY` ;
- traiter l’exception classique ;
- tester les années bissextiles ;
- retourner un résultat structuré.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 MODULE PERSONNALISÉ

```text
Z_<TRI>_DATE_VALIDATE
```

## 🌺 INTERFACE

| Paramètre      | Direction | Type       |
| -------------- | --------- | ---------- |
| `IV_DATE_TEXT` | Importing | `STRING`   |
| `EV_DATE`      | Exporting | `DATS`     |
| `ES_RETURN`    | Exporting | `BAPIRET2` |

## 🌺 ÉTAPE 1 — FORMAT

```abap
IF strlen( iv_date_text ) <> 8
   OR iv_date_text CN '0123456789'.

  es_return = VALUE #(
    type      = 'E'
    message   = 'La date doit respecter le format AAAAMMJJ'
    parameter = 'IV_DATE_TEXT'
    field     = 'IV_DATE_TEXT'
  ).

  RETURN.

ENDIF.
```

## 🌺 ÉTAPE 2 — CONVERSION

```abap
DATA(lv_date) =
  CONV d( iv_date_text ).
```

## 🌺 ÉTAPE 3 — PLAUSIBILITÉ

```abap
CALL FUNCTION 'DATE_CHECK_PLAUSIBILITY'
  EXPORTING
    date                      = lv_date
  EXCEPTIONS
    plausibility_check_failed = 1
    OTHERS                    = 2.
```

## 🌺 ÉTAPE 4 — RÉSULTAT

### Succès

```text
EV_DATE = date interne
TYPE = S
```

### Échec

```text
TYPE = E
MESSAGE = Date calendaire invalide
```

## 🌺 TESTS

| Texte       | Résultat        |
| ----------- | --------------- |
| `20240229`  | valide          |
| `20230229`  | invalide        |
| `20241301`  | invalide        |
| `20240431`  | invalide        |
| `20240101`  | valide          |
| `2024011`   | format invalide |
| `2024ABCD`  | format invalide |
| chaîne vide | format invalide |

## 🌺 EXERCICE — APPEL

```abap
CALL FUNCTION 'Z_<TRI>_DATE_VALIDATE'
  EXPORTING
    iv_date_text = lv_text
  IMPORTING
    ev_date      = lv_date
    es_return    = ls_return.
```

## 🌺 DIAGNOSTIC

Cas incorrect :

```abap
ev_date = iv_date_text.
```

sans contrôle de longueur, caractères ou plausibilité.

Décrire pourquoi une valeur de huit chiffres peut malgré tout être une date impossible.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La longueur est contrôlée.
- [ ] Les caractères sont contrôlés.
- [ ] La chaîne est convertie en `DATS`.
- [ ] La plausibilité est vérifiée.
- [ ] L’exception est traitée.
- [ ] Une année bissextile valide est acceptée.
- [ ] Une date calendaire impossible est refusée.
- [ ] Aucun message interactif n’est imposé.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
FUNCTION z_<tri>_date_validate.

  CLEAR:
    ev_date,
    es_return.

  IF strlen( iv_date_text ) <> 8
     OR iv_date_text CN '0123456789'.

    es_return = VALUE #(
      type      = 'E'
      message   = 'La date doit respecter le format AAAAMMJJ'
      parameter = 'IV_DATE_TEXT'
      field     = 'IV_DATE_TEXT'
    ).

    RETURN.

  ENDIF.

  DATA(lv_date) =
    CONV d( iv_date_text ).

  CALL FUNCTION 'DATE_CHECK_PLAUSIBILITY'
    EXPORTING
      date                      = lv_date
    EXCEPTIONS
      plausibility_check_failed = 1
      OTHERS                    = 2.

  CASE sy-subrc.

    WHEN 0.

      ev_date = lv_date.

      es_return = VALUE #(
        type    = 'S'
        message = 'Date valide'
      ).

    WHEN 1.

      es_return = VALUE #(
        type      = 'E'
        message   = 'Date calendaire invalide'
        parameter = 'IV_DATE_TEXT'
        field     = 'IV_DATE_TEXT'
      ).

    WHEN OTHERS.

      es_return = VALUE #(
        type    = 'E'
        message = 'Erreur technique pendant la validation de la date'
      ).

  ENDCASE.

ENDFUNCTION.
```

</details>
