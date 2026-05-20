# 🌸 PAGE

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle d’une Page en SAP UI5
> - [ ] Connaître les différences entre sap.m.Page et sap.f.DynamicPage
> - [ ] Savoir quand utiliser chaque composant
> - [ ] Lire et écrire une vue simple utilisant ces composants
> - [ ] Identifier les parties importantes d’une Page (header, content, footer)

## 🧩 CLASSES & SAMPLES

> [!IMPORTANT]
> sap.m.Page :
>
> - [Class sap.m.Page](https://sapui5.netweaver.ondemand.com/#/api/sap.m.Page)
> - [ClasSamples sap.m.Page](https://sapui5.netweaver.ondemand.com/#/entity/sap.m.Page)
>
> sap.f.DynamicPage :
>
> - [Class sap.f.DynamicPage](https://sapui5.netweaver.ondemand.com/#/api/sap.f.DynamicPage)
> - [Samples sap.f.DynamicPage](https://sapui5.netweaver.ondemand.com/#/entity/sap.f.DynamicPage)

## 🧩 DEFINITION

> [!IMPORTANT]
> Une Page est un composant UI5 de haut niveau qui représente un écran complet de l’application.

Elle permet de structurer l’interface avec :

- un en-tête (header)
- un contenu principal (content)
- un pied de page (footer)

> [!TIP]
> Une application UI5 affiche toujours une Page (ou un composant équivalent) à l’écran.

## 🧩 SAP.M.PAGE

![](./assets/Capture%20d’écran%202026-02-10%20145532.png)

`sap.m.Page` est le composant de page le plus simple et le plus utilisé en SAP UI5.

C’est la page "classique", adaptée aux applications :

- simples
- mobiles
- ou pédagogiques

### 🍧 QUAND L'UTILISER

- Écrans simples
- Peu de logique dans le header
- Applications mobiles ou tablette
- Débuts en SAP UI5

> [!TIP]
> C’est la Page recommandée pour commencer

### 🍧 STRUCTURE

- `title` : titre de la page
- `content` : contenu principal
- `footer` : barre de boutons (optionnelle)
- `showNavButton` : bouton retour
- `navButtonPress` : événement du bouton retour

### 🍧 EXEMPLE

```xml
<mvc:View
    controllerName="fr.stms.bc.appdemofgi.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Page
        id="page"
        title="{i18n>title}">

        <!-- CONTENT -->
        <content>
            <VBox>
                <Text
                    id="TextId"
                    text="Lorem ipsum dolor sit amet" />

                <Text
                    text="Contenu principal de la page"
                    class="sapUiSmallMarginTop" />
            </VBox>
        </content>

        <!-- FOOTER -->
        <footer>
            <Bar>
                <contentLeft>
                    <Text text="Zone FOOTER Left" />
                </contentLeft>

                <contentRight>
                    <Text text="Zone FOOTER Right" />
                </contentRight>
            </Bar>
        </footer>

    </Page>

</mvc:View>
```

### 🍧 AVANTAGES

- Simple à comprendre
- Rapide à mettre en place
- Parfait pour l’apprentissage
- Léger et efficace

### 🍧 LIMITES

- Peu flexible pour les applications complexes
- Header statique
- Pas adapté aux écrans de type Fiori avancé

## 🧩 SAP.F.DYNAMICPAGE

![](./assets/Capture%20d’écran%202026-02-10%20145312.png)

`sap.f.DynamicPage` est une page plus avancée, conçue pour les applications Fiori modernes.

Elle introduit :

- un header dynamique
- un comportement de scroll intelligent
- une meilleure séparation des zones

### 🍧 QUAND L'UTILISER

- Applications Fiori avancées
- Écrans complexes
- Beaucoup d’informations
- Cas métier réels (ERP, logistique, finance…)

> [!TIP]
> C’est la Page standard des apps Fiori modernes

### 🍧 STRUCTURE

- DynamicPageTitle : titre + actions
- DynamicPageHeader : zone d’informations
- content : contenu principal
- footer : actions globales

### 🍧 EXEMPLE

```xml
<mvc:View
    controllerName="fr.stms.bc.appdemofgi.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f">

    <f:DynamicPage
        id="dynamicPage"
        preserveHeaderStateOnScroll="true"
        showFooter="true">

        <!-- TITLE -->
        <f:title>
            <f:DynamicPageTitle>

                <!-- Titre principal -->
                <f:heading>
                    <Title text="{i18n>title}" />
                </f:heading>

            </f:DynamicPageTitle>
        </f:title>

        <!-- HEADER -->
        <f:header>
            <f:DynamicPageHeader>
                <Text text="Zone HEADER (filtres, infos globales…)" />
            </f:DynamicPageHeader>
        </f:header>

        <!-- CONTENT -->
        <f:content>
            <VBox class="sapUiSmallMargin">
                <Text
                    id="TextId"
                    text="Lorem ipsum dolor sit amet" />

                <Text
                    text="Contenu principal de la page"
                    class="sapUiSmallMarginTop" />
            </VBox>
        </f:content>

        <!-- FOOTER -->
        <f:footer>
            <OverflowToolbar>

                <Text text="Zone FOOTER Left" />

                <ToolbarSpacer />

                <Text text="Zone FOOTER Right" />

            </OverflowToolbar>
        </f:footer>

    </f:DynamicPage>

</mvc:View>
```

### 🍧 AVANTAGES

- Conforme aux guidelines Fiori
- Header dynamique (réduit au scroll)
- Très lisible pour l’utilisateur
- Adapté aux écrans complexes

### 🍧 LIMITES

- Plus complexe à comprendre
- Surdimensionné pour des écrans simples
- Moins adapté aux apps purement mobiles

## 🧩 COMPARAISON

| 🍧 Critère       | 🍧 sap.m.Page | 🍧 sap.f.DynamicPage |
| ---------------- | ------------- | -------------------- |
| Complexité       | Faible        | Moyenne              |
| Apprentissage    | Très facile   | Plus avancé          |
| Header dynamique | ❌ Non        | ✅ Oui               |
| Standard Fiori   | ⚠️ Ancien     | ✅ Recommandé        |
| Cas simples      | ✅ Oui        | ❌ Non               |
| Cas complexes    | ❌ Limité     | ✅ Oui               |

> [!WARNING]
>
> - Ne pas utiliser DynamicPage pour un écran très simple
> - Ne pas mélanger Page et DynamicPage sans raison
