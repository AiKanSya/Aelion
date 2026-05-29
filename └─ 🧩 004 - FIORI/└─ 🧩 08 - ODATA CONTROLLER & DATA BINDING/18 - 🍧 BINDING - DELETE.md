# 🌸 BINDING - DELETE

> 🌺 Objectifs
>
> - [ ] Implémenter un Data Binding

## 🧩 IMPLEMENTATION

Path :

     webapp/controller/Home.controller.js

### 🍧 EVENT : ON DELETE SESSION

DELETE :

     viewModel id → OData DELETE → reload table

```js
onDeleteSession: function () {

  /**
   * VIEW MODEL (JSONModel UI)
   * ------------------------------------------------------------
   * Source des données UI (formulaire utilisateur)
   * Contient notamment l’identifiant de la session à supprimer
   */
  const oViewModel = this.getView().getModel("view");

  /**
   * IDENTIFIANT MÉTIER
   * ------------------------------------------------------------
   * sId = clé primaire OData de l’entité Session
   *
   * Récupéré depuis le formulaire UI :
   * /sessionForm/IdSession
   *
   * UTILISATION :
   * - sert à cibler exactement l’entité à supprimer côté backend
   */
  const sId = oViewModel.getProperty("/sessionForm/IdSession");

  /**
   * DELETE BACKEND (OData DELETE)
   * ------------------------------------------------------------
   * this._oDataServices.deleteSession(sId)
   *
   * PARAMÈTRES :
   * - sId : identifiant unique de la session
   *
   * COMPORTEMENT :
   * - envoie requête HTTP DELETE vers SAP Gateway
   * - supprime définitivement l’entité côté backend
   *
   * RETOUR :
   * - Promise resolved si suppression réussie (HTTP 200/204)
   */
  this._oDataServices

    /**
     * DELETE SESSION
     * --------------------------------------------------------
     * INPUT :
     * - sId (string)
     *
     * OUTPUT :
     * - Promise resolved sans payload métier utile
     */
    .deleteSession(sId)

    /**
     * THEN #1 : REFRESH DONNÉES
     * ------------------------------------------------------------
     * OBJECTIF :
     * - resynchroniser la liste des sessions après suppression
     * - garantir cohérence UI ↔ backend
     *
     * IMPORTANT :
     * - return obligatoire pour chaîner la Promise suivante
     */
    .then(() => {

      /**
       * RECHARGE COMPLET DES SESSIONS
       * --------------------------------------------------------
       * Retourne une Promise contenant :
       * - data.results = liste mise à jour des sessions
       */
      return this._oDataServices.getSessions();
    })

    /**
     * THEN #2 : MISE À JOUR UI
     * ------------------------------------------------------------
     * PARAMÈTRE :
     * - res = résultat du GET Sessions
     *
     * res.data.results :
     * - tableau des sessions restantes après suppression
     */
    .then((res) => {

      /**
       * SYNCHRONISATION DU MODÈLE GLOBAL
       * --------------------------------------------------------
       * this.getView().getModel()
       * => ODataModel principal SAPUI5
       *
       * setProperty("/SessionSet", ...)
       * => remplace les données locales en mémoire
       *
       * CONSÉQUENCE :
       * - UI (tables/listes) se met à jour automatiquement
       *   via data binding SAPUI5
       */
      this.getView()
        .getModel()
        .setProperty("/SessionSet", res.data.results);
    })

    /**
     * ERREUR GLOBALE
     * ------------------------------------------------------------
     * Capture :
     * - échec DELETE (ex: 404, 403)
     * - échec GET refresh
     */
    .catch((err) => {
      console.error("DELETE Session ERROR", err);
    });
},
```

Points clés :

     setProperty("/SessionSet") = déclenchement binding automatique UI5
     chaque CRUD termine par un refresh explicite des données (return this._oDataServices.getSessions();)
