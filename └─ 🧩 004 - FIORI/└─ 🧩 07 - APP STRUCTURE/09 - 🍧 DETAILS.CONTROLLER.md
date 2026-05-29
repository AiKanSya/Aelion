# 🌸 DETAILS.CONTROLLER

## 🧩 DETAILS.CONTROLLER.JS

Path :

    webapp/controller.Details.controller.js

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   │   └── (annotation.xml)
│   │
│   ├── controller/
│   │   ├── App.controller.js
│   │   ├── BaseController.js
│   │   ├── Home.controller.js
│   │   ├── Details.controller.js # <- Contrôleur de la vue Detail
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
>   Gérer la logique métier de la vue Details.
>
> - 🔨 Utilité : Charger les données spécifiques à un élément sélectionné et gérer les actions associées.
> - ⌚ Quand utilisé ? Lorsqu’un utilisateur navigue vers une vue de détail.

📌 Exemple de base (par défaut) :

```js
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Déclaration d’un module SAPUI5.
 *
 * Ici : contrôleur de la vue "Details".
 */
sap.ui.define(
  [
    /**********************************************************************
     * Controller SAPUI5
     * --------------------------------------------------------------------
     * Classe de base des contrôleurs SAPUI5.
     *
     * Fournit :
     * - cycle de vie (onInit, onExit, etc.)
     * - accès à la vue (this.getView())
     * - gestion des événements UI
     **********************************************************************/
    "sap/ui/core/mvc/Controller",
  ],

  /**
   * Callback exécuté après chargement des dépendances.
   */
  (Controller) => {
    "use strict";

    /**********************************************************************
     * Contrôleur Details
     * --------------------------------------------------------------------
     * Contrôleur lié à la vue Details.view.xml.
     *
     * Gère :
     * - affichage des détails d’un objet
     * - interactions utilisateur sur l’écran détail
     **********************************************************************/
    return Controller.extend(
      "fr.stms.fgifirstappmodulename.controller.Details",
      {
        /******************************************************************
         * onInit
         * ----------------------------------------------------------------
         * Hook du cycle de vie SAPUI5.
         *
         * Appelé automatiquement lors de la création du contrôleur.
         *
         * Utilisation typique :
         * - récupération d’ID depuis router
         * - chargement des données de détail
         * - initialisation de la vue
         ******************************************************************/
        onInit() {},
      },
    );
  },
);
```

📌 Exemple avec héritage du BaseController :

```js
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Déclaration d’un module SAPUI5.
 *
 * Ici : contrôleur Details basé sur un BaseController personnalisé.
 */
sap.ui.define(
  [
    /**********************************************************************
     * BaseController
     * --------------------------------------------------------------------
     * Contrôleur parent de l’application.
     *
     * Fournit des méthodes utilitaires :
     * - getModel()
     * - setModel()
     * - getRouter()
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/controller/BaseController",
  ],

  /**
   * Callback exécuté après chargement des dépendances.
   */
  (BaseController) => {
    "use strict";

    /**********************************************************************
     * Contrôleur Details
     * --------------------------------------------------------------------
     * Hérite du BaseController.
     *
     * Utilisé pour :
     * - afficher les données de détail
     * - gérer les actions sur l’écran détail
     * - interagir avec le router et les services
     **********************************************************************/
    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Details",
      {
        /******************************************************************
         * onInit
         * ----------------------------------------------------------------
         * Hook SAPUI5 appelé à l’instanciation du contrôleur.
         *
         * Utilisation typique :
         * - lecture des paramètres de route
         * - chargement des données de l’objet sélectionné
         ******************************************************************/
        onInit: function () {},
      },
    );
  },
);
```
