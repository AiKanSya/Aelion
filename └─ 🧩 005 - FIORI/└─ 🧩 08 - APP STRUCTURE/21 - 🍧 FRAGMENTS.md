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
│   │   ├── fragments/ # <- Dossier des Fragments réutilisables
│   │   │   └── <fragment_n>.fragment.xml # <- Fragment
│   │   │
│   │   ├── App.view.xml
│   │   ├── Home.view.xml
│   │   ├── Detail.view.xml
│   │   └── <view_n>.view.xml
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
<?xml version="1.0" encoding="UTF-8"?>

<!--
==========================================================
SAPUI5 FRAGMENT : DIALOG
==========================================================

OBJECTIF :
Ce fichier est un Fragment SAPUI5.

Un Fragment :
- n’est PAS une vue complète
- n’a PAS de controller propre
- est réutilisable dans plusieurs vues
- est chargé dynamiquement depuis un controller

UTILISATION TYPIQUE :
- popup (Dialog)
- sous-formulaire
- composants réutilisables
-->

<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>

    <!--
    ==========================================================
    DIALOG SAPUI5
    ==========================================================

    Rôle :
    - affiche une fenêtre popup (modal ou non)
    - bloque ou non l’écran principal
    - utilisé pour créer / confirmer / éditer

    Ici :
    - Dialog pour création de palette
    -->

    <Dialog
        title="{i18n>fragment.title}"
    >

        <!--
        ==========================================================
        TITLE (i18n binding)
        ==========================================================

        {i18n>fragment.title}

        Rôle :
        - récupère une clé dans le fichier i18n.properties
        - permet multi-langue

        Exemple :
        fragment.title=Créer une palette
        -->

        <!--
        ==========================================================
        LABEL
        ==========================================================

        Rôle :
        - affiche un texte statique dans le Dialog
        - ici : "Package :"

        Binding :
        - texte traduit via i18n
        -->

        <Label
            text="{i18n>fragment.package}:"
            design="Bold"
            class="sapUiTinyMarginBegin sapUiTinyMarginEnd"
        />

        <!--
        design="Bold"
        - rend le texte en gras

        class="sapUiTinyMarginBegin sapUiTinyMarginEnd"
        - ajoute des marges SAPUI5 standard
        - améliore l’espacement visuel
        -->

        <!--
        ==========================================================
        BOUTONS DU DIALOG
        ==========================================================

        Rôle :
        - zone d’actions utilisateur
        - généralement OK / Cancel / Save / Delete
        -->

        <buttons>

            <!--
            Bouton OK :
            - déclenche la création d’une palette
            - appelle une fonction du controller
            -->

            <Button
                text="{i18n>fragment.ok}"
                press="onCreatePalette"
            />

            <!--
            Bouton Cancel :
            - ferme le dialog sans action métier
            -->

            <Button
                text="{i18n>fragment.cancel}"
                press="onCancelCreatePalette"
            />

        </buttons>

    </Dialog>

</core:FragmentDefinition>
```
