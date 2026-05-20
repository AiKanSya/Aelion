# 🌸 ASSOCIATIONSET - ASSOCIATION

![](../assets/Capture%20d’écran%202026-01-16%20130016.png)

## 🧩 ASSOCIATION

Le champ `Association` d’un `AssociationSet` référence l’`Association` conceptuelle qui définit la relation entre deux `EntityTypes`. L’`AssociationSet` en est l’implémentation concrète au niveau des `EntitySets`.

### 🍧 DEFINITION

- Référence explicite vers une `Association` existante du modèle.
- Fait le lien entre :
  - l’`Association` (`EntityType` ↔ `EntityType`),
  - et l’`AssociationSet` (`EntitySet` ↔ `EntitySet`).
- Obligatoire pour qu’un `AssociationSet` soit valide.

### 🍧 ROLE

- Indiquer quelle relation conceptuelle est utilisée par l’`AssociationSet`.
- Permettre à l'`OData Runtime` de résoudre correctement les `Navigations`.
- Garantir la cohérence entre `EntityTypes` et `EntitySets`.

### 🍧 RULES

| 🍧 Règle                                          | 🍧 Explication                                                       |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Doit référencer une Association existante         | Sinon, erreur de génération ou de runtime                            |
| Nom entièrement qualifié                          | Inclut le namespace (`Namespace.AssociationName`)                    |
| Une Association peut être utilisée plusieurs fois | Par différents AssociationSets                                       |
| Cohérence avec les EntitySets                     | Les EntitySets doivent correspondre aux EntityTypes de l’Association |
| Stable après livraison                            | Changer casse les navigations clientes                               |

### 🍧 $METADATA EXAMPLES

```xml
<AssociationSet Name="DelivToTaskSet" Association="ZLOG_KIT_CREATION_SRV.DelivToTask" sap:creatable="false" sap:updatable="false" sap:deletable="false" sap:content-version="1">
	<End EntitySet="OutDelivSet" Role="FromRole_DelivToTask"/>
	<End EntitySet="TaskSet" Role="ToRole_DelivToTask"/>
</AssociationSet>
```

### 🍧 ERRORS

| 🍧 Erreur                              | 🍧 Pourquoi c’est un problème                    |
| -------------------------------------- | ------------------------------------------------ |
| Référencer une Association inexistante | Service OData invalide                           |
| Mauvaise Association utilisée          | Navigations incohérentes                         |
| Incohérence EntityType / EntitySet     | Erreurs de résolution au runtime                 |
| Changer l’Association après livraison  | Rupture des navigations et applications clientes |
