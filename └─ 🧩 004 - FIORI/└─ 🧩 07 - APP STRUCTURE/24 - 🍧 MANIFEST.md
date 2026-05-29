# 🌸 MANIFEST

## 🧩 MANIFEST.JSON (MÉTADONNÉES DE L’APPLICATION)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   ├── localService/
│   ├── model/
│   ├── view/
│   │
│   ├── Component.js
│   ├── index.html
│   │
│   └── manifest.json # <- Métadonnées Fiori : routes, models, data sources, namespace
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
>   Décrire toute la configuration Fiori de l’application.
>
> - 🔨 Utilité : Définir routes, modèles, data sources, titres, icônes et namespace.
> - ⌚ Quand utilisé ? En permanence par UI5 pour initialiser et orchestrer l’application.

📌 Exemple :

```json
/**
 * MANIFEST.JSON SAPUI5 / FIORI
 * ---------------------------------------------------------------------------
 * Fichier de configuration central de l’application SAPUI5.
 *
 * Rôle :
 * - déclare l’application
 * - configure les modèles
 * - configure les services OData
 * - définit le routing
 * - définit la vue racine
 */
{
  "_version": "1.60.0",

  "sap.app": {
    /**********************************************************************
     * IDENTITÉ APPLICATION
     **********************************************************************/
    "id": "fr.stms.fgifirstappmodulename",
    "type": "application",

    /**********************************************************************
     * INTERNATIONALISATION
     **********************************************************************/
    "i18n": "i18n/i18n.properties",

    "applicationVersion": {
      "version": "0.0.1"
    },

    /**********************************************************************
     * TITRE / DESCRIPTION
     * Utilise le fichier i18n (placeholder {{ }})
     **********************************************************************/
    "title": "{{appTitle}}",
    "description": "{{appDescription}}",

    "resources": "resources.json",

    "sourceTemplate": {
      "id": "@sap/generator-fiori:basic",
      "version": "1.22.0",
      "toolsId": "1130363f-0cc6-4475-9ef1-1d09d9b75943"
    },

    /**********************************************************************
     * DATA SOURCES
     * --------------------------------------------------------------------
     * Déclaration des backend services.
     *
     * Ici : service OData V2 SAP ABAP
     **********************************************************************/
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
  },

  "sap.ui": {
    /**********************************************************************
     * TECHNOLOGIE UI
     **********************************************************************/
    "technology": "UI5",

    /**********************************************************************
     * ICONS APPLICATION (Fiori Launchpad)
     **********************************************************************/
    "icons": {
      "icon": "",
      "favIcon": "",
      "phone": "",
      "phone@2": "",
      "tablet": "",
      "tablet@2": ""
    },

    /**********************************************************************
     * TYPES DE DEVICE SUPPORTÉS
     **********************************************************************/
    "deviceTypes": {
      "desktop": true,
      "tablet": true,
      "phone": true
    }
  },

  "sap.ui5": {
    /**********************************************************************
     * COMPATIBILITÉ FRAMEWORK
     **********************************************************************/
    "flexEnabled": true,

    "dependencies": {
      "minUI5Version": "1.120.14",
      "libs": {
        "sap.m": {},
        "sap.ui.core": {}
      }
    },

    /**********************************************************************
     * DENSITÉ UI
     **********************************************************************/
    "contentDensities": {
      "compact": true,
      "cozy": true
    },

    /**********************************************************************
     * MODELES GLOBAUX
     **********************************************************************/
    "models": {
      /********************************************************************
       * i18n MODEL (traductions)
       ********************************************************************/
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "fr.stms.fgifirstappmodulename.i18n.i18n"
        }
      },

      /********************************************************************
       * ODATA MODEL PAR DÉFAUT ("")
       ********************************************************************/
      "": {
        "dataSource": "mainService",
        "preload": true,
        "settings": {
          "odataVersion": "2.0"
        }
      }
    },

    /**********************************************************************
     * RESSOURCES STATIQUES
     **********************************************************************/
    "resources": {
      "css": [
        {
          "uri": "css/style.css"
        }
      ]
    },

    /**********************************************************************
     * ROUTING SAPUI5
     **********************************************************************/
    "routing": {
      "config": {
        "routerClass": "sap.m.routing.Router",
        "controlAggregation": "pages",
        "controlId": "app",
        "transition": "slide",
        "type": "View",

        "viewType": "XML",

        /******************************************************************
         * PATH VIEWS
         * dossier où SAPUI5 cherche les XML views
         ******************************************************************/
        "path": "fr.stms.fgifirstappmodulename.view",
        "async": true,
        "viewPath": "fr.stms.fgifirstappmodulename.view"
      },

      /**********************************************************************
       * ROUTES
       **********************************************************************/
      "routes": [
        {
          "name": "RouteHome",
          "pattern": ":?query:",
          "target": ["TargetHome"]
        }
      ],

      /**********************************************************************
       * TARGETS
       **********************************************************************/
      "targets": {
        "TargetHome": {
          "id": "Home",
          "name": "Home"
        }
      }
    },

    /**********************************************************************
     * ROOT VIEW
     * --------------------------------------------------------------------
     * Vue racine chargée au démarrage de l’application
     **********************************************************************/
    "rootView": {
      "viewName": "fr.stms.fgifirstappmodulename.view.App",
      "type": "XML",
      "id": "App",
      "async": true
    }
  }
}
```
