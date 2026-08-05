# 🌸 EXERCICES — STRUCTURE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [STRUCTURE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  01 - 🧩 STRUCTURES/01 - 🍧 STRUCTURES.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir une structure ;
- distinguer type, structure et composant ;
- déclarer un type structuré local ;
- déclarer plusieurs objets du même type ;
- accéder à un composant avec le sélecteur `-` ;
- modifier un composant sans modifier les autres ;
- copier une structure complète du même type ;
- réinitialiser toute la structure ;
- détecter une longueur de composant insuffisante.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 CONTEXTE

Le programme manipule la fiche d’un article de formation.

Chaque article possède :

| Composant     | Signification                          | Type attendu            |
| ------------- | -------------------------------------- | ----------------------- |
| `material_id` | Identifiant article sur six caractères | `c LENGTH 6`            |
| `description` | Désignation de longueur variable       | `string`                |
| `category`    | Catégorie sur dix caractères           | `c LENGTH 10`           |
| `quantity`    | Quantité entière                       | `i`                     |
| `unit_price`  | Prix avec deux décimales               | `p LENGTH 8 DECIMALS 2` |
| `currency`    | Devise sur trois caractères            | `c LENGTH 3`            |
| `available`   | Indicateur booléen                     | `abap_bool`             |

## 🌺 EXERCICE 1 — VOCABULAIRE

Compléter le tableau :

| Élément                   | Nature | Rôle |
| ------------------------- | ------ | ---- |
| `ty_material`             |        |      |
| `ls_material`             |        |      |
| `material_id`             |        |      |
| `TYPES`                   |        |      |
| `DATA`                    |        |      |
| `ls_material-material_id` |        |      |

Répondre ensuite :

1. `ty_material` contient-il directement les valeurs de l’article ?
2. Peut-on créer plusieurs structures à partir de `ty_material` ?
3. Les composants d’une structure doivent-ils tous avoir le même type ?
4. Quel caractère sépare le nom de la structure du nom de son composant ?
5. Une structure représente-t-elle une seule donnée élémentaire ?

## 🌺 EXERCICE 2 — DÉCLARATION DU TYPE

Définir le type local suivant :

```abap
TYPES: BEGIN OF ty_material,
         material_id TYPE c LENGTH 6,
         description TYPE string,
         category    TYPE c LENGTH 10,
         quantity    TYPE i,
         unit_price  TYPE p LENGTH 8 DECIMALS 2,
         currency    TYPE c LENGTH 3,
         available   TYPE abap_bool,
       END OF ty_material.
```

Déclarer ensuite :

```abap
DATA ls_material      TYPE ty_material.
DATA ls_material_copy TYPE ty_material.
```

Répondre :

1. Combien de types structurés sont définis ?
2. Combien d’objets de données structurés sont créés ?
3. `ls_material` et `ls_material_copy` occupent-ils la même zone mémoire ?
4. Une modification de `ls_material_copy` modifie-t-elle automatiquement `ls_material` ?

## 🌺 EXERCICE 3 — ALIMENTATION DES COMPOSANTS

Alimenter `ls_material` avec les valeurs suivantes :

```text
Identifiant : MAT001
Désignation : Clavier sans fil
Catégorie   : ACCESSOIRE
Quantité    : 3
Prix        : 29,90
Devise      : EUR
Disponible  : vrai
```

Contraintes :

- affecter chaque composant séparément ;
- utiliser `abap_true` pour l’indicateur ;
- ne pas déclarer sept variables élémentaires séparées à la place de la structure.

Afficher :

```text
ARTICLE
Identifiant : MAT001
Désignation : Clavier sans fil
Catégorie   : ACCESSOIRE
Quantité    : 3
Prix        : 29,90 EUR
Disponible  : X
```

Le séparateur décimal exact dépend des paramètres utilisateur SAP.

## 🌺 EXERCICE 4 — ACCÈS ET MODIFICATION CIBLÉS

