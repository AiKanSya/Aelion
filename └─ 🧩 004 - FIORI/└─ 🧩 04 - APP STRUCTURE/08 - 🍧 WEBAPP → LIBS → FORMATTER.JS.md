# 🌸 WEBAPP/LIBS/FORMATTER.JS

> 🌺 Objectifs
>
> - [ ] Centraliser les fonctions de formatage des données pour l’interface.
> - [ ] Éviter la duplication de code dans les contrôleurs ou les vues.
> - [ ] Standardiser l’affichage des dates, nombres, textes, etc.

## 🧩 DEFINITION

`Formatter.js` est un module utilitaire qui contient des fonctions pour transformer ou formater les données avant de les afficher dans l’interface utilisateur.  
Il est utilisé directement dans les vues XML ou depuis les contrôleurs pour adapter l’affichage.

> [!TIP]  
> Pense à `Formatter.js` comme au styliste des données : il prend des données brutes et les rend présentables pour l’utilisateur.

## 🧩 UTILITE

- Formater les dates, nombres, texte ou statuts.
- Faciliter la lecture des données par l’utilisateur.
- Réutiliser les fonctions de formatage partout dans l’application.

> [!TIP]  
> Au lieu d’écrire des formules dans chaque vue ou contrôleur, tu appelles simplement les fonctions du Formatter.

## 🧩 POINTS IMPORTANTS

- Ne gère pas les données elles-mêmes, seulement leur présentation.
- Peut être utilisé dans les bindings XML via `{formatter>functionName}`.
- Centralise toutes les règles de formatage pour plus de cohérence.

## 🧩 EXEMPLE

```js
sap.ui.define([], function () {
  "use strict";
  return {
    formatDate: function (sDate) {
      if (!sDate) {
        return "";
      }
      var oDate = new Date(sDate);
      return oDate.toLocaleDateString();
    },
    formatStatus: function (sStatus) {
      switch (sStatus) {
        case "A":
          return "Active";
        case "I":
          return "Inactive";
        default:
          return "Unknown";
      }
    },
  };
});
```
