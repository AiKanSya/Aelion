/******************************************************************************
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Déclare un module SAPUI5.
 *
 * SAPUI5 charge les dépendances indiquées puis les injecte automatiquement
 * dans la fonction callback.
 ******************************************************************************/
sap.ui.define(
     [
          /**************************************************************************
           * EventProvider
           * ------------------------------------------------------------------------
           * Classe SAPUI5 permettant de gérer des événements personnalisés.
           *
           * Exemple :
           * - déclencher un événement
           * - écouter un événement
           * - communiquer entre composants
           **************************************************************************/
          "sap/ui/base/EventProvider",

          /**************************************************************************
           * JSONModel
           * ------------------------------------------------------------------------
           * Modèle SAPUI5 basé sur du JSON.
           *
           * Utilisé pour :
           * - stocker des données locales
           * - binder des données aux vues XML
           * - manipuler des objets JavaScript
           **************************************************************************/
          "sap/ui/model/json/JSONModel",
     ],

     /****************************************************************************
      * Fonction callback exécutée après chargement des dépendances.
      *
      * Les modules sont injectés dans le même ordre :
      *
      * EventProvider -> premier module
      * JSONModel     -> second module
      ****************************************************************************/
     function (EventProvider, JSONModel) {
          "use strict";

          /**************************************************************************
           * "use strict"
           * ------------------------------------------------------------------------
           * Active le mode strict JavaScript.
           *
           * Permet :
           * - d’éviter certaines erreurs silencieuses
           * - d’imposer des règles plus strictes
           * - de sécuriser le code
           **************************************************************************/

          /**************************************************************************
           * Création de la classe DataService
           * ------------------------------------------------------------------------
           * EventProvider.extend(...)
           * permet de créer une nouvelle classe héritant de EventProvider.
           *
           * DataService devient donc un objet capable :
           * - d’émettre des événements
           * - d’écouter des événements
           * - de centraliser de la logique métier
           **************************************************************************/
          return EventProvider.extend(
               "fr.stms.fioriappdemo.libs.DataService",

               {
                    /**********************************************************************
                     * Zone contenant le code du DataService
                     *
                     * Généralement utilisée pour :
                     * - appels OData
                     * - appels API
                     * - transformation de données
                     * - gestion des modèles JSON
                     * - communication entre composants
                     **********************************************************************/
                    /* Code du DataServices */
               },
          );
     },
);