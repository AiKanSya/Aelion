# 🌸 COMPONENT

## 🧩 COMPONENT.JS (POINT D’ENTRÉE DE L’APPLICATION)

```
appdemofgi/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   ├── localService/
│   ├── model/
│   ├── view/
│   │
│   ├── Component.js               		# Point d’entrée de l’application
│   │
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
>   Initialiser l’application et ses composants.
>
> - 🔨 Utilité : Charger les modèles, configurer le router, et préparer l’application pour l’exécution.
> - ⌚ Quand utilisé ? Dès le démarrage de l’application, avant l’affichage des vues.
> - 📌 Exemple :
>
>   ```js
>   sap.ui.define(
>     ["sap/ui/core/UIComponent", "appdemofgi/model/models"],
>     function (UIComponent, models) {
>       return UIComponent.extend("appdemofgi.Component", {
>         metadata: { manifest: "json" },
>         init: function () {
>           UIComponent.prototype.init.apply(this, arguments);
>           this.setModel(models.createViewModel(), "viewModel");
>           this.getRouter().initialize();
>         },
>       });
>     },
>   );
>   ```
