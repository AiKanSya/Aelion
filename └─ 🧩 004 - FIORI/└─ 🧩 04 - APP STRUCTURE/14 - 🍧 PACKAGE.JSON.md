# 🌸 PACKAGE.JSON

> 🌺 Objectifs
>
> - [ ] Gérer les dépendances et outils du projet SAP Fiori.
> - [ ] Définir les scripts pour build, preview et tests.
> - [ ] Centraliser les informations de version et de configuration Node.js/NPM.

## 🧩 DEFINITION

`package.json` est le fichier de configuration Node.js qui contient toutes les informations nécessaires pour gérer le projet côté développement.  
Il inclut :

- Les dépendances (packages nécessaires pour UI5, Fiori tooling, etc.).
- Les scripts (commands pour lancer la preview, build, tests, déploiement).
- Les métadonnées (nom, version, description, auteur).

> [!TIP]  
> Pense à `package.json` comme au tableau de bord du projet côté développement : il sait comment démarrer l’application, quels outils utiliser et quelles versions.

## 🧩 UTILITE

- Installer et gérer les packages nécessaires avec NPM.
- Lancer les préviews locales (`start`, `start-local`, `start-mock`, etc.).
- Construire et déployer l’application via les scripts prédéfinis.

> [!TIP]  
> Les développeurs utilisent `npm install` pour installer toutes les dépendances définies ici.

## 🧩 POINTS IMPORTANTS

- Contient les scripts pour toutes les actions fréquentes : `start`, `start-local`, `build`, `deploy`, `unit-test`, etc.
- Définit les versions des packages pour assurer la compatibilité.
- Nécessaire pour tout projet Fiori développé dans BAS ou localement avec Node.js.

## 🧩 EXEMPLE

```json
{
  "name": "appdemofgi",
  "version": "0.0.1",
  "description": "FGI Fiori App Demo",
  "keywords": ["ui5", "openui5", "sapui5"],
  "main": "webapp/index.html",
  "dependencies": {},
  "devDependencies": {
    "@ui5/cli": "^4.0.33",
    "@sap/ux-ui5-tooling": "1",
    "@sap-ux/ui5-middleware-fe-mockserver": "2"
  },
  "scripts": {
    "start": "fiori run --open \"test/flp.html#app-preview\"",
    "start-local": "fiori run --config ./ui5-local.yaml --open \"test/flp.html#app-preview\"",
    "start-noflp": "fiori run --open \"/index.html?sap-ui-xx-viewCache=false\"",
    "start-mock": "fiori run --config ./ui5-mock.yaml --open \"test/flp.html#app-preview\"",
    "start-variants-management": "fiori run --open \"/preview.html#app-preview\"",
    "build": "ui5 build --config=ui5.yaml --clean-dest --dest dist",
    "deploy": "fiori verify",
    "unit-test": "fiori run --config ./ui5-mock.yaml --open \"test/unit/unitTests.qunit.html\""
  },
  "sapuxLayer": "CUSTOMER_BASE"
}
```
