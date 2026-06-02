# 🌸 SMART COMPOSANTS

> 🌺 Objectifs
>
> - [ ] exploiter les SmartFilterBar
> - [ ] exploiter les SmartTable

## 🧩 CONCEPT

Avant :

     UI (SearchField + Table)
     ↓
     Controller (Filter + Sorter)
     ↓
     ODataModel

Avec Smart Controls :

     SmartFilterBar
     ↓
     SmartTable
     ↓
     ODataModel (metadata-driven)

## 🧩 PRE-REQUIS IMPORTANT

Smart controls fonctionnent uniquement si ton backend expose :

     ✔ $metadata OData complet

Exemple :

     /sap/opu/odata/sap/ZSERVICE_SRV/$metadata

Avec :

     EntityType
     EntitySet
     propriétés typées

## 🧩 1. AJOUTER DES NAMESPACES XML
