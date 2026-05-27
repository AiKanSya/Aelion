# 🌸 FRAGMENTS

## 🧩 FRAGMENTS/ (COMPOSANTS UI RÉUTILISABLES)

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

📌 Exemple :

```xml
<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core">
  <Dialog title="{i18n>fragment.title}">
    <Label
      text="{i18n>fragment.package}:"
      design="Bold"
      class="sapUiTinyMarginBegin sapUiTinyMarginEnd"
    />
    <buttons>
      <Button text="{i18n>fragment.ok}" press="onCreatePalette" />
      <Button text="{i18n>fragment.cancel}" press="onCancelCreatePalette" />
    </buttons>
  </Dialog>
</core:FragmentDefinition>
```
