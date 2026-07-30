# 🌸 GATEWAY DATA MODEL DEFINITION

## 🌺 VUE D'ENSEMBLE

```mermaid
flowchart TD
    A["GATEWAY DATA MODEL DEFINITION"]
    A --> B["Comprendre la notion"]
    B --> C["Observer un exemple"]
    C --> D["Appliquer la méthode"]
```

## 🌺 OBJECTIFS

- [ ] `Import DDIC Structure Method` pour définir un `DataModel`

> [!WARNING]
> Dans le cadre de la démo et si vous avez importer le `$Metadata` [ZBC_GATEWAYSRVDEMO_SRV.xml](../assets/ZBC_GATEWAYSRVDEMO_SRV.xml) dans l'étape précédente, veuiller supprimer les deux `EntityTypes` et `EntitySets` comme suivant.
>
> - Effectuer un Right-Clic sur Chaque `EntityTypes` et `EntitySets` du projet → `Delete`

![](.././assets/Capture%20d’écran%202026-01-16%20110216.png)

![](.././assets/Capture%20d’écran%202026-01-16%20110245.png)

> [!NOTE]
> Vous devriez avoir ceci :

![](.././assets/Capture%20d’écran%202026-01-16%20110506.png)

### 🍧 IMPORT DDIC STRUCTURE METHOD

> [!NOTE]
> Effectuer un Right-Clic sur `Data Model` → `Import` → `DDIC Structure`

![](.././assets/Capture%20d’écran%202026-01-16%20110655.png)

> [!CAUTION]
>
> - Nom (de l'`EntityType`) : `Product`
> - [x] `Entity Type`
> - ABAP Structure (à importer) : `BAPI_EPM_PRODUCT_HEADER`
> - [x] `Create Default Entity Set`

![](.././assets/Capture%20d’écran%202026-01-16%20111017.png)

> [!TIP]
> Sélectionner le ou les `champs` dont vous avez besoin. Dans le cadre de la démo, nous allons sélectionner tous les champs de la structure.

![](.././assets/Capture%20d’écran%202026-01-16%20111052.png)

![](.././assets/Capture%20d’écran%202026-01-16%20111305.png)

> [!CAUTION]
> Comme vu précédemment, chaque `EntityType` doit posséder un clé (au moins). Il sera nécessaire de préciser la ou les clés de l'`Entity`, ici `PRODUCT_ID`.

![](.././assets/Capture%20d’écran%202026-01-16%20111409.png)

![](.././assets/Capture%20d’écran%202026-01-16%20111435.png)

![](.././assets/Capture%20d’écran%202026-01-16%20111537.png)

> [!TIP]
> Il est également possible de renommer les propriétés d'un `EntityType`, car les valeurs proposées sont générées à partir des noms de champs `ABAP` : les tirets bas (underscores) sont supprimés et les segments sont fusionnés en notation `camelCase`.

## 🌺 RÉSUMÉ

> - **GATEWAY DATA MODEL DEFINITION :** connaître le rôle, la syntaxe, les limites et un cas d’utilisation.

<details>
<summary>🍧 Afficher l’auto-évaluation</summary>

- [ ] Je peux définir **GATEWAY DATA MODEL DEFINITION** avec mes propres mots.
- [ ] Je peux expliquer **objectives** sans relire le chapitre.
- [ ] Je peux appliquer ou illustrer **un exemple concret** dans un exemple simple.
- [ ] Je peux identifier au moins une erreur fréquente ou une limite liée à cette notion.

</details>
