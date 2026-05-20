# 🌸 WEBAPP/MANIFEST.JSON

> 🌺 Objectifs
>
> - [ ] Définir les métadonnées et la configuration globale de l’application Fiori.
> - [ ] Centraliser les informations sur les modèles, services, routes et paramètres.
> - [ ] Fournir un point unique de configuration pour BAS et UI5.

## 🧩 DEFINITION

`manifest.json` est le fichier de configuration central de l’application Fiori.  
Il contient :

- Les données de base (nom, version, description).
- Les modèles (OData, JSON, i18n).
- Les routes pour la navigation entre les vues.
- Les paramètres spécifiques à l’application.

> [!TIP]  
> Pense au `manifest.json` comme au plan directeur de ton application : il décrit tout ce dont elle a besoin pour fonctionner.

## 🧩 UTILITE

- Déclarer tous les services et modèles utilisés par l’application.
- Définir la structure de navigation (routes, targets, patterns).
- Fournir les informations nécessaires pour le build et le déploiement.

> [!TIP]  
> Presque toutes les commandes UI5 (build, preview, deploy) lisent ce fichier pour savoir comment charger l’application.

## 🧩 POINTS IMPORTANTS

- Les modèles déclarés ici sont accessibles dans toutes les vues via les bindings `{modelName>property}`.
- Les routes définies ici permettent au router de gérer la navigation.
- Les paramètres i18n, namespaces et autres configurations globales sont centralisés.

## 🧩 EXEMPLE

```json
{
  "sap.app": {
    "id": "appdemofgi",
    "type": "application",
    "i18n": "i18n/i18n.properties",
    "title": "{{appTitle}}",
    "description": "{{appDescription}}"
  },
  "sap.ui5": {
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "appdemofgi.i18n.i18n"
        }
      },
      "": {
        "type": "sap.ui.model.odata.v2.ODataModel",
        "settings": {
          "serviceUrl": "/sap/opu/odata/sap/ZFGI_GATEWAY_DEMO_SRV/"
        }
      }
    },
    "routing": {
      "config": {
        "routerClass": "sap.m.routing.Router",
        "viewType": "XML",
        "viewPath": "appdemofgi.view",
        "controlId": "app",
        "controlAggregation": "pages"
      },
      "routes": [
        {
          "pattern": "",
          "name": "Home",
          "target": "Home"
        },
        {
          "pattern": "Detail/{itemId}",
          "name": "Detail",
          "target": "Detail"
        }
      ],
      "targets": {
        "Home": {
          "viewName": "Home",
          "viewLevel": 1
        },
        "Detail": {
          "viewName": "Detail",
          "viewLevel": 2
        }
      }
    }
  }
}
```
