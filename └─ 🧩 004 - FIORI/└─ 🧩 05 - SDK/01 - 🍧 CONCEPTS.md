# 🌸 SDK

> 🌺 Objectifs
>
> - [ ] Comprendre ce qu'est le SDK dans SAPUI5 et pourquoi il est indispensable pour développer une application Fiori.

## 🧩 SOFTWARE DEVELOPMENT KIT

SDK signifie :

     Software Development Kit

En français :

     Kit de développement logiciel

Le [SDK SAPUI5](https://ui5.sap.com/) est la documentation officielle qui contient tous les outils et informations nécessaires pour développer une application Fiori.

[![](./assets/Capture%20d’écran%202026-05-20%20143941.png)](https://ui5.sap.com/)

## 🧩 POURQUOI UTILISER SDK

Pendant le développement, un développeur doit souvent savoir :

- quel composant utiliser
- quelles propriétés existent
- quels événements sont disponibles
- comment écrire le code correctement
- voir des exemples fonctionnels

Le SDK répond à ces besoins.

Le SDK SAPUI5 contient :

- documentation des contrôles
- exemples de code
- API SAPUI5
- événements
- propriétés
- méthodes
- modèles d'application
- tutoriels

Schéma simplifié

     Développeur
     ↓
     SDK
     ↓
     Documentation
     Exemples
     API
     Composants

### 🍧 EXEMPLE CONCRET

Supposons qu'un développeur veut ajouter un bouton et recherche "button" sur le SDK.

![](./assets/Capture%20d’écran%202026-05-20%20144040.png)

Il va d'abord visualiser et tester les exemples ("samples)

![](./assets/Capture%20d’écran%202026-05-20%20144150.png)

![](./assets/Capture%20d’écran%202026-05-20%20144256.png)

![](./assets/Capture%20d’écran%202026-05-20%20144329.png)

Si le composant et le comportement correspond, il va lire la documentation référence de ce composant en cliquant sur `API Reference`

![](./assets/Capture%20d’écran%202026-05-20%20144538.png)

![](./assets/Capture%20d’écran%202026-05-20%20144643.png)

Le SDK fournit alors :

#### 🌺 Class :

     sap.m.Button

#### 🌺 Nom :

     Button

#### 🌺 Overview :

     <Description du composant, usage ...>

#### 🌺 Constructor

```
new sap.m.Button(sId?, mSettings?)
```

     sId       → identifiant du bouton
     mSettings → objet de paramètres

     "s" signifie "String"
     "m" signifie "mapping object"

Exemple :

```js
new sap.m.Button("btn1", {
  text: "Valider",
  enabled: true,
  press: onPressHandler,
});
```

Pourquoi "m" ?

SAPUI5 utilise une convention interne :

| Préfixe | Signification                |
| ------- | ---------------------------- |
| s       | string                       |
| b       | boolean                      |
| i       | integer                      |
| o       | object                       |
| a       | array                        |
| m       | map (objet de configuration) |

#### 🌺 Properties :

Une property dans SAPUI5 est une valeur simple stockée dans un contrôle UI5. Elle décrit l’état ou le comportement d’un composant.

Les properties servent à :

- afficher du texte
- gérer l’état (actif/inactif)
- configurer l’apparence
- définir des comportements simples

Exemple :

     iconFirst      Determines whether the icon is displayed before the text.
     width          Defines the Button width.

#### 🌺 Aggregations :

Une aggregation est une propriété spéciale d’un contrôle UI5 qui permet de stocker des sous-éléments UI5 structurés.

Dans une classe UI5 (contrôle ou composant), les aggregations correspondent à des relations "contient / possède des éléments enfants"

Contrairement à :

     properties → valeurs simples (string, bool, int)
     aggregations → objets UI5 enfants

Image mentale :

     Button → pas d’aggregation utile
     Page → contient content (aggregation)
     Table → contient items (aggregation)
     VBox → contient items (aggregation)

#### 🌺 Associations :

Une association dans SAPUI5 est un lien logique entre deux contrôles UI5 sans relation de possession.

Contrairement aux aggregations :

     Aggregation = contient des enfants
     Association = référence vers un autre élément

Image mentale :

     Aggregation   → Parent possède enfant
     Association   → Parent connaît un autre élément

Association possible :

     Button → Label (référence)

#### 🌺 Events :

Un event (événement) dans SAPUI5 est une action déclenchée par l’utilisateur ou le système.

Les events servent à :

- détecter une interaction utilisateur
- exécuter une logique dans le Controller
- déclencher un traitement
- mettre à jour la View ou le Model

Schéma simple

     View (UI)
     ↓
     Event (clic / saisie)
     ↓
     Controller
     ↓
     Logique métier
     ↓
     Model / View mis à jour

#### 🌺 Methods :

Une méthode dans SAPUI5 est une fonction appartenant à un objet (Controller ou Control UI5).

Les méthodes servent à :

- exécuter une logique métier
- traiter les events
- manipuler le Model
- modifier la View
- réutiliser du code

Schéma simple :

     Event → Method → Traitement → Résultat

Où trouve-t-on des méthodes ?

1.  Controller (le plus important)

```js
onPress: function () {
     // méthode
}
```

2. Contrôles UI5

```js
onPress: function () {
     setText();
     getText();
     setEnabled();
}
```

3. Modèle (Model)

> [!Note]
> Méthode setModel

```js
var oData = {
  nom: "Martin",
  ville: "Toulouse",
};

var oModel = new sap.ui.model.json.JSONModel(oData);

this.getView().setModel(oModel);
```
