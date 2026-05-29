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
│   ├── Component.js # <- Point d’entrée de l’application
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
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Module principal SAPUI5 : Component de l’application Fiori/UI5.
 *
 * Rôle global :
 * - point d’entrée de l’application
 * - initialisation des modèles globaux
 * - configuration du routing
 * - initialisation des services métier
 * - activation du mock backend (optionnel)
 */
sap.ui.define(
  [
    /**********************************************************************
     * UIComponent
     * --------------------------------------------------------------------
     * Classe de base SAPUI5 pour toute application Fiori.
     *
     * Gère :
     * - cycle de vie application
     * - routing
     * - modèles globaux
     * - chargement manifest.json
     **********************************************************************/
    "sap/ui/core/UIComponent",

    /**********************************************************************
     * Log
     * --------------------------------------------------------------------
     * API de logging SAPUI5.
     *
     * Utilisé pour tracer :
     * - info
     * - warning
     * - error
     **********************************************************************/
    "sap/base/Log",

    /**********************************************************************
     * ResourceModel (i18n)
     * --------------------------------------------------------------------
     * Modèle de traduction.
     *
     * Charge les fichiers :
     * - i18n.properties
     * - i18n_xx.properties
     **********************************************************************/
    "sap/ui/model/resource/ResourceModel",

    /**********************************************************************
     * models (custom)
     * --------------------------------------------------------------------
     * Module applicatif contenant les modèles utilitaires :
     * - createDeviceModel()
     * - autres modèles UI
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/model/models",

    /**********************************************************************
     * mockServer
     * --------------------------------------------------------------------
     * Serveur OData simulé.
     *
     * Utilisé en mode développement/formation :
     * - sans backend réel
     * - données fictives
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/test/mockServer",

    /**********************************************************************
     * DataServices
     * --------------------------------------------------------------------
     * Service métier centralisé.
     *
     * Contient :
     * - appels OData
     * - logique métier
     * - abstraction du backend
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/libs/DataServices",
  ],

  /**
   * Callback exécuté après chargement des dépendances.
   */
  function (UIComponent, Log, ResourceModel, models, mockServer, DataServices) {
    "use strict";

    /**********************************************************************
     * Classe Component principale
     * --------------------------------------------------------------------
     * Hérite de UIComponent.
     *
     * Responsabilités :
     * - bootstrap application
     * - initialisation services
     * - configuration globale UI5
     **********************************************************************/
    return UIComponent.extend("fr.stms.fgifirstappmodulename.Component", {
      /******************************************************************
       * metadata
       * ----------------------------------------------------------------
       * Configuration statique du composant.
       ******************************************************************/
      metadata: {
        /****************************************************************
         * manifest.json
         * --------------------------------------------------------------
         * Configuration centrale Fiori :
         * - routing
         * - modèles
         * - datasources
         ****************************************************************/
        manifest: "json",

        /****************************************************************
         * IAsyncContentCreation
         * --------------------------------------------------------------
         * Optimisation UI5 :
         * chargement asynchrone des vues.
         ****************************************************************/
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      /******************************************************************
       * init()
       * ----------------------------------------------------------------
       * Point d’entrée runtime de l’application.
       *
       * Appelé automatiquement au lancement UI5.
       ******************************************************************/
      init: function () {
        /****************************************************************
         * Appel du constructeur parent UIComponent
         *
         * Obligatoire pour initialisation framework UI5.
         ****************************************************************/
        UIComponent.prototype.init.apply(this, arguments);

        /****************************************************************
         * Détection mode mock via URL
         *
         * Exemple :
         * http://app?mock=true
         ****************************************************************/
        var bMock =
          new URLSearchParams(window.location.search).get("mock") === "true";

        /****************************************************************
         * Activation MockServer si mode dev activé
         ****************************************************************/
        if (bMock) {
          mockServer.init();
          Log.info("MockServer activated");
        }

        /****************************************************************
         * Modèle device
         *
         * Sert à adapter l’UI :
         * - mobile
         * - tablette
         * - desktop
         ****************************************************************/
        this.setModel(models.createDeviceModel(), "device");

        /****************************************************************
         * Modèle i18n
         *
         * Permet l’internationalisation de l’application.
         ****************************************************************/
        var i18nModel = new ResourceModel({
          bundleName: "fr.stms.fgifirstappmodulename.i18n.i18n",
        });

        this.setModel(i18nModel, "i18n");

        /****************************************************************
         * Initialisation DataServices (lazy-safe)
         *
         * Important :
         * metadataLoaded() garantit que le modèle OData est prêt.
         ****************************************************************/
        this.getModel()
          .metadataLoaded()
          .then(() => {
            this.oDataServices = new DataServices(this.getModel());

            Log.info("DataServices READY");
            console.log("DataServices READY");
          });

        /****************************************************************
         * Initialisation router
         *
         * Active la navigation entre vues Fiori.
         ****************************************************************/
        this.getRouter().initialize();
      },

      /******************************************************************
       * getDataServices()
       * ----------------------------------------------------------------
       * Singleton accessor du service métier.
       *
       * Pattern utilisé :
       * - lazy initialization
       * - une seule instance globale
       ******************************************************************/
      getDataServices: function () {
        if (!this.oDataServices) {
          this.oDataServices = new DataServices(this.getModel());
        }

        return this.oDataServices;
      },
    });
  },
);
```
