# 🌸 TABLE

> 🌺 Objectifs
>
> - [ ] Comprendre les différents types de tables en SAP UI5
> - [ ] Savoir quand utiliser chaque table
> - [ ] Lire et créer une table simple
> - [ ] Identifier les propriétés importantes : colonnes, items, binding, selection

## 🧩 CLASSES & SAMPLES

### 🍧 SAP.M.TABLE (MOBILE TABLE)

- [Class sap.m.Table](https://sapui5.netweaver.ondemand.com/#/api/sap.m.Table)
- [Samples sap.m.Table](https://sapui5.netweaver.ondemand.com/#/entity/sap.m.Table)

### 🍧 SAP.UI.TABLE (CLASSIC TABLE / DESKTOP)

- [Class sap.ui.Table](https://sapui5.netweaver.ondemand.com/#/api/sap.ui.table.Table)
- [Samples sap.ui.Table](https://sapui5.netweaver.ondemand.com/#/entity/sap.ui.table.Table)

### 🍧 SAP.UI.COMP.SMARTTABLE (ODATA + SMART FEATURES)

- [Class sap.ui.comp.smarttable.SmartTable](https://sapui5.netweaver.ondemand.com/#/api/sap.ui.comp.smarttable.SmartTable)
- [Samples SmartTable](https://sapui5.netweaver.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable)

## 🧩 DEFINITION

> [!IMPORTANT]
> Une table est un composant UI5 permettant d’afficher des données structurées en lignes et colonnes.

Différents types existent selon les besoins :

- `sap.m.Table` : simple, responsive, mobile-friendly, faible nombre de données
- `sap.ui.Table` : desktop, riche en fonctionnalités, pour beaucoup de données
- `SmartTable` : table intelligente, génère colonnes automatiquement à partir d’un OData et propose tri, filtre et recherche intégrés

> [!TIP]
> Choisir la table selon l’usage :
>
> - mobile = sap.m.Table et faible nombre de données
> - desktop complexe = sap.ui.Table et grand nombre de données
> - OData rapide = SmartTable couplé avec sap.m.Table ou sap.ui.Table

## 🧩 DIFFÉRENCES PRINCIPALES

| 🍧 Critère             | 🍧 sap.m.Table         | 🍧 sap.ui.Table               | 🍧 sap.ui.comp.SmartTable                                  |
| ---------------------- | ---------------------- | ----------------------------- | ---------------------------------------------------------- |
| Type de table          | Mobile-first           | Desktop-first                 | Wrapper autour d’une table existante                       |
| Scroll                 | Scroll vertical simple | Scroll vertical et horizontal | Dépend du type de table choisi (`m` ou `ui`)               |
| Sélection              | Simple, Multi          | Simple, Multi, Interval       | Dépend de la table utilisée                                |
| Colonnes dynamiques    | Limité                 | Flexible                      | Oui, génère les colonnes automatiquement depuis le backend |
| Utilisation principale | Applications mobiles   | Applications desktop          | Applications Fiori avancées, basées sur OData              |

### 🍧 SMARTTABLE

La `SmartTable` est un composant intelligent : il lit les métadonnées OData et génère automatiquement les colonnes et filtres.

> [!IMPORTANT]
> Une SmartTable n’est pas une table en elle-même. Elle encapsule soit :
>
> - `sap.m.Table` → pour mobile et responsive
> - `sap.ui.Table` → pour desktop et écrans larges

> [!TIP]
> Quand vous voyez `SmartTable`, pensez "c’est une table automatique" et vérifiez quel type elle utilise derrière pour savoir comment l’adapter ou la styliser.

## 🧩 EXEMPLES

### 🍧 SAP.M.TABLE (MOBILE TABLE)

```xml
<mvc:View
    controllerName="fr.stms.bc.appdemofgi.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f">

    <f:DynamicPage
        id="dynamicPage"
        preserveHeaderStateOnScroll="true"
        showFooter="true">

        <!-- TITLE -->
        <f:title>
            <f:DynamicPageTitle>

                <!-- Titre principal -->
                <f:heading>
                    <Title text="{i18n>title}" />
                </f:heading>

                <!-- Actions équivalentes au headerContent de sap.m.Page -->
                <f:actions>
                    <Button
                        icon="sap-icon://action"
                        tooltip="Action header"
                        press="onHeaderAction" />
                </f:actions>

            </f:DynamicPageTitle>
        </f:title>

        <!-- HEADER -->
        <f:header>
            <f:DynamicPageHeader>
                <Text text="Zone HEADER (filtres, infos globales…)" />
            </f:DynamicPageHeader>
        </f:header>

        <!-- CONTENT -->
        <f:content>
            <VBox class="sapUiSmallMargin">
                <Text
                    id="TextId"
                    text="Lorem ipsum dolor sit amet" />

                <Text
                    text="Contenu principal de la page"
                    class="sapUiSmallMarginTop" />

                <Table
                    id="myTable"
                    inset="false"
                    headerText="Liste des articles"
                    growing="true"
                    mode="SingleSelectMaster"
                    class="sapUiSmallMarginTop"
                    items="{
                         path: '/Products',
                         sorter: {
                              path: 'Name'
                         }
                    }">

                    <columns>
                        <Column>
                                <Text text="Nom" />
                        </Column>
                        <Column>
                                <Text text="Quantité" />
                        </Column>
                        <Column>
                                <Text text="Prix" />
                        </Column>
                    </columns>

                    <items>
                        <ColumnListItem>
                                <cells>
                                    <Text text="{Name}" />
                                    <Text text="{Quantity}" />
                                    <Text text="{Price}" />
                                </cells>
                        </ColumnListItem>
                    </items>

                </Table>
            </VBox>
        </f:content>

        <!-- FOOTER -->
        <f:footer>
            <OverflowToolbar>

                <Button
                    text="Retour"
                    press="onNavBack" />

                <ToolbarSpacer />

                <Button
                    text="Valider"
                    type="Emphasized"
                    press="onValidate" />

            </OverflowToolbar>
        </f:footer>

    </f:DynamicPage>

</mvc:View>
```

### 🍧 SAP.UI.TABLE (CLASSIC TABLE / DESKTOP)

```xml
<mvc:View
    controllerName="fr.stms.bc.appdemofgi.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f"
    xmlns:table="sap.ui.table"
>
    <f:DynamicPage
        id="dynamicPage"
        preserveHeaderStateOnScroll="true"
        showFooter="true"
    >
        <!-- TITLE -->
        <f:title>
            <f:DynamicPageTitle>
                <!-- Titre principal -->
                <f:heading>
                    <Title text="{i18n>title}" />
                </f:heading>

                <!-- Actions équivalentes au headerContent de sap.m.Page -->
                <f:actions>
                    <Button
                        icon="sap-icon://action"
                        tooltip="Action header"
                        press="onHeaderAction"
                    />
                </f:actions>
            </f:DynamicPageTitle>
        </f:title>

        <!-- HEADER -->
        <f:header>
            <f:DynamicPageHeader>
                <Text text="Zone HEADER (filtres, infos globales…)" />
            </f:DynamicPageHeader>
        </f:header>

        <!-- CONTENT -->
        <f:content>
            <VBox class="sapUiSmallMargin">
                <Text
                    id="TextId"
                    text="Lorem ipsum dolor sit amet" />

                <Text
                    text="Contenu principal de la page"
                    class="sapUiSmallMarginTop" />

                <table:Table
                    id="myClassicTable"
                    rows="{/Products}"
                    selectionMode="Single" >
                    <table:columns>
                        <table:Column>
                            <Label text="Nom" />
                            <table:template>
                                <Text text="{Name}" />
                            </table:template>
                        </table:Column>
                        <table:Column>
                            <Label text="Quantité" />
                            <table:template>
                                <Text text="{Quantity}" />
                            </table:template>
                        </table:Column>
                        <table:Column>
                            <Label text="Prix" />
                            <table:template>
                                <Text text="{Price}" />
                            </table:template>
                        </table:Column>
                    </table:columns>
                </table:Table>
            </VBox>
        </f:content>

        <!-- FOOTER -->
        <f:footer>
            <OverflowToolbar>
                <Button
                    text="Retour"
                    press="onNavBack"
                />

                <ToolbarSpacer />

                <Button
                    text="Valider"
                    type="Emphasized"
                    press="onValidate"
                />
            </OverflowToolbar>
        </f:footer>
    </f:DynamicPage>
</mvc:View>
```

### 🍧 SAP.UI.COMP.SMARTTABLE (ODATA + SMART FEATURES)

```xml
<mvc:View
    controllerName="fr.stms.bc.appdemofgi.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f"
    xmlns:table="sap.ui.table"
    xmlns:smartTable="sap.ui.comp.smarttable"
>
    <f:DynamicPage
        id="dynamicPage"
        preserveHeaderStateOnScroll="true"
        showFooter="true"
    >
        <!-- TITLE -->
        <f:title>
            <f:DynamicPageTitle>
                <!-- Titre principal -->
                <f:heading>
                    <Title text="{i18n>title}" />
                </f:heading>

                <!-- Actions équivalentes au headerContent de sap.m.Page -->
                <f:actions>
                    <Button
                        icon="sap-icon://action"
                        tooltip="Action header"
                        press="onHeaderAction"
                    />
                </f:actions>
            </f:DynamicPageTitle>
        </f:title>

        <!-- HEADER -->
        <f:header>
            <f:DynamicPageHeader>
                <Text text="Zone HEADER (filtres, infos globales…)" />
            </f:DynamicPageHeader>
        </f:header>

        <!-- CONTENT -->
        <f:content>
            <VBox class="sapUiSmallMargin">
                <Text
                    id="TextId"
                    text="Lorem ipsum dolor sit amet"
                />

                <Text
                    text="Contenu principal de la page"
                    class="sapUiSmallMarginTop"
                />

                <smartTable:SmartTable
                    id="smartTable"
                    entitySet="ZC_PM_DEMANDE_APP"
                    smartFilterId="smartFilterBar"
                    enableAutoBinding="true"
                    showRowCount="true"
                    enableAutoColumnWidth="true"
                    header="{i18n>table.Header}"
                    noData="{i18n>table.NoData}"
                    persistencyKey="demandeAchat"
                    beforeRebindTable="onBeforeRebindTable"
                    visible="true" >
                    <smartTable:customToolbar>
                        <OverflowToolbar>
                            <ToolbarSpacer/>
                            <Button
                                text="{i18n>list.Validate}"
                                tooltip="{i18n>list.Validate}"
                                type="Accept"
                                press="onValidate" />
                            <Button
                                text="{i18n>list.Refuse}"
                                tooltip="{i18n>list.Refuse}"
                                type="Reject"
                                press="onRefuse" />
                        </OverflowToolbar>
                    </smartTable:customToolbar>

                    <smartTable:layoutData>
                        <FlexItemData growFactor="1" baseSize="95%" />
                    </smartTable:layoutData>

                    <table:Table
                        id="idTaskTable"
                        selectionMode="MultiToggle"
                        columnResize="Auto">
                    </table:Table>
                </smartTable:SmartTable>
            </VBox>
        </f:content>

        <!-- FOOTER -->
        <f:footer>
            <OverflowToolbar>
                <Button
                    text="Retour"
                    press="onNavBack"
                />

                <ToolbarSpacer />

                <Button
                    text="Valider"
                    type="Emphasized"
                    press="onValidate"
                />
            </OverflowToolbar>
        </f:footer>
    </f:DynamicPage>
</mvc:View>
```
