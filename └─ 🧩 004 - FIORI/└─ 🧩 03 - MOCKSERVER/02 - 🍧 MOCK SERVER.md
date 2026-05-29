# 🌸 MOCK SERVER

> 🌺 Objectifs
>
> - [ ] Mettre en place un MockServer UI5 complet pour remplacer le backend SAP et permettre à tous de travailler sans VPN ni système distant avec les même données.

## 🧩 PRINCIPES

Un MockServer :

- intercepte les appels OData
- remplace SAP Gateway
- utilise des fichiers JSON locaux
- reproduit GET / POST / PUT / DELETE

Flux :

    UI5 App
    ↓
    ODataModel
    ↓
    MockServer (local)
    ↓
    metadata.xml + mockdata JSON

## 🧩 NOUVEAUX FICHIERS

Ce que le mock va nécessiter de créer/modifier :

    webapp
    │
    ├── localService
    │   ├── metadata.xml
    │   └── mockdata
    │        ├── SessionSet.json
    │        └── ConsultantSet.json
    │
    ├── services
    │   └── DataServices.js
    │
    ├── test
    │   └── mockServer.js
    │
    └── Component.js

## 🧩 ETAPE 1 - METADATA.XML

> [!IMPORTANT]
> Le metadata = contrat entre UI5 et backend

Créer :

    webapp/localService/metadata.xml

Contenu :

```xml
<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="1.0"
	xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">
	<edmx:DataServices m:DataServiceVersion="2.0"
		xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"
		xmlns="http://schemas.microsoft.com/ado/2008/09/edm">
		<Schema Namespace="ZFGI_FIORI_DEMO_SRV">
			<EntityType Name="Session">
				<Key>
					<PropertyRef Name="IdSession"/>
				</Key>
				<Property Name="IdSession" Type="Edm.String" Nullable="false"/>
				<Property Name="Annee" Type="Edm.String"/>
				<Property Name="Duree" Type="Edm.Decimal"/>
				<Property Name="Site" Type="Edm.String"/>
				<NavigationProperty Name="Consultants" Relationship="Session_Consultants" FromRole="Session" ToRole="Consultant"/>
			</EntityType>
			<EntityType Name="Consultant">
				<Key>
					<PropertyRef Name="IdSession"/>
					<PropertyRef Name="IdConsultant"/>
				</Key>
				<Property Name="IdSession" Type="Edm.String" Nullable="false"/>
				<Property Name="IdConsultant" Type="Edm.String" Nullable="false"/>
				<Property Name="Entreprise" Type="Edm.String"/>
				<Property Name="Name" Type="Edm.String"/>
				<Property Name="DateBirth" Type="Edm.DateTime"/>
				<Property Name="City" Type="Edm.String"/>
				<Property Name="Region" Type="Edm.String"/>
				<Property Name="Country" Type="Edm.String"/>
				<Property Name="Lang" Type="Edm.String"/>
			</EntityType>
			<Association Name="Session_Consultants">
				<End Type="Session" Multiplicity="1" Role="Session"/>
				<End Type="Consultant" Multiplicity="*" Role="Consultant"/>
				<ReferentialConstraint>
					<Principal Role="Session">
						<PropertyRef Name="IdSession"/>
					</Principal>
					<Dependent Role="Consultant">
						<PropertyRef Name="IdSession"/>
					</Dependent>
				</ReferentialConstraint>
			</Association>
			<EntityContainer Name="ZFGI_FIORI_DEMO_SRV">
				<EntitySet Name="SessionSet" EntityType="Session"/>
				<EntitySet Name="ConsultantSet" EntityType="Consultant"/>
			</EntityContainer>
		</Schema>
	</edmx:DataServices>
</edmx:Edmx>
```

Points importants :

- définit les entités
- définit les clés
- définit les relations
- ne contient aucune donnée

## 🧩 ETAPE 2 - DONNEES SIMULEES (MOCKDATA)

> [!IMPORTANT]
> Simuler les données issues des tables SAP

### 🍧 SessionSet.json

Créer :

    webapp/localService/mockdata/SessionSet.json

Contenu :

```json
[
  { "IdSession": "S001", "Annee": "2022", "Duree": "75", "Site": "Toulouse" },
  { "IdSession": "S002", "Annee": "2023", "Duree": "60", "Site": "Paris" },
  { "IdSession": "S003", "Annee": "2024", "Duree": "45", "Site": "Bordeaux" },
  { "IdSession": "S004", "Annee": "2025", "Duree": "30", "Site": "Lyon" },
  { "IdSession": "S005", "Annee": "2026", "Duree": "15", "Site": "Geneve" }
]
```

