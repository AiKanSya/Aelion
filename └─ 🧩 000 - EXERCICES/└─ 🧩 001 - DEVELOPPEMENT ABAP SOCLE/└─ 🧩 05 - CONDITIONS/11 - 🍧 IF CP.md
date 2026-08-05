# 🌸 EXERCICES — COVERS PATTERN (CP)

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [COVERS PATTERN (CP)](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/11 - 🍧 IF CP.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- comparer une chaîne à un motif ;
- utiliser `*` ;
- utiliser `+` ;
- connaître le comportement sur la casse ;
- distinguer motif et expression régulière ;
- expliquer le rôle général de `#`.

## 🌺 DURÉE INDICATIVE

35 à 45 minutes.

## 🌺 RAPPEL

Dans un motif `CP` :

- `*` représente une suite de zéro, un ou plusieurs caractères ;
- `+` représente exactement un caractère ;
- la comparaison ne tient pas compte de la casse par défaut ;
- `#` échappe le caractère suivant.

## 🌺 EXERCICE 1 — EXTENSION DE FICHIER

Tester :

| Fichier       | Motif `*.CSV` | Résultat |
| ------------- | ------------- | -------- |
| `export.csv`  |               |          |
| `EXPORT.CSV`  |               |          |
| `archive.txt` |               |          |
| `.csv`        |               |          |

Expliquer pourquoi `.csv` correspond également au motif.

## 🌺 EXERCICE 2 — NOMBRE EXACT DE CARACTÈRES

Le format attendu est :

```text
INV-2026.CSV
```

Utiliser :

```text
INV-++++.CSV
```

Tester :

| Fichier         | Résultat |
| --------------- | -------- |
| `INV-2026.CSV`  | Vrai     |
| `inv-2026.csv`  | Vrai     |
| `INV-26.CSV`    | Faux     |
| `INV-20261.CSV` | Faux     |
| `DEV-2026.CSV`  | Faux     |

## 🌺 EXERCICE 3 — PLUSIEURS CONTRÔLES

Un fichier est accepté uniquement si :

- il respecte `INV-++++.CSV` ;
- les quatre caractères variables sont uniquement numériques.

Extraire les quatre caractères avec un offset, puis utiliser `CO '0123456789'`.

## 🌺 EXERCICE 4 — CARACTÈRE D’ÉCHAPPEMENT

Répondre :

1. Pourquoi faut-il échapper `*` lorsqu’il doit représenter une étoile littérale ?
2. Quel caractère est utilisé ?
3. `CP` est-il une expression régulière complète ?
4. Pourquoi un motif simple ne remplace-t-il pas tous les contrôles métier ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] `export.csv` et `EXPORT.CSV` sont acceptés.
- [ ] `*` accepte une suite vide.
- [ ] `+` représente exactement un caractère.
- [ ] Le motif exact exige quatre positions.
- [ ] Les quatre positions sont contrôlées comme numériques.
- [ ] `CP` n’est pas présenté comme une expression régulière complète.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — extension

| Fichier       | Résultat |
| ------------- | -------- |
| `export.csv`  | Vrai     |
| `EXPORT.CSV`  | Vrai     |
| `archive.txt` | Faux     |
| `.csv`        | Vrai     |

`*` peut remplacer une suite vide. Aucun caractère n’est donc obligatoire avant `.CSV`.

### Solution — motif exact

```abap
DATA lv_file TYPE string VALUE `INV-2026.CSV`.

IF lv_file CP 'INV-++++.CSV'.
  WRITE / 'Structure générale conforme'.
ELSE.
  WRITE / 'Structure générale invalide'.
ENDIF.
```

### Solution — chiffres

```abap
IF lv_file CP 'INV-++++.CSV'
   AND strlen( lv_file ) EQ 12.

  DATA(lv_year_text) = lv_file+4(4).

  IF lv_year_text CO '0123456789'.
    WRITE / 'Fichier valide'.
  ELSE.
    WRITE / 'Les quatre positions doivent être numériques'.
  ENDIF.

ELSE.
  WRITE / 'Format de fichier invalide'.
ENDIF.
```

Le motif vérifie la structure générale. `CO` vérifie la nature des quatre caractères.

Le caractère `#` permet de traiter spécialement le caractère qui le suit, notamment pour rechercher littéralement un joker.

</details>
