# 🌸 ENTITYTYPE - EDM CORE TYPE

![](.././assets/Capture%20d’écran%202026-01-16%20114713.png)

## 🧩 EDM CORE TYPE

### 🍧 DEFINITION

Les `EDMCoreTypes` (`Entity Data Model Core Types`) sont les `PrimitiveTypes` standardisés utilisés par `OData` pour décrire la nature des données transportées par un `Service`.

👉 Ils définissent précisément ce qu’une `Property` contient : string, nombre, booléen, identifiant, date, durée, binaire…

👉 Ce sont les briques de base du `$metadata`.

Ils garantissent :

- la compatibilité entre `SAP`, `SAP Gateway` et les `Clients`
- la validation automatique des données
- un format documenté, stable et cohérent

### 🍧 ROLE

Les `EDMCoreTypes` permettent de :

- structurer et typer les données d’un `EntityType`
- décrire les champs avec précision (décimal, entier, textuel…)
- contrôler les conversions et garantir l’interopérabilité
- définir un contrat clair dans le `$metadata`

Sans ces types, `OData` ne pourrait pas valider ou structurer les données transmises.

### 🍧 COMPLETE LIST OF EDM CORE TYPES

Voici la liste exacte des types `OData` utilisés dans `SAP Gateway` :

| 🍧 Type EDM        | 🍧 Description                                | 🍧 Exemple                 |
| ------------------ | --------------------------------------------- | -------------------------- |
| Edm.Binary         | Données binaires (RAW, hash, GUID en binaire) | `0xFF22AABB…`              |
| Edm.Boolean        | Valeur logique true/false                     | `true`                     |
| Edm.Byte           | Entier _non signé_ 8 bits (0 à 255)           | `128`                      |
| Edm.SByte          | Entier _signé_ 8 bits (−128 à 127)            | `-10`                      |
| Edm.Int16          | Entier 16 bits                                | `123`                      |
| Edm.Int32          | Entier 32 bits (le plus courant)              | `3000`                     |
| Edm.Int64          | Entier 64 bits                                | `9007199254740991`         |
| Edm.Single         | Flottant simple précision (~7 digits)         | `3.14`                     |
| Edm.Float          | Alias de Edm.Single                           | `3.14`                     |
| Edm.Double         | Flottant double précision (~15 digits)        | `3.1415926535`             |
| Edm.Decimal        | Décimal (avec Precision/Scale obligatoires)   | `123.4500`                 |
| Edm.String         | Texte (fixe ou variable)                      | `"ABC123"`                 |
| Edm.Guid           | Identifiant unique 128 bits                   | `550e8400-e29b-41d4-a716…` |
| Edm.DateTime       | Date + heure (V2)                             | `/Date(1693449600000)/`    |
| Edm.DateTimeOffset | Date + heure + décalage (timezone)            | `2025-01-01T12:30:00Z`     |
| Edm.Time           | Heure ou durée                                | `PT12H30M10S`              |

### 🍧 $METADATA EXAMPLES

```xml
<Property Name="Aufnr" Type="Edm.String" MaxLength="12" Nullable="false" />
<Property Name="Valid" Type="Edm.Boolean" Nullable="false" />
<Property Name="GuidHu" Type="Edm.Guid" Nullable="false" />
<Property Name="Vsolm" Type="Edm.Decimal" Precision="31" Scale="14" Nullable="false" />
```

### 🍧 BEST PRACTICES

| 🍧 Règle                                    | 🍧 Pourquoi ?                            |
| ------------------------------------------- | ---------------------------------------- |
| Utiliser le type le plus précis             | Évite conversions implicites dangereuses |
| Respecter Precision/Scale pour Decimal      | Prevent arrondis et pertes de données    |
| Ne pas mettre un nombre dans un String      | Empêche le filtrage/tri « côté client »  |
| Utiliser Guid plutôt que String pour GUID   | Type dédié, validation automatique       |
| Conserver une cohérence dans tout le modèle | Facilite la maintenance et la lecture    |

### 🍧 ERRORS

| 🍧 Erreur                                     | 🍧 Conséquence                              |
| --------------------------------------------- | ------------------------------------------- |
| Mettre Edm.String pour des dates              | Impossible de filtrer/ordonner correctement |
| Mettre Edm.String pour des booléens           | Logique client cassée                       |
| Mauvais Scale/Precision sur Decimal           | Arrondis, erreurs de calcul, incohérences   |
| Choisir Edm.Int32 pour un code alphanumérique | Perte des zéros à gauche → critique en SAP  |
