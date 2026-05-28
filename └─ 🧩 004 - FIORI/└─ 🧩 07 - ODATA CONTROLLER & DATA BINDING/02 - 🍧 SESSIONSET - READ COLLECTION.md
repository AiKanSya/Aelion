# 🌸 READ BY ID

> 🌺 Objectifs
>
> - [ ] Récupérer toutes les Sessions

## 🧩 APPEL DIRECT ODATA

Path :

     webapp/controller/Home.controller.js

Code :

```js
sap.ui.define(
  [
    "fr/stms/fgifirstappmodulename/controller/BaseController",
    "fr/stms/fgifirstappmodulename/libs/Formatter",
  ],
  (BaseController, Formatter) => {
    "use strict";

    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Home",
      {
        /**
         * Formatter UI
         * @type {Object}
         */
        formatter: Formatter,

        /* ====================================================================== */
        /* ODATA CALL FROM CONTROLLER                                             */
        /* ====================================================================== */

        /**
         * Init controller
         * Lance toutes les opérations CRUD de démonstration sur S006
         */
        onInit: function () {
          var oModel = this.getOwnerComponent().getModel();

          console.log("INIT START");

          /* =========================
           * READ COLLECTION
           * ========================= */

          this.readSessions(oModel);
        },

        /* =========================
         * READ COLLECTION
         * ========================= */

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
      },
    );
  },
);
```
