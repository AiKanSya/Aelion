# 🌸 UPDATE

> 🌺 Objectifs
>
> - [ ] Mettre à jour une Session.

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
 * - exécute CRUD OData (READ / CREATE / UPDATE)
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
         * Exécute une séquence CRUD de démonstration :
         * - READ collection
         * - READ single entity
         * - CREATE
         * - UPDATE
         **********************************************************************/
        onInit: function () {
          var oModel = this.getOwnerComponent().getModel();

          console.log("INIT START");

          this.readSessions(oModel);
          this.readSessionById(oModel, "S001");
          this.createSession(oModel);
          this.updateSession(oModel);
        },

        /* ================================================================== */
        /* READ COLLECTION                                                   */
        /* ================================================================== */

        readSessions: function (oModel) {
          oModel.read("/SessionSet", {
            success: function (oData) {
              console.log("READ SessionSet OK");
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

        createSession: function (oModel) {
          var oPayload = {
            IdSession: "S006",
            Annee: "2027",
            Duree: "90",
            Site: "Marseille",
          };

          oModel.create("/SessionSet", oPayload, {
            success: function (oData) {
              console.log("CREATE Session OK", oData);
            },
            error: function (oError) {
              console.error("CREATE Session ERROR", oError);
            },
          });
        },

        /* ================================================================== */
        /* UPDATE ENTITY                                                     */
        /* ================================================================== */

        updateSession: function (oModel) {
          var oPayload = {
            /****************************************************************
             * Champs modifiés uniquement
             * (update partiel OData V2)
             ****************************************************************/
            Annee: "2027",
            Duree: "120",
            Site: "Lille",
          };

          /******************************************************************
           * UPDATE OData V2
           * ----------------------------------------------------------------
           * Syntaxe :
           * oModel.update(path, data)
           *
           * Ici :
           * - /SessionSet('S006') = clé primaire de l'entité
           ******************************************************************/
          oModel.update("/SessionSet('S006')", oPayload);
        },
      },
    );
  },
);
```
