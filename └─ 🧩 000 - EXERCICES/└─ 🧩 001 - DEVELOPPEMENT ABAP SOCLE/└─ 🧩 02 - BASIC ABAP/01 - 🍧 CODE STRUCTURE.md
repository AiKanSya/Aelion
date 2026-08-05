# 🌸 EXERCICES — SQUELETTE D'UN PROGRAMME ABAP

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- distinguer une déclaration, un bloc d’événement et une sous-routine ;
- expliquer le rôle de `INITIALIZATION`, `START-OF-SELECTION` et `END-OF-SELECTION` ;
- appeler une sous-routine avec `PERFORM` ;
- implémenter une sous-routine avec `FORM ... ENDFORM` ;
- répartir correctement le code entre le programme principal et ses includes ;
- diagnostiquer une erreur fonctionnelle liée à l’ordre des traitements.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 PRÉREQUIS

Les objets suivants doivent exister :

- programme `ZAELION_<TRI>_HELLOWORLD` ;
- include `ZAELION_<TRI>_HELLOWORLD_TOP` ;
- include `ZAELION_<TRI>_HELLOWORLD_SCR` ;
- include `ZAELION_<TRI>_HELLOWORLD_F01`.

## 🌺 CONTEXTE

Le programme doit afficher un message personnalisé.

La valeur initiale du nom est préparée avant l’affichage de l’écran de sélection.  
Le message est construit lors du traitement principal.  
Le résultat est affiché à la fin du traitement.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter le tableau suivant :

| Élément              | Type | Moment ou rôle |
| -------------------- | ---- | -------------- |
| `REPORT`             |      |                |
| `INCLUDE`            |      |                |
| `INITIALIZATION`     |      |                |
| `START-OF-SELECTION` |      |                |
| `END-OF-SELECTION`   |      |                |
| `PERFORM`            |      |                |
| `FORM ... ENDFORM`   |      |                |

Classer ensuite les éléments suivants dans leur ordre logique d’exécution :

```text
Affichage du résultat
Initialisation du nom
Affichage de l’écran de sélection
Construction du message
Lancement du programme par l’utilisateur
```

## 🌺 EXERCICE 2 — CONSTRUCTION DU PROGRAMME

### 1. Programme principal

Remplacer le code du programme principal par le squelette suivant :

```abap
REPORT zaelion_<tri>_helloworld.

INCLUDE zaelion_<tri>_helloworld_top.
INCLUDE zaelion_<tri>_helloworld_scr.

INITIALIZATION.
  PERFORM initialize_screen.

START-OF-SELECTION.
  PERFORM build_message.

END-OF-SELECTION.
  PERFORM display_result.

INCLUDE zaelion_<tri>_helloworld_f01.
```

### 2. Include `_TOP`

Remplacer son contenu par :

```abap
CONSTANTS gc_title TYPE c LENGTH 30
  VALUE 'Révision BASIC ABAP'.

DATA gv_message TYPE string.
```

### 3. Include `_SCR`

Remplacer son contenu par :

```abap
PARAMETERS p_name TYPE c LENGTH 20
  LOWER CASE.
```

### 4. Include `_F01`

Implémenter les trois sous-routines suivantes :

```abap
FORM initialize_screen.
  p_name = 'AELION'.
ENDFORM.

FORM build_message.
  CONCATENATE 'Bonjour'
              p_name
         INTO gv_message
    SEPARATED BY space.
ENDFORM.

FORM display_result.
  WRITE: / gc_title,
         / gv_message,
         / 'Programme :', sy-repid.
ENDFORM.
```

### Étapes demandées

1. Modifier les quatre objets.
2. Enregistrer les objets.
3. Effectuer un contrôle de syntaxe.
4. Activer les includes et le programme principal.
5. Exécuter le programme.
6. Vérifier que `AELION` est proposé dans le champ `p_name`.
7. Exécuter avec la valeur initiale.
8. Revenir à l’écran de sélection.
9. Remplacer `AELION` par votre prénom.
10. Exécuter une seconde fois.
11. Relever les deux résultats.

## 🌺 EXERCICE 3 — ANALYSE DE L’ORDRE D’EXÉCUTION

Associer chaque instruction à son emplacement correct :

| Instruction                  | Emplacement attendu |
| ---------------------------- | ------------------- |
| `p_name = 'AELION'.`         |                     |
| Construction de `gv_message` |                     |
| Affichage avec `WRITE`       |                     |
| Déclaration de `gv_message`  |                     |
| Déclaration de `p_name`      |                     |

Répondre ensuite aux questions :

1. Pourquoi `p_name` possède-t-il déjà une valeur lors de l’affichage de l’écran de sélection ?
2. Pourquoi `gv_message` est-elle déclarée dans `_TOP` ?
3. Pourquoi la sous-routine `display_result` est-elle appelée après `build_message` ?
4. Une sous-routine s’exécute-t-elle uniquement parce qu’elle existe dans `_F01` ?

## 🌺 EXERCICE 4 — DIAGNOSTIC FONCTIONNEL

Modifier temporairement le programme principal comme suit :

```abap
START-OF-SELECTION.
  PERFORM display_result.
  PERFORM build_message.
```

Conserver temporairement le bloc suivant vide :

```abap
END-OF-SELECTION.
```

Effectuer les actions suivantes :

