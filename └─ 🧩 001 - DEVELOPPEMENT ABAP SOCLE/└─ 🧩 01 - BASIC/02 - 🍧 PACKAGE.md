# 🌸 CREATION DE PACKAGE – SE80 / SE21

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle d’un `PACKAGE` dans l’organisation des développements SAP
- [ ] Savoir créer un `PACKAGE` via `SE80` ou `SE21`
- [ ] Comprendre la différence entre `PACKAGE` local et transportable
- [ ] Organiser ses objets pour faciliter maintenance et transport

> [!IMPORTANT]
> Les objectifs visent à maîtriser la structuration des objets ABAP pour simplifier transport, maintenance et collaboration.

## 🌺 DEFINITION

> Un `PACKAGE` (anciennement `DEVELOPMENT CLASS`) est un conteneur logique qui regroupe les objets de développement ABAP.

> [!TIP]
> Le `PACKAGE` est comme un classeur avec des tiroirs : chaque programme, table ou Include est rangé dans un tiroir identifié.

> Visualisation
> PACKAGE : ZAELION_TRI_2025
> ├─ Programme ZTRI_AELION_01
> ├─ Include ZTRI_AELION_01_TOP
> ├─ Table ZT_AELION_2025

> [!NOTE]
> Un `PACKAGE` facilite le regroupement par projet ou module fonctionnel et est indispensable pour transporter des objets.

## 🌺 POURQUOI CREER UN PACKAGE ?

Créer un `PACKAGE` permet :

- Organiser les développements par thème ou projet
- Éviter les conflits entre objets similaires
- Simplifier les transports via un OT cohérent

| 🍧 Type de `PACKAGE` | 🍧 Description                            | 🍧 Exemple    |
| -------------------- | ----------------------------------------- | ------------- |
| Local (`$TMP`)       | Non transportable, pour essais locaux     | `$TMP`        |
| Transportable        | Lié à un OT, transportable entre systèmes | ZSD, ZMM, ZFI |

> [!CAUTION]
> Un objet créé dans `$TMP` ne peut pas être transporté.

> [!TIP]
> Z/Y = client → transportable ; `$TMP` = test → local uniquement.

## 🌺 CREATION D'UN PACKAGE AVEC SE80

1. Entrer `/nSE80`

   ![](./assets/images/Capture%20d’écran%202025-10-30%20171505.png)

2. Dans la liste déroulante, choisir `PACKAGE`

   ![](./assets/images/Capture%20d’écran%202025-10-30%20171614.png)

3. Saisir le nom du `PACKAGE` (ex. `ZAELION_TRI_PACKAGE`) → Entrer

   ![](./assets/images/Capture%20d’écran%202025-10-30%20171707.png)

4. Confirmer la création via popup

   ![](./assets/images/Capture%20d’écran%202025-10-30%20171744.png)

5. Renseigner la Description synthétique et valider

   `TRI - PACKAGE SPECIFIC AELION 2025`

   ![](./assets/images/Capture%20d’écran%202025-10-30%20171926.png)

6. Associer ton OT

   ![](./assets/images/Capture%20d’écran%202025-10-30%20172044.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20172152.png)

7. Valider

   ![](./assets/images/Capture%20d’écran%202025-10-30%20172241.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20172335.png)

   ![](./assets/images/Capture%20d’écran%202025-10-30%20172432.png)

> [!IMPORTANT]
> PACKAGE ZAELION_TRI_PACKAGE
> └─ OT associé (ex. S4HK905579)
> └─ Tâches (ex. S4HK905580)
> └─ Objets

## 🌺 CREATION D'UN PACKAGE AVEC SE21

1. Entrer `/nSE21`
2. Saisir le nom du `PACKAGE` → Entrer
3. Renseigner Titre et `PACKAGE` parent si applicable
4. Sauvegarder et associer un OT si transportable

> [!TIP] > `SE21` est plus direct, `SE80` permet de visualiser l’arborescence complète des objets.

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique               | 🍧 Explication                        |
| ------------------------------- | ------------------------------------- |
| Toujours commencer par Z ou Y   | Convention SAP pour objets clients    |
| Nom explicite et structuré      | Exemple : ZSD_TRAINING_2025           |
| Grouper les objets par thème    | Facilite maintenance et transport     |
| Lier `PACKAGE` à un OT cohérent | Tous les objets liés partent ensemble |

> [!NOTE]
> Un `PACKAGE` bien structuré réduit les erreurs, facilite la collaboration et maintient l’historique clair.

## 🌺 EXERCICE PRATIQUE

1. Créer un `PACKAGE` transportable `ZAELION_TRI_PACKAGE`
2. Associer ton `OT`
3. Vérifier dans `SE80` l’arborescence du `PACKAGE`

## 🌺 RESUME

> - Le `PACKAGE` est un classeur logique pour regrouper objets ABAP
> - Permet d’organiser, maintenir et transporter les objets
> - On le crée via `SE80` ou `SE21`
> - Types : local (`$TMP`) ou transportable (Z/Y)
> - Toujours associer un OT pour le transport sécurisé

> [!TIP]
> Chaque `PACKAGE` est un classeur où chaque tiroir contient vos programmes et Includes, organisé pour être facilement transporté et retrouvé.
