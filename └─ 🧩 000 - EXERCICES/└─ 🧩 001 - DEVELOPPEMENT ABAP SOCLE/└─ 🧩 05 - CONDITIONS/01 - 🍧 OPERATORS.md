# 🌸 EXERCICES — OPERATEURS DE COMPARAISON

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [OPERATEURS DE COMPARAISON](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 05 - CONDITIONS/01 - 🍧 OPERATORS.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- comparer deux valeurs ;
- utiliser les opérateurs symboliques et leurs mots-clés ABAP ;
- distinguer égalité, différence et relation d’ordre ;
- contrôler une valeur limite ;
- éviter une condition incomplète ou ambiguë ;
- expliquer la différence entre comparaison numérique et comparaison textuelle.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — TABLEAU DES OPÉRATEURS

Compléter le tableau :

| Signification         | Symbole | Mot-clé ABAP |
| --------------------- | ------- | ------------ |
| Égal                  |         |              |
| Différent             |         |              |
| Strictement supérieur |         |              |
| Supérieur ou égal     |         |              |
| Strictement inférieur |         |              |
| Inférieur ou égal     |         |              |

## 🌺 EXERCICE 2 — CONTRÔLE D’UNE COMMANDE

Déclarer :

```abap
DATA lv_order_amount TYPE p LENGTH 8 DECIMALS 2 VALUE '125.50'.
DATA lv_credit_limit TYPE p LENGTH 8 DECIMALS 2 VALUE '100.00'.
DATA lv_currency     TYPE c LENGTH 3 VALUE 'EUR'.
```

Produire les contrôles suivants avec les mots-clés ABAP :

1. vérifier si le montant est égal à la limite ;
2. vérifier s’il est différent de zéro ;
3. vérifier s’il est strictement supérieur à la limite ;
4. vérifier s’il est supérieur ou égal à la limite ;
5. vérifier s’il est inférieur à `200,00` ;
6. vérifier s’il est inférieur ou égal à `125,50`.

Afficher une ligne explicite uniquement lorsque chaque condition est vraie.

## 🌺 EXERCICE 3 — VALEURS LIMITES

Tester les trois montants suivants :

|  Montant | Condition `GE 100` | Condition `GT 100` |
| -------: | ------------------ | ------------------ |
|  `99,99` |                    |                    |
| `100,00` |                    |                    |
| `100,01` |                    |                    |

Expliquer pourquoi `GE` et `GT` ne produisent pas le même résultat pour `100,00`.

## 🌺 EXERCICE 4 — COMPARAISON TEXTUELLE

Déclarer :

```abap
DATA lv_code_1 TYPE string VALUE `A10`.
DATA lv_code_2 TYPE string VALUE `A2`.
```

Comparer les deux chaînes avec `LT`.

Répondre :

1. ABAP compare-t-il ici des quantités numériques ?
2. Le résultat doit-il être interprété comme `10 < 2` ?
3. Quel risque existe lorsqu’un nombre métier est stocké dans une chaîne ?

## 🌺 EXERCICE 5 — DIAGNOSTIC

Analyser :

```abap
DATA lv_age TYPE i VALUE 21.

IF lv_age EQ 18 OR 21.
  WRITE / 'Âge accepté'.
ENDIF.
```

Effectuer les actions suivantes :

1. lancer le contrôle de syntaxe ;
2. relever le problème ;
3. corriger la condition ;
4. tester `18`, `21` et `20`.

## 🌺 RÉSULTATS ATTENDUS

Pour `lv_order_amount = 125.50` :

```text
Le montant est différent de zéro
Le montant dépasse la limite
Le montant atteint ou dépasse la limite
Le montant est inférieur à 200,00
Le montant est inférieur ou égal à 125,50
```

Pour l’âge :

| Âge | Accepté |
| --: | ------- |
|  18 | Oui     |
|  21 | Oui     |
|  20 | Non     |

## 🌺 LIVRABLES

- tableau des opérateurs ;
- code des six comparaisons ;
- tableau des limites ;
- explication de la comparaison textuelle ;
- correction de la condition sur l’âge.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les six opérateurs sont correctement associés.
- [ ] Les mots-clés `EQ`, `NE`, `GT`, `GE`, `LT` et `LE` sont utilisés.
- [ ] La différence entre borne incluse et borne exclue est comprise.
- [ ] Une comparaison textuelle n’est pas interprétée comme un calcul numérique.
- [ ] Chaque côté de `OR` contient une condition complète.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — tableau

| Signification         | Symbole | Mot-clé |
| --------------------- | ------- | ------- |
| Égal                  | `=`     | `EQ`    |
| Différent             | `<>`    | `NE`    |
| Strictement supérieur | `>`     | `GT`    |
| Supérieur ou égal     | `>=`    | `GE`    |
| Strictement inférieur | `<`     | `LT`    |
| Inférieur ou égal     | `<=`    | `LE`    |

### Solution — commande

```abap
DATA lv_order_amount TYPE p LENGTH 8 DECIMALS 2 VALUE '125.50'.
DATA lv_credit_limit TYPE p LENGTH 8 DECIMALS 2 VALUE '100.00'.
DATA lv_currency     TYPE c LENGTH 3 VALUE 'EUR'.

IF lv_order_amount EQ lv_credit_limit.
  WRITE / 'Le montant est égal à la limite'.
ENDIF.

IF lv_order_amount NE 0.
  WRITE / 'Le montant est différent de zéro'.
ENDIF.

IF lv_order_amount GT lv_credit_limit.
  WRITE / 'Le montant dépasse la limite'.
ENDIF.

IF lv_order_amount GE lv_credit_limit.
  WRITE / 'Le montant atteint ou dépasse la limite'.
ENDIF.

IF lv_order_amount LT '200.00'.
  WRITE / 'Le montant est inférieur à 200,00'.
ENDIF.

IF lv_order_amount LE '125.50'.
  WRITE / 'Le montant est inférieur ou égal à 125,50'.
ENDIF.
```

### Solution — limites

|  Montant | `GE 100` | `GT 100` |
| -------: | -------- | -------- |
|  `99,99` | Faux     | Faux     |
| `100,00` | Vrai     | Faux     |
| `100,01` | Vrai     | Vrai     |

`GE` inclut l’égalité. `GT` l’exclut.

### Solution — comparaison textuelle

`A10` et `A2` sont comparés comme des chaînes, pas comme les nombres `10` et `2`.

Une donnée destinée à un calcul doit être stockée dans un type numérique adapté. Une représentation textuelle peut produire un ordre lexical différent de l’ordre numérique.

### Solution — âge

```abap
DATA lv_age TYPE i VALUE 21.

IF lv_age EQ 18 OR lv_age EQ 21.
  WRITE / 'Âge accepté'.
ELSE.
  WRITE / 'Âge refusé'.
ENDIF.
```

</details>
