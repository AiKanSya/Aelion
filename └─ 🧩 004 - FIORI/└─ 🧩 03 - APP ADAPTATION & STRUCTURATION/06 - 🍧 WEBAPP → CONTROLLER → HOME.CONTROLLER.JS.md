# 🌸 HOME.CONTROLLER.JS

## 🧩 PROCESS

> [!IMPORTANT]
>
> 1. Modifier les Dépendances et le Return du controller
>
> ![](./assets/Capture%20d’écran%202026-02-10%20112259.png)

> [!NOTE]
> Path : `appdemofgi` → `webapp` → `controller` → `Home.controller.js`

> [!CAUTION]
>
> - Ne pas oublier de modifier le(s) Namespace(s) par le votre !
> - La manipulation sera a répéter pour chaque View.controller.js

## 🧩 CODE `Home.controller.js`

```js
sap.ui.define(
  ["fr/stms/bc/appdemofgi/controller/BaseController"],
  /**
   * @param {fr.stms.bc.appdemofgi.controller.BaseController} BaseController - Contrôleur de base avec toutes les fonctions utilitaires
   */
  (BaseController) => {
    "use strict";

    /**
     * @class fr.stms.bc.appdemofgi.controller.Home
     * @extends fr.stms.bc.appdemofgi.controller.BaseController
     * @description
     * Contrôleur de la vue Home.
     * Hérite de BaseController pour utiliser toutes les méthodes utilitaires
     * comme getRouter(), getModel(), setFocus(), et DataServices.
     */
    return BaseController.extend("fr.stms.bc.appdemofgi.controller.Home", {
      /**
       * @function onInit
       * @description
       * Fonction appelée automatiquement au démarrage de la vue Home.
       * Pour l'instant, elle ne fait rien mais on peut y ajouter :
       * - l'initialisation de modèles spécifiques à la vue
       * - des appels à des services
       * - des événements spécifiques
       */
      onInit() {
        // Ici, on peut ajouter du code qui s'exécute au chargement de la vue
      },
    });
  },
);
```
