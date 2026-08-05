# 🌸 EXERCICES — CONSTANTES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CONSTANTES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 03 - BASIC DECLARATIONS/02 - 🍧 CONSTANTS.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- distinguer variable et constante ;
- déclarer une constante avec `CONSTANTS`, `TYPE` et `VALUE` ;
- reprendre un type avec `LIKE` lorsque cela est pertinent ;
- remplacer une valeur métier codée en dur ;
- utiliser un nom explicite ;
- identifier une tentative de modification interdite.

## 🌺 DURÉE INDICATIVE

35 à 50 minutes.

## 🌺 CONTEXTE

Une commande bénéficie de la livraison gratuite lorsque son montant atteint `50,00 EUR`.

Dans le cas contraire, des frais fixes de `5,90 EUR` sont ajoutés.

Ces valeurs correspondent à des règles utilisées par le programme et ne doivent pas être répétées sous forme de littéraux sans nom.

## 🌺 EXERCICE 1 — VARIABLES OU CONSTANTES

Indiquer si chaque donnée doit être représentée par une variable ou une constante :

| Donnée                            | Variable ou constante | Justification |
| --------------------------------- | --------------------- | ------------- |
| Quantité saisie par l’utilisateur |                       |               |
| Seuil de livraison gratuite       |                       |               |
| Montant total calculé             |                       |               |
| Code devise `EUR`                 |                       |               |
| Frais fixes de livraison          |                       |               |
| Description saisie                |                       |               |

## 🌺 EXERCICE 2 — IDENTIFICATION DES VALEURS CODÉES EN DUR

Analyser le code suivant :

```abap
IF lv_total >= '50.00'.
  WRITE: / 'Livraison gratuite'.
ELSE.
  lv_total = lv_total + '5.90'.
ENDIF.

WRITE: / lv_total, 'EUR'.
```

Identifier :

1. les trois littéraux porteurs d’un sens métier ou technique ;
2. le risque lié à leur répétition ;
3. les noms de constantes adaptés ;
4. les types adaptés.

## 🌺 EXERCICE 3 — DÉCLARATION

Déclarer les constantes suivantes avant les variables :

```abap
CONSTANTS lc_free_shipping_threshold TYPE p LENGTH 8 DECIMALS 2
  VALUE '50.00'.

CONSTANTS lc_shipping_cost TYPE p LENGTH 8 DECIMALS 2
  VALUE '5.90'.

CONSTANTS lc_currency TYPE c LENGTH 3
  VALUE 'EUR'.
```

Remplacer ensuite les valeurs codées en dur par les constantes.

## 🌺 EXERCICE 4 — CONSTANTE AVEC `LIKE`

Ajouter une variable représentant le montant de référence :

```abap
DATA lv_reference_amount TYPE p LENGTH 8 DECIMALS 2.
```

Déclarer une constante de montant avec `LIKE` :

```abap
CONSTANTS lc_zero_amount LIKE lv_reference_amount
  VALUE '0.00'.
```

Répondre aux questions :

1. La constante est-elle modifiable parce que son type provient d’une variable ?
2. Que reprend `LIKE` ?
3. Quelle partie de la déclaration rend la valeur obligatoire ?
4. Pourquoi `lc_zero_amount` reste-t-elle une constante ?

## 🌺 EXERCICE 5 — TESTS FONCTIONNELS

Tester le traitement avec les cas suivants :

| Cas | Quantité | Prix unitaire | Total initial | Frais attendus | Total final |
| --- | -------: | ------------: | ------------: | -------------: | ----------: |
| 1   |        3 |         19,90 |         59,70 |           0,00 |       59,70 |
| 2   |        2 |         19,90 |         39,80 |           5,90 |       45,70 |
| 3   |        5 |         10,00 |         50,00 |           0,00 |       50,00 |

Le seuil est inclusif : un montant exactement égal à `50,00` bénéficie de la livraison gratuite.

