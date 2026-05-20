# 🌸 MATCH-CODE

## 🌺 OBJECTIFS

- [ ] COMPRENDRE LE FONCTIONNEMENT DES MATCH-CODES DANS UN SELECTION-SCREEN
- [ ] UTILISER LES MATCH-CODES AUTOMATIQUES ET SPECIFIQUES
- [ ] FACILITER LA SELECTION DE DONNEES PAR L’UTILISATEUR FINAL

## 🌺 DEFINITION

> Les `MATCH-CODES` sont des aides à la recherche qui permettent à l’utilisateur d’afficher une liste de choix pour faciliter la sélection de données.  
> Ils sont souvent utilisés dans les `SELECTION-SCREENS` pour améliorer l’expérience utilisateur et réduire les erreurs de saisie.

> [!TIP]
> Imaginez un moteur de recherche avec suggestions automatiques lorsque vous commencez à taper un mot-clé. Les `MATCH-CODES` font la même chose pour les champs SAP : ils suggèrent les valeurs possibles.

## 🌺 COMPORTEMENT STANDARD

- Dans un `SELECTION-SCREEN`, un `MATCH-CODE` apparaît automatiquement à droite des champs si le typage (`TYPE` pour les `PARAMETERS`, `FOR` pour les `SELECT-OPTIONS`) fait référence à un champ de table DDIC.

_Exemple :_

    PARAMETERS: p_vbeln TYPE vbak-vbeln,
                p_posnr TYPE vbap-posnr.

> [!IMPORTANT]
>
> - Ici, `p_vbeln` et `p_posnr` sont typés sur des champs de table.
> - SAP propose automatiquement les `MATCH-CODES` associés aux champs.
> - Si le typage est sur un type simple (ex: `TYPE vbeln`), aucun `MATCH-CODE` ne sera proposé.

> [!NOTE]
> Les `MATCH-CODES` automatiques permettent d’éviter de créer manuellement une liste de valeurs.

## 🌺 MATCH-CODES SPECIFIQUES

- Il est possible de créer un `MATCH-CODE` spécifique pour un `PARAMETERS` ou `SELECT-OPTIONS` :

1. Créer le `MATCH-CODE` via la transaction SE11 ou l’aide à la recherche.
2. Ajouter le paramètre `MATCHCODE OBJECT nom_du_match_code` à la déclaration.

_Exemple :_

    PARAMETERS: p_matnr TYPE mara-matnr MATCHCODE OBJECT zar_mara.

> [!IMPORTANT]
>
> - `p_matnr` est typé sur `mara-matnr`.
> - Le `MATCH-CODE` spécifique `zar_mara` est utilisé pour afficher les colonnes et valeurs personnalisées définies dans l’aide à la recherche.

> [!IMPORTANT]
> Les `MATCH-CODES` spécifiques permettent de montrer uniquement les valeurs pertinentes et d’améliorer la lisibilité pour l’utilisateur.

## 🌺 BONNES PRATIQUES

- Toujours utiliser les `MATCH-CODES` automatiques lorsque le typage est fait sur des champs de table.
- Créer des `MATCH-CODES` spécifiques pour filtrer et personnaliser la liste des valeurs si nécessaire.
- Tester le comportement de l’aide à la recherche pour différents profils d’utilisateurs.

## 🌺 RESUME

> - Les `MATCH-CODES` facilitent la sélection des données sur les `SELECTION-SCREENS`.
> - Typage sur table DDIC = `MATCH-CODE` automatique.
> - Typage sur type simple = pas de `MATCH-CODE`.
> - Les `MATCH-CODES` spécifiques permettent d’afficher des colonnes et valeurs personnalisées pour améliorer l’expérience utilisateur.
