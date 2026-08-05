# 🌸 EXERCICES — INSTRUCTION WRITE

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- afficher un texte fixe ;
- afficher une variable ;
- afficher plusieurs valeurs sur une même ligne ;
- provoquer un retour à la ligne avec `/` ;
- afficher des champs système ;
- appliquer une longueur de sortie et une justification ;
- distinguer la valeur d’une variable de sa représentation à l’écran.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 CONTEXTE

Le programme doit afficher une fiche d’exécution contenant :

- un titre ;
- le nom du stagiaire ;
- son trigramme ;
- le programme exécuté ;
- l’utilisateur SAP ;
- la date et l’heure système.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter le tableau :

| Élément                  | Rôle |
| ------------------------ | ---- |
| `WRITE`                  |      |
| `/` placé après `WRITE:` |      |
| `sy-repid`               |      |
| `sy-uname`               |      |
| `sy-datum`               |      |
| `sy-uzeit`               |      |
| `LEFT-JUSTIFIED`         |      |
| `RIGHT-JUSTIFIED`        |      |

## 🌺 EXERCICE 2 — AFFICHAGE SIMPLE

Déclarer et initialiser les données suivantes :

```abap
DATA lv_name     TYPE c LENGTH 20 VALUE '<NOM>'.
DATA lv_trigram  TYPE c LENGTH 3  VALUE '<TRI>'.
DATA lv_training TYPE string      VALUE `Développement ABAP`.
```

Produire l’affichage suivant :

```text
FICHE D'EXÉCUTION
Nom       : <NOM>
Trigramme : <TRI>
Formation : Développement ABAP
Programme : ZAELION_<TRI>_INSTRUCTIONS
Utilisateur : <UTILISATEUR SAP>
Date        : <DATE SAP>
Heure       : <HEURE SAP>
```

Contraintes :

1. le titre doit être écrit sur une ligne distincte ;
2. chaque information doit commencer sur une nouvelle ligne ;
3. `sy-repid`, `sy-uname`, `sy-datum` et `sy-uzeit` doivent être utilisés directement ;
4. le nom du programme ne doit pas être écrit en dur.

## 🌺 EXERCICE 3 — MISE EN FORME

Déclarer :

```abap
DATA lv_label TYPE c LENGTH 12 VALUE 'TOTAL'.
DATA lv_value TYPE p LENGTH 8 DECIMALS 2 VALUE '125.50'.
```

Afficher :

1. `lv_label` sur une longueur de 15 caractères, aligné à gauche ;
2. `lv_value` sur une longueur de 12 caractères, aligné à droite ;
3. les deux valeurs sur une même ligne.

Utiliser les options :

```abap
LEFT-JUSTIFIED
RIGHT-JUSTIFIED
```

## 🌺 EXERCICE 4 — DIAGNOSTIC

Analyser le code suivant :

```abap
WRITE: 'Nom :', lv_name,
       'Trigramme :', lv_trigram,
       'Formation :', lv_training.
```

Répondre :

1. Le code est-il syntaxiquement valide ?
2. Toutes les informations apparaissent-elles sur des lignes distinctes ?
3. Quelle correction faut-il appliquer ?
4. La variable `lv_name` est-elle modifiée par `WRITE` ?

## 🌺 LIVRABLES

- tableau de restitution complété ;
- code de la fiche d’exécution ;
- résultat de l’affichage ;
- code de mise en forme ;
- correction du diagnostic.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le titre apparaît sur une ligne distincte.
- [ ] Les champs système sont affichés sans valeur codée en dur.
- [ ] Le nom du programme provient de `sy-repid`.
- [ ] Les retours à la ligne sont maîtrisés.
- [ ] Les options de justification sont utilisées correctement.
- [ ] L’affichage ne modifie pas les variables sources.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — restitution

| Élément           | Rôle                                         |
| ----------------- | -------------------------------------------- |
| `WRITE`           | Écrit une valeur dans la liste classique.    |
| `/`               | Commence l’affichage sur une nouvelle ligne. |
| `sy-repid`        | Nom du programme ABAP courant.               |
| `sy-uname`        | Utilisateur SAP courant.                     |
| `sy-datum`        | Date système.                                |
| `sy-uzeit`        | Heure système.                               |
| `LEFT-JUSTIFIED`  | Aligne la sortie à gauche.                   |
| `RIGHT-JUSTIFIED` | Aligne la sortie à droite.                   |

### Solution — affichage simple

```abap
REPORT zaelion_<tri>_instructions.

DATA lv_name     TYPE c LENGTH 20 VALUE '<NOM>'.
DATA lv_trigram  TYPE c LENGTH 3  VALUE '<TRI>'.
DATA lv_training TYPE string      VALUE `Développement ABAP`.

START-OF-SELECTION.

  WRITE: / `FICHE D'EXÉCUTION`,
         / 'Nom         :', lv_name,
         / 'Trigramme   :', lv_trigram,
         / 'Formation   :', lv_training,
         / 'Programme   :', sy-repid,
         / 'Utilisateur :', sy-uname,
         / 'Date        :', sy-datum,
         / 'Heure       :', sy-uzeit.
```

### Solution — mise en forme

```abap
DATA lv_label TYPE c LENGTH 12 VALUE 'TOTAL'.
DATA lv_value TYPE p LENGTH 8 DECIMALS 2 VALUE '125.50'.

WRITE: / lv_label LENGTH 15 LEFT-JUSTIFIED,
         lv_value LENGTH 12 RIGHT-JUSTIFIED.
```

### Solution — diagnostic

Le code est syntaxiquement valide, mais toutes les données sont écrites sur la même ligne.

Correction :

```abap
WRITE: / 'Nom       :', lv_name,
       / 'Trigramme :', lv_trigram,
       / 'Formation :', lv_training.
```

`WRITE` lit les valeurs pour les afficher. Il ne modifie pas les variables sources.

</details>
