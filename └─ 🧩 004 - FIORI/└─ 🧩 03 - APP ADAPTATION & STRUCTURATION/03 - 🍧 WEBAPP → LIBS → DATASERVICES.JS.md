# 🌸 DATASERVICES.JS

    webapp
    └── libs
          └── DataServices.js

## 🧩 DEFINITION

`DataServices.js` est un module utilitaire qui contient les fonctions pour interagir avec les services de données (OData, mockserver, API REST, etc.).  
Il sert à encapsuler les appels aux services, gérer les promesses et simplifier l’accès aux données pour les contrôleurs.

> [!TIP]  
> Pense à `DataServices.js` comme au pont entre ton application Fiori et le backend : toutes les requêtes passent par là.

## 🧩 UTILITE

- Fournir des fonctions génériques pour lire, créer, mettre à jour ou supprimer des données.
- Gérer les erreurs et les réponses des services.
- Simplifier la logique dans les contrôleurs en centralisant le code de communication.

> [!TIP]  
> Les contrôleurs appellent ces fonctions au lieu d’écrire directement les requêtes OData.

## 🧩 POINTS IMPORTANTS

- Ne contient pas de code lié à l’interface utilisateur.
- Peut être utilisé par tous les contrôleurs.
- Permet d’avoir un point unique à modifier si le service backend change.

## 🧩 EXEMPLE DE CODE CONTENU DANS DATASERVICES.JS

```js
sap.ui.define([], function () {
  "use strict";
  return {
    getSession: function (oModel) {
      return new Promise(function (resolve, reject) {
        oModel.read("/Session", {
          success: function (oData) {
            resolve(oData.results);
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });
    },

    getConsultant: function (oModel) {
      return new Promise(function (resolve, reject) {
        oModel.read("/Consultant", {
          success: function (oData) {
            resolve(oData.results);
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });
    },

    createConsultant: function (oModel, oPayload) {
      return new Promise(function (resolve, reject) {
        oModel.create("/Consultant", oPayload, {
          success: function (oData) {
            resolve(oData);
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });
    },
  };
});
```

## 🧩 PROCESS

> [!IMPORTANT]
>
> 1. Créer le dossier `libs` dans le `webapp`.
> 2. Créer le fichier `DataServices.js` dans le dossier `libs`.
> 3. Copier/coller le snippet.
> 4. Modifier le `Namespace` en l'adaptant avec le votre.
>
> ![](./assets/Capture%20d’écran%202026-02-10%20104508.png)

> [!NOTE]
> Path : `appdemofgi` → `webapp` → `libs` → `DataServices.js`

> [!CAUTION]
> Ne pas oublier de modifier le(s) Namespace(s) par le votre !

## 🧩 CODE `DataServices.js`

```js
sap.ui.define(
  ["sap/ui/base/EventProvider", "sap/ui/model/json/JSONModel"],
  /**
   * @param {sap.ui.base.EventProvider} EventProvider - Fournit les fonctionnalités de gestion d'événements
   * @param {sap.ui.model.json.JSONModel} JSONModel - Modèle JSON pour stocker les données côté client
   */
  function (EventProvider, JSONModel) {
    "use strict";

    /**
     * @class fr.stms.bc.appdemofgi.controller.DataService
     * @extends sap.ui.base.EventProvider
     * @description
     * Service pour gérer les données de l'application côté front-end.
     * Permet de stocker les données utilisateurs et d'autres informations dans des modèles JSON.
     */
    return EventProvider.extend(
      "fr.stms.bc.appdemofgi.controller.DataService",
      {
        /**
         * @constructor
         * @param {sap.ui.model.odata.v2.ODataModel|sap.ui.model.json.JSONModel} oModel - Le modèle principal passé par le composant
         * @description
         * Crée une instance de DataService.
         * - Initialise un modèle JSON pour les données utilisateur (`_oModelUser`)
         * - Stocke le modèle principal fourni (`_oModel`)
         */
        constructor: function (oModel) {
          // Appel du constructeur du parent EventProvider pour gérer les événements
          EventProvider.prototype.constructor.apply(this, arguments);

          // Modèle JSON pour stocker des données temporaires ou spécifiques à l'utilisateur
          this._oModelUser = new JSONModel();

          // Référence au modèle principal passé par le composant (OData ou JSON)
          this._oModel = oModel;
        },
      },
    );
  },
);
```

## 🧩 ETAPE 8 - DATASERVICES.JS

Créer :

    webapp/libs/DataServices.js

Code :

