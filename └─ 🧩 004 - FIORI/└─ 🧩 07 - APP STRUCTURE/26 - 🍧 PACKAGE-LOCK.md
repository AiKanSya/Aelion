# 🌸 MANIFEST

## 🧩 PACKAGE-LOCK.JSON (VERROUILLAGE DES DÉPENDANCES NPM)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   ├── localService/
│   ├── model/
│   ├── view/
│   │
│   ├── Component.js
│   ├── index.html
│   └── manifest.json
│
├── .gitignore
├── (mta.yaml)
│
├── package-lock.json # <- Gestionnaire de versions npm
│
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
>   Verrouiller les versions exactes des dépendances installées.
>
> - 🔨 Utilité : Garantir que tous les développeurs utilisent les mêmes versions.
> - ⌚ Quand utilisé ? Après un `npm install` pour sauvegarder l’arborescence exacte.
> - 📌 Exemple :
>
>   Contient les versions exactes de `@ui5/cli`, `@sap/ux-ui5-tooling`, etc.
