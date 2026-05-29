# 🌸 BINDING - UPDATE

> 🌺 Objectifs
>
> - [ ] Implémenter un Data Binding

## 🧩 IMPLEMENTATION

Path :

     webapp/controller/Home.controller.js

### 🍧 EVENT : ON UPDATE SESSION

UPDATE :

     Form → viewModel → OData PUT → reload table

```js
onUpdateSession: function () {

  /**
   * VIEW MODEL (JSONModel UI)
   * ------------------------------------------------------------
   * Source des données saisies dans le formulaire
   * Contient l’état courant de la session côté interface
   */
  const oViewModel = this.getView().getModel("view");

  /**
   * PAYLOAD (OBJET À ENVOYER AU BACKEND)
   * ------------------------------------------------------------
   * Contient toutes les propriétés de la session modifiée
   *
   * Structure :
   * {
   *   IdSession,
   *   Annee,
   *   Duree,
   *   Site
   * }
   *
   * IMPORTANT :
   * - utilisé comme corps de requête OData UPDATE
   * - correspond aux champs modifiables côté backend
   */
  const oPayload = oViewModel.getProperty("/sessionForm");

  /**
   * IDENTIFIANT MÉTIER
   * ------------------------------------------------------------
   * sId = clé primaire OData de l’entité Session
   *
   * Ici :
   * - extrait depuis le payload UI
   * - utilisé pour construire l’URL OData
   */
  const sId = oPayload.IdSession;

  /**
   * UPDATE BACKEND (OData PUT/MERGE)
   * ------------------------------------------------------------
   * this._oDataServices.updateSession(sId, oPayload)
   *
   * PARAMÈTRES :
   * - sId      : identifiant de l’entité cible
   * - oPayload : données modifiées envoyées au backend
   *
   * COMPORTEMENT :
   * - modification d’une entité existante
   * - Promise résolue si HTTP 200/204
   */
  this._oDataServices

    /**
     * UPDATE SESSION
     * --------------------------------------------------------
     * INPUT :
     * - sId (string)
     * - oPayload (object)
     *
     * OUTPUT :
     * - Promise resolved (pas de data exploitable ici)
     */
    .updateSession(sId, oPayload)

    /**
     * THEN #1 : POST UPDATE REFRESH
     * ------------------------------------------------------------
     * BUT :
     * - resynchroniser l’UI avec le backend
     * - éviter données obsolètes côté frontend
     *
     * IMPORTANT :
     * - return obligatoire pour chaîner la Promise suivante
     */
    .then(() => {

      /**
       * READ COMPLET APRÈS UPDATE
       * --------------------------------------------------------
       * Récupère l’ensemble des sessions
       * pour remettre à jour la table UI
       */
      return this._oDataServices.getSessions();
    })

    /**
     * THEN #2 : MISE À JOUR DU MODÈLE UI
     * ------------------------------------------------------------
     * PARAMÈTRE :
     * - res = résultat du GET (liste sessions)
     *
     * res.data.results = tableau d’entités Session
     */
    .then((res) => {

      /**
       * SYNCHRONISATION MODEL GLOBAL
       * --------------------------------------------------------
       * this.getView().getModel()
       * => ODataModel principal SAPUI5
       *
       * setProperty("/SessionSet", ...)
       * => remplace le dataset local en mémoire
       *
       * EFFET :
       * - toutes les tables liées à SessionSet se mettent à jour
       */
      this.getView()
        .getModel()
        .setProperty("/SessionSet", res.data.results);
    })

    /**
     * ERREUR GLOBALE (UPDATE + REFRESH)
     * ------------------------------------------------------------
     * Capture :
     * - erreur UPDATE backend
     * - erreur GET refresh
     */
    .catch((err) => {
      console.error("UPDATE Session ERROR", err);
    });
},
```

Points clés :

     setProperty("/SessionSet") = déclenchement binding automatique UI5
     chaque CRUD termine par un refresh explicite des données (return this._oDataServices.getSessions();)
