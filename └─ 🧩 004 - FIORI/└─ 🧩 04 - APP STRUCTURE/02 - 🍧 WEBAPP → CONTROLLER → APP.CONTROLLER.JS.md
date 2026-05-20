# 🌸 WEBAPP/CONTROLLER/APP.CONTROLLER.JS

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle du contrôleur principal de l’application.
> - [ ] Savoir quand et comment il est initialisé.
> - [ ] Identifier les interactions avec les vues et le router.

## 🧩 DEFINITION

Un `App.controller.js` est le contrôleur principal de l’application Fiori.  
Il est chargé de gérer le cycle de vie global de l’application, d’initialiser les modèles et de configurer le router pour permettre la navigation entre les vues.

> [!TIP]  
> Pense au `App.controller.js` comme au chef d’orchestre qui coordonne toutes les vues et modèles de ton application.

## 🧩 UTILITE

Le contrôleur principal permet de :

- Initialiser les modèles de données.
- Configurer le router pour la navigation entre Home, Detail ou autres vues.
- Gérer les événements globaux de l’application.

> [!CAUTION]  
> Sans `App.controller.js`, l’application ne saurait pas comment démarrer ni comment naviguer entre les écrans.

## 🧩 POINTS IMPORTANTS

- Se charge au démarrage de l’application via le Component.js.
- Permet de centraliser l’initialisation des modèles et services.
- Interagit avec le router pour gérer la navigation.

## 🧩 EXEMPLE

```js
sap.ui.define(
  ["sap/ui/core/mvc/Controller", "appdemofgi/model/models"],
  function (Controller, models) {
    "use strict";
    return Controller.extend("appdemofgi.controller.App", {
      onInit: function () {
        // Initialisation globale de l'application
        this.setModel(models.createViewModel(), "viewModel");
        this.getOwnerComponent().getRouter().initialize();
      },
    });
  },
);
```
