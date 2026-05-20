# 🌸 ENTITYTYPE - COMPLEX TYPE NAME

## 🧩 SAP GATEWAY DATAMODEL - COMPLEX TYPE NAME

Le `ComplexType Name` définit le `ComplexType` associé à une `Property` lorsqu’elle contient un ensemble structuré de `sub-Propertys`. Il ne correspond pas à un `PrimitiveType` (string, decimal, boolean), mais à un type qui regroupe plusieurs `fields` défini dans le `$metadata`.

![](.././assets/Capture%20d’écran%202026-01-16%20115426.png)

### 🍧 DEFINITION

- Nom d’un `ComplexType` référencé dans le `$metadata`.
- Utilisé lorsque la `Property` n’est pas simple mais composée de plusieurs `sub-field` (ex. adresse, coordonnées).
- Permet de réutiliser la même structure dans plusieurs `EntityTypes`.

### 🍧 ROLE

- Facilite la structuration des données composées.
- Permet aux `Clients` de traiter un ensemble cohérent de `fields` comme une seule `Entity`.
- Réduit la duplication dans le `$metadata` en centralisant la définition des `ComplexType`.

### 🍧 RULES

| 🍧 Règle                                       | 🍧 Explication                                                        |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| Nom unique dans le service                     | Chaque Complex Type doit avoir un identifiant unique dans le metadata |
| Réutilisable                                   | Le même Complex Type peut être utilisé dans plusieurs EntityTypes     |
| Doit contenir uniquement des Propertys valides | Sub-Propertys doivent respecter les règles EDM et Name                |
| Stable dans le temps                           | Changer casse toutes les Clients qui consomment ce type               |

### 🍧 $METADATA EXAMPLES

```xml
<ComplexType Name="AddressType">
	<Property Name="Street" Type="Edm.String" MaxLength="100" />
	<Property Name="City" Type="Edm.String" MaxLength="40" />
	<Property Name="PostalCode" Type="Edm.String" MaxLength="10" />
	<Property Name="Country" Type="Edm.String" MaxLength="3" />
</ComplexType>

<Property Name="CustomerAddress" Type="Namespace.AddressType" />
```

- `CustomerAddress` : `Property` de l’`EntityType` qui référence le `ComplexType` `AddressType`.
- Permet à `UI5`/`Fiori` de générer un formulaire avec `Street`, `City`, `PostalCode` et `Country` comme `sub-field`.

### 🍧 ERRORS

| 🍧 Erreur                            | 🍧 Pourquoi c’est un problème                      |
| ------------------------------------ | -------------------------------------------------- |
| Nom du Complex Type ambigu           | Risque de conflit et confusion dans le $metadata   |
| Sub-Propertys non conformes          | Génération de service ou affichage incorrect       |
| Changement après livraison           | Toutes les Clients qui utilisent ce type cassent   |
| Utilisation pour une Property simple | Inutile, complexité et surcharge dans le $metadata |
