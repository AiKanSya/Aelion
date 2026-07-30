# 🌸 EXERCICES

## 🌺 OBJECTIFS

- [ ] Comparer la solution proposée avec sa propre démarche.
- [ ] Expliquer chaque étape de la correction.
- [ ] Identifier les erreurs possibles et leur cause.
- [ ] Reproduire la solution sans recopier le support.
## 🌺 VUE D'ENSEMBLE

```mermaid
flowchart TD
    A["EXERCICES"]
    A --> B["Lire la consigne"]
    B --> C["Identifier les données"]
    C --> D["Construire la solution"]
    D --> E["Vérifier le résultat"]
```


## 🌺 EXERCICE 1 - COMPRENDRE UNE PROPERTY

### 🍧 Énoncé

Home.view.xml

     webapp/view/Home.view.xml

Créer 4 boutons avec les Properties :

     texte     = "Valider"
     Bouton    = <désactivé>
     largeur   = <200px>
     Type      = "Accept"

- [sap.m.Button - Class](https://sapui5.netweaver.ondemand.com/#/api/sap.m.Button%23overview)
- [sap.m.Button - Samples](https://sapui5.netweaver.ondemand.com/#/entity/sap.m.Button)

#### 💮 Correction

```xml
<Button
    text="Valider"
    enabled="false"
    width="200px"
    type="Accept"
/>
```

## 🌺 EXERCICE 2 - COMPRENDRE UN EVENT

### 🍧 Énoncé

Home.view.xml

     webapp/view/Home.view.xml

1. Ajouter l'Event press en lui assignant la fonction `onPress`.

2. "Activer" le Button.

3. Ajouter la fonction `onPress` dans le Home.controller.js (webapp/controller/Home.controller.js) :

```js
sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("fr.stms.fgifirstappmodulename.controller.Home", {
    onInit: function () {},

    onPress: function (oEvent) {
      console.log("Bouton pressé");
    },
  });
});
```

> [!CAUTION]
> Remplacer `fgifirstappmodulename` par le namespace de votre application !

#### 💮 Correction

```xml
<mvc:View
    controllerName="fr.stms.fgifirstappmodulename.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
>
    <Page
        id="page"
        title="{i18n>title}"
    >
        <Button
            text="Valider"
            enabled="true"
            width="200px"
            type="Accept"
            press="onPress"
        />
    </Page>
</mvc:View>
```

## 🌺 EXERCICE 3 - COMPRENDRE UNE ASSOCIATION

### 🍧 Énoncé

Home.view.xml

     webapp/view/Home.view.xml

1. Associer Label et Input

Relier :

```xml
<Label text="Nom" />
```

avec

```xml
<Input id="inputName"/>
```

- [sap.m.Input - Class](https://sapui5.netweaver.ondemand.com/#/api/sap.m.Input)
- [sap.m.Input - Samples](https://sapui5.netweaver.ondemand.com/#/entity/sap.m.Input)

#### 💮 Correction

```xml
<mvc:View
    controllerName="fr.stms.fgifirstappmodulename.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
>
    <Page
        id="page"
        title="{i18n>title}"
    >
        <Label
            text="Nom"
            labelFor="inputName"
        />

        <Input id="inputName" />

        <Button
            text="Valider"
            enabled="true"
            width="200px"
            type="Accept"
            press="onPress"
        />

    </Page>
</mvc:View>
```

## 🌺 EXERCICE 4 - COMPRENDRE UNE AGGREGATION

### 🍧 Énoncé

Home.view.xml

     webapp/view/Home.view.xml

1. Ajouter un footer au composant sap.m.Page

- [sap.m.Page - Class](https://sapui5.netweaver.ondemand.com/#/api/sap.m.Page%23aggregations)
- [sap.m.Page - Samples](https://sapui5.netweaver.ondemand.com/#/entity/sap.m.Page)

2. Déplacer le bouton dans le footer

3. Positionner le bouton à droite dans le footer

#### 💮 Correction

```xml
<mvc:View
    controllerName="fr.stms.fgifirstappmodulename.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
>
    <Page
        id="page"
        title="{i18n>title}"
    >
        <Label
            text="Nom"
            labelFor="inputName"
        />

        <Input id="inputName" />

        <footer>
            <OverflowToolbar>
                <Button
                    text="Valider"
                    enabled="true"
                    width="200px"
                    type="Accept"
                    press="onPress"
                />
            </OverflowToolbar>
        </footer>
    </Page>
</mvc:View>

```

## 🌺 RÉSUMÉ

> - **Exercice 1 - comprendre une property :** webapp/view/Home.view.xml
> - **Exercice 2 - comprendre un event :** webapp/view/Home.view.xml
> - **Exercice 3 - comprendre une association :** webapp/view/Home.view.xml

<details>
<summary>🍧 Afficher l’auto-évaluation</summary>

- [ ] Je peux définir **EXERCICES** avec mes propres mots.
- [ ] Je peux expliquer **exercice 1 - comprendre une property** sans relire le chapitre.
- [ ] Je peux appliquer ou illustrer **exercice 2 - comprendre un event** dans un exemple simple.
- [ ] Je peux identifier au moins une erreur fréquente ou une limite liée à cette notion.

</details>
