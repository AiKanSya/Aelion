# 🌸 EXERCICES — BETWEEN

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [BETWEEN](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/05 - 🍧 IF BETWEEN.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- tester un intervalle fermé ;
- vérifier les deux bornes ;
- utiliser `NOT BETWEEN` ;
- traiter les valeurs limites ;
- classer une valeur dans plusieurs intervalles ;
- identifier des bornes inversées ;
- utiliser `IF` plutôt que `CASE` pour les intervalles.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — VALIDATION D’UN SCORE

Un score est valide entre `0` et `100`, bornes incluses.

Déclarer :

```abap
DATA lv_score TYPE i VALUE 75.
```

Utiliser `BETWEEN`.

Tester :

```text
-1
0
1
99
100
101
```

## 🌺 EXERCICE 2 — NOT BETWEEN

Afficher :

```text
Score invalide
```

lorsque le score se trouve en dehors de l’intervalle.

Utiliser `NOT BETWEEN`.

## 🌺 EXERCICE 3 — CLASSIFICATION

Règles :

| Score               | Résultat    |
| ------------------- | ----------- |
| hors de `0` à `100` | Invalide    |
| `0` à `49`          | Insuffisant |
| `50` à `69`         | Moyen       |
| `70` à `84`         | Bien        |
| `85` à `100`        | Très bien   |

Construire une chaîne `IF` / `ELSEIF`.

## 🌺 EXERCICE 4 — BORNES INVERSÉES

Analyser :

```abap
IF lv_score BETWEEN 100 AND 0.
  WRITE / 'Score valide'.
ENDIF.
```

Répondre :

1. Les bornes sont-elles dans l’ordre attendu ?
2. Le programme réorganise-t-il automatiquement les bornes ?
3. Quelle correction faut-il appliquer ?
4. Comment éviter ce défaut lorsque les bornes proviennent de variables ?

## 🌺 EXERCICE 5 — DIAGNOSTIC CASE

Analyser :

```abap
CASE lv_score.
  WHEN BETWEEN 0 AND 49.
    WRITE / 'Insuffisant'.
ENDCASE.
```

Réécrire avec `IF`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `0` et `100` sont acceptés.
- [ ] `-1` et `101` sont refusés.
- [ ] Les cinq catégories sont exclusives.
- [ ] Les bornes sont dans l’ordre croissant.
- [ ] `NOT BETWEEN` est utilisé.
- [ ] Aucun `CASE WHEN BETWEEN` ne subsiste.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — validité

```abap
IF lv_score BETWEEN 0 AND 100.
  WRITE / 'Score valide'.
ELSE.
  WRITE / 'Score invalide'.
ENDIF.
```

### Solution — NOT BETWEEN

```abap
IF lv_score NOT BETWEEN 0 AND 100.
  WRITE / 'Score invalide'.
ENDIF.
```

### Solution — classification

```abap
DATA lv_result TYPE string.

IF lv_score NOT BETWEEN 0 AND 100.
  lv_result = `Invalide`.
ELSEIF lv_score BETWEEN 0 AND 49.
  lv_result = `Insuffisant`.
ELSEIF lv_score BETWEEN 50 AND 69.
  lv_result = `Moyen`.
ELSEIF lv_score BETWEEN 70 AND 84.
  lv_result = `Bien`.
ELSE.
  lv_result = `Très bien`.
ENDIF.

WRITE / lv_result.
```

### Solution — bornes variables

```abap
DATA lv_low  TYPE i VALUE 0.
DATA lv_high TYPE i VALUE 100.

IF lv_low GT lv_high.
  WRITE / 'Bornes invalides'.
ELSEIF lv_score BETWEEN lv_low AND lv_high.
  WRITE / 'Score valide'.
ELSE.
  WRITE / 'Score invalide'.
ENDIF.
```

### Solution — diagnostic

```abap
IF lv_score BETWEEN 0 AND 49.
  WRITE / 'Insuffisant'.
ENDIF.
```

</details>
