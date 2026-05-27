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
fgifirstappmodulename/                       # Racine du projet
├── webapp/                       			# Contenu principal de l'application Fiori
│   ├── (annotations/)              		# dossier d’annotations OData
│   │   └── (annotation.xml)        		# Fichier décrivant les métadonnées supplémentaires pour le modèle
│   │
│   ├── controller/               			# Dossier contenant les Contrôleurs JavaScript
│   │   ├── App.controller.js     			# Contrôleur principal
│   │   ├── BaseController.js         		# Contrôleur de base utilisé par d'autres controllers
│   │   ├── Home.controller.js    			# Contrôleur de la vue Home
│   │   ├── Detail.controller.js  			# Contrôleur de la vue Detail
│   │   └── <view_n>.controller.js 		# Controller n
│   │
│   ├── css/                      			# Dossier contenant les Styles CSS
│   │   └── style.css                        # Fichiers de Styles
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
│   │   └── [autres models JSON ou JS]  			# Données locales ou configurations
│   │
│   ├── view/                     			# Vues de l'application
│   │   ├── fragments/            			# Fragments réutilisables
│   │   │   └── <fragment_n>.fragment.xml
│   │   │
│   │   ├── App.view.xml          			# Vue App
│   │   ├── Home.view.xml                    # Vue Home
│   │   ├── Detail.view.xml                  # Vue Detail
│   │   └── <view_n>.view.xml                # Vue n
│   │
│   ├── Component.js               		# Point d’entrée de l’application
│   ├── index.html                 		# Page HTML principale
│   └── manifest.json              		# Métadonnées Fiori : routes, models, data sources, namespace
│
├── .gitignore                      		# Fichiers à ignorer par git
├── (mta.yaml)                      		# Multi-Target Application config (si onPremise ou BTP)
├── package-lock.json                		# Gestionnaire de versions npm
├── package.json                     		# Dépendances, scripts, preview, build
├── README.md                        		# Documentation projet
├── ui5-local.yaml                   		# Config UI5 pour start-local
├── ui5-mock.yaml                    		# Config UI5 pour start-mock
└── ui5.yaml                         		# Config UI5
```

> [!CAUTION]
> Certains fichiers ne doivent généralement pas être modifiés par des débutants car ils contiennent soit des configurations de base du projet, soit des fichiers générés automatiquement par les outils.
>
> - .gitignore → géré par Git pour ignorer certains fichiers. Modifier peut casser le suivi Git.
> - package-lock.json → généré automatiquement par NPM, reflète les versions exactes des dépendances. Ne jamais modifier manuellement.
> - ui5.yaml → configuration du UI5 Tooling pour le build ; modifier sans comprendre peut casser le build.
> - ui5-local.yaml / ui5-mock.yaml → configurations locales/mocks pour les développeurs ; toucher seulement si on comprend le rôle des middleware.
> - mta.yaml → configuration MTA pour déploiement BTP/onPremise. Toucher seulement si on déploie ou ajoute des modules/services.
