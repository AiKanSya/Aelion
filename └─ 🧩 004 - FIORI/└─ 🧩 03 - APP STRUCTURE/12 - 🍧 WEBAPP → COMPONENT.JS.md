# 🌸 WEBAPP/COMPONENT.JS

> 🌺 Objectifs
>
> - [ ] Définir le point d’entrée de l’application Fiori.
> - [ ] Initialiser le router et les modèles globaux.
> - [ ] Gérer le cycle de vie global de l’application.

## 🧩 DEFINITION

`Component.js` est le composant racine de l’application Fiori.  
Il est chargé au démarrage et sert à configurer :

- Le router pour la navigation entre les vues.
- Les modèles globaux (OData, JSON, i18n).
- Les paramètres et extensions de l’application.

> [!TIP]  
> Pense à `Component.js` comme au chef de projet : il initialise tout avant que les vues et contrôleurs ne soient affichés.

## 🧩 UTILITE

- Initialiser les modèles de données globaux.
- Configurer le router pour gérer la navigation.
- Charger les ressources et la configuration définies dans le `manifest.json`.

> [!TIP]  
> Sans `Component.js`, l’application ne peut pas démarrer correctement ni naviguer entre les écrans.

## 🧩 POINTS IMPORTANTS

- Se charge automatiquement grâce au `manifest.json`.
- Contient généralement la fonction `init()` pour initialiser le router et les modèles.
- Sert de point central pour toute l’initialisation de l’application.

## 🧩 EXEMPLE

```js
sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/Device", "appdemofgi/model/models"],
  function (UIComponent, Device, models) {
    "use strict";
    return UIComponent.extend("appdemofgi.Component", {
      metadata: {
        manifest: "json",
      },
      init: function () {
        // Appel de l'init du parent
        UIComponent.prototype.init.apply(this, arguments);

        // Initialisation des modèles
        this.setModel(models.createDeviceModel(), "device");

        // Initialisation du router
        this.getRouter().initialize();
      },
    });
  },
);
```
