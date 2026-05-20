# 🌸 WEBAPP/LIBS/DATASERVICES.JS

> 🌺 Objectifs
>
> - [ ] Centraliser les appels aux services OData ou autres API.
> - [ ] Simplifier la récupération et l’envoi de données.
> - [ ] Éviter de dupliquer le code de gestion des services dans les contrôleurs.

## 🧩 DEFINITION

`DataServices.js` est un module utilitaire qui contient les fonctions pour interagir avec les services de données (OData, mockserver, API REST, etc.).  
Il sert à encapsuler les appels aux services, gérer les promesses et simplifier l’accès aux données pour les contrôleurs.

> [!TIP]  
> Pense à `DataServices.js` comme au pont entre ton application Fiori et le backend : toutes les requêtes passent par là.

## 🧩 UTILITE

- Fournir des fonctions génériques pour lire, créer, mettre à jour ou supprimer des données.
- Gérer les erreurs et les réponses des services.
- Simplifier la logique dans les contrôleurs en centralisant le code de communication.

> [!TIP]  
> Les contrôleurs appellent ces fonctions au lieu d’écrire directement les requêtes OData.

## 🧩 POINTS IMPORTANTS

- Ne contient pas de code lié à l’interface utilisateur.
- Peut être utilisé par tous les contrôleurs.
- Permet d’avoir un point unique à modifier si le service backend change.

## 🧩 EXEMPLE

```js
sap.ui.define([], function () {
  "use strict";
  return {
    getCustomers: function (oModel) {
      return new Promise(function (resolve, reject) {
        oModel.read("/Customers", {
          success: function (oData) {
            resolve(oData.results);
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });
    },
    createCustomer: function (oModel, oPayload) {
      return new Promise(function (resolve, reject) {
        oModel.create("/Customers", oPayload, {
          success: function (oData) {
            resolve(oData);
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });
    },
  };
});
```
