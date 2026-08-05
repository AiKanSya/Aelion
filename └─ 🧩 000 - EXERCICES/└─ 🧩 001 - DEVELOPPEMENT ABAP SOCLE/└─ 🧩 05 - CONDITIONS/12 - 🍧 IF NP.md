# 🌸 EXERCICES — NO PATTERN (NP)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- vérifier qu’une chaîne ne correspond pas à un motif ;
- expliquer que `NP` est l’inverse logique de `CP` ;
- exclure un format ;
- connaître le comportement sur la casse ;
- éviter une double négation difficile à lire.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 EXERCICE 1 — EXCLUSION

Tester :

| Fichier       | `NP '*.CSV'` |
| ------------- | ------------ |
| `export.csv`  | Faux         |
| `EXPORT.CSV`  | Faux         |
| `archive.txt` | Vrai         |
| `image.png`   | Vrai         |

## 🌺 EXERCICE 2 — LISTE DE FICHIERS

Pour chaque nom suivant, afficher uniquement les fichiers qui ne sont pas des CSV :

```text
export.csv
archive.txt
IMAGE.PNG
data.CSV
notes.md
```

Résultat attendu :

```text
archive.txt
IMAGE.PNG
notes.md
```

## 🌺 EXERCICE 3 — FORMULATION

Comparer :

```abap
IF lv_file NP '*.CSV'.
  WRITE / 'Fichier ignoré'.
ENDIF.
```

et :

```abap
IF lv_file CP '*.CSV'.
  WRITE / 'Fichier traité'.
ELSE.
  WRITE / 'Fichier ignoré'.
ENDIF.
```

Choisir la version la plus lisible selon le besoin :

- afficher uniquement les fichiers non CSV ;
- traiter les CSV et expliquer le rejet des autres.

## 🌺 EXERCICE 4 — RECTIFICATION DE CASSE

Tester :

```text
export.csv
EXPORT.CSV
```

avec le motif :

```text
*.CSV
```

Expliquer pourquoi les deux valeurs correspondent à `CP` et ne correspondent donc pas à `NP`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `NP` est l’inverse de `CP`.
- [ ] Les variantes de casse CSV sont exclues.
- [ ] Les trois fichiers attendus sont affichés.
- [ ] La structure la plus lisible est choisie.
- [ ] `NP` n’est pas présenté comme sensible à la casse par défaut.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lt_files TYPE STANDARD TABLE OF string WITH EMPTY KEY.

lt_files = VALUE #(
  ( `export.csv` )
  ( `archive.txt` )
  ( `IMAGE.PNG` )
  ( `data.CSV` )
  ( `notes.md` )
).

LOOP AT lt_files INTO DATA(lv_file).
  IF lv_file NP '*.CSV'.
    WRITE / lv_file.
  ENDIF.
ENDLOOP.
```

Résultat :

```text
archive.txt
IMAGE.PNG
notes.md
```

Pour un traitement principal centré sur les CSV, une condition positive avec `CP` est généralement plus lisible :

```abap
IF lv_file CP '*.CSV'.
  WRITE / 'Fichier traité'.
ELSE.
  WRITE / 'Fichier ignoré'.
ENDIF.
```

</details>
