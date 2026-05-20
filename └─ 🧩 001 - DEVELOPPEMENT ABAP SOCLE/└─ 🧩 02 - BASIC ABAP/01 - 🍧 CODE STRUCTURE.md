# 🌸 SQUELETTE D'UN PROGRAMME ABAP

## 🌺 OBJECTIFS

- [ ] Comprendre la structure de base d’un `PROGRAMME ABAP`
- [ ] Identifier les blocs d’événements standards (`INITIALIZATION`, `START-OF-SELECTION`, `PERFORM`, `END-OF-SELECTION`)
- [ ] Savoir à quel moment chaque section du programme est exécutée
- [ ] Etre capable d’écrire un squelette complet de `PROGRAMME ABAP`

## 🌺 PRE-REQUIS

1. Créer un nouveau programme `ZAELION_TRI_UNIT02_01` à stocker dans ton `PACKAGE` et `OT`
2. Créer les 3 `INCLUDES` (TOP > SCR > F01)
3. Sauvegarger, Activer les objets et basculer en Modification.

![](./assets/images/Capture%20d’écran%202025-10-31%20101124.png)

## 🌺 DEFINITION

> Un `PROGRAMME ABAP` est composé de `BLOCS D'EVENEMENTS` déterminant l’ordre et le contexte d’exécution du code.  
> Ces blocs structurent le flux d’exécution et rendent le code prédictable et maintainable.

> [!TIP]
> Le programme est une piece de theatre
> `REPORT` = titre
>
> chaque bloc (`INITIALIZATION`, `START-OF-SELECTION`, ...) = acte
>
> chaque `PERFORM` = séquence
>
> les instructions des `PERFORM` = repliques.

## 🌺 CONSTRUCTION DU SQUELETTE

### BLOC DE PROGRAMME : REPORT

1.  Dans le `REPORT`, ajouter l'instruction suivante entre l'instruction `REPORT` et les `INCLUDES`

        WRITE:/ '01 - REPORT...',
              / '     WARNING: Ne jamais implémenter de code ici !',
              / '-------------------------------------------------'.

2.  Sauvegarder, Activer et Excécuter

        *&---------------------------------------------------------------------*
        *& Report ZAELION_FGI_UNIT02_01
        *&---------------------------------------------------------------------*
        *&
        *&---------------------------------------------------------------------*
        REPORT zaelion_fgi_unit02_01.

        WRITE:/ '01 - REPORT...',
              / '     WARNING: Ne jamais implémenter de code ici !',
              / '-------------------------------------------------'.

        INCLUDE zaelion_fgi_unit02_01_top.
        INCLUDE zaelion_fgi_unit02_01_scr.
        INCLUDE zaelion_fgi_unit02_01_f01.

    ![](./assets/images/Capture%20d’écran%202025-10-31%20102713.png)

### INCLUDES

1. Dans chaque `INCLUDE`, ajouter respectivement les instructions suivantes

- `INCLUDE _TOP`

      WRITE:/ '02 - INCLUDE _TOP...',
            / '     INFO: Spécifique aux déclarations globales',
            / '-------------------------------------------------'.

- `INCLUDE _SCR`

      WRITE:/ '03 - INCLUDE _SCR...',
            / '     INFO: Spécifique aux écrans de sélections',
            / '-------------------------------------------------'.

- `INCLUDE _F01`

      WRITE:/ '04 - INCLUDE _F01...',
            / '     INFO: Spécifique aux traitements du REPORT',
            / '-------------------------------------------------'.

2. Sauvegarder, Activer les objest et Excécuter

   ![](./assets/images/Capture%20d’écran%202025-10-31%20103644.png)

### BLOC D'EVENEMENT : INITIALIZATION

Le bloc `INITIALIZATION` en ABAP est une section du `REPORT` exécutée avant l’affichage du premier écran de sélection (c’est-à-dire avant que l’utilisateur voie les paramètres et sélections du programme).

Il sert à pré-remplir des valeurs par défaut dans les champs du selection screen ou à initialiser des variables globales nécessaires avant toute interaction utilisateur.
Ce bloc s’exécute une seule fois, automatiquement, sans appel explicite du programmeur.

