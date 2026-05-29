# 🌸 DATASERVICES

> 🌺 Objectifs
>
> - [ ] Déplacer les opérations CRUD dans le DataServices (bonne pratique)
> - [ ] Appeler les opération CRUD depuis le Home.controller.js

DISCLAIMER :

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
/**
 * DataServices SAPUI5
 * ---------------------------------------------------------------------------
 * OBJECTIF PÉDAGOGIQUE :
 * - Expliquer précisément les Promises
 * - Expliquer l’ordre des paramètres UI5
 * - Expliquer le mapping UI5 callback → Promise
 * - Rendre explicite le flux d’exécution
 */

sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return function DataServices(oModel) {
    /**********************************************************************
     * this._oModel
     * --------------------------------------------------------------------
     * TYPE : sap.ui.model.odata.v2.ODataModel
     *
     * Rôle :
     * - exécute les requêtes HTTP vers SAP Gateway
     * - expose API callback :
     *      read / create / update / remove
     **********************************************************************/
    this._oModel = oModel;

    this._oModelUser = new JSONModel();

    /* =============================================================== */
    /* PROMISE WRAPPER - PRINCIPES GÉNÉRAUX                           */
    /* =============================================================== */

    /**********************************************************************
     * STRUCTURE D’UNE PROMISE
     * --------------------------------------------------------------------
     *
     * new Promise((resolve, reject) => {})
     *
     * PARAMÈTRES DU CONSTRUCTEUR PROMISE :
     *
     * 1) resolve  → fonction appelée en cas de succès
     * 2) reject   → fonction appelée en cas d’erreur
     *
     * IMPORTANT :
     * - ces fonctions sont fournies automatiquement par JavaScript
     * - on ne les crée pas
     * - on les appelle uniquement
     *
     * ÉTATS POSSIBLES :
     * - pending   : en cours
     * - fulfilled : resolve() appelé
     * - rejected  : reject() appelé
     **********************************************************************/

    /* =============================================================== */
    /* READ (CAS LE PLUS IMPORTANT)                                   */
    /* =============================================================== */

    this.read = function (sPath) {
      /******************************************************************
       * PARAMÈTRES DE LA FONCTION read()
       * ----------------------------------------------------------------
       * sPath :
       *   string
       *   ex: "/SessionSet" ou "/SessionSet('S001')"
       *
       * BUT :
       *   identifier la ressource OData à lire
       ******************************************************************/

      return new Promise((resolve, reject) => {
        /**************************************************************
         * APPEL UI5 ODATA
         * ------------------------------------------------------------
         * SYNTAXE UI5 :
         *
         * this._oModel.read(
         *    sPath,              // 1er paramètre : endpoint OData
         *    {
         *      success: fn,      // callback succès
         *      error: fn         // callback erreur
         *    }
         * )
         *
         * ORDRE DES PARAMÈTRES UI5 :
         * 1) chemin OData (string)
         * 2) objet options (callbacks)
         **************************************************************/
        this._oModel.read(sPath, {
          /************************************************************
           * SUCCESS CALLBACK UI5
           * ----------------------------------------------------------
           * PARAMÈTRES FOURNIS PAR UI5 :
           *
           * 1) oData
           *    → données métier (payload JSON issu backend)
           *
           * 2) oResponse
           *    → objet HTTP complet :
           *       - status code (200, 404, etc.)
           *       - headers
           *       - metadata
           *
           * ORDRE IMPORTANT :
           * UI5 impose (oData, oResponse)
           ************************************************************/
          success: (oData, oResponse) => {
            /******************************************************
             * resolve()
             * ----------------------------------------------------
             * PARAMÈTRES resolve(...) :
             *
             * resolve(value)
             *
             * Ici value = objet structuré :
             *
             * {
             *   data: oData,         // données métier
             *   response: oResponse  // metadata HTTP
             * }
             *
             * IMPORTANT :
             * resolve() déclenche THEN côté consommateur
             ******************************************************/
            resolve({
              data: oData,
              response: oResponse,
            });
          },

          /************************************************************
           * ERROR CALLBACK UI5
           * ----------------------------------------------------------
           * PARAMÈTRES UI5 :
           * 1 seul paramètre :
           * - oError (objet erreur HTTP / OData)
           *
           * reject(oError)
           *
           * IMPORTANT :
           * reject() déclenche CATCH côté consommateur
           ************************************************************/
          error: (oError) => {
            reject(oError);
          },
        });
      });
    };

    /* =============================================================== */
    /* CREATE                                                         */
    /* =============================================================== */

    this.create = function (sPath, oPayload) {
      /******************************************************************
       * PARAMÈTRES :
       * sPath    → endpoint OData (string)
       * oPayload → objet JSON envoyé au backend
       *
       * EX :
       * {
       *   IdSession: "S001",
       *   Name: "test"
       * }
       ******************************************************************/

      return new Promise((resolve, reject) => {
        this._oModel.create(sPath, oPayload, {
          /************************************************************
           * SUCCESS CREATE
           * ----------------------------------------------------------
           * PARAMÈTRES UI5 :
           * 1) oData     → objet créé côté backend
           * 2) oResponse → HTTP response
           ************************************************************/
          success: (oData, oResponse) => {
            resolve({
              data: oData,
              response: oResponse,
            });
          },

          error: (oError) => {
            reject(oError);
          },
        });
      });
    };

    /* =============================================================== */
    /* UPDATE                                                         */
    /* =============================================================== */

    this.update = function (sPath, oPayload) {
      /******************************************************************
       * PARAMÈTRES :
       * sPath    → clé OData (ex: /Entity('ID'))
       * oPayload → données modifiées
       ******************************************************************/

      return new Promise((resolve, reject) => {
        this._oModel.update(sPath, oPayload, {
          success: (oData, oResponse) => {
            resolve({
              data: oData,
              response: oResponse,
            });
          },

          error: (oError) => {
            reject(oError);
          },
        });
      });
    };

    /* =============================================================== */
    /* REMOVE                                                         */
    /* =============================================================== */

    this.remove = function (sPath) {
      /******************************************************************
       * PARAMÈTRES :
       * sPath → identifiant de l'entité à supprimer
       ******************************************************************/

      return new Promise((resolve, reject) => {
        this._oModel.remove(sPath, {
          /************************************************************
           * DELETE UI5
           * ----------------------------------------------------------
           * SUCCESS PARAMÈTRE UNIQUE :
           * oResponse uniquement
           *
           * Pourquoi pas oData ?
           * → DELETE ne retourne généralement pas de payload métier
           ************************************************************/
          success: (oResponse) => {
            resolve({
              response: oResponse,
            });
          },

          error: (oError) => {
            reject(oError);
          },
        });
      });
    };

    /* =============================================================== */
    /* DOMAIN LAYER                                                   */
    /* =============================================================== */

    /**********************************************************************
     * COUCHE MÉTIER
     * --------------------------------------------------------------------
     * BUT :
     * - masquer la complexité OData
     * - fournir API lisible
     **********************************************************************/

    this.getSessions = () => this.read("/SessionSet");

    this.getSessionById = (id) => this.read(`/SessionSet('${id}')`);

    this.createSession = (payload) => this.create("/SessionSet", payload);

    this.updateSession = (id, payload) =>
      this.update(`/SessionSet('${id}')`, payload);

    this.deleteSession = (id) => this.remove(`/SessionSet('${id}')`);

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
    "sap/ui/model/json/JSONModel",
  ],
  (BaseController, Formatter, DataServices, JSONModel) => {
    "use strict";

    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Home",
      {
        /*
                ==========================================================
                FORMATTER
                ==========================================================
                Utilitaire pour transformer les données dans la vue XML
                */
        formatter: Formatter,

        /*
                ==========================================================
                SERVICE BACKEND (OData WRAPPER)
                ==========================================================
                - centralise les appels HTTP
                - transforme callbacks UI5 en Promises
                */
        _oDataServices: null,

        /*
                ==========================================================
                INIT CONTROLLER
                ==========================================================
                Appelé automatiquement au chargement de la vue
                */
        onInit: function () {
          /*
                    ======================================================
                    ODATA MODEL GLOBAL (backend SAP)
                    ======================================================
                    */
          var oModel = this.getOwnerComponent().getModel();

          /*
                    ======================================================
                    INITIALISATION SERVICE MÉTIER
                    ======================================================
                    */
          this._oDataServices = new DataServices(oModel);

          console.log("INIT START");

          /*
                    ======================================================
                    JSONMODEL LOCAL (FORMULAIRE UI)
                    ======================================================

                    Rôle :
                    - stocker les données du formulaire
                    - indépendant du backend
                    - utilisé pour binding UI (two-way binding)
                    */
          this._oViewModel = new JSONModel({
            selectedSession: null,

            sessionForm: {
              IdSession: "",
              Annee: "",
              Duree: "",
              Site: "",
            },
          });

          this.getView().setModel(this._oViewModel, "view");
        },

        /*
                ==========================================================
                READ BY ID
                ==========================================================
                Objectif :
                - appeler backend OData
                - remplir le formulaire UI automatiquement
                */
        onReadSessionById: function () {
          const oViewModel = this.getView().getModel("view");

          /*
                    Lecture valeur input UI :
                    /sessionForm/IdSession
                    */
          const sId = oViewModel.getProperty("/sessionForm/IdSession");

          this._oDataServices
            .getSessionById(sId)
            .then((res) => {
              /*
                            ==================================================
                            ATTENTION STRUCTURE ODATA
                            ==================================================
                            res.data peut contenir :
                            - objet direct
                            - ou structure enveloppée

                            Ici on suppose objet direct
                            */
              oViewModel.setProperty("/sessionForm", res.data);
            })
            .catch((err) => {
              console.error("READ SessionById ERROR", err);
            });
        },

        /*
                ==========================================================
                CREATE SESSION
                ==========================================================
                Flux :
                1. récupérer formulaire
                2. envoyer backend
                3. (optionnel) rafraîchir UI
                */
        onCreateSession: function () {
          const oViewModel = this.getView().getModel("view");

          const oPayload = oViewModel.getProperty("/sessionForm");

          this._oDataServices
            .createSession(oPayload)

            /*
                        PROMISE 1 :
                        - création terminée côté backend
                        */
            .then(() => {
              /*
                            IMPORTANT :
                            ici tu pourrais soit :
                            - refresh ODataModel
                            - OU recharger liste via getSessions()

                            MAIS PAS les deux en même temps
                            */
              return this._oDataServices.getSessions();
            })

            /*
                        PROMISE 2 :
                        - données mises à jour récupérées
                        */
            .then(() => {
              /*
                            UI5 refresh :
                            force relecture binding
                            */
              this.getView().getModel().refresh(true);
            })
            .catch((err) => {
              console.error("CREATE Session ERROR", err);
            });
        },

        /*
                ==========================================================
                UPDATE SESSION
                ==========================================================
                même logique que CREATE
                */
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
            })
            .catch((err) => {
              console.error("UPDATE Session ERROR", err);
            });
        },

        /*
                ==========================================================
                DELETE SESSION
                ==========================================================
                */
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
            })
            .catch((err) => {
              console.error("DELETE Session ERROR", err);
            });
        },
      },
    );
  },
);
```