Effectuer les actions suivantes :

1. afficher uniquement la désignation ;
2. remplacer la quantité `3` par `5` ;
3. remplacer le prix `29,90` par `27,50` ;
4. afficher la quantité et le prix ;
5. vérifier que l’identifiant et la devise n’ont pas changé.

Compléter :

| Composant     | Avant    | Après |
| ------------- | -------- | ----- |
| `material_id` | `MAT001` |       |
| `quantity`    | `3`      |       |
| `unit_price`  | `29,90`  |       |
| `currency`    | `EUR`    |       |

Expliquer pourquoi l’affectation suivante ne modifie que le prix :

```abap
ls_material-unit_price = '27.50'.
```

## 🌺 EXERCICE 5 — CALCUL À PARTIR DES COMPOSANTS

Calculer le montant total :

```text
Quantité × Prix unitaire
```

Déclarer le résultat inline :

```abap
DATA(lv_total_amount) =
  ls_material-quantity * ls_material-unit_price.
```

Résultat attendu après les modifications de l’exercice précédent :

```text
Montant total : 137,50 EUR
```

Répondre :

1. Le montant total devient-il automatiquement un nouveau composant de `ls_material` ?
2. Pourquoi `lv_total_amount` reste-t-il une variable distincte ?
3. Les composants d’une structure peuvent-ils participer à des expressions arithmétiques ?

## 🌺 EXERCICE 6 — COPIE COMPLÈTE DU MÊME TYPE

Copier toute la structure :

```abap
ls_material_copy = ls_material.
```

Modifier uniquement la copie :

```text
Identifiant : MAT002
Quantité    : 10
```

Afficher les deux structures.

Résultat attendu :

```text
SOURCE : MAT001 - Quantité 5
COPIE  : MAT002 - Quantité 10
```

Répondre :

1. Pourquoi tous les composants sont-ils copiés ?
2. Pourquoi la modification de la copie n’affecte-t-elle pas la source ?
3. La correspondance des noms est-elle recherchée à l’exécution dans cet exemple ?
4. Quelle condition rend cette affectation simple et lisible ?

## 🌺 EXERCICE 7 — CLEAR SUR UNE STRUCTURE

Exécuter :

```abap
CLEAR ls_material_copy.
```

Vérifier ensuite :

```abap
IF ls_material_copy IS INITIAL.
  WRITE / 'La copie est initiale'.
ENDIF.
```

Compléter :

| Composant     | Valeur après `CLEAR` |
| ------------- | -------------------- |
| `material_id` |                      |
| `description` |                      |
| `quantity`    |                      |
| `unit_price`  |                      |
| `available`   |                      |

Répondre :

1. `CLEAR` supprime-t-il la déclaration de la structure ?
2. Faut-il appeler `CLEAR` séparément sur chaque composant ?
3. `ls_material` est-elle également remise à zéro ?
4. Que teste `ls_material_copy IS INITIAL` ?

## 🌺 EXERCICE 8 — STRUCTURE INITIALE ET COMPOSANT INITIAL

Déclarer une nouvelle structure :

```abap
DATA ls_empty_material TYPE ty_material.
```

Tester :

```abap
IF ls_empty_material IS INITIAL.
```

Puis affecter uniquement :

```abap
ls_empty_material-currency = 'EUR'.
```

Tester à nouveau la structure complète.

Répondre :

1. La structure est-elle initiale avant l’affectation ?
2. Le composant `material_id` reste-t-il initial après l’affectation ?
3. La structure complète reste-t-elle initiale ?
4. Une structure est-elle initiale lorsque tous ses composants sont initiaux ou lorsqu’un seul composant est initial ?

## 🌺 EXERCICE 9 — DIAGNOSTIC DE LONGUEUR

Analyser la définition incorrecte suivante :

