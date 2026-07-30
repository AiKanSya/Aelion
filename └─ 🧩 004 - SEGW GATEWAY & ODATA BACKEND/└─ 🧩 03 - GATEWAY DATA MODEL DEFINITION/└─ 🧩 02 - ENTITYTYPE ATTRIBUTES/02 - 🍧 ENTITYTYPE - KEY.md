# 🌸 ENTITYTYPE – KEY

![](.././assets/Capture%20d’écran%202026-01-16%20114437.png)

## 🧩 SAP GATEWAY DATA MODEL – KEY

👉 La `Key` (ou `Primary Key`) identifie de manière unique chaque instance d’un `EntityType` dans un `OData Service`.  
Sans `Key`, une `Entity` n’existe pas du point de vue `OData`.

### 🍧 DEFINITION

La `Key` est l’ensemble d’une ou plusieurs propriétés qui permettent :

- d’identifier une `Entity` de façon unique,
- de construire son `URI`,
- de permettre les opérations `CRUD` (Lecture, Update, Delete).

Elle s’apparente à la `Primary Key` d’une table `ABAP`.

### 🍧 ROLE

La `Key` :

- sert à créer l’`URI` unique de chaque `Entity`  
  → ex : `/ProdOrderSet('30001234')`
- est utilisée par `SAP Gateway` pour :
  - chercher la bonne entrée dans le `Back-end`,
  - générer les méthodes `GET_ENTITY` et `UPDATE_ENTITY`,
  - valider les `Requests`.
- permet de `naviguer` d’une `Entity` vers une autre via les `Associations`.

### 🍧 RULES

| 🍧 Règle                                                | 🍧 Explication                                                              |
| ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Obligatoire pour un EntityType                          | Une Entity sans Key n’est pas valide en OData V2.                           |
| Doit identifier de manière unique                       | La combinaison des Key Properties doit suffire à retrouver une seule ligne. |
| Stable dans le temps                                    | La structure de la Key ne doit pas changer après livraison.                 |
| Peut contenir plusieurs propriétés                      | On parle alors de Key composite (ex : Aufnr + Huident).                     |
| Toutes les Key Properties doivent être Nullable="false" | Une Key ne peut jamais être vide en OData.                                  |
| Doit refléter la logique métier réelle                  | On ne met en Key que les champs structurellement identifiants.              |
| Ordre des Key Properties important                      | Influence les URI et les signatures des méthodes générées.                  |

### 🍧 $METADATA EXAMPLES

#### SIMPLE KEY

```xml
<EntityType Name="ProdOrder">
  <Key>
    <PropertyRef Name="Aufnr"/>
  </Key>
  <Property Name="Aufnr" Type="Edm.String" Nullable="false" MaxLength="12"/>
</EntityType>
```

`URI` généré : `/ProdOrderSet('300012345678')`

#### COMPOSITE KEY

```xml
<EntityType Name="Um">
  <Key>
    <PropertyRef Name="Aufnr"/>
    <PropertyRef Name="Huident"/>
  </Key>
  <Property Name="Aufnr" Type="Edm.String" Nullable="false" MaxLength="12"/>
  <Property Name="Huident" Type="Edm.String" Nullable="false" MaxLength="20"/>
</EntityType>
```

`URI` généré : `/UmSet(Aufnr='300012345678',Huident='40000001234567890000')`

### 🍧 ERRORS

| 🍧 Erreur                                                                        | 🍧 Pourquoi c’est un problème                                |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Mettre une propriété Nullable="true" dans la Key                                 | Impossible : une Key doit toujours être renseignée.          |
| Modifier la Key après mise en production                                         | Ça casse toutes les URI et toutes les applications clientes. |
| Choisir un champ non identifiant (ex : Status)                                   | Deux Entitys peuvent avoir le même statut → collision.       |
| Key trop longue ou inutilement composite                                         | Complexifie les URI, les tests, le code UI5.                 |
| Utiliser une propriété technique volatile (GUID généré à la volée hors Back-end) | Difficile à prédire, difficile à tester, instable.           |
| Ne pas respecter l’ordre des Key Properties                                      | Impact sur le code généré et les outils de consommation.     |
