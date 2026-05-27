# 🌸 DATASERVICES

## 🧩 DATASERVICES.JS (SERVICES DE DONNÉES)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   │
│   ├── libs/
│   │   ├── DataServices.js # <- Services de données génériques
│   │   └── Formatter.js
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
>   Centraliser les appels aux services backend.
>
> - 🔨 Utilité : Encapsuler la logique d’accès aux données (OData, REST, gestion des erreurs).
> - ⌚ Quand utilisé ? Lorsqu’un contrôleur doit lire ou écrire des données sans gérer directement la complexité technique.

📌 Exemple :

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
