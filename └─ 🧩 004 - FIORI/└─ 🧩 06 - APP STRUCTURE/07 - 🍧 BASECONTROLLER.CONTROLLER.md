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
│   │   ├── BaseController.controller.js # <- Contrôleur de base utilisé par d'autres controllers
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
sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend(
    "fr.stms.fgifirstappmodulename.controller.BaseController",
    {
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },

      getModel: function (sName) {
        return this.getView().getModel(sName);
      },

      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName);
      },
    },
  );
});
```