> [!TIP]
> Imagine que tu ouvres un formulaire papier déjà partiellement rempli avec ton nom et la date. Tu n’as encore rien fait, mais quelqu’un a préparé le document pour toi.
> Le bloc `INITIALIZATION` joue ce rôle de "préparateur" dans un programme ABAP : il met en place les valeurs de départ avant que l’utilisateur voie le formulaire (l’écran de sélection).

1.  Dans le `REPORT`, ajouter l'instruction suivante entre l'instruction en dessous du dernier `INCLUDE`

        INITIALIZATION.
          WRITE:/ '00 - INITIALIZATION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     WARNING: Activation unique au lancement',
                / '-------------------------------------------------'.

2.  Sauvegarder, Activer et Excécuter

        *&---------------------------------------------------------------------*
        *& Report ZAELION_FGI_UNIT02_01
        *&---------------------------------------------------------------------*
        *&
        *&---------------------------------------------------------------------*
        REPORT zaelion_fgi_unit02_01.

        WRITE:/ '01 - REPORT...',
              / '     WARNING: Ne jamais implémenter de code ici !',
              / '-------------------------------------------------'.

        INCLUDE zaelion_fgi_unit02_01_top.
        INCLUDE zaelion_fgi_unit02_01_scr.
        INCLUDE zaelion_fgi_unit02_01_f01.

        INITIALIZATION.
          WRITE:/ '00 - INITIALIZATION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     WARNING: Activation unique au lancement',
                / '-------------------------------------------------'.

    ![](./assets/images/Capture%20d’écran%202025-10-31%20103714.png)

### BLOCS D'EVENEMENT : START-OF-SELECTION END-OF-SELECTION

Le bloc `START-OF-SELECTION` est le point d’entrée principal du traitement logique d’un programme ABAP de type rapport.

C’est à ce moment que le code principal s’exécute, après la validation de l’écran de sélection (quand l’utilisateur a saisi ses valeurs et lancé le programme).
Tout le calcul, la lecture de données, et la logique métier se placent généralement ici.

Le bloc `END-OF-SELECTION` s’exécute après la fin du traitement du bloc `START-OF-SELECTION`.
Il est souvent utilisé pour le traitement final, comme l’affichage des résultats (WRITE, ALV, etc.), ou des actions nécessitant que toutes les données soient déjà prêtes.

1.  Dans le `REPORT`, ajouter l'instruction suivante entre l'instruction en dessous du bloc d'événement `INITIALIZATION`

        START-OF-SELECTION.
          WRITE:/ '05 - START-OF-SELECTION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     INFO: Traitement principal du REPORT',
                / '-------------------------------------------------'.

        END-OF-SELECTION.
          WRITE:/ '99 - END-OF-SELECTION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     INFO: Traitement de fin du REPORT',
                / '-------------------------------------------------'.

2.  Sauvegarder, Activer et Excécuter

        *&---------------------------------------------------------------------*
        *& Report ZAELION_FGI_UNIT02_01
        *&---------------------------------------------------------------------*
        *&
        *&---------------------------------------------------------------------*
        REPORT zaelion_fgi_unit02_01.

        WRITE:/ '01 - REPORT...',
              / '     WARNING: Ne jamais implémenter de code ici !',
              / '-------------------------------------------------'.

        INCLUDE zaelion_fgi_unit02_01_top.
        INCLUDE zaelion_fgi_unit02_01_scr.
        INCLUDE zaelion_fgi_unit02_01_f01.

        INITIALIZATION.
          WRITE:/ '00 - INITIALIZATION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     WARNING: Activation unique au lancement',
                / '-------------------------------------------------'.

        START-OF-SELECTION.
          WRITE:/ '05 - START-OF-SELECTION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     INFO: Traitement principal du REPORT',
                / '-------------------------------------------------'.

        END-OF-SELECTION.
          WRITE:/ '99 - END-OF-SELECTION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     INFO: Traitement de fin du REPORT',
                / '-------------------------------------------------'.

    ![](./assets/images/Capture%20d’écran%202025-10-31%20104037.png)

