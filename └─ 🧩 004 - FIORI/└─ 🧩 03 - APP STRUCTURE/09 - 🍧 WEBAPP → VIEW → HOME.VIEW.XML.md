# 🌸 WEBAPP/VIEW/HOME.VIEW.XML

> 🌺 Objectifs
>
> - [ ] Afficher l’écran principal de l’application.
> - [ ] Présenter les données principales à l’utilisateur.
> - [ ] Permettre la navigation vers les vues de détail.

## 🧩 DEFINITION

`Home.view.xml` est la vue principale de l’application Fiori.  
Elle contient les éléments d’interface que l’utilisateur voit au lancement, comme des listes, tableaux ou boutons.  
Cette vue est associée au Home.controller.js, qui gère la logique et les interactions.

> [!TIP]  
> Pense à `Home.view.xml` comme à l’accueil de ton application : c’est la première page que l’utilisateur verra.

## 🧩 UTILITE

- Afficher les données principales de l’application.
- Permettre la sélection d’éléments pour naviguer vers Detail.
- Définir la mise en page et les composants visibles à l’ouverture.

> [!TIP]  
> Les vues XML permettent de lier directement les données aux contrôleurs via des bindings.

## 🧩 POINTS IMPORTANTS

- Contient des éléments interactifs comme `List`, `Table` ou `Button`.
- Les événements utilisateur sont gérés dans le `Home.controller.js`.
- Liée à un modèle de données pour afficher dynamiquement le contenu.

## 🧩 EXEMPLE

```xml
	<mvc:View
	    xmlns:mvc="sap.ui.core.mvc"
	    xmlns="sap.m"
	    controllerName="appdemofgi.controller.Home">
	    <Page title="{i18n>homeTitle}">
	        <List items="{/Items}">
	            <StandardListItem
	                title="{Name}"
	                description="{Description}"
	                type="Navigation"
	                press=".onItemPress"/>
	        </List>
	    </Page>
	</mvc:View>
```
