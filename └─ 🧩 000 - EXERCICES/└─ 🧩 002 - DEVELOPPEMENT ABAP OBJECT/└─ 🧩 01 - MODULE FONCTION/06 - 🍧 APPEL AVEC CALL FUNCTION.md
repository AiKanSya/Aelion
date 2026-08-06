# 🌸 EXERCICES — APPEL AVEC CALL FUNCTION

## 🌺 OBJECTIFS

- générer un appel ;
- mapper paramètres formels et réels ;
- comprendre l’inversion import/export ;
- utiliser une déclaration inline ;
- contrôler `sy-subrc`.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 EXERCICE 1 — MODULE D’ADDITION

Créer :

```text
Z_<TRI>_ADD
```

Interface :

```text
IV_VALUE_1 TYPE I
IV_VALUE_2 TYPE I
EV_RESULT  TYPE I
```

## 🌺 EXERCICE 2 — APPEL

```abap
CALL FUNCTION 'Z_<TRI>_ADD'
  EXPORTING
    iv_value_1 = 10
    iv_value_2 = 20
  IMPORTING
    ev_result  = DATA(lv_result)
  EXCEPTIONS
    OTHERS = 1.
```

## 🌺 EXERCICE 3 — INVERSION

Compléter :

| Interface `SE37` | Bloc de l’appel |
| ---------------- | --------------- |
| Importing        |                 |
| Exporting        |                 |
| Changing         |                 |
| Tables           |                 |
| Exceptions       |                 |

## 🌺 EXERCICE 4 — CONTRÔLE

```abap
IF sy-subrc = 0.
  WRITE / lv_result.
ELSE.
  WRITE / 'Erreur pendant l’appel'.
ENDIF.
```

Le contrôle doit être immédiat.

## 🌺 EXERCICE 5 — PARAMÈTRE FACULTATIF

Appeler `Z_<TRI>_TEXT_NORMALIZE` :

1. sans `IV_PREFIX` ;
2. avec `IV_PREFIX`.

## 🌺 DIAGNOSTIC

Ajouter une instruction entre l’appel et le contrôle de `sy-subrc`.

Observer que cette instruction peut remplacer la valeur.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’appel compile.
- [ ] Le résultat inline est récupéré.
- [ ] L’inversion est expliquée.
- [ ] `sy-subrc` est contrôlé immédiatement.
- [ ] Le paramètre facultatif est omis puis fourni.

<details>
<summary>🍧 Afficher la solution</summary>

| Interface  | Appel        |
| ---------- | ------------ |
| Importing  | `EXPORTING`  |
| Exporting  | `IMPORTING`  |
| Changing   | `CHANGING`   |
| Tables     | `TABLES`     |
| Exceptions | `EXCEPTIONS` |

</details>
