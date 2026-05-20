# 🌸 MVC

> 🌺 Objectifs
>
> - [ ] Comprendre le fonctionnement du modèle MVC dans SAP Fiori/UI5 afin de structurer correctement une application.
> - [ ] MVC est un modèle d'architecture qui sépare une application en plusieurs parties pour rendre le développement plus clair, plus organisé et plus facile à maintenir.

## 🧩 CONCEPT MVC

Comprendre le fonctionnement du modèle MVC dans SAP Fiori/UI5 afin de structurer correctement une application.

MVC est un modèle d'architecture qui sépare une application en plusieurs parties pour rendre le développement plus clair, plus organisé et plus facile à maintenir.

MVC signifie :

- M = Model
- V = View
- C = Controller

### 🍧 POURQUOI UTILISER MVC ?

Sans MVC :

- Tout le code est mélangé
- Difficile à comprendre
- Difficile à modifier
- Risque élevé d'erreurs

Avec MVC :

- haque élément a un rôle précis
- Code organisé
- Maintenance simplifiée
- Travail d'équipe facilité

### 🍧 3 COMPOSANTS DU MVC

#### 💮 Model (M)

Le Model contient les données.

Il représente :

données utilisateur
données SAP
données ODATA
données JSON
informations métier

Exemple :

```js
var oData = {
  nom: "Jean",
  age: 25,
};
```

Le modèle stocke :

```
Nom : Jean
Age : 25
```

Le modèle ne décide pas comment afficher les données.
Il stocke uniquement les informations.

#### 💮 View (V)

La View correspond à l'interface visible par l'utilisateur.

Elle contient :

- boutons
- champs de saisie
- tableaux
- textes
- formulaires

En SAPUI5, les vues sont souvent écrites en XML.

Exemple :

```xml
<Text text="{/nom}" />
<Input value="{/age}" />
```

Résultat affiché :

```
Nom : Jean
Age : 25
```

La vue affiche uniquement les données.
Elle ne contient pas la logique métier.

#### 💮 Controller (C)

Le Controller contient la logique de l'application.

Il gère :

- actions utilisateur
- clics sur boutons
- traitements
- appels aux données

Exemple :

```js
onPress: function() {
    MessageToast.show("Bouton cliqué");
}
```

Quand l'utilisateur clique :

     Utilisateur → Bouton
     Controller → Exécute une action
     Communication entre les composants

Schéma simplifié :

     Utilisateur
          ↓
     View
          ↓
     Controller
          ↓
     Model
          ↓
     Controller
          ↓
     View
          ↓
     Utilisateur

Explication :

- L'utilisateur clique sur un bouton
- La View détecte l'action
- Le Controller exécute un traitement
- Le Controller récupère les données du Model
- Le résultat est envoyé à la View
- La View affiche les données

## 🧩 POINTS A RETENIR

- ✔ Model = contient les données
- ✔ View = affiche les données
- ✔ Controller = gère les actions et traitements
- ✔ Les composants sont séparés
- ✔ SAPUI5 utilise fortement MVC
- ✔ Une bonne compréhension du MVC est indispensable avant ODATA et Data Binding
