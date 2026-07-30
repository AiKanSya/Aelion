# 🌸 GATEWAY SERVICE BUILDER

## 🧩 OBJECTIVES

- [ ] Comprendre la transaction `SEGW - SAP GATEWAY SERVICE BUILDER`
- [ ] Visualiser le `Development Flow`

![](./assets/Capture%20d’écran%202026-01-16%20101046.png)

## 🧩 GATEWAY SERVICE BUILDER - TRANSACTION SEGW

> [!IMPORTANT]
> Le `Gateway Service Builder` :
>
> Le `SAP Gateway Service Builder` (transaction `SEGW`) est un environnement de conception qui fournit un ensemble d'outils pour la `création` et la `maintenance` de l'`OData Service` dans un `ABAP Application Server` (Server `ABAP AS`). Il accompagne les développeurs tout au long du development du `life cycle` d'un `Gateway Service`.

## 🧩 ODATA SERVICE

> [!IMPORTANT]
> Un `OData Service` :
>
> - un service RESTful standardisé (norme `OASIS` pour info)
> - exposant des ressources (`EntitySets`, `Navigation`, ...)
> - manipulées via HTTP (GET, POST, PUT, PATCH, DELETE)
> - en JSON / XML
>
> 👉 C’est un concept technique générique, indépendant de SAP.

## 🧩 GATEWAY SERVICE

> [!IMPORTANT]
> Un `Gateway Service` :
>
> - l’implémentation SAP d’un `OData Service`
> - développée via `SEGW`
> - exécutée sur `SAP Gateway` (`IWFND` / `IWBE`) ou `Embedded`
> - connectée au backend `ABAP`
>
> 👉 Tous les `Gateway Services` sont des `OData Services`,
> 👉 mais tous les `OData Services` ne sont pas des `Gateway Services`.

## 🧩 GATEWAY PROJECT

> [!IMPORTANT]
> Un `SAP Gateway Project` :
>
> Dans `SAP Gateway Service Builder`, chaque `SAP Gateway Service` représente un `SAP Gateway Project` (on peut dire qu'un `SAP Gateway Service` = `SAP Gateway Project` et inversement).

![](./assets/Capture%20d’écran%202026-01-16%20101611.png)

Un `Project` regroupe tous les éléments d'un service dans un emplacement central, facilitant ainsi l'organisation de la modélisation et du développement du service.

Chaque `SAP Gateway Project` se compose de quatre parties, visualisées sous forme d'arbre :

- `Data Model`
- `Service Implementation`
- `Runtime Artifacts`
- `Service Maintenance`

![](./assets/Capture%20d’écran%202026-01-16%20101716.png)

Grâce à la consolidation des données associées, vous pouvez travailler simultanément sur plusieurs `Projects` et réutiliser les données avant de générer et d'activer le service.

![](./assets/Capture%20d’écran%202026-01-16%20101822.png)

De plus, les `Projects` permettent d'organiser le déplacement d'objets d'un environnement système à un autre, garantissant ainsi la cohérence de tous les éléments.

## 🧩 SAP GATEWAY SERVICE DEVELOPMENT FLOW

`SAP Gateway Service Builder` (Tcode `SEGW`) et les `ABAP Development Tools (ADT)` prennent en charge le développement et la génération des `OData services`. Grâce à la génération de `Gateway services`, vous pouvez créer des `OData services` sans écrire une seule ligne de code.

Le générateur des `SAP Gateway services` prend en charge toutes les phases du développement des `Gateway services`.

> [!NOTE]  
> Les étapes ne sont pas nécessairement effectuées de manière séquentielle.

#### 🍧 SERVICE DEFINITION SECTION

Au cours de cette phase, vous créez un `Project` regroupant tous les éléments nécessaires au développement du service.

#### 🍧 DATA MODEL DEFINITION SECTION

Au cours de cette phase, vous définissez des `Models` (`EntityTypes`, `EntitySets`, `Associations`, `AssociationSets`, `FunctionImports`, etc) sur lequel votre `OData Service` sera basé.

![](./assets/Capture%20d’écran%202026-01-16%20101906.png)

#### 🍧 SERVICE IMPLEMENTATION SECTION

Au cours de cette phase, vous implémentez les `opérations` prises en charge par l'`OData Service`.

![](./assets/Capture%20d’écran%202026-01-16%20101932.png)

#### 🍧 RUNTIME ARTIFACT GENERATION SECTION

Au cours de cette phase, vous générez automatiquement les `OData Services` et ses `ABAP Classes`.

![](./assets/Capture%20d’écran%202026-01-16%20101959.png)

#### 🍧 SERVICE MAINTENANCE SECTION

Au cours de cette phase, l'`OData Service` est enregistré et activé dans un `SAP Gateway system`.

![](./assets/Capture%20d’écran%202026-01-16%20102022.png)
