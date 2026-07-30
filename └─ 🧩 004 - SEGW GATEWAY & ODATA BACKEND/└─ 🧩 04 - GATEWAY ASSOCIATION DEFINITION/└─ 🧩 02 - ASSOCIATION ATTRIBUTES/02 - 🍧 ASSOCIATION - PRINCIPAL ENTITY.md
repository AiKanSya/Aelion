# 🌸 ASSOCIATION - PRINCIPAL ENTITY

![](../assets/Capture%20d’écran%202026-01-16%20125449.png)

## 🧩 PRINCIPAL ENTITY

La `Principal Entity` est l’`EntityType maître` dans une `Association`. Elle représente l’`Entity` de référence dont dépend l’autre `Entity` dans la relation définie.

### 🍧 DEFINITION

- `EntityType` considéré comme parent ou maître dans l’`Association`.
- Référencé comme l’extrémité principale (Principal) dans le `$metadata`.
- Porte généralement la `Primary Key` utilisée par l’`Entity` dépendante.

### 🍧 ROLE

- Définit le point d’ancrage de la relation.
- Permet aux applications clientes de naviguer depuis l’`Entity principale` vers l’`Entity dépendante`.
- Sert de base pour les règles de cohérence et d’intégrité relationnelle.

### 🍧 RULES

| 🍧 Règle                                   | 🍧 Explication                                  |
| ------------------------------------------ | ----------------------------------------------- |
| Doit être un EntityType existant           | Sinon, l’association est invalide               |
| Généralement l’Entity maître               | Ex. Commande par rapport aux lignes de commande |
| Porte la clé référencée                    | La clé est utilisée par l’Entity dépendante     |
| Stable dans le temps                       | Changer casse les navigations et relations      |
| Une seule Principal Entity par association | Par définition EDM                              |

### 🍧 $METADATA EXAMPLES

```xml
<Association Name="SalesOrderToItems">
     <End Type="Namespace.SalesOrder" Role="Principal" Multiplicity="1" />
     <End Type="Namespace.SalesOrderItem" Role="Dependent" Multiplicity="*" />
</Association>
```

- `SalesOrder` : Principal Entity.
- `SalesOrderItem` : Entity dépendante liée à une commande.

### 🍧 ERRORS

| 🍧 Erreur                         | 🍧 Pourquoi c’est un problème                      |
| --------------------------------- | -------------------------------------------------- |
| Mauvais choix de Principal Entity | Modèle incohérent et navigation illogique          |
| EntityType inexistant             | Service OData invalide                             |
| Changement après livraison        | Rupture des relations et des applications clientes |
| Inversion Principal / Dependant   | Confusion métier et erreurs de navigation          |
