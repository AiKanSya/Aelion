# 🌸 GATEWAY DATA MODEL DEFINITION

## 🧩 OBJECTIVES

- [ ] `Define Data Model Declaratively Method` pour définir un `DataModel`

## 🧩 SAP GATEWAY DATA MODEL DEFINITION METHODS

> [!CAUTION]
> Cette méthode est la plus longue des 3. Elle nécessite de bien définir les `champs`, leur `type`, leur nombre de `caractère` minimum, maximum, leur `précision` etc. ce qui obligera un développeur à comparer la `Property` à créer avec éventuellement le champ en `DDIC` qui lui correspondrait.

> [!NOTE]
> Méthode 1 : effectuer un Right-Clic sur `Data Model` → `Create` → `EntityType`

![](.././assets/Capture%20d’écran%202025-12-05%20151039.png)

> [!NOTE]
> Méthode 2 : effectuer un Right-Clic sur `EntityType` → `Create`

![](.././assets/Capture%20d’écran%202026-01-16%20112029.png)

> [!CAUTION]
>
> - Entity Type Name : `BusinessPartner`
> - [x] `Create Related Entity Set`
> - Entity Set Name : (Se renseigne automatiquement si vous avez renseigner l'Entity Type Name puis cliquer sur la CheckBox) `BusinessPartnerSet`

![](.././assets/Capture%20d’écran%202026-01-16%20112137.png)

> [!NOTE]
> Développer `BusinessPartner` dans la hiérarchie à gauche de l'écran et Double-Clic sur `Properties` pour atteindre la liste des champs de l'`EntityType`.

![](.././assets/Capture%20d’écran%202026-01-16%20112534.png)

> [!NOTE]
> Cliquer sur `Add a line` ou `Insert line`.

![](.././assets/Capture%20d’écran%202026-01-16%20112702.png)

> [!NOTE]
> Champs de l'`EntityType` `BusinessPartner` à mapper :

| 🍧 Name             | 🍧 Key | 🍧 EDM Core Type | 🍧 Max Length | 🍧 Label              |
| ------------------- | ------ | ---------------- | ------------- | --------------------- |
| BusinessPartnerID   | x      | Edm.String       | 10            | Business Partner ID   |
| BusinessPartnerRole |        | Edm.String       | 3             | Business Partner Role |
| EmailAddress        |        | Edm.String       | 255           | E-mail Address        |
| CompanyName         |        | Edm.String       | 80            | Company Name          |
| CurrencyCode        |        | Edm.String       | 5             | Currency Code         |
| City                |        | Edm.String       | 40            | City                  |
| Street              |        | Edm.String       | 60            | Street                |
| Country             |        | Edm.String       | 3             | Country               |
| AddressType         |        | Edm.String       | 2             | Address Type          |

![](.././assets/Capture%20d’écran%202026-01-16%20113124.png)

> [!CAUTION]
> Enregistrer le `Gateway Project` et Double-Clic sur `BusinessPartnerSet` afin de le rendre `Addressable`. (Avec cette méthode, l'`EntitySet` générée n'est pas automatiquement `Addressable`)

![](.././assets/Capture%20d’écran%202026-01-16%20113432.png)

![](.././assets/Capture%20d’écran%202026-01-16%20113655.png)

> [!TIP]
> Il est également possible de renommer les propriétés d'un `EntityType`, car les valeurs proposées sont générées à partir des noms de champs `ABAP` : les tirets bas (underscores) sont supprimés et les segments sont fusionnés en notation `camelCase`.
