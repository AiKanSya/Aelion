# 🌸 BASECONTROLLER.JS

## 🧩 PROCESS

> [!IMPORTANT]
>
> 1. Créer le fichier `BaseController.js` dans le dossier `controller`.
> 2. Copier/coller le snippet.
> 3. Modifier le `Namespace` en l'adaptant avec le votre.
>
> ![](./assets/Capture%20d’écran%202026-02-10%20110923.png)

> [!NOTE]
> Path : `appdemofgi` → `webapp` → `controller` → `BaseController.js`

> [!CAUTION]
>
> - Ne pas oublier de modifier le(s) Namespace(s) par le votre !

## 🧩 CODE

```js
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "fr/stms/bc/appdemofgi/libs/DataServices",
  ],
  /**
   * @param {sap.ui.core.mvc.Controller} Controller - Contrôleur de base UI5
   * @param {sap.ui.model.json.JSONModel} JSONModel - Modèle JSON pour stocker les données côté client
   * @param {object} DataServices - Service pour accéder aux données OData
   */
  function (Controller, JSONModel, DataServices) {
    "use strict";

    /**
     * @class fr.stms.bc.appdemofgi.controller.BaseController
     * @extends sap.ui.core.mvc.Controller
     * @description
     * Contrôleur de base pour tous les autres controllers de l'application.
     * Fournit des méthodes utilitaires pour :
     * - accéder aux modèles et au router
     * - gérer les services de données
     * - gérer les messages et popovers
     * - initialiser des modèles côté vue
     */
    return Controller.extend(
      "fr.stms.bc.appdemofgi.controller.BaseController",
      {
        /**
         * @function _InitMsg
         * @description
         * Initialise le service DataServices et le MessageManager pour gérer les messages côté UI.
         */
        _InitMsg: function () {
          this._oDataServices = new DataServices();

          // Gestion des messages (erreurs, alertes, etc.)
          this.oMessageManager = sap.ui.getCore().getMessageManager();
          this.oMessageManager.registerObject(this.getView(), true);
          this.getView().setModel(
            this.oMessageManager.getMessageModel(),
            "message",
          );
        },

        /**
         * @function getRouter
         * @description Retourne le router de l'application pour naviguer entre les vues
         * @returns {sap.ui.core.routing.Router}
         */
        getRouter: function () {
          return this.getOwnerComponent().getRouter();
        },

        /**
         * @function getText
         * @description Récupère une chaîne traduite depuis le modèle i18n
         * @param {string} sText - Clé du texte
         * @param {array} [aParam] - Paramètres optionnels
         * @returns {string} Texte traduit
         */
        getText: function (sText, aParam) {
          return this.getOwnerComponent()
            .getModel("i18n")
            .getResourceBundle()
            .getText(sText, aParam);
        },

        /**
         * @function getModel
         * @description Récupère un modèle depuis le composant principal
         * @param {string} sModel - Nom du modèle
         * @returns {sap.ui.model.Model} Modèle demandé
         */
        getModel: function (sModel) {
          return this.getOwnerComponent().getModel(sModel);
        },

        /**
         * @function setModel
         * @description Affecte un modèle au composant principal
         * @param {string} sModel - Nom du modèle
         * @param {sap.ui.model.Model} oData - Modèle à affecter
         */
        setModel: function (sModel, oData) {
          this.getOwnerComponent().setModel(sModel, oData);
        },

        /**
         * @function getDataService
         * @description Retourne le service DataService de l'application
         */
        getDataService: function () {
          return this.getOwnerComponent().getDataService();
        },

        /**
         * @function getDataServices
         * @description Retourne l'instance locale de DataServices
         */
        getDataServices: function () {
          return this._oDataServices;
        },

        /**
         * @function initializeViewModel
         * @description Initialise un modèle côté vue
         * @param {sap.ui.model.Model} oData - Données du modèle
         * @param {string} sName - Nom du modèle
         */
        initializeViewModel: function (oData, sName) {
          this.getView().setModel(oData, sName);
        },

        /**
         * @function initializeJsViewModel
         * @description Initialise un modèle JSON côté vue et lie la vue aux données
         * @param {string} sName - Nom du modèle
         * @param {object} oData - Données JSON
         */
        initializeJsViewModel: function (sName, oData) {
          this.getView().setModel(new JSONModel(oData), sName);
          this.getView().bindElement(sName + ">/");
        },

        /**
         * @function getViewModel
         * @description Retourne un modèle côté vue
         * @param {string} sName - Nom du modèle
         * @returns {sap.ui.model.Model} Modèle demandé
         */
        getViewModel: function (sName) {
          return this.getView().getModel(sName);
        },

        /**
         * @function setFocus
         * @description Gère le focus sur un champ (ex: zones de scan)
         * @param {string} sField - Id du champ
         * @param {boolean} [sNum] - Option pour sélectionner le texte à nouveau
         */
        setFocus: function (sField, sNum) {
          let sId = this.byId(sField);
          sId.focus();
          sId.selectText(0, 99);
          jQuery.sap.delayedCall(500, this, function () {
            sId.focus();
            sId.selectText(0, 99);
            if (sNum) {
              jQuery.sap.delayedCall(500, this, function () {
                sId.$().find("input").select();
              });
            }
          });
        },

        /////////////////////////// GESTION DU POPOVER ///////////////////////////

        /**
         * @function createMessagePopover
         * @description Crée un MessagePopover pour afficher les messages d'erreurs et alertes
         * @param {string} sButtonId - Id du bouton qui ouvre le popover
         * @returns {sap.m.MessagePopover} MessagePopover créé
         */
        createMessagePopover: function (sButtonId) {
          const oButton = this.getView().byId(sButtonId);
          if (!oButton) return;

          const oMessagePopover = new sap.m.MessagePopover({
            activeTitlePress: (oEvent) => {
              const oItem = oEvent.getParameter("item");
              const oMessage = oItem.getBindingContext("message").getObject();
              const oControl = sap.ui.getCore().byId(oMessage.getControlId());
              if (oControl) {
                setTimeout(() => {
                  oControl.focus();
                  oControl.selectText(0, 99);
                }, 300);
              }
            },
            items: {
              path: "message>/",
              template: new sap.m.MessageItem({
                title: "{message>message}",
                description: "{message>message}",
                type: "{message>type}",
              }),
            },
          });

          oButton.addDependent(oMessagePopover);
          return oMessagePopover;
        },

        /**
         * @function handleMessagePopoverPress
         * @description Ouvre ou ferme le MessagePopover lorsque l'utilisateur clique sur le bouton
         */
        handleMessagePopoverPress: function (oEvent) {
          const sButtonId = oEvent.getSource().getId();
          if (!this._mMessagePopovers) this._mMessagePopovers = {};
          if (!this._mMessagePopovers[sButtonId]) {
            this._mMessagePopovers[sButtonId] =
              this.createMessagePopover(sButtonId);
          }
          this._mMessagePopovers[sButtonId].toggle(oEvent.getSource());
        },

        /**
         * @function getMessageManager
         * @description Retourne le MessageManager pour gérer les messages UI
         */
        getMessageManager: function () {
          return this.oMessageManager;
        },

        /**
         * @function removeAllMessages
         * @description Supprime tous les messages affichés
         */
        removeAllMessages: function () {
          this.getMessageManager().removeAllMessages();
        },

        /**
         * @function deleteDuplicateMsg
         * @description Supprime les messages dupliqués dans le MessageManager
         */
        deleteDuplicateMsg: function () {
          const oMsgMgr = this.getMessageManager();
          if (!oMsgMgr) return;

          const aMessages = oMsgMgr.getMessageModel().getData();
          if (!aMessages || aMessages.length <= 1) return;

          const aFiltered = [];
          const aTrueMessages = aMessages.filter(
            (m) => m.code !== "/IWBEP/CX_MGW_BUSI_EXCEPTION",
          );

          aFiltered.push(...aTrueMessages);

          // garder un seul message technique si aucun vrai message
          if (aTrueMessages.length === 0) {
            const aTechnical = aMessages.filter(
              (m) => m.code === "/IWBEP/CX_MGW_BUSI_EXCEPTION",
            );
            if (aTechnical.length) aFiltered.push(aTechnical[0]);
          }

          oMsgMgr.getMessageModel().setData(aFiltered);
        },
      },
    );
  },
);
```
