# 🌸 EXERCICES — FIELD-SYMBOLS

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- expliquer le rôle d’un field-symbol ;
- déclarer un field-symbol avec `FIELD-SYMBOLS` ;
- l’assigner à un objet de données avec `ASSIGN` ;
- vérifier son état avec `IS ASSIGNED` ;
- modifier la donnée cible par l’intermédiaire du field-symbol ;
- retirer une assignation avec `UNASSIGN` ;
- utiliser un field-symbol générique avec `TYPE any` ;
- prévenir l’accès à un field-symbol non assigné.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 CONTEXTE

Le programme doit appliquer une remise à un montant en passant par un field-symbol.

Le stagiaire doit démontrer que le field-symbol ne contient pas une copie indépendante : il donne accès à la donnée assignée.

## 🌺 EXERCICE 1 — COMPARAISON

Compléter le tableau suivant :

| Objet        | Possède sa propre valeur | Valeur modifiable | Nécessite une assignation |
| ------------ | ------------------------ | ----------------- | ------------------------- |
| Variable     |                          |                   |                           |
| Constante    |                          |                   |                           |
| Field-symbol |                          |                   |                           |

Répondre ensuite aux questions :

1. Un field-symbol est-il une copie automatique de la variable cible ?
2. Que modifie l’instruction `<lfs_amount> = '90.00'` après une assignation valide ?
3. Peut-on utiliser un field-symbol avant de l’assigner ?
4. Quel test permet de sécuriser son utilisation ?

## 🌺 EXERCICE 2 — ASSIGNATION SIMPLE

Ajouter le code suivant dans un bloc de traitement :

```abap
DATA lv_amount TYPE p LENGTH 8 DECIMALS 2
  VALUE '100.00'.

FIELD-SYMBOLS <lfs_amount> LIKE lv_amount.

ASSIGN lv_amount TO <lfs_amount>.
```

Compléter le traitement pour :

1. vérifier que le field-symbol est assigné ;
2. retirer `10,00` au montant en passant uniquement par le field-symbol ;
3. afficher la valeur du field-symbol ;
4. afficher ensuite la variable d’origine.

## 🌺 EXERCICE 3 — VÉRIFICATION DE L’ALIAS

Le résultat attendu est :

```text
Field-symbol : 90,00
Variable     : 90,00
```

Expliquer pourquoi les deux valeurs sont identiques.

Modifier ensuite directement `lv_amount` :

```abap
lv_amount = '75.00'.
```

Afficher à nouveau les deux valeurs sans refaire l’assignation.

Expliquer le résultat.

## 🌺 EXERCICE 4 — `UNASSIGN`

Après les affichages précédents, exécuter :

```abap
UNASSIGN <lfs_amount>.
```

Ajouter un contrôle permettant d’afficher :

```text
Le field-symbol n'est plus assigné
```

Le programme ne doit pas tenter d’afficher directement le contenu du field-symbol après `UNASSIGN`.

## 🌺 EXERCICE 5 — FIELD-SYMBOL GÉNÉRIQUE

Créer les objets suivants :

```abap
DATA lv_text   TYPE string VALUE `Initial`.
DATA lv_number TYPE i VALUE 10.

FIELD-SYMBOLS <lfs_value> TYPE any.
```

Réaliser les opérations suivantes :

1. assigner `lv_text` à `<lfs_value>` ;
2. remplacer le texte par `Modifié` via le field-symbol ;
3. afficher `lv_text` ;
4. retirer l’assignation ;
5. assigner `lv_number` au même field-symbol ;
6. remplacer la valeur par `20` via le field-symbol ;
7. afficher `lv_number`.

Répondre ensuite aux questions :

1. Pourquoi le même field-symbol peut-il être assigné aux deux variables ?
2. Le type réel de la cible disparaît-il ?
3. Quel risque présente l’utilisation excessive de `TYPE any` ?

## 🌺 EXERCICE 6 — DIAGNOSTIC

Analyser le code suivant :

```abap
FIELD-SYMBOLS <lfs_unassigned> TYPE any.

WRITE <lfs_unassigned>.
```

Répondre avant toute exécution :

1. Le contrôle de syntaxe détecte-t-il obligatoirement le problème ?
2. Quel est l’état du field-symbol ?
3. Quel type d’erreur est attendu lors de l’accès ?
4. Quelle correction minimale faut-il appliquer ?

La version finale doit utiliser un contrôle `IS ASSIGNED`.

> [!CAUTION]
> L’accès à un field-symbol non assigné provoque une erreur d’exécution.  
> Ne pas conserver cet accès non protégé dans le programme final.

