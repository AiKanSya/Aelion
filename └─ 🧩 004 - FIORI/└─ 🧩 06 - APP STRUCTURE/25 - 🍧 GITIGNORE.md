# 🌸 GITIGNORE

## 🧩 .GITIGNORE (FICHIERS À IGNORER PAR GIT)

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
├── .gitignore # <- Fichiers à ignorer par git
│
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
>   Définir quels fichiers et dossiers ne doivent pas être suivis par Git.
>
> - 🔨 Utilité : Éviter de versionner des fichiers temporaires, logs, ou dépendances locales.
> - ⌚ Quand utilisé ? Lors des commits et push vers le dépôt.

📌 Exemple :

```
node_modules/
dist/
.scp/
.env
Makefile*.mta
mta_archives
mta-*
resources
archive.zip
.*_mta_build_tmp
```
