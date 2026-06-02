# 🌸 IMPLEMENTATION

> 🌺 Objectifs
>
> - [ ] Adapter le manifest pour créer des routes

     Home.view.xml
     ↓ (click session)
     Details.view.xml

## 🧩 1. CREATION DE LA VIEW DETAILS.VIEW

Path :

     webapp/view/Details.view.xml

Code :

```xml
<mvc:View
    controllerName="fr.stms.fgifirstappmodulename.controller.Details"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
>
    <Page
        id="detailsPage"
        title="Détails Session"
        showNavButton="true"
        navButtonPress="onNavBack"
    >
        <content>
            <!-- ============================== -->
            <!-- CONTENEUR DÉTAIL SESSION -->
            <!-- ============================== -->

            <Panel
                headerText="Session"
                class="sapUiSmallMargin"
            >
                <VBox class="sapUiSmallMargin">
                    <!-- ID -->
                    <Text
                        text="IdSession"
                        class="sapUiTinyMarginBottom"
                    />
                    <ObjectStatus text="{IdSession}" />

                    <!-- ANNEE -->
                    <Text text="Année" />
                    <ObjectStatus text="{Annee}" />

                    <!-- DUREE -->
                    <Text text="Durée" />
                    <ObjectStatus text="{Duree}" />

                    <!-- SITE -->
                    <Text text="Site" />
                    <ObjectStatus text="{Site}" />
                </VBox>
            </Panel>
        </content>
    </Page>
</mvc:View>
```

> [!NOTE]
> La View Details présente

> [!WARNING]
> Ne pas oublier de définir le controller de cette nouvelle View !

## 🧩 2. CREATION DU CONTROLLER DETAILS.CONTROLLER

Path :

     webapp/controller/Details.controller.js

Code :

```js
sap.ui.define(
  ["fr/stms/fgifirstappmodulename/controller/BaseController"],
  function (BaseController) {
    "use strict";

    return BaseController.extend(
      "fr.stms.fgifirstappmodulename.controller.Details",
      {
        onInit: function () {
          console.log("DETAILS INIT");
        },
      },
    );
  },
);
```

## 🧩 3. AJOUT DE LA ROUTE DANS LE MANIFEST

Path :

     webapp/manifest.json

Ajouter une nouvelle route :

```json
"routes": [
  {
    "name": "RouteHome",
    "pattern": ":?query:",
    "target": [
      "TargetHome"
    ]
  },
  {
    "name": "RouteDetails",
    "pattern": "details/{IdSession}",
    "target": [
      "TargetDetails"
    ]
  }
],
```

## 🧩 4. AJOUTER LE TARGET

Path :

     webapp/manifest.json

Ajouter une nouvelle route :

```json
"targets": {
  "TargetHome": {
    "id": "Home",
    "name": "Home"
  },
  "TargetDetails": {
      "id": "Details",
      "name": "Details"
  }
}
```

## 🧩 5. AJOUTER L'EVENEMENT ITEMPRESS ET RENDRE LES LIGNES CLIQUABLES

Path :

    webapp/view/Home.view.xml

Properties à ajouter :

- ColumnListItem : `type="Navigation"`
- ColumnListItem : `press="onPressSession"`

Code :

```xml
<!-- ===================== -->
<!-- TABLE SESSIONSET -->
<!-- ===================== -->
<Table
    id="sessionTable"
    items="{/SessionSet}"
    inset="false"
    headerText="Sessions"
>
    <columns>
        <Column>
            <Text text="IdSession" />
        </Column>
        <Column>
            <Text text="Année" />
        </Column>
        <Column>
            <Text text="Durée" />
        </Column>
        <Column>
            <Text text="Site" />
        </Column>
    </columns>

    <items>
        <ColumnListItem
          type="Navigation"
          press="onPressSession"
        >
            <cells>
                <Text text="{IdSession}" />
                <Text text="{Annee}" />
                <Text text="{Duree}" />
                <Text text="{Site}" />
            </cells>
        </ColumnListItem>
    </items>
</Table>
```

