# 🍧 ODATA (OPEN DATA PROTOCOL)

## 🧩 OBJECTIVES

- [ ] Comprendre la structure d’un service `OData` : `EDM`, `navigation`, `Functions`/`Actions`
- [ ] Lire un fichier `$metadata`

## 🧩 DEFINITION

L'`OData` (Open Data Protocol) est un `Standard WEB` qui définit un contrat entre `Client` et `Server` pour accéder et manipuler des `Ressources` (données de la `Response` - boissons et plats) via `HTTP`.

> [!TIP]  
> Imaginez `OData` comme la carte de la brasserie à l'Oktoberfest : les menus (EntitySets), les plats (Entities) et les règles de chaque plat (HTTP Operations) sont les mêmes pour tous les `Clients` (Chefs de Rang).

Il repose sur le `RESTmodel` : chaque `Ressource` est identifiée par une `URI` et manipulée avec des méthodes HTTP (`GET`, `POST`, `PUT`, `DELETE`).

> [!TIP]  
> Un `User` (fétards) peut commander (GET) un plat, réclamer quelque chose non présent initialement (POST - ca arrive souvent pour des plats pour bébés), demander a modifier (PUT) ou supprimer un plat de sa commande (DELETE).

> [!IMPORTANT]
> L’objectif principal d’`OData` est de fournir un protocole clair, standardisé et facile à utiliser, permettant le partage des données entre les applications, les services etc. Il vise à simplifier le processus de partage des données, en le rendant plus efficace et plus facile à utiliser.
>
> `OData` fournit un contrat (format et comportements) qui rend les services interopérables entre n’importe quel `ODataClient` et n’importe quel `ODataServer` (ex : Gateway).

> [!NOTE]
> Penser `OData` = "ODBC pour le web" (Open Database Connectivity) : accès uniforme aux données, quelle que soit la source.

Les points clés :

👉 `OData` = protocole `REST` standard pour exposer des données en tant que `Ressources`.

👉 `EDM` = format de description des `DataModels`.

👉 `XML` = format riche en métadata.

👉 Fournit un document `$metadata` décrivant l’`EntityDataModel` (`EDM`) du service.

👉 Utilise : `HTTP(S)`, `URIs`, `XML` et `JSON` (majoritairement aujourd’hui).

👉 Représente des ressources via `URI` (ex : `/ServiceRoot/Products`).

👉 Permet des opérations CRUD standardisées.

> [!NOTE]  
> SAP supporte surtout `OData V2` (très courant) et `V4` (depuis ABAP 7.50).

> [!CAUTION]
> La `V3` n’est pas supportée dans `SAP Gateway`.

## 🧩 EDM (ENTITY DATA MODEL) & $METADATA

> [!IMPORTANT]
>
> - L’`EDM` décrit la structure des données exposées par le service :
>
>   - `EntityType`
>   - `EntitySet`
>   - `Property`
>   - `Key`
>   - `PrimitiveType` ou `ComplexType`
>   - `Association`
>   - `Function`.
>   - `Action`
>
> - Le `document XML` (`CSDL`) décrivant l’`EDM` du service est le fichier `$metadata`. Autrement dit, le fichier `$metadata` est disponible seulement en `XML` — c’est la "carte/menu" que les développeurs utilisent pour construire l’`UI`.

