# 🌸 UI5 LIBRARY

> 🌺 Objectifs
>
> - [ ] Comprendre ce qu'est UI5, son rôle dans SAP Fiori et comment il permet de créer des interfaces utilisateurs.
> - [ ] Comprendre ce qu’est une UI5 Library
> - [ ] Savoir où trouver la documentation UI5
> - [ ] Savoir rechercher un composant UI5
> - [ ] Comprendre la structure d’une classe UI5 :
>   - [ ] Constructor
>   - [ ] Properties
>   - [ ] Aggregations
>   - [ ] Associations
>   - [ ] Events

## 🧩 UI5

UI5 signifie :

    User Interface for HTML5

UI5 est une bibliothèque contenant des composants prêts à utiliser pour créer une interface utilisateur.
Autrement dit, UI5 est un framework JavaScript développé par SAP permettant de créer des applications web modernes.

SAP Fiori est construit principalement avec SAPUI5.

Exemples de composants :

- boutons
- tableaux
- listes
- formulaires
- champs de saisie
- graphiques
- menus

Sans UI5 :

    Développeur
    ↓
    HTML + CSS + JavaScript manuel

Avec UI5 :

    Développeur
    ↓
    Composants UI5
    ↓
    Application

## 🧩 POURQUOI UTILISER UI5

Avantages :

- Développement plus rapide
- Composants prêts à l'emploi
- Responsive (ordinateur, tablette, téléphone)
- Intégration SAP
- Compatible avec ODATA
- Compatible avec MVC
- Compatible avec Fiori Design

## 🧩 ARCHITECTURE SIMPLIFIEE

    Utilisateur
    ↓
    Application Fiori
    ↓
    SAPUI5
    ↓
    ODATA
    ↓
    SAP Backend

Explication :

    SAPUI5
    ↓
    Affiche les données

    ODATA
    ↓
    Récupère les données

    SAP
    ↓
    Fournit les données

## 🧩 PRINCIPALE LIBRARY

Une `UI5 Library` est un ensemble de composants UI, de classes et de services fournis par SAP pour construire des interfaces Fiori.
Chaque `library` regroupe des composants ayant le même objectif.

SAPUI5 est composé de plusieurs bibliothèques. Les plus utilisées :

| Bibliothèque  | Utilité                     |
| ------------- | --------------------------- |
| sap.m         | Composants mobiles et Fiori |
| sap.ui.table  | Tableaux                    |
| sap.ui.layout | Mise en page                |
| sap.ui.core   | Fonctions principales       |
| sap.f         | Mise en page avancée Fiori  |

### 🍧 EXEMPLE SIMPLE AVEC BUTTON

Code XML :

```xml
<Button text="Valider" press="onValider"/>
```

Résultat symbolisé :

    ----------------
    | Valider      |
    ----------------

Explication :

    Button
        ↓
    Composant UI5

    text
        ↓
    Texte affiché

    press
        ↓
    Action exécutée au clic

## 🧩 OU TROUVER LA DOCUMENTATION UI5 ?

📘 https://ui5.sap.com

Sections clés :

- Documentation
- API Reference
- Samples

## 🧩 COMMENT RECHERCHER UN COMPOSANT UI5 ?

Un composant UI5 est toujours identifié par son nom complet :

    sap.m.Button
    sap.m.Input
    sap.m.Table

> [!TIP]
> Le préfixe `sap.m` indique la library. Il en existe d'autres.
>
> Le suffixe `Button` indique le composant (commence par une majuscule dans la `UI5 Library`)

## 🧩 COMMENT L'UTILISER ?

Un composant UI5 doit avoir sa classe présente parmi les dépendances. Si l'on souhaite par exemple utiliser la classe `sap.f`, on devra l'importer comme ceci dans la view concernée :

```xml
<mvc:View
    controllerName="fr.stms.bc.appdemofgi.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f"
    xmlns:table="sap.ui.table">

    <!-- ... -->

</mvc:View>
```

