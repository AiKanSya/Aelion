# 🌸 ENTITYSET - NAME

![](.././assets/Capture%20d’écran%202026-01-16%20120443.png)

## 🧩 ENTITYSET - NAME

### 🍧 NAME

Le `Name` d’un `EntitySet` est l’identifiant unique utilisé dans l'`OData Service` pour référencer l’ensemble d’`Entities` (`EntitySet`). Il est visible dans le `$metadata` et utilisé par toutes les applications clientes pour accéder aux données.

### 🍧 DEFINITION

- Identifiant unique de l’`EntitySet` dans l'`OData Service`.
- Utilisé pour construire l’`URL` d’accès aux `Entities` : `/EntitySetName(...)`.
- Correspond généralement au pluriel du nom de l’`EntityType` associé, mais peut être personnalisé.

### 🍧 ROLE

- Sert de point d’accès principal aux données de l’`EntityType`.
- Permet aux applications consommatrices (`UI5`, `Postman`, `API`) de récupérer, filtrer et manipuler les `Entities`.
- Sert de référence pour les `Associations` et les relations entre `EntitySets`.

### 🍧 RULES

| 🍧 Règle                          | 🍧 Explication                                   |
| --------------------------------- | ------------------------------------------------ |
| Unique dans le service            | Aucun autre EntitySet ne doit avoir le même Name |
| Nom clair et descriptif           | Facilite la lecture et l’intégration côté client |
| PascalCase recommandé             | Conformité avec les standards SAP et EDM         |
| Stable dans le temps              | Changer casse toutes les applications clientes   |
| Correspond souvent à l’EntityType | Typiquement pluriel du nom de l’EntityType       |

### 🍧 $METADATA EXAMPLES

```xml
<EntitySet Name="OutDelivSet" EntityType="ZLOG_KIT_CREATION_SRV.OutDeliv" sap:creatable="false" sap:updatable="false" sap:deletable="false" sap:pageable="false" sap:content-version="1"/>
<EntitySet Name="TaskSet" EntityType="ZLOG_KIT_CREATION_SRV.Task" sap:creatable="false" sap:updatable="false" sap:deletable="false" sap:pageable="false" sap:content-version="1"/>
<EntitySet Name="HuScanSet" EntityType="ZLOG_KIT_CREATION_SRV.HuScan" sap:creatable="false" sap:updatable="false" sap:deletable="false" sap:pageable="false" sap:content-version="1"/>
```

- `OutDelivSet` : permet d’accéder à toutes les `Entities` de type OutDeliv.
- `TaskSet` : permet d’accéder à toutes les `Entities` de type Task.
- `HuScanSet` : permet d’accéder à toutes les `Entities` de type HuScan.

### 🍧 ERRORS

| 🍧 Erreur                        | 🍧 Pourquoi c’est un problème                                   |
| -------------------------------- | --------------------------------------------------------------- |
| Name non unique                  | Conflit dans le service, applications clientes échouent         |
| Nom ambigu ou trop générique     | Difficulté pour les développeurs et consommateurs du service    |
| Changement après livraison       | Toutes les applications utilisant ce service risquent de casser |
| Utiliser des caractères spéciaux | Non conforme EDM, risque d’erreurs XML et parsing OData         |
