# 🌸 GET ALL

> 🌺 Objectifs
>
> - [ ] Récupérer toutes les sessions depuis le service OData SessionSet.

## 🧩 METADATA

```xml
<EntitySet Name="SessionSet" EntityType="Session"/>
```

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
          this.readConsultants(oModel);

          /* =========================
           * READ ONE
           * ========================= */
          this.readSessionById(oModel, "S001");
          this.readConsultantById(oModel, "S001", "C001");
        },

        /* =========================
         * READ COLLECTION
         * ========================= */

        readSessions: function (oModel) {
          this.oDataRead(oModel, "/SessionSet")
            .then(function (res) {
              console.log("READ SessionSet OK");
              console.table(res.data.results);
            })
            .catch(function (err) {
              console.error("READ SessionSet ERROR", err);
            });
        },

        readConsultants: function (oModel) {
          this.oDataRead(oModel, "/ConsultantSet")
            .then(function (res) {
              console.log("READ ConsultantSet OK");
              console.table(res.data.results);
            })
            .catch(function (err) {
              console.error("READ ConsultantSet ERROR", err);
            });
        },
      },
    );
  },
);
```
