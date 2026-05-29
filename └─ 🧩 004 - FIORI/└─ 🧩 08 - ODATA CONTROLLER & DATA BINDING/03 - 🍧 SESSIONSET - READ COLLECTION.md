# 🌸 READ BY ID

> 🌺 Objectifs
>
> - [ ] Récupérer toutes les Sessions

## 🧩 APPEL DIRECT ODATA

Path :

     webapp/controller/Home.controller.js

Code :

```js
/******************************************************************************
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Permet de définir un module SAPUI5.
 *
 * SAPUI5 charge les dépendances indiquées dans le tableau puis les injecte
 * automatiquement dans la fonction callback.
 ******************************************************************************/
sap.ui.define(
  [
    // Contrôleur parent personnalisé
    "fr/stms/fgifirstappmodulename/controller/BaseController",

    // Librairie contenant des fonctions de formatage
    "fr/stms/fgifirstappmodulename/libs/Formatter",
  ],

  /****************************************************************************
   * Fonction callback exécutée une fois les dépendances chargées.
   *
   * Les modules sont injectés dans les paramètres dans le même ordre :
   *
   * BaseController  -> correspond au premier chemin
   * Formatter       -> correspond au second chemin
   *
   * Syntaxe utilisée :
   * Arrow Function (ES6)
   ****************************************************************************/
  (BaseController, Formatter) => {
    "use strict";

    /**************************************************************************
     * "use strict"
     * ------------------------------------------------------------------------
     * Active le mode strict JavaScript.
     *
     * Permet :
     * - d’éviter certaines erreurs silencieuses
     * - de sécuriser le code
     * - d’imposer des règles plus strictes
     **************************************************************************/

    /**************************************************************************
     * Création du contrôleur Home
     *
     * BaseController.extend(...)
     * permet de créer un nouveau contrôleur héritant du BaseController.
     **************************************************************************/
    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Home",
      {
        /**********************************************************************
         * formatter
         * --------------------------------------------------------------------
         * Expose les fonctions du Formatter au XML View.
         *
         * Exemple XML :
         *
         * text="{
         *   path: 'MyModel>Amount',
         *   formatter: '.formatter.formatAmount'
         * }"
         **********************************************************************/
        formatter: Formatter,

        /* ================================================================== */
        /* ODATA CALL FROM CONTROLLER                                         */
        /* ================================================================== */

        /**********************************************************************
         * onInit()
         * --------------------------------------------------------------------
         * Méthode du cycle de vie SAPUI5.
         *
         * Appelée automatiquement lors de l'initialisation du contrôleur.
         *
         * Utilisée généralement pour :
         * - charger des données
         * - initialiser des modèles
         * - préparer l’écran
         **********************************************************************/
        onInit: function () {
          /********************************************************************
           * Récupération du modèle OData depuis le Component principal.
           *
           * this
           * -> représente l’instance actuelle du contrôleur
           *
           * getOwnerComponent()
           * -> récupère le composant parent SAPUI5
           *
           * getModel()
           * -> récupère le modèle déclaré dans le manifest.json
           ********************************************************************/
          var oModel = this.getOwnerComponent().getModel();

          console.log("INIT START");

          /********************************************************************
           * Appel de la méthode readSessions()
           *
           * this.readSessions :
           * - appelle une méthode appartenant au contrôleur courant
           *
           * oModel :
           * - passé en paramètre à la fonction
           ********************************************************************/
          this.readSessions(oModel);
        },

        /* ========================= */
        /* READ COLLECTION           */
        /* ========================= */

        /**********************************************************************
         * Lecture de l'entité SessionSet via OData
         *
         * @param {sap.ui.model.odata.v2.ODataModel} oModel
         * Modèle OData SAPUI5
         **********************************************************************/
        readSessions: function (oModel) {
          /********************************************************************
           * oModel.read(...)
           * ------------------------------------------------------------------
           * Effectue un appel HTTP GET vers le service OData.
           *
           * Endpoint appelé :
           * /SessionSet
           *
           * Syntaxe :
           *
           * oModel.read(url, options)
           ********************************************************************/
          oModel.read("/SessionSet", {
            /******************************************************************
             * Callback SUCCESS
             * ---------------------------------------------------------------
             * Exécuté si l’appel OData réussit.
             *
             * oData :
             * contient les données renvoyées par le backend.
             ******************************************************************/
            success: function (oData) {
              console.log("READ SessionSet OK");

              /***************************************************************
               * oData.results
               * ------------------------------------------------------------
               * Tableau contenant les lignes renvoyées par l’OData.
               *
               * console.table(...)
               * affiche les données sous forme de tableau dans la console.
               ***************************************************************/
              console.table(oData.results);
            },

            /******************************************************************
             * Callback ERROR
             * ---------------------------------------------------------------
             * Exécuté si l’appel OData échoue.
             *
             * Causes possibles :
             * - erreur backend
             * - problème réseau
             * - URL incorrecte
             * - autorisation manquante
             ******************************************************************/
            error: function (oError) {
              console.error("READ SessionSet ERROR", oError);
            },
          });
        },
      },
    );
  },
);
```