### BLOC DE SOUS-TRAITEMENT : PERFORM

L’instruction `PERFORM` en ABAP sert à appeler une "sous-routine" (un bloc de code séparé) définie avec `FORM` … `ENDFORM`.

Elle permet de structurer le programme en plusieurs parties logiques, chacune remplissant une tâche précise.

L’intérêt : stocker une logique précise de l'ensemble du programme.

> [!TIP]
> Dans une recette, le `PERFORM` équivaudrait à une étape simple de l'ensemble telle que "Laver les légumes". Bien que l'étape soit "simple", elle nécessite une suite logique d'étape prévue qu'à cet effet.

Une sous-routine ne s’exécute que lorsqu’elle est appelée par un `PERFORM` (d'où le fait de l'implémenter au bon endroit dans le `REPORT`).

> [!NOTE]
> Les données peuvent être passées entre le programme principal `REPORT` et la sous-routine `PERFORM` par des variables globales ou par des paramètres (USING, CHANGING) mais tu verras cela dans le cadre de leur module spécifique.

1.  Dans le `REPORT`, ajouter l'instruction suivante dans le bloc `INITIALIZATION`

        PERFORM report_initialization.

2.  Double-cliquer sur le nom du `PERFORM` → popup de création → valider → sauvegarder si demander → sélectionner l'`INCLUDE F01` précédemment créé → valider

    ![](./assets/images/Capture%20d’écran%202025-10-31%20104340.png)

    ![](./assets/images/Capture%20d’écran%202025-10-31%20104413.png)

    ![](./assets/images/Capture%20d’écran%202025-10-31%20104442.png)

    ![](./assets/images/Capture%20d’écran%202025-10-31%20104520.png)

    ![](./assets/images/Capture%20d’écran%202025-10-31%20104547.png)

3.  Implémenter le WRITE suivant dans le `FORM` nouvellement créé

        WRITE:/ '     A - PERFORM report_initialization...',
              / '         INFO: Sous-process de l''initialisation',
              / '-------------------------------------------------'.

4.  Sauvegarder, Activer les objets et Excécuter

        *&---------------------------------------------------------------------*
        *& Form report_initialization
        *&---------------------------------------------------------------------*
        *& text
        *&---------------------------------------------------------------------*
        *& -->  p1        text
        *& <--  p2        text
        *&---------------------------------------------------------------------*
        FORM report_initialization .

          WRITE:/ '     A - PERFORM report_initialization...',
                / '         INFO: Sous-process de l''initialisation',
                / '-------------------------------------------------'.

        ENDFORM.

    ![](./assets/images/Capture%20d’écran%202025-10-31%20105140.png)

