# 🌸 GATEWAY DATA MODEL DEFINITION

## 🧩 OBJECTIVES

- [ ] `Import DataModel (EDMX) Method` pour définir un `DataModel`

### 🍧 IMPORT DATAMODEL (EDMX) METHOD

> [!IMPORTANT]
> Pour la démo, le `$Metadata` [ZBC_GATEWAYSRVDEMO_SRV.xml](../assets/ZBC_GATEWAYSRVDEMO_SRV.xml) servira d'exemple pour importer les Data Models dans le `Gateway Project` `ZTRI_GATEWAY_DEMO`. Télécharger le en conséquence.

> [!NOTE]
> Rechercher, ouvrer et passer en modification sur le `Gateway Project` `ZTRI_GATEWAY_DEMO`

![](.././assets/Capture%20d’écran%202026-01-16%20104557.png)

> [!NOTE]
> Effectuer un Right-Clic sur `Data Model` → `Import` → `Data Model from File`

![](.././assets/Capture%20d’écran%202026-01-16%20105030.png)

> [!NOTE]
> Cliquer sur `Browse` et rechercher le fichier `$Metadata` [ZBC_GATEWAYSRVDEMO_SRV.xml](../assets/ZBC_GATEWAYSRVDEMO_SRV.xml) sur votre poste de travail.

![](.././assets/Capture%20d’écran%202026-01-16%20105301.png)

![](.././assets/Capture%20d’écran%202026-01-16%20105353.png)

![](.././assets/Capture%20d’écran%202026-01-16%20105427.png)

![](.././assets/Capture%20d’écran%202026-01-16%20105504.png)

![](.././assets/Capture%20d’écran%202026-01-16%20105619.png)

![](.././assets/Capture%20d’écran%202026-01-16%20105927.png)

![](.././assets/Capture%20d’écran%202026-01-16%20110012.png)

> [!TIP]
> Il est également possible de renommer les propriétés d'un `EntityType`, car les valeurs proposées sont générées à partir des noms de champs `ABAP` : les tirets bas (underscores) sont supprimés et les segments sont fusionnés en notation `camelCase`.
