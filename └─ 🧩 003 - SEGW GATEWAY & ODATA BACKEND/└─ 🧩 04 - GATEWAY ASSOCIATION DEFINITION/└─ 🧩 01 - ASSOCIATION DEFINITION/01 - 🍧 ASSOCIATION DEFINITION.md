# 🌸 ASSOCIATION DEFINITION

## 🧩 OBJECTIVES

- [ ] Définir une `Association`

![](../assets/Capture%20d’écran%202026-01-16%20121252.png)

Certains éléments d'un `data model` sont souvent créés manuellement. Il s'agit des éléments suivants :

- `Associations`
- `Association sets`
- `Navigation properties`
- `Function imports`

## 🧩 DEFINITION

> [!IMPORTANT]  
> Une association est un lien logique entre deux entités OData qui permet de naviguer de l’une vers l’autre.

> [!NOTE]
> Exemple : un `business partner` jouant le rôle de fournisseur, livre plusieurs produits.

> [!IMPORTANT]
> Dans SEGW, une association définit :
>
> - quelles entités sont liées
> - sur quelles clés
> - dans quel sens on peut naviguer

## 🧩 PRINCIPLE

Pour obtenir ce comportement avec OData, les `EntityTypes` `business partner` et `Product` doivent être liés par une `Association` dans le `Data Model`. La `cardinalité` de l'`association` est définie sur `one (1)` à `at least on or more (n)`.

Chaque `EntityType` peut définir des `Navigation Properties` typées par une `Association`. Ces `navigation properties` se matérialisent sous forme de liens relatifs dans la `payload ` et permettent à l'utilisateur ou au client de naviguer dans les résultats, à la manière d'un site web avec des `hyperlinks`.

## 🧩 ASSOCIATION DEFINITION

> [!NOTE]
> Méthode 1 : Effectuer un Right-Clic sur `Data Model` → `Create` → `Association`

![](../assets/Capture%20d’écran%202026-01-16%20122244.png)

> [!NOTE]
> Méthode 2 : Effectuer un Right-Clic sur `Association` → `Create`

![](../assets/Capture%20d’écran%202026-01-16%20122031.png)

> [!IMPORTANT]
> Lorsque vous sélectionnez `Create` → `Association` sur le `data model node` dans `SAP Gateway Service Builder`, un `wizard` s'ouvre et vous permet de définir tous les éléments nécessaires à la navigation :
>
> - Une association définissant une entité principale et une entité dépendante avec multiplicité ;
> - Une contrainte référentielle (referential constraint) reliant la clé principale à la `property` dépendante ;
> - Un `association set` définissant les `entity sets` principale et dépendante.

Les `navigation properties` doivent avoir des noms explicites afin que l'utilisateur comprenne clairement leur fonctionnement. La définition d'une seule `navigation property` permet une navigation unidirectionnelle. La définition de deux `navigation properties` permet une navigation bidirectionnelle.

> [!NOTE]
>
> - Association Name : `BusinessPartner_Products` (Convention de nommage : `PrincipalEntity_DependantEntity(s)` ou `PrincipalEntityToDependantEntity(s)` - Mettre un 's' à la `DependantEntity`)
>
> - Principal Entity
>
>   - Entity Type Name : `BusinessPartner`
>   - Cardinality : `1`
>   - [x] Create related Navigation Property
>   - Navigation Property : `ProductSet`
>
> - Dependant Entity
>   - Entity Type Name : `Product`
>   - Cardinality : `N`
>   - [ ] Create related Navigation Property
>   - Navigation Property : (Empty)

![](../assets/Capture%20d’écran%202026-01-16%20122936.png)

> [!NOTE]
> Sélectionner la Key commune entre les deux EntityTypes. Dans notre exemple, les `BusinessPartner` sont des fournisseurs aussi, le `BusinessPartnerID` sera égale au `SupplierId` de `Product`.

![](../assets/Capture%20d’écran%202026-01-16%20123230.png)

![](../assets/Capture%20d’écran%202026-01-16%20123302.png)

![](../assets/Capture%20d’écran%202026-01-16%20123830.png)

> [!NOTE]
> Tout ce qui a été créé par le `wizard` peut être adapté ultérieurement dans le `data model`. Les `associations` et les `association sets` possèdent leurs propres node dans le `data model`. Les `navigation properties` font partie des `entity types` correspondants.
