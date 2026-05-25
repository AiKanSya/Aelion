# 🌸 COMPONENT.JS

## 🧩 PROCESS

> [!IMPORTANT]
>
> 1. Modifier le Manifest.json

## 🧩 CODE `manifest.json`

> [!IMPORTANT]
> Ajouter en dessous de `"dataSources"` le `"crossNavigation"`

```json
{
    "dataSources": {
      "mainService": {
        "uri": "/sap/opu/odata/sap/ZFGI_GATEWAY_DEMO_SRV/",
        "type": "OData",
        "settings": {
          "annotations": [],
          "localUri": "localService/mainService/metadata.xml",
          "odataVersion": "2.0"
        }
      }
    },
    "crossNavigation": {
      "inbounds": {
        "TransportOrder-TakePhoto": {
          "semanticObject": "MaterialFGI",
          "action": "ReportMarchandiseFGI",
          "title": "{{Material-ReportMarchandiseFGI.flpTitle}}",
          "signature": {
            "parameters": {},
            "additionalParameters": "allowed"
          }
        }
      }
    }
  },
```

> [!TIP]
> Pourquoi ?
> Le champ `crossNavigation` dans le manifest.json est utilisé pour définir des points d’entrée ou inbounds pour la navigation entre applications dans le Fiori Launchpad (FLP).
>
> `crossNavigation` permet à une application Fiori de déclarer comment elle peut être ouverte depuis une autre application ou depuis un bouton dans le FLP.
>
> Chaque entrée (inbound) décrit :
>
> - semanticObject : l’objet métier utilisé pour identifier le type de navigation (ex : Material, SalesOrder, Customer…).
> - action : l’action à exécuter sur cet objet (ex : SortieMarchandise, Display, Edit…).
> - signature : paramètres attendus pour cette navigation (ex : ID d’un matériel, numéro de commande…).
> - title : le titre affiché dans le FLP ou dans les liens.

> [!CAUTION]
>
> - Ne pas oublier de modifier :
>   - "semanticObject"
>   - "action"
>   - "title"

> [!IMPORTANT]
> Ajouter en dessous de `"sap.ui5"` le `"sap.cloud"`
> Path : sap.app/

> [!TIP]
> Pourquoi ?
> `sap.cloud` contient des informations spécifiques au déploiement dans le Cloud (SAP BTP / Fiori Launchpad Cloud). C’est là qu’on indique à la plateforme comment référencer l’application et si elle est accessible publiquement.
>
> Qu’est-ce que `sap.cloud` ?
>
> `sap.cloud` sert à déclarer comment l’application se comporte dans le Cloud, notamment :
>
> - l’ID de l’application pour le catalogue BTP / FLP Cloud,
> - les rôles ou autorisations nécessaires,
> - la catégorie / groupe dans le Launchpad Cloud,
> - d’autres paramètres spécifiques à la plateforme Cloud.
>
> C’est un peu comme une fiche d’identité Cloud pour ton app.

> [!CAUTION]
>
> - Ne pas oublier de modifier :
>   - "service"

```json
    "rootView": {
      "viewName": "fr.stms.bc.appdemofgi.view.App",
      "type": "XML",
      "id": "App",
      "async": true
    }
  },
  "sap.cloud": {
    "public": true,
    "service": "frstmsbcappdemofgi"
  }
}
```
