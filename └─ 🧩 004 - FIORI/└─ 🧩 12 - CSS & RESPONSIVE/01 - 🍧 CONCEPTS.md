# 🌸 CSS & RESPONSIVE

> 🌺 Objectifs
>
> - [ ] Comprendre comment SAP Fiori/UI5 adapte automatiquement une application à tous les écrans :
>   - smartphone
>   - tablette
>   - desktop

## 🧩 RESPONSIVE DESIGN

Le responsive design est un système qui permet à une interface de :

     s’adapter automatiquement à la taille de l’écran

## 🧩 PRINCIPE DANS SAP FIORI/UI5

UI5 est déjà conçu pour être responsive car SAP Fiori UI5 est nativement responsive.
Le développeur ne force pas le responsive.

Il l’exploite via :

- composants sap.m
- layouts UI5
- bonnes pratiques CSS Fiori

Cela repose sur :

- sap.m (bibliothèque mobile-first)
- FlexBox
- Grid Layout
- CSS Fiori standard

SAP Fiori impose :

- lisibilité
- simplicité
- adaptation automatique
- suppression du superflu

### 🍧 COMPORTEMENT SANS RESPONSIVE

Desktop :

     [ Nom ][ Ville ][ Bouton ]

Mobile :

     texte coupé ou mal aligné

Problèmes :

- mauvaise lisibilité
- scroll horizontal
- UX dégradée

### 🍧 COMPORTEMENT AVEC RESPONSIVE

Desktop :

     [ Nom ] [ Ville ] [ Bouton ]

Mobile :

     [ Nom ]
     [ Ville ]
     [ Bouton ]

UI5 adapte automatiquement.

## 🧩 CONCEPT CLE : MOBILE FIRST

SAP Fiori suit le principe :

     Mobile d’abord → puis adaptation tablette → puis desktop

### 🍧 SAPUI5 ET SAP.M

La bibliothèque principale pour le responsive :

     sap.m

Caractéristiques :

- composants flexibles
- adaptation automatique
- design Fiori standard

Exemples :

- sap.m.Button
- sap.m.Input
- sap.m.Table
- sap.m.Page

### 🍧 FLEXBOX

FlexBox permet d’organiser les éléments dynamiquement.

Exemple XML :

```xml
<HBox>
    <Text text="Nom"/>
    <Input/>
</HBox>
```

Résultat :

     Horizontal sur grand écran
     Vertical si espace réduit

### 🍧 VBOX ET HBOX

HBox (Horizontal)

     [ A ] [ B ] [ C ]

VBox (Vertical)

     [ A ]
     [ B ]
     [ C ]

Exemple UI5 responsive

```xml
<VBox>
    <Input placeholder="Nom"/>
    <Input placeholder="Ville"/>
    <Button text="Valider"/>
</VBox>
```

Résultat :

Mobile :

     Nom
     Ville
     Valider

Desktop :

     aligné selon espace disponible

## 🧩 CSS DANS SAPUI5

CSS est utilisé pour :

- ajuster styles
- couleurs
- marges
- alignement

Exemple :

```css
.myButton {
  margin: 10px;
  width: 100%;
}
```

## 🧩 RESPONSIVE AVEC LES CLASSES SAPUI5

UI5 fournit des classes CSS :

     sapUiSmallMargin
     sapUiResponsiveMargin
     sapUiHideOnMobile
     sapUiVisibleOnlyOnDesktop

### 🍧 EXEMPLE

```xml
<Button
text="Valider"
class="sapUiResponsiveMargin"/>
```

## 🧩 LAYOUT SAPUI5

UI5 utilise des layouts responsives :

     GridLayout
     FlexBox
     ResponsiveGridLayout

### 🍧 ResponsiveGridLayout

```xml
<SimpleForm layout="ResponsiveGridLayout">
```

Comportement :

     Desktop : champs côte à côte
     Mobile : champs empilés

### 🍧 EXEMPLE FORMULAIRE

```xml
<SimpleForm layout="ResponsiveGridLayout">

    <Label text="Nom"/>
    <Input/>

    <Label text="Ville"/>
    <Input/>

</SimpleForm>
```

## 🧩 BREAKPOINTS

UI5 adapte selon largeur écran :

- Small (phone)
- Medium (tablet)
- Large (desktop)

## 🧩 BONNES PRATIQUES

- Utiliser sap.m uniquement
- Utiliser FlexBox / Grid
- Éviter tailles fixes
- Tester mobile + desktop
- Utiliser ResponsiveGridLayout
