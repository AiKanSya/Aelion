# 🌸 HOME.VIEW

## 🧩 DETAIL.VIEW.XML (VUE DE DÉTAIL)

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
│   │   ├── App.view.xml
│   │   ├── Home.view.xml
│   │   ├── Detail.view.xml # <- Vue Detail
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
>   Afficher les informations détaillées d’un élément sélectionné.
>
> - 🔨 Utilité : Montrer les données complètes liées à un objet métier.
> - ⌚ Quand utilisé ? Après une navigation depuis la vue Home
>   vers un élément précis.

📌 Exemple :

```xml
<mvc:View
    controllerName="fr.stms.fgifirstappmodulename.controller.Details"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
>
    <Page
        id="details"
    >

    </Page>
</mvc:View>

```
