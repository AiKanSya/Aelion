# 🌸 APP.VIEW

## 🧩 APP.VIEW.XML (VUE RACINE DE L’APPLICATION)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   ├── localService/
│   ├── model/
│   │
│   ├── view/
│   │   ├── fragments/
│   │   │   └── <fragment_n>.fragment.xml
│   │   │
│   │   ├── App.view.xml # <- Vue App
│   │   ├── Home.view.xml
│   │   ├── Detail.view.xml
│   │   └── <view_n>.view.xml
│   │
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
>   Définir le conteneur principal de l’application.
>
> - 🔨 Utilité : Héberger le NavContainer ou Router qui gère la navigation entre les vues.
> - ⌚ Quand utilisé ? Chargée une seule fois au démarrage de l’application.

📌 Exemple :

```xml
<mvc:View controllerName="fr.stms.fgifirstappmodulename.controller.App"
    displayBlock="true"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">
    <App id="app">
    </App>
</mvc:View>
```
