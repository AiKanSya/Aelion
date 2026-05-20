# 🌸 GESTION DES DUMPS ET DU DEBUGUEUR – `ST22`

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est un `DUMP` dans SAP
- [ ] Savoir analyser un `DUMP` via la transaction `ST22`
- [ ] Découvrir le débogueur ABAP et apprendre à l’utiliser
- [ ] Identifier la différence entre débogage via `/H` et `POINTS D'ARRET`

> [!IMPORTANT]
> L’objectif est d’apprendre à diagnostiquer les erreurs ABAP et à suivre l’exécution du code pour corriger les anomalies.

## 🌺 DEFINITION

> Un `DUMP` (ou `ABAP Runtime Error`) est une erreur fatale qui arrête un programme ABAP pour protéger le système.  
> SAP enregistre alors un rapport détaillé dans `ST22` pour analyser la cause.

> [!IMPORTANT]
> C’est comme un écran bleu sur un ordinateur, mais SAP fournit toutes les informations nécessaires pour comprendre et corriger le problème.

## 🌺 EXEMPLES DE DUMPS COURANTS

![](./assets/images/Capture%20d’écran%202025-10-30%20194541.png)

| Code du `DUMP`  | Signification                    | Exemple                                  |
| --------------- | -------------------------------- | ---------------------------------------- |
| CONVT_NO_NUMBER | Erreur conversion texte → nombre | "ABC" converti en entier                 |
| SYNTAX_ERROR    | Erreur de syntaxe ABAP           | Programme mal activé ou Include manquant |

> [!TIP]
> Les `DUMPS` sont souvent causés par des valeurs inattendues ou des erreurs de code. Les lire attentivement permet de trouver la source exacte.

## 🌺 ANALYSE D’UN DUMP AVEC ST22

1. Entrer `/nST22`
2. Choisir la période ("Today" ou filtrer par utilisateur/programme)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20194644.png)

3. Cliquer sur le `DUMP` à analyser

   ![](./assets/images/Capture%20d’écran%202025-10-30%20194721.png)

4. Examiner les sections clés :

   ![](./assets/images/Capture%20d’écran%202025-10-30%20194832.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20194906.png)

| 🍧 Section          | 🍧 Rôle                                      |
| ------------------- | -------------------------------------------- |
| Short Text          | Description rapide de l’erreur               |
| Error Analysis      | [!IMPORTANT] technique                       |
| Source Code Extract | Ligne ABAP où le programme a planté          |
| Variables in Memory | Valeurs des variables au moment du `DUMP`    |
| Call Stack          | Ordre d’exécution des programmes et includes |

> [!TIP]
> Double-cliquer sur une ligne du Source Code Extract ouvre directement SE38 à la ligne fautive.

## 🌺 UTILISER LE DEBUGUEUR ABAP

> [!IMPORTANT]
> Le débogueur permet d’exécuter le code ligne par ligne, inspecter/modifier les variables et comprendre le comportement du programme.

### 1. DEBOGAGE D'UNE TRANSACTION – /H

1. Entrer `/H` dans la barre de commande → _Debugging switched on_
2. Exécuter la transaction à analyser
3. SAP ouvre automatiquement le débogueur avant l’exécution

| 🍧 Action            | 🍧 Touche / Icône | 🍧 Description                                            |
| -------------------- | ----------------- | --------------------------------------------------------- |
| Suivant              | F5                | Exécute la ligne courante, entre dans les sous-programmes |
| Sauter               | F6                | Passe la ligne sans entrer dans les sous-appels           |
| Continuer            | F8                | Exécute jusqu’au prochain point d’arrêt                   |
| Breakpoint dynamique | Ctrl+Shift+F8     | Pause sur une ligne spécifique                            |

> [!TIP]
> Activer /H avant de cliquer ou valider un formulaire pour observer le flux complet.

### 2. DEBOGAGE D'UN PROGRAMME – SE38 / SE80

1. Ouvrir le programme via SE38 ou SE80
2. Ajouter un point d’arrêt sur une ligne (cliquer dans la marge → point rouge)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20195036.png)

3. Sauvegarder et exécuter le programme (F8)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20195355.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20195431.png)

| 🍧 Onglet                  | 🍧 Utilité                                   |
| -------------------------- | -------------------------------------------- |
| Variables locales/globales | Voir les valeurs des variables en mémoire    |
| Tables internes            | Explorer le contenu des itabs                |
| Call Stack                 | Voir l’ordre d’exécution des programmes      |
| Breakpoints/Watchpoints    | Gérer les arrêts et surveiller les variables |

> [!TIP]
> Les variables peuvent être modifiées directement dans le débogueur pour tester des scénarios.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                 | 🍧 [!IMPORTANT]                        |
| --------------------------------- | -------------------------------------- |
| Lire attentivement `ST22`         | Identifier la cause exacte du `DUMP`   |
| Utiliser /H pour transactions     | Comprendre le flux complet             |
| Utiliser points d’arrêt pour code | Tester logiques et corrections         |
| Modifier variables avec prudence  | Ne pas modifier production directement |
| Documenter les corrections        | Facilite le suivi et la maintenance    |

## 🌺 EXERCICE PRATIQUE

1.  Générer volontairement un `DUMP` simple (ex. DIVISION BY ZERO)

          *&---------------------------------------------------------------------*
          *& Report ZAELION_FGI_HELLOWORLD
          *&---------------------------------------------------------------------*
          *&
          *&---------------------------------------------------------------------*
          REPORT zaelion_fgi_helloworld.

          WRITE:/ 'Bonjour le monde !'.

          INCLUDE zaelion_fgi_helloworld_top.
          INCLUDE zaelion_fgi_helloworld_scr.
          INCLUDE zaelion_fgi_helloworld_f01.

          *&---------------------------------------------------------------------*
          *& DUMP
          *&---------------------------------------------------------------------*

          DATA: lv_num TYPE i,
               lv_den TYPE i,
               lv_res TYPE i.

          lv_num = 10.
          lv_den = 0.

          lv_res = lv_num / lv_den.

          WRITE: / 'Résultat :', lv_res.

2.  Exécuter
3.  Analyser le `DUMP` dans `ST22`
4.  Ajouter un point d’arrêt dans ton programme, exécuter et observer les variables

## 🌺 RESUME

> - Un `DUMP` est une erreur fatale ABAP qui arrête le programme et génère un rapport dans `ST22`
> - `ST22` permet d’analyser : message, code fautif, variables, call stack
> - Débogueur ABAP : exécuter ligne par ligne, inspecter/modifier variables
> - Accès : /H pour transactions, point d’arrêt pour programmes
> - Fonctions clés : F5 (suivant), F6 (sauter), F8 (continuer), breakpoints dynamiques

> [!IMPORTANT] > `ST22` = carnet d’incidents, débogueur = microscope pour suivre ligne par ligne ce que fait le programme.
