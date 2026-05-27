# 🌸 UI5-LOCAL

## 🧩 UI5-LOCAL.YAML (CONFIGURATION POUR START-LOCAL)

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
│
├── ui5-local.yaml                   		# Config UI5 pour start-local
│
├── ui5-mock.yaml
└── ui5.yaml
```

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Configurer l’environnement pour se connecter à un backend réel.
>
> - 🔨 Utilité : Permettre à l’application de récupérer des données depuis un système SAP local ou distant.
> - ⌚ Quand utilisé ? Avec la commande `npm run start-local` ou `fiori run --config ui5-local.yaml`.
> - 📌 Exemple :
>
>   ```yaml
>   server:
>     customMiddleware:
>       - name: ui5-middleware-simpleproxy
>         afterMiddleware: compression
>         mountPath: /sap
>         configuration:
>           baseUri: https://my-sap-system.example.com
>   ```
