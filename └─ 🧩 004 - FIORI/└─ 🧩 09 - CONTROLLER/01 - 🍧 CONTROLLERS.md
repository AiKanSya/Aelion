# 🌸 CONTROLLERS SAPUI5

> Objectifs
>
> [ ] - Comprendre le rôle exact d’un Controller SAPUI5
> [ ] - Comprendre le pattern MVC dans UI5 (View / Controller / Model)
> [ ] - Maîtriser le cycle de vie (lifecycle)
> [ ] - Comprendre l’héritage UI5 et sap.ui.define (AMD)
> [ ] - Savoir manipuler les événements UI et les modèles
> [ ] - Éviter les erreurs classiques (this, binding, async, OData)

## 🧩 CONTROLLER SAPUI5

Un Controller est une classe JavaScript associée à une View.

Rôle :

- gérer les événements UI (click, change, navigation)
- orchestrer les appels vers les modèles
- maintenir la logique de présentation
- synchroniser UI ↔ data

NON RESPONSABILITÉ :

- logique backend
- persistance
- calcul métier complexe
  → doit être déporté (services / backend)

## 🧩 MODULE AMD SAPUI5 (sap.ui.define)

SAPUI5 utilise le standard AMD (Asynchronous Module Definition)

Exemple :

```js
sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  /* ... */
});
```

EXPLICATION :

- `sap.ui.define` = système de modules SAPUI5
- équivalent de import/export ESModules
- chargement ASYNCHRONE des dépendances

AMD = Asynchronous Module Definition

- chargement non bloquant des modules JS
- chaque fichier est un module isolé
- dépendances déclarées explicitement en tableau

STRUCTURE :

1. tableau de dépendances (paths UI5)
2. fonction callback avec injections correspondantes

IMPORTANT :

ordre des paramètres = ordre du tableau

## 🧩 OÙ TROUVER LES MODULES IMPORTABLES (SOURCE OFFICIELLE)

[SAPUI5 SDK (documentation officielle)](https://ui5.sap.com)

C’est la référence principale.

On y trouve :

- tous les modules (sap.m.MessageToast, sap.ui.model..., etc.)
- leurs chemins AMD
- leurs API

Exemple avec MessageToast :

- Import AMD :

  ```js
  sap.ui.define([
  "sap/m/MessageToast"
  ], function (MessageToast) {
       /* ... */
  }
  ```

- Utilisation :

  ```js
  onInit: function () {
     /* ... */
     MessageToast.show("Hello");
  }
  ```

Comment trouver le bon Path ?

1.  Tu connais le nom UI5 :

        MessageToast

2.  Tu ajoutes le namespace :

        sap.m.MessageToast

3.  Tu transformes en chemin AMD :

        sap/m/MessageToast

## 🧩 HÉRITAGE UI5

Exemple :

```js
return Controller.extend("namespace.Controller", {
  /* ... */
});
```

EXPLICATION :

- Controller.extend = mécanisme d’héritage UI5
- permet de créer une classe dérivée du Controller de base
- équivalent JS : class extends Controller

HÉRITAGE IMPLIQUE :

- accès aux méthodes parent :

  this.getView()
  this.getOwnerComponent()

- surcharge de méthodes :

  onInit(), onBeforeRendering(), etc.

> [!NOTE]
> La surcharge = redéfinir une méthode héritée dans un enfant.
> Exemple :
>
> - BaseController :
>
>   ```js
>   onInit: function () {
>        console.log("Base init");
>   }
>   ```
>
> - Home Controller :
>
>   ```js
>   onInit: function () {
>        console.log("Home init");
>   }
>   ```
>
> Résultat :
>
> - la version Home remplace celle du parent
> - la version parent est ignorée sauf appel explicite

## 🧩 INSTANCE (CONCEPT IMPORTANT)

Un Controller n’est PAS un objet statique.

C’est une INSTANCE créée automatiquement par UI5.

CONCRÈTEMENT :

- 1 View = 1 instance de Controller (en général)
- UI5 instancie la classe automatiquement
- this = instance courante du controller

EXEMPLE :

```js
onInit: function () {
console.log(this); // instance du controller
}
```

IMPACT :

- chaque view a son propre état
- this.getView() pointe vers la vue associée
- isolation entre écrans

## 🧩 LIFECYCLE SAPUI5

     Cycle de vie = méthodes appelées automatiquement par UI5

```js
onInit();
```

- appelé une seule fois à la création du controller
- utilisé pour :
  - initialiser modèles
  - injecter services
  - lancer appels backend

```js
onBeforeRendering();
```

- appelé avant affichage de la view
- rarement utilisé
- utile pour recalcul UI avant rendu

```js
onAfterRendering();
```

- appelé après affichage DOM
- utilisé pour manipulation DOM directe (rare)
- déconseillé en UI5 moderne

```js
onExit();
```

- appelé lors de destruction du controller
- nettoyage :
  - timers
  - subscriptions
  - ressources

## 🧩 CONTEXT "this" (CRITIQUE)

IDÉE DE BASE :

     this = "l’objet qui exécute la fonction"

Le problème : en JavaScript, `this` change selon le contexte d’exécution.

### 🍧 CAS SIMPLE (OK)

```js
onInit: function () {
  this.getView(); // OK
}
```

Pourquoi ça marche ?

- la fonction est appelée par UI5
- UI5 fixe `this` = Controller

### 🍧 CAS PROBLÉMATIQUE (ERREUR CLASSIQUE)

```js
oModel.read("/SessionSet", {
  success: function () {
    this.getView(); // ❌ ERREUR
  },
});
```

Ce qui se passe :

     Dans success, JavaScript appelle la fonction tout seul.

Donc :

     this n’est PLUS le Controller
     this devient undefined (strict mode) ou autre contexte interne

### 🍧 RÈGLE SIMPLE À RETENIR

| Où tu es                          | `this` vaut     |
| --------------------------------- | --------------- |
| Méthode du Controller             | OK (Controller) |
| Callback classique (`function()`) | ❌ perdu        |

### 🍧 POURQUOI THIS SE PERD ?

Parce que JavaScript ne “transporte pas” automatiquement le contexte.

```js
success: function () { }
```

UI5 exécute juste la fonction, sans lien avec le Controller.

### 🍧 SOLUTION 1 (MODERNE) : ARROW FUNCTION

```js
success: (oData) => {
  this.getView(); // OK
};
```

Pourquoi ça marche ?

     () => { ... } ne crée PAS son propre this
     il garde celui du Controller

### 🍧 SOLUTION 2 (ANCIENNE) : VARIABLE THAT

```js
var that = this;

success: function () {
  that.getView(); // OK
}
```

idée :

     on "sauvegarde" le Controller dans une variable

## 🧩 POINT ESSENTIEL

Controller SAPUI5 n’est PAS :

- un backend
- un stockage
- une logique métier lourde

Controller SAPUI5 EST :

- un chef d’orchestre UI
- un gestionnaire d’événements
- un coordinateur de flux asynchrones

This :

- toujours utiliser une fonction fléchée () => {...} dans les callbacks OData
