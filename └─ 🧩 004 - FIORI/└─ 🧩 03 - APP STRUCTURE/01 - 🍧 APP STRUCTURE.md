# 🌸 APP STRUCTURE

> 🌺 Objectifs
>
> - [ ] Comprendre la structure principale d’un projet SAP Fiori
> - [ ] Identifier le rôle des dossiers essentiels : `webapp/`, `controller/`, `view/`, `model/`, `i18n/`, `css/`, `libs/`, `localService/`
> - [ ] Comprendre l’utilité des fichiers clés : `Component.js`, `manifest.json`, `index.html`, `package.json`, `ui5*.yaml`
> - [ ] Savoir quand et pourquoi utiliser les vues, controllers et modèles
> - [ ] Se repérer rapidement dans un projet pour le développement et la preview

## 🧩 STRUCTURE

```
appdemofgi/                       			# Racine du projet
├── webapp/                       			# Contenu principal de l'application Fiori
│   ├── (annotations/)              		# Fichiers d’annotations OData
│   │   └── (annotation.xml)        		# Décrit des métadonnées supplémentaires pour le modèle
│   │
│   ├── controller/               			# Contrôleurs JavaScript
│   │   ├── App.controller.js     			# Contrôleur principal
│   │   ├── BaseController.js         		# Contrôleur de base utilisé par d'autres controllers
│   │   ├── Home.controller.js    			# Contrôleur de la vue Home
│   │   ├── Detail.controller.js  			# Contrôleur de la vue Detail
│   │   └── <view_n>.controller.js 		    # Controller n
│   │
│   ├── css/                      			# Styles CSS
│   │   └── style.css
│   │
│   ├── i18n/                     			# Internationalisation
│   │   ├── i18n_en.properties    			# Traductions anglais
│   │   ├── i18n_fr.properties    			# Traductions français
│   │   ├── i18n_??.properties    			# Traductions dans la langue ??
│   │   └── i18n.properties       			# Fichier de base
│   │
│   ├── libs/                     			# Fonctions et utilitaires
│   │   ├── DataServices.js       			# Services de données génériques
│   │   └── Formatter.js          			# Fonctions de formatage UI
│   │
│   ├── localService/             			# Données mock ou locales
│   │   └── mainService/
│   │       └── metadata.xml      			# Métadonnées du mockserver
│   │
│   ├── model/                    			# Modèles de données côté client
│   │   ├── models.js             			# Définition des modèles
│   │   └── [autres JSON ou JS]  			# Données locales ou configurations
│   │
│   ├── view/                     			# Vues de l'application
│   │   ├── fragments/            			# Fragments réutilisables
│   │   │   └── <fragment_n>.fragment.xml
│   │   │
│   │   ├── App.view.xml          			# Vue App
│   │   ├── Home.view.xml                   # Vue Home
│   │   ├── Detail.view.xml                 # Vue Detail
│   │   └── <view_n>.view.xml               # Vue n
│   │
│   ├── Component.js               		    # Point d’entrée de l’application
│   ├── index.html                 		    # Page HTML principale
│   └── manifest.json              		    # Métadonnées Fiori : routes, models, data sources, namespace
│
├── .gitignore                      		# Fichiers à ignorer par git
├── (mta.yaml)                      		# Multi-Target Application config (si onPremise ou BTP)
├── package-lock.json                		# Gestionnaire de versions npm
├── package.json                     		# Dépendances, scripts, preview, build
├── README.md                        		# Documentation projet
├── ui5-local.yaml                   		# Config UI5 pour start-local
├── ui5-mock.yaml                    		# Config UI5 pour start-mock
└── ui5.yaml                         		# (duplicata parfois selon version BAS)
```

