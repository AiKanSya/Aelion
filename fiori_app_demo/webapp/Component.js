/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Module principal SAPUI5 : Component de l’application Fiori/UI5.
 *
 * Rôle global :
 * - point d’entrée de l’application
 * - initialisation des modèles globaux
 * - configuration du routing
 * - initialisation des services métier
 * - activation du mock backend (optionnel)
 */
sap.ui.define(
    [
        /**********************************************************************
         * UIComponent
         * --------------------------------------------------------------------
         * Classe de base SAPUI5 pour toute application Fiori.
         *
         * Gère :
         * - cycle de vie application
         * - routing
         * - modèles globaux
         * - chargement manifest.json
         **********************************************************************/
        "sap/ui/core/UIComponent",

        /**********************************************************************
         * Log
         * --------------------------------------------------------------------
         * API de logging SAPUI5.
         *
         * Utilisé pour tracer :
         * - info
         * - warning
         * - error
         **********************************************************************/
        "sap/base/Log",

        /**********************************************************************
         * ResourceModel (i18n)
         * --------------------------------------------------------------------
         * Modèle de traduction.
         *
         * Charge les fichiers :
         * - i18n.properties
         * - i18n_xx.properties
         **********************************************************************/
        "sap/ui/model/resource/ResourceModel",

        /**********************************************************************
         * models (custom)
         * --------------------------------------------------------------------
         * Module applicatif contenant les modèles utilitaires :
         * - createDeviceModel()
         * - autres modèles UI
         **********************************************************************/
        "fr/stms/fioriappdemo/model/models",

        /**********************************************************************
         * mockServer
         * --------------------------------------------------------------------
         * Serveur OData simulé.
         *
         * Utilisé en mode développement/formation :
         * - sans backend réel
         * - données fictives
         **********************************************************************/
        "fr/stms/fioriappdemo/test/mockServer",

        /**********************************************************************
         * DataServices
         * --------------------------------------------------------------------
         * Service métier centralisé.
         *
         * Contient :
         * - appels OData
         * - logique métier
         * - abstraction du backend
         **********************************************************************/
        "fr/stms/fioriappdemo/libs/DataServices",
    ],

    /**
     * Callback exécuté après chargement des dépendances AMD.
     *
     * IMPORTANT :
     * L’ordre des paramètres DOIT correspondre à l’ordre du tableau
     * des dépendances.
     */
    function (UIComponent, Log, ResourceModel, models, mockServer, DataServices) {
        "use strict";

        /**********************************************************************
         * Classe Component principale
         * --------------------------------------------------------------------
         * Hérite de UIComponent.
         *
         * Responsabilités :
         * - bootstrap application
         * - initialisation services
         * - configuration globale UI5
         **********************************************************************/
        return UIComponent.extend("fr.stms.fioriappdemo.Component", {
            /******************************************************************
             * metadata
             * ----------------------------------------------------------------
             * Configuration statique du composant.
             ******************************************************************/
            metadata: {
                /****************************************************************
                 * manifest.json
                 * --------------------------------------------------------------
                 * Configuration centrale Fiori :
                 * - routing
                 * - modèles
                 * - datasources
                 ****************************************************************/
                manifest: "json",

                /****************************************************************
                 * IAsyncContentCreation
                 * --------------------------------------------------------------
                 * Optimisation UI5 :
                 * chargement asynchrone des vues.
                 ****************************************************************/
                interfaces: ["sap.ui.core.IAsyncContentCreation"],
            },

            /******************************************************************
             * init()
             * ----------------------------------------------------------------
             * Point d’entrée runtime de l’application.
             *
             * Appelé automatiquement au lancement UI5.
             ******************************************************************/
            init: function () {
                /****************************************************************
                 * Appel du constructeur parent UIComponent
                 *
                 * Obligatoire pour initialisation framework UI5.
                 ****************************************************************/
                UIComponent.prototype.init.apply(this, arguments);

                /****************************************************************
                 * Détection mode mock via URL
                 *
                 * Exemple :
                 * http://app?mock=true
                 *
                 * URLSearchParams :
                 * API JavaScript permettant de lire les paramètres URL.
                 ****************************************************************/
                var bMock =
                    new URLSearchParams(window.location.search).get("mock") === "true";

                /****************************************************************
                 * Activation MockServer si mode dev activé
                 ****************************************************************/
                if (bMock) {
                    mockServer.init();
                    Log.info("MockServer activated");
                    console.log("MockServer activated")
                }

                /****************************************************************
                 * Modèle device
                 *
                 * Sert à adapter l’UI :
                 * - mobile
                 * - tablette
                 * - desktop
                 ****************************************************************/
                this.setModel(models.createDeviceModel(), "device");

                /****************************************************************
                 * Modèle i18n
                 *
                 * Permet l’internationalisation de l’application.
                 ****************************************************************/
                var i18nModel = new ResourceModel({
                    bundleName: "fr.stms.fioriappdemo.i18n.i18n",
                });

                this.setModel(i18nModel, "i18n");

                /****************************************************************
                 * metadataLoaded()
                 * --------------------------------------------------------------
                 * Fonction fournie par ODataModel V2.
                 *
                 * Retourne une PROMISE JavaScript.
                 *
                 * BUT :
                 * attendre le chargement complet des métadonnées OData :
                 * - EntitySet
                 * - propriétés
                 * - associations
                 * - types
                 *
                 * IMPORTANT :
                 * Sans cela, certains appels OData peuvent échouer
                 * car le modèle n’est pas encore prêt.
                 ****************************************************************/
                this.getModel()
                    .metadataLoaded()

                    /**************************************************************
                     * .then()
                     * ------------------------------------------------------------
                     * Exécuté UNIQUEMENT quand la Promise est résolue.
                     *
                     * Ici :
                     * => le modèle OData est maintenant prêt.
                     **************************************************************/
                    .then(() => {
                        /************************************************************
                         * getDataServices()
                         * ----------------------------------------------------------
                         * Récupère l’instance unique du service métier.
                         *
                         * Pattern utilisé :
                         * - Singleton léger
                         * - Lazy initialization
                         *
                         * Avantage :
                         * évite de créer plusieurs fois DataServices.
                         ************************************************************/
                        this.getDataServices();

                        Log.info("DataServices READY");
                        console.log("DataServices READY");
                    });

                /****************************************************************
                 * Initialisation router
                 *
                 * Active la navigation entre vues Fiori.
                 ****************************************************************/
                this.getRouter().initialize();
            },

            /******************************************************************
             * getDataServices()
             * ----------------------------------------------------------------
             * Getter centralisé des services backend.
             *
             * Retourne toujours UNE seule instance.
             *
             * Concept :
             * SINGLETON
             ******************************************************************/
            getDataServices: function () {
                /****************************************************************
                 * Vérification existence instance
                 *
                 * !this.oDataServices
                 * => signifie :
                 * "l’instance n’existe pas encore"
                 ****************************************************************/
                if (!this.oDataServices) {
                    /**************************************************************
                     * Création du service métier
                     *
                     * this.getModel()
                     * retourne le ODataModel principal défini dans le manifest.
                     **************************************************************/
                    this.oDataServices = new DataServices(this.getModel());
                }

                /****************************************************************
                 * Retour de l’instance unique
                 ****************************************************************/
                return this.oDataServices;
            },
        });
    },
);