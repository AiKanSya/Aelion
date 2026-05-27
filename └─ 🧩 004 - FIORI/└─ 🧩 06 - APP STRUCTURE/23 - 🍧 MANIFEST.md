# 🌸 MANIFEST

## 🧩 MANIFEST.JSON (MÉTADONNÉES DE L’APPLICATION)

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
│   ├── Component.js
│   ├── index.html
│   │
│   └── manifest.json              		# Métadonnées Fiori : routes, models, data sources, namespace
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
>   Décrire toute la configuration Fiori de l’application.
>
> - 🔨 Utilité : Définir routes, modèles, data sources, titres, icônes et namespace.
> - ⌚ Quand utilisé ? En permanence par UI5 pour initialiser et orchestrer l’application.
> - 📌 Exemple :
>
>   ```json
>   {
>     "sap.app": {
>       "id": "appdemofgi",
>       "title": "FGI Fiori App Demo",
>       "applicationVersion": { "version": "0.0.1" }
>     },
>     "sap.ui5": {
>       "rootView": {
>         "viewName": "appdemofgi.view.App",
>         "type": "XML",
>         "id": "app"
>       },
>       "models": {
>         "i18n": {
>           "type": "sap.ui.model.resource.ResourceModel",
>           "settings": { "bundleName": "appdemofgi.i18n.i18n" }
>         }
>       }
>     }
>   }
>   ```
