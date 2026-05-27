# 🌸 CONTROLLER

## 🧩 CSS/ (STYLES DE L’APPLICATION)

```
fgifirstappmodulename/
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

📌 Exemple :

```css
/* Enter your custom styles here */

.textError {
  color: red;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 13px;
}

.bold {
  font-weight: bold;
}

.marginLeftAndRight {
  margin-left: 13px;
  margin-right: 13px;
}

.dialogWidth {
  width: 95vw;
}

.customHeaderText {
  font-size: 13px;
}

.customListText {
  font-size: 13px;
}

.button-focus:focus {
  outline: 2px solid #0070f3;
  background-color: rgba(0, 112, 243, 0.1);
}
```
