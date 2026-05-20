# 🌸 CREATION DE PROGRAMME – SE38 / SE80

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est un `PROGRAMME` ABAP et son rôle dans SAP
- [ ] Créer un `PROGRAMME` via `SE38` ou `SE80`
- [ ] Connaître les types de `PROGRAMMES` disponibles
- [ ] Lancer, sauvegarder et transporter un `PROGRAMME` ABAP

> Explication
> L’objectif est de comprendre comment structurer, créer et exécuter un `PROGRAMME` ABAP dans SAP, tout en respectant l’organisation par PACKAGE et OT.

## 🌺 DEFINITION

> Un `PROGRAMME` ABAP est un ensemble d’instructions exécutables par SAP.  
> Il sert à traiter des données, afficher des résultats ou automatiser des actions.

> [!TIP]
> Un `PROGRAMME` est comme une recette : chaque ligne de code est une instruction pour obtenir un résultat final. Le PACKAGE est votre classeur de recettes, et l’OT le carton pour transporter les recettes.

> [!NOTE]
>
> - Lire une table client
> - Calculer des totaux, traiter des chaîne de caractère
> - Afficher un rapport à l’écran

## 🌺 TYPES DE PROGRAMMES

| 🍧 Type de PROGRAMME | 🍧 Description                                             | 🍧 Exemple                         |
| -------------------- | ---------------------------------------------------------- | ---------------------------------- |
| Exécutable (Type 1)  | `PROGRAMME` principal exécuté par l’utilisateur            | Rapport, traitement, liste clients |
| Module pool (Type M) | `PROGRAMME` avec écrans personnalisés (dynpros)            | Application de saisie interne      |
| Include (Type I)     | Bloc de code réutilisable inclus dans un autre `PROGRAMME` | Déclaration commune de variables   |
| Function group (F)   | Contient des fonctions réutilisables                       | Fonctions standard SAP             |
| Class pool (K)       | Définition d’une classe ABAP orientée objet                | Classe utilitaire, gestion de logs |

> [!NOTE]
> Le type détermine l’usage et l’interface du `PROGRAMME`.

## 🌺 CREATION D’UN PROGRAMME AVEC SE80

1. Entrer `/nSE80`

   ![](./assets/images/Capture%20d’écran%202025-10-30%20173404.png)

2. Choisir `Programme`

   ![](./assets/images/Capture%20d’écran%202025-10-30%20173443.png)

3. Saisir le nom du `PROGRAMME` → Entrer

   `ZAELION_FGI_HELLOWORLD`

   ![](./assets/images/Capture%20d’écran%202025-10-30%20173600.png)

4. Confirmer la création via les popups

   ![](./assets/images/Capture%20d’écran%202025-10-30%20173702.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20173746.png)

5. Vvérifier Titre et Type `Programme exécutable` et Sauvegarder

   ![](./assets/images/Capture%20d’écran%202025-10-30%20173942.png)

6. Associer PACKAGE et OT

   ![](./assets/images/Capture%20d’écran%202025-10-30%20174049.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20174210.png)

7. Ouvrir le `PROGRAMME` (double clique)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20174402.png)

8. Passer en mode Modifiable (Ctrl+F1)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20174436.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20174530.png)

> [!TIP] > `SE80` offre la visualisation arborescente : `PROGRAMME` → Includes → Tables → Fonctions.

## 🌺 CREATION D’UN PROGRAMME AVEC SE38

1. Entrer `/nSE38`
2. Saisir le nom du `PROGRAMME` (ex. ZAELION_TRI_HELLOWORLD)
3. Renseigner le Titre
4. Sélectionner `Programme exécutable`
5. Sauvegarder et choisir le PACKAGE (ex. ZAELION_2025_FGI)
6. Associer un OT et valider
7. Passer en mode Modifiable (Ctrl+F1)

> [!TIP]
> Suivre toujours le flux : Nom Z/Y → PACKAGE → OT → Activer → Exécuter.

## 🌺 PREMIER PAS DANS LE PROGRAMME

`PROGRAMME` généré automatiquement :

    *&---------------------------------------------------------------------*
    *& Report ZAELION_TRI_HELLOWORLD
    *&---------------------------------------------------------------------*
    REPORT ZAELION_TRI_HELLOWORLD.

Ajouter le code :

    WRITE: 'Bonjour le monde !'.

Tu devrais avoir :

    *&---------------------------------------------------------------------*
    *& Report ZAELION_TRI_HELLOWORLD
    *&---------------------------------------------------------------------*
    *&
    *&---------------------------------------------------------------------*
    REPORT ZAELION_TRI_HELLOWORLD.

    WRITE: 'Bonjour le monde !'.

![](./assets/images/Capture%20d’écran%202025-10-30%20174925.png)

> [!IMPORTANT]
> WRITE affiche du texte à l’écran. Cela permet de vérifier que le `programme` fonctionne avant d’ajouter des traitements complexes.

### ETAPES D’EXECUTION

1. Enregistrer (Ctrl+S)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20175100.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20175156.png)

2. Activer (Ctrl+F3)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20175305.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20175419.png)

3. Exécuter (F8)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20175456.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20175544.png)

4. Retour arrière (F3)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20175625.png)

> [!TIP]
> Suivre toujours l’ordre : Enregistrer → Activer → Exécuter pour éviter erreurs de compilation.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                 | 🍧 Explication                          |
| --------------------------------- | --------------------------------------- |
| Nommer un `PROGRAMME` avec Z ou Y | Convention SAP pour objet client        |
| Lier le `PROGRAMME` à un PACKAGE  | Facilite organisation et transport      |
| Associer un OT cohérent           | Evite dispersion d’objets               |
| Activer systématiquement          | `PROGRAMME` non activé = non exécutable |
| Commencer simple (`WRITE`)        | Tester exécution avant logique complexe |

## 🌺 EXERCICE PRATIQUE

1. Créer un `PROGRAMME` `ZAELION_TRI_HELLOWORLD`
2. Ajouter un `WRITE` simple
3. Sauvegarder, Activer, Exécuter
4. Vérifier le message affiché
5. Observer la structure PACKAGE + OT dans `SE80`

## 🌺 RESUME

> - Un `PROGRAMME` ABAP est une suite d’instructions exécutables
> - Sert à traiter des données, afficher des résultats, automatiser des actions
> - Types : Exécutable, Module pool, Include, Function group, Class pool
> - Créé via `SE38` ou `SE80`
> - Doit être sauvegardé dans un PACKAGE et associé à un OT
> - Execution : Enregistrer → Activer → Exécuter
> - Commencer simple avec `WRITE` pour vérifier fonctionnement

> [!TIP]
> Le `PROGRAMME` est la recette, le PACKAGE le classeur des recettes, et l’OT le carton pour transporter vos recettes vers d’autres systèmes.