> [!CAUTION]
> Les préfixes XML doivent être unique :
>
> - `mvc` fait référence à `"sap.ui.core.mvc"`
> - `<rien>` fait référence à `"sap.m"`
> - `f` fait référence à `"sap.f"`
> - ...

Une fois la classe importée, nous pouvons faire appel aux composants de cette classe en utilisation le préfixe attribué ainsi que le nom de composant ciblé (spécifié dans les `UI5 libraries`)

Exemple avec `"sap.f"` et son composant `DynamicPage` :

```xml
<mvc:View
    controllerName="fr.stms.bc.appdemofgi.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f"
    xmlns:table="sap.ui.table">

    <f:DynamicPage
        id="dynamicPage"
        preserveHeaderStateOnScroll="true"
        showFooter="true">

        <!-- ... -->

    </f:DynamicPage>
```

## 🧩 STRUCTURE D’UNE CLASSE UI5

Chaque composant UI5 est une classe JavaScript avec une structure commune.

Exemple : `sap.m.Button` (à rechercher sur le site)

## 🧩 CONSTRUCTOR

Le constructor est la méthode appelée au moment où le composant est créé.

Il permet :

- d’instancier le composant
- de lui fournir un ID
- d’initialiser ses premières valeurs

### 🍧 SYNTAXE GENERALE

    new sap.m.Button(sId, mSettings)

- `sId` → identifiant du composant (optionnel)
- `mSettings` → objet contenant les propriétés, aggregations et events

### 🍧 EXEMPLE

```js
var oButton = new sap.m.Button("btnSave", {
  text: "Enregistrer",
  enabled: true,
  press: this.onSave,
});
```

> [!TIP]
> En XML View, le constructor est appelé automatiquement par UI5.

### 🍧 BEST PRACTICES

> [!IMPORTANT]
> Il est préférable de :
>
> - Créer les composants dans la VIEW (XML)
> - Utiliser le JS pour la logique, pas pour la structure
>
> Avantages :
>
> - Séparation claire Vue / Logique
> - Code plus lisible
> - Binding automatique
> - Compatible avec :
>   - MVC
>   - Fiori Guidelines
>   - Fiori Elements
>   - Flex / Adaptation UI
> - Moins de bugs

> [!TIP]
> La View décrit ce que je vois, le Controller décrit ce que ça fait.

## 🧩 PROPERTIES

Les properties sont les valeurs simples du composant.

Exemples :

- texte
- visibilité
- état actif/inactif

Exemples sur `sap.m.Button` :

- `text`
- `enabled`
- `visible`

Exemple :

```xml
<Button text="Valider" enabled="true" />
```

## 🧩 AGGREGATIONS

Les aggregations définissent ce que le composant peut contenir.

Exemples :

- `content`
- `items`
- `columns`

Exemple :

```xml
<Page>
     <content>
          <Text text="Bienvenue" />
     </content>
</Page>
```

## 🧩 ASSOCIATIONS

Les associations permettent de lier deux composants par ID, sans les imbriquer.

Exemple :

```xml
<Label text="Nom" labelFor="inputName" />
<Input id="inputName" />
```

## 🧩 EVENTS

Les events représentent les interactions utilisateur.

Exemples :

- `press`
- `change`
- `select`

Exemple :

```xml
<Button text="Valider" press="onValidate" />
```

Dans le controller :

```js
onValidate: function () {
// traitement de la fonction onValidate
}
```

## 🧩 RECAPITULATIF

| Élément     | Rôle principal                |
| ----------- | ----------------------------- |
| Constructor | Créer le composant            |
| Property    | Définir son état              |
| Aggregation | Contenir d’autres composants  |
| Association | Référencer un autre composant |
| Event       | Réagir à l’utilisateur        |

## 🧩 A RETENIR

- Les composants UI5 sont des classes
- Le constructor est utilisé pour créer un composant
- En XML View, on ne voit pas le constructor mais il existe
- Toutes les classes UI5 suivent la même logique
- Prioriser l'appel d'un composant dans la view plutôt que dans le controller

> [!TIP]
> 🌱 Comprendre la structure d’un composant UI5 permet de lire n’importe quelle documentation UI5.