5.  Même chose pour le bloc d'événement `START-OF-SELECTION` avec les `PERFORM report_subprocess_01.` et `PERFORM report_subprocess_02.`

    a. `PERFORM report_subprocess_01.`

        *&---------------------------------------------------------------------*
        *& Report ZAELION_FGI_UNIT02_01
        *&---------------------------------------------------------------------*
        *&
        *&---------------------------------------------------------------------*
        REPORT zaelion_fgi_unit02_01.

        WRITE:/ '01 - REPORT...',
              / '     WARNING: Ne jamais implémenter de code ici !',
              / '-------------------------------------------------'.

        INCLUDE zaelion_fgi_unit02_01_top.
        INCLUDE zaelion_fgi_unit02_01_scr.
        INCLUDE zaelion_fgi_unit02_01_f01.

        INITIALIZATION.
          WRITE:/ '00 - INITIALIZATION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     WARNING: Activation unique au lancement',
                / '-------------------------------------------------'.

          PERFORM report_initialization.

        START-OF-SELECTION.
          WRITE:/ '05 - START-OF-SELECTION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     INFO: Traitement principal du REPORT',
                / '-------------------------------------------------'.

          PERFORM report_subprocess_01.

    Ajouter ceci dans le `PERFORM` nouvellement créé

        WRITE:/ '     A - PERFORM report_subprocess_01...',
              / '         INFO: Sous-process 01 du REPORT',
              / '-------------------------------------------------'.

    ![](./assets/images/Capture%20d’écran%202025-10-31%20105537.png)

    Sauvegarder, Activer les objets et Exécuter.

    ![](./assets/images/Capture%20d’écran%202025-10-31%20105706.png)

    b. `PERFORM report_subprocess_02.`

        *&---------------------------------------------------------------------*
        *& Report ZAELION_FGI_UNIT02_01
        *&---------------------------------------------------------------------*
        *&
        *&---------------------------------------------------------------------*
        REPORT zaelion_fgi_unit02_01.

        WRITE:/ '01 - REPORT...',
              / '     WARNING: Ne jamais implémenter de code ici !',
              / '-------------------------------------------------'.

        INCLUDE zaelion_fgi_unit02_01_top.
        INCLUDE zaelion_fgi_unit02_01_scr.
        INCLUDE zaelion_fgi_unit02_01_f01.

        INITIALIZATION.
          WRITE:/ '00 - INITIALIZATION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     WARNING: Activation unique au lancement',
                / '-------------------------------------------------'.

          PERFORM report_initialization.

        START-OF-SELECTION.
          WRITE:/ '05 - START-OF-SELECTION du programme...',
                / '     TYPE: Bloc d''événement',
                / '     INFO: Traitement principal du REPORT',
                / '-------------------------------------------------'.

          PERFORM report_subprocess_01.
          PERFORM report_subprocess_02.

    Ajouter ceci dans le `PERFORM` nouvellement créé

        WRITE:/ '     B - PERFORM report_subprocess_02...',
              / '         INFO: Sous-process 02 du REPORT',
              / '-------------------------------------------------'.

    ![](./assets/images/Capture%20d’écran%202025-10-31%20110143.png)

    Sauvegarder, Activer les objets et Exécuter.

    ![](./assets/images/Capture%20d’écran%202025-10-31%20110250.png)

## 🌺 EXPLICATION DES BLOCS

| 🍧 BLOC              | 🍧 MOMENT D'EXECUTION                       | 🍧 USAGE PRINCIPAL                     |
| -------------------- | ------------------------------------------- | -------------------------------------- |
| `REPORT`             | Début du programme                          | Définit le nom et le type du programme |
| `INCLUDES`           | Inclut des segments de code                 | Modularisation : top, écrans, logique  |
| `INITIALIZATION`     | Avant tout affichage                        | Initialisations et valeurs par défaut  |
| `START-OF-SELECTION` | Après validation du selection-screen        | Traitement principal                   |
| `PERFORM`            | Sous-traitement à ranger dans l'INCLUDE F01 | Sous-traitement                        |
| `END-OF-SELECTION`   | A la fin du traitement                      | Affichages finaux et récap             |

> [!NOTE]
> Si aucun bloc n'est declare, le code est execute implicitement dans `START-OF-SELECTION`.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                   | 🍧 Explication                                   |
| --------------------------------------------------- | ------------------------------------------------ |
| Toujours séparer les blocs par des commentaires `*` | Facilite la lecture et la maintenance            |
| Utiliser des INCLUDES pour modulariser              | Evite la duplication et clarifie le role du code |
| Commenter chaque section                            | Guide la relecture et la formation               |
| Respecter l’ordre d’execution SAP                   | Evite des comportements inattendus               |
| Ne pas placer de code avant `REPORT`                | SAP rejettera ou ignorera du code mal placé      |

## 🌺 RESUME

> - Un `PROGRAMME ABAP` est organise en blocs d’evenements pour controler l’ordre d’execution.
> - Inclure des INCLUDES (TOP, SCR, F01) facilite la modularite et la maintenance.
> - Respecter la structure (`REPORT` -> `INCLUDES` -> `INITIALIZATION` -> `START-OF-SELECTION` -> `PERFORM` -> `END-OF-SELECTION` -> `PERFORM`) garantit lisibilite et predictibilite.
