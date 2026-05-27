# 🌸 APP.CONTROLLER

## 🧩 APP.CONTROLLER.JS (CONTROLLER PRINCIPAL)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   │   └── (annotation.xml)
│   │
│   ├── controller/
│   │   ├── App.controller.js     			# Contrôleur principal
│   │   ├── BaseController.js         		# Contrôleur de base utilisé par d'autres controllers
│   │   ├── Home.controller.js    			# Contrôleur de la vue Home
│   │   ├── Detail.controller.js  			# Contrôleur de la vue Detail
│   │   └── <view_n>.controller.js 		# Controller n
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
>   Gérer le cycle de vie global de l’application.
>
> - 🔨 Utilité : Initialiser l’application et gérer les événements globaux.
> - ⌚ Quand utilisé ? Au démarrage de l’application ou pour des comportements transverses.
>   📌 Exemple :

```js
sap.ui.define(["sap/ui/core/mvc/Controller"], (BaseController) => {
  "use strict";

  return BaseController.extend("fr.stms.fgifirstappmodulename.controller.App", {
    onInit: function () {},
  });
});
```
