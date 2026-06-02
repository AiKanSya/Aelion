# 🌸 CONSULTANT BINDING

> 🌺 Objectifs
>
> - [ ] exploiter le data binding UI5 pour piloter les opérations CRUD Consultant via UI.

## 🧩 1. CREATION D'UN MODEL JSON

Path :

     webapp/controller/Home.controller.js

Importer le JSONModel :

```js
sap.ui.define(
  [
    "fr/stms/fgifirstappmodulename/controller/BaseController",
    "fr/stms/fgifirstappmodulename/libs/Formatter",
    "fr/stms/fgifirstappmodulename/libs/DataServices",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  (BaseController, Formatter, DataServices, JSONModel, MessageToast) => {
    "use strict";

    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Home",
      {
        formatter: Formatter,

        _oDataServices: null,

        onInit: function () {
          const oModel = this.getOwnerComponent().getModel();

          this._oDataServices = new DataServices(oModel);

          this._oViewModel = new JSONModel({
            selectedSession: null,

            sessionForm: {
              IdSession: "",
              Annee: "",
              Duree: "",
              Site: "",
            },

            consultantForm: {
              IdSession: "",
              IdConsultant: "",
              Entreprise: "",
              Name: "",
              DateBirth: "",
              City: "",
              Region: "",
              Country: "",
              Lang: "",
            },
          });

          this.getView().setModel(this._oViewModel, "view");
        },

        /* ====================================================== */
        /* SESSION                                                */
        /* ====================================================== */

        onReadSessionById: function () {
          const oViewModel = this.getView().getModel("view");

          const sId = oViewModel.getProperty("/sessionForm/IdSession");

          this._oDataServices
            .getSessionById(sId)
            .then((res) => {
              oViewModel.setProperty("/sessionForm", res.data);
            })
            .catch((err) => {
              console.error("READ SessionById ERROR", err);
            });
        },

        onCreateSession: function () {
          const oViewModel = this.getView().getModel("view");

          const oPayload = oViewModel.getProperty("/sessionForm");

          this._oDataServices
            .createSession(oPayload)
            .then(() => {
              return this._oDataServices.getSessions();
            })
            .then(() => {
              this.getView().getModel().refresh(true);

              MessageToast.show("Session créée");
            })
            .catch((err) => {
              console.error("CREATE Session ERROR", err);
            });
        },

        onUpdateSession: function () {
          const oViewModel = this.getView().getModel("view");

          const oPayload = oViewModel.getProperty("/sessionForm");

          const sId = oPayload.IdSession;

          this._oDataServices
            .updateSession(sId, oPayload)
            .then(() => {
              return this._oDataServices.getSessions();
            })
            .then(() => {
              this.getView().getModel().refresh(true);

              MessageToast.show("Session modifiée");
            })
            .catch((err) => {
              console.error("UPDATE Session ERROR", err);
            });
        },

        onDeleteSession: function () {
          const oViewModel = this.getView().getModel("view");

          const sId = oViewModel.getProperty("/sessionForm/IdSession");

          this._oDataServices
            .deleteSession(sId)
            .then(() => {
              return this._oDataServices.getSessions();
            })
            .then(() => {
              this.getView().getModel().refresh(true);

              MessageToast.show("Session supprimée");
            })
            .catch((err) => {
              console.error("DELETE Session ERROR", err);
            });
        },

        /* ====================================================== */
        /* CONSULTANT                                             */
        /* ====================================================== */

        onReadConsultantById: function () {
          const oViewModel = this.getView().getModel("view");

          const sSessionId = oViewModel.getProperty(
            "/consultantForm/IdSession",
          );

          const sConsultantId = oViewModel.getProperty(
            "/consultantForm/IdConsultant",
          );

          this._oDataServices
            .getConsultantById(sSessionId, sConsultantId)
            .then((res) => {
              oViewModel.setProperty("/consultantForm", res.data);
            })
            .catch((err) => {
              console.error("READ ConsultantById ERROR", err);
            });
        },

        onCreateConsultant: function () {
          const oViewModel = this.getView().getModel("view");

          const oPayload = oViewModel.getProperty("/consultantForm");

          this._oDataServices
            .createConsultant(oPayload)
            .then(() => {
              return this._oDataServices.getConsultants();
            })
            .then(() => {
              this.getView().getModel().refresh(true);

              MessageToast.show("Consultant créé");
            })
            .catch((err) => {
              console.error("CREATE Consultant ERROR", err);
            });
        },

        onUpdateConsultant: function () {
          const oViewModel = this.getView().getModel("view");

          const oPayload = oViewModel.getProperty("/consultantForm");

          const sSessionId = oPayload.IdSession;

          const sConsultantId = oPayload.IdConsultant;

          this._oDataServices
            .updateConsultant(sSessionId, sConsultantId, oPayload)
            .then(() => {
              return this._oDataServices.getConsultants();
            })
            .then(() => {
              this.getView().getModel().refresh(true);

              MessageToast.show("Consultant modifié");
            })
            .catch((err) => {
              console.error("UPDATE Consultant ERROR", err);
            });
        },

        onDeleteConsultant: function () {
          const oViewModel = this.getView().getModel("view");

          const sSessionId = oViewModel.getProperty(
            "/consultantForm/IdSession",
          );

          const sConsultantId = oViewModel.getProperty(
            "/consultantForm/IdConsultant",
          );

          this._oDataServices
            .deleteConsultant(sSessionId, sConsultantId)
            .then(() => {
              return this._oDataServices.getConsultants();
            })
            .then(() => {
              this.getView().getModel().refresh(true);

              MessageToast.show("Consultant supprimé");
            })
            .catch((err) => {
              console.error("DELETE Consultant ERROR", err);
            });
        },
      },
    );
  },
);
```
