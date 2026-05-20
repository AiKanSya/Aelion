# 🌸 BUTTON

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle d’un bouton en SAP UI5
> - [ ] Connaître le composant sap.m.Button
> - [ ] Savoir quand et comment utiliser un bouton
> - [ ] Comprendre les propriétés principales d’un Button
> - [ ] Gérer les événements (press)
> - [ ] Lire et écrire une vue simple avec des boutons

## 🧩 CLASSES & SAMPLES

> [!IMPORTANT]
> sap.m.Button :
>
> - [Class sap.m.Button](https://sapui5.netweaver.ondemand.com/#/api/sap.m.Button)
> - [Samples sap.m.Button](https://sapui5.netweaver.ondemand.com/#/entity/sap.m.Button)

## 🧩 DEFINITION

> [!IMPORTANT]
> Un Button est un composant UI5 permettant à l’utilisateur de déclencher une action.

Il est utilisé pour :

- valider une action
- naviguer
- déclencher un traitement
- ouvrir une popup ou un dialogue

> [!TIP]
> Sans Button, l’utilisateur ne peut pas interagir avec l’application.

## 🧩 SAP.M.BUTTON

![](./assets/Capture%20d’écran%202026-02-10%20161522.png)

`sap.m.Button` est le bouton standard en SAP UI5.

Il est utilisé dans quasiment toutes les applications Fiori.

### 🍧 QUAND L'UTILISER

- Actions utilisateur (Valider, Annuler, Enregistrer…)
- Navigation (Retour, Suivant)
- Lancement de traitements
- Boutons dans :
  - header
  - footer
  - content
  - dialogs

> [!TIP]
> Un écran UI5 contient presque toujours au moins un Button.

### 🍧 STRUCTURE

Un Button est défini par :

- `text` : texte du bouton
- `icon` : icône optionnelle
- `type` : importance visuelle du bouton
- `enabled` : bouton actif ou non
- `visible` : affiché ou non
- `press` : événement déclenché au clic

### 🍧 TYPES DE BUTTON

Les types les plus courants :

- `Default` : bouton standard
- `Emphasized` : action principale (Valider)
- `Transparent` : action secondaire
- `Reject` : action négative (Supprimer)
- `Accept` : action positive

> [!TIP]
> Il ne doit y avoir **qu’un seul bouton Emphasized par écran**.

### 🍧 EXEMPLE SIMPLE

```xml
<Button
    text="Valider"
    press="onValidate" />
```

### 🍧 EXEMPLE AVEC TYPE ET ICÔNE

```xml
<Button
    text="Enregistrer"
    icon="sap-icon://save"
    type="Emphasized"
    press="onSave" />
```

### 🍧 EXEMPLE POUR SAP.M.PAGE

```xml
<mvc:View
    controllerName="fr.stms.bc.appdemofgi.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Page
        id="page"
        title="{i18n>title}">

        <!-- HEADER -->
        <headerContent>
            <Button
                icon="sap-icon://action"
                tooltip="Action header"
                press="onHeaderAction" />
        </headerContent>

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
                    <Button
                        text="Retour"
                        press="onNavBack" />
                </contentLeft>

                <contentRight>
                    <Button
                        text="Valider"
                        type="Emphasized"
                        press="onValidate" />
                </contentRight>
            </Bar>
        </footer>

    </Page>

</mvc:View>
```

### 🍧 EXEMPLE POUR SAP.F.DYNAMICPAGE

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

                <!-- Actions équivalentes au headerContent de sap.m.Page -->
                <f:actions>
                    <Button
                        icon="sap-icon://action"
                        tooltip="Action header"
                        press="onHeaderAction" />
                </f:actions>

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

                <Button
                    text="Retour"
                    press="onNavBack" />

                <ToolbarSpacer />

                <Button
                    text="Valider"
                    type="Emphasized"
                    press="onValidate" />

            </OverflowToolbar>
        </f:footer>

    </f:DynamicPage>

</mvc:View>
```

## 🧩 IMPLEMENTATION EVENT ONVALIDATE

> [!IMPORTANT]
> Dans le fichier webapp/controller/Home.controller.js :
>
> - ajoutez "sap.m.MessageToast" dans les dépendances

```js
sap.ui.define(
  [
    "fr/stms/bc/appdemofgi/controller/BaseController",
    "fr/stms/bc/appdemofgi/libs/Formatter",
    "sap/m/MessageToast",
  ],
  /**
   * @param {fr.stms.bc.appdemofgi.controller.BaseController} BaseController - Contrôleur de base avec toutes les fonctions utilitaires
   * @param {Object} Formatter - Module utilitaire pour gérer les icônes, boutons, états et styles dans l'UI
   */
  (BaseController, Formatter, MessageToast) => {
    //...
  },
);
```

> [!IMPORTANT]
> Dans le fichier webapp/controller/Home.controller.js :
>
> - ajoutez le snippet ci-dessous en dessous de la fonction onInit() (ne pas oublié d'ajouter la virgule à la fin de la fonction onInit() !):

```js
/**
 * @function onValidate
 * @memberof fr.stms.bc.appdemofgi.controller.Home
 * @description
 * Cette fonction est déclenchée lorsque le bouton "Valider" est cliqué (événement `press`).
 * Elle peut contenir toute logique nécessaire pour répondre à l'action de l'utilisateur,
 * par exemple afficher un message, lancer un traitement ou naviguer vers une autre vue.
 *
 * @param {sap.ui.base.Event} oEvent - L'événement déclenché par le bouton.
 *                                     Contient des informations sur le bouton et l'interaction.
 *
 * @example
 * // Dans le XML d'une vue
 * <Button
 *     text="Cliquer ici"
 *     press="onButtonPress" />
 *
 * // Dans le controller
 * onButtonPress: function(oEvent) {
 *     MessageToast.show("Bouton cliqué !");
 * }
 */
onValidate: function () {
    MessageToast.show("Bouton validé");
}
```

> [!NOTE]
> Il est possible d'utiliser "sap.m.MessageToast" directement dans les fonctions sans avoir besoin de l'importer dans les Dépendances mais cela n'est pas une bonne pratique.
>
> Pour tester cette méthode, il vous suffit de retirer "sap.m.MessageToast" des Dépendances et de directement l'utiliser comme le montre l'exemple ci-dessous.

```js
onValidate: function(oEvent) {
    sap.m.MessageToast.show("Bouton validé");
}
```
