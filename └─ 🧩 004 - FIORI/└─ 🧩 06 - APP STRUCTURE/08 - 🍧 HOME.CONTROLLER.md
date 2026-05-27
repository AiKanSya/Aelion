# 🌸 HOME.CONTROLLER

## 🧩 HOME.CONTROLLER.JS

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
>   Gérer la logique métier de la vue Home.
>
> - 🔨 Utilité : Réagir aux actions utilisateur sur l’écran principal/la vue principale (sélection, navigation, chargement initial).
> - ⌚ Quand utilisé ? Lors de l’affichage ou de l’interaction avec la vue Home.
> - 📌 Exemple :
>
>   ```js
>   onItemPress: function (oEvent) {
>       this.getRouter().navTo("Detail");
>   }
>   ```