```abap
TYPES: BEGIN OF ty_short_material,
         material_id TYPE c LENGTH 6,
         description TYPE c LENGTH 10,
       END OF ty_short_material.

DATA ls_short_material TYPE ty_short_material.

ls_short_material-material_id = 'MAT001'.
ls_short_material-description = 'Clavier sans fil'.
```

Effectuer les actions suivantes :

1. prévoir la valeur conservée dans `description` ;
2. contrôler la syntaxe ;
3. exécuter le programme ;
4. relever le résultat ;
5. expliquer pourquoi la syntaxe peut être valide ;
6. corriger le type du composant pour conserver la désignation complète.

## 🌺 EXERCICE 10 — DIAGNOSTIC DE SÉLECTEUR

Analyser :

```abap
WRITE / ls_material.description.
```

Répondre :

1. Cette syntaxe est-elle correcte en ABAP pour accéder à un composant statique ?
2. Quel sélecteur faut-il utiliser ?
3. Corriger l’instruction.
4. L’erreur est-elle fonctionnelle ou syntaxique ?

## 🌺 RÉSULTAT FINAL ATTENDU

```text
ARTICLE
Identifiant : MAT001
Désignation : Clavier sans fil
Catégorie   : ACCESSOIRE
Quantité    : 5
Prix        : 27,50 EUR
Disponible  : X
Montant total : 137,50 EUR

SOURCE : MAT001 - Quantité 5
COPIE  : MAT002 - Quantité 10
La copie est initiale
```

## 🌺 LIVRABLES

- tableau de vocabulaire ;
- définition de `ty_material` ;
- déclaration des deux structures ;
- code d’alimentation ;
- résultat avant et après modification ;
- calcul du montant ;
- preuve d’indépendance de la copie ;
- résultat après `CLEAR` ;
- analyse de l’état initial ;
- correction de la troncature ;
- correction du sélecteur.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `TYPES` et `DATA` sont distingués.
- [ ] Le type structuré contient les sept composants demandés.
- [ ] Deux objets distincts utilisent le même type.
- [ ] Les composants sont alimentés avec le sélecteur `-`.
- [ ] Une modification ciblée n’affecte pas les autres composants.
- [ ] Le montant total est correctement calculé.
- [ ] L’affectation complète entre structures du même type est maîtrisée.
- [ ] La copie reste indépendante de la source.
- [ ] `CLEAR` initialise toute la structure cible.
- [ ] L’état initial de la structure complète est correctement interprété.
- [ ] La troncature est reproduite et corrigée.
- [ ] Aucun accès avec `.` ne subsiste.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — vocabulaire

| Élément                   | Nature                        | Rôle                                              |
| ------------------------- | ----------------------------- | ------------------------------------------------- |
| `ty_material`             | Type structuré local          | Sert de modèle pour créer des objets structurés.  |
| `ls_material`             | Objet de données structuré    | Contient les valeurs d’un article.                |
| `material_id`             | Composant                     | Contient une partie de la valeur de la structure. |
| `TYPES`                   | Instruction déclarative       | Définit un type de données.                       |
| `DATA`                    | Instruction déclarative       | Crée un objet de données.                         |
| `ls_material-material_id` | Accès statique à un composant | Désigne l’identifiant contenu dans la structure.  |

1. Non.
2. Oui.
3. Non.
4. Le tiret `-`.
5. Non. Elle regroupe plusieurs composants.

### Solution — programme principal

```abap
REPORT zaelion_<tri>_structures.

TYPES: BEGIN OF ty_material,
         material_id TYPE c LENGTH 6,
         description TYPE string,
         category    TYPE c LENGTH 10,
         quantity    TYPE i,
         unit_price  TYPE p LENGTH 8 DECIMALS 2,
         currency    TYPE c LENGTH 3,
         available   TYPE abap_bool,
       END OF ty_material.

DATA ls_material      TYPE ty_material.
DATA ls_material_copy TYPE ty_material.

START-OF-SELECTION.

  ls_material-material_id = 'MAT001'.
  ls_material-description = `Clavier sans fil`.
  ls_material-category    = 'ACCESSOIRE'.
  ls_material-quantity    = 3.
  ls_material-unit_price  = '29.90'.
  ls_material-currency    = 'EUR'.
  ls_material-available   = abap_true.

  WRITE: / 'ARTICLE',
         / 'Identifiant :', ls_material-material_id,
         / 'Désignation :', ls_material-description,
         / 'Catégorie   :', ls_material-category,
         / 'Quantité    :', ls_material-quantity,
         / 'Prix        :',
             ls_material-unit_price,
             ls_material-currency,
         / 'Disponible  :', ls_material-available.

  WRITE: /,
         / 'Désignation seule :',
             ls_material-description.

  ls_material-quantity   = 5.
  ls_material-unit_price = '27.50'.

  DATA(lv_total_amount) =
    ls_material-quantity * ls_material-unit_price.

  WRITE: /,
         / 'Après modification',
         / 'Identifiant :', ls_material-material_id,
         / 'Quantité    :', ls_material-quantity,
         / 'Prix        :',
             ls_material-unit_price,
             ls_material-currency,
         / 'Montant total :',
             lv_total_amount,
             ls_material-currency.

  ls_material_copy = ls_material.

  ls_material_copy-material_id = 'MAT002'.
  ls_material_copy-quantity    = 10.

  WRITE: /,
         / 'SOURCE :',
             ls_material-material_id,
             '- Quantité',
             ls_material-quantity,
         / 'COPIE  :',
             ls_material_copy-material_id,
             '- Quantité',
             ls_material_copy-quantity.

  CLEAR ls_material_copy.

  IF ls_material_copy IS INITIAL.
    WRITE / 'La copie est initiale'.
  ENDIF.
```

### Solution — nombre d’objets

Un seul type structuré est défini :

```text
ty_material
```

Deux objets de données distincts sont créés :

```text
ls_material
ls_material_copy
```

Chaque objet possède sa propre valeur.

### Solution — tableau de modification

| Composant     | Avant    | Après    |
| ------------- | -------- | -------- |
| `material_id` | `MAT001` | `MAT001` |
| `quantity`    | `3`      | `5`      |
| `unit_price`  | `29,90`  | `27,50`  |
| `currency`    | `EUR`    | `EUR`    |

### Solution — calcul

```abap
DATA(lv_total_amount) =
  ls_material-quantity * ls_material-unit_price.
```

Le résultat est une variable distincte. La définition de `ty_material` n’est pas modifiée par un calcul effectué après sa déclaration.

### Solution — copie

```abap
ls_material_copy = ls_material.
```

Les structures ont le même type. Toute la valeur structurée est copiée. Les deux objets restent indépendants.

### Solution — CLEAR

| Composant     | Valeur après `CLEAR` |
| ------------- | -------------------- |
| `material_id` | espaces              |
| `description` | chaîne vide          |
| `quantity`    | `0`                  |
| `unit_price`  | `0`                  |
| `available`   | espace               |

La déclaration subsiste. Seule la valeur est initialisée.

### Solution — structure initiale

```abap
DATA ls_empty_material TYPE ty_material.

IF ls_empty_material IS INITIAL.
  WRITE / 'Structure entièrement initiale'.
ENDIF.

ls_empty_material-currency = 'EUR'.

IF ls_empty_material IS NOT INITIAL.
  WRITE / 'La structure contient au moins une valeur non initiale'.
ENDIF.
```

Après l’affectation de la devise, les autres composants peuvent rester initiaux, mais la structure complète ne l’est plus.

### Solution — troncature

Avec `TYPE c LENGTH 10`, le résultat conservé est limité à dix caractères :

```text
Clavier sa
```

Correction :

```abap
description TYPE string,
```

### Solution — sélecteur

Incorrect :

```abap
WRITE / ls_material.description.
```

Correct :

```abap
WRITE / ls_material-description.
```

Il s’agit d’une erreur de syntaxe.

</details>