[Exemple de $metadata décrivant l'EDM du Gateway Service ZLOG_PACK_HU_DET_CHAR_SRV](./assets/ZLOG_PACK_HU_DET_CHAR_SRV.xml)

| 🍧 ELEMENT    | 🍧 DESCRIPTION                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------- |
| EntityType    | structure d’une ligne : définition d’un enregistrement (champs / Properties) + clé (ex : Products) |
| PrimitiveType | string, int, decimal…                                                                              |
| ComplexType   | structure imbriquée                                                                                |
| EntitySet     | collection de lignes/d’instances d’un EntityType (ex : ProductsSet)                                |
| Property      | attribut ou champs d’une entité                                                                    |
| Navigation    | liens entre entités                                                                                |
| Function      | calcul/lecture spécifique                                                                          |
| Action        | opération métier modifiant l’état                                                                  |

## 🧩 ODATA ENTITYTYPE

### 🍧 `<ENTUTYTYPE>`

- Structure d’une ligne définie par un `Name`, une `Key` et une à plusieurs `Properties` (champ) possédant des `SAP extensions` (Attributs) pour aider les développeurs à identifier leurs caractéristiques.

```xml
<EntityType Name="ProdOrder" sap:content-version="1">
	<Key>
		<PropertyRef Name="Aufnr"/>
	</Key>
	<Property Name="Aufnr" Type="Edm.String" Nullable="false" MaxLength="12" sap:unicode="false" sap:label="Ordre" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	<Property Name="Status" Type="Edm.String" Nullable="false" MaxLength="4" sap:unicode="false" sap:label="Statut" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
</EntityType>
```

### 🍧 `<KEY>`

- Chaque `EntityType` possède une `Key`.
- La `Key` est essentielle pour identifier une entity de manière unique (ex : `<Key><PropertyRef Name="Aufnr"/></Key>`).

```xml
<EntityType Name="ProdOrder" sap:content-version="1">
	<Key>
		<PropertyRef Name="Aufnr"/>
	</Key>
	<Property Name="Aufnr" Type="Edm.String" Nullable="false" MaxLength="12" sap:unicode="false" sap:label="Ordre" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	<Property Name="Status" Type="Edm.String" Nullable="false" MaxLength="4" sap:unicode="false" sap:label="Statut" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
</EntityType>
```

### 🍧 `<PROPERTY>`

- Chaque `Property` déclare son `Type` (ici `Type="Edm.String"`) et ses attributs (`read-only`, `nullable`, `MaxLength`, ...).

> [!WARNING]
> Si un `attribut` n'est pas visible (comme `read-only` dans l'exemple), c'est qu'il est `'true'`.

```xml
	<Property Name="Aufnr" Type="Edm.String" Nullable="false" MaxLength="12" sap:unicode="false" sap:label="Ordre" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
```

### 🍧 ENTITYTYPE - PRIMITIVETYPE

- Un `type primitif` est un type de donnée simple, qui ne contient pas d’autres propriétés imbriquées (c'est à dire qu'il ne contient pas d'autres entities en lui même). C’est comme un "champ unique" dans une table de base de données.
- Dans l'exemple, la `Property Name="Aufnr"` possède un type primitif `Type="Edm.String"`.

```xml
<Property Name="Aufnr" Type="Edm.String" Nullable="false" MaxLength="12" sap:unicode="false" sap:label="Ordre" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
```

### 🍧 ENTITYTYPE - COMPLEXTYPE

- Un `type complexe` est un regroupement de plusieurs `Properties`, qui peuvent elles-mêmes être de `types primitifs` (ou dans certaines versions OData, d’autres `Complex Type`). Contrairement à un `EntityType`, un `Complextype` n’a pas de clé et ne peut pas être adressé individuellement par URI.

> [!CAUTION]
> L'exemple ci-dessous n'est pas présent dans le `$metadata` exemple.

Exemple : Adresse d’un Client

```xml
<ComplexType Name="Address">
  <Property Name="Street" Type="Edm.String" Nullable="false"/>
  <Property Name="City" Type="Edm.String" Nullable="false"/>
  <Property Name="PostalCode" Type="Edm.String" Nullable="false"/>
  <Property Name="Country" Type="Edm.String" Nullable="false"/>
</ComplexType>
```

> [!TIP]
> Puis utilisé dans un EntityType

```xml
<EntityType Name="Customer">
    <Key>
        <PropertyRef Name="CustomerID"/>
    </Key>
    <Property Name="CustomerID" Type="Edm.String" Nullable="false"/>
    <Property Name="CustomerName" Type="Edm.String" Nullable="false"/>
    <Property Name="CustomerAddress" Type="ZLOG_PACK_HU_DET_CHAR_SRV.Address"/>
</EntityType>
```

### 🍧 ENTITYTYPE - SAP EXTENSIONS

- SAP enrichit `l’EDM` avec des informations `DDIC` : `labels` traduisibles, `sémantiques`, indicateurs d’`opération` → utile pour générer dynamiquement des `UIs`.
- On peut le repérer grâce aux attributs `sap:` dans les balises <Property> exemple :

```xml
<Property Name="Aufnr" ... sap:label="Ordre" ... />
<Property Name="Huident" ... sap:label="Unité manutent." ... />
<Property Name="Status" ... sap:label="Statut" ... />
```

### 🍧 ENTITYTYPE - ACTIONS

- Il est possible d'identifier les actions possibles à effectuer sur une `Entity` via les `Actions` :
  - `sap:creatable="false"`
  - `sap:updatable="false"`
  - `sap:sortable="false"`
  - `sap:filterable="false"`
  - ...

```xml
<Property Name="Aufnr" Type="Edm.String" Nullable="false" MaxLength="12" sap:unicode="false" sap:label="Ordre" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
```

> [!WARNING]
> Si un `attribut` n'est pas visible (comme `read-only` dans l'exemple), c'est qu'il est `'true'`.

