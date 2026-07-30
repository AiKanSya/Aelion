# 🌸 FORMATTER

## 🧩 FORMATTER.JS (FORMATAGE DES DONNÉES UI)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   │
│   ├── libs/
│   │   ├── DataServices.js
│   │   └── Formatter.js # <- Fonctions de formatage UI
│   │
│   ├── localService/
│   ├── model/
│   ├── view/
│   ├── Component.js
│   ├── index.html
│   └── manifest.json
│
├── .gitignore
├── (mta.yaml)
├── package-lock.json
├── package.json
├── README.md
├── ui5-local.yaml
├── ui5-mock.yaml
└── ui5.yaml
```

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Adapter l’affichage des données dans l’interface utilisateur.
>
> - 🔨 Utilité : Transformer des données brutes (dates, statuts, montants) en valeurs lisibles.
> - ⌚ Quand utilisé ? Lorsqu’un champ doit être affiché différemment de sa valeur technique.

> [!WARNING]
> Pour que le Formatter soit accessible, il faut l'"appeler" dans le(s) Controller(s) afin qu'il soit disponible dans la view du Controller !

📌 Exemple Formatter.js :

```js
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Module SAPUI5 de type "Formatter".
 *
 * Rôle :
 * Fournir des fonctions utilitaires utilisées dans les XML Views
 * pour transformer les données avant affichage.
 *
 * Exemple d’usage en XML :
 * text="{path: 'status', formatter: '.formatter.setStatusText'}"
 */
sap.ui.define(
  [
    /**********************************************************************
     * ValueState
     * --------------------------------------------------------------------
     * Enum SAPUI5 définissant les états visuels standards :
     * - Success
     * - Error
     * - Warning
     * - Information
     **********************************************************************/
    "sap/ui/core/ValueState",
  ],

  /**
   * Callback exécuté après chargement des dépendances.
   *
   * ValueState est injecté comme paramètre.
   */
  function (ValueState) {
    "use strict";

    /**********************************************************************
     * Formatter (module utilitaire pur)
     * --------------------------------------------------------------------
     * Objet retourné contenant uniquement des fonctions.
     *
     * Important :
     * - pas de state interne
     * - pas de dépendance UI directe
     * - utilisé uniquement pour transformer des données
     **********************************************************************/
    return {
      /**********************************************************************
       * buttonType
       * --------------------------------------------------------------------
       * Détermine le type de bouton SAPUI5 en fonction de la sévérité
       * des messages.
       *
       * Priorité :
       * Error > Warning > Success > Neutral
       **********************************************************************/
      buttonType: function (aMessages) {
        let sHighestSeverityIcon;

        aMessages.forEach((sMessage) => {
          switch (sMessage.type) {
            case "Error":
              // priorité maximale
              sHighestSeverityIcon = "Negative";
              break;

            case "Warning":
              // ignoré si déjà Error
              sHighestSeverityIcon =
                sHighestSeverityIcon !== "Negative"
                  ? "Critical"
                  : sHighestSeverityIcon;
              break;

            case "Success":
              // pris en compte uniquement si rien de plus grave
              sHighestSeverityIcon =
                sHighestSeverityIcon !== "Negative" &&
                sHighestSeverityIcon !== "Critical"
                  ? "Success"
                  : sHighestSeverityIcon;
              break;

            default:
              // valeur par défaut si aucun état défini
              sHighestSeverityIcon = !sHighestSeverityIcon
                ? "Neutral"
                : sHighestSeverityIcon;
              break;
          }
        });

        return sHighestSeverityIcon;
      },

      /**********************************************************************
       * iconType
       * --------------------------------------------------------------------
       * Retourne une icône SAPUI5 selon la sévérité des messages.
       **********************************************************************/
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

      /**********************************************************************
       * setStatusState
       * --------------------------------------------------------------------
       * Convertit un code métier en ValueState UI5.
       *
       * Mapping :
       * "01" -> Success
       * "02" -> Error
       * default -> Information
       **********************************************************************/
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

      /**********************************************************************
       * setStatusIcon
       * --------------------------------------------------------------------
       * Retourne une icône selon le statut métier.
       **********************************************************************/
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

      /**********************************************************************
       * setStatusText
       * --------------------------------------------------------------------
       * Retourne un texte affichable pour un statut.
       *
       * Si vide :
       * récupération du texte i18n "status.new"
       **********************************************************************/
      setStatusText: function (sStatusText) {
        let sText = sStatusText
          ? sStatusText
          : this.getModel("i18n").getResourceBundle().getText("status.new");

        return sText;
      },

      /**********************************************************************
       * setPosteStatusIcon
       * --------------------------------------------------------------------
       * Icône selon état booléen :
       * - true  -> locked
       * - false -> active
       **********************************************************************/
      setPosteStatusIcon: function (bStatus) {
        return bStatus ? "sap-icon://locked" : "sap-icon://sys-enter-2";
      },

      /**********************************************************************
       * setBackground
       * --------------------------------------------------------------------
       * Retourne une couleur CSS simple.
       **********************************************************************/
      setBackground: function (bRed) {
        return bRed ? "red" : "";
      },

      /**********************************************************************
       * setDeleteFlag
       * --------------------------------------------------------------------
       * Détermine si un état d’erreur doit être appliqué.
       *
       * Retour :
       * - "Error" si suppression bloquante
       * - undefined sinon
       **********************************************************************/
      setDeleteFlag: function (bDelete) {
        return bDelete ? "Error" : undefined;
      },
    };
  },
);
```

📌 Exemple d'appel du Formatter dans le Home.controller :

```js
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Module SAPUI5 : contrôleur Home.
 *
 * Rôle :
 * - hérite du BaseController (logique commune)
 * - expose un formatter pour la vue XML
 */
sap.ui.define(
  [
    /**********************************************************************
     * BaseController
     * --------------------------------------------------------------------
     * Contrôleur parent de l’application.
     *
     * Fournit des méthodes réutilisables :
     * - getModel()
     * - setModel()
     * - getRouter()
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/controller/BaseController",

    /**********************************************************************
     * Formatter
     * --------------------------------------------------------------------
     * Module utilitaire contenant des fonctions de transformation.
     *
     * Utilisé dans les XML Views pour :
     * - adapter les données pour l’affichage
     * - gérer icônes / états / textes
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/libs/Formatter",
  ],

  /**
   * Callback exécuté après chargement des dépendances.
   */
  (BaseController, Formatter) => {
    "use strict";

    /**********************************************************************
     * Contrôleur Home
     * --------------------------------------------------------------------
     * Hérite du BaseController.
     **********************************************************************/
    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Home",
      {
        /******************************************************************
         * formatter
         * ----------------------------------------------------------------
         * Objet exposé à la View XML.
         *
         * Permet d’appeler les fonctions du module Formatter dans XML :
         *
         * Exemple :
         * text="{path: 'status', formatter: '.formatter.setStatusText'}"
         *
         * Important :
         * - ce n’est PAS une instance métier
         * - c’est un simple objet de fonctions stateless
         ******************************************************************/
        formatter: Formatter,
      },
    );
  },
);
```
