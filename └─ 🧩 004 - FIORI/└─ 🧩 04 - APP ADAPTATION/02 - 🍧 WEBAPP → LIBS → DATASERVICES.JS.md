# 🌸 DATASERVICES.JS

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
