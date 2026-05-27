# 🌸 FORMATTER

## 🧩 FORMATTER.JS (FORMATAGE DES DONNÉES UI)

```
appdemofgi/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   │
│   ├── libs/
│   │   ├── DataServices.js
│   │   └── Formatter.js          			# Fonctions de formatage UI
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
>   Adapter l’affichage des données dans l’interface utilisateur.
>
> - 🔨 Utilité : Transformer des données brutes (dates, statuts, montants) en valeurs lisibles.
> - ⌚ Quand utilisé ? Lorsqu’un champ doit être affiché différemment de sa valeur technique.
> - 📌 Exemple :
>
>   ```js
>   formatStatus: function (sStatus) {
>       return sStatus === "A" ? "Actif" : "Inactif";
>   }
>   ```
