# 🌸 APP PREVIEW

> 🌺 Objectifs
>
> - [ ] Comprendre le package.json
> - [ ] Comprendre les différents mode de Preview

## 🧩 APPLICATION PREVIEW

> [!IMPORTANT]
> Clic-droit sur le nom du projet, puis Preview Application

![](./assets/Capture%20d’écran%202026-05-20%20093423.png)

> [!IMPORTANT]
> Sélectionner `start-noflp`

![](./assets/Capture%20d’écran%202026-05-20%20093532.png)

> [!IMPORTANT]
> La console va s'ouvrir et si tout se passe bien, la preview s'ouvre également :

![](./assets/Capture%20d’écran%202026-05-20%20093758.png)

## 🧩 PACKAGE.JSON

> [!IMPORTANT]
> Le fichier package.json est le centre de commande de l’application Fiori.
> C’est le fichier qui décrit le projet et explique comment le lancer, le tester et le construire.

```json
{
  "name": "fgi_first_app_module_name",
  "version": "0.0.1",
  "description": "FGI First Fiori App Description",
  "keywords": ["ui5", "openui5", "sapui5"],
  "main": "webapp/index.html",
  "dependencies": {},
  "devDependencies": {
    "@ui5/cli": "^4.0.33",
    "@sap/ux-ui5-tooling": "1",
    "@sap-ux/eslint-plugin-fiori-tools": "^9.0.0",
    "eslint": "^9",
    "@sap-ux/ui5-middleware-fe-mockserver": "2"
  },
  "scripts": {
    "start": "fiori run --open \"test/flp.html#app-preview\"",
    "start-local": "fiori run --config ./ui5-local.yaml --open \"test/flp.html#app-preview\"",
    "build": "ui5 build --config=ui5.yaml --clean-dest --dest dist",
    "lint": "eslint ./",
    "deploy": "fiori verify",
    "deploy-config": "fiori add deploy-config",
    "start-noflp": "fiori run --open \"/index.html?sap-ui-xx-viewCache=false\"",
    "start-mock": "fiori run --config ./ui5-mock.yaml --open \"test/flp.html#app-preview\"",
    "int-test": "fiori run --config ./ui5-mock.yaml --open \"test/integration/opaTests.qunit.html\"",
    "start-variants-management": "fiori run --open \"/preview.html#app-preview\"",
    "unit-test": "fiori run --config ./ui5-mock.yaml --open \"test/unit/unitTests.qunit.html\""
  },
  "sapuxLayer": "CUSTOMER_BASE"
}
```

Il contient :

- l’identité du projet
- les outils nécessaires
- Scripts
- les commandes de preview et de build

### 🍧 IDENTITE DU PROJET

```json
"name": "appdemofgi",
"version": "0.0.1",
"description": "FGI Fiori App Demo"
```

> [!NOTE]
> Informations techniques (nom, version, description).
> Utilisées par npm et les outils de build.

### 🍧 DEV DEPENDENCIES

```json
"devDependencies": {
  "@ui5/cli": "^4.0.33",
  "@sap/ux-ui5-tooling": "1",
  "@sap-ux/ui5-middleware-fe-mockserver": "2"
}
```

> [!NOTE]
> Ce sont les outils nécessaires pour développer et prévisualiser l’application.
>
> - `@ui5/cli` → lance le serveur UI5 local
> - `@sap/ux-ui5-tooling` → commandes Fiori (fiori run, fiori verify, etc.)
> - `@sap-ux/ui5-middleware-fe-mockserver` → simuler les données quand le backend n’est pas disponible

### 🍧 SCRIPTS

```json
"scripts": {
  "start": "...",
  "start-local": "...",
  "start-noflp": "...",
  "start-mock": "...",
  ...
}
```

### 🍧 TYPES DE PREVIEW

> [!TIP]
> Chaque type de Preview change la façon dont l’application se connecte au backend ou au FLP, mais pas l’application elle-même.

