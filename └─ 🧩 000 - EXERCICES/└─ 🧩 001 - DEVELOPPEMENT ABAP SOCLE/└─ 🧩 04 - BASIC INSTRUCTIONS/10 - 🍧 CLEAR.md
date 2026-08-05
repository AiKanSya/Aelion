# 🌸 EXERCICES — CLEAR

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- réinitialiser une variable ;
- réinitialiser plusieurs variables ;
- connaître la valeur initiale des principaux types élémentaires ;
- comprendre que `CLEAR` ne supprime pas la déclaration ;
- éviter de réutiliser une ancienne valeur par erreur.

## 🌺 DURÉE INDICATIVE

20 à 30 minutes.

## 🌺 EXERCICE 1 — VALEURS INITIALES

Déclarer :

```abap
DATA lv_text   TYPE string VALUE `ABAP`.
DATA lv_number TYPE i VALUE 42.
DATA lv_amount TYPE p LENGTH 8 DECIMALS 2 VALUE '19.90'.
DATA lv_date   TYPE d VALUE '20260805'.
DATA lv_time   TYPE t VALUE '132500'.
```

Afficher les valeurs avant et après :

```abap
CLEAR: lv_text,
       lv_number,
       lv_amount,
       lv_date,
       lv_time.
```

## 🌺 EXERCICE 2 — RÉSULTATS ATTENDUS

Compléter :

| Type     | Valeur après `CLEAR` |
| -------- | -------------------- |
| `string` |                      |
| `i`      |                      |
| `p`      |                      |
| `d`      |                      |
| `t`      |                      |

## 🌺 EXERCICE 3 — RÉUTILISATION INCORRECTE

Analyser :

```abap
DATA lv_total TYPE p LENGTH 8 DECIMALS 2.

lv_total = '100.00'.
WRITE / lv_total.

" Nouveau traitement sans réinitialisation
lv_total = lv_total + '25.00'.
WRITE / lv_total.
```

Le second traitement devait commencer à zéro.

Corriger avec `CLEAR`.

## 🌺 EXERCICE 4 — CONSTANTE

Analyser :

```abap
CONSTANTS lc_currency TYPE c LENGTH 3 VALUE 'EUR'.

CLEAR lc_currency.
```

L’instruction est-elle autorisée ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les valeurs initiales sont identifiées.
- [ ] Plusieurs variables sont réinitialisées.
- [ ] La variable reste déclarée après `CLEAR`.
- [ ] Le résidu d’un ancien traitement est supprimé.
- [ ] Une constante n’est pas passée à `CLEAR`.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — valeurs

```abap
DATA lv_text   TYPE string VALUE `ABAP`.
DATA lv_number TYPE i VALUE 42.
DATA lv_amount TYPE p LENGTH 8 DECIMALS 2 VALUE '19.90'.
DATA lv_date   TYPE d VALUE '20260805'.
DATA lv_time   TYPE t VALUE '132500'.

WRITE: / 'Avant CLEAR',
       / lv_text,
       / lv_number,
       / lv_amount,
       / lv_date,
       / lv_time.

CLEAR: lv_text,
       lv_number,
       lv_amount,
       lv_date,
       lv_time.

WRITE: / 'Après CLEAR',
       / lv_text,
       / lv_number,
       / lv_amount,
       / lv_date,
       / lv_time.
```

| Type     | Valeur initiale |
| -------- | --------------- |
| `string` | chaîne vide     |
| `i`      | `0`             |
| `p`      | `0`             |
| `d`      | `00000000`      |
| `t`      | `000000`        |

### Solution — nouveau traitement

```abap
lv_total = '100.00'.
WRITE / lv_total.

CLEAR lv_total.

lv_total = lv_total + '25.00'.
WRITE / lv_total.
```

Le second résultat vaut `25,00`.

`CLEAR lc_currency` est interdit, car une constante ne peut pas être modifiée.

</details>
