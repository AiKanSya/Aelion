# 🌸 HOME.VIEW

## 🧩 HOME.VIEW.XML (VUE PRINCIPALE)

```
appdemofgi/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   ├── localService/
│   ├── model/
│   │
│   ├── view/
│   │   ├── fragments/            			# Fragments réutilisables
│   │   │   └── <fragment_n>.fragment.xml
│   │   │
│   │   ├── App.view.xml          			# Vue App
│   │   ├── Home.view.xml                    # Vue Home
│   │   ├── Detail.view.xml                  # Vue Detail
│   │   └── <view_n>.view.xml                # Vue n
│   │
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
>   Afficher l’écran d’accueil de l’application.
>
> - 🔨 Utilité : Présenter une liste, un tableau ou un résumé des données principales.
> - ⌚ Quand utilisé ? Lorsqu’un utilisateur ouvre l’application.
> - 📌 Exemple :
>
>   ```xml
>   <Page title="Accueil">
>       <List items="{/Items}">
>           <StandardListItem title="{Name}" />
>       </List>
>   </Page>
>   ```
