# 🌸 FILTER BINDING

> 🌺 Objectifs
>
> - [ ] Récupérer les données pour les futures implémentations des Opérations CRUD

## 🧩 DETAILS.CONTROLLER

Path :

     webapp/controller/Details.controller.js

Adaptation du code :

```js
_onObjectMatched: function (oEvent) {

    /*
    ==========================================================
    1. RÉCUPÉRATION PARAMÈTRE ROUTE
    ==========================================================

    SAPUI5 Router envoie des paramètres dans "arguments".

    Exemple :
    navTo("RouteDetails", { IdSession: "S001" })

    Ici :
    → on récupère "S001"
    */
    var sIdSession = oEvent.getParameter("arguments").IdSession;

    console.log("SESSION ACTIVE :", sIdSession);

    /*
    ==========================================================
    2. BINDING DE LA SESSION (PAGE DETAILS)
    ==========================================================

    Objectif :
    - connecter la page à une entité OData précise

    Résultat :
    - les champs de la session se remplissent automatiquement
    */
    this.getView().bindElement({
        path: "/SessionSet('" + sIdSession + "')"
    });

    /*
    ==========================================================
    3. RÉCUPÉRATION DE LA TABLE
    ==========================================================

    getView().byId()
    → permet d’accéder à un contrôle UI5 dans la vue

    Ici :
    → table des consultants
    */
    var oTable = this.getView().byId("consultantTableBySession");

    /*
    Sécurité :
    - si la table n’existe pas → éviter crash JS
    */
    if (!oTable) {
        console.error("Table consultantTableBySession introuvable");
        return;
    }

    /*
    ==========================================================
    4. RÉCUPÉRATION DU BINDING ITEMS
    ==========================================================

    getBinding("items")
    → récupère la liaison de données de la table

    Ici :
    items="{/ConsultantSet}"
    */
    var oBinding = oTable.getBinding("items");

    if (!oBinding) {
        console.error("Binding items introuvable");
        return;
    }

    /*
    ==========================================================
    5. CRÉATION DU FILTRE SAPUI5
    ==========================================================

    sap.ui.model.Filter :
    - 1er paramètre : champ OData (IdSession)
    - 2e paramètre : opérateur (EQ = égal)
    - 3e paramètre : valeur (S001, S002...)

    Résultat :
    → on garde uniquement les consultants de la session
    */
    var oFilter = new sap.ui.model.Filter(
        "IdSession",
        sap.ui.model.FilterOperator.EQ,
        sIdSession
    );

    /*
    ==========================================================
    6. APPLICATION DU FILTRE
    ==========================================================

    filter([])
    → remplace les données affichées dans la table

    Important :
    - les données ne sont PAS supprimées du backend
    - seul l’affichage est filtré côté UI5
    */
    oBinding.filter([oFilter]);
}
```

## 🧩 ADAPTATION DE LA VIEW DETAILS.VIEW

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

            <!-- ===================== -->
            <!-- TABLE CONSULTANTSET -->
            <!-- ===================== -->
            <Table
                id="consultantTableBySession"
                items="{/ConsultantSet}"
                inset="false"
                headerText="Consultants"
            >
                <columns>
                    <Column>
                        <Text text="Session" />
                    </Column>
                    <Column>
                        <Text text="IdConsultant" />
                    </Column>
                    <Column>
                        <Text text="Nom" />
                    </Column>
                    <Column>
                        <Text text="Entreprise" />
                    </Column>
                    <Column>
                        <Text text="Ville" />
                    </Column>
                    <Column>
                        <Text text="Pays" />
                    </Column>
                    <Column>
                        <Text text="Lang" />
                    </Column>
                </columns>

                <items>
                    <ColumnListItem>
                        <cells>
                            <Text text="{IdSession}" />
                            <Text text="{IdConsultant}" />
                            <Text text="{Name}" />
                            <Text text="{Entreprise}" />
                            <Text text="{City}" />
                            <Text text="{Country}" />
                            <Text text="{Lang}" />
                        </cells>
                    </ColumnListItem>
                </items>
            </Table>
        </content>
    </Page>
</mvc:View>

```
