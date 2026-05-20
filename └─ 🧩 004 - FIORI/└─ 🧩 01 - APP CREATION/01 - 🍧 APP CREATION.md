# 🌸 APP CREATION

> 🌺 Objectifs
>
> - [ ] Créer et paramétrer une SAP Fiori App

## 🧩 BUSINESS APPLICATION STUDIO

![](./assets/Capture%20d’écran%202026-02-09%20135018.png)

> [!IMPORTANT]
> Le SAP Business Application Studio (BAS) est l’IDE cloud de SAP pour développer des applications sur la plateforme SAP Business Technology Platform (BTP). C’est l’évolution de SAP Web IDE.

### 🍧 Caractéristiques principales :

- Basé sur le cloud : il n'y a rien à installer localement, tout fonctionne dans le navigateur.
- Multi-usage : développement SAP Fiori, SAPUI5, CAP (Cloud Application Programming), OData, etc.
- Environnements prêts à l’emploi : il existe différents dev spaces (ex. Fiori, CAP, Full Stack) configurés avec tous les outils nécessaires.
- Intégration Git et terminal : tu peux gérer le code source, exécuter des commandes npm, maven, ou abapGit (pour ABAP).
- Extensible : tu peux installer des extensions comme dans VSCode pour des langages ou frameworks spécifiques.

### 🍧 Points forts :

- Prêt à l’emploi pour SAP.
- Collaboration facile dans le cloud.
- Compatible avec les standards SAP et open source.

## 🧩 VSCODE

> [!IMPORTANT]
> VSCode est un éditeur de code légèrement différent : c’est local (ou cloud via GitHub Codespaces, par ex.), open source, ultra modulable, avec une énorme bibliothèque d’extensions.

### 🍧 Dans le contexte SAP :

- Avec l’extension SAP Fiori tools ou SAP Tools, tu peux développer des applications SAP localement.
- Tu peux connecter VSCode à un BTP dev space ou à un backend ABAP via ABAP Extension for VSCode.
- Très utile pour les développeurs qui aiment travailler localement et qui veulent la puissance d’extensions tierces (Linting, Prettier, Git, Docker, etc.).

## 🧩 > FIORI: OPEN APPLICATION GENERATOR

### 🍧 1. PALETTE DE COMMANDE

Accéder à la Palette de commandes via `Ctrl + Maj + P` et sélectionner `Fiori: Open Application Generator`. Vous devriez avoir ceci :

![](./assets/Capture%20d’écran%202026-05-20%20124944.png)

![](./assets/Capture%20d’écran%202026-05-20%20084803.png)

### 🍧 2. TEMPLATE SELECTION

_Choose your application template._

Sélectionner `Basic` et cliquer sur `Next >`

![](./assets/Capture%20d’écran%202026-05-20%20084932.png)

### 🍧 3. DATA SOURCE AND SERVICE SELECTION

_Configure the data source and select a service._

> [!IMPORTANT]
> Data Source :
> Quand tu crées un projet SAP Fiori à partir d’un template, on te demande d’où viennent les données de ton application. SAP te propose (en fonction des clients et de leur subscriptions) en général 3 façons de répondre à cette question.

Comment ça marche :

- Tu choisis le système
- BAS (ou SAP Tools) cherche pour toi les services disponibles
- Tu navigues dans une liste
- Il te propose les services OData disponibles (pratique pour vérifier si ton service est accessible et s'y connecter)

Conditions : Le système SAP est :

- dans le cloud
- ou exposé publiquement
- ou déjà accessible depuis BTP

Renseignes les champs obligatoires suivants :

#### 🌺 Data Source\*

      Connect to a System

#### 🌺 System\*

      New System

#### 🌺 System Type\*

      ABAP On Premise

#### 🌺 System URL\*

      https://s4hhost1.stms.fr:44300

#### 🌺 SAP Client (leave empty for default)

      200

#### 🌺 Username\*

      <SAP_GUI_USER_Name>

#### 🌺 Password\*

      <SAP_GUI_USER_Password>

> [!WARNING]
> Il est nécessaire de cliquer sur l'icône de `Login` !

![](./assets/Capture%20d’écran%202026-05-20%20085956.png)

Vous devriez avoir ceci :

![](./assets/Capture%20d’écran%202026-05-20%20091056.png)

#### 🌺 Do you want to store the system credentials?

      Yes

#### 🌺 System name\*

      S4H, client 200

#### 🌺 Service (for user [<SAP_GUI_USER_Name>])\*

      <SERVICE_GATEWAY_A_UTILISER_POUR_L'APP>

> [!NOTE]
> Sélectionner le Service Gateway que l'app va consommer.

- `Next >`

![](./assets/Capture%20d’écran%202026-05-20%20091545.png)

### 🍧 4. ENTITY SELECTION

_Configure the selected service._

#### 🌺 View Name

      Home

> [!NOTE]
> Il s'agit du nom de la Vue (View) initiale.

![](./assets/Capture%20d’écran%202026-05-20%20091917.png)

### 🍧 5. PROJECT ATTRIBUTES

_Configure the main project attributes._

#### 🌺 Module Name\*

      <tri>_first_app_module_name

#### 🌺 Application Title\*

      <TRI> First App Application Title

#### 🌺 Application Namespace

      fr.stms

#### 🌺 Description

      <TRI> First Fiori App Description

#### 🌺 Project Folder Path\*

      <sélectionner le dossier où vous souhaitez créer le projet>

#### 🌺 Minimum SAPUI5 Version\*

      <Laisser la valeur par défaut>

#### 🌺 Enable TypeScript

      <No>

#### 🌺 Add Deployment Configuration

      <No>

#### 🌺 Add SAP Fiori Launchpad Configuration

      <No>

#### 🌺 Use Virtual Endpoints for Local Preview

      <Yes>

#### 🌺 Configure Advanced Options

      <No>

#### 🌺 `Finish`

![](./assets/Capture%20d’écran%202026-05-20%20092813.png)

> [!IMPORTANT]
> Si tout c'est bien passé, vous devirez avoir ceci :

![](./assets/Capture%20d’écran%202026-05-20%20093317.png)