#### 💮 Start

```json
"start": "fiori run --open \"test/flp.html#app-preview\""
```

Objectif

- Lancer l’application dans un Fiori Launchpad simulé (sandbox)
- Utiliser la configuration standard (ui5.yaml)
- Se connecter au backend réel

Usage

- Développement normal
- Vérification des fonctionnalités avec le backend disponible

> [!TIP]
> Appli Fiori dans un faux Launchpad, avec de vraies données

#### 💮 start-local

```json
"start-local": "fiori run --config ./ui5-local.yaml --open \"test/flp.html#app-preview\""
```

Objectif

- Lancer l’application avec une configuration locale spécifique
- Adapter les destinations backend pour développement hors contexte standard

Usage

- Backend non accessible directement
- Tests hors réseau client
- Développement local avec proxies ou modifications d’URLs

> [!TIP]
> Même appli que start, mais avec un plan réseau différent

#### 💮 start-noflp

```json
"start-noflp": "fiori run --open \"/index.html?sap-ui-xx-viewCache=false\""
```

Objectif

- Lancer l’application sans Fiori Launchpad
- Ouvrir directement la page principale (index.html)
- Désactiver le cache des vues pour voir les changements immédiats

Usage

- Débogage rapide
- Vérifier un écran isolé
- Développement UI sans dépendre du FLP

> [!TIP]
> On ouvre directement la page, sans passer par le Launchpad

#### 💮 start-variants-management

```json
"start-variants-management": "fiori run --open \"/preview.html#app-preview\""
```

Objectif

- Tester l’application avec les variantes et la personnalisation activée
- Lancer une prévisualisation spéciale pour les fonctionnalités de variant management

Usage

- Vérification de l’adaptation de vues pour différents utilisateurs
- Tests de scénarios de personnalisation (ex. colonnes masquées, filtres sauvegardés)

> [!TIP]
> Prévisualisation avec les options de personnalisation activées

#### 💮 start-mock

```json
"start-mock": "fiori run --config ./ui5-mock.yaml --open \"test/flp.html#app-preview\""
```

Objectif

- Lancer l’application avec un mockserver
- Simuler les données backend lorsque le vrai backend n’est pas disponible

Usage

- Tests sans connexion au système SAP
- Développement UI avant que le backend soit prêt
- Test de scénarios spécifiques

> [!TIP]
> Les données viennent d’un serveur factice, mais le FLP fonctionne normalement

## 🧩 QUELLE PREVIEW CHOISIR ?

> [!IMPORTANT]
> Pourquoi utilise-t-on plus souvent le start-noflp que les autres ?
> La raison tient à rapidité, simplicité et focus sur l’UI.

### 🍧 LOCAL

Ce que fait start (avec FLP) :

- Lance un Fiori Launchpad simulé
- Charge toutes les tuiles, rôles, navigation, sécurité, variantes
- Utilise le routing complet
- Le rendu de l’app se fait dans un FLP sandbox

Conséquences pour le dev :

- Plus long à démarrer
- Plus complexe à déboguer
- Navigation et cache parfois perturbants
- Idéal pour tester l’intégration finale mais pas pour le dev rapide

> [!TIP]
> Comme démarrer tout ton smartphone juste pour ouvrir une appli

### 🍧 NOFLP

Ce que fait start-noflp :

- Lance l’application directement (index.html)
- Pas de FLP, pas de tuiles, pas de navigation
- Pas de cache des vues (sap-ui-xx-viewCache=false)
- Connecte le backend directement (ou mock)

Avantages pour le dev :

- Démarrage ultra rapide
- Focus sur l’écran courant
- Débogage simple, console et breakpoints faciles
- Voir les changements instantanément sans passer par le Launchpad

> [!TIP]
> Comme ouvrir directement l’appli sur ton smartphone, sans passer par l’écran d’accueil
