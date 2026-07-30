# 🌸 ENTITYTYPE - ABAP FIELD NAME

## 🧩 SAP GATEWAY DATAMODEL - ABAP FIELD NAME

L'`ABAP Field Name` relie une `OData Property` à son `Field` correspondant dans le dictionnaire ABAP (`DDIC`). Il sert de référence technique pour le `Back-end` mais n’affecte pas directement l’affichage côté `Front-end`.

![](.././assets/Capture%20d’écran%202026-01-16%20115643.png)

### 🍧 DEFINITION

- Nom du `DDIC Field` utilisé pour stocker ou récupérer la valeur dans le `ABAP Back-end` .
- Permet au Service généré par SEGW de mapper automatiquement la `Property` OData sur le `Field` ABAP correspondant.
- Facilite la synchronisation entre le modèle OData et la structure DDIC.

### 🍧 ROLE

- Assurer la cohérence entre les données exposées via OData et celles stockées dans le `Back-end`.
- Permet aux méthodes générées par SEGW (GET_ENTITY, UPDATE_ENTITY, etc.) de fonctionner automatiquement.
- Sert de documentation technique pour les développeurs ABAP et les intégrateurs.

### 🍧 RULES

| 🍧 Règle                                              | 🍧 Explication                                                   |
| ----------------------------------------------------- | ---------------------------------------------------------------- |
| Doit correspondre à un `Field` DDIC existant          | Évite les erreurs de mapping ou d’accès aux données              |
| Respecter la casse et longueur du DDIC                | Les noms incorrects provoquent des échecs de génération          |
| Stable après livraison                                | Changer casse le mapping automatique et peut casser les services |
| Ne pas utiliser pour des calculs ou `Field`s virtuels | Ces `Field`s n’ont pas de correspondance DDIC                    |

### 🍧 $METADATA EXAMPLES

```xml
<Property Name="Aufnr" Type="Edm.String" Nullable="false" MaxLength="12" sap:field="AUFNR" />
<Property Name="Status" Type="Edm.String" Nullable="true" MaxLength="4" sap:field="STAT" />
```

- `Field "Aufnr"` : correspond au `Field DDIC AUFNR`, utilisé pour toutes les opérations `Back-end`.
- `Field "Status"` : correspond au `Field DDIC STAT`.

### 🍧 ERRORS

| 🍧 Erreur                      | 🍧 Pourquoi c’est un problème                          |
| ------------------------------ | ------------------------------------------------------ |
| ABAP Field Name incorrect      | Génération du service échoue ou données non récupérées |
| Field inexistant dans le DDIC  | Service OData ne peut pas mapper la Property           |
| Changement après livraison     | Applications clientes et Back-end risquent de casser   |
| Utiliser pour un Field calculé | Mapping automatique impossible, nécessite code manuel  |
