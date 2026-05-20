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

### 🍧 EXEMPLE SIMPLE

Code XML :

```xml
<Text text="Bonjour"/>
```

Affichage :

     Bonjour

Explication :

     <Text>
     ↓
     Composant UI

     text="Bonjour"
     ↓
     Contenu affiché

### 🍧 XML DANS SAP UI5 (VIEW)

Exemple complet de View :

```xml
<mvc:View
xmlns:mvc="sap.ui.core.mvc"
xmlns="sap.m">

<Page title="Exemple">

<content>

<Text text="Bienvenue"/>
<Button text="Valider"/>

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

## 🧩 XML & DATA BINDING

XML permet de lier les données du Model.

Exemple :

```xml
<Text text="{/nom}" />
```

Modèle :

```json
{
  "nom": "Martin"
}
```

Affichage :

     Martin

Explication :

     {/nom}
     ↓
     liaison avec le Model

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
