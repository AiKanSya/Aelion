# 🌸 UI5-MOCK

## 🧩 UI5-MOCK.YAML (CONFIGURATION POUR START-MOCK)

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
│   └── manifest.json
│
├── .gitignore
├── (mta.yaml)
├── package-lock.json
├── package.json
├── README.md
├── ui5-local.yaml
│
├── ui5-mock.yaml                    		# Config UI5 pour start-mock
│
└── ui5.yaml
```

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Configurer le mockserver pour le développement sans backend.
>
> - 🔨 Utilité : Fournir des données simulées pour tester l’application.
> - ⌚ Quand utilisé ? Avec la commande `npm run start-mock` ou `fiori run --config ui5-mock.yaml`.
> - 📌 Exemple :
>
>   ```yaml
>   server:
>     customMiddleware:
>       - name: ui5-middleware-fe-mockserver
>         afterMiddleware: compression
>         configuration:
>           metadataFilePath: webapp/localService/mainService/metadata.xml
>           mockdataBasePath: webapp/localService/mainService/mockdata
>   ```
