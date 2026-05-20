# 🌸 CREATION D’UN INCLUDE – SE38 / SE80

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle d’un `INCLUDE` dans un programme ABAP
- [ ] Créer un `INCLUDE` via `SE38` ou `SE80`
- [ ] Savoir l’intégrer dans un programme principal
- [ ] Organiser son code ABAP pour plus de clarté et de réutilisation

> [!IMPORTANT]
> L’objectif est de modulariser le code ABAP afin de le rendre plus lisible, réutilisable et facile à maintenir, tout en permettant le travail collaboratif.

## 🌺 DEFINITION

> Un `INCLUDE` est un fichier de code réutilisable inséré dans un ou plusieurs programmes ABAP.  
> Il permet de séparer le code pour le rendre plus lisible et modulaire.

> [!TIP]
> Un `INCLUDE` est comme un chapitre d’un livre : le programme principal est le livre complet, et chaque `INCLUDE` est un chapitre que l’on peut écrire ou réutiliser ailleurs.

> [![!NOTE]]
> Les `INCLUDES` ne peuvent être exécutés seuls. Ils doivent être intégrés dans un programme principal.

## 🌺 POURQUOI UTILISER DES INCLUDES ?

| 🍧 Avantage           | 🍧 Description                                                          |
| --------------------- | ----------------------------------------------------------------------- |
| Lisibilité            | Séparer déclarations, traitements et formulaires                        |
| Réutilisabilité       | Partager le même code entre plusieurs programmes                        |
| Maintenance facilitée | Modifier une partie sans impacter l’ensemble du programme               |
| Collaboration         | Plusieurs développeurs peuvent travailler sur des `INCLUDE`S différents |

> [!TIP]
> Toujours penser "un `INCLUDE` = un rôle précis" (top, écran, logique) pour éviter la confusion.

## 🌺 TYPES D’INCLUDES

| 🍧 Type d’`INCLUDE`           | 🍧 Contenu habituel                   | 🍧 Exemple                 |
| ----------------------------- | ------------------------------------- | -------------------------- |
| `INCLUDE` de déclaration      | Variables globales, constantes, types | ZAELION_TRI_HELLOWORLD_TOP |
| `INCLUDE` d'affichage d'écran | Logique d’écran                       | ZAELION_TRI_HELLOWORLD_SCR |
| `INCLUDE` de logique          | Sous-Logique principale du programme  | ZAELION_TRI_HELLOWORLD_F01 |

> [!NOTE]
> Le type n’est pas imposé par SAP, c’est une convention pour structurer votre programme ABAP.

## 🌺 CREATION D’UN INCLUDE VIA SE80

      *&---------------------------------------------------------------------*
      *& Report ZAELION_TRI_HELLOWORLD
      *&---------------------------------------------------------------------*
      *&
      *&---------------------------------------------------------------------*
      REPORT ZAELION_TRI_HELLOWORLD.

      WRITE: 'Bonjour le monde !'.

1.  Ajouter dans le programme :

          INCLUDE ZAELION_TRI_HELLOWORLD_TOP.

    Tu devrez avoir ceci :

         *&---------------------------------------------------------------------*
         *& Report ZAELION_FGI_HELLOWORLD
         *&---------------------------------------------------------------------*
         *&
         *&---------------------------------------------------------------------*
         REPORT ZAELION_TRI_HELLOWORLD.

         WRITE: 'Bonjour le monde !'.

         INCLUDE ZAELION_TRI_HELLOWORLD_TOP.

2.  Double-cliquer sur le nom de l’`INCLUDE` → popup de création → valider → sauvegarder si demander

    ![](./assets/images/Capture%20d’écran%202025-10-30%20190706.png)

    ![](./assets/images/Capture%20d’écran%202025-10-30%20190742.png)

    ![](./assets/images/Capture%20d’écran%202025-10-30%20190922.png)

3.  Ajouter un WRITE pour tester :

         WRITE: 'Bonjour le monde depuis l''INCLUDE TOP !'.

    Tu devrez avoir ceci :

         *&---------------------------------------------------------------------*
         *& Include          ZAELION_FGI_HELLOWORLD_TOP
         *&---------------------------------------------------------------------*

         WRITE: 'Bonjour le monde depuis l''INCLUDE TOP !'.

    ![](./assets/images/Capture%20d’écran%202025-10-30%20191049.png)

