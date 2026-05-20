# 🌸 FORMATTER.JS

## 🧩 PROCESS

> [!IMPORTANT]
>
> 1. Créer le fichier `Formatter.js` dans le dossier `libs`.
> 2. Copier/coller le snippet.
> 3. Ajouter le `Formatter.js` dans les Dépendances du` Home.controller.js`
>
> ![](./assets/Capture%20d’écran%202026-02-10%20113336.png)

> [!NOTE]
> Path : `appdemofgi` → `webapp` → `libs` → `Formatter.js`

> [!CAUTION]
>
> - Ne pas oublier de modifier le(s) Namespace(s) par le votre !
> - La manipulation sera a répéter pour chaque View.controller.js

## 🧩 CODE

```js
sap.ui.define(
  ["sap/ui/core/ValueState"],
  /**
   * @param {sap.ui.core.ValueState} ValueState - Contient les constantes UI5 pour les états (Success, Error, Information)
   */
  function (ValueState) {
    "use strict";

    /**
     * @namespace fr.stms.bc.appdemofgi.libs.Formatter
     * @description
     * Fournit des fonctions utilitaires pour :
     * - déterminer le type de bouton ou d'icône selon les messages
     * - gérer l’état (status) des champs ou objets
     * - choisir les icônes et couleurs dans l’UI
     *
     * Ces fonctions sont utilisées pour rendre l’interface plus claire pour l’utilisateur.
     */
    return {
      /**
       * @function buttonType
       * @description
       * Détermine le type de bouton à afficher selon le message le plus sévère
       * @param {Array} aMessages - Liste de messages (chaque message doit avoir un type : "Error", "Warning", "Success")
       * @returns {string} Type de bouton : "Negative", "Critical", "Success" ou "Neutral"
       */
      buttonType: function (aMessages) {
        let sHighestSeverityIcon;

        aMessages.forEach((sMessage) => {
          switch (sMessage.type) {
            case "Error":
              sHighestSeverityIcon = "Negative";
              break;
            case "Warning":
              sHighestSeverityIcon =
                sHighestSeverityIcon !== "Negative"
                  ? "Critical"
                  : sHighestSeverityIcon;
              break;
            case "Success":
              sHighestSeverityIcon =
                sHighestSeverityIcon !== "Negative" &&
                sHighestSeverityIcon !== "Critical"
                  ? "Success"
                  : sHighestSeverityIcon;
              break;
            default:
              sHighestSeverityIcon = !sHighestSeverityIcon
                ? "Neutral"
                : sHighestSeverityIcon;
              break;
          }
        });

        return sHighestSeverityIcon;
      },

      /**
       * @function iconType
       * @description
       * Détermine l’icône à afficher selon le message le plus sévère
       * @param {Array} aMessages - Liste de messages
       * @returns {string} URI de l’icône SAPUI5
       */
      iconType: function (aMessages) {
        let sIcon = "sap-icon://message-popup";

        aMessages.forEach((sMessage) => {
          switch (sMessage.type) {
            case "Error":
              sIcon = "sap-icon://error";
              break;
            case "Warning":
              sIcon = sIcon !== "sap-icon://error" ? "sap-icon://alert" : sIcon;
              break;
            case "Success":
              sIcon =
                sIcon !== "sap-icon://error" && sIcon !== "sap-icon://alert"
                  ? "sap-icon://sys-enter-2"
                  : sIcon;
              break;
            default:
              sIcon = !sIcon ? "Neutral" : sIcon;
              break;
          }
        });

        return sIcon;
      },

      /**
       * @function setStatusState
       * @description Retourne l'état UI5 (ValueState) en fonction du code de statut
       * @param {string} sStatus - Code du statut ("01", "02", ...)
       * @returns {sap.ui.core.ValueState} État correspondant
       */
      setStatusState: function (sStatus) {
        let sState;
        switch (sStatus) {
          case "01":
            sState = ValueState.Success;
            break;
          case "02":
            sState = ValueState.Error;
            break;
          default:
            sState = ValueState.Information;
            break;
        }
        return sState;
      },

      /**
       * @function setStatusIcon
       * @description Retourne l'icône correspondant au statut
       * @param {string} sStatus - Code du statut
       * @returns {string} URI de l’icône SAPUI5
       */
      setStatusIcon: function (sStatus) {
        let sIcon;
        switch (sStatus) {
          case "01":
            sIcon = "sap-icon://sys-enter-2";
            break;
          case "02":
            sIcon = "sap-icon://locked";
            break;
          default:
            sIcon = "sap-icon://sys-add";
            break;
        }
        return sIcon;
      },

      /**
       * @function setStatusText
       * @description Retourne le texte à afficher pour le statut
       * @param {string} sStatusText - Texte fourni
       * @returns {string} Texte à afficher (ou texte par défaut i18n)
       */
      setStatusText: function (sStatusText) {
        let sText = sStatusText
          ? sStatusText
          : this.getModel("i18n").getResourceBundle().getText("status.new");
        return sText;
      },

      /**
       * @function setPosteStatusIcon
       * @description Détermine l’icône selon le statut d’un poste (verrouillé ou non)
       * @param {boolean} bStatus - true = verrouillé, false = actif
       * @returns {string} URI de l’icône SAPUI5
       */
      setPosteStatusIcon: function (bStatus) {
        return bStatus ? "sap-icon://locked" : "sap-icon://sys-enter-2";
      },

      /**
       * @function setBackground
       * @description Retourne une couleur de fond selon un flag
       * @param {boolean} bRed - true = rouge
       * @returns {string} Couleur CSS
       */
      setBackground: function (bRed) {
        return bRed ? "red" : "";
      },

      /**
       * @function setDeleteFlag
       * @description Détermine si un message d'erreur doit être affiché pour suppression
       * @param {boolean} bDelete - true = erreur
       * @returns {string|undefined} Type d’erreur
       */
      setDeleteFlag: function (bDelete) {
        return bDelete ? "Error" : undefined;
      },
    };
  },
);
```

## 🧩 HOME.CONTROLLER.JS

```js
sap.ui.define(
  [
    "fr/stms/bc/appdemofgi/controller/BaseController",
    "fr/stms/bc/appdemofgi/libs/Formatter",
  ],
  /**
   * @param {fr.stms.bc.appdemofgi.controller.BaseController} BaseController - Contrôleur de base avec toutes les fonctions utilitaires
   * @param {Object} Formatter - Module utilitaire pour gérer les icônes, boutons, états et styles dans l'UI
   */
  (BaseController, Formatter) => {
    "use strict";

    /**
     * @class fr.stms.bc.appdemofgi.controller.Home
     * @extends fr.stms.bc.appdemofgi.controller.BaseController
     * @description
     * Contrôleur de la vue Home.
     * Hérite de BaseController pour utiliser toutes les méthodes utilitaires
     * comme getRouter(), getModel(), setFocus(), DataServices et formatter.
     */
    return BaseController.extend("fr.stms.bc.appdemofgi.controller.Home", {
      /**
       * @property {Object} formatter - Permet d’utiliser les fonctions de formatage et d’état
       */
      formatter: Formatter,

      /**
       * @function onInit
       * @description
       * Fonction appelée automatiquement au démarrage de la vue Home.
       * Pour l'instant, elle ne fait rien mais on peut y ajouter :
       * - l'initialisation de modèles spécifiques à la vue
       * - des appels à des services
       * - des événements spécifiques
       */
      onInit() {
        // Ici, on peut ajouter du code qui s'exécute au chargement de la vue
        // Par exemple :
        // this.getView().setModel(new JSONModel(), "homeModel");
      },
    });
  },
);
```