## 🧩 6. AJOUTER LA MÉTHODE DE NAVIGATION

Path :

    webapp/controller/Home.controller.xml

Code :

```js
/**
 * onPressSession()
 * ---------------------------------------------------------------------------
 * EVENEMENT UI5 :
 * - déclenché lors du clic utilisateur sur une ligne / item
 *
 * OBJECTIF :
 * - récupérer l’élément UI cliqué
 * - récupérer son contexte de données (binding OData)
 * - extraire l’IdSession
 * - naviguer vers la vue Details
 */
onPressSession: function (oEvent) {

    /*
    ==========================================================================
    getSource()
    ==========================================================================
    *
    * IMPORTANT CONCEPT UI5 :
    * ------------------------------------------------------------------------
    * getSource() retourne le contrôle UI qui a déclenché l’événement.
    *
    * Exemple :
    * - Button
    * - ListItem
    * - ColumnListItem
    *
    * Ici :
    * oItem = ligne cliquée
    */
    var oItem = oEvent.getSource();

    /*
    ==========================================================================
    BindingContext
    ==========================================================================
    *
    * Le BindingContext représente la donnée OData liée au contrôle UI.
    *
    * Exemple :
    * Une ligne de table est liée à :
    *
    * {
    *   IdSession: "S001",
    *   Annee: "2025",
    *   Site: "Paris"
    * }
    *
    * UI5 conserve cette liaison automatiquement.
    */
    var oContext = oItem.getBindingContext();

    /*
    ==========================================================================
    getProperty("IdSession")
    ==========================================================================
    *
    * Permet de lire une propriété directement depuis le contexte.
    *
    * Équivalent conceptuel :
    * oContext.getObject().IdSession
    *
    * Ici :
    * on extrait la clé métier de la ligne sélectionnée.
    */
    var sIdSession = oContext.getProperty("IdSession");

    /*
    ==========================================================================
    Navigation (Router UI5)
    ==========================================================================
    *
    * navTo() permet de changer de vue dans l’application Fiori.
    *
    * Paramètre 1 :
    * - nom de la route (manifest.json)
    *
    * Paramètre 2 :
    * - paramètres dynamiques transmis dans l’URL
    *
    * Exemple résultat :
    * #/Details/S001
    */
    this.getRouter().navTo("RouteDetails", {
        IdSession: sIdSession
    });
}
```

## 🧩 7. RÉCUPÉRER LE PARAMÈTRE DANS DETAILS

Path :

    webapp/controller/Details.controller.js

Code :

```js
/**
 * onInit()
 * ---------------------------------------------------------------------------
 * Méthode du cycle de vie SAPUI5.
 *
 * Appelée automatiquement :
 * - lors de la création du controller
 * - au chargement de la vue
 *
 * OBJECTIF ICI :
 * - écouter la navigation vers la route "RouteDetails"
 * - déclencher une fonction lorsque la route est atteinte
 */
onInit: function () {

    /*
    ==========================================================================
    this.getRouter()
    ==========================================================================
    *
    * Récupère le Router SAPUI5 global.
    *
    * Le Router est responsable :
    * - de la navigation entre vues
    * - de la gestion des URLs
    * - des paramètres de routing
    *
    * Exemple URL :
    * #/Details/S001
    */

    /*
    ==========================================================================
    getRoute("RouteDetails")
    ==========================================================================
    *
    * Récupère une route définie dans le manifest.json.
    *
    * Exemple manifest :
    *
    * {
    *   "name": "RouteDetails",
    *   "pattern": "Details/{IdSession}"
    * }
    *
    * Cette route devient active lorsqu’une URL correspond au pattern.
    */

    /*
    ==========================================================================
    attachPatternMatched()
    ==========================================================================
    *
    * Permet d’écouter l’activation d’une route.
    *
    * Dès que l’URL correspond au pattern :
    * -> la fonction callback est exécutée.
    *
    * Exemple :
    * URL = #/Details/S001
    * => RouteDetails déclenchée
    */

    /*
    ==========================================================================
    Paramètre 1 : this._onObjectMatched
    ==========================================================================
    *
    * Fonction callback exécutée lorsque la route est atteinte.
    *
    * Ici :
    * _onObjectMatched()
    * sera appelée automatiquement par UI5.
    */

    /*
    ==========================================================================
    Paramètre 2 : this
    ==========================================================================
    *
    * POINT TRÈS IMPORTANT EN JAVASCRIPT
    * ------------------------------------------------------------------------
    * Permet de conserver le bon contexte du controller.
    *
    * Sans ce paramètre :
    * this ne pointerait plus vers le controller.
    *
    * Exemple problème :
    *
    * this.getView(); // ❌ erreur possible
    *
    * Pourquoi ?
    * Parce que JavaScript change automatiquement le contexte
    * lors d’un callback.
    *
    * Avec "this" :
    * UI5 force le contexte du controller.
    */

    this.getRouter()
        .getRoute("RouteDetails")
        .attachPatternMatched(this._onObjectMatched, this);

},
```

