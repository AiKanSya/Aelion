# 🌸 WEBAPP/I18N/I18N_XX.PROPERTIES

> 🌺 Objectifs
>
> - [ ] Comprendre le rôle des fichiers de traduction pour chaque langue.
> - [ ] Savoir comment adapter l’interface utilisateur à différentes langues.
> - [ ] Apprendre à créer ou modifier des traductions spécifiques.

## 🧩 DEFINITION

`i18n_XX.properties` est un fichier de traduction spécifique à une langue (où `XX` correspond au code de langue, par exemple `en` pour anglais ou `fr` pour français).  
Il contient des paires clé=valeur pour les textes à afficher dans l’interface utilisateur dans cette langue.

> [!TIP]  
> Pense à `i18n_XX.properties` comme à un dictionnaire pour une langue précise. Si une clé n’existe pas ici, UI5 prendra la valeur par défaut du fichier `i18n.properties`.

## 🧩 UTILITE

- Permet d’adapter l’application à la langue de l’utilisateur.
- Facilite la maintenance et la traduction multi-langue.
- Assure que tous les textes affichés correspondent à la langue choisie.

> [!TIP]  
> Chaque langue possède son propre fichier, ce qui permet de traduire l’application sans toucher au code.

## 🧩 POINTS IMPORTANTS

- Doit avoir les mêmes clés que le fichier `i18n.properties`.
- Utilisé automatiquement par le `ResourceModel` défini dans le `manifest.json`.
- Peut contenir uniquement les traductions qui diffèrent du fichier par défaut.

## 🧩 EXEMPLE

```properties
    # i18n_en.properties
    appTitle=Fiori App
    homeTitle=Home
    detailTitle=Detail
    buttonSave=Save
    buttonCancel=Cancel
```

```properties
    # i18n_fr.properties
    appTitle=Application Fiori
    homeTitle=Accueil
    detailTitle=Détail
    buttonSave=Enregistrer
    buttonCancel=Annuler
```
