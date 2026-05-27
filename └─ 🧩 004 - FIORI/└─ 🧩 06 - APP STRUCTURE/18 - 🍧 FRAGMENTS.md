# 🌸 FRAGMENTS

## 🧩 FRAGMENTS/ (COMPOSANTS UI RÉUTILISABLES)

```
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
>   Factoriser des morceaux d’interface réutilisables.
>
> - 🔨 Utilité : Éviter la duplication de code UI dans plusieurs vues.
> - ⌚ Quand utilisé ? Lorsqu’un même bloc d’interface est utilisé dans plusieurs vues.
> - 📌 Exemple :
>
>   Un formulaire ou une boîte de dialogue réutilisable.