## 🧩 8. LIRE LE PARAMÈTRE URL & BINDER LA VIEW DETAILS

Path :

    webapp/controller/Details.controller.js

Code à ajouter :

```js
/**
 * _onObjectMatched()
 * ---------------------------------------------------------------------------
 * Fonction exécutée automatiquement lorsque :
 * - la route "RouteDetails" est atteinte
 * - le pattern URL correspond
 *
 * Exemple :
 * #/Details/S001
 *
 * OBJECTIF :
 * - récupérer les paramètres transmis par le routing
 * - ici : récupérer l’IdSession depuis l’URL
 */
_onObjectMatched: function (oEvent) {

    /*
    ==========================================================================
    oEvent
    ==========================================================================
    *
    * Objet événement SAPUI5 fourni automatiquement par le Router.
    *
    * Contient :
    * - informations de navigation
    * - paramètres de route
    * - données du routing
    */

    /*
    ==========================================================================
    getParameter("arguments")
    ==========================================================================
    *
    * Récupère les paramètres dynamiques transmis par navTo().
    *
    * Exemple précédent :
    *
    * this.getRouter().navTo("RouteDetails", {
    *     IdSession: "S001"
    * });
    *
    * Le router transmet alors :
    *
    * {
    *     IdSession: "S001"
    * }
    */

    /*
    ==========================================================================
    .IdSession
    ==========================================================================
    *
    * Lecture directe de la propriété IdSession.
    *
    * IMPORTANT :
    * Le nom doit correspondre exactement :
    * - au manifest.json
    * - au navTo()
    *
    * Exemple manifest :
    *
    * "pattern": "Details/{IdSession}"
    *
    * {IdSession}
    * devient donc :
    * arguments.IdSession
    */

    /*
    ==========================================================================
    Résultat final
    ==========================================================================
    *
    * sIdSession contient :
    * - "S001"
    * - "S002"
    * - etc.
    *
    * selon la session sélectionnée.
    */
    var sIdSession =
        oEvent.getParameter("arguments").IdSession;

    /*
    ==========================================================================
    Affichage console
    ==========================================================================
    *
    * Permet de vérifier :
    * - que la navigation fonctionne
    * - que l’ID a bien été transmis
    */
    console.log("SESSION:", sIdSession);

    /**
     * bindElement()
     * ---------------------------------------------------------------------------
     * OBJECTIF :
     * - lier (bind) la vue entière à une entité OData précise
     *
     * CONCEPT UI5 IMPORTANT :
     * ---------------------------------------------------------------------------
     * Avant bindElement :
     * - la vue n’a pas de contexte de données unique
     * - les champs doivent être remplis manuellement ou via model property
     *
     * Après bindElement :
     * - la vue devient "contextuelle"
     * - tous les bindings relatifs (ex : "{Annee}") pointent automatiquement
     *   vers l’entité sélectionnée
     *
     * Exemple :
     * /SessionSet('S001')
     * => la vue affiche directement les données de S001
     */
    this.getView().bindElement({
    /*
        ==========================================================================
        path
        ==========================================================================
        *
        * Chemin OData vers UNE entité unique.
        *
        * Syntaxe OData V2 :
        * /EntitySet('ID')
        *
        * Ici :
        * - SessionSet = collection
        * - 'S001' = clé primaire de l’entité
        *
        * Résultat :
        * UI5 charge automatiquement :
        * {
        *   IdSession: "S001",
        *   Annee: "2025",
        *   Duree: "90",
        *   Site: "Paris"
        * }
        */
    path: "/SessionSet('" + sIdSession + "')",

    /*
        ==========================================================================
        RESULTAT DU BINDING
        ==========================================================================
        *
        * Une fois bindElement exécuté :
        *
        * - this.getView().getBindingContext()
        *   => retourne l’objet Session courant
        *
        * - tous les contrôles liés à :
        *   "{IdSession}", "{Annee}", etc.
        *   => sont automatiquement remplis
        *
        * AVANT :
        * <Input value="{view>/sessionForm/Annee}" />
        *
        * APRÈS bindElement :
        * <Text text="{Annee}" />
        */
    });
}
```