4.  Sauvegarder, Activer les objets, Exécuter le programme principal pour voir le résultat

    ![](./assets/images/Capture%20d’écran%202025-10-30%20191147.png)

    ![](./assets/images/Capture%20d’écran%202025-10-30%20191148.png)

    ![](./assets/images/Capture%20d’écran%202025-10-30%20191344.png)

    ![](./assets/images/Capture%20d’écran%202025-10-30%20191149.png)

    ![](./assets/images/Capture%20d’écran%202025-10-30%20191447.png)

> [!TIP]
> Vérifier toujours l’intégration : un `INCLUDE` non activé empêche l’exécution correcte du programme principal.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                  | 🍧 [!IMPORTANT]                                           |
| -------------------------------------------------- | --------------------------------------------------------- |
| Nommer les `INCLUDES` avec le préfixe du programme | Identifier facilement l’`INCLUDE` et son programme parent |
| Regrouper les `INCLUDES` par fonction              | Ex : ...\_TOP, ...\_SCR, ...\_F01                         |
| Activer systématiquement après modification        | Evite que le programme principal ne compile pas           |
| Documenter le rôle de chaque `INCLUDE`             | Ajouter un commentaire en haut du fichier                 |
| DRY – Ne pas répéter de code                       | Centraliser la logique commune dans un seul `INCLUDE`     |

## 🌺 EXERCICE PRATIQUE

1.  Modifier le WRITE (ajout de `/` après le `WRITE:`)

         WRITE:/ 'Bonjour le monde !'.

1.  Créer l’`INCLUDE` ZAELION_TRI_HELLOWORLD_TOP

         INCLUDE ZAELION_TRI_HELLOWORLD_TOP.

1.  Ajouter le WRITE dans l'`INCLUDE`:

         WRITE:/ 'Bonjour le monde depuis l''INCLUDE TOP !'.

1.  Sauvegarder, Activer les objets
1.  Exécuter le programme principal et vérifier l’affichage
1.  Faite de même avec les `INCLUDES` `ZAELION_TRI_HELLOWORLD_SCR` et `ZAELION_TRI_HELLOWORLD_F01`

<details>
  <summary>SOLUTION</summary>

---

`REPORT ZAELION_TRI_HELLOWORLD`

      *&---------------------------------------------------------------------*
      *& Report ZAELION_TRI_HELLOWORLD
      *&---------------------------------------------------------------------*
      *&
      *&---------------------------------------------------------------------*
      REPORT ZAELION_TRI_HELLOWORLD.

      WRITE:/ 'Bonjour le monde !'.

      INCLUDE ZAELION_TRI_HELLOWORLD_TOP.
      INCLUDE ZAELION_TRI_HELLOWORLD_SCR.
      INCLUDE ZAELION_TRI_HELLOWORLD_F01.

`INCLUDE ZAELION_TRI_HELLOWORLD_TOP`

      *&---------------------------------------------------------------------*
      *& Include          ZAELION_FGI_HELLOWORLD_TOP
      *&---------------------------------------------------------------------*

      WRITE:/ 'Bonjour le monde depuis l''INCLUDE TOP !'.

`INCLUDE ZAELION_TRI_HELLOWORLD_SCR`

      *&---------------------------------------------------------------------*
      *& Include          ZAELION_TRI_HELLOWORLD_SCR
      *&---------------------------------------------------------------------*

      WRITE:/ 'Bonjour le monde depuis l''INCLUDE SCR !'.

`INCLUDE ZAELION_TRI_HELLOWORLD_F01`

      *&---------------------------------------------------------------------*
      *& Include          ZAELION_TRI_HELLOWORLD_F01
      *&---------------------------------------------------------------------*

      WRITE:/ 'Bonjour le monde depuis l''INCLUDE F01 !'.

Exécution :

![](./assets/images/Capture%20d’écran%202025-10-30%20193647.png)

</details>

## 🌺 RESUME

> - Un `INCLUDE` contient du code réutilisable dans un ou plusieurs programmes
> - Se crée via `SE38` ou `SE80` et s’intègre dans un programme avec `INCLUDE`
> - Permet de rendre le code plus clair, modulaire et facile à maintenir
> - Doit être sauvegardé dans un PACKAGE et associé à un OT

> [!TIP]
> Chaque `INCLUDE` est un chapitre du livre que constitue votre programme. On peut le modifier, le réutiliser et le transporter sans toucher au reste du livre.
