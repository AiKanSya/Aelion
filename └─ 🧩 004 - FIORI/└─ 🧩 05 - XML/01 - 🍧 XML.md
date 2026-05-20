# 🌸 XML

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle du XML dans SAP UI5/Fiori et comment il est utilisé pour construire les interfaces utilisateur.

## 🧩 XML

XML signifie :

     eXtensible Markup Language

XML est un langage de description.

Il sert à :

- structurer des données
- structurer des interfaces UI5
- décrire des composants UI sans logique métier

Dans SAP UI5 :

     XML = description de l’écran (View)

### 🍧 ROLE DU XML DANS SAP UI5

Dans une application Fiori :

     Model → données
     Controller → logique
     View XML → interface

Le XML est utilisé pour la View.

## 🧩 ID/CLASS CONVENTION

Il n'existe pas de convention officielle SAP unique et obligatoire pour les IDs UI5/Fiori. SAP recommande surtout des IDs clairs, cohérents et maintenables.

Conventions couramment utilisées en projets Fiori :

| Type composant | Préfixe fréquent | Exemple         |
| -------------- | ---------------: | --------------- |
| Button         |              btn | btnSave         |
| Input          |              inp | inpNom          |
| Text           |              txt | txtClient       |
| Label          |              lbl | lblNom          |
| Table          |              tbl | tblEmployes     |
| List           |              lst | lstClients      |
| Dialog         |              dlg | dlgConfirmation |
| Page           |               pg | pgAccueil       |
| VBox           |              vbx | vbxMain         |
| HBox           |              hbx | hbxHeader       |
| Icon           |              ico | icoDelete       |

## 🧩 EXEMPLE : COMPOSANT TEXT (sap.m.Text)

> [!NOTE]
> Path : `webapp` → `view` → `Home.view.xml`

> [!CAUTION]
> Ne pas oublier de modifier le(s) Namespace(s) par le votre !

```xml
<mvc:View
    controllerName="fr.stms.fgifirstappmodulename.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Page id="page" title="{i18n>title}">

        <Text id="txtWelcome" text="Bienvenue"/>

    </Page>

</mvc:View>
```

Affichage :

     Bonjour !

Explication :

     <Text>
     ↓
     Composant UI

     text="Bonjour"
     ↓
     Contenu affiché

## 🧩 EXEMPLE : COMPOSANT TEXT (sap.m.Text) ET BUTTON (sap.m.Button)

> [!NOTE]
> Path : `webapp` → `view` → `Home.view.xml`

> [!CAUTION]
> Ne pas oublier de modifier le(s) Namespace(s) par le votre !

```xml
<mvc:View
    controllerName="fr.stms.fgifirstappmodulename.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Page id="page" title="{i18n>title}">

        <content>

            <Text id="txtWelcome" text="Bienvenue"/>
            <Button id="btnConfirm" text="Valider"/>

        </content>

    </Page>

</mvc:View>
```

### 🍧 EXPLICATION DE LA STRUCTURE

     mvc:View
     ↓
     Vue SAPUI5

     Page
     ↓
     Écran principal

     content
     ↓
     Zone d’affichage

     Text / Button
     ↓
     Composants UI

## 🧩 TYPES DE XML UTILISES

### 🍧 VIEW XML

Utilisé pour les interfaces :

```xml
<mvc:View>
```

### 🍧 FRAGMENT XML

Petit composant réutilisable :

```xml
<Dialog title="Info">
```

Utilisé pour :

- popup
- dialogues
- composants réutilisables

### 🍧 EXEMPLE AVEC LISTE

XML :

```xml
<List items="{/Employes}">
     <items>
          <StandardListItem title="{Nom}" />
     </items>
</List>
```

Modèle :

```json
{
  "Employes": [{ "Nom": "Martin" }, { "Nom": "Jean" }]
}
```

Résultat :

     Martin
     Jean

## 🧩 REGLES IMPORTANTES XML UI5

- XML est hiérarchique
- Chaque balise doit être fermée
- Sensible à la structure
- Utilisé uniquement pour la vue
- Pas de logique métier dans XML
- Utilisé avec MVC

## 🧩 ERREURS FREQUENTES

### 🍧 BALISE NON FERMEE

```xml
<Text text="Bonjour"
```

Erreur :

     XML invalide

### 🍧 MAUVAISE STRUCTURE

```xml
<Button>
<Text/>
</Button>
```

UI5 attend une structure correcte selon le composant.

### 🍧 MAUVAIS BINDING

```xml
<Text text="nom" />
```

au lieu de :

```xml
<Text text="{/nom}" />
```

Résultat :

     Affiche "nom" au lieu de la valeur

## 🧩 EXEMPLE CONCRET

```xml
<mvc:View
xmlns:mvc="sap.ui.core.mvc"
xmlns="sap.m">

<Page title="Employé">

<content>

<Text text="{/nom}" />
<Input value="{/ville}" />
<Button text="OK"/>

</content>

</Page>

</mvc:View>
```

Model

```json
{
  "nom": "Martin",
  "ville": "Toulouse"
}
```

Résultat

     Martin
     [Toulouse]
     [ OK ]

## 🧩 POINTS IMPORTANTS A RETENIR

- XML = langage de description
- Utilisé pour les Views SAPUI5
- Structure hiérarchique
- Utilise Data Binding
- Aucun traitement logique dans XML
- Très utilisé dans Fiori
