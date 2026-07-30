# 🌸 CREATE

> 🌺 Objectifs
>
> - [ ] Créer une Session.

## 🧩 APPEL DIRECT ODATA

Path :

     webapp/controller/Home.controller.js

Code :

```js
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Contrôleur Home SAPUI5
 *
 * Rôle :
 * - hérite du BaseController
 * - expose Formatter pour la vue XML
 * - exécute des opérations CRUD OData (READ + CREATE)
 */
sap.ui.define(
  [
    /**********************************************************************
     * BaseController
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/controller/BaseController",

    /**********************************************************************
     * Formatter
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
         * Point d’entrée du contrôleur.
         *
         * Ici :
         * - récupération du modèle OData
         * - déclenchement des appels CRUD de démonstration
         **********************************************************************/
        onInit: function () {
          /******************************************************************
           * Récupération du modèle OData (défini dans manifest.json)
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

          /* ================================================================
           * CREATE ENTITY
           * ================================================================ */
          this.createSession(oModel);
        },

        /* ================================================================== */
        /* READ COLLECTION                                                   */
        /* ================================================================== */

        readSessions: function (oModel) {
          oModel.read("/SessionSet", {
            success: function (oData) {
              console.log("READ SessionSet OK");

              /**************************************************************
               * oData.results
               * -> tableau des entités OData retournées
               **************************************************************/
              console.table(oData.results);
            },

            error: function (oError) {
              console.error("READ SessionSet ERROR", oError);
            },
          });
        },

        /* ================================================================== */
        /* READ ONE ENTITY                                                   */
        /* ================================================================== */

        readSessionById: function (oModel, sSessionId) {
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

        /* ================================================================== */
        /* CREATE ENTITY                                                     */
        /* ================================================================== */

        /**********************************************************************
         * createSession
         * --------------------------------------------------------------------
         * Création d’une entité OData via HTTP POST
         *
         * OData V2 :
         * - oModel.create = POST
         **********************************************************************/
        createSession: function (oModel) {
          /******************************************************************
           * Payload envoyé au backend
           *
           * Correspond aux champs de l’entité SessionSet
           ******************************************************************/
          var oPayload = {
            IdSession: "S006",
            Annee: "2027",
            Duree: "90",
            Site: "Marseille",
          };

          /******************************************************************
           * CREATE OData
           ******************************************************************/
          oModel.create("/SessionSet", oPayload, {
            success: function (oData) {
              console.log("CREATE Session OK", oData);
            },

            error: function (oError) {
              console.error("CREATE Session ERROR", oError);
            },
          });
        },
      },
    );
  },
);
```
