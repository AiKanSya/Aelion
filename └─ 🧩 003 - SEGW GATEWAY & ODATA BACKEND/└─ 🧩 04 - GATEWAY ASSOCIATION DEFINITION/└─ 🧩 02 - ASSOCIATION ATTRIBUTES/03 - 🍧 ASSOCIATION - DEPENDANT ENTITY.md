# 🌸 ASSOCIATION - DEPENDANT ENTITY

![](../assets/Capture%20d’écran%202026-01-16%20125540.png)

## 🧩 DEPENDANT ENTITY

La `Dependant Entity` est l’`EntityType` dépendant dans une `Association`. Elle représente l’`Entity` dont l’existence ou le sens métier dépend de la `Principal Entity`.

### 🍧 DEFINITION

- `EntityType` considéré comme enfant ou dépendant dans l’`Association`.
- Référencé comme l’extrémité dépendante (Dependent) dans le `$metadata`.
- Contient généralement une `Foreign Key` pointant vers la `Key` de la `Principal Entity`.

### 🍧 ROLE

- Représenter les données secondaires ou détaillées liées à une `principal Entity` .
- Permettre la `Navigation` depuis la `Principal Entity` vers les données dépendantes.
- Assurer la cohérence relationnelle entre les `Entities` de l'`OData Model`.

### 🍧 RULES

| 🍧 Règle                                   | 🍧 Explication                                  |
| ------------------------------------------ | ----------------------------------------------- |
| Doit être un EntityType existant           | Sinon, l’association est invalide               |
| Dépend de la Principal Entity              | Son sens métier est lié à l’`Entity` principale |
| Contient la clé de liaison                 | Référence la clé de la Principal Entity         |
| Stable dans le temps                       | Changer casse les navigations et relations      |
| Une seule Dependant Entity par association | Par définition EDM                              |

### 🍧 $METADATA EXAMPLES

```xml
    <Association Name="SalesOrderToItems">
        <End Type="Namespace.SalesOrder" Role="Principal" Multiplicity="1" />
        <End Type="Namespace.SalesOrderOrderItem" Role="Dependent" Multiplicity="*" />
    </Association>
```

- `SalesOrderItem` : Dependant Entity.
- Chaque ligne de commande dépend d’une commande.

### 🍧 ERRORS

| 🍧 Erreur                                | 🍧 Pourquoi c’est un problème                        |
| ---------------------------------------- | ---------------------------------------------------- |
| Choisir une Entity indépendante          | Relation métier incohérente                          |
| EntityType inexistant                    | Service OData invalide                               |
| Changer après livraison                  | Rupture des navigations et des applications clientes |
| Mauvaise compréhension du rôle dépendant | Modèle confus et difficile à maintenir               |
