# 🌸 EXERCICES — IF ... ENDIF

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [IF ... ENDIF](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/03 - 🍧 IF ELSE ENDIF.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- tester une condition simple ;
- enchaîner plusieurs conditions ;
- combiner des expressions avec `AND` et `OR` ;
- rendre la logique explicite avec des parenthèses ;
- traiter un cas par défaut ;
- prévenir une division par zéro ;
- vérifier l’ordre des conditions.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — CLASSIFICATION D’UN MONTANT

Règles :

| Montant                         | Catégorie           |
| ------------------------------- | ------------------- |
| inférieur à `0`                 | Montant invalide    |
| de `0` inclus à moins de `50`   | Petite commande     |
| de `50` inclus à moins de `200` | Commande standard   |
| `200` ou plus                   | Commande importante |

Déclarer :

```abap
DATA lv_amount   TYPE p LENGTH 8 DECIMALS 2 VALUE '125.50'.
DATA lv_category TYPE string.
```

Construire le traitement avec `IF`, `ELSEIF`, `ELSE`.

## 🌺 EXERCICE 2 — CONDITIONS COMBINÉES

Une commande peut être validée uniquement si :

- le statut est `N` ou `P` ;
- le montant est strictement positif ;
- le pays est `FR`.

Déclarer :

```abap
DATA lv_status  TYPE c LENGTH 1 VALUE 'P'.
DATA lv_amount  TYPE p LENGTH 8 DECIMALS 2 VALUE '125.50'.
DATA lv_country TYPE c LENGTH 2 VALUE 'FR'.
```

Écrire une condition utilisant explicitement des parenthèses.

Tester :

| Statut |  Montant | Pays | Validation attendue |
| ------ | -------: | ---- | ------------------- |
| `P`    | `125,50` | `FR` | Oui                 |
| `S`    | `125,50` | `FR` | Non                 |
| `N`    |   `0,00` | `FR` | Non                 |
| `N`    | `125,50` | `DE` | Non                 |

## 🌺 EXERCICE 3 — ORDRE DES CONDITIONS

Analyser :

```abap
IF lv_amount GE 0.
  lv_category = `Montant positif ou nul`.
ELSEIF lv_amount GE 200.
  lv_category = `Commande importante`.
ENDIF.
```

Répondre :

1. La branche `GE 200` peut-elle être atteinte ?
2. Pourquoi ?
3. Quel ordre faut-il utiliser ?
4. Quel principe général en déduire pour une chaîne de `ELSEIF` ?

## 🌺 EXERCICE 4 — DIVISION PROTÉGÉE

Déclarer :

```abap
DATA lv_total    TYPE p LENGTH 8 DECIMALS 2 VALUE '100.00'.
DATA lv_quantity TYPE i VALUE 0.
DATA lv_unit_price TYPE p LENGTH 8 DECIMALS 2.
```

Calculer le prix unitaire uniquement lorsque la quantité est différente de zéro.

Afficher un message explicite dans le cas contraire.

## 🌺 EXERCICE 5 — CONDITION AMBIGUË

Comparer les deux expressions :

```abap
IF lv_status EQ 'N' OR lv_status EQ 'P' AND lv_country EQ 'FR'.
```

```abap
IF ( lv_status EQ 'N' OR lv_status EQ 'P' )
   AND lv_country EQ 'FR'.
```

Utiliser le cas :

```text
Statut = N
Pays   = DE
```

Expliquer pourquoi les parenthèses sont nécessaires pour exprimer sans ambiguïté la règle métier.

## 🌺 RÉSULTATS ATTENDUS

Pour `125,50` :

```text
Commande standard
```

Pour la quantité `0` :

```text
Calcul impossible : quantité nulle
```

## 🌺 LIVRABLES

- classification du montant ;
- tableau des quatre validations ;
- correction de l’ordre des conditions ;
- contrôle de division ;
- explication de l’expression parenthésée.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les intervalles ne se chevauchent pas.
- [ ] Les conditions les plus spécifiques sont placées correctement.
- [ ] Les opérateurs `AND` et `OR` sont parenthésés.
- [ ] Le cas par défaut est traité.
- [ ] La division par zéro est impossible.
- [ ] Les valeurs limites sont testées.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — classification

```abap
DATA lv_amount   TYPE p LENGTH 8 DECIMALS 2 VALUE '125.50'.
DATA lv_category TYPE string.

IF lv_amount LT 0.
  lv_category = `Montant invalide`.
ELSEIF lv_amount LT 50.
  lv_category = `Petite commande`.
ELSEIF lv_amount LT 200.
  lv_category = `Commande standard`.
ELSE.
  lv_category = `Commande importante`.
ENDIF.

WRITE / lv_category.
```

### Solution — validation

```abap
IF ( lv_status EQ 'N' OR lv_status EQ 'P' )
   AND lv_amount GT 0
   AND lv_country EQ 'FR'.

  WRITE / 'Commande validée'.
ELSE.
  WRITE / 'Commande refusée'.
ENDIF.
```

### Solution — ordre

La condition `lv_amount GE 0` capture déjà tous les montants supérieurs ou égaux à `200`. La branche suivante devient inaccessible.

Correction possible :

```abap
IF lv_amount GE 200.
  lv_category = `Commande importante`.
ELSEIF lv_amount GE 0.
  lv_category = `Montant positif ou nul`.
ELSE.
  lv_category = `Montant négatif`.
ENDIF.
```

### Solution — division

```abap
IF lv_quantity NE 0.
  lv_unit_price = lv_total / lv_quantity.
  WRITE / lv_unit_price.
ELSE.
  WRITE / 'Calcul impossible : quantité nulle'.
ENDIF.
```

### Solution — ambiguïté

La seconde expression traduit explicitement la règle suivante :

```text
Le statut doit être N ou P, et le pays doit être FR.
```

Sans parenthèses, la lecture humaine peut associer incorrectement les opérateurs. Les parenthèses rendent l’intention indépendante de toute connaissance des règles de priorité.

</details>
