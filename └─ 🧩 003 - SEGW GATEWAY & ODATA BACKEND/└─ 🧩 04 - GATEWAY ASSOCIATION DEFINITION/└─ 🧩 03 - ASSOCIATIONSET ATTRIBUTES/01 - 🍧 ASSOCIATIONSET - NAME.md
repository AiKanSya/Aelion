# 🌸 ASSOCIATIONSET - NAME

![](../assets/Capture%20d’écran%202026-01-16%20125926.png)

## 🧩 NAME

Le `Name` d’un `AssociationSet` est l’identifiant technique de l’instance d’`Association` exposée dans l'`OData Service`. Il relie concrètement deux `EntitySets` via une `Association`.

### 🍧 DEFINITION

- Nom technique de l’`AssociationSet` dans l'`OData Service`.
- Représente l’instance d’une `Association` entre deux `EntitySets`.
- Apparaît dans le `$metadata` sous le `node` `<AssociationSet>`.

### 🍧 ROLE

- Lier une `Association` à des `EntitySets` concrets.
- Permettre aux `OData Navigations` de fonctionner entre `EntitySets`.
- Servir de point de résolution entre modèle conceptuel (`Association`) et `Exposition` du service.

### 🍧 RULES

| 🍧 Règle                                  | 🍧 Explication                                        |
| ----------------------------------------- | ----------------------------------------------------- |
| Unique dans le Service                    | Deux AssociationSets ne peuvent pas avoir le même nom |
| Doit référencer une Association existante | Sinon, le service est invalide                        |
| Convention de nommage claire              | Souvent basé sur les EntitySets liés                  |
| Pas d’espaces ni caractères spéciaux      | Conformité EDM / XML                                  |
| Stable après livraison                    | Changer casse les Navigations clientes                |

Conventions courantes :

- `<EntitySetPrincipal>To<EntitySetDependent>`
- `<EntitySet1>_<EntitySet2>`

### 🍧 $METADATA EXAMPLES

```xml
<AssociationSet Name="DelivToTaskSet" Association="ZLOG_KIT_CREATION_SRV.DelivToTask" sap:creatable="false" sap:updatable="false" sap:deletable="false" sap:content-version="1">
	<End EntitySet="OutDelivSet" Role="FromRole_DelivToTask"/>
	<End EntitySet="TaskSet" Role="ToRole_DelivToTask"/>
</AssociationSet>
```

### 🍧 ERRORS

| 🍧 Erreur                       | 🍧 Pourquoi c’est un problème     |
| ------------------------------- | --------------------------------- |
| Nom générique ou ambigu         | Modèle illisible                  |
| Association inexistante         | Service OData invalide            |
| Incohérence avec les EntitySets | Navigation impossible             |
| Changer le Name après livraison | Rupture des applications clientes |
