# 🌸 EXERCICES — VARIABLES ABAP

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [VARIABLES ABAP](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 03 - BASIC DECLARATIONS/01 - 🍧 VARIABLES.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- distinguer une donnée, un type et une variable ;
- déclarer une variable avec `DATA` et `TYPE` ;
- reprendre le type d’un objet existant avec `LIKE` ;
- utiliser une déclaration inline ;
- choisir un type adapté à la sémantique métier ;
- distinguer texte numérique et nombre destiné aux calculs ;
- détecter une troncature liée à une longueur insuffisante.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 CONTEXTE

Le programme doit représenter une ligne de commande contenant :

| Donnée           | Règle                                    |
| ---------------- | ---------------------------------------- |
| Matricule        | Huit chiffres, sans calcul arithmétique  |
| Quantité         | Nombre entier                            |
| Prix unitaire    | Deux décimales                           |
| Description      | Longueur variable                        |
| Indicateur actif | Vrai ou faux                             |
| Montant total    | Quantité multipliée par le prix unitaire |

## 🌺 EXERCICE 1 — CHOIX DES TYPES

Compléter le tableau suivant :

| Donnée                | Type proposé | Justification |
| --------------------- | ------------ | ------------- |
| Matricule `00001234`  |              |               |
| Quantité `3`          |              |               |
| Prix unitaire `19,90` |              |               |
| Description longue    |              |               |
| Indicateur actif      |              |               |

Choisir parmi les types suivants :

```text
c
n
string
i
p
abap_bool
```

Répondre ensuite aux questions :

1. Pourquoi le matricule ne doit-il pas être déclaré avec `TYPE i` ?
2. Quelle différence existe entre `TYPE n` et `TYPE i` ?
3. Pourquoi un prix ne doit-il pas être stocké dans une variable de type `string` ?
4. Quelle information doit être précisée avec un type `p` pour représenter un montant ?

## 🌺 EXERCICE 2 — DÉCLARATION EXPLICITE

Créer les variables suivantes au début du programme :

```abap
DATA lv_employee_id TYPE n LENGTH 8.
DATA lv_quantity    TYPE i.
DATA lv_unit_price  TYPE p LENGTH 8 DECIMALS 2.
DATA lv_description TYPE string.
DATA lv_is_active   TYPE abap_bool.
```

Affecter les valeurs suivantes :

```text
Matricule       : 00001234
Quantité        : 3
Prix unitaire   : 19,90
Description     : Révision des déclarations ABAP
Indicateur actif: vrai
```

Afficher chaque valeur avec un libellé explicite.

Le résultat doit permettre de vérifier que les zéros placés au début du matricule sont conservés.

## 🌺 EXERCICE 3 — `TYPE` ET `LIKE`

Ajouter une variable représentant un prix remisé.

Cette variable doit reprendre exactement le type de `lv_unit_price` sans répéter sa définition technique.

Compléter le code :

```abap
DATA lv_discounted_price ______ lv_unit_price.

lv_discounted_price = '17.50'.
```

Répondre ensuite aux questions :

1. Quel mot-clé doit remplacer les pointillés ?
2. Que se passe-t-il si le type de `lv_unit_price` est modifié ultérieurement ?
3. Dans quel cas `TYPE` reste-t-il plus lisible que `LIKE` ?

## 🌺 EXERCICE 4 — DÉCLARATION INLINE

Calculer le montant total avec une déclaration inline :

```abap
DATA(lv_total) = lv_quantity * lv_unit_price.
```

Afficher le résultat :

```abap
WRITE: / 'Montant total :', lv_total.
```

Répondre ensuite aux questions :

1. Où `lv_total` est-elle déclarée ?
2. Son type est-il écrit explicitement dans le code ?
3. Quel élément permet à ABAP d’en déterminer le type ?
4. Une déclaration inline doit-elle être utilisée lorsque la variable doit être visible dans plusieurs traitements éloignés ?

## 🌺 EXERCICE 5 — TRONCATURE

Ajouter temporairement le code suivant :

```abap
DATA lv_short_text TYPE c LENGTH 5.

lv_short_text = 'FORMATION'.

WRITE: / 'Texte court :', lv_short_text.
```

Effectuer les actions suivantes :

1. contrôler la syntaxe ;
2. activer le programme ;
3. l’exécuter ;
4. relever la valeur réellement affichée ;
5. expliquer pourquoi aucune erreur de syntaxe n’est produite ;
6. corriger la longueur pour conserver le mot complet ;
7. exécuter à nouveau.

## 🌺 EXERCICE 6 — MAUVAIS CHOIX DE TYPE

Analyser le code suivant sans l’intégrer à la version finale :

```abap
DATA lv_postal_code TYPE i VALUE 75001.
```

Le besoin métier évolue et doit accepter la valeur suivante :

```text
01230
```

Répondre aux questions :

1. La valeur métier est-elle un nombre destiné à un calcul ?
2. Quel problème produit le type `i` ?
3. Quel type convient mieux ?
4. Quelle longueur faut-il définir ?

## 🌺 RÉSULTAT ATTENDU

Le format exact dépend des paramètres d’affichage SAP, mais les valeurs doivent correspondre à :

```text
Matricule       : 00001234
Quantité        : 3
Prix unitaire   : 19,90
Description     : Révision des déclarations ABAP
Actif           : X
Prix remisé     : 17,50
Montant total   : 59,70
```

Pour l’exercice de troncature :

```text
Texte court : FORMA
```

Après correction :

```text
Texte court : FORMATION
```

## 🌺 LIVRABLES

- tableau de choix des types complété ;
- code du programme ;
- affichage des valeurs ;
- réponse sur `TYPE` et `LIKE` ;
- résultat avant et après correction de la troncature ;
- correction du type du code postal.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le matricule conserve ses huit chiffres.
- [ ] La quantité utilise un type numérique entier.
- [ ] Le prix possède deux décimales.
- [ ] La description utilise une longueur variable.
- [ ] L’indicateur utilise `abap_bool`.
- [ ] Une variable est déclarée avec `LIKE`.
- [ ] Le total est déclaré inline.
- [ ] La troncature est reproduite et expliquée.
- [ ] Le code postal est traité comme un texte numérique.
- [ ] La version finale est active et exécutable.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Donnée                | Type proposé            | Justification                                                                                                          |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Matricule `00001234`  | `n LENGTH 8`            | Il contient uniquement des chiffres, mais n’est pas utilisé pour un calcul. Les zéros initiaux doivent être conservés. |
| Quantité `3`          | `i`                     | Il s’agit d’un entier destiné aux calculs.                                                                             |
| Prix unitaire `19,90` | `p LENGTH 8 DECIMALS 2` | Il s’agit d’un nombre décimal avec deux décimales définies.                                                            |
| Description longue    | `string`                | La longueur du texte peut varier.                                                                                      |
| Indicateur actif      | `abap_bool`             | La donnée représente un état vrai ou faux.                                                                             |

1. Un entier ne conserve pas la représentation textuelle avec les zéros initiaux.
2. `n` est un type caractère numérique ; `i` est un type entier utilisé pour les opérations arithmétiques.
3. Une chaîne ne fournit pas directement la sémantique et les règles d’un nombre décimal.
4. Il faut notamment préciser le nombre de décimales. La longueur doit également couvrir les valeurs métier attendues.

### Solution — exercices 2 à 4

```abap
REPORT zaelion_<tri>_declarations.

DATA lv_employee_id     TYPE n LENGTH 8.
DATA lv_quantity        TYPE i.
DATA lv_unit_price      TYPE p LENGTH 8 DECIMALS 2.
DATA lv_discounted_price LIKE lv_unit_price.
DATA lv_description     TYPE string.
DATA lv_is_active       TYPE abap_bool.

START-OF-SELECTION.

  lv_employee_id      = '00001234'.
  lv_quantity         = 3.
  lv_unit_price       = '19.90'.
  lv_discounted_price = '17.50'.
  lv_description      = `Révision des déclarations ABAP`.
  lv_is_active        = abap_true.

  DATA(lv_total) = lv_quantity * lv_unit_price.

  WRITE: / 'Matricule       :', lv_employee_id,
         / 'Quantité        :', lv_quantity,
         / 'Prix unitaire   :', lv_unit_price,
         / 'Description     :', lv_description,
         / 'Actif           :', lv_is_active,
         / 'Prix remisé     :', lv_discounted_price,
         / 'Montant total   :', lv_total.
```

`LIKE` reprend les propriétés de type de l’objet de données référencé.  
Si le type de `lv_unit_price` change, `lv_discounted_price` suit cette définition lors de la prochaine activation.

`TYPE` reste généralement plus clair lorsque le type attendu constitue un contrat explicite indépendant d’une autre variable.

La déclaration inline crée `lv_total` à l’endroit de l’affectation.  
Le type est déduit de l’expression située à droite du signe `=`.

### Solution — exercice 5

Avec une longueur de cinq caractères :

```abap
DATA lv_short_text TYPE c LENGTH 5.

lv_short_text = 'FORMATION'.

WRITE: / 'Texte court :', lv_short_text.
```

Résultat :

```text
FORMA
```

Le code est syntaxiquement valide. La zone cible est seulement trop courte pour conserver toute la valeur.

Correction :

```abap
DATA lv_short_text TYPE c LENGTH 9.
```

### Solution — exercice 6

Correction :

```abap
DATA lv_postal_code TYPE n LENGTH 5 VALUE '01230'.
```

Le code postal est un identifiant textuel composé de chiffres.  
Il ne doit pas perdre son zéro initial et n’est pas destiné à une opération arithmétique.

</details>
