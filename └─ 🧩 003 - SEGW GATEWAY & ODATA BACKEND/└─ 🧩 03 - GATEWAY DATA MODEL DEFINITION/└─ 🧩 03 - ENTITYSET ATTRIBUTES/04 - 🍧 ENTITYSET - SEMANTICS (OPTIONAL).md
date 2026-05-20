# 🌸 ENTITYSET - SEMANTICS (OPTIONAL)

![](.././assets/Capture%20d’écran%202026-01-16%20120712.png)

## 🧩 SAP GATEWAY DATAMODEL - ENTITYSET SEMANTICS

La colonne `Semantics` d’un `EntitySet` définit la signification métier ou le rôle fonctionnel global de l’`EntitySet`. Elle indique aux applications clientes et `Frameworks SAP` comment traiter ou afficher cette collection.

### 🍧 DEFINITION

- `Annotation SAP` qui décrit le type de contenu ou le rôle métier de l’`EntitySet`.
- Influence l’affichage, le format et le comportement dans `UI5`/`Fiori` et autres outils SAP.
- Ne modifie pas le type technique des `Entities`, mais fournit un contexte métier.

### 🍧 ROLE

- Permet aux applications clientes de comprendre la nature de l’`EntitySet`.
- Facilite la génération automatique de listes, tables et rapports adaptés au type de données.
- Sert à appliquer des comportements standards selon la sémantique (ex. collection de transactions, master data, logs).

### 🍧 ERRORS

| 🍧 Erreur                   | 🍧 Pourquoi c’est un problème                                                          |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Semantics non standard      | Les frameworks SAP ignorent la sémantique, affichage incorrect                         |
| Incohérence avec le contenu | Confusion côté frontend et comportement inadéquat                                      |
| Changement après livraison  | Applications clientes risquent d’interpréter incorrectement le EntitySet               |
| Semantics ambigu            | Difficile pour les développeurs et utilisateurs de comprendre le rôle de la collection |