> [!CAUTION]
> Certains fichiers ne doivent généralement pas être modifiés par des débutants car ils contiennent soit des configurations de base du projet, soit des fichiers générés automatiquement par les outils.
>
> - .gitignore → géré par Git pour ignorer certains fichiers. Modifier peut casser le suivi Git.
> - package-lock.json → généré automatiquement par NPM, reflète les versions exactes des dépendances. Ne jamais modifier manuellement.
> - ui5.yaml → configuration du UI5 Tooling pour le build ; modifier sans comprendre peut casser le build.
> - ui5-local.yaml / ui5-mock.yaml → configurations locales/mocks pour les développeurs ; toucher seulement si on comprend le rôle des middleware.
> - mta.yaml → configuration MTA pour déploiement BTP/onPremise. Toucher seulement si on déploie ou ajoute des modules/services.

## 🧩 RACINE DU PROJET

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Contenir tout le projet UI5/Fiori :
>   - code,
>   - configuration,
>   - preview,
>   - build.
>
> - 🔨 Utilité
>
>   C’est le dossier que tu ouvres dans SAP Business Application Studio.
>
> - ⌚ Quand utilisé ?
>
>   Toujours : c’est le point de départ.
>
> - 📌 Exemple
>
>   Quand tu fais npm start, la commande est exécutée depuis cette racine.

## 🧩 WEBAPP/ (COEUR DE L'APPLICATION)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Contenir tout ce qui est exécuté dans le navigateur.
>
> - 🔨 Utilité
>
>   UI5 charge exclusivement ce dossier pour afficher l’application.
>
> - ⌚ Quand utilisé ?
>
>   À chaque fois que l’app démarre.
>
> - 📌 Exemple
>
>   Les vues XML, les controllers JS et le manifest sont tous ici.

## 🧩 ANNOTATIONS/ (ANNOTATIONS ODATA)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Centraliser les fichiers d’annotations OData utilisés par l’application.
>
> - 🔨 Utilité
>
>   Enrichir le modèle OData avec des informations supplémentaires
>   (UI, labels, champs obligatoires, comportements).
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’on souhaite influencer l’affichage ou le comportement UI
>   sans modifier le service backend.
>
> - 📌 Exemple
>
>   Ajouter un libellé lisible à un champ OData pour l’affichage dans l’UI.

### 🍧 ANNOTATION.XML (DESCRIPTIONS UI ODATA)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Décrire des métadonnées complémentaires pour un service OData.
>
> - 🔨 Utilité
>
>   Contrôler l’affichage UI (labels, champs visibles, sections, importance)
>   via des annotations standards SAP.
>
> - ⌚ Quand utilisé ?
>
>   Quand on développe une application Fiori utilisant OData
>   et qu’on veut enrichir le modèle sans toucher au backend ABAP.
>
> - 📌 Exemple
>
>   ```xml
>   <Annotation Term="Common.Label" String="Nom du client"/>
>   ```

## 🧩 CONTROLLER/ (LOGIQUE APPLICATIVE)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Gérer le comportement de l’application.
>
> - 🔨 Utilité
>
>   Réagir aux actions utilisateur (clics, navigation, chargement des données).
>
> - ⌚ Quand utilisé ?
>
>   Réagir aux actions utilisateur (clics, navigation, chargement des données).
>
> - 📌 Exemple
>
>   ```js
>   onPress: function () {
>        this.getRouter().navTo("Detail");
>   }
>   ```

### 🍧 APP.CONTROLLER.JS (CONTROLLER PRINCIPAL)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Gérer le cycle de vie global de l’application.
>
> - 🔨 Utilité
>
>   Initialiser l’application et gérer les événements globaux.
>
> - ⌚ Quand utilisé ?
>
>   Au démarrage de l’application ou pour des comportements transverses.
>
> - 📌 Exemple
>
>   ```js
>   onInit: function () {
>       // Initialisation globale de l'application
>   }
>   ```

### 🍧 BASECONTROLLER.JS (CONTROLLER DE BASE)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Centraliser les fonctions communes utilisées par plusieurs contrôleurs.
>
> - 🔨 Utilité
>
>   Éviter la duplication de code (router, models, messages, helpers).
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’une fonction est partagée par plusieurs contrôleurs
>   (navigation, accès aux modèles, messages).
>
> - 📌 Exemple
>
>   ```js
>   getRouter: function () {
>       return this.getOwnerComponent().getRouter();
>   }
>   ```