## 🌺 EXERCICE 6 — ERREUR DE MODIFICATION

Ajouter temporairement l’instruction suivante après la déclaration de la constante :

```abap
lc_currency = 'USD'.
```

Effectuer uniquement les actions suivantes :

1. lancer le contrôle de syntaxe ;
2. relever le message ;
3. expliquer pourquoi l’activation doit être refusée ;
4. supprimer l’instruction ;
5. contrôler et activer à nouveau.

Ne pas modifier la déclaration de `lc_currency` pour contourner l’erreur.

## 🌺 LIVRABLES

- tableau variable ou constante ;
- liste des valeurs codées en dur ;
- déclarations des constantes ;
- code corrigé ;
- résultats des trois cas ;
- explication de l’erreur de modification.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les règles fixes sont déclarées avec `CONSTANTS`.
- [ ] Chaque constante possède un `VALUE`.
- [ ] Les constantes ont des noms explicites.
- [ ] Les littéraux métier ne sont plus répétés dans le traitement.
- [ ] Le seuil de `50,00` est inclusif.
- [ ] Les trois cas de test produisent le résultat attendu.
- [ ] La tentative de modification est identifiée comme une erreur de syntaxe.
- [ ] La version finale ne modifie aucune constante.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Donnée                      | Nature    | Justification                                          |
| --------------------------- | --------- | ------------------------------------------------------ |
| Quantité saisie             | Variable  | Sa valeur dépend de l’exécution.                       |
| Seuil de livraison gratuite | Constante | La règle reste fixe pendant l’exécution.               |
| Montant total calculé       | Variable  | Sa valeur dépend de la quantité, du prix et des frais. |
| Code devise `EUR`           | Constante | Le code utilisé par ce traitement est fixe.            |
| Frais de livraison          | Constante | Le montant constitue une règle fixe.                   |
| Description saisie          | Variable  | Le texte peut changer.                                 |

### Solution — exercices 2 et 3

Valeurs à remplacer :

```text
50.00
5.90
EUR
```

Code corrigé :

```abap
CONSTANTS lc_free_shipping_threshold TYPE p LENGTH 8 DECIMALS 2
  VALUE '50.00'.

CONSTANTS lc_shipping_cost TYPE p LENGTH 8 DECIMALS 2
  VALUE '5.90'.

CONSTANTS lc_currency TYPE c LENGTH 3
  VALUE 'EUR'.

DATA lv_total TYPE p LENGTH 8 DECIMALS 2.

IF lv_total >= lc_free_shipping_threshold.
  WRITE: / 'Livraison gratuite'.
ELSE.
  lv_total = lv_total + lc_shipping_cost.
ENDIF.

WRITE: / 'Total final :', lv_total, lc_currency.
```

### Solution — exercice 4

```abap
DATA lv_reference_amount TYPE p LENGTH 8 DECIMALS 2.

CONSTANTS lc_zero_amount LIKE lv_reference_amount
  VALUE '0.00'.
```

1. Non.
2. `LIKE` reprend le type de l’objet référencé.
3. L’addition `VALUE` fournit la valeur de la constante.
4. L’objet est déclaré avec le mot-clé `CONSTANTS`, pas avec `DATA`.

### Solution — exercice 5

Cas 1 :

```text
Total initial : 59,70 EUR
Livraison gratuite
Total final   : 59,70 EUR
```

Cas 2 :

```text
Total initial : 39,80 EUR
Frais ajoutés : 5,90 EUR
Total final   : 45,70 EUR
```

Cas 3 :

```text
Total initial : 50,00 EUR
Livraison gratuite
Total final   : 50,00 EUR
```

### Solution — exercice 6

L’instruction suivante est interdite :

```abap
lc_currency = 'USD'.
```

Une constante est un objet de données nommé dont la valeur ne peut pas être modifiée après sa déclaration.  
Le contrôle de syntaxe doit donc empêcher l’activation.

</details>
