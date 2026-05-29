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
├── ui5-mock.yaml # <- Config UI5 pour start-mock
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

##############################################################################
# UI5 TOOLING CONFIGURATION
# ---------------------------------------------------------------------------
# Configuration du serveur de développement UI5 (ui5 serve)
##############################################################################

specVersion: "4.0"

metadata:
  #**************************************************************************
  # IDENTITÉ PROJET UI5
  #*************************************************************************/
  name: fr.stms.fgifirstappmodulename

type: application

server:
  #**************************************************************************
  # MIDDLEWARES (CHAÎNE SERVEUR LOCAL)
  # ------------------------------------------------------------------------
  # Définissent l’ordre d’exécution des fonctionnalités serveur :
  # - proxy backend SAP
  # - live reload
  # - preview FLP
  # - mockserver OData
  #*************************************************************************/
  customMiddleware:
    #**********************************************************************
    # FIORI TOOLS PROXY
    # --------------------------------------------------------------------
    # Rôle :
    # - proxy les appels backend (/sap)
    # - évite les problèmes CORS
    # - connecte UI5 à un système SAP distant
    #*********************************************************************/
    - name: fiori-tools-proxy
      afterMiddleware: compression

      configuration:
        #******************************************************************
        # ignoreCertErrors
        # ----------------------------------------------------------------
        # true = accepte certificats invalides (dev uniquement)
        #*****************************************************************/
        ignoreCertErrors: false

        #******************************************************************
        # UI5 RESOURCES DISTANTES
        # ----------------------------------------------------------------
        # Permet de charger UI5 depuis le serveur SAP officiel
        #
        # /resources       -> runtime UI5
        # /test-resources  -> tests unitaires UI5
        #*****************************************************************/
        ui5:
          path:
            - /resources
            - /test-resources
          url: https://ui5.sap.com

        #******************************************************************
        # BACKEND SAP ABAP
        # ----------------------------------------------------------------
        # Redirection des appels OData /sap vers système SAP
        #
        # Exemple :
        # /sap/opu/odata/... -> backend ABAP
        #*****************************************************************/
        backend:
          - path: /sap
            url: https://my-sap-system.example.com
            client: "200"

    #**********************************************************************
    # APP LIVE RELOAD
    # --------------------------------------------------------------------
    # Recharge automatique du navigateur lors des modifications code
    #*********************************************************************/
    - name: fiori-tools-appreload
      afterMiddleware: compression
      configuration:
        port: 35729
        path: webapp
        delay: 300

    #**********************************************************************
    # FIORI PREVIEW (FLP sandbox)
    # --------------------------------------------------------------------
    # Lance l’application dans un Launchpad simulé
    #*********************************************************************/
    - name: fiori-tools-preview
      afterMiddleware: fiori-tools-appreload
      configuration:
        flp:
          theme: sap_horizon

    #**********************************************************************
    # MOCKSERVER (SAP FE Mockserver)
    # --------------------------------------------------------------------
    # Simule le backend OData SAP sans système réel
    #
    # Utilisé pour :
    # - développement offline
    # - formation
    # - tests UI
    #*********************************************************************/
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
