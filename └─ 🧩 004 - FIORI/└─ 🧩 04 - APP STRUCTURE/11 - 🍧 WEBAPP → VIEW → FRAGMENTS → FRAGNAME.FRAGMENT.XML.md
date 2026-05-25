# 🌸 WEBAPP/VIEW/FRAGMENTS/FRAGMENTNAME.FRAGMENT.XML

> 🌺 Objectifs
>
> - [ ] Réutiliser des morceaux d’interface dans plusieurs vues.
> - [ ] Éviter la duplication de code XML.
> - [ ] Faciliter la maintenance et la modularité de l’interface.

## 🧩 DEFINITION

Un fragment XML est un petit composant d’interface réutilisable, comme un formulaire, un bouton ou une boîte de dialogue.  
Il ne possède pas de contrôleur dédié et est intégré dans une vue principale via `<core:Fragment>` ou un `Fragment.load`.

> [!TIP]  
> Pense à un fragment comme à un module réutilisable de l’interface : tu écris une fois et tu l’utilises partout.

## 🧩 UTILITE

- Réutiliser les mêmes composants UI dans plusieurs vues.
- Créer des dialogues (`Dialog`), des fragments de formulaires ou des listes.
- Garder les vues principales propres et lisibles.

> [!TIP]  
> Les fragments sont souvent utilisés pour les pop-ups ou les sections répétitives de l’interface.

## 🧩 POINTS IMPORTANTS

- Ne possède pas de cycle de vie complet comme une vue (`onInit`, `onBeforeRendering`).
- Est chargé depuis le contrôleur de la vue qui l’utilise.
- Permet de maintenir un code XML modulaire.

## 🧩 EXEMPLE

```xml
	<core:FragmentDefinition
	    xmlns="sap.m"
	    xmlns:core="sap.ui.core">
	    <VBox>
	        <Label text="{i18n>nameLabel}"/>
	        <Input value="{Name}"/>
	        <Label text="{i18n>descriptionLabel}"/>
	        <Input value="{Description}"/>
	    </VBox>
	</core:FragmentDefinition>
```
