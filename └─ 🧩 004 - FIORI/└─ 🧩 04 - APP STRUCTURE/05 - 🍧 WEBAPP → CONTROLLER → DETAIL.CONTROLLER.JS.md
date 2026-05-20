# 🌸 WEBAPP/CONTROLLER/DETAIL.CONTROLLER.JS

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle du contrôleur associé à la vue Detail.
> - [ ] Gérer l’affichage et la manipulation des données d’un élément sélectionné.
> - [ ] Maîtriser la navigation et les actions spécifiques au détail d’un objet.

## 🧩 DEFINITION

`Detail.controller.js` est le contrôleur de la vue Detail, qui affiche les informations détaillées d’un élément sélectionné depuis la vue Home.  
Il contient la logique spécifique à cette vue, comme le chargement des détails, la gestion des événements et la mise à jour de l’interface utilisateur.

> [!TIP]  
> Pense à `Detail.controller.js` comme au responsable de l’écran de détail : il sait quoi afficher quand l’utilisateur clique sur un élément et comment gérer les interactions sur cette page.

## 🧩 UTILITE

Le contrôleur Detail permet de :

- Charger et afficher les données complètes d’un élément sélectionné.
- Réagir aux actions utilisateur (boutons, formulaires, édition).
- Gérer la navigation vers d’autres vues si nécessaire.

> [!TIP]  
> Chaque vue de détail a son propre contrôleur pour que la logique reste isolée et facile à maintenir.

## 🧩 POINTS IMPORTANTS

- Hérite généralement du `BaseController` pour utiliser les fonctions communes.
- Contient les événements spécifiques à la vue Detail (`onInit`, `onBeforeRendering`, etc.).
- Interagit avec les modèles pour récupérer ou mettre à jour les données.

## 🧩 EXEMPLE

```js
sap.ui.define(
  ["appdemofgi/controller/BaseController"],
  function (BaseController) {
    "use strict";
    return BaseController.extend("appdemofgi.controller.Detail", {
      onInit: function () {
        // Initialisation spécifique à la vue Detail
        var oRouter = this.getRouter();
        oRouter
          .getRoute("Detail")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (oEvent) {
        // Récupérer l'ID de l'élément et lier la vue aux données
        var sItemId = oEvent.getParameter("arguments").itemId;
        this.getView().bindElement("/Items('" + sItemId + "')");
      },
    });
  },
);
```
