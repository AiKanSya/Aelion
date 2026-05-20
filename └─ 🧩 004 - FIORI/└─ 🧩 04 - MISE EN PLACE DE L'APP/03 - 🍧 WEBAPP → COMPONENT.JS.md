# 🌸 COMPONENT.JS

## 🧩 PROCESS

> [!IMPORTANT]
>
> 1. Modifier les Dépendances dans le `Component.js`
>
>    ![](./assets/Capture%20d’écran%202026-02-10%20105811.png)
>
> 2. Créer et appeler la fonction `getDataServices`
>
>    ![](./assets/Capture%20d’écran%202026-02-10%20105923.png)

> [!CAUTION]
>
> - Ne pas oublier de modifier le(s) Namespace(s) par le votre !

## 🧩 CODE `Component.js`

```js
sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "fr/stms/bc/appdemofgi/model/models",
    "fr/stms/bc/appdemofgi/libs/DataServices",
  ],
  /**
   * @param {sap.ui.core.UIComponent} UIComponent - Le composant de base SAPUI5
   * @param {object} models - Les modèles de données de l'application
   * @param {object} DataServices - Service pour accéder aux données OData
   */
  (UIComponent, models, DataServices) => {
    "use strict";

    /**
     * @class fr.stms.bc.appdemofgi.Component
     * @extends sap.ui.core.UIComponent
     * @description
     * Le composant principal de l'application Fiori.
     * Il initialise :
     * - les modèles (device, i18n, etc.),
     * - le router pour la navigation,
     * - les services de données via DataServices.js.
     */
    return UIComponent.extend("fr.stms.bc.appdemofgi.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"], // Pour créer les vues de façon asynchrone
      },

      /**
       * @function init
       * @description
       * Fonction appelée automatiquement au démarrage de l'application.
       * Elle :
       * 1. Initialise le composant de base.
       * 2. Définit le modèle "device" pour détecter le type d'appareil.
       * 3. Initialise le router pour gérer la navigation entre les vues.
       * 4. Initialise le service de données (DataServices.js).
       */
      init() {
        // 1. Appel de la fonction init du composant parent
        UIComponent.prototype.init.apply(this, arguments);

        // 2. Création et affectation du modèle device (responsive)
        this.setModel(models.createDeviceModel(), "device");

        // 3. Activation du router pour la navigation entre vues
        this.getRouter().initialize();

        // 4. Initialisation des services de données
        this.getDataServices();
      },

      /**
       * @function getDataServices
       * @description
       * Initialise et retourne le service DataServices.
       * Si déjà créé, retourne l'instance existante.
       * @returns {DataServices} Instance du service de données
       */
      getDataServices: function () {
        if (!this.oDataService) {
          this.oDataService = new DataServices(this.getModel());
        }
        return this.oDataService;
      },
    });
  },
);
```