## 🧩 9. IMPLEMENTATION DU BOUTON BACK

Path :

    webapp/controller/Details.controller.js

Code :

```js
onNavBack: function () {

    /*
    ==========================================================
    OBJECTIF DE LA FONCTION
    ==========================================================

    Cette fonction gère le retour arrière dans l’application.

    Elle permet :
    - de revenir à la page précédente si l’utilisateur a navigué
    - ou de rediriger vers la page d’accueil si aucun historique
    */

    /*
    ==========================================================
    ACCÈS AU ROUTER SAPUI5
    ==========================================================

    this.getRouter()
    - récupère le Router défini dans le Component.js

    Rôle du Router :
    - gérer la navigation entre les vues
    - lire les routes définies dans manifest.json
    */
    var oRouter = this.getRouter();

    /*
    ==========================================================
    HISTORIQUE DE NAVIGATION SAPUI5
    ==========================================================

    sap.ui.core.routing.History
    - classe SAPUI5 qui permet d’analyser l’historique de navigation

    getInstance()
    - récupère l’instance singleton de l’historique

    getPreviousHash()
    - retourne la dernière route visitée (hash URL SAPUI5)
    - ex: "#/details/S001"
    */
    var oHistory = sap.ui.core.routing.History.getInstance();
    var sPreviousHash = oHistory.getPreviousHash();

    /*
    ==========================================================
    LOGIQUE DE NAVIGATION
    ==========================================================

    Cas 1 : historique existe
    - l’utilisateur a navigué depuis une autre page
    - on utilise le navigateur pour revenir en arrière

    Cas 2 : pas d’historique
    - l’utilisateur a ouvert directement la page
    - on redirige vers la page d’accueil
    */

    if (sPreviousHash !== undefined) {

        /*
        ======================================================
        NAVIGATION BROWSER
        ======================================================

        window.history.go(-1)
        - revient à la page précédente du navigateur
        - conserve l’état précédent
        */
        window.history.go(-1);

    } else {

        /*
        ======================================================
        NAVIGATION SAPUI5 FORCÉE
        ======================================================

        navTo("RouteHome")
        - redirige vers la route Home définie dans manifest.json

        paramètre "{}"
        - aucun paramètre transmis

        paramètre "true"
        - remplace l’URL actuelle dans l’historique
        (évite d’empiler les pages inutilement)
        */
        oRouter.navTo("RouteHome", {}, true);

    }
}
```

## 🧩 10. ARCHITECTURE OBTENUE

    Home
    └── Table SessionSet
            ↓
            click
            ↓
    Details
    └── bindElement(Session)
