# 🌸 WEBAPP/VIEW/APP.VIEW.XML

> 🌺 Objectifs
>
> - [ ] Définir le conteneur principal de l’application Fiori.
> - [ ] Gérer la navigation entre les différentes vues.
> - [ ] Servir de point d’entrée pour les vues enfants.

## 🧩 DEFINITION

`App.view.xml` est la vue racine de l’application.  
Elle contient généralement un `App` ou un `NavContainer` qui oriente la navigation entre les différentes vues comme Home ou Detail.  
Cette vue ne contient pas directement de logique métier spécifique, mais sert de structure de navigation.

> [!TIP]  
> Pense à `App.view.xml` comme à la coque de ton application : elle contient tous les écrans et permet de naviguer entre eux.

## 🧩 UTILITE

- Héberger le `NavContainer` ou le router.
- Servir de point d’ancrage pour toutes les vues enfants.
- Faciliter la navigation entre Home, Detail et autres écrans.

> [!TIP]  
> Cette vue est obligatoire dans presque toutes les applications Fiori pour gérer le cycle de vie et la navigation.

## 🧩 POINTS IMPORTANTS

- Associée au `App.controller.js`.
- Contient rarement des éléments de contenu directs (sauf pour des layouts globaux).
- Doit être chargée une seule fois au démarrage de l’application.

## 🧩 EXEMPLE

```xml
	<mvc:View
	    xmlns:mvc="sap.ui.core.mvc"
	    xmlns="sap.m"
	    controllerName="appdemofgi.controller.App">
	    <App id="app">
	        <pages>
	            <mvc:XMLView viewName="appdemofgi.view.Home"/>
	        </pages>
	    </App>
	</mvc:View>
```
