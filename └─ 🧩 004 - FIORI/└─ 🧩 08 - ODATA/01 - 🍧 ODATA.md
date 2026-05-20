# 🌸 ODATA

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle d'ODATA dans SAP Fiori et comment les applications récupèrent les données depuis le système SAP.

## 🧩 FIORI ODATA

Dans SAP Fiori :

- Le Frontend (UI5/Fiori) affiche les données
- Le Backend SAP fournit les données
- ODATA fait la communication entre les deux

## 🧩 POURQUOI UTILISER ODATA ?

Sans ODATA :

     Application Fiori
          ↓
     Développement manuel complexe
          ↓
     SAP

Avec ODATA :

     Application Fiori
          ↓
     Service ODATA
          ↓
     SAP Backend

Avantages :

- communication standardisée
- réutilisable
- rapide à développer
- compatible avec plusieurs technologies
- gestion automatique des opérations de données

Architecture simplifiée dans Fiori

     Utilisateur
          ↓
     Application SAPUI5
          ↓
     Service ODATA
          ↓
     SAP Gateway
          ↓
     Programme ABAP
          ↓
     Base SAP

Explication :

- SAPUI5 : Affiche les informations à l'écran.
- Service ODATA : Permet d'envoyer et recevoir les données.
- SAP Gateway : Intermédiaire entre Fiori et SAP.
- ABAP : Exécute la logique métier.
- Base SAP : Stocke les données.

## 🧩 FONCTIONNEMENT GENERAL

Exemple :

     Un utilisateur ouvre une application Fiori "Liste employés".

Étapes :

     1. L'utilisateur ouvre l'application

     2. L'application envoie une demande ODATA

     3. SAP récupère les données

     4. SAP renvoie la réponse

     5. Les données s'affichent

Schéma :

     Utilisateur
          ↓
     Application Fiori
          ↓
     GET /Employes
          ↓
     SAP
          ↓
     Liste des employés

## 🧩 OPERATION PRINCIPALES ODATA

ODATA utilise les méthodes HTTP.

Les 4 opérations principales sont :

| Méthode |       Action | Description                 |
| ------- | -----------: | --------------------------- |
| GET     |      Lecture | Lire des données            |
| POST    |     Création | Ajouter des données         |
| PUT     | Modification | Modifier toutes les données |
| DELETE  |  Suppression | Supprimer des données       |

Exemple :

     GET /Produits

Retour :

```json
{
  "Nom": "PC Portable",
  "Prix": "800"
}
```

## 🧩 ODATA DANS SAPUI5

Le modèle ODATA est généralement déclaré dans :

```json
{
  "dataSources": {
    "mainService": {
      "uri": "/sap/opu/odata/sap/ZEMPLOYEE_SRV/"
    }
  }
}
```

Le plus souvent cette configuration se trouve dans :

     manifest.json

Exemple d'utilisation dans Controller

Création du modèle :

```js
var oModel = new sap.ui.model.odata.v2.ODataModel(
  "/sap/opu/odata/sap/ZEMPLOYEE_SRV/",
);
```

Lecture de données :

```js
oModel.read("/Employes", {
  success: function (data) {
    console.log(data);
  },
});
```

Explication :

     read()
     ↓
     Envoie une requête GET

     /Employes
     ↓
     Demande les employés

     success()
     ↓
     Exécute le traitement après réception

## 🧩 POINTS A RETENIR

- ✔ ODATA est un protocole d'échange de données
- ✔ SAPUI5 utilise ODATA pour communiquer avec SAP
- ✔ ODATA fonctionne avec HTTP
- ✔ GET → Lire
- ✔ POST → Créer
- ✔ PUT → Modifier
- ✔ DELETE → Supprimer
- ✔ Les services sont souvent définis dans manifest.json
- ✔ ODATA est une base essentielle avant Data Binding
