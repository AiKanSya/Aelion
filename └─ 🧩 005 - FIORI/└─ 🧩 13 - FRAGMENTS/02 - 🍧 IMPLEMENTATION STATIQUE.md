# 🌸 IMPLEMENTATION STATIQUE

> 🌺 Objectifs
>
> - [ ] Créer un Fragment statique

## 🧩 OBJECTIF

Nous souhaitons extraire le formulaire Session.

Actuellement dans Home.view.xml :

```js
<Panel headerText="Session Form">...</Panel>
```

## 🧩 1. CREATION D'UN FRAGMENT

Créer :

    webapp/view/fragments/SessionForm.fragment.xml

Code :

```js
<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core">
  <Panel headerText="Session Form" class="sapUiSmallMargin">
    <VBox>
      <Input value="{view>/sessionForm/IdSession}" placeholder="IdSession" />

      <Input value="{view>/sessionForm/Annee}" placeholder="Année" />

      <Input value="{view>/sessionForm/Duree}" placeholder="Durée" />

      <Input value="{view>/sessionForm/Site}" placeholder="Site" />

      <HBox>
        <Button text="READ BY ID" press="onReadSessionById" />

        <Button text="CREATE" press="onCreateSession" />

        <Button text="UPDATE" press="onUpdateSession" />

        <Button text="DELETE" press="onDeleteSession" />
      </HBox>
    </VBox>
  </Panel>
</core:FragmentDefinition>
```

## 🧩 2. ADAPTER LE HOME.VIEW.XML

Path :

    webapp/view/Home.view.xml

ajouter/vérifier la présence de :

```js
xmlns: core = "sap.ui.core";
```

dans la balise View :

```xml
<mvc:View
    controllerName="fr.stms.fgifirstappmodulename.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:core="sap.ui.core">
```

## 🧩 3. REMPLACER LE FORMULAIRE PAR

Path :

    webapp/view/Home.view.xml

```js
<core:Fragment
  fragmentName="fr.stms.fgifirstappmodulename.view.fragments.SessionForm"
  type="XML"
/>
```
