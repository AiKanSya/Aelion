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
/**
 * CONTROLLER HOME SAPUI5
 * ---------------------------------------------------------------------------
 * RÔLE GLOBAL :
 * - couche ORCHESTRATION UI
 * - consomme DataServices (Promise-based)
 * - ne contient PAS de logique HTTP directe
 * - déclenche les opérations CRUD métier
 *
 * FLUX ARCHITECTURE :
 * UI (Controller)
 *   → DataServices (Promise wrapper)
 *     → ODataModel (UI5 callback)
 *       → Backend SAP
 */

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
        /******************************************************************
         * FORMATTER
         * ----------------------------------------------------------------
         * Objet utilitaire UI
         * - transformation de données pour affichage XML
         * - ex: statut → couleur / icône / texte
         ******************************************************************/
        formatter: Formatter,

        /******************************************************************
         * DATA SERVICES INSTANCE
         * ----------------------------------------------------------------
         * Contient toutes les fonctions métier backend :
         * - getSessions()
         * - createSession()
         * - updateConsultant()
         * etc.
         *
         * Type :
         * - instance de DataServices(oModel)
         ******************************************************************/
        _oDataServices: null,

        /* =============================================================== */
        /* INIT                                                            */
        /* =============================================================== */

        /**
         * onInit()
         * ----------------------------------------------------------------
         * Lifecycle SAPUI5 :
         * appelé automatiquement à la création du controller
         *
         * OBJECTIF ICI :
         * - récupérer ODataModel global (manifest)
         * - injecter DataServices
         * - lancer des appels CRUD de démonstration
         */
        onInit: function () {
          /****************************************************************
           * RÉCUPÉRATION ODATA MODEL
           * ----------------------------------------------------------------
           * source :
           * - manifest.json (dataSource mainService)
           *
           * CONTIENT :
           * - méthodes read / create / update / remove
           * - connexion backend SAP Gateway
           ****************************************************************/
          var oModel = this.getOwnerComponent().getModel();

          /****************************************************************
           * INITIALISATION DATA SERVICES
           * ----------------------------------------------------------------
           * on encapsule oModel dans une couche métier
           * pour éviter son usage direct dans le controller
           ****************************************************************/
          this._oDataServices = new DataServices(oModel);

          console.log("INIT START");

          /* ============================================================
           * READ COLLECTION (LISTES)
           * ============================================================ */
          this.readSessions();
          this.readConsultants();

          /* ============================================================
           * READ SINGLE ENTITY (1 objet précis)
           * ============================================================ */
          this.readSessionById("S001");
          this.readConsultantById("S001", "C001");

          /* ============================================================
           * CREATE (INSERTION BACKEND)
           * ============================================================ */
          this.createSession();
          this.createConsultant();

          /* ============================================================
           * UPDATE (MODIFICATION BACKEND)
           * ============================================================ */
          this.updateSession();
          this.updateConsultant();

          /* ============================================================
           * DELETE (SUPPRESSION BACKEND)
           * ============================================================ */
          this.deleteSession();
          this.deleteConsultant();
        },

        /* =============================================================== */
        /* READ COLLECTION                                                */
        /* =============================================================== */

        /**
         * readSessions()
         * ----------------------------------------------------------------
         * BUT :
         * récupérer la liste complète des sessions
         *
         * SOURCE DATA :
         * oResult.data.results
         *
         * STRUCTURE :
         * {
         *   data: {
         *     results: [ {...}, {...} ]
         *   },
         *   response: HTTP metadata
         * }
         */
        readSessions: function () {
          this._oDataServices
            .getSessions()

            /**************************************************************
             * THEN = succès Promise
             * oResult = objet retourné par DataServices.read()
             *
             * CONTIENT :
             * - oResult.data     → données métier (liste sessions)
             * - oResult.response → HTTP response
             **************************************************************/
            .then(function (oResult) {
              console.log("READ SessionSet OK");

              /******************************************************
               * extraction liste réelle :
               * oResult.data.results
               *
               * results = format standard OData V2 collection
               ******************************************************/
              console.table(oResult.data.results);
            })

            /**************************************************************
             * CATCH = erreur backend / réseau / OData
             **************************************************************/
            .catch(function (oError) {
              console.error("READ SessionSet ERROR", oError);
            });
        },

        /**
         * readConsultants()
         * ----------------------------------------------------------------
         * BUT :
         * récupérer liste complète des consultants
         *
         * même structure que sessions
         */
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

        /* =============================================================== */
        /* READ ONE (ENTITÉ UNIQUE)                                      */
        /* =============================================================== */

        /**
         * readSessionById(sSessionId)
         * ----------------------------------------------------------------
         * PARAMÈTRE :
         * - sSessionId : identifiant session (string)
         *
         * EX :
         * "S001"
         *
         * RESULTAT :
         * oResult.data → objet unique session
         */
        readSessionById: function (sSessionId) {
          this._oDataServices
            .getSessionById(sSessionId)
            .then(function (oResult) {
              console.log("READ ONE Session OK");

              /******************************************************
               * data = objet unique (pas de results[])
               ******************************************************/
              console.log(oResult.data);
            })
            .catch(function (oError) {
              console.error("READ ONE Session ERROR", oError);
            });
        },

        /**
         * readConsultantById(sSessionId, sConsultantId)
         * ----------------------------------------------------------------
         * clé composite OData :
         * - IdSession
         * - IdConsultant
         *
         * PARAMÈTRES :
         * - sSessionId
         * - sConsultantId
         */
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

        /* =============================================================== */
        /* CREATE                                                         */
        /* =============================================================== */

        /**
         * createSession()
         * ----------------------------------------------------------------
         * BUT :
         * créer une nouvelle entité Session dans le backend
         *
         * oPayload :
         * objet envoyé au serveur (body HTTP POST)
         */
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

              /******************************************************
               * data = entité créée (retour backend)
               ******************************************************/
              console.log(oResult.data);
            })
            .catch(function (oError) {
              console.error("CREATE Session ERROR", oError);
            });
        },

        /**
         * createConsultant()
         * ----------------------------------------------------------------
         * BUT :
         * création entité Consultant
         *
         * IMPORTANT :
         * - clé composite côté backend
         * - liaison session + consultant
         */
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

        /* =============================================================== */
        /* UPDATE                                                         */
        /* =============================================================== */

        /**
         * updateSession()
         * ----------------------------------------------------------------
         * PARAMÈTRES :
         * - ID fixe ici "S006"
         * - payload = champs modifiés uniquement
         *
         * RESULT :
         * oResult.response.statusCode
         * ex :
         * - 200 OK
         * - 204 No Content
         */
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

        /**
         * updateConsultant()
         * ----------------------------------------------------------------
         * clé composite :
         * (Session + Consultant)
         */
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

        /* =============================================================== */
        /* DELETE                                                         */
        /* =============================================================== */

        /**
         * deleteSession()
         * ----------------------------------------------------------------
         * suppression backend
         * paramètre = identifiant unique
         */
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

        /**
         * deleteConsultant()
         * ----------------------------------------------------------------
         * suppression avec clé composite
         */
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
