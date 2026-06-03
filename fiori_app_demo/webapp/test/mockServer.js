sap.ui.define(["sap/ui/core/util/MockServer"], function (MockServer) {
     "use strict";

     /**
      * MockServer wrapper pour application UI5
      * Permet de simuler un backend OData SAP sans système S/4HANA
      *
      * Utilisé pour :
      * - formation stagiaires
      * - développement offline
      * - tests fonctionnels UI5
      *
      * @class fr.stms.fgifirstappmodulename.test.mockServer
      */
     return {
          /**
           * Initialise et démarre le MockServer OData
           *
           * Étapes :
           * 1. création du serveur mock sur l'URI OData
           * 2. activation auto-response
           * 3. simulation basée sur metadata.xml
           * 4. connexion aux fichiers mockdata JSON
           * 5. démarrage du serveur
           */
          init: function () {
               /**
                * Instance MockServer liée au service OData
                */
               var oMockServer = new MockServer({
                    rootUri: "/sap/opu/odata/sap/ZFIORI_DEMO_SRV/",
               });

               /**
                * Configuration globale MockServer
                * autoRespond = true → réponses automatiques sans délai manuel
                * autoRespondAfter → simulation latence réseau SAP
                */
               MockServer.config({
                    autoRespond: true,
                    autoRespondAfter: 300,
               });

               /**
                * Simulation du service OData à partir du metadata.xml
                * - définit les EntitySets
                * - génère les routes REST mockées
                * - lie les fichiers JSON mockdata
                */
               oMockServer.simulate(
                    sap.ui.require.toUrl(
                         "fr/stms/fioriappdemo/localService/metadata.xml",
                    ),
                    {
                         /**
                          * Base des fichiers JSON mockés
                          */
                         sMockdataBaseUrl: sap.ui.require.toUrl(
                              "fr/stms/fioriappdemo/localService/mockdata",
                         ),

                         /**
                          * Désactive la génération automatique de données fictives
                          * (on force uniquement les JSON fournis)
                          */
                         bGenerateMissingMockData: false,
                    },
               );

               /**
                * Démarrage du serveur mock
                * Intercepte les appels OData de l'application
                */
               oMockServer.start();

               // Log de validation runtime
               console.log("Mock server started");
          },
     };
});