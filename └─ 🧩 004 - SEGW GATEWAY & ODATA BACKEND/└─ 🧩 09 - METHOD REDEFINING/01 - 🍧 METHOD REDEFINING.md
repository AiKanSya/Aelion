# 🌸 METHOD REDEFINING

## 🧩 OBJECTIVES

- [ ] Redefinir les méthodes CRUD pour préparer l'implémentation de la logique ABAP

## 🧩 RAPPEL

> [!IMPORTANT]  
> Un `SAP Gateway Service` repose sur deux types de `ABAP classes` :
>
> - `Model Provider Class (MPC)`
> - `Data Provider Class (DPC)`

> [!IMPORTANT]
>
> - Le type de classe `MPC` définit le `Model` et les `metadata` du `SAP Gateway Service`.
> - Le type de classe `DPC` fournit l'implémentation et les fonctionnalités.

> [!IMPORTANT]
> Chaque type de classe (`MPC` et `DPC`) est implémenté dans deux `ABAP classes` :
>
> - Une `classe de base` (`MPC` et `DPC`) générée automatiquement à partir des paramètres définis dans le générateur de services `SAP Gateway`.
> - Une `classe d'extension` (`MPC_EXT` et `DPC_EXT`) héritant de la `classe de base`, permettant d'étendre le code généré manuellement.

Une `classe d'extension` est une `subclass` de la `classe de base` créée une seule fois, lors de la première génération du `Project`. Initialement, une `classe d'extension` ne contient aucune logique. `SAP Gateway Service Builder` fournit la `classe d'extension` pour vous permettre d'écrire votre propre code. La régénération du `Project` n'écrase pas votre code dans les `classes d'extension`. L'implémentation du service a donc lieu dans la `data provider extension class`.

> [!CAUTION]
> Simplement dit, toute redéfinition se fera dans les Classes `_EXT` !
>
> - `DPC_EXT` pour toute implémentation (logique ABAP) et fonctionnalité (Function Import)
> - `MPC_EXT` pour toute modification de `Model` (Niveau avancé)

![](./assets/Capture%20d’écran%202026-01-16%20144041.png)

## 🧩 METHOD REDEFINING

> [!IMPORTANT]
> Afin d'implémenter une logique ABAP, il sera nécessaire de `Redefine` la méthode souhaitée dans la `DPC_EXT`.

> [!CAUTION]
> Redefinisser uniquement les méthodes dont vous avez besoin.

> [!WARNING]
> Quand vous redéfinissez une méthode, assurez-vous que l'`EntitySet` ciblés possède l'action `CRUD` requis (exemple : redefinir `PRODUCTSET_CREATE_ENTITY` nécessitera de cocher `Creatable` au niveau de l'`EntitySet` `ProductSet`).
>
> ![](./assets/Capture%20d’écran%202026-01-16%20151113.png)
>
> | 🍧 Action OData | 🍧 Verbe HTTP | 🍧 Case à cocher EntitySet (SEGW) | 🍧 Méthode DPC_EXT appelée  |
> | --------------- | ------------- | --------------------------------- | --------------------------- |
> | Lecture liste   | GET           | Addressable                       | `<EntitySet>_GET_ENTITYSET` |
> | Lecture unique  | GET           | Addressable                       | `<EntitySet>_GET_ENTITY`    |
> | Création        | POST          | Creatable                         | `<EntitySet>_CREATE_ENTITY` |
> | Mise à jour     | PUT / PATCH   | Updatable                         | `<EntitySet>_UPDATE_ENTITY` |
> | Suppression     | DELETE        | Deletable                         | `<EntitySet>_DELETE_ENTITY` |

> [!NOTE]
> Effectuer un `Right-Clic` sur la classe `ZCL_<PROJECTNAME>_DPC_EXT` → `Go to ABAP Workbench`

![](./assets/Capture%20d’écran%202026-01-16%20144947.png)

> [!NOTE]
> Développer `Methods` → `Legacy Methods`

![](./assets/Capture%20d’écran%202026-01-16%20145224.png)

> [!NOTE]
> Sélectionner ensuite la méthode que vous souhaitez utiliser, puis `Right-Clic` → `Redefine`.
> Pour la démo, nous allons redéfinir la méthode `PRODUCTSET_GET_ENTITYSET` car cette dernière est `Addressable` !

![](./assets/Capture%20d’écran%202026-01-16%20145435.png)

![](./assets/Capture%20d’écran%202026-01-16%20145620.png)

> [!CAUTION]
> N'oublier pas d'activer car la méthode redéfinie est inactive.

![](./assets/Capture%20d’écran%202026-01-16%20145716.png)

> [!NOTE]
> Dans le cadre de la démo, nous allons redéfinir toutes les méthodes `CRUD` des deux `EntitySets`.

![](./assets/Capture%20d’écran%202026-01-16%20154237.png)

### 🍧 ERRORS

| 🍧 Erreur                                                    | 🍧 Pourquoi c’est un problème           |
| ------------------------------------------------------------ | --------------------------------------- |
| Implémenter dans la classe non \*\_EXT                       | Code écrasé à la prochaine génération   |
| Oublier de regénérer le runtime après modification du modèle | Incohérence metadata / runtime          |
| Méthode non implémentée alors que l’action est autorisée     | Erreur 501 / comportement inattendu     |
| Logique métier dans MPC_EXT                                  | Mauvaise séparation des responsabilités |