```js
sap.ui.define(
  ["sap/ui/base/EventProvider", "sap/ui/model/json/JSONModel"],
  /**
   * @param {sap.ui.base.EventProvider} EventProvider - Fournit les fonctionnalités de gestion d'événements
   * @param {sap.ui.model.json.JSONModel} JSONModel - Modèle JSON pour stocker les données côté client
   */
  function (EventProvider, JSONModel) {
    "use strict";
    return EventProvider.extend(
      "fr.stms.fgifirstappmodulename.controller.DataService",
      {
    //====================================================
    // METHODES GENERIQUES CRUD
    //====================================================

    /**
     * Lecture OData générique
     */
    read(oModel, sPath, oParameters = {}) {
      return new Promise((resolve, reject) => {
        oModel.read(sPath, {
          filters: oParameters.filters || [],
          urlParameters: oParameters.urlParameters || {},

          success: function (oData) {
            resolve(oData);
          },

          error: function (oError) {
            reject(oError);
          },
        });
      });
    },

    /**
     * Création OData générique
     */
    create(oModel, sPath, oPayload) {
      return new Promise((resolve, reject) => {
        oModel.create(sPath, oPayload, {
          success: function (oData) {
            resolve(oData);
          },

          error: function (oError) {
            reject(oError);
          },
        });
      });
    },

    /**
     * Update OData générique
     */
    update(oModel, sPath, oPayload) {
      return new Promise((resolve, reject) => {
        oModel.update(sPath, oPayload, {
          success: function (oData) {
            resolve(oData);
          },

          error: function (oError) {
            reject(oError);
          },
        });
      });
    },

    /**
     * Suppression OData générique
     */
    remove(oModel, sPath) {
      return new Promise((resolve, reject) => {
        oModel.remove(sPath, {
          success: function (oData) {
            resolve(oData);
          },

          error: function (oError) {
            reject(oError);
          },
        });
      });
    },

    //====================================================
    // SESSIONSET
    //====================================================

    /**
     * Lecture toutes sessions
     *
     * GET /SessionSet
     */
    getSessions(oModel) {
      return this.read(oModel, "/SessionSet");
    },

    /**
     * Lecture session unique
     *
     * GET
     * /SessionSet('S001')
     */
    getSessionById(oModel, sSessionId) {
      return this.read(oModel, `/SessionSet('${sSessionId}')`);
    },

    /**
     * Création session
     *
     * POST /SessionSet
     */
    createSession(oModel, oPayload) {
      return this.create(oModel, "/SessionSet", oPayload);
    },

    /**
     * Modification session
     */
    updateSession(oModel, sSessionId, oPayload) {
      return this.update(oModel, `/SessionSet('${sSessionId}')`, oPayload);
    },

    /**
     * Suppression session
     */
    deleteSession(oModel, sSessionId) {
      return this.remove(oModel, `/SessionSet('${sSessionId}')`);
    },

    //====================================================
    // CONSULTANTSET
    //====================================================

    /**
     * Lecture tous consultants
     *
     * GET /ConsultantSet
     */
    getConsultants(oModel) {
      return this.read(oModel, "/ConsultantSet");
    },

    /**
     * Lecture consultant unique
     *
     * Clé composite :
     *
     * IdSession
     * IdConsultant
     *
     */
    getConsultantById(oModel, sSessionId, sConsultantId) {
      return this.read(
        oModel,
        `/ConsultantSet(IdSession='${sSessionId}',IdConsultant='${sConsultantId}')`,
      );
    },

    /**
     * Création consultant
     */
    createConsultant(oModel, oPayload) {
      return this.create(oModel, "/ConsultantSet", oPayload);
    },

    /**
     * Modification consultant
     */
    updateConsultant(oModel, sSessionId, sConsultantId, oPayload) {
      return this.update(
        oModel,
        `/ConsultantSet(IdSession='${sSessionId}',IdConsultant='${sConsultantId}')`,
        oPayload,
      );
    },

    /**
     * Suppression consultant
     */
    deleteConsultant(oModel, sSessionId, sConsultantId) {
      return this.remove(
        oModel,
        `/ConsultantSet(IdSession='${sSessionId}',IdConsultant='${sConsultantId}')`,
      );
    },

    //====================================================
    // NAVIGATION
    // Session → ConsultantSet
    //====================================================

    /**
     * Récupère consultants d'une session
     *
     * GET
     * /SessionSet('S001')/ConsultantSet
     *
     */
    getSessionConsultants(oModel, sSessionId) {
      return this.read(oModel, `/SessionSet('${sSessionId}')/ConsultantSet`);
    },
  };
});
```
