# 🌸 CONTROLLER

## 🧩 CONTROLLER/ (LOGIQUE APPLICATIVE)

```
appdemofgi/
├── webapp/
│   ├── (annotations/)
│   │
│   ├── controller/               			# Dossier contenant les Contrôleurs JavaScript
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
>   Gérer le comportement de l’application.
>
> - 🔨 Utilité : Réagir aux actions utilisateur (clics, navigation, chargement des données).
> - ⌚ Quand utilisé ? Lorsqu'une action d'un composant UI5 est triggered
> - 📌 Exemple :
>
>   ```js
>   onPress: function () {
>        this.getRouter().navTo("Detail");
>   }
>   ```
