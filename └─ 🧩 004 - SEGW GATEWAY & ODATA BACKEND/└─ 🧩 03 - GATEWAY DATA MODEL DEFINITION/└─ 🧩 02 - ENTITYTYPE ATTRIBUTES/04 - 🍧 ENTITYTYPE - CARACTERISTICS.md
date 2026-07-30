# 🌸 ENTITYTYPE - CHARACTERISTICS

![](.././assets/Capture%20d’écran%202026-01-16%20114831.png)

## 🧩 SAP GATEWAY DATAMODEL - CHARACTERISTICS

Les `Characteristics` définit les `Parameters` numériques d’une `Property` dans un `EntityType` :

- `précision`
- `nombre de décimales`
- `valeur maximale`

Ces informations contrôlent le stockage, la validation et le formatage côté `Front-end` et `Back-end`.

### 🍧 DEFINITION

- `Precision` : nombre total de chiffres que la `Property` peut contenir.
- `Scale` : nombre de chiffres après la virgule pour les nombres décimaux.
- `Maximum` : valeur maximale autorisée pour la `Property`.

Ces valeurs sont enregistrées dans le `$metadata` pour garantir cohérence et validation automatique des données dans `SAP` et `OData`.

### 🍧 ROLE

- Assurer que les valeurs stockées respectent la `précision` et les limites définies.
- Permettre au `Front-end` (UI5/Fiori) d’appliquer un formatage correct.
- Garantir la compatibilité avec les champs `DDIC` et les types `EDM`.

### 🍧 RULES

> [!TIP]
> Afin d'éviter de rechercher les valeurs exactes des caractéristiques à définir, il est toujours préférables d'`Import` les information avec la `DDIC Structure Method` pour définir un `DataModel`.

| 🍧 Règle               | 🍧 Explication                                                      |
| ---------------------- | ------------------------------------------------------------------- |
| Precision cohérente    | Ne pas dépasser la taille du champ DDIC correspondant               |
| Scale compatible       | Les décimales doivent correspondre aux besoins métiers              |
| Maximum défini         | Empêche la saisie de valeurs supérieures à ce qui est autorisé      |
| Stable après livraison | Modifier casse la validation automatique côté applications clientes |

### 🍧 $METADATA EXAMPLES

```xml
<Property Name="NetValue" Type="Edm.Decimal" Nullable="false" Precision="13" Scale="2" />
<Property Name="Quantity" Type="Edm.Decimal" Nullable="false" Precision="10" Scale="3" Maximum="10000" />
```

- `NetValue` : nombre décimal avec 13 chiffres maximum et 2 décimales.
- `Quantity` : nombre décimal avec 10 chiffres maximum, 3 décimales et valeur maximale 10000.

### 🍧 ERRORS

| 🍧 Erreur                       | 🍧 Pourquoi c’est un problème                              |
| ------------------------------- | ---------------------------------------------------------- |
| Precision trop faible           | Valeurs tronquées ou erreur lors de l’insertion            |
| Scale incorrect                 | Arrondi non désiré, perte de précision                     |
| Maximum absent quand nécessaire | Saisie possible de valeurs interdites                      |
| Changement après livraison      | Applications clientes et services OData risquent de casser |
