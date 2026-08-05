# 🌸 EXERCICES — MOVE CORRESPONDING (STRUCTURES)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- transférer des composants portant le même nom ;
- expliquer que l’ordre des composants n’a pas d’importance ;
- identifier les composants copiés, ignorés et conservés ;
- comprendre qu’une valeur initiale source écrase la valeur d’un composant cible correspondant ;
- préserver ou réinitialiser volontairement les composants sans source ;
- distinguer affectation complète et correspondance par nom ;
- détecter une conversion implicite avec troncature ;
- utiliser des field-symbols génériques sur des structures connues.

## 🌺 DURÉE INDICATIVE

70 à 90 minutes.

## 🌺 CONTEXTE

Une première structure contient les données issues d’un système source.

Une seconde structure représente les données préparées pour l’affichage.

### Structure source

| Composant       | Valeur         |
| --------------- | -------------- |
| `customer_id`   | `C10001`       |
| `name`          | `Alice Martin` |
| `country`       | `FR`           |
| `credit_limit`  | `2500,00`      |
| `source_system` | `S4`           |

### Structure cible

| Composant     | Valeur initiale avant transfert |
| ------------- | ------------------------------- |
| `country`     | espace                          |
| `name`        | espace                          |
| `customer_id` | espace                          |
| `postal_code` | `75001`                         |
| `status`      | `ACTIF`                         |

## 🌺 EXERCICE 1 — DÉCLARATION DES STRUCTURES

Définir :

```abap
TYPES: BEGIN OF ty_customer_source,
         customer_id  TYPE c LENGTH 6,
         name         TYPE c LENGTH 30,
         country      TYPE c LENGTH 3,
         credit_limit TYPE p LENGTH 8 DECIMALS 2,
         source_system TYPE c LENGTH 4,
       END OF ty_customer_source.

TYPES: BEGIN OF ty_customer_target,
         country      TYPE c LENGTH 3,
         name         TYPE c LENGTH 30,
         customer_id  TYPE c LENGTH 6,
         postal_code  TYPE c LENGTH 5,
         status       TYPE c LENGTH 10,
       END OF ty_customer_target.
```

Déclarer :

```abap
DATA ls_customer_source TYPE ty_customer_source.
DATA ls_customer_target TYPE ty_customer_target.
```

Répondre :

1. Les deux structures ont-elles le même type ?
2. Quels composants possèdent le même nom ?
3. Quels composants existent uniquement dans la source ?
4. Quels composants existent uniquement dans la cible ?
5. L’ordre des composants communs est-il identique ?

## 🌺 EXERCICE 2 — PRÉVISION DU TRANSFERT

Avant d’exécuter l’instruction, compléter :

```abap
MOVE-CORRESPONDING ls_customer_source
  TO ls_customer_target.
```

| Composant cible | Correspondance source | Valeur après transfert |
| --------------- | --------------------- | ---------------------- |
| `country`       |                       |                        |
| `name`          |                       |                        |
| `customer_id`   |                       |                        |
| `postal_code`   |                       |                        |
| `status`        |                       |                        |

## 🌺 EXERCICE 3 — TRANSFERT NOMINAL

Alimenter la source :

```abap
ls_customer_source-customer_id   = 'C10001'.
ls_customer_source-name          = 'Alice Martin'.
ls_customer_source-country       = 'FR'.
ls_customer_source-credit_limit  = '2500.00'.
ls_customer_source-source_system = 'S4'.
```

Initialiser les composants propres à la cible :

```abap
ls_customer_target-postal_code = '75001'.
ls_customer_target-status      = 'ACTIF'.
```

Exécuter :

```abap
MOVE-CORRESPONDING ls_customer_source
  TO ls_customer_target.
```

Afficher tous les composants des deux structures.

Résultat attendu pour la cible :

```text
Client      : C10001
Nom         : Alice Martin
Pays        : FR
Code postal : 75001
Statut      : ACTIF
```

Répondre :

1. Pourquoi `credit_limit` n’est-il pas transféré ?
2. Pourquoi `source_system` n’est-il pas transféré ?
3. Pourquoi `postal_code` reste-t-il `75001` ?
4. Pourquoi `status` reste-t-il `ACTIF` ?
5. Pourquoi `country` est-il copié malgré sa première position dans la cible ?

## 🌺 EXERCICE 4 — DESTINATION RÉINITIALISÉE

Exécuter :

```abap
CLEAR ls_customer_target.

MOVE-CORRESPONDING ls_customer_source
  TO ls_customer_target.
```

Afficher à nouveau la cible.

Résultat attendu :