1. contrôler la syntaxe ;
2. activer le programme ;
3. l’exécuter ;
4. relever le résultat ;
5. expliquer pourquoi la ligne personnalisée est vide ou incomplète ;
6. distinguer une erreur de syntaxe d’une erreur d’ordre de traitement ;
7. restaurer la structure correcte ;
8. contrôler, activer et exécuter à nouveau.

## 🌺 RÉSULTATS ATTENDUS

### Première exécution

```text
Révision BASIC ABAP
Bonjour AELION
Programme : ZAELION_<TRI>_HELLOWORLD
```

### Deuxième exécution

Pour une saisie `Alice` :

```text
Révision BASIC ABAP
Bonjour Alice
Programme : ZAELION_<TRI>_HELLOWORLD
```

La casse exacte du nom du programme peut dépendre de l’affichage SAP.  
La valeur saisie doit être reprise dans le message.

## 🌺 LIVRABLES

- code du programme principal ;
- code des trois includes ;
- résultat des deux exécutions ;
- tableau de restitution complété ;
- explication du diagnostic fonctionnel.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le programme principal contient les trois blocs d’événements demandés.
- [ ] Les déclarations sont placées dans les includes adaptés.
- [ ] Les trois sous-routines existent dans `_F01`.
- [ ] Chaque `PERFORM` appelle une sous-routine existante.
- [ ] La valeur initiale est visible sur l’écran de sélection.
- [ ] Le message est construit avant son affichage.
- [ ] Le programme est actif et exécutable.
- [ ] L’erreur fonctionnelle est distinguée d’une erreur de syntaxe.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Élément              | Type                       | Moment ou rôle                                                    |
| -------------------- | -------------------------- | ----------------------------------------------------------------- |
| `REPORT`             | Déclaration du programme   | Identifie le programme exécutable.                                |
| `INCLUDE`            | Inclusion de source        | Intègre le contenu d’un autre objet source dans le programme.     |
| `INITIALIZATION`     | Bloc d’événement           | S’exécute avant l’affichage initial de l’écran de sélection.      |
| `START-OF-SELECTION` | Bloc d’événement           | Contient le traitement principal après le lancement du programme. |
| `END-OF-SELECTION`   | Bloc d’événement           | S’exécute après `START-OF-SELECTION`.                             |
| `PERFORM`            | Appel de sous-routine      | Déclenche l’exécution d’un bloc `FORM`.                           |
| `FORM ... ENDFORM`   | Définition de sous-routine | Contient le traitement appelé par `PERFORM`.                      |

Ordre logique :

1. initialisation du nom ;
2. affichage de l’écran de sélection ;
3. lancement du programme par l’utilisateur ;
4. construction du message ;
5. affichage du résultat.

### Solution — exercice 2

#### Programme principal

```abap
REPORT zaelion_<tri>_helloworld.

INCLUDE zaelion_<tri>_helloworld_top.
INCLUDE zaelion_<tri>_helloworld_scr.

INITIALIZATION.
  PERFORM initialize_screen.

START-OF-SELECTION.
  PERFORM build_message.

END-OF-SELECTION.
  PERFORM display_result.

INCLUDE zaelion_<tri>_helloworld_f01.
```

#### Include `_TOP`

```abap
CONSTANTS gc_title TYPE c LENGTH 30
  VALUE 'Révision BASIC ABAP'.

DATA gv_message TYPE string.
```

#### Include `_SCR`

```abap
PARAMETERS p_name TYPE c LENGTH 20
  LOWER CASE.
```

#### Include `_F01`

```abap
FORM initialize_screen.
  p_name = 'AELION'.
ENDFORM.

FORM build_message.
  CONCATENATE 'Bonjour'
              p_name
         INTO gv_message
    SEPARATED BY space.
ENDFORM.

FORM display_result.
  WRITE: / gc_title,
         / gv_message,
         / 'Programme :', sy-repid.
ENDFORM.
```

### Solution — exercice 3

| Instruction                  | Emplacement attendu                              |
| ---------------------------- | ------------------------------------------------ |
| `p_name = 'AELION'.`         | Sous-routine appelée depuis `INITIALIZATION`     |
| Construction de `gv_message` | Sous-routine appelée depuis `START-OF-SELECTION` |
| Affichage avec `WRITE`       | Sous-routine appelée depuis `END-OF-SELECTION`   |
| Déclaration de `gv_message`  | Include `_TOP`                                   |
| Déclaration de `p_name`      | Include `_SCR`                                   |

1. `INITIALIZATION` affecte la valeur avant l’affichage initial de l’écran.
2. `gv_message` est utilisée par plusieurs sous-routines. Elle doit donc être accessible dans le programme global.
3. `display_result` utilise le contenu préparé par `build_message`.
4. Non. Le bloc `FORM` s’exécute lorsqu’un `PERFORM` correspondant est exécuté.

### Solution — exercice 4

La syntaxe peut rester valide, mais `display_result` est exécutée avant `build_message`.  
Au moment du `WRITE`, `gv_message` ne contient pas encore le message attendu.

Structure corrigée :

```abap
START-OF-SELECTION.
  PERFORM build_message.

END-OF-SELECTION.
  PERFORM display_result.
```

Une erreur de syntaxe empêche normalement l’activation.  
Une erreur d’ordre de traitement peut produire un programme syntaxiquement valide mais fonctionnellement incorrect.

</details>