### 🍧 HOMECONTROLLER.JS (CONTROLLER DE LA VUE HOME)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Gérer la logique métier de la vue Home.
>
> - 🔨 Utilité
>
>   Réagir aux actions utilisateur sur l’écran principal
>   (sélection, navigation, chargement initial).
>
> - ⌚ Quand utilisé ?
>
>   Lors de l’affichage ou de l’interaction avec la vue Home.
>
> - 📌 Exemple
>
>   ```js
>   onItemPress: function (oEvent) {
>       this.getRouter().navTo("Detail");
>   }
>   ```

### 🍧 DETAIL.CONTROLLER.JS (CONTROLLER DE LA VUE DETAIL)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Gérer l’affichage et les actions liées à un objet détaillé.
>
> - 🔨 Utilité
>
>   Charger les données spécifiques à un élément sélectionné
>   et gérer les actions associées.
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’un utilisateur navigue vers une vue de détail.
>
> - 📌 Exemple
>
>   ```js
>   onInit: function () {
>       this.getRouter().getRoute("Detail")
>           .attachPatternMatched(this._onObjectMatched, this);
>   }
>   ```

## 🧩 CSS/ (STYLES DE L’APPLICATION)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Centraliser les styles graphiques de l’application.
>
> - 🔨 Utilité
>
>   Personnaliser l’apparence de l’application
>   (couleurs, marges, tailles, alignements).
>
> - ⌚ Quand utilisé ?
>
>   Lorsque le style standard SAPUI5 ne suffit pas
>   ou pour appliquer une charte graphique spécifique.
>
> - 📌 Exemple
>
>   Définir des styles communs réutilisables dans plusieurs vues.

### 🍧 STYLE.CSS (FEUILLE DE STYLE)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Définir les règles CSS utilisées par l’application.
>
> - 🔨 Utilité
>
>   Modifier l’apparence visuelle des contrôles UI5
>   sans changer le code JavaScript ou XML.
>
> - ⌚ Quand utilisé ?
>
>   Pour ajuster l’UI (espacements, couleurs, visibilité)
>   ou appliquer une identité visuelle.
>
> - 📌 Exemple
>
>   ```css
>   .myTitle {
>     font-weight: bold;
>     color: #0a6ed1;
>   }
>   ```

## 🧩 I18N/ (INTERNATIONALISATION)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Gérer les textes de l’application dans plusieurs langues.
>
> - 🔨 Utilité
>
>   Séparer les textes affichés du code
>   pour faciliter la traduction et la maintenance.
>
> - ⌚ Quand utilisé ?
>
>   Dès qu’une application doit être utilisée
>   par des utilisateurs de langues différentes.
>
> - 📌 Exemple
>
>   Utiliser une clé de traduction dans une vue XML.

### 🍧 I18N_EN.PROPERTIES (TRADUCTIONS ANGLAIS)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Définir les textes de l’application en anglais.
>
> - 🔨 Utilité
>
>   Afficher automatiquement l’interface en anglais
>   selon la langue de l’utilisateur.
>
> - ⌚ Quand utilisé ?
>
>   Lorsque la langue de l’utilisateur est l’anglais.
>
> - 📌 Exemple
>
>   ```properties
>   appTitle=My Fiori Application
>   homeTitle=Home
>   ```

### 🍧 I18N_FR.PROPERTIES (TRADUCTIONS FRANÇAIS)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Définir les textes de l’application en français.
>
> - 🔨 Utilité
>
>   Fournir une version française de l’interface utilisateur.
>
> - ⌚ Quand utilisé ?
>
>   Lorsque la langue de l’utilisateur est le français.
>
> - 📌 Exemple
>
>   ```properties
>   appTitle=Mon application Fiori
>   homeTitle=Accueil
>   ```

### 🍧 I18N.PROPERTIES (FICHIER PAR DÉFAUT)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Fournir les textes par défaut de l’application.
>
> - 🔨 Utilité
>
>   Servir de langue de référence
>   si aucune traduction spécifique n’est trouvée.
>
> - ⌚ Quand utilisé ?
>
>   Lorsque la langue utilisateur ne correspond
>   à aucun fichier de traduction spécifique.
>
> - 📌 Exemple
>
>   ```properties
>   appTitle=Fiori App
>   homeTitle=Home
>   ```

