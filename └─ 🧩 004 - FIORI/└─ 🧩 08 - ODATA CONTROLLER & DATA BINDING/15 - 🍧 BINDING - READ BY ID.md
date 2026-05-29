# 🌸 BINDING - READ BY ID

> 🌺 Objectifs
>
> - [ ] Implémenter un Data Binding

## 🧩 IMPLEMENTATION

Path :

     webapp/controller/Home.controller.js

### 🍧 EVENT : ON READ SESSION BY ID

READ ONE :

     Input UI → viewModel → OData GET → viewModel update → form rempli

```js
onReadSessionById: function () {
  /**
   * VIEW MODEL (JSONModel UI)
   * ------------------------------------------------------------
   * oViewModel = modèle local SAPUI5 (sap.ui.model.json.JSONModel)
   *
   * Rôle :
   * - stocker l’état UI (formulaires, champs, sélection utilisateur)
   * - ne contient PAS de données backend directement
   * - sert de "state container" côté frontend
   */
  const oViewModel = this.getView().getModel("view");

  /**
   * RÉCUPÉRATION D’UNE VALEUR UI
   * ------------------------------------------------------------
   * chemin JSONModel :
   * /sessionForm/IdSession
   *
   * signifie :
   * - objet "sessionForm"
   * - propriété "IdSession"
   *
   * sId = identifiant saisi par l’utilisateur dans l’UI
   */
  const sId = oViewModel.getProperty("/sessionForm/IdSession");

  /**
   * APPEL BACKEND VIA DATASERVICES (PROMISE)
   * ------------------------------------------------------------
   * getSessionById(sId)
   *
   * INPUT :
   * - sId (string) => clé métier de la session
   *
   * OUTPUT (Promise resolved) :
   * res = {
   *   data: {...session backend...},
   *   response: HTTP response OData
   * }
   *
   * IMPORTANT :
   * - asynchrone
   * - ne bloque pas l’exécution du reste du code
   */
  this._oDataServices
    .getSessionById(sId)

    /**
     * SUCCESS CASE (Promise resolved)
     * ----------------------------------------------------------
     * PARAMÈTRE :
     * - res = objet retourné par resolve()
     *
     * STRUCTURE :
     * res.data => entité Session (objet backend)
     */
    .then((res) => {
      /**
       * BINDING UI (mise à jour du modèle View)
       * --------------------------------------------------------
       * On remplace complètement l’objet :
       * /sessionForm = données backend
       *
       * EFFET :
       * - tous les champs liés dans la View XML
       *   se mettent à jour automatiquement
       *
       * => data binding UI5 réactif
       */
      oViewModel.setProperty("/sessionForm", res.data);
    })

    /**
     * ERROR CASE (Promise rejected)
     * ----------------------------------------------------------
     * PARAMÈTRE :
     * - err = objet erreur OData / HTTP
     *
     * CONTENU POSSIBLE :
     * - HTTP 404 (not found)
     * - HTTP 500 (backend error)
     * - payload error SAP Gateway
     */
    .catch((err) => {
      console.error("READ SessionById ERROR", err);
    });
},
```

Points clés :

     setProperty("/SessionSet") = déclenchement binding automatique UI5
     chaque CRUD termine par un refresh explicite des données (return this._oDataServices.getSessions();)
