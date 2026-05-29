# 🌸 GET ONE

> 🌺 Objectifs
>
> - [ ] Récupérer une session avec son ID.

## 🧩 APPEL DIRECT ODATA

Path :

     webapp/controller/Home.controller.js

Code :

```js
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Module SAPUI5 : contrôleur Home
 *
 * Rôle :
 * - hérite du BaseController (logique commune)
 * - expose un Formatter pour la vue
 * - exécute des appels OData (READ collection + READ by ID)
 */
sap.ui.define(
  [
    /**********************************************************************
     * BaseController
     * --------------------------------------------------------------------
     * Contrôleur parent contenant les utilitaires :
     * - getModel()
     * - setModel()
     * - getRouter()
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/controller/BaseController",

    /**********************************************************************
     * Formatter
     * --------------------------------------------------------------------
     * Fonctions utilitaires de transformation UI
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/libs/Formatter",
  ],

  (BaseController, Formatter) => {
    "use strict";

    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Home",
      {
        /******************************************************************
         * Formatter exposé à la View XML
         ******************************************************************/
        formatter: Formatter,

        /* ================================================================== */
        /* ODATA CALL FROM CONTROLLER                                        */
        /* ================================================================== */

        /**********************************************************************
         * onInit
         * --------------------------------------------------------------------
         * Hook lifecycle SAPUI5.
         *
         * Exécuté automatiquement à l’instanciation du contrôleur.
         *
         * Rôle ici :
         * - récupérer le modèle OData
         * - lancer les appels de démonstration
         **********************************************************************/
        onInit: function () {
          /******************************************************************
           * Récupération du modèle OData défini dans manifest.json
           *
           * this.getOwnerComponent().getModel()
           * -> modèle par défaut (OData V2 ici)
           ******************************************************************/
          var oModel = this.getOwnerComponent().getModel();

          console.log("INIT START");

          /* ================================================================
           * READ COLLECTION
           * ================================================================ */
          this.readSessions(oModel);

          /* ================================================================
           * READ SINGLE ENTITY
           * ================================================================ */
          this.readSessionById(oModel, "S001");
        },

        /* ================================================================== */
        /* READ COLLECTION                                                   */
        /* ================================================================== */

        /**********************************************************************
         * Lecture de la collection /SessionSet
         *
         * @param {sap.ui.model.odata.v2.ODataModel} oModel
         **********************************************************************/
        readSessions: function (oModel) {
          oModel.read("/SessionSet", {
            /****************************************************************
             * SUCCESS CALLBACK
             * --------------------------------------------------------------
             * oData.results = tableau d'entités retournées par OData
             ****************************************************************/
            success: function (oData) {
              console.log("READ SessionSet OK");

              console.table(oData.results);
            },

            /****************************************************************
             * ERROR CALLBACK
             * --------------------------------------------------------------
             * Exécuté si requête HTTP échoue
             ****************************************************************/
            error: function (oError) {
              console.error("READ SessionSet ERROR", oError);
            },
          });
        },

        /* ================================================================== */
        /* READ ONE ENTITY                                                   */
        /* ================================================================== */

        /**********************************************************************
         * Lecture d’une entité unique SessionSet
         *
         * @param {sap.ui.model.odata.v2.ODataModel} oModel
         * @param {string} sSessionId
         **********************************************************************/
        readSessionById: function (oModel, sSessionId) {
          /******************************************************************
           * Construction dynamique de l’URL OData
           *
           * Format OData V2 :
           * /EntitySet('ID')
           ******************************************************************/
          oModel.read("/SessionSet('" + sSessionId + "')", {
            success: function (oData) {
              console.log("READ ONE Session OK");

              console.log(oData);
            },

            error: function (oError) {
              console.error("READ ONE Session ERROR", oError);
            },
          });
        },
      },
    );
  },
);
```
