# 🌸 WEBAPP/I18N/I18N.PROPERTIES

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle du fichier de traduction par défaut.
> - [ ] Savoir comment l’utiliser pour gérer les textes de l’application.
> - [ ] Apprendre à ajouter ou modifier des clés de traduction.

## 🧩 DEFINITION

`i18n.properties` est le fichier de texte par défaut pour l’internationalisation (i18n) de l’application.  
Il contient des paires clé=valeur pour tous les textes affichés dans l’interface utilisateur.  
Les autres fichiers comme `i18n_en.properties` ou `i18n_fr.properties` sont des variantes pour des langues spécifiques.

> [!TIP]  
> Pense à `i18n.properties` comme au dictionnaire principal de l’application. Si une traduction spécifique n’existe pas pour une langue, UI5 utilisera ce fichier par défaut.

## 🧩 UTILITE

- Permet de séparer le texte du code, facilitant la maintenance et la traduction.
- Fournit des valeurs par défaut si la langue de l’utilisateur n’est pas disponible.
- Sert de référence pour toutes les autres langues.

> [!TIP]  
> Les clés de ce fichier sont utilisées dans les vues XML ou les contrôleurs via `{i18n>clé}`.

## 🧩 POINTS IMPORTANTS

- Contient les textes principaux de l’application (titres, labels, messages).
- Est utilisé automatiquement par le `ResourceModel` défini dans le `manifest.json`.
- Doit être modifié uniquement pour les textes communs à toutes les langues.

## 🧩 EXEMPLE

```properties
	appTitle=Fiori App
	homeTitle=Home
	detailTitle=Detail
	buttonSave=Save
	buttonCancel=Cancel
```