## 🌺 RÉSULTATS ATTENDUS

Assignation typée :

```text
Field-symbol : 90,00
Variable     : 90,00
```

Après modification directe de la variable :

```text
Field-symbol : 75,00
Variable     : 75,00
```

Après `UNASSIGN` :

```text
Le field-symbol n'est plus assigné
```

Field-symbol générique :

```text
Texte  : Modifié
Nombre : 20
```

## 🌺 LIVRABLES

- tableau comparatif ;
- code d’assignation simple ;
- preuve que la cible est modifiée ;
- contrôle après `UNASSIGN` ;
- utilisation du field-symbol générique ;
- correction du cas non assigné.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le field-symbol est déclaré entre chevrons.
- [ ] `ASSIGN` est exécuté avant l’accès.
- [ ] `IS ASSIGNED` protège le traitement.
- [ ] La modification via le field-symbol affecte la variable cible.
- [ ] `UNASSIGN` est utilisé correctement.
- [ ] Le field-symbol générique est réassigné après `UNASSIGN`.
- [ ] Aucun accès non protégé ne subsiste dans la version finale.
- [ ] Le field-symbol est distingué d’une variable et d’une constante.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Objet        | Possède sa propre valeur                  | Valeur modifiable                                  | Nécessite une assignation |
| ------------ | ----------------------------------------- | -------------------------------------------------- | ------------------------- |
| Variable     | Oui                                       | Oui                                                | Non                       |
| Constante    | Oui                                       | Non                                                | Non                       |
| Field-symbol | Non : il donne accès à une cible assignée | La cible peut être modifiée si elle est modifiable | Oui                       |

1. Non. Il agit comme un alias vers l’objet assigné.
2. Elle modifie directement `lv_amount`.
3. Non.
4. `IF <lfs_amount> IS ASSIGNED.`

### Solution — exercices 2 à 4

```abap
DATA lv_amount TYPE p LENGTH 8 DECIMALS 2
  VALUE '100.00'.

FIELD-SYMBOLS <lfs_amount> LIKE lv_amount.

ASSIGN lv_amount TO <lfs_amount>.

IF <lfs_amount> IS ASSIGNED.
  <lfs_amount> = <lfs_amount> - 10.

  WRITE: / 'Field-symbol :', <lfs_amount>,
         / 'Variable     :', lv_amount.
ENDIF.

lv_amount = '75.00'.

IF <lfs_amount> IS ASSIGNED.
  WRITE: / 'Field-symbol :', <lfs_amount>,
         / 'Variable     :', lv_amount.
ENDIF.

UNASSIGN <lfs_amount>.

IF <lfs_amount> IS ASSIGNED.
  WRITE: / <lfs_amount>.
ELSE.
  WRITE: / `Le field-symbol n'est plus assigné`.
ENDIF.
```

Les valeurs sont identiques parce que `<lfs_amount>` donne accès à `lv_amount`.  
Il ne contient pas une copie indépendante.

Après l’affectation directe de `75.00`, le field-symbol donne toujours accès à la même variable. Il permet donc de lire la nouvelle valeur sans nouvelle assignation.

### Solution — exercice 5

```abap
DATA lv_text   TYPE string VALUE `Initial`.
DATA lv_number TYPE i VALUE 10.

FIELD-SYMBOLS <lfs_value> TYPE any.

ASSIGN lv_text TO <lfs_value>.

IF <lfs_value> IS ASSIGNED.
  <lfs_value> = `Modifié`.
ENDIF.

WRITE: / 'Texte  :', lv_text.

UNASSIGN <lfs_value>.

ASSIGN lv_number TO <lfs_value>.

IF <lfs_value> IS ASSIGNED.
  <lfs_value> = 20.
ENDIF.

WRITE: / 'Nombre :', lv_number.
```

`TYPE any` rend le field-symbol générique. Il peut être assigné à des objets de types différents.

La cible conserve son type réel. Les opérations réalisées par l’intermédiaire du field-symbol restent soumises à ce type lors de l’exécution.

Un field-symbol générique réduit les contrôles statiques et rend le code moins explicite. Un type précis doit être préféré lorsque la cible est connue.

### Solution — exercice 6

Correction minimale :

```abap
FIELD-SYMBOLS <lfs_unassigned> TYPE any.

IF <lfs_unassigned> IS ASSIGNED.
  WRITE <lfs_unassigned>.
ENDIF.
```

Dans cet exemple, aucune instruction `ASSIGN` n’a associé le field-symbol à un objet de données.  
L’accès direct à son contenu provoque donc une erreur d’exécution.

</details>
