# 🌸 ENTITYTYPE - ACTIONS

![](.././assets/Capture%20d’écran%202026-01-16%20115135.png)

## 🧩 SAP GATEWAY DATAMODEL - ACTIONS (CREATABLE, UPDATABLE, SORTABLE, NULLABLE, FILTERABLE)

Les `Checkboxes` correspondent aux `Actions` et comportements permis pour chaque `Property` d’un `EntityType`. Elles définissent ce que les `OData Consumers` peuvent faire avec cette donnée : créer, mettre à jour, trier, filtrer ou accepter des valeurs nulles.

> [!NOTE]
> Dans `OData V2` (et SEGW), l’absence d’une annotation d’action (`sap:creatable`, `sap:updatable`, `sap:deletable`) dans le `$metadata` est interprétée comme `true` par défaut.

### 🍧 DEFINITION

- `sap:creatable` : la `Property` peut être fournie lors de la création d’une `Entity`.
- `sap:updatable` : la `Property` peut être modifiée après création.
- `sap:sortable` : la `Property` peut être utilisée dans un ordre de tri côté `Client`.
- `sap:nullable` : la `Property` peut avoir la valeur vide (null).
- `sap:filterable` : la `Property` peut être utilisée dans des filtres `OData` (`$filter`).

Ces flags sont enregistrés dans le `$metadata` et déterminent la logique côté service et `UI5`/`Fiori`.

### 🍧 ROLE

- Contrôler l’accès et les `Opérations` permises sur chaque `Property`.
- Permettre aux `OData Frameworks` et `UI5`/`Fiori` d’activer ou désactiver automatiquement les `Actions` disponibles.
- Garantir la cohérence des données en imposant les règles métier et techniques.

### 🍧 RULES

| 🍧 Règle   | 🍧 Explication                                                                  |
| ---------- | ------------------------------------------------------------------------------- |
| Creatable  | Mettre à false pour les clés ou les valeurs générées automatiquement            |
| Updatable  | Mettre à false pour les champs immuables ou calculés                            |
| Sortable   | Autoriser uniquement pour les `Property`s utilisées dans les listes ou rapports |
| Nullable   | Respecter la définition DDIC ; clé primaire ne peut pas être nullable           |
| Filterable | Autoriser si la `Property` peut être filtrée côté service                       |

### 🍧 ERRORS

| 🍧 Erreur                            | 🍧 Pourquoi c’est un problème                                               |
| ------------------------------------ | --------------------------------------------------------------------------- |
| Creatable ou Updatable incorrect     | Risque d’erreur lors de la création ou mise à jour des `Entity`s            |
| Nullable sur une clé primaire        | Provoque erreurs de validation et génération du service                     |
| Sortable ou Filterable mal configuré | Les listes, rapports et filtres côté client ne fonctionnent pas             |
| Modification après livraison         | Applications clientes risquent d’échouer ou de contourner la logique métier |