## 🧩 LIBS/ (BIBLIOTHÈQUES ET UTILITAIRES)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Regrouper les fonctions utilitaires réutilisables de l’application.
>
> - 🔨 Utilité
>
>   Centraliser la logique transverse
>   (formatage, appels de services, helpers).
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’une fonction est utilisée
>   dans plusieurs contrôleurs ou vues.
>
> - 📌 Exemple
>
>   Créer des fonctions génériques appelées depuis les contrôleurs.

### 🍧 DATASERVICES.JS (SERVICES DE DONNÉES)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Centraliser les appels aux services backend.
>
> - 🔨 Utilité
>
>   Encapsuler la logique d’accès aux données
>   (OData, REST, gestion des erreurs).
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’un contrôleur doit lire ou écrire des données
>   sans gérer directement la complexité technique.
>
> - 📌 Exemple
>
>   ```js
>   getCustomers: function (oModel) {
>       return oModel.read("/Customers");
>   }
>   ```

### 🍧 FORMATTER.JS (FORMATAGE DES DONNÉES UI)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Adapter l’affichage des données dans l’interface utilisateur.
>
> - 🔨 Utilité
>
>   Transformer des données brutes
>   (dates, statuts, montants) en valeurs lisibles.
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’un champ doit être affiché différemment
>   de sa valeur technique.
>
> - 📌 Exemple
>
>   ```js
>   formatStatus: function (sStatus) {
>       return sStatus === "A" ? "Actif" : "Inactif";
>   }
>   ```

## 🧩 LOCALSERVICE/ (SERVICES LOCAUX / MOCK)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Simuler un service backend sans dépendre d’un système SAP réel.
>
> - 🔨 Utilité
>
>   Permettre le développement et les tests de l’application
>   sans connexion au backend.
>
> - ⌚ Quand utilisé ?
>
>   Lors du développement local ou en l’absence de backend disponible.
>
> - 📌 Exemple
>
>   Utiliser le mockserver avec la commande start-mock.

### 🍧 MAINSERVICE/ (SERVICE ODATA MOCKÉ)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Représenter un service OData fictif pour l’application.
>
> - 🔨 Utilité
>
>   Simuler la structure d’un vrai service backend
>   (entités, propriétés, relations).
>
> - ⌚ Quand utilisé ?
>
>   Lorsque l’application doit fonctionner
>   sans accès à un système SAP.
>
> - 📌 Exemple
>
>   Simuler un service client ou commande
>   utilisé par les vues Fiori.

### 🍧 METADATA.XML (MÉTADONNÉES DU SERVICE MOCK)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Décrire la structure du service OData simulé.
>
> - 🔨 Utilité
>
>   Fournir au mockserver les entités, champs
>   et types attendus par l’application.
>
> - ⌚ Quand utilisé ?
>
>   Lors du lancement de l’application en mode mock
>   (start-mock).
>
> - 📌 Exemple
>
>   ```xml
>   <EntityType Name="Customer">
>       <Property Name="ID" Type="Edm.String" />
>       <Property Name="Name" Type="Edm.String" />
>   </EntityType>
>   ```

## 🧩 MODEL/ (MODÈLES DE DONNÉES)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Centraliser la gestion des modèles de données côté client.
>
> - 🔨 Utilité
>
>   Définir et exposer les modèles utilisés par l’application
>   (OData, JSON, Resource).
>
> - ⌚ Quand utilisé ?
>
>   Dès que l’application manipule des données
>   (backend, données locales, paramètres).
>
> - 📌 Exemple
>
>   Utiliser un modèle JSON pour stocker des données temporaires.

### 🍧 MODELS.JS (DÉFINITION DES MODÈLES)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Initialiser et configurer les modèles de l’application.
>
> - 🔨 Utilité
>
>   Créer les modèles (OData, JSON, i18n)
>   et les rendre accessibles aux vues et contrôleurs.
>
> - ⌚ Quand utilisé ?
>
>   Au démarrage de l’application
>   (chargé depuis Component.js).
>
> - 📌 Exemple
>
>   ```js
>   var oModel = new JSONModel({});
>   this.setModel(oModel, "viewModel");
>   ```

