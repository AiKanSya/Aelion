# 🌸 EXERCICE — SELECT-OPTIONS

## 🌺 OBJECTIFS

- déclarer une table de sélection ;
- comprendre ses quatre colonnes ;
- saisir une valeur, un intervalle et plusieurs lignes ;
- utiliser inclusions et exclusions ;
- utiliser `IN` dans Open SQL ;
- traiter une table vide ;
- utiliser `NO INTERVALS` et `NO-EXTENSION`.

## 🌺 DURÉE INDICATIVE

75 à 90 minutes.

## 🌺 DÉCLARATIONS

```abap
DATA:
  gv_order_id TYPE zt_<tri>_ord-order_id,
  gv_status   TYPE zt_<tri>_ord-status,
  gv_currency TYPE zt_<tri>_ord-currency,
  gv_date     TYPE zt_<tri>_ord-created_on.

SELECT-OPTIONS:
  s_order FOR gv_order_id,
  s_stat  FOR gv_status,
  s_curr  FOR gv_currency,
  s_date  FOR gv_date.
```

## 🌺 EXERCICE 1 — STRUCTURE

Afficher les lignes de `s_stat` :

```abap
LOOP AT s_stat INTO DATA(ls_stat).
  WRITE: / ls_stat-sign,
           ls_stat-option,
           ls_stat-low,
           ls_stat-high.
ENDLOOP.
```

Compléter :

| Colonne  | Rôle |
| -------- | ---- |
| `SIGN`   |      |
| `OPTION` |      |
| `LOW`    |      |
| `HIGH`   |      |

## 🌺 EXERCICE 2 — VALEUR UNIQUE

Saisir :

```text
N
```

Résultat interne attendu :

```text
SIGN   = I
OPTION = EQ
LOW    = N
HIGH   = initial
```

## 🌺 EXERCICE 3 — INTERVALLE

Pour les commandes :

```text
0000000001 à 0000000002
```

Résultat :

```text
SIGN   = I
OPTION = BT
LOW    = 0000000001
HIGH   = 0000000002
```

## 🌺 EXERCICE 4 — PLUSIEURS VALEURS

Saisir les statuts :

```text
N
P
```

Vérifier que deux lignes existent dans `s_stat`.

## 🌺 EXERCICE 5 — EXCLUSION

Inclure tous les statuts nécessaires puis exclure :

```text
C
```

Identifier :

```text
SIGN = E
OPTION = EQ
LOW = C
```

## 🌺 EXERCICE 6 — UTILISATION SQL

```abap
SELECT order_id,
       customer_name,
       status,
       amount,
       currency
  FROM zt_<tri>_ord
  WHERE order_id  IN @s_order
    AND status    IN @s_stat
    AND currency  IN @s_curr
    AND created_on IN @s_date
  ORDER BY order_id
  INTO TABLE @DATA(lt_orders).
```

## 🌺 EXERCICE 7 — TABLES VIDES

Laisser tous les critères vides.

Résultat :

```text
Les conditions IN ne restreignent pas le résultat.
```

Répondre :

1. les trois commandes peuvent-elles être retournées ?
2. ce comportement convient-il à un report exploratoire limité ?
3. convient-il à un export sensible sans autre protection ?
4. quel contrôle ajouter si au moins un filtre est requis ?
5. la limite `p_max` reste-t-elle nécessaire ?

## 🌺 EXERCICE 8 — NO INTERVALS

```abap
SELECT-OPTIONS s_stat
  FOR gv_status
  NO INTERVALS.
```

Tester :

- champ `LOW` ;
- absence de `HIGH` à l’écran ;
- bouton de sélection multiple toujours disponible.

## 🌺 EXERCICE 9 — NO-EXTENSION

```abap
SELECT-OPTIONS s_stat
  FOR gv_status
  NO INTERVALS
  NO-EXTENSION.
```

Tester :

- une valeur visible ;
- absence d’intervalle ;
- absence de sélection multiple.

## 🌺 EXERCICE 10 — OBLIGATORY

```abap
SELECT-OPTIONS s_order
  FOR gv_order_id
  OBLIGATORY.
```

Répondre :

1. quel champ visible est obligatoire ?
2. une exclusion seule respecte-t-elle la règle d’écran selon la saisie ?
3. un intervalle inversé est-il automatiquement une règle métier valide ?
4. faut-il valider les valeurs ?
5. `OBLIGATORY` remplace-t-il une recherche d’existence ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les quatre colonnes sont expliquées.
- [ ] Une valeur unique est observée.
- [ ] Un intervalle est observé.
- [ ] Plusieurs valeurs sont observées.
- [ ] Une exclusion est observée.
- [ ] Les critères sont utilisés dans SQL.
- [ ] Le comportement vide est compris.
- [ ] `NO INTERVALS` est testé.
- [ ] `NO-EXTENSION` est testé.
- [ ] `OBLIGATORY` est limité à son rôle d’écran.

<details>
<summary>🍧 Afficher la solution</summary>

| Colonne  | Rôle                               |
| -------- | ---------------------------------- |
| `SIGN`   | Inclusion `I` ou exclusion `E`     |
| `OPTION` | Opérateur : `EQ`, `BT`, `CP`, etc. |
| `LOW`    | Valeur unique ou borne basse       |
| `HIGH`   | Borne haute lorsque nécessaire     |

Contrôle d’au moins un filtre :

```abap
AT SELECTION-SCREEN.

  IF s_order[] IS INITIAL
     AND s_stat[] IS INITIAL
     AND s_curr[] IS INITIAL
     AND s_date[] IS INITIAL
     AND p_name IS INITIAL.

    MESSAGE 'Saisissez au moins un critère'
      TYPE 'E'.

  ENDIF.
```

</details>
