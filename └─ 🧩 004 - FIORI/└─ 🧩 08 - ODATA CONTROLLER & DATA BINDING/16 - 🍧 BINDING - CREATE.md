# 🌸 BINDING - CREATE

> 🌺 Objectifs
>
> - [ ] Implémenter un Data Binding

### 🍧 EVENT : ON CREATE SESSION

CREATE :

     Form → viewModel → OData POST → reload table

```js
onCreateSession: function () {

  /**
   * VIEW MODEL (JSONModel UI)
   * ------------------------------------------------------------
   * Rôle :
   * - contient les données saisies dans le formulaire
   * - sert de source pour construire le payload backend
   */
  const oViewModel = this.getView().getModel("view");

  /**
   * PAYLOAD (DTO - Data Transfer Object)
   * ------------------------------------------------------------
   * Extraction directe de l’objet sessionForm :
   *
   * /sessionForm = {
   *   IdSession,
   *   Annee,
   *   Duree,
   *   Site
   * }
   *
   * IMPORTANT :
   * - ce n’est pas encore une entité backend
   * - c’est un objet frontend prêt à être envoyé en OData CREATE
   */
  const oPayload = oViewModel.getProperty("/sessionForm");

  /**
   * CREATE (appel backend via DataServices)
   * ------------------------------------------------------------
   * this._oDataServices.createSession(oPayload)
   *
   * FLOW :
   * - POST OData vers /SessionSet
   * - backend crée l’enregistrement
   * - Promise resolved si HTTP 2xx
   */
  this._oDataServices

    /**
     * CREATE SESSION
     * --------------------------------------------------------
     * INPUT :
     * - oPayload (object)
     *
     * OUTPUT (Promise resolve) :
     * - aucun param ici dans .then(() => ...)
     * - uniquement confirmation de succès implicite
     */
    .createSession(oPayload)

    /**
     * THEN #1 : CHAINING PROMISE
     * ------------------------------------------------------------
     * IMPORTANT CONCEPT :
     *
     * .then() retourne TOUJOURS une nouvelle Promise
     * => permet enchaînement séquentiel
     *
     * Ici :
     * - après création réussie
     * - on déclenche un READ pour resynchroniser les données
     */
    .then(() => {

      /**
       * READ BACKEND (refresh data)
       * --------------------------------------------------------
       * BUT :
       * - récupérer la liste mise à jour après CREATE
       *
       * RETURN IMPORTANT :
       * - return this._oDataServices.getSessions()
       * => transmet la Promise au prochain .then()
       *
       * SANS return :
       * - chaîne Promise cassée
       * - next .then reçoit undefined
       */
      return this._oDataServices.getSessions();
    })

    /**
     * THEN #2 : RESULTAT DU READ
     * ------------------------------------------------------------
     * PARAMÈTRE :
     * - res = résultat du getSessions()
     *
     * STRUCTURE :
     * res = {
     *   data: {
     *     results: [ ...liste sessions... ]
     *   },
     *   response: HTTP metadata
     * }
     */
    .then((res) => {

      /**
       * SYNCHRONISATION UI
       * --------------------------------------------------------
       * Ici on force la mise à jour du modèle OData côté UI
       *
       * this.getView().getModel()
       * => ODataModel (défini dans manifest)
       *
       * setProperty("/SessionSet", ...)
       * => remplace le cache local du modèle
       *
       * EFFET :
       * - tous les bindings XML liés à SessionSet se rafraîchissent
       */
      this.getView()
        .getModel()
        .setProperty("/SessionSet", res.data.results);
    })

    /**
     * CATCH GLOBAL
     * ------------------------------------------------------------
     * Capture :
     * - erreur CREATE
     * - erreur READ (refresh)
     *
     * err contient généralement :
     * - HTTP status
     * - message backend OData
     */
    .catch((err) => {
      console.error("CREATE Session ERROR", err);
    });
},
```

Points clés :

     setProperty("/SessionSet") = déclenchement binding automatique UI5
     chaque CRUD termine par un refresh explicite des données (return this._oDataServices.getSessions();)
