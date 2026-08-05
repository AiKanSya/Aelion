# 🌸 EXERCICES — INSTRUCTION DE CALCUL

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [INSTRUCTION DE CALCUL](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/03 - 🍧 CALCULS.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- affecter une valeur ;
- additionner, soustraire, multiplier et diviser ;
- utiliser une expression arithmétique ;
- reconnaître les instructions historiques équivalentes ;
- respecter l’ordre des opérations ;
- choisir un type numérique compatible avec le résultat ;
- prévenir une division par zéro.

## 🌺 DURÉE INDICATIVE

35 à 45 minutes.

## 🌺 CONTEXTE

Une commande contient :

```text
Quantité      : 4
Prix unitaire : 12,50 EUR
Remise        : 5,00 EUR
TVA           : 20 %
```

Le programme doit calculer :

1. le montant brut ;
2. le montant après remise ;
3. le montant de TVA ;
4. le montant TTC.

## 🌺 EXERCICE 1 — ASSOCIATION

Associer chaque opération à l’instruction équivalente :

| Expression            | Instruction équivalente |
| --------------------- | ----------------------- |
| `lv_a = lv_b.`        |                         |
| `lv_a = lv_a + lv_b.` |                         |
| `lv_a = lv_a - lv_b.` |                         |
| `lv_a = lv_a * lv_b.` |                         |
| `lv_a = lv_a / lv_b.` |                         |

Instructions disponibles :

```text
MOVE
ADD
SUBTRACT
MULTIPLY
DIVIDE
```

## 🌺 EXERCICE 2 — CALCUL DE COMMANDE

Déclarer :

```abap
DATA lv_quantity   TYPE i VALUE 4.
DATA lv_unit_price TYPE p LENGTH 8 DECIMALS 2 VALUE '12.50'.
DATA lv_discount   TYPE p LENGTH 8 DECIMALS 2 VALUE '5.00'.
DATA lv_tax_rate   TYPE p LENGTH 5 DECIMALS 2 VALUE '20.00'.
```

Calculer les quatre montants avec des expressions arithmétiques.

Résultats attendus :

```text
Montant brut        : 50,00
Montant après remise: 45,00
Montant TVA         : 9,00
Montant TTC         : 54,00
```

## 🌺 EXERCICE 3 — INSTRUCTIONS ÉQUIVALENTES

Reproduire les traitements suivants avec les instructions indiquées :

```abap
DATA lv_result TYPE p LENGTH 8 DECIMALS 2 VALUE '10.00'.
```

1. ajouter `5` avec `ADD` ;
2. retirer `3` avec `SUBTRACT` ;
3. multiplier par `2` avec `MULTIPLY` ;
4. diviser par `4` avec `DIVIDE`.

Résultat final attendu :

```text
6,00
```

## 🌺 EXERCICE 4 — PRIORITÉ DES OPÉRATIONS

Comparer :

```abap
DATA(lv_result_1) = 10 + 5 * 2.
DATA(lv_result_2) = ( 10 + 5 ) * 2.
```

Indiquer les deux résultats et expliquer la différence.

## 🌺 EXERCICE 5 — DIVISION PAR ZÉRO

Analyser :

```abap
DATA lv_numerator   TYPE p LENGTH 8 DECIMALS 2 VALUE '10.00'.
DATA lv_denominator TYPE p LENGTH 8 DECIMALS 2 VALUE '0.00'.
DATA lv_quotient    TYPE p LENGTH 8 DECIMALS 2.

lv_quotient = lv_numerator / lv_denominator.
```

Ne pas conserver ce code sans protection.

Ajouter un contrôle empêchant la division lorsque le dénominateur vaut zéro.

## 🌺 LIVRABLES

- tableau d’association ;
- code des calculs ;
- résultats intermédiaires ;
- résultat des instructions équivalentes ;
- explication des priorités ;
- correction de la division par zéro.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les quatre opérations sont utilisées correctement.
- [ ] Les montants comportent deux décimales.
- [ ] Les résultats intermédiaires sont affichés.
- [ ] La priorité de la multiplication est comprise.
- [ ] La division par zéro est empêchée.
- [ ] Le résultat final est conforme.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — association

| Expression            | Instruction                |
| --------------------- | -------------------------- |
| `lv_a = lv_b.`        | `MOVE lv_b TO lv_a.`       |
| `lv_a = lv_a + lv_b.` | `ADD lv_b TO lv_a.`        |
| `lv_a = lv_a - lv_b.` | `SUBTRACT lv_b FROM lv_a.` |
| `lv_a = lv_a * lv_b.` | `MULTIPLY lv_a BY lv_b.`   |
| `lv_a = lv_a / lv_b.` | `DIVIDE lv_a BY lv_b.`     |

### Solution — commande

```abap
DATA lv_quantity   TYPE i VALUE 4.
DATA lv_unit_price TYPE p LENGTH 8 DECIMALS 2 VALUE '12.50'.
DATA lv_discount   TYPE p LENGTH 8 DECIMALS 2 VALUE '5.00'.
DATA lv_tax_rate   TYPE p LENGTH 5 DECIMALS 2 VALUE '20.00'.

DATA(lv_gross_amount) = lv_quantity * lv_unit_price.
DATA(lv_net_amount)   = lv_gross_amount - lv_discount.
DATA(lv_tax_amount)   = lv_net_amount * lv_tax_rate / 100.
DATA(lv_total_amount) = lv_net_amount + lv_tax_amount.

WRITE: / 'Montant brut         :', lv_gross_amount,
       / 'Montant après remise :', lv_net_amount,
       / 'Montant TVA          :', lv_tax_amount,
       / 'Montant TTC          :', lv_total_amount.
```

### Solution — instructions équivalentes

```abap
DATA lv_result TYPE p LENGTH 8 DECIMALS 2 VALUE '10.00'.

ADD 5 TO lv_result.
SUBTRACT 3 FROM lv_result.
MULTIPLY lv_result BY 2.
DIVIDE lv_result BY 4.

WRITE / lv_result.
```

Calcul :

```text
10 + 5 = 15
15 - 3 = 12
12 × 2 = 24
24 ÷ 4 = 6
```

### Solution — priorité

```text
lv_result_1 = 20
lv_result_2 = 30
```

La multiplication est effectuée avant l’addition, sauf lorsque des parenthèses imposent un autre ordre.

### Solution — division par zéro

```abap
IF lv_denominator IS INITIAL.
  WRITE / 'Division impossible : dénominateur nul'.
ELSE.
  lv_quotient = lv_numerator / lv_denominator.
  WRITE / lv_quotient.
ENDIF.
```

</details>
