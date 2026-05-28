# 🌸 DELETE

> 🌺 Objectifs
>
> - [ ] Supprimer un Consultant.

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

          /* =========================
           * CREATE
           * ========================= */

          this.createSession(oModel);
          this.createConsultant(oModel);

          /* =========================
           * UPDATE
           * ========================= */

          this.updateSession(oModel);
          this.updateConsultant(oModel);

          /* =========================
           * DELETE
           * ========================= */

          this.deleteSession(oModel);
          this.deleteConsultant(oModel);
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

        readConsultants: function (oModel) {
          oModel.read("/ConsultantSet", {
            success: function (oData) {
              console.log("READ ConsultantSet OK");

              console.table(oData.results);
            },

            error: function (oError) {
              console.error("READ ConsultantSet ERROR", oError);
            },
          });
        },

        /* =========================
         * READ ONE
         * ========================= */

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

        readConsultantById: function (oModel, sSessionId, sConsultantId) {
          oModel.read(
            "/ConsultantSet(IdSession='" +
              sSessionId +
              "',IdConsultant='" +
              sConsultantId +
              "')",
            {
              success: function (oData) {
                console.log("READ ONE Consultant OK");

                console.log(oData);
              },

              error: function (oError) {
                console.error("READ ONE Consultant ERROR", oError);
              },
            },
          );
        },

        /* =========================
         * CREATE
         * ========================= */

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

        createConsultant: function (oModel) {
          var oPayload = {
            IdSession: "S006",
            IdConsultant: "C001",
            Entreprise: "SAP",
            Name: "Dupont",
            DateBirth: "/Date(631152000000)/",
            City: "Paris",
            Region: "IDF",
            Country: "FR",
            Lang: "FR",
          };

          oModel.create("/ConsultantSet", oPayload, {
            success: function (oData) {
              console.log("CREATE Consultant OK", oData);
            },
          });
        },

        /* =========================
         * UPDATE
         * ========================= */

        updateSession: function (oModel) {
          var oPayload = {
            Annee: "2027",
            Duree: "120",
            Site: "Lille",
          };

          oModel.update("/SessionSet('S006')", oPayload);
        },

        updateConsultant: function (oModel) {
          var oPayload = {
            Entreprise: "SAP",
            Name: "Dupont Modifié",
            City: "Lyon",
            Region: "AURA",
            Country: "FR",
            Lang: "FR",
          };

          oModel.update(
            "/ConsultantSet(IdSession='S006',IdConsultant='C001')",
            oPayload,
          );
        },

        /* =========================
         * DELETE
         * ========================= */

        deleteSession: function (oModel) {
          oModel.remove("/SessionSet('S006')");
        },

        deleteConsultant: function (oModel) {
          oModel.remove("/ConsultantSet(IdSession='S006',IdConsultant='C001')");
        },
      },
    );
  },
);
```
