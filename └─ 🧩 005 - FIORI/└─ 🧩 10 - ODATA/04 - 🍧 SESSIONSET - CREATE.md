# 🌸 CREATE

## 🌺 OBJECTIFS

- [ ] Expliquer le rôle de **CREATE** dans le contexte présenté.
- [ ] Comprendre **appel direct odata**.
- [ ] Appliquer la notion dans un exemple simple.
- [ ] Reconnaître les erreurs fréquentes et les limites de l’approche.

## 🌺 VUE D'ENSEMBLE

```mermaid
flowchart TD
    A["CREATE"]
    A --> B["APPEL DIRECT ODATA"]
```

> [!IMPORTANT]
> Vérifier la version SAPUI5 ciblée par l’application. La disponibilité d’une API, d’une propriété ou d’un événement peut dépendre de cette version.

## 🌺 APPEL DIRECT ODATA

Path :

     webapp/controller/Home.controller.js

Code :

```js
/**
 * sap.ui.define
 * ---------------------------------------------------------------------------
 * Contrôleur Home SAPUI5
 *
 * Rôle :
 * - hérite du BaseController
 * - expose Formatter pour la vue XML
 * - exécute des opérations CRUD OData (READ + CREATE)
 */
sap.ui.define(
  [
    /**********************************************************************
     * BaseController
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/controller/BaseController",

    /**********************************************************************
     * Formatter
     **********************************************************************/
    "fr/stms/fgifirstappmodulename/libs/Formatter",
  ],

  (BaseController, Formatter) => {
    "use strict";

    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Home",
      {
        /******************************************************************
         * Formatter exposé à la View XML
         ******************************************************************/
        formatter: Formatter,

        /* ================================================================== */
        /* ODATA CALL FROM CONTROLLER                                        */
        /* ================================================================== */

        /**********************************************************************
         * onInit
         * --------------------------------------------------------------------
         * Point d’entrée du contrôleur.
         *
         * Ici :
         * - récupération du modèle OData
         * - déclenchement des appels CRUD de démonstration
         **********************************************************************/
        onInit: function () {
          /******************************************************************
           * Récupération du modèle OData (défini dans manifest.json)
           ******************************************************************/
          var oModel = this.getOwnerComponent().getModel();

          console.log("INIT START");

          /* ================================================================
           * READ COLLECTION
           * ================================================================ */
          this.readSessions(oModel);

          /* ================================================================
           * READ SINGLE ENTITY
           * ================================================================ */
          this.readSessionById(oModel, "S001");

          /* ================================================================
           * CREATE ENTITY
           * ================================================================ */
          this.createSession(oModel);
        },

        /* ================================================================== */
        /* READ COLLECTION                                                   */
        /* ================================================================== */

        readSessions: function (oModel) {
          oModel.read("/SessionSet", {
            success: function (OData) {
              console.log("READ SessionSet OK");

              /**************************************************************
               * OData.results
               * -> tableau des entités OData retournées
               **************************************************************/
              console.table(OData.results);
            },

            error: function (oError) {
              console.error("READ SessionSet ERROR", oError);
            },
          });
        },

        /* ================================================================== */
        /* READ ONE ENTITY                                                   */
        /* ================================================================== */

        readSessionById: function (oModel, sSessionId) {
          oModel.read("/SessionSet('" + sSessionId + "')", {
            success: function (OData) {
              console.log("READ ONE Session OK");
              console.log(OData);
            },

            error: function (oError) {
              console.error("READ ONE Session ERROR", oError);
            },
          });
        },

        /* ================================================================== */
        /* CREATE ENTITY                                                     */
        /* ================================================================== */

        /**********************************************************************
         * createSession
         * --------------------------------------------------------------------
         * Création d’une entité OData via HTTP POST
         *
         * OData V2 :
         * - oModel.create = POST
         **********************************************************************/
        createSession: function (oModel) {
          /******************************************************************
           * Payload envoyé au backend
           *
           * Correspond aux champs de l’entité SessionSet
           ******************************************************************/
          var oPayload = {
            IdSession: "S006",
            Annee: "2027",
            Duree: "90",
            Site: "Marseille",
          };

          /******************************************************************
           * CREATE OData
           ******************************************************************/
          oModel.create("/SessionSet", oPayload, {
            success: function (OData) {
              console.log("CREATE Session OK", OData);
            },

            error: function (oError) {
              console.error("CREATE Session ERROR", oError);
            },
          });
        },
      },
    );
  },
);
```

## 🌺 RÉSUMÉ

> - **Appel direct odata :** webapp/controller/Home.controller.js

<details>
<summary>🍧 Afficher l’auto-évaluation</summary>

- [ ] Je peux définir **CREATE** avec mes propres mots.
- [ ] Je peux expliquer **appel direct odata** sans relire le chapitre.
- [ ] Je peux appliquer ou illustrer **un exemple concret** dans un exemple simple.
- [ ] Je peux identifier au moins une erreur fréquente ou une limite liée à cette notion.

</details>
