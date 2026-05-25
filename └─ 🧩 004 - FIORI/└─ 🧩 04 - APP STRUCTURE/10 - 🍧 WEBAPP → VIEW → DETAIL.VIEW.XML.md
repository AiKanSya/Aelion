# 🌸 WEBAPP/VIEW/DETAIL.VIEW.XML

> 🌺 Objectifs
>
> - [ ] Afficher les informations détaillées d’un élément sélectionné depuis la vue Home.
> - [ ] Permettre la consultation et éventuellement la modification des données.
> - [ ] Fournir un écran spécifique à un objet métier.

## 🧩 DEFINITION

`Detail.view.xml` est la vue de détail d’un élément sélectionné.  
Elle est associée au `Detail.controller.js`, qui gère le chargement des données, les actions de l’utilisateur et la navigation éventuelle vers d’autres écrans.

> [!TIP]  
> Pense à `Detail.view.xml` comme à la fiche détaillée d’un élément : elle montre toutes les informations importantes et les options d’action.

## 🧩 UTILITE

- Afficher les détails d’un objet sélectionné dans la Home.view.xml.
- Permettre à l’utilisateur de consulter ou modifier des informations.
- Gérer les interactions spécifiques au détail d’un élément.

> [!TIP]  
> Chaque vue de détail a son propre contrôleur pour garder la logique isolée et simple à maintenir.

## 🧩 POINTS IMPORTANTS

- Les données sont liées via un modèle (`bindElement`) pour afficher dynamiquement le contenu.
- Contient des composants interactifs comme `Input`, `Text`, `Button`, ou `ObjectHeader`.
- Gère les événements utilisateur dans le `Detail.controller.js`.

## 🧩 EXEMPLE

```js
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns="sap.m"
  controllerName="appdemofgi.controller.Detail"
>
  <Page title="{i18n>detailTitle}">
    <ObjectHeader title="{Name}" number="{ID}" numberUnit="{Unit}" />
    <VBox>
      <Text text="{Description}" />
      <Button text="{i18n>buttonSave}" press=".onSave" />
      <Button text="{i18n>buttonCancel}" press=".onCancel" />
    </VBox>
  </Page>
</mvc:View>
```
