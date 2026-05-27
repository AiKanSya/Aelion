# 🌸 I18N

## 🧩 LIBS/ (BIBLIOTHÈQUES ET UTILITAIRES)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   │
│   ├── libs/                     			# Fonctions et utilitaires
│   │
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
>   Regrouper les fonctions utilitaires réutilisables de l’application.
>
> - 🔨 Utilité : Centraliser la logique transverse (formatage, appels de services, helpers).
> - ⌚ Quand utilisé ? Lorsqu’une fonction est utilisée dans plusieurs contrôleurs ou vues.

📌 Exemple :

     Créer des fonctions génériques appelées depuis les contrôleurs.