## 🧩 VIEW/ (VUES DE L’APPLICATION)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Définir l’interface utilisateur de l’application.
>
> - 🔨 Utilité
>
>   Décrire la structure visuelle des écrans
>   (boutons, champs, tableaux, layouts).
>
> - ⌚ Quand utilisé ?
>
>   À chaque affichage d’un écran de l’application
>   (Home, Detail, etc.).
>
> - 📌 Exemple
>
>   Une vue XML décrivant un écran avec un titre et une liste.

### 🍧 FRAGMENTS/ (COMPOSANTS UI RÉUTILISABLES)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Factoriser des morceaux d’interface réutilisables.
>
> - 🔨 Utilité
>
>   Éviter la duplication de code UI
>   dans plusieurs vues.
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’un même bloc d’interface
>   est utilisé dans plusieurs vues.
>
> - 📌 Exemple
>
>   Un formulaire ou une boîte de dialogue réutilisable.

### 🍧 FRAGMENT_N.FRAGMENT.XML (FRAGMENT UI5)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Définir un fragment d’interface indépendant.
>
> - 🔨 Utilité
>
>   Ajouter dynamiquement un composant UI
>   dans une vue ou un contrôleur.
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’on souhaite afficher un composant
>   ponctuellement (dialog, popover).
>
> - 📌 Exemple
>
>   ```xml
>   <Dialog title="Confirmation">
>       <Text text="Êtes-vous sûr ?" />
>   </Dialog>
>   ```

### 🍧 APP.VIEW.XML (VUE RACINE DE L’APPLICATION)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Définir le conteneur principal de l’application.
>
> - 🔨 Utilité
>
>   Héberger le NavContainer ou Router
>   qui gère la navigation entre les vues.
>
> - ⌚ Quand utilisé ?
>
>   Chargée une seule fois au démarrage de l’application.
>
> - 📌 Exemple
>
>   ```xml
>   <App id="app"/>
>   ```

### 🍧 HOME.VIEW.XML (VUE PRINCIPALE)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Afficher l’écran d’accueil de l’application.
>
> - 🔨 Utilité
>
>   Présenter une liste, un tableau ou un résumé
>   des données principales.
>
> - ⌚ Quand utilisé ?
>
>   Lorsqu’un utilisateur ouvre l’application.
>
> - 📌 Exemple
>
>   ```xml
>   <Page title="Accueil">
>       <List items="{/Items}">
>           <StandardListItem title="{Name}" />
>       </List>
>   </Page>
>   ```

### 🍧 DETAIL.VIEW.XML (VUE DE DÉTAIL)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Afficher les informations détaillées d’un élément sélectionné.
>
> - 🔨 Utilité
>
>   Montrer les données complètes
>   liées à un objet métier.
>
> - ⌚ Quand utilisé ?
>
>   Après une navigation depuis la vue Home
>   vers un élément précis.
>
> - 📌 Exemple
>
>   ```xml
>   <Page title="Détail">
>       <Text text="{Name}" />
>   </Page>
>   ```

## 🧩 COMPONENT.JS (POINT D’ENTRÉE DE L’APPLICATION)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Initialiser l’application et ses composants.
>
> - 🔨 Utilité
>
>   Charger les modèles, configurer le router,
>   et préparer l’application pour l’exécution.
>
> - ⌚ Quand utilisé ?
>
>   Dès le démarrage de l’application,
>   avant l’affichage des vues.
>
> - 📌 Exemple
>
>   ```js
>   sap.ui.define(
>     ["sap/ui/core/UIComponent", "appdemofgi/model/models"],
>     function (UIComponent, models) {
>       return UIComponent.extend("appdemofgi.Component", {
>         metadata: { manifest: "json" },
>         init: function () {
>           UIComponent.prototype.init.apply(this, arguments);
>           this.setModel(models.createViewModel(), "viewModel");
>           this.getRouter().initialize();
>         },
>       });
>     },
>   );
>   ```

