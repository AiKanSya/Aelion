# 🌸 CONTROLLER

## 🧩 CSS/ (STYLES DE L’APPLICATION)

```
appdemofgi/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   │
│   ├── css/                      			# Dossier contenant les Styles CSS
│   │
│   ├── i18n/
│   ├── libs/
│   ├── localService/
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
>   Centraliser les styles graphiques de l’application.
>
> - 🔨 Utilité : Personnaliser l’apparence de l’application (couleurs, marges, tailles, alignements).
> - ⌚ Quand utilisé ? Lorsque le style standard SAPUI5 ne suffit pas ou pour appliquer une charte graphique spécifique.
> - 📌 Exemple :
>
>   Définir des styles communs réutilisables dans plusieurs vues.

### 🍧 STYLE.CSS (FEUILLE DE STYLE)

```
appdemofgi/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   │
│   ├── css/                      			# Dossier contenant les Styles CSS
│   │   └── style.css                        # Fichiers de Styles
│   │
│   ├── i18n/
│   ├── libs/
│   ├── localService/
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
>   Définir les règles CSS utilisées par l’application.
>
> - 🔨 Utilité : Modifier l’apparence visuelle des contrôles UI5 sans changer le code JavaScript ou XML.
> - ⌚ Quand utilisé ? Pour ajuster l’UI (espacements, couleurs, visibilité) ou appliquer une identité visuelle.
> - 📌 Exemple :
>
>   ```css
>   .myTitle {
>     font-weight: bold;
>     color: #0a6ed1;
>   }
>   ```
