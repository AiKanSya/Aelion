# 🌸 EXERCICES — ACCÈS PAR OFFSET ET LONGUEUR

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ACCÈS PAR OFFSET ET LONGUEUR](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/11 - 🍧 OFFSET.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- utiliser la syntaxe `<objet>+<offset>(<longueur>)` ;
- compter les positions à partir de zéro ;
- extraire une partie fixe ;
- utiliser un offset et une longueur dynamiques ;
- contrôler les limites avant un accès dynamique ;
- distinguer format fixe et format variable.

## 🌺 DURÉE INDICATIVE

35 à 45 minutes.

## 🌺 EXERCICE 1 — POSITIONS

Pour la valeur :

```text
ABCDEFGHIJ
```

Compléter :

| Caractère | Offset |
| --------- | -----: |
| `A`       |        |
| `C`       |        |
| `F`       |        |
| `J`       |        |

Quel résultat produit :

```abap
lv_text+2(4)
```

## 🌺 EXERCICE 2 — CODE FIXE

À partir de :

```abap
DATA lv_value TYPE c LENGTH 14 VALUE 'FR-75001-PARIS'.
```

Extraire :

- pays : `FR` ;
- code postal : `75001` ;
- ville : `PARIS`.

## 🌺 EXERCICE 3 — DATE TECHNIQUE

À partir de :

```abap
DATA lv_date_internal TYPE d VALUE '20260805'.
```

Construire :

```text
05/08/2026
```

Utiliser les offsets et un template de chaîne.

## 🌺 EXERCICE 4 — ACCÈS DYNAMIQUE

Déclarer :

```abap
DATA lv_dynamic_text TYPE string VALUE `ABCDEFGHIJ`.
DATA lv_offset       TYPE i VALUE 3.
DATA lv_length       TYPE i VALUE 4.
DATA lv_part         TYPE string.
```

Avant l’extraction, contrôler :

```abap
strlen( lv_dynamic_text ) >= lv_offset + lv_length
```

Résultat attendu :

```text
DEFG
```

## 🌺 EXERCICE 5 — DÉPASSEMENT

Tester mentalement :

```abap
lv_offset = 8.
lv_length = 4.
```

1. La chaîne contient-elle suffisamment de caractères ?
2. Quelle branche doit être exécutée ?
3. Pourquoi l’accès direct ne doit-il pas être effectué ?

## 🌺 EXERCICE 6 — FORMAT VARIABLE

La valeur devient :

```text
FR-75001-SAINT-DENIS
```

Pourquoi les offsets fixes ne conviennent-ils plus pour la ville ?

Quelle instruction du présent dossier convient mieux ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’offset commence à zéro.
- [ ] Les trois segments fixes sont corrects.
- [ ] La date est réorganisée.
- [ ] L’accès dynamique est protégé.
- [ ] Le dépassement est empêché.
- [ ] `SPLIT` est choisi pour un format variable.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — positions

| Caractère | Offset |
| --------- | -----: |
| `A`       |      0 |
| `C`       |      2 |
| `F`       |      5 |
| `J`       |      9 |

```text
lv_text+2(4) = CDEF
```

### Solution — code fixe

```abap
DATA lv_value       TYPE c LENGTH 14 VALUE 'FR-75001-PARIS'.
DATA lv_country     TYPE c LENGTH 2.
DATA lv_postal_code TYPE c LENGTH 5.
DATA lv_city        TYPE c LENGTH 5.

lv_country     = lv_value(2).
lv_postal_code = lv_value+3(5).
lv_city        = lv_value+9(5).

WRITE: / lv_country,
       / lv_postal_code,
       / lv_city.
```

### Solution — date

```abap
DATA lv_date_internal TYPE d VALUE '20260805'.
DATA lv_date_display  TYPE string.

lv_date_display =
  |{ lv_date_internal+6(2) }/{ lv_date_internal+4(2) }/{ lv_date_internal(4) }|.

WRITE / lv_date_display.
```

### Solution — accès dynamique

```abap
DATA lv_dynamic_text TYPE string VALUE `ABCDEFGHIJ`.
DATA lv_offset       TYPE i VALUE 3.
DATA lv_length       TYPE i VALUE 4.
DATA lv_part         TYPE string.

IF strlen( lv_dynamic_text ) >= lv_offset + lv_length.
  lv_part = lv_dynamic_text+lv_offset(lv_length).
  WRITE / lv_part.
ELSE.
  WRITE / 'Accès impossible : longueur insuffisante'.
ENDIF.
```

Avec `offset = 8` et `length = 4`, la fin demandée correspond à la position `12`, alors que la chaîne contient dix caractères. L’accès doit être refusé.

Pour un nombre variable de caractères après le second tiret, utiliser `SPLIT` plutôt que des offsets fixes.

</details>
