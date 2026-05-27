# 🌸 UI5-LOCAL

## 🧩 UI5-LOCAL.YAML (CONFIGURATION POUR START-LOCAL)

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
├── ui5-local.yaml # <- Config UI5 pour start-local
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

📌 Exemple :

```yaml
# yaml-language-server: $schema=https://sap.github.io/ui5-tooling/schema/ui5.yaml.json

specVersion: "4.0"
metadata:
  name: fr.stms.fgifirstappmodulename
type: application
framework:
  name: SAPUI5
  version: 1.120.14
  libraries:
    - name: sap.m
    - name: sap.ui.core
    - name: sap.ushell
    - name: themelib_sap_horizon
server:
  customMiddleware:
    - name: fiori-tools-appreload
      afterMiddleware: compression
      configuration:
        port: 35729
        path: webapp
        delay: 300
    - name: fiori-tools-preview
      afterMiddleware: fiori-tools-appreload
      configuration:
        flp:
          theme: sap_horizon
    - name: fiori-tools-proxy
      afterMiddleware: compression
      configuration:
        ignoreCertErrors: false # If set to true, certificate errors will be ignored. E.g. self-signed certificates will be accepted
        backend:
          - path: /sap
            url: https://my-sap-system.example.com
            client: "200"
    - name: sap-fe-mockserver
      beforeMiddleware: csp
      configuration:
        mountPath: /
        services:
          - urlPath: /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV
            metadataPath: ./webapp/localService/mainService/metadata.xml
            mockdataPath: ./webapp/localService/mainService/data
            generateMockData: true
        annotations: []
```
