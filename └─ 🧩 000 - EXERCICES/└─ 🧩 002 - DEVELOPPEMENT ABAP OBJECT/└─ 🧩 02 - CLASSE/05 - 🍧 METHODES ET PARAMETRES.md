# 🌸 EXERCICES — MÉTHODES ET PARAMÈTRES

## 🌺 OBJECTIFS

- créer une méthode d’instance ;
- utiliser les quatre directions ;
- créer une méthode fonctionnelle ;
- appeler une méthode ;
- distinguer entrée, sortie et effet de bord.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 MÉTHODE PRINCIPALE

Dans `ZCL_<TRI>_CALCULATOR`, créer :

```text
CALCULATE_MULTIPLE
```

Signature :

| Paramètre   | Direction | Type |
| ----------- | --------- | ---- |
| `IV_VALUE`  | Importing | `I`  |
| `EV_DOUBLE` | Exporting | `I`  |
| `EV_TRIPLE` | Exporting | `I`  |

## 🌺 IMPLÉMENTATION

```abap
METHOD calculate_multiple.

  ev_double = iv_value * 2.
  ev_triple = iv_value * 3.

ENDMETHOD.
```

## 🌺 EXERCICE 1 — APPEL

```abap
lo_calculator->calculate_multiple(
  EXPORTING
    iv_value  = 5
  IMPORTING
    ev_double = DATA(lv_double)
    ev_triple = DATA(lv_triple)
).
```

## 🌺 EXERCICE 2 — RETURNING

Créer une méthode fonctionnelle :

```text
SQUARE
```

Signature :

```text
IV_VALUE TYPE I
RV_RESULT TYPE I
```

Appel :

```abap
DATA(lv_square) =
  lo_calculator->square(
    iv_value = 5
  ).
```

## 🌺 EXERCICE 3 — CHANGING

Créer temporairement :

```text
DOUBLE_VALUE
```

avec :

```text
CV_VALUE TYPE I
```

Observer la modification de la variable appelante.

## 🌺 EXERCICE 4 — PARAMÈTRE FACULTATIF

Créer :

```text
POWER
```

avec un exposant facultatif par défaut `2`.

Tester :

```text
POWER( 3 ) = 9
POWER( 3, 3 ) = 27
```

## 🌺 RECTIFICATION

Une méthode fonctionnelle possède un paramètre `RETURNING` unique utilisable comme résultat d’expression.

Pour une API lisible :

- utiliser `RETURNING` pour un résultat principal ;
- utiliser `EXPORTING` pour plusieurs sorties ;
- utiliser `CHANGING` lorsque la donnée doit entrer et sortir modifiée.

## 🌺 DIAGNOSTIC

Une méthode possède à la fois plusieurs sorties dont le rôle principal n’est pas identifiable.

Reconcevoir le contrat :

- structure de résultat ;
- returning principal ;
- méthodes séparées.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le double et le triple sont retournés.
- [ ] La méthode fonctionnelle est appelée dans une expression.
- [ ] `CHANGING` est observé.
- [ ] Le paramètre facultatif fonctionne.
- [ ] Les directions sont justifiées.
- [ ] Le contrat ambigu est corrigé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
METHOD square.

  rv_result =
    iv_value * iv_value.

ENDMETHOD.
```

Appel moderne :

```abap
DATA(lv_result) =
  NEW zcl_<tri>_calculator( )->square(
    iv_value = 6
  ).
```

</details>
