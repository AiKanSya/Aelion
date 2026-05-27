# 🌸 INDEX

## 🧩 INDEX.HTML (PAGE PRINCIPALE)

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
│   │
│   ├── index.html                 		# Page HTML principale
│   │
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
>   Charger l’application UI5 dans le navigateur.
>
> - 🔨 Utilité : Inclure les bibliothèques SAPUI5 et déclencher le bootstrap.
> - ⌚ Quand utilisé ? À l’ouverture de l’application dans le navigateur.
> - 📌 Exemple :
>
>   ```html
>   <!DOCTYPE html>
>   <html>
>     <head>
>       <meta charset="utf-8" />
>       <title>Fiori App Demo</title>
>       <script
>         id="sap-ui-bootstrap"
>         src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"
>         data-sap-ui-theme="sap_fiori_3"
>         data-sap-ui-resourceroots='{"appdemofgi": "./"}'
>         data-sap-ui-onInit="module:appdemofgi/Component"
>       ></script>
>     </head>
>     <body class="sapUiBody"></body>
>   </html>
>   ```
