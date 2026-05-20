# 🌸 WEBAPP/CONTROLLER/BASECONTROLLER.JS

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle d’un contrôleur de base dans l’application.
> - [ ] Savoir comment réutiliser les fonctions communes dans d’autres contrôleurs.
> - [ ] Éviter la duplication de code.

## 🧩 DEFINITION

`BaseController.js` est un contrôleur parent dont héritent les autres contrôleurs (Home, Detail, etc.).  
Il centralise les fonctions communes comme l’accès au router, aux modèles ou aux messages.

> [!TIP]  
> Pense au `BaseController.js` comme à une boîte à outils que tous les autres contrôleurs peuvent utiliser.

## 🧩 UTILITE

Le BaseController permet de :

- Fournir un accès simplifié au router (`getRouter()`).
- Gérer les modèles communs (`getModel()`, `setModel()`).
- Centraliser des fonctions utilitaires (messages, formatage, helpers).

> [!TIP]  
> Plutôt que de copier-coller les mêmes fonctions dans chaque contrôleur, on les place dans le BaseController.

## 🧩 POINTS IMPORTANTS

- Ne contient pas de logique spécifique à une vue.
- Doit être hérité par tous les autres contrôleurs pour profiter des fonctions communes.
- Facilite la maintenance et l’évolution de l’application.

## 🧩 EXEMPLE

```js
sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend("appdemofgi.controller.BaseController", {
    getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },
    getModel: function (sName) {
      return this.getView().getModel(sName);
    },
    setModel: function (oModel, sName) {
      return this.getView().setModel(oModel, sName);
    },
  });
});
```
