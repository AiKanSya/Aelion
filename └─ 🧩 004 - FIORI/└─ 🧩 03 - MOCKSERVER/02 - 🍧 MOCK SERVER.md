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
sap.ui.define(
  ["sap/ui/base/EventProvider", "sap/ui/model/json/JSONModel"],
  function (EventProvider, JSONModel) {
    "use strict";

    /**
     * DataService (couche service côté frontend)
     *
     * Rôle :
     * - centraliser l'accès aux données du modèle OData
     * - stocker des données temporaires côté UI (JSONModel)
     * - préparer une couche d'abstraction entre UI et backend
     *
     * ⚠ Ne remplace pas le modèle OData UI5
     * ⚠ Sert uniquement de wrapper métier frontend
     *
     * @class fr.stms.fgifirstappmodulename.libs.DataService
     * @extends sap.ui.base.EventProvider
     */
    return EventProvider.extend(
      "fr.stms.fgifirstappmodulename.libs.DataService",
      {
        /**
         * Constructeur du DataService
         *
         * @param {sap.ui.model.odata.v2.ODataModel|sap.ui.model.json.JSONModel} oModel
         *        Modèle principal UI5 (OData ou JSON)
         *
         * Fonctionnement :
         * - stocke le modèle principal (_oModel)
         * - initialise un modèle JSON local (_oModelUser)
         */
        constructor: function (oModel) {
          // Appel constructeur parent EventProvider
          EventProvider.prototype.constructor.apply(this, arguments);

          /**
           * Modèle JSON local
           * utilisé pour :
           * - états UI
           * - buffers temporaires
           * - données non persistées backend
           */
          this._oModelUser = new JSONModel();

          /**
           * Référence au modèle principal UI5
           * (ODataModel injecté par Component)
           */
          this._oModel = oModel;
        },
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
sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/base/Log",
    "sap/ui/model/resource/ResourceModel",
    "fr/stms/fgifirstappmodulename/model/models",
    "fr/stms/fgifirstappmodulename/test/mockServer",
    "fr/stms/fgifirstappmodulename/libs/DataServices",
  ],
  function (UIComponent, Log, ResourceModel, models, mockServer, DataServices) {
    "use strict";

    /**
     * Component principal de l'application Fiori/UI5
     * - Initialise le modèle OData (via manifest)
     * - Active le MockServer si nécessaire
     * - Initialise les services métier (DataServices)
     * - Configure i18n et device model
     *
     * @class fr.stms.fgifirstappmodulename.Component
     * @extends sap.ui.core.UIComponent
     */
    return UIComponent.extend("fr.stms.fgifirstappmodulename.Component", {
      metadata: {
        manifest: "json",

        /**
         * Permet l'instanciation asynchrone des vues
         * recommandé pour performance UI5
         */
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      /**
       * Point d'entrée du composant UI5
       * Initialise modèles, mock server et services applicatifs
       */
      init: function () {
        // Appel du cycle de vie UI5 standard
        UIComponent.prototype.init.apply(this, arguments);

        /**
         * Détection du mode mock via URL
         * ex : ?mock=true
         */
        var bMock =
          new URLSearchParams(window.location.search).get("mock") === "true";

        /**
         * Initialisation MockServer (mode offline formation)
         */
        if (bMock) {
          mockServer.init();
          Log.info("MockServer activated");
        }

        /**
         * Modèle device (responsive UI)
         */
        this.setModel(models.createDeviceModel(), "device");

        /**
         * Modèle i18n (traductions)
         */
        var i18nModel = new ResourceModel({
          bundleName: "fr.stms.fgifirstappmodulename.i18n.i18n",
        });
        this.setModel(i18nModel, "i18n");

        /**
         * Initialisation des services métiers
         *
         * Important :
         * On attend que les métadonnées OData soient chargées
         * pour garantir que le modèle est exploitable.
         */
        this.getModel()
          .metadataLoaded()
          .then(() => {
            this.oDataServices = new DataServices(this.getModel());

            Log.info("DataServices READY");
            console.log("DataServices READY");
          });

        /**
         * Initialisation du router UI5
         */
        this.getRouter().initialize();
      },

      /**
       * Singleton accessor du service DataServices
       * Garantit une seule instance dans l'application
       *
       * @returns {object} instance DataServices
       */
      getDataServices: function () {
        // Lazy initialization (création à la demande)
        if (!this.oDataServices) {
          this.oDataServices = new DataServices(this.getModel());
        }

        return this.oDataServices;
      },
    });
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