### 🍧 ConsultantSet.json

Créer :

    webapp/localService/mockdata/ConsultantSet.json

Contenu :

```json
[
  {
    "IdSession": "S001",
    "IdConsultant": "C001",
    "Entreprise": "SAP",
    "Name": "Martin",
    "DateBirth": "\/Date(631152000000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S001",
    "IdConsultant": "C002",
    "Entreprise": "IBM",
    "Name": "Julie",
    "DateBirth": "\/Date(662688000000)\/",
    "City": "Lyon",
    "Region": "ARA",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S001",
    "IdConsultant": "C003",
    "Entreprise": "Capgemini",
    "Name": "Ahmed",
    "DateBirth": "\/Date(694224000000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S001",
    "IdConsultant": "C004",
    "Entreprise": "Accenture",
    "Name": "Sophie",
    "DateBirth": "\/Date(725846400000)\/",
    "City": "Marseille",
    "Region": "PAC",
    "Country": "FR",
    "Lang": "EN"
  },
  {
    "IdSession": "S001",
    "IdConsultant": "C005",
    "Entreprise": "Deloitte",
    "Name": "Thomas",
    "DateBirth": "\/Date(757382400000)\/",
    "City": "Bordeaux",
    "Region": "NAQ",
    "Country": "FR",
    "Lang": "FR"
  },

  {
    "IdSession": "S002",
    "IdConsultant": "C006",
    "Entreprise": "Atos",
    "Name": "Laura",
    "DateBirth": "\/Date(788918400000)\/",
    "City": "Toulouse",
    "Region": "OCC",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S002",
    "IdConsultant": "C007",
    "Entreprise": "Microsoft",
    "Name": "David",
    "DateBirth": "\/Date(820454400000)\/",
    "City": "Lyon",
    "Region": "ARA",
    "Country": "FR",
    "Lang": "EN"
  },
  {
    "IdSession": "S002",
    "IdConsultant": "C008",
    "Entreprise": "Google",
    "Name": "Emma",
    "DateBirth": "\/Date(851990400000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "EN"
  },
  {
    "IdSession": "S002",
    "IdConsultant": "C009",
    "Entreprise": "AWS",
    "Name": "Nicolas",
    "DateBirth": "\/Date(883526400000)\/",
    "City": "Geneve",
    "Region": "CH",
    "Country": "CH",
    "Lang": "EN"
  },
  {
    "IdSession": "S002",
    "IdConsultant": "C010",
    "Entreprise": "Oracle",
    "Name": "Camille",
    "DateBirth": "\/Date(915062400000)\/",
    "City": "Lyon",
    "Region": "ARA",
    "Country": "FR",
    "Lang": "FR"
  },

  {
    "IdSession": "S003",
    "IdConsultant": "C011",
    "Entreprise": "SAP",
    "Name": "Hugo",
    "DateBirth": "\/Date(946598400000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S003",
    "IdConsultant": "C012",
    "Entreprise": "IBM",
    "Name": "Lea",
    "DateBirth": "\/Date(978134400000)\/",
    "City": "Bordeaux",
    "Region": "NAQ",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S003",
    "IdConsultant": "C013",
    "Entreprise": "Capgemini",
    "Name": "Youssef",
    "DateBirth": "\/Date(1009660800000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S003",
    "IdConsultant": "C014",
    "Entreprise": "Accenture",
    "Name": "Ines",
    "DateBirth": "\/Date(1041196800000)\/",
    "City": "Lyon",
    "Region": "ARA",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S003",
    "IdConsultant": "C015",
    "Entreprise": "Deloitte",
    "Name": "Pierre",
    "DateBirth": "\/Date(1072732800000)\/",
    "City": "Toulouse",
    "Region": "OCC",
    "Country": "FR",
    "Lang": "EN"
  },

  {
    "IdSession": "S004",
    "IdConsultant": "C016",
    "Entreprise": "Atos",
    "Name": "Sarah",
    "DateBirth": "\/Date(1104268800000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S004",
    "IdConsultant": "C017",
    "Entreprise": "Microsoft",
    "Name": "Kevin",
    "DateBirth": "\/Date(1135804800000)\/",
    "City": "Lyon",
    "Region": "ARA",
    "Country": "FR",
    "Lang": "EN"
  },
  {
    "IdSession": "S004",
    "IdConsultant": "C018",
    "Entreprise": "Google",
    "Name": "Nadia",
    "DateBirth": "\/Date(1167340800000)\/",
    "City": "Marseille",
    "Region": "PAC",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S004",
    "IdConsultant": "C019",
    "Entreprise": "AWS",
    "Name": "Paul",
    "DateBirth": "\/Date(1198876800000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "EN"
  },
  {
    "IdSession": "S004",
    "IdConsultant": "C020",
    "Entreprise": "Oracle",
    "Name": "Elodie",
    "DateBirth": "\/Date(1230412800000)\/",
    "City": "Lyon",
    "Region": "ARA",
    "Country": "FR",
    "Lang": "FR"
  },

  {
    "IdSession": "S005",
    "IdConsultant": "C021",
    "Entreprise": "SAP",
    "Name": "Lucas",
    "DateBirth": "\/Date(1261948800000)\/",
    "City": "Geneve",
    "Region": "CH",
    "Country": "CH",
    "Lang": "EN"
  },
  {
    "IdSession": "S005",
    "IdConsultant": "C022",
    "Entreprise": "IBM",
    "Name": "Chloe",
    "DateBirth": "\/Date(1293484800000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S005",
    "IdConsultant": "C023",
    "Entreprise": "Capgemini",
    "Name": "Mehdi",
    "DateBirth": "\/Date(1325020800000)\/",
    "City": "Lyon",
    "Region": "ARA",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S005",
    "IdConsultant": "C024",
    "Entreprise": "Accenture",
    "Name": "Emma",
    "DateBirth": "\/Date(1356556800000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "EN"
  },
  {
    "IdSession": "S005",
    "IdConsultant": "C025",
    "Entreprise": "Deloitte",
    "Name": "Antoine",
    "DateBirth": "\/Date(1388092800000)\/",
    "City": "Bordeaux",
    "Region": "NAQ",
    "Country": "FR",
    "Lang": "FR"
  },

  {
    "IdSession": "S001",
    "IdConsultant": "C026",
    "Entreprise": "Atos",
    "Name": "Julia",
    "DateBirth": "\/Date(1419628800000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "EN"
  },
  {
    "IdSession": "S002",
    "IdConsultant": "C027",
    "Entreprise": "Microsoft",
    "Name": "Mohamed",
    "DateBirth": "\/Date(1451164800000)\/",
    "City": "Lyon",
    "Region": "ARA",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S003",
    "IdConsultant": "C028",
    "Entreprise": "Google",
    "Name": "Lucie",
    "DateBirth": "\/Date(1482700800000)\/",
    "City": "Paris",
    "Region": "IDF",
    "Country": "FR",
    "Lang": "EN"
  },
  {
    "IdSession": "S004",
    "IdConsultant": "C029",
    "Entreprise": "AWS",
    "Name": "Romain",
    "DateBirth": "\/Date(1514236800000)\/",
    "City": "Marseille",
    "Region": "PAC",
    "Country": "FR",
    "Lang": "FR"
  },
  {
    "IdSession": "S005",
    "IdConsultant": "C030",
    "Entreprise": "Oracle",
    "Name": "Fatima",
    "DateBirth": "\/Date(1545772800000)\/",
    "City": "Geneve",
    "Region": "CH",
    "Country": "CH",
    "Lang": "EN"
  }
]
```

