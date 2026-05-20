# 🌸 WEBAPP/CONTROLLER/HOME.CONTROLLER.JS

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle du contrôleur associé à la vue Home.
> - [ ] Savoir comment gérer les interactions utilisateur sur l’écran principal.
> - [ ] Apprendre à déclencher la navigation vers d’autres vues.

## 🧩 DEFINITION

`Home.controller.js` est le contrôleur de la vue Home, l’écran principal de l’application.  
Il gère la logique spécifique à cette vue, comme le chargement des données initiales et les actions utilisateur (clic sur un élément, navigation vers Detail, etc.).

> [!TIP]  
> Pense à `Home.controller.js` comme au responsable de l’écran d’accueil : il sait quoi afficher et comment réagir aux actions de l’utilisateur.

## 🧩 UTILITE

Le contrôleur Home permet de :

- Charger les données affichées sur l’écran Home.
- Réagir aux actions utilisateur (clics, sélection dans les listes, boutons).
- Naviguer vers les vues de détail ou autres écrans via le router.

> [!TIP]  
> Chaque vue Fiori a son propre contrôleur qui contient la logique spécifique à cette vue.

## 🧩 POINTS IMPORTANTS

- Hérite souvent du `BaseController` pour utiliser les fonctions communes.
- Contient les événements de la vue (`onInit`, `onPress`, etc.).
- Ne doit gérer que la logique propre à la vue Home.

## 🧩 EXEMPLE

```js
sap.ui.define(
  ["appdemofgi/controller/BaseController"],
  function (BaseController) {
    "use strict";
    return BaseController.extend("appdemofgi.controller.Home", {
      onInit: function () {
        // Initialisation spécifique à la vue Home
      },
      onItemPress: function (oEvent) {
        // Navigation vers la vue Detail
        this.getRouter().navTo("Detail", {
          itemId: oEvent.getSource().getBindingContext().getProperty("ID"),
        });
      },
    });
  },
);
```
