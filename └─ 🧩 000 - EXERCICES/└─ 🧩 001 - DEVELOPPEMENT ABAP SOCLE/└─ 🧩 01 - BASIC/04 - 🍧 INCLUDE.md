# 🌸 EXERCICES — CREATION D’UN INCLUDE – SE38 / SE80

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CREATION D’UN INCLUDE – SE38 / SE80](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 01 - BASIC/04 - 🍧 INCLUDE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- expliquer le rôle d’un include ;
- créer des includes à partir d’un programme principal ;
- appliquer les conventions `_TOP`, `_SCR` et `_F01` ;
- répartir déclarations, écran de sélection et sous-routines ;
- activer et exécuter le programme principal complet ;
- diagnostiquer un include absent ou mal nommé.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 PRÉREQUIS

- Programme `ZAELION_<TRI>_HELLOWORLD` actif.
- Notions élémentaires sur les variables, paramètres et sous-routines fournies par les snippets.

> [!NOTE]
> L’objectif principal est l’organisation du programme. La syntaxe de `PARAMETERS`, `FORM` et `PERFORM` est fournie.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter le tableau :

| Suffixe | Rôle conventionnel | Exemple de contenu |
| ------- | ------------------ | ------------------ |
| `_TOP`  |                    |                    |
| `_SCR`  |                    |                    |
| `_F01`  |                    |                    |

Répondre ensuite aux questions :

1. Un include peut-il être exécuté seul ?
2. Pourquoi le nom d’un include reprend-il généralement le nom du programme principal ?
3. Quel objet doit être exécuté pour tester l’ensemble ?

## 🌺 EXERCICE 2 — CRÉATION DES INCLUDES

Créer les objets suivants dans le même package et la même requête que le programme principal :

- `ZAELION_<TRI>_HELLOWORLD_TOP` ;
- `ZAELION_<TRI>_HELLOWORLD_SCR` ;
- `ZAELION_<TRI>_HELLOWORLD_F01`.

### 1. Programme principal

Remplacer le contenu du programme principal par :

```abap
REPORT zaelion_<tri>_helloworld.

INCLUDE zaelion_<tri>_helloworld_top.
INCLUDE zaelion_<tri>_helloworld_scr.

START-OF-SELECTION.
  PERFORM display_message.

INCLUDE zaelion_<tri>_helloworld_f01.
```

### 2. Include `_TOP`

```abap
CONSTANTS gc_title TYPE c LENGTH 30
  VALUE 'Révision ABAP BASIC'.
```

### 3. Include `_SCR`

```abap
PARAMETERS p_name TYPE c LENGTH 20
  LOWER CASE
  DEFAULT 'AELION'.
```

### 4. Include `_F01`

```abap
FORM display_message.
  WRITE: / gc_title,
         / 'Bonjour', p_name,
         / 'Programme :', sy-repid.
ENDFORM.
```

### Étapes demandées

1. Ajouter les instructions `INCLUDE` dans le programme principal.
2. Créer chaque include par double-clic ou via `SE38`.
3. Vérifier le package et la requête lors de chaque création.
4. Saisir le code correspondant dans chaque include.
5. Enregistrer tous les objets.
6. Activer les includes puis le programme principal, ou utiliser l’activation de l’ensemble des objets liés.
7. Exécuter uniquement le programme principal.
8. Conserver la valeur par défaut `AELION` et exécuter.
9. Revenir à l’écran de sélection, saisir votre prénom, puis exécuter à nouveau.

## 🌺 EXERCICE 3 — DIAGNOSTIC D’UN INCLUDE MANQUANT

Dans le programme principal, remplacer temporairement :

```abap
INCLUDE zaelion_<tri>_helloworld_f01.
```

par :

```abap
INCLUDE zaelion_<tri>_helloworld_f99.
```

1. Lancer le contrôle de syntaxe.
2. Relever le message d’erreur.
3. Expliquer pourquoi le programme ne peut pas être activé.
4. Restaurer le nom `_F01`.
5. Contrôler, activer et exécuter de nouveau.

## 🌺 RÉSULTATS ATTENDUS

Avec la valeur `AELION` :

```text
Révision ABAP BASIC
Bonjour AELION
Programme : ZAELION_<TRI>_HELLOWORLD
```

Avec une autre valeur, seule la ligne `Bonjour ...` doit changer.

## 🌺 LIVRABLES

- Code du programme principal.
- Code des trois includes.
- Résultat des deux exécutions.
- Message obtenu avec l’include `_F99`.
- Explication du rôle de chaque include.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les trois includes existent dans le package demandé.
- [ ] Le programme principal référence les trois noms corrects.
- [ ] Les déclarations sont dans `_TOP`.
- [ ] Le paramètre est dans `_SCR`.
- [ ] La sous-routine est dans `_F01`.
- [ ] Le programme principal est actif et exécutable.
- [ ] L’erreur d’include manquant est comprise et corrigée.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Suffixe | Rôle conventionnel    | Exemple de contenu                    |
| ------- | --------------------- | ------------------------------------- |
| `_TOP`  | Déclarations globales | Types, constantes, variables globales |
| `_SCR`  | Écran de sélection    | `PARAMETERS`, `SELECT-OPTIONS`        |
| `_F01`  | Sous-routines         | Blocs `FORM ... ENDFORM`              |

1. Un include n’est pas un programme autonome à exécuter directement.
2. Le préfixe commun permet d’identifier immédiatement le programme auquel l’include appartient.
3. Le programme principal doit être exécuté.

### Solution — exercice 2

#### Programme principal

```abap
REPORT zaelion_<tri>_helloworld.

INCLUDE zaelion_<tri>_helloworld_top.
INCLUDE zaelion_<tri>_helloworld_scr.

START-OF-SELECTION.
  PERFORM display_message.

INCLUDE zaelion_<tri>_helloworld_f01.
```

#### Include `_TOP`

```abap
CONSTANTS gc_title TYPE c LENGTH 30
  VALUE 'Révision ABAP BASIC'.
```

#### Include `_SCR`

```abap
PARAMETERS p_name TYPE c LENGTH 20
  LOWER CASE
  DEFAULT 'AELION'.
```

#### Include `_F01`

```abap
FORM display_message.
  WRITE: / gc_title,
         / 'Bonjour', p_name,
         / 'Programme :', sy-repid.
ENDFORM.
```

### Solution — exercice 3

Le programme référence un include `_F99` qui n’existe pas. Le contrôle de syntaxe signale que l’include ne peut pas être trouvé ou traité. Le programme principal ne peut pas être activé avec cette dépendance absente.

Correction :

```abap
INCLUDE zaelion_<tri>_helloworld_f01.
```

Après restauration du nom, le contrôle de syntaxe et l’activation doivent réussir.

</details>
