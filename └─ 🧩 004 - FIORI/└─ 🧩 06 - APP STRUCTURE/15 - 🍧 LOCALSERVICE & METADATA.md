# 🌸 LOCALSERVICE & METADATA

## 🧩 LOCALSERVICE/ (SERVICES LOCAUX / MOCK)

```
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   │
│   ├── localService/             			# Données mock ou locales
│   │
│   ├── model/
│   ├── view/
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
├── ui5-mock.yaml
└── ui5.yaml
```

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Simuler un service backend sans dépendre d’un système SAP réel.
>
> - 🔨 Utilité : Permettre le développement et les tests de l’application sans connexion au backend.
> - ⌚ Quand utilisé ? Lors du développement local ou en l’absence de backend disponible.
> - 📌 Exemple :
>
>   Utiliser le mockserver avec la commande start-mock.

### 🍧 MAINSERVICE/ (SERVICE ODATA MOCKÉ)

```
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   │
│   ├── localService/
│   │   └── mainService/
│   │
│   ├── model/
│   ├── view/
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
├── ui5-mock.yaml
└── ui5.yaml
```

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Représenter un service OData fictif pour l’application.
>
> - 🔨 Utilité : Simuler la structure d’un vrai service backend (entités, propriétés, relations).
> - ⌚ Quand utilisé ? Lorsque l’application doit fonctionner sans accès à un système SAP.
> - 📌 Exemple :
>
>   Simuler un service client ou commande
>   utilisé par les vues Fiori.

### 🍧 METADATA.XML (MÉTADONNÉES DU SERVICE MOCK)

```
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   │
│   ├── localService/
│   │   └── mainService/
│   │       └── metadata.xml      			# Métadonnées du mockserver
│   │
│   ├── model/
│   ├── view/
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
├── ui5-mock.yaml
└── ui5.yaml
```

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Décrire la structure du service OData simulé.
>
> - 🔨 Utilité : Fournir au mockserver les entités, champs et types attendus par l’application.
> - ⌚ Quand utilisé ? Lors du lancement de l’application en mode mock (start-mock).
> - 📌 Exemple :
>
>   ```xml
>   <EntityType Name="Customer">
>       <Property Name="ID" Type="Edm.String" />
>       <Property Name="Name" Type="Edm.String" />
>   </EntityType>
>   ```
