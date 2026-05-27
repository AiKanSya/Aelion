# 🌸 BASE.CONTROLLER

## 🧩 BASE.CONTROLLER.JS

```
appdemofgi/
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
>   Centraliser les fonctions communes utilisées par plusieurs contrôleurs.
>
> - 🔨 Utilité : Éviter la duplication de code (router, models, messages, helpers).
> - ⌚ Quand utilisé ? Lorsqu’une fonction est partagée par plusieurs contrôleurs (navigation, accès aux modèles, messages), elle aura tendance à être implémenté dans ce fichier
> - 📌 Exemple :
>
>   ```js
>   getRouter: function () {
>       return this.getOwnerComponent().getRouter();
>   }
>   ```
