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
const oViewModel = new JSONModel({
  /**
   * JSON MODEL UI (sap.ui.model.json.JSONModel)
   * ------------------------------------------------------------
   * STRUCTURE INITIALE DU MODÈLE FRONTEND
   *
   * Rôle :
   * - stocker l’état de l’interface utilisateur
   * - ne contient aucune logique backend
   * - totalement indépendant de l’ODataModel
   */
  sessionForm: {
    /**
     * OBJET MÉTIER "SESSION"
     * ------------------------------------------------------------
     * Sert de source de binding pour le formulaire XML
     * (/sessionForm/...)
     */

    IdSession: "", // clé métier de la session (ex: "S001")
    Annee: "", // année de la session
    Duree: "", // durée (jours/heures selon backend)
    Site: "", // lieu de la session
  },
});

/**
 * AFFECTATION DU MODÈLE À LA VIEW
 * ------------------------------------------------------------
 * this.getView().setModel(model, "name")
 *
 * PARAMÈTRES :
 * 1) oViewModel : instance JSONModel
 * 2) "view"     : nom logique du modèle
 *
 * CONSÉQUENCE :
 * - accessible dans XMLView via :
 *   {view>/sessionForm/IdSession}
 *
 * - binding bidirectionnel :
 *   UI ↔ JSONModel
 */
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

    <!--
        PANEL SAPUI5
        Conteneur visuel standard (sap.m.Panel)

        Rôle :
        - regrouper un ensemble de champs liés à une entité métier (Session)
        - ici : CRUD sur SessionSet (OData)
    -->

    <VBox>

        <!--
            INPUT + DATA BINDING (2-WAY)
            value="{view>/sessionForm/IdSession}"

            DÉCOMPOSITION :
            - view : nom du JSONModel (this.getView().setModel(..., "view"))
            - /sessionForm : objet racine dans le JSONModel
            - IdSession : propriété métier

            FONCTIONNEMENT :
            - affichage automatique de la valeur du modèle dans l’Input
            - modification utilisateur => mise à jour automatique du JSONModel
              (two-way binding par défaut sur sap.m.Input)
        -->
        <Input value="{view>/sessionForm/IdSession}" placeholder="IdSession"/>

        <Input value="{view>/sessionForm/Annee}" placeholder="Année"/>

        <Input value="{view>/sessionForm/Duree}" placeholder="Durée"/>

        <Input value="{view>/sessionForm/Site}" placeholder="Site"/>

        <!--
            HBOX = layout horizontal
            aligne les boutons sur une seule ligne
        -->
        <HBox>

            <!--
                BUTTONS + EVENT HANDLING
                press="onReadSessionById"

                signifie :
                - déclenche une méthode du controller
                - équivalent UI5 de onClick
                - binding automatique via MVC SAPUI5

                IMPORTANT :
                - pas de paramètre explicite ici
                - la fonction récupère les données via le ViewModel
            -->
            <Button text="READ BY ID" press="onReadSessionById"/>

            <Button text="CREATE" type="Emphasized" press="onCreateSession"/>

            <Button text="UPDATE" press="onUpdateSession"/>

            <Button text="DELETE" type="Reject" press="onDeleteSession"/>

        </HBox>

    </VBox>

</Panel>
```