## 🧩 INDEX.HTML (PAGE PRINCIPALE)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Charger l’application UI5 dans le navigateur.
>
> - 🔨 Utilité
>
>   Inclure les bibliothèques SAPUI5 et déclencher le bootstrap.
>
> - ⌚ Quand utilisé ?
>
>   À l’ouverture de l’application dans le navigateur.
>
> - 📌 Exemple
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

## 🧩 MANIFEST.JSON (MÉTADONNÉES DE L’APPLICATION)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Décrire toute la configuration Fiori de l’application.
>
> - 🔨 Utilité
>
>   Définir routes, modèles, data sources, titres, icônes et namespace.
>
> - ⌚ Quand utilisé ?
>
>   En permanence par UI5 pour initialiser
>   et orchestrer l’application.
>
> - 📌 Exemple
>
>   ```json
>   {
>     "sap.app": {
>       "id": "appdemofgi",
>       "title": "FGI Fiori App Demo",
>       "applicationVersion": { "version": "0.0.1" }
>     },
>     "sap.ui5": {
>       "rootView": {
>         "viewName": "appdemofgi.view.App",
>         "type": "XML",
>         "id": "app"
>       },
>       "models": {
>         "i18n": {
>           "type": "sap.ui.model.resource.ResourceModel",
>           "settings": { "bundleName": "appdemofgi.i18n.i18n" }
>         }
>       }
>     }
>   }
>   ```

## 🧩 .GITIGNORE (FICHIERS À IGNORER PAR GIT)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Définir quels fichiers et dossiers ne doivent pas être suivis par Git.
>
> - 🔨 Utilité
>
>   Éviter de versionner des fichiers temporaires,
>   logs, ou dépendances locales.
>
> - ⌚ Quand utilisé ?
>
>   Lors des commits et push vers le dépôt.
>
> - 📌 Exemple
>
>   ```
>   node_modules/
>   dist/
>   *.log
>   .DS_Store
>   ```

## 🧩 PACKAGE-LOCK.JSON (VERROUILLAGE DES DÉPENDANCES NPM)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Verrouiller les versions exactes des dépendances installées.
>
> - 🔨 Utilité
>
>   Garantir que tous les développeurs utilisent les mêmes versions.
>
> - ⌚ Quand utilisé ?
>
>   Après un `npm install` pour sauvegarder l’arborescence exacte.
>
> - 📌 Exemple
>
>   Contient les versions exactes de `@ui5/cli`, `@sap/ux-ui5-tooling`, etc.

## 🧩 UI5-LOCAL.YAML (CONFIGURATION POUR START-LOCAL)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Configurer l’environnement pour se connecter à un backend réel.
>
> - 🔨 Utilité
>
>   Permettre à l’application de récupérer des données depuis un système SAP local ou distant.
>
> - ⌚ Quand utilisé ?
>
>   Avec la commande `npm run start-local` ou `fiori run --config ui5-local.yaml`.
>
> - 📌 Exemple
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

## 🧩 UI5-MOCK.YAML (CONFIGURATION POUR START-MOCK)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Configurer le mockserver pour le développement sans backend.
>
> - 🔨 Utilité
>
>   Fournir des données simulées pour tester l’application.
>
> - ⌚ Quand utilisé ?
>
>   Avec la commande `npm run start-mock` ou `fiori run --config ui5-mock.yaml`.
>
> - 📌 Exemple
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

## 🧩 UI5.YAML (CONFIGURATION UI5 GÉNÉRALE)

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Définir la configuration standard de l’application UI5.
>
> - 🔨 Utilité
>
>   Déclarer le build, la structure des ressources, et les chemins du projet.
>
> - ⌚ Quand utilisé ?
>
>   Lors de l’exécution de commandes UI5 (`build`, `preview`, `deploy`).
>
> - 📌 Exemple
>
>   ```yaml
>   specVersion: "2.2"
>   metadata:
>     name: appdemofgi
>   type: application
>   resources:
>     configuration:
>       paths:
>         webapp: webapp
>   builder:
>     resources:
>       excludes:
>         - test/
>   ```
