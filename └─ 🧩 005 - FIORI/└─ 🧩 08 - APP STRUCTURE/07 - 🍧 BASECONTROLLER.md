# 🌸 BASE.CONTROLLER

## 🧩 BASECONTROLLER.CONTROLLER.JS

Path :

    webapp/controller/BaseController.controller.js

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   │   └── (annotation.xml)
│   │
│   ├── controller/
│   │   ├── App.controller.js
│   │   ├── BaseController.js # <- Contrôleur de base utilisé par d'autres controllers
│   │   ├── Home.controller.js
│   │   ├── Detail.controller.js
│   │   └── <view_n>.controller.js
│   │
│   ├── css/
│   ├── i18n/
│   ├── libs/
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
>   Centraliser les fonctions communes utilisées par plusieurs contrôleurs.
>
> - 🔨 Utilité : Éviter la duplication de code (router, models, messages, helpers).
> - ⌚ Quand utilisé ? Lorsqu’une fonction est partagée par plusieurs contrôleurs (navigation, accès aux modèles, messages), elle aura tendance à être implémenté dans ce fichier

📌 Exemple :

```js
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Déclaration d’un module SAPUI5.
 *
 * Ici : création d’un BaseController personnalisé.
 *
 * Objectif :
 * centraliser des méthodes réutilisables pour tous les contrôleurs
 * de l’application (héritage).
 */
sap.ui.define(
  [
    /**********************************************************************
     * Controller SAPUI5
     * --------------------------------------------------------------------
     * Classe de base standard des contrôleurs SAPUI5.
     *
     * Fournit :
     * - cycle de vie (onInit, onExit, etc.)
     * - accès à la vue (this.getView())
     * - gestion des modèles
     **********************************************************************/
    "sap/ui/core/mvc/Controller",
  ],

  /**
   * Callback exécuté après chargement du module Controller.
   */
  function (Controller) {
    "use strict";

    /**********************************************************************
     * BaseController.extend(...)
     * --------------------------------------------------------------------
     * Création d’un contrôleur "parent".
     *
     * Tous les autres contrôleurs de l’application peuvent hériter
     * de ce BaseController pour réutiliser ses méthodes.
     **********************************************************************/
    return Controller.extend(
      "fr.stms.fgifirstappmodulename.controller.BaseController",
      {
        /******************************************************************
         * getRouter()
         * ----------------------------------------------------------------
         * Récupère le router SAPUI5 de l’application.
         *
         * Utilité :
         * - navigation entre vues
         * - gestion des routes définies dans manifest.json
         *
         * Chaîne d’accès :
         * this -> contrôleur courant
         * getOwnerComponent() -> composant principal
         * getRouter() -> instance du router
         ******************************************************************/
        getRouter: function () {
          return this.getOwnerComponent().getRouter();
        },

        /******************************************************************
         * getModel(sName)
         * ----------------------------------------------------------------
         * Récupère un modèle SAPUI5 attaché à la View.
         *
         * @param {string} sName
         * Nom du modèle (optionnel)
         *
         * Exemples :
         * - this.getModel()        -> modèle par défaut
         * - this.getModel("i18n")  -> modèle i18n
         ******************************************************************/
        getModel: function (sName) {
          return this.getView().getModel(sName);
        },

        /******************************************************************
         * setModel(oModel, sName)
         * ----------------------------------------------------------------
         * Attache un modèle à la View.
         *
         * @param {Object} oModel
         * Instance du modèle SAPUI5 (JSONModel, ODataModel, etc.)
         *
         * @param {string} sName
         * Nom du modèle (optionnel)
         *
         * Exemple :
         * this.setModel(new JSONModel({}), "local");
         ******************************************************************/
        setModel: function (oModel, sName) {
          return this.getView().setModel(oModel, sName);
        },
      },
    );
  },
);
```