## 🧩 ETAPE 3 - MOCKSERVER (COEUR DU SYSTEME)

> [!IMPORTANT]
>
> - intercepte toutes les requêtes /sap/opu/odata/...
> - remplace backend SAP
> - utilise metadata + JSON

Créer :

    webapp/test/mockServer.js

Code :

```js
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
        rootUri: "/sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/",
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
          "fr/stms/fgifirstappmodulename/localService/metadata.xml",
        ),
        {
          /**
           * Base des fichiers JSON mockés
           */
          sMockdataBaseUrl: sap.ui.require.toUrl(
            "fr/stms/fgifirstappmodulename/localService/mockdata",
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
```

> [!CAUTION]
> Remplacer `fgifirstappmodulename` par le namespace de votre application !

## 🧩 ETAPE 4 - DATASERVICES.JS

Créer :

    webapp/libs/DataServices.js

Code :

```js
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
      "fr.stms.fgifirstappmodulename.libs.DataService",

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
```

> [!CAUTION]
> Remplacer `fgifirstappmodulename` par le namespace de votre application !

## 🧩 ETAPE 5 - ACTIVATION MOCKSERVER & RECUPERATION DES DATASERVICES

    webapp/Component.js

Modifications :

```js
/******************************************************************************
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Déclare un module SAPUI5.
 *
 * Les dépendances sont chargées puis injectées automatiquement dans la
 * fonction callback.
 ******************************************************************************/
sap.ui.define(
  [
    /**************************************************************************
     * UIComponent
     * ------------------------------------------------------------------------
     * Classe principale d’une application SAPUI5.
     *
     * Gère :
     * - le cycle de vie de l’application
     * - les modèles
     * - le routing
     * - le manifest.json
     **************************************************************************/
    "sap/ui/core/UIComponent",

    /**************************************************************************
     * Log
     * ------------------------------------------------------------------------
     * API SAPUI5 permettant d’écrire des logs.
     *
     * Exemples :
     * - Log.info(...)
     * - Log.error(...)
     * - Log.warning(...)
     **************************************************************************/
    "sap/base/Log",

    /**************************************************************************
     * ResourceModel
     * ------------------------------------------------------------------------
     * Modèle SAPUI5 utilisé pour l’internationalisation (i18n).
     *
     * Charge les fichiers :
     * - i18n.properties
     * - i18n_fr.properties
     * - etc.
     **************************************************************************/
    "sap/ui/model/resource/ResourceModel",

    /**************************************************************************
     * models
     * ------------------------------------------------------------------------
     * Module personnalisé contenant souvent :
     * - createDeviceModel()
     * - autres modèles applicatifs
     **************************************************************************/
    "fr/stms/fgifirstappmodulename/model/models",

    /**************************************************************************
     * mockServer
     * ------------------------------------------------------------------------
     * Serveur simulé SAPUI5.
     *
     * Permet de simuler un backend OData localement.
     **************************************************************************/
    "fr/stms/fgifirstappmodulename/test/mockServer",

    /**************************************************************************
     * DataServices
     * ------------------------------------------------------------------------
     * Service personnalisé contenant généralement :
     * - appels OData
     * - logique métier
     * - traitements de données
     **************************************************************************/
    "fr/stms/fgifirstappmodulename/libs/DataServices",
  ],

  /****************************************************************************
   * Fonction callback exécutée après chargement des dépendances.
   *
   * Les paramètres sont injectés dans le même ordre que les dépendances.
   ****************************************************************************/
  function (UIComponent, Log, ResourceModel, models, mockServer, DataServices) {
    "use strict";

    /**************************************************************************
     * Création du composant principal de l’application.
     *
     * UIComponent.extend(...)
     * crée une nouvelle classe héritant de UIComponent.
     **************************************************************************/
    return UIComponent.extend(
      "fr.stms.fgifirstappmodulename.Component",

      {
        /**********************************************************************
         * metadata
         * --------------------------------------------------------------------
         * Configuration du composant.
         **********************************************************************/
        metadata: {
          /********************************************************************
           * Indique que la configuration principale est dans manifest.json
           ********************************************************************/
          manifest: "json",

          /********************************************************************
           * Interface SAPUI5 utilisée pour le chargement asynchrone des vues.
           ********************************************************************/
          interfaces: ["sap.ui.core.IAsyncContentCreation"],
        },

        /**********************************************************************
         * init()
         * --------------------------------------------------------------------
         * Méthode du cycle de vie SAPUI5.
         *
         * Appelée automatiquement au démarrage de l’application.
         **********************************************************************/
        init: function () {
          /********************************************************************
           * Appel du init() parent.
           *
           * Très important :
           * permet d’exécuter l’initialisation standard SAPUI5.
           *
           * apply(this, arguments)
           * -> exécute la méthode parent
           * -> conserve le contexte courant
           * -> transmet tous les arguments reçus
           ********************************************************************/
          UIComponent.prototype.init.apply(this, arguments);

          /********************************************************************
           * Lecture du paramètre d’URL "mock"
           *
           * Exemple :
           * index.html?mock=true
           *
           * URLSearchParams :
           * API JavaScript permettant de lire les paramètres d’URL.
           ********************************************************************/
          var bMock =
            new URLSearchParams(window.location.search).get("mock") === "true";

          /********************************************************************
           * Si mock=true :
           * - activation du MockServer
           * - simulation du backend OData
           ********************************************************************/
          if (bMock) {
            mockServer.init();

            Log.info("MockServer activated");
          }

          /********************************************************************
           * Création du modèle device.
           *
           * Sert généralement à détecter :
           * - mobile
           * - tablette
           * - desktop
           *
           * Le modèle est enregistré sous le nom "device".
           ********************************************************************/
          this.setModel(models.createDeviceModel(), "device");

          /********************************************************************
           * Création du modèle i18n.
           *
           * Charge les traductions depuis :
           * fr/stms/fgifirstappmodulename/i18n/i18n.properties
           ********************************************************************/
          var i18nModel = new ResourceModel({
            bundleName: "fr.stms.fgifirstappmodulename.i18n.i18n",
          });

          /********************************************************************
           * Enregistrement du modèle i18n.
           *
           * Accessible dans les vues via :
           * i18n>MY_TEXT
           ********************************************************************/
          this.setModel(i18nModel, "i18n");

          /********************************************************************
           * this.getModel()
           * ------------------------------------------------------------------
           * Récupère le modèle OData principal défini dans le manifest.json
           ********************************************************************/
          this.getModel()

            /******************************************************************
             * metadataLoaded()
             * ---------------------------------------------------------------
             * Promise exécutée lorsque les métadonnées OData sont chargées.
             *
             * Important :
             * les services OData ne doivent parfois être utilisés
             * qu’après chargement des métadonnées.
             ******************************************************************/
            .metadataLoaded()

            /******************************************************************
             * then(...)
             * ---------------------------------------------------------------
             * Exécuté lorsque la Promise est résolue.
             *
             * Syntaxe ES6 :
             * Arrow Function
             ******************************************************************/
            .then(() => {
              /***************************************************************
               * Création de l’instance DataServices.
               *
               * this.oDataServices :
               * propriété personnalisée du composant.
               ***************************************************************/
              this.oDataServices = new DataServices(this.getModel());

              Log.info("DataServices READY");

              console.log("DataServices READY");
            });

          /********************************************************************
           * Initialisation du Router SAPUI5.
           *
           * Permet :
           * - navigation entre vues
           * - gestion des routes
           * - gestion des URLs
           ********************************************************************/
          this.getRouter().initialize();
        },

        /**********************************************************************
         * getDataServices()
         * --------------------------------------------------------------------
         * Méthode publique permettant de récupérer DataServices.
         **********************************************************************/
        getDataServices: function () {
          /********************************************************************
           * Vérifie si l’instance existe déjà.
           *
           * !this.oDataServices
           * -> signifie :
           * "si oDataServices n’existe pas"
           ********************************************************************/
          if (!this.oDataServices) {
            /******************************************************************
             * Création de l’instance si elle n’existe pas.
             ******************************************************************/
            this.oDataServices = new DataServices(this.getModel());
          }

          /********************************************************************
           * Retourne l’instance DataServices.
           ********************************************************************/
          return this.oDataServices;
        },
      },
    );
  },
);
```