```text
Client      : C10001
Nom         : Alice Martin
Pays        : FR
Code postal :
Statut      :
```

Répondre :

1. `MOVE-CORRESPONDING` a-t-il lui-même initialisé `postal_code` ?
2. Quelle instruction a supprimé les anciennes valeurs ?
3. Dans quel cas faut-il initialiser la cible avant le transfert ?
4. Dans quel cas faut-il préserver les composants propres à la cible ?

## 🌺 EXERCICE 5 — COMPOSANT COMMUN INITIAL DANS LA SOURCE

Préparer la cible :

```abap
ls_customer_target-country = 'DE'.
ls_customer_target-status  = 'ACTIF'.
```

Initialiser uniquement le pays de la source :

```abap
CLEAR ls_customer_source-country.
```

Exécuter le transfert.

Prévoir :

| Composant cible | Avant   | Après |
| --------------- | ------- | ----- |
| `country`       | `DE`    |       |
| `status`        | `ACTIF` |       |

Expliquer la différence entre :

- un composant cible correspondant à un composant source initial ;
- un composant cible sans composant source correspondant.

## 🌺 EXERCICE 6 — ORDRE DES COMPOSANTS

Les composants communs ne sont pas déclarés dans le même ordre.

Répondre :

1. `MOVE-CORRESPONDING` utilise-t-il la position du composant ?
2. Quelle propriété détermine la correspondance ?
3. Que se passerait-il si la cible contenait `customer_name` au lieu de `name` ?
4. Une signification métier identique suffit-elle si les noms diffèrent ?

Modifier temporairement :

```abap
name TYPE c LENGTH 30,
```

en :

```abap
customer_name TYPE c LENGTH 30,
```

dans la cible.

Contrôler le résultat, puis restaurer le nom `name`.

## 🌺 EXERCICE 7 — AFFECTATION COMPLÈTE OU CORRESPONDANCE

Créer deux objets du même type :

```abap
DATA ls_source_copy TYPE ty_customer_source.
DATA ls_target_copy TYPE ty_customer_source.
```

Alimenter `ls_source_copy`, puis exécuter :

```abap
ls_target_copy = ls_source_copy.
```

Comparer avec :

```abap
MOVE-CORRESPONDING ls_customer_source
  TO ls_customer_target.
```

Compléter :

| Critère                        | Affectation complète | `MOVE-CORRESPONDING` |
| ------------------------------ | -------------------- | -------------------- |
| Exemple                        |                      |                      |
| Types utilisés dans l’exercice |                      |                      |
| Base du transfert              |                      |                      |
| Composants transférés          |                      |                      |
| Composants cibles sans source  |                      |                      |

## 🌺 EXERCICE 8 — CONVERSION IMPLICITE ET TRONCATURE

Définir :

```abap
TYPES: BEGIN OF ty_country_source,
         country_name TYPE string,
       END OF ty_country_source.

TYPES: BEGIN OF ty_country_target,
         country_name TYPE c LENGTH 2,
       END OF ty_country_target.

DATA ls_country_source TYPE ty_country_source.
DATA ls_country_target TYPE ty_country_target.
```

Alimenter :

```abap
ls_country_source-country_name = `FRANCE`.
```

Exécuter :

```abap
MOVE-CORRESPONDING ls_country_source
  TO ls_country_target.
```

Répondre avant exécution :

1. Les composants portent-ils le même nom ?
2. Leurs types sont-ils identiques ?
3. Une conversion est-elle nécessaire ?
4. Toute la valeur `FRANCE` tient-elle dans la cible ?
5. Quelle valeur est attendue ?

Exécuter et relever le résultat.

## 🌺 EXERCICE 9 — DIAGNOSTIC D’UNE SUPPOSÉE « COPIE SÛRE »

Analyser l’affirmation :

```text
MOVE-CORRESPONDING est toujours sûr dès que les champs ont le même nom.
```

Répondre :

1. Pourquoi cette affirmation est-elle incorrecte ?
2. Quels contrôles doivent être effectués avant le transfert ?
3. Une correspondance par nom contrôle-t-elle la signification métier ?
4. Deux composants nommés `amount` peuvent-ils avoir des unités ou devises différentes ?
5. Quelle preuve doit être apportée par les tests ?

## 🌺 EXERCICE 10 — FIELD-SYMBOLS GÉNÉRIQUES

Réutiliser les structures client.

Déclarer :

```abap
FIELD-SYMBOLS:
  <lfs_source> TYPE any,
  <lfs_target> TYPE any.
```

Assigner :

```abap
ASSIGN ls_customer_source TO <lfs_source>.
ASSIGN ls_customer_target TO <lfs_target>.
```

Effectuer le transfert uniquement si les deux field-symbols sont assignés :

```abap
IF <lfs_source> IS ASSIGNED
   AND <lfs_target> IS ASSIGNED.

  MOVE-CORRESPONDING <lfs_source>
    TO <lfs_target>.

ENDIF.
```

Répondre :

1. Les field-symbols contiennent-ils une copie des structures ?
2. `IS ASSIGNED` vérifie-t-il que les deux références existent ?
3. `IS ASSIGNED` vérifie-t-il à lui seul la cohérence métier des composants ?
4. Pourquoi cet exercice reste-t-il maîtrisé malgré le type générique `any` ?
5. Pourquoi un type précis reste-t-il préférable lorsque les structures sont connues ?

> [!CAUTION]
> Le type générique réduit les contrôles statiques.  
> Dans cet exercice, les objets réellement assignés sont connus et structurés.

## 🌺 EXERCICE 11 — DIAGNOSTIC DE CHAMP NON COPIÉ

La source contient :

```abap
name TYPE c LENGTH 30,
```

La cible contient :

```abap
customer_name TYPE c LENGTH 30,
```

Le stagiaire constate que le nom n’est pas transféré.

Décrire :

1. le symptôme ;
2. la cause ;
3. la correction la plus simple ;
4. une correction manuelle si les noms doivent rester différents ;
5. le test de non-régression.

## 🌺 RÉSULTATS ATTENDUS

### Transfert nominal

```text
Client      : C10001
Nom         : Alice Martin
Pays        : FR
Code postal : 75001
Statut      : ACTIF
```

### Après `CLEAR` de la cible

```text
Client      : C10001
Nom         : Alice Martin
Pays        : FR
Code postal :
Statut      :
```

### Source commune initiale

```text
Pays cible  :
Statut cible: ACTIF
```

### Conversion implicite

```text
Pays : FR
```

## 🌺 LIVRABLES

- déclaration des deux types ;
- tableau des composants communs et spécifiques ;
- prévision du transfert ;
- résultat nominal ;
- résultat après `CLEAR` ;
- analyse d’un composant source initial ;
- preuve de correspondance par nom ;
- tableau comparatif des deux types d’affectation ;
- résultat de la troncature ;
- réfutation de l’affirmation incorrecte ;
- code avec field-symbols ;
- correction du champ renommé.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les composants communs sont identifiés.
- [ ] Les composants source sans cible sont ignorés.
- [ ] Les composants cible sans source restent inchangés.
- [ ] `CLEAR` est distingué du comportement de `MOVE-CORRESPONDING`.
- [ ] Une valeur initiale source est transférée vers un composant commun.
- [ ] L’ordre des composants n’est pas utilisé.
- [ ] La correspondance dépend du nom.
- [ ] L’affectation complète du même type est distinguée du transfert partiel.
- [ ] Une conversion implicite avec troncature est reproduite.
- [ ] `MOVE-CORRESPONDING` n’est pas présenté comme automatiquement sûr.
- [ ] Les field-symbols sont contrôlés avec `IS ASSIGNED`.
- [ ] Le champ renommé est corrigé explicitement.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — composants

Composants communs :

```text
customer_id
name
country
```

Uniquement dans la source :

```text
credit_limit
source_system
```

Uniquement dans la cible :

```text
postal_code
status
```

### Solution — programme nominal

```abap
TYPES: BEGIN OF ty_customer_source,
         customer_id   TYPE c LENGTH 6,
         name          TYPE c LENGTH 30,
         country       TYPE c LENGTH 3,
         credit_limit  TYPE p LENGTH 8 DECIMALS 2,
         source_system TYPE c LENGTH 4,
       END OF ty_customer_source.

TYPES: BEGIN OF ty_customer_target,
         country      TYPE c LENGTH 3,
         name         TYPE c LENGTH 30,
         customer_id  TYPE c LENGTH 6,
         postal_code  TYPE c LENGTH 5,
         status       TYPE c LENGTH 10,
       END OF ty_customer_target.

DATA ls_customer_source TYPE ty_customer_source.
DATA ls_customer_target TYPE ty_customer_target.

ls_customer_source-customer_id   = 'C10001'.
ls_customer_source-name          = 'Alice Martin'.
ls_customer_source-country       = 'FR'.
ls_customer_source-credit_limit  = '2500.00'.
ls_customer_source-source_system = 'S4'.

ls_customer_target-postal_code = '75001'.
ls_customer_target-status      = 'ACTIF'.

MOVE-CORRESPONDING ls_customer_source
  TO ls_customer_target.

WRITE: / 'Client      :',
           ls_customer_target-customer_id,
       / 'Nom         :',
           ls_customer_target-name,
       / 'Pays        :',
           ls_customer_target-country,
       / 'Code postal :',
           ls_customer_target-postal_code,
       / 'Statut      :',
           ls_customer_target-status.
```

### Solution — prévision

| Composant cible | Correspondance | Valeur         |
| --------------- | -------------- | -------------- |
| `country`       | `country`      | `FR`           |
| `name`          | `name`         | `Alice Martin` |
| `customer_id`   | `customer_id`  | `C10001`       |
| `postal_code`   | aucune         | `75001`        |
| `status`        | aucune         | `ACTIF`        |

### Solution — cible réinitialisée

```abap
CLEAR ls_customer_target.

MOVE-CORRESPONDING ls_customer_source
  TO ls_customer_target.
```

`postal_code` et `status` sont initiaux parce que `CLEAR` a supprimé leurs valeurs avant le transfert. L’instruction `MOVE-CORRESPONDING` ne les alimente pas.

### Solution — source commune initiale

```abap
ls_customer_target-country = 'DE'.
ls_customer_target-status  = 'ACTIF'.

CLEAR ls_customer_source-country.

MOVE-CORRESPONDING ls_customer_source
  TO ls_customer_target.
```

| Composant | Avant   | Après   |
| --------- | ------- | ------- |
| `country` | `DE`    | initial |
| `status`  | `ACTIF` | `ACTIF` |

`country` est commun : sa valeur initiale source est transférée.  
`status` n’existe pas dans la source : sa valeur cible reste inchangée.

### Solution — champ renommé

Avec :

```abap
customer_name TYPE c LENGTH 30,
```

aucune correspondance n’existe avec `name`.

Correction la plus simple :

```abap
name TYPE c LENGTH 30,
```

Correction manuelle :

```abap
MOVE-CORRESPONDING ls_customer_source
  TO ls_customer_target.

ls_customer_target-customer_name =
  ls_customer_source-name.
```

### Solution — comparaison

| Critère               | Affectation complète              | `MOVE-CORRESPONDING`        |
| --------------------- | --------------------------------- | --------------------------- |
| Exemple               | `ls_target_copy = ls_source_copy` | `MOVE-CORRESPONDING ...`    |
| Types de l’exercice   | identiques                        | différents                  |
| Base du transfert     | valeur structurée complète        | noms des composants         |
| Composants transférés | tous                              | uniquement les noms communs |
| Cible sans source     | non applicable dans le même type  | reste inchangée             |

### Solution — conversion implicite

```abap
TYPES: BEGIN OF ty_country_source,
         country_name TYPE string,
       END OF ty_country_source.

TYPES: BEGIN OF ty_country_target,
         country_name TYPE c LENGTH 2,
       END OF ty_country_target.

DATA ls_country_source TYPE ty_country_source.
DATA ls_country_target TYPE ty_country_target.

ls_country_source-country_name = `FRANCE`.

MOVE-CORRESPONDING ls_country_source
  TO ls_country_target.

WRITE / ls_country_target-country_name.
```

Résultat :

```text
FR
```

Le composant est trouvé par son nom. La valeur est ensuite convertie vers une cible de deux caractères, ce qui provoque une troncature.

### Solution — analyse de sécurité

L’affirmation est incorrecte parce que :

- les types peuvent différer ;
- les longueurs peuvent différer ;
- une conversion implicite peut être appliquée ;
- une valeur peut être tronquée ;
- deux composants de même nom peuvent avoir des significations métier différentes ;
- une valeur initiale source peut écraser une valeur cible commune.

Les tests doivent vérifier chaque composant transféré, les valeurs limites, les valeurs initiales et les conversions.

### Solution — field-symbols

```abap
FIELD-SYMBOLS:
  <lfs_source> TYPE any,
  <lfs_target> TYPE any.

ASSIGN ls_customer_source TO <lfs_source>.
ASSIGN ls_customer_target TO <lfs_target>.

IF <lfs_source> IS ASSIGNED
   AND <lfs_target> IS ASSIGNED.

  MOVE-CORRESPONDING <lfs_source>
    TO <lfs_target>.

ENDIF.
```

Les field-symbols donnent accès aux structures assignées. Ils ne créent pas de copie.

`IS ASSIGNED` contrôle l’existence de l’assignation. Il ne valide pas la signification, la longueur ou les règles métier des composants.

</details>