## 🧩 `<ENTITYSET>`

- Un `EntitySet` est une collection de lignes/d'instances d’un EntityType.
- Dans l'exemple ci-dessous, l'EntitySet `EntitySet Name="ProdOrderSet"` possédera possiblement aucune, une ou plusieurs `instances` de l'`EntityType` associé `EntityType="ZLOG_PACK_HU_DET_CHAR_SRV.ProdOrder"`

```xml
<EntitySet Name="ProdOrderSet" EntityType="ZLOG_PACK_HU_DET_CHAR_SRV.ProdOrder" sap:creatable="false" sap:updatable="false" sap:deletable="false" sap:pageable="false" sap:content-version="1"/>
```

### 🍧 ENTITYSET - SAP EXTENSIONS

- SAP enrichit `l’EDM` avec des informations `DDIC` : `labels` traduisibles, `sémantiques`, indicateurs d’`opération` → utile pour générer dynamiquement des `UIs`.
- On peut le repérer grâce aux attributs `sap:` dans les balises <EntitySet>, exemple :

```xml
<EntitySet Name="ProdOrderSet" ... sap:creatable="false" ... />
```

### 🍧 ENTITYSET - ACTIONS

- Il est possible d'identifier les actions possibles à effectuer sur une Entity via les Actions :
  - `sap:creatable="false"`
  - `sap:updatable="false"`
  - `sap:sortable="false"`
  - `sap:filterable="false"`
  - ...

```xml
<EntitySet Name="ProdOrderSet" EntityType="ZLOG_PACK_HU_DET_CHAR_SRV.ProdOrder" sap:creatable="false" sap:updatable="false" sap:deletable="false" sap:pageable="false" sap:content-version="1"/>
```

> [!WARNING]
> Si un `attribut` n'est pas visible (comme `read-only` dans l'exemple), c'est qu'il est `'true'`.

## 🧩 ODATA ASSOCIATIONS & NAVIGATION

