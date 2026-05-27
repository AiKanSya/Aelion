# 🌸 COMPONENT

## 🧩 COMPONENT.JS (POINT D’ENTRÉE DE L’APPLICATION)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   ├── localService/
│   ├── model/
│   ├── view/
│   │
│   ├── Component.js               		# Point d’entrée de l’application
│   │
│   ├── index.html
│   └── manifest.json
│
├── .gitignore
├── (mta.yaml)
├── package-lock.json
├── package.json
├── README.md
├── ui5-local.yaml
├── ui5-mock.yaml
└── ui5.yaml
```

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Initialiser l’application et ses composants.
>
> - 🔨 Utilité : Charger les modèles, configurer le router, et préparer l’application pour l’exécution.
> - ⌚ Quand utilisé ? Dès le démarrage de l’application, avant l’affichage des vues.

📌 Exemple :

```js
sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/base/Log",
    "sap/ui/model/resource/ResourceModel",
    "fr/stms/fgifirstappmodulename/model/models",
    "fr/stms/fgifirstappmodulename/test/mockServer",
    "fr/stms/fgifirstappmodulename/libs/DataServices",
  ],
  function (UIComponent, Log, ResourceModel, models, mockServer, DataServices) {
    "use strict";

    /**
     * Component principal de l'application Fiori/UI5
     * - Initialise le modèle OData (via manifest)
     * - Active le MockServer si nécessaire
     * - Initialise les services métier (DataServices)
     * - Configure i18n et device model
     *
     * @class fr.stms.fgifirstappmodulename.Component
     * @extends sap.ui.core.UIComponent
     */
    return UIComponent.extend("fr.stms.fgifirstappmodulename.Component", {
      metadata: {
        manifest: "json",

        /**
         * Permet l'instanciation asynchrone des vues
         * recommandé pour performance UI5
         */
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      /**
       * Point d'entrée du composant UI5
       * Initialise modèles, mock server et services applicatifs
       */
      init: function () {
        // Appel du cycle de vie UI5 standard
        UIComponent.prototype.init.apply(this, arguments);

        /**
         * Détection du mode mock via URL
         * ex : ?mock=true
         */
        var bMock =
          new URLSearchParams(window.location.search).get("mock") === "true";

        /**
         * Initialisation MockServer (mode offline formation)
         */
        if (bMock) {
          mockServer.init();
          Log.info("MockServer activated");
        }

        /**
         * Modèle device (responsive UI)
         */
        this.setModel(models.createDeviceModel(), "device");

        /**
         * Modèle i18n (traductions)
         */
        var i18nModel = new ResourceModel({
          bundleName: "fr.stms.fgifirstappmodulename.i18n.i18n",
        });
        this.setModel(i18nModel, "i18n");

        /**
         * Initialisation des services métiers
         *
         * Important :
         * On attend que les métadonnées OData soient chargées
         * pour garantir que le modèle est exploitable.
         */
        this.getModel()
          .metadataLoaded()
          .then(() => {
            this.oDataServices = new DataServices(this.getModel());

            Log.info("DataServices READY");
            console.log("DataServices READY");
          });

        /**
         * Initialisation du router UI5
         */
        this.getRouter().initialize();
      },

      /**
       * Singleton accessor du service DataServices
       * Garantit une seule instance dans l'application
       *
       * @returns {object} instance DataServices
       */
      getDataServices: function () {
        // Lazy initialization (création à la demande)
        if (!this.oDataServices) {
          this.oDataServices = new DataServices(this.getModel());
        }

        return this.oDataServices;
      },
    });
  },
);
```
