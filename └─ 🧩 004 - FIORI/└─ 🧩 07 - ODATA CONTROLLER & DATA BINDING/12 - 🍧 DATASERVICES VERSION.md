# 🌸 DATASERVICES

> 🌺 Objectifs
>
> - [ ] Déplacer les opérations CRUD dans le DataServices
> - [ ] Appeler les opération CRUD depuis le Home.controller.js

DISCLAIMER

    Cette version est correcte et cohérente pour un cours SAP Fiori / UI5 débutant à intermédiaire.

Elle privilégie :

    compréhension du flux OData
    visibilité des opérations CRUD
    simplicité cognitive
    lecture linéaire du code

Elle sacrifie volontairement :

    DRY
    abstraction avancée
    robustesse production
    orchestration async structurée

## 🧩 DATASERVICES

Path :

     webapp/controller/DataServices.js

Code :

```js
sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return function DataServices(oModel) {
    this._oModel = oModel;
    this._oModelUser = new JSONModel();

    /* ====================================================== */
    /* GENERIC WRAPPER                                        */
    /* ====================================================== */

    this.read = function (sPath) {
      return new Promise((resolve, reject) => {
        this._oModel.read(sPath, {
          success: (oData, oResponse) => {
            resolve({ data: oData, response: oResponse });
          },
          error: reject,
        });
      });
    };

    this.create = function (sPath, oPayload) {
      return new Promise((resolve, reject) => {
        this._oModel.create(sPath, oPayload, {
          success: (oData, oResponse) => {
            resolve({ data: oData, response: oResponse });
          },
          error: reject,
        });
      });
    };

    this.update = function (sPath, oPayload) {
      return new Promise((resolve, reject) => {
        this._oModel.update(sPath, oPayload, {
          success: (oData, oResponse) => {
            resolve({ data: oData, response: oResponse });
          },
          error: reject,
        });
      });
    };

    this.remove = function (sPath) {
      return new Promise((resolve, reject) => {
        this._oModel.remove(sPath, {
          success: (oResponse) => {
            resolve({ response: oResponse });
          },
          error: reject,
        });
      });
    };

    /* ====================================================== */
    /* SESSION                                                */
    /* ====================================================== */

    this.getSessions = () => this.read("/SessionSet");

    this.getSessionById = (id) => this.read(`/SessionSet('${id}')`);

    this.createSession = (payload) => this.create("/SessionSet", payload);

    this.updateSession = (id, payload) =>
      this.update(`/SessionSet('${id}')`, payload);

    this.deleteSession = (id) => this.remove(`/SessionSet('${id}')`);

    /* ====================================================== */
    /* CONSULTANT                                             */
    /* ====================================================== */

    this.getConsultants = () => this.read("/ConsultantSet");

    this.getConsultantById = (sid, cid) =>
      this.read(`/ConsultantSet(IdSession='${sid}',IdConsultant='${cid}')`);

    this.createConsultant = (payload) => this.create("/ConsultantSet", payload);

    this.updateConsultant = (sid, cid, payload) =>
      this.update(
        `/ConsultantSet(IdSession='${sid}',IdConsultant='${cid}')`,
        payload,
      );

    this.deleteConsultant = (sid, cid) =>
      this.remove(`/ConsultantSet(IdSession='${sid}',IdConsultant='${cid}')`);
  };
});
```

## 🧩 HOME.CONTROLLER

Path :

     webapp/controller/Home.controller.js

Code :