> [!CAUTION]
> Remplacer `fgifirstappmodulename` par le namespace de votre application !

## 🧩 ETAPE 6 - MANIFEST.JSON

Vérifier le `datasource` dans le manifest.json :

    webapp/manifest.json

Il doit avoir :

```json
    "dataSources": {
      "mainService": {
        "uri": "/sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/",
        "type": "OData",
        "settings": {
          "annotations": [],
          "localUri": "localService/metadata.xml",
          "odataVersion": "2.0"
        }
      }
    }
```

> [!IMPORTANT]
>
> - intercepte toutes les requêtes /sap/opu/odata/...
> - remplace backend SAP
> - utilise metadata + JSON

## 🧩 ETAPE 7 - PACKAGE.JSON

Remplacer :

    "start-mock": "fiori run --config ./ui5-mock.yaml --open \"test/flp.html#app-preview\"",

par :

    "start-mock": "fiori run --config ./ui5-mock.yaml --open \"test/flp.html?mock=true#app-preview\"",

## 🧩 ETAPE 8 - TESTER

Lancer :

    npm start-mock

Vérifier les logs dans la console. Vous devriez voir :

    Mock server started
    DataServices READY

## ERREURS

fe-mockserver manquant (package)

    npm install --save-dev @sap-ux/ui5-middleware-fe-mockserver