[Exemple de $metadata avec association et navigation décrivant l'EDM du Gateway Service ZLOG_KIT_CREATION_SRV](./assets/ZLOG_KIT_CREATION_SRV.xml)

### 🍧 ASSOCIATIONS (ODATA V2)

- Une `Association` définit une relation entre deux `EntityTypes`.
- Chaque `Association` a deux extrémités (`End`) avec une cardinalité (`1`, `0..1`, `n`, etc.).
- Une `AssociationSet` relie un `EntitySet` à une `Association`, ce qui permet de naviguer entre les Entities concrètes.

```xml
<Association Name="DelivToTask">
  <End Type="ZLOG_KIT_CREATION_SRV.OutDeliv" Multiplicity="1" Role="FromRole_DelivToTask"/>
  <End Type="ZLOG_KIT_CREATION_SRV.Task" Multiplicity="n" Role="ToRole_DelivToTask"/>
  <ReferentialConstraint>
    <Principal Role="FromRole_DelivToTask">
      <PropertyRef Name="Docno"/>
    </Principal>
    <Dependent Role="ToRole_DelivToTask">
      <PropertyRef Name="Docno"/>
    </Dependent>
  </ReferentialConstraint>
</Association>

<EntityContainer Name="ZLOG_KIT_CREATION_SRV_Entities">
  <AssociationSet Name="DelivToTaskSet" Association="ZLOG_KIT_CREATION_SRV.DelivToTask">
    <End EntitySet="OutDelivSet" Role="FromRole_DelivToTask"/>
    <End EntitySet="TaskSet" Role="ToRole_DelivToTask"/>
  </AssociationSet>
</EntityContainer>
```

Ici, un `OutDeliv` du Gateway Service `ZLOG_KIT_CREATION_SRV` peut avoir plusieurs `Task` associées.
Le `<ReferentialConstraint>` indique la `key` (`<PropertyRef Name="Docno"/>`) utilisée pour la navigation.

### 🍧 NAVIGATION PROPERTY

- Dans un `EntityType`, une `NavigationProperty` référence une `Association` et permet de naviguer vers l’`EntityType` cible.

```xml
<EntityType Name="OutDeliv">
  <NavigationProperty Name="TaskSet" Relationship="ZLOG_KIT_CREATION_SRV.DelivToTask" FromRole="FromRole_DelivToTask" ToRole="ToRole_DelivToTask"/>
</EntityType>
```

- `TaskSet` est une `NavigationProperty` qui permet d’accéder à toutes les `Task` associées à un `OutDeliv`.

### 🍧 ODATA V4

Les `Associations` sont supprimées au profit de `NavigationProperties` directes dans les `EntityTypes` et `Bindings` dans les `EntitySets`.

La `Navigation` est plus simple et directe, tout en restant compatible avec les appels `REST` standard.

> [!TIP]
> La `Navigation` = accéder aux entités liées via un chemin `URI`, comme passer d’une table à une autre via une clé étrangère.

## 🧩 ODATA FUNCTIONS

Dans `OData`, `Functions` permettent d’effectuer des `opérations spécifiques` sur les données exposées par un `Gateway Service`.  
Elles sont définies dans le `$metadata` et peuvent être appelées via des `URI` depuis un `Client`.

> [!CAUTION]
>
> - Une `Function` est une `opération` qui ne modifie pas l’état du `Server` (lecture uniquement !).
> - Elle peut retourner un ou plusieurs `EntityTypes` ou un `PrimitivTypes`.
> - Les paramètres d’entrée sont définis dans le `$metadata`.

Exemple extrait du `$metadata` [ZLOG_PACK_HU_DET_CHAR_SRV](./assets/ZLOG_PACK_HU_DET_CHAR_SRV.xml) :

```xml
<FunctionImport Name="Print" ReturnType="ZLOG_PACK_HU_DET_CHAR_SRV.PackHu" EntitySet="PackHuSet" m:HttpMethod="GET">
  <Parameter Name="Aufnr" Type="Edm.String" Mode="In" MaxLength="12"/>
  <Parameter Name="Huident" Type="Edm.String" Mode="In" MaxLength="20"/>
  <Parameter Name="Chariot" Type="Edm.String" Mode="In" MaxLength="20"/>
</FunctionImport>

<FunctionImport Name="PrintDirect" ReturnType="ZLOG_PACK_HU_DET_CHAR_SRV.PackHu" EntitySet="PackHuSet" m:HttpMethod="GET">
  <Parameter Name="Chariot" Type="Edm.String" Mode="In" MaxLength="20"/>
  <Parameter Name="Huident" Type="Edm.String" Mode="In" MaxLength="20"/>
  <Parameter Name="Aufnr" Type="Edm.String" Mode="In" MaxLength="12"/>
</FunctionImport>
```

- `Name` → nom de la fonction appelée par le client
- `ReturnType` → type retourné par la fonction
- `EntitySet` → (optionnel) EntitySet associé, utile pour navigation ou $expand
- `m:HttpMethod` → méthode HTTP utilisée pour appeler la fonction (GET)
- `<Parameter>` → paramètres d’entrée/import de la fonction

> [!TIP]
> Les `<FunctionImport>` sont utilisées pour effectuer des lectures de données complexes nécessitant des calculs ou des filtrages spécifiques côté `Server`.

## 🧩 COMPARISON FUNCTION IMPORT VS ENTITYSET ACTIONS

> [!IMPORTANT]
> Dans `SAP Gateway`, la distinction est importante !

> [!TIP]
> Règle simple pour décider
>
> - Si ça lit → FunctionImport
> - Si ça agit → CRUD

> [!TIP]
> Bonnes pratiques SEGW
>
> - Nom explicite : GetOpenOrders, CalculatePrice, CheckAvailability
> - Pas d’UPDATE caché
> - Résultat typé DDIC (éviter Edm.String fourre-tout)
> - Performances > élégance du modèle
