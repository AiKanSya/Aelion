# 🌸 UI5-MOCK

## 🧩 UI5-MOCK.YAML (CONFIGURATION POUR START-MOCK)

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

📌 Exemple :

```yaml
# yaml-language-server: $schema=https://sap.github.io/ui5-tooling/schema/ui5.yaml.json

specVersion: "4.0"
metadata:
  name: fr.stms.fgifirstappmodulename
type: application
server:
  customMiddleware:
    - name: fiori-tools-proxy
      afterMiddleware: compression
      configuration:
        ignoreCertErrors: false # If set to true, certificate errors will be ignored. E.g. self-signed certificates will be accepted
        ui5:
          path:
            - /resources
            - /test-resources
          url: https://ui5.sap.com
        backend:
          - path: /sap
            url: https://my-sap-system.example.com
            client: "200"
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
