# 🌸 MVC

> 🌺 Objectifs
>
> - [ ] Comprendre l’architecture MVC en SAP UI5
> - [ ] Savoir identifier Model / View / Controller
> - [ ] Savoir utiliser MVC correctement dans une app Fiori
> - [ ] Éviter la logique dans la View
> - [ ] Comprendre le flux de données UI5

## 🧩 CONCEPT MVC

`MVC` = `Model` – `View` – `Controller`

C’est une architecture qui sépare une application en 3 parties :

- Model : données
- View : interface utilisateur
- Controller : logique

### 🍧 POURQUOI UTILISER MVC EN UI5 ?

Sans `MVC` :

- code mélangé
- maintenance difficile
- erreurs fréquentes
- logique dispersée

Avec `MVC` :

- séparation claire
- code maintenable
- réutilisable
- testable

### 🍧 3 COMPOSANTS DU MVC

#### 🌺 MODEL (M)

Rôle :

     Contient les données uniquement.

Types en UI5 :

     ODataModel (SAP)
     JSONModel (local)

Exemple :

```js
var oData = {
  IdSession: "S001",
  IdConsultant: "C001",
  Entreprise: "SAP",
  Name: "Martin",
  DateBirth: "\/Date(631152000000)\/",
  City: "Paris",
  Region: "IDF",
  Country: "FR",
  Lang: "FR",
};
```

Règles :

- ne contient pas de logique UI
- ne gère pas l’affichage
- source de données unique

#### 🌺 VIEW (V)

Rôle :

     Affichage de l’interface utilisateur.

Exemple XML UI5 :

```xml
<Text text="{/Name}" />
```

Contenu typique :

- Table
- Input
- Button
- Text

Règles :

- aucune logique métier
- uniquement affichage + binding
- déclenche des événements

#### 🌺 CONTROLLER (C)

Rôle :

     Logique de l’application.

Exemple :

```js
onPress: function () {
    sap.m.MessageToast.show("Click OK");
}
```

Responsabilités :

- gérer les événements
- appeler le Model
- traiter les données
- mettre à jour la View

## 🧩 FLUX UI5 REEL

     Utilisateur
     ↓
     View (clic / interaction)
     ↓
     Controller (logique)
     ↓
     Model (données)
     ↓
     Controller (traitement)
     ↓
     View (affichage mis à jour)

> [!WARNING]
> UI5 n’est pas une boucle stricte : les interactions sont déclenchées par événements + binding.

## 🧩 EXEMPLE SIMPLE COMPLET

Modifier :

    webapp/view/Home.view.xml

Code :

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
        <Table items="{/SessionSet}">
            <columns>
                <Column>
                    <Text text="Session" />
                </Column>
                <Column>
                    <Text text="Site" />
                </Column>
            </columns>

            <items>
                <ColumnListItem>
                    <cells>
                        <Text text="{IdSession}" />
                        <Text text="{Site}" />
                    </cells>
                </ColumnListItem>
            </items>
        </Table>

    </Page>
</mvc:View>
```

> [!CAUTION]
> Remplacer `fgifirstappmodulename` par le namespace de votre application !

Modifier :

    webapp/controller/Home.controller.js

Code :

```js
sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("fr.stms.fgifirstappmodulename.controller.Home", {
    onInit: function () {
      // var oModel = this.getOwnerComponent().getModel();
      // oModel.read("/SessionSet", {
      //     success: function (data) {
      //         console.table(data.results);
      //     },
      //     error: function (err) {
      //         console.error(err);
      //     }
      // });
      // oModel.read("/ConsultantSet", {
      //     success: function (data) {
      //         console.table(data.results);
      //     },
      //     error: function (err) {
      //         console.error(err);
      //     },
      // });
    },
  });
});
```

> [!CAUTION]
> Remplacer `fgifirstappmodulename` par le namespace de votre application !

## 🧩 REGLES IMPORTANTES

- Le Model contient les données uniquement
- La View affiche uniquement les données
- Le Controller contient toute la logique
- Pas de logique métier dans XML
- Le Model est la source de vérité
