# 🌸 UI5-LOCAL.YAML

> 🌺 Objectifs
>
> - [ ] Configurer la prévisualisation locale de l’application.
> - [ ] Permettre de tester l’application sans déployer sur le serveur SAP.
> - [ ] Définir les paramètres spécifiques pour le mockserver et le routage local.

## 🧩 DEFINITION

`ui5-local.yaml` est un fichier optionnel utilisé pour le développement local dans BAS ou en local avec Node.js.  
Il configure :

- Les sources locales (`webapp/`).
- Les middleware pour les mockserver ou les services simulés.
- Les routes et paramètres spécifiques pour la prévisualisation locale.

> [!TIP]  
> Pense à `ui5-local.yaml` comme à un plan de travail local : il permet de tester l’application comme si elle était sur le serveur SAP, mais depuis ton poste de dev.

## 🧩 UTILITE

- Lancer `start-local` pour prévisualiser l’application avec des services simulés.
- Configurer les destinations locales pour les tests.
- Gérer les options spécifiques pour le développement sans impacter les environnements de production.

> [!TIP]  
> Très utile pour tester rapidement les changements de l’application avant le déploiement.

## 🧩 POINTS IMPORTANTS

- Ne doit pas être utilisé pour le build final ou le déploiement.
- Souvent associé à un `ui5-mock.yaml` si des données mock sont nécessaires.
- Facilite le débogage local avec des configurations spécifiques à ton poste.

## 🧩 EXEMPLE

```yaml
specVersion: "2.2"
rootProject: true
type: application
name: appdemofgi
builder:
  resources:
    configuration:
      paths:
        webapp: webapp
server:
  customMiddleware:
    - name: ui5-middleware-simpleproxy
      afterMiddleware: compression
      configuration:
        baseUri: "/sap/opu/odata/sap/"
    - name: ui5-middleware-fe-mockserver
      afterMiddleware: compression
      configuration:
        metadataFilePath: "webapp/localService/mainService/metadata.xml"
        mockdataBasePath: "webapp/localService/mainService/mockdata"
        generateMissingMockData: true
```
