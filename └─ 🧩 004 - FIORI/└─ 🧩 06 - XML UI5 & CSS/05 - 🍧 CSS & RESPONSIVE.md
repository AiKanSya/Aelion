# 🌸 CSS & RESPONSIVE

> 🌺 Objectifs
>
> - [ ] Comprendre comment SAP Fiori/UI5 adapte une application à différents écrans :
>   - smartphone
>   - tablette
>   - desktop
> - [ ] Comprendre les layouts UI5 responsives

## 🧩 RESPONSIVE DESIGN

Le responsive design est un système qui permet à une interface de :

     s’adapter automatiquement à la taille de l’écran

Exemples :

- téléphone
- tablette
- ordinateur

Objectif :

- conserver une bonne lisibilité
- éviter les débordements
- améliorer l'expérience utilisateur

## 🧩 COMMENT UI5 GÈRE LE RESPONSIVE

SAPUI5 est conçu pour être responsive par défaut.

Le développeur ne construit généralement pas plusieurs écrans.

UI5 adapte automatiquement :

- taille des composants
- disposition
- affichage des contrôles
- comportement des layouts

Cela repose sur :

- composants sap.m
- layouts responsives
- CSS standard Fiori

## 🧩 MOBILE FIRST

SAPUI5 suit le principe :

     Mobile
     ↓
     Tablet
     ↓
     Desktop

Le développement commence pour les petits écrans puis s'étend aux grands écrans.

## 🧩 LIBRARY PRINCIPALE : sap.m

sap.m contient les contrôles Fiori responsives.

| Composant    |               Rôle |
| ------------ | -----------------: |
| sap.m.Button |             bouton |
| sap.m.Input  |             saisie |
| sap.m.Table  | tableau responsive |
| sap.m.Page   |               page |
| sap.m.List   |              liste |

## 🧩 HBOX ET VBOX

#### 🌺 HBox :

Disposition horizontale :

     [A] [B] [C]

Exemple :

```xml
<HBox>
    <items>
        <Button text="A"/>
        <Button text="B"/>
        <Button text="C"/>
    </items>
</HBox>
```

#### 🌺 VBox :

Disposition verticale :

     [A]
     [B]
     [C]

Exemple :

```xml
<VBox>
    <items>
        <Button text="A"/>
        <Button text="B"/>
        <Button text="C"/>
    </items>
</VBox>
```

Important :

HBox ne devient pas automatiquement VBox

Si un comportement dynamique est souhaité :

- FlexBox
- ResponsiveGridLayout
- GridData

## 🧩 FLEXBOX

FlexBox permet une disposition dynamique.

Exemple :

```xml
<FlexBox wrap="Wrap">
    <items>
        <Button text="Nom"/>
        <Button text="Ville"/>
        <Button text="Valider"/>
    </items>
</FlexBox>
```

Comportement :

- Desktop :

  [Nom] [Ville] [Valider]

- Mobile :

      [Nom]
      [Ville]
      [Valider]

## 🧩 CSS DANS SAPUI5

Le CSS sert principalement à :

- marges
- alignements
- tailles spécifiques
- ajustements visuels

Exemple :

```css
.myButton {
  margin: 10px;
  width: 100%;
}
```

Dans XML :

```xml
<Button
    text="Valider"
    class="myButton"/>
```

## 🧩 CLASSES CSS FOURNIES PAR UI5

UI5 fournit déjà beaucoup de classes CSS.

Exemples :

| Classe                    |                    Utilité |
| ------------------------- | -------------------------: |
| sapUiSmallMargin          |               petite marge |
| sapUiMediumMargin         |              marge moyenne |
| sapUiLargeMargin          |               grande marge |
| sapUiResponsiveMargin     |           marge responsive |
| sapUiHideOnMobile         |             masquer mobile |
| sapUiVisibleOnlyOnDesktop | visible desktop uniquement |

Exemple :

```xml
<Button
    text="Valider"
    class="sapUiResponsiveMargin"/>
```

## 🧩 BREAKPOINTS

UI5 adapte automatiquement selon la largeur :

| Type   |   Appareil |
| ------ | ---------: |
| Small  |  téléphone |
| Medium |   tablette |
| Large  | ordinateur |

## 🧩 TESTER LE RESPONSIVE DANS LE NAVIGATEUR

Pendant le développement, il est inutile d'utiliser un vrai téléphone ou une vraie tablette.

Les navigateurs possèdent un mode permettant de simuler différents appareils.

Exemple :

     Application
     ↓
     Navigateur
     ↓
     Mode appareil
     ↓
     Téléphone / Tablette / Desktop

### 🍧 GOOGLE CHROME / MICROSOFT EDGE

Ouvrir les outils développeur :

#### 🌺 Windows / Linux

     F12

ou

     Ctrl + Shift + I

#### 🌺 Mac

     Cmd + Option + I

Activer le mode appareil :

     Ctrl + Shift + M

ou cliquer sur l'icône :

     📱 Toggle Device Toolbar

### 🍧 CHOISIR UN APPAREIL

En haut du navigateur :

Exemples disponibles :

     iPhone SE
     iPhone 14
     Galaxy S20
     iPad Air
     iPad Mini
     Responsive

Exemple :

#### 🌺 Desktop :

     -------------------------------------
     | Nom | Ville | Pays | Valider |
     -------------------------------------

iPhone :

     -----------------
     | Nom          |
     | Ville        |
     | Pays         |
     | Valider      |
     -----------------

### 🍧 MODE RESPONSIVE PERSONNALISÉ

Le mode :

     Responsive

permet de définir :

     largeur
     hauteur

Exemple :

     320 x 640
     768 x 1024
     1920 x 1080

Très utile pour observer les changements de comportement UI5.

## 🧩 OBSERVATIONS À FAIRE

Pendant les tests vérifier :

- Les boutons restent visibles
- Aucun texte n'est coupé
- Aucun scroll horizontal n'apparaît
- Les formulaires restent lisibles
- Les tableaux s'adaptent correctement
- Les marges restent cohérentes

## 🧩 BONNES PRATIQUES

- Utiliser sap.m autant que possible
- Utiliser ResponsiveGridLayout
- Utiliser FlexBox
- Éviter tailles fixes
- Tester téléphone + desktop
- Utiliser les classes CSS UI5 avant CSS personnalisé
