# 🌸 DATA BINDING

> 🌺 Objectifs
>
> - [ ] exploiter le data binding UI5 pour piloter les opérations CRUD Session via UI.

## 🧩 DEFINITION

Le Data Binding est le mécanisme qui relie automatiquement une donnée (model) à une interface utilisateur (view), afin que toute modification de la donnée soit reflétée dans l’UI, et inversement selon le type de binding.

Le Data Binding en SAPUI5 est un mécanisme déclaratif de synchronisation automatique entre :

     une source de données (modèle)
     et un contrôle UI

Il permet de supprimer la manipulation manuelle du DOM et des valeurs UI.

## 🧩 TYPE DE DATA BINDING

### 🍧 Property Binding (liaison de propriété)

lie une propriété UI à un champ du modèle :

```xml
<Text text="{Annee}" />
```

### 🍧 Aggregation Binding (listes / tables)

lie une collection de données à une liste UI :

```xml
<Table items="{/SessionSet}">
```

### 🍧 Element Binding (liaison d’un objet unique)

lie un objet complet à une vue ou un conteneur :

```xml
oView.bindElement("/SessionSet('S001')");
```

## 🧩 MODE DE BINDING

### 🍧 One-way binding

- Model → View uniquement
- standard SAPUI5 pour OData

### 🍧 Two-way binding

- Model ↔ View
- utilisé surtout avec JSONModel (formulaires)

## 🧩 ROLE

| Opération | Rôle du binding                          |
| --------- | ---------------------------------------- |
| READ      | alimente automatiquement la UI           |
| CREATE    | update modèle → UI refresh               |
| UPDATE    | synchronisation après modification       |
| DELETE    | suppression + mise à jour automatique UI |

## 🧩 PRINCIPE ARCHITECTURE

Actuellement :

     Controller → CRUD → console.log

Objectif :

     UI (binding) → Controller → DataServices → OData → UI update automatique

## 🧩 POINT CLE

- UI automatiquement mis à jour si model modifié
- ODataModel ne se met pas toujours à jour automatiquement après CREATE/UPDATE/DELETE.

## 🧩 1. CREATION D'UN MODEL JSON

Path :

     webapp/controller/Home.controller.js

Importer le JSONModel :

```js
sap.ui.define(
  [
    "fr/stms/fgifirstappmodulename/controller/BaseController",
    "fr/stms/fgifirstappmodulename/libs/Formatter",
    "fr/stms/fgifirstappmodulename/libs/DataServices",
    "sap/ui/model/json/JSONModel",
  ],
  (BaseController, Formatter, DataServices, JSONModel) => {
    /* ... */
  },
);
```

Dans onInit, après l'instanciation des DataServices, ajouter :

```js
/**
 * ViewModel :
 * - sert de stockage temporaire UI (formulaire Session)
 * - indépendant du backend
 */
const oViewModel = new JSONModel({
  sessionForm: {
    IdSession: "",
    Annee: "",
    Duree: "",
    Site: "",
  },
});

this.getView().setModel(oViewModel, "view");
```

Points clés :

     JSONModel ("view") = état UI (formulaire)

## 🧩 2. CREATION D'UN FORMULAIRE DANS LA VIEW

Path :

     webapp/view/Home.view.xml

À ajouter AU-DESSUS de la table Session :

```xml
<Panel headerText="Session Form" class="sapUiSmallMargin">

    <VBox>

        <Input value="{view>/sessionForm/IdSession}" placeholder="IdSession"/>
        <Input value="{view>/sessionForm/Annee}" placeholder="Année"/>
        <Input value="{view>/sessionForm/Duree}" placeholder="Durée"/>
        <Input value="{view>/sessionForm/Site}" placeholder="Site"/>

        <HBox>
            <Button text="READ BY ID" press="onReadSessionById"/>
            <Button text="CREATE" type="Emphasized" press="onCreateSession"/>
            <Button text="UPDATE" press="onUpdateSession"/>
            <Button text="DELETE" type="Reject" press="onDeleteSession"/>
        </HBox>

    </VBox>

</Panel>
```
