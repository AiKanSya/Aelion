# 🌸 DATA BINDING

> 🌺 Objectifs
>
> - [ ] Comprendre comment les données sont reliées automatiquement aux éléments affichés dans une application SAP Fiori/UI5.

## 🧩 DATA BINDING

Le Data Binding est une liaison entre :

     Model
     ↓
     Données
     ↓
     View

Le Data Binding permet de connecter les données du Model aux composants de la View.

Sans Data Binding :

- récupération manuelle des données
- mise à jour manuelle de l'écran
- plus de code
- plus de risques d'erreurs

Avec Data Binding :

- liaison automatique
- moins de code
- mise à jour automatique de l'écran

Exemple :

Données dans le modèle :

```json
{
  "nom": "Jean"
}
```

Vue :

```xml
<Text text="{/nom}" />
```

Affichage :

     Jean

Explication :

     {/nom}
        ↓
     Cherche la donnée "nom"
        ↓
     Affiche sa valeur

## 🧩 SCHEMA GENERAL

     Model
        ↓
     Data Binding
        ↓
     View

Exemple :

     Model :

     Nom = Martin
     Ville = Toulouse


     Data Binding :

     {/Nom}
     {/Ville}


     Résultat écran :

     Martin
     Toulouse

## 🧩 POURQUOI UTILISER LE DATA BINDING

Avantages :

- Moins de code
- Mise à jour automatique
- Plus simple à maintenir
- Plus rapide à développer
- Compatible avec JSON et ODATA

## 🧩 PRINCIPAUX TYPES DE DATA BINDING

SAPUI5 utilise principalement :

- Property Binding
- Element Binding
- Aggregation Binding

### 🍧 PROPERTY BINDING

Permet de lier une propriété d'un contrôle à une donnée.

Exemple :

Modèle :

```json
{
  "nom": "Martin"
}
```

Vue :

```xml
<Text text="{/nom}" />
```

Résultat :

     Martin

Ici :

     text
        ↓
     propriété du contrôle

     {/nom}
        ↓
     donnée du modèle

### 🍧 ELEMENT BINDING

Permet de connecter un élément complet à une partie du modèle.

Modèle :

```json
{
  "Employe": {
    "Nom": "Martin",
    "Ville": "Toulouse"
  }
}
```

Controller :

```js
this.getView().bindElement("/Employe");
```

Vue :

```xml
<Text text="{Nom}"/>
<Text text="{Ville}"/>
```

Résultat :

     Martin
     Toulouse

Explication :

     bindElement("/Employe")
        ↓
     Positionne le contexte
        ↓
     Les éléments utilisent directement :
        {Nom}
        {Ville}

### 🍧 AGGREGATION BINDING

Permet de remplir automatiquement une liste ou un tableau avec plusieurs données.

Modèle :

```json
{
  "Employes": [
    {
      "Nom": "Martin"
    },
    {
      "Nom": "Jean"
    },
    {
      "Nom": "Paul"
    }
  ]
}
```

Vue :

```xml
<List items="{/Employes}">
     <items>
          <StandardListItem title="{Nom}"/>
     </items>
</List>
```

Résultat :

     Martin
     Jean
     Paul

Explication :

     Employes
        ↓
     Parcourt chaque élément
        ↓
     Crée automatiquement une ligne

## 🧩 TYPE DE MODE DE BINDING

SAPUI5 propose plusieurs comportements.

### 🍧 ONE-WAY BINDING

Les données circulent dans une seule direction :

     Model
     ↓
     View

Si le modèle change :

     Model : Jean
     ↓
     Écran : Jean

L'inverse ne fonctionne pas.

### 🍧 TWO-WAY BINDING

Les données circulent dans les deux directions :

     Model
     ↕
     View

Exemple :

```xml
<Input value="{/nom}" />
```

Si l'utilisateur écrit :

     Pierre

Le modèle devient automatiquement :

```json
{
  "nom": "Pierre"
}
```

### 🍧 ONE-TIME BINDING

La donnée est chargée une seule fois.

     Model
        ↓
     View

Puis plus de mise à jour.

Utilisé pour :

     données fixes
     performances

## 🧩 ERREURS FREQUENTES

### 🍧 WRONG PATH

```xml
<Text text="{nom}" />
```

alors que :

```json
{
  "Nom": "Martin"
}
```

Résultat :

     Vide

Cause :

     nom ≠ Nom

SAPUI5 respecte les majuscules/minuscules !

### 🍧 MODELE NON DEFINI

Si :

```js
this.getView().setModel(oModel);
```

n'existe pas :

     Le binding ne fonctionne pas

## 🧩 POINTS A RETENIR

- ✔ Data Binding relie Model et View
- ✔ Réduit fortement le code JavaScript
- ✔ Mise à jour automatique
- ✔ Property Binding → une propriété
- ✔ Element Binding → un objet
- ✔ Aggregation Binding → une liste
- ✔ One-Way → Model vers View
- ✔ Two-Way → échange dans les deux sens
- ✔ Très utilisé avec ODATA