```js
sap.ui.define(
  [
    "fr/stms/fgifirstappmodulename/controller/BaseController",
    "fr/stms/fgifirstappmodulename/libs/Formatter",
    "fr/stms/fgifirstappmodulename/libs/DataServices",
  ],
  (BaseController, Formatter, DataServices) => {
    "use strict";

    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Home",
      {
        /**
         * Formatter UI
         */
        formatter: Formatter,

        /**
         * DataServices frontend
         * @private
         */
        _oDataServices: null,

        /* ====================================================== */
        /* INIT                                                   */
        /* ====================================================== */

        /**
         * Initialisation controller
         */
        onInit: function () {
          /**
           * ODataModel principal
           */
          var oModel = this.getOwnerComponent().getModel();

          /**
           * Instanciation DataServices
           */
          this._oDataServices = new DataServices(oModel);
          console.log("INIT START");

          /* =========================
           * READ COLLECTION
           * ========================= */

          this.readSessions();
          this.readConsultants();

          /* =========================
           * READ ONE
           * ========================= */

          this.readSessionById("S001");
          this.readConsultantById("S001", "C001");

          /* =========================
           * CREATE
           * ========================= */

          this.createSession();
          this.createConsultant();

          /* =========================
           * UPDATE
           * ========================= */

          this.updateSession();
          this.updateConsultant();

          /* =========================
           * DELETE
           * ========================= */

          this.deleteSession();
          this.deleteConsultant();
        },

        /* ====================================================== */
        /* READ COLLECTION                                        */
        /* ====================================================== */

        readSessions: function () {
          this._oDataServices
            .getSessions()
            .then(function (oResult) {
              console.log("READ SessionSet OK");
              console.table(oResult.data.results);
            })
            .catch(function (oError) {
              console.error("READ SessionSet ERROR", oError);
            });
        },

        readConsultants: function () {
          this._oDataServices
            .getConsultants()
            .then(function (oResult) {
              console.log("READ ConsultantSet OK");
              console.table(oResult.data.results);
            })
            .catch(function (oError) {
              console.error("READ ConsultantSet ERROR", oError);
            });
        },

        /* ====================================================== */
        /* READ ONE                                               */
        /* ====================================================== */

        readSessionById: function (sSessionId) {
          this._oDataServices
            .getSessionById(sSessionId)
            .then(function (oResult) {
              console.log("READ ONE Session OK");
              console.log(oResult.data);
            })
            .catch(function (oError) {
              console.error("READ ONE Session ERROR", oError);
            });
        },

        readConsultantById: function (sSessionId, sConsultantId) {
          this._oDataServices
            .getConsultantById(sSessionId, sConsultantId)
            .then(function (oResult) {
              console.log("READ ONE Consultant OK");
              console.log(oResult.data);
            })
            .catch(function (oError) {
              console.error("READ ONE Consultant ERROR", oError);
            });
        },

        /* ====================================================== */
        /* CREATE                                                 */
        /* ====================================================== */

        createSession: function () {
          var oPayload = {
            IdSession: "S006",
            Annee: "2027",
            Duree: "90",
            Site: "Marseille",
          };
          this._oDataServices
            .createSession(oPayload)
            .then(function (oResult) {
              console.log("CREATE Session OK");
              console.log(oResult.data);
            })
            .catch(function (oError) {
              console.error("CREATE Session ERROR", oError);
            });
        },

        createConsultant: function () {
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
          this._oDataServices
            .createConsultant(oPayload)
            .then(function (oResult) {
              console.log("CREATE Consultant OK");
              console.log(oResult.data);
            })
            .catch(function (oError) {
              console.error("CREATE Consultant ERROR", oError);
            });
        },

        /* ====================================================== */
        /* UPDATE                                                 */
        /* ====================================================== */

        updateSession: function () {
          var oPayload = {
            Annee: "2027",
            Duree: "120",
            Site: "Lille",
          };
          this._oDataServices
            .updateSession("S006", oPayload)
            .then(function (oResult) {
              console.log("UPDATE Session OK");
              console.log(oResult.response.statusCode);
            })
            .catch(function (oError) {
              console.error("UPDATE Session ERROR", oError);
            });
        },

        updateConsultant: function () {
          var oPayload = {
            Entreprise: "SAP",
            Name: "Dupont Modifié",
            City: "Lyon",
            Region: "AURA",
            Country: "FR",
            Lang: "FR",
          };
          this._oDataServices
            .updateConsultant("S006", "C001", oPayload)
            .then(function (oResult) {
              console.log("UPDATE Consultant OK");
              console.log(oResult.response.statusCode);
            })
            .catch(function (oError) {
              console.error("UPDATE Consultant ERROR", oError);
            });
        },

        /* ====================================================== */
        /* DELETE                                                 */
        /* ====================================================== */

        deleteSession: function () {
          this._oDataServices
            .deleteSession("S006")
            .then(function () {
              console.log("DELETE Session OK");
            })
            .catch(function (oError) {
              console.error("DELETE Session ERROR", oError);
            });
        },

        deleteConsultant: function () {
          this._oDataServices
            .deleteConsultant("S006", "C001")
            .then(function () {
              console.log("DELETE Consultant OK");
            })
            .catch(function (oError) {
              console.error("DELETE Consultant ERROR", oError);
            });
        },
      },
    );
  },
);
```
