# 🌸 APPEL AVEC CALL FUNCTION

## 🌺 OBJECTIFS

- [ ] Appeler un module fonction
- [ ] Mapper les paramètres réels et formels
- [ ] Comprendre l’inversion des mots-clés import et export
- [ ] Utiliser une génération d’appel depuis l’éditeur
- [ ] Contrôler `SY-SUBRC`

## 🌺 SYNTAXE GENERALE

    CALL FUNCTION 'NOM_DU_MODULE'
      EXPORTING
        parametre_import_module = valeur_appelante
      IMPORTING
        parametre_export_module = variable_reception
      CHANGING
        parametre_changing       = variable_modifiee
      TABLES
        parametre_table          = table_interne
      EXCEPTIONS
        exception_1              = 1
        OTHERS                   = 2.

## 🌺 POURQUOI IMPORT ET EXPORT SEMBLENT INVERSES

L’interface de `SE37` est décrite du point de vue du module fonction.

L’appel est écrit du point de vue du programme appelant.

| 🍧 Interface du module | 🍧 Appel `CALL FUNCTION` |
| ---------------------- | ------------------------ |
| Import                 | `EXPORTING`              |
| Export                 | `IMPORTING`              |
| Changing               | `CHANGING`               |
| Tables                 | `TABLES`                 |

> [!TIP]
> Le programme appelant **exporte** les données que le module **importe**.

## 🌺 EXEMPLE COMPLET

    DATA lv_total       TYPE decfloat34.
    DATA lv_description TYPE string VALUE `  Formation ABAP  `.

    CALL FUNCTION 'Z_AELION_CALCULATE_TOTAL'
      EXPORTING
        iv_quantity    = 4
        iv_unit_price  = '12.50'
      IMPORTING
        ev_total       = lv_total
      CHANGING
        cv_description = lv_description
      EXCEPTIONS
        invalid_quantity = 1
        invalid_price    = 2
        OTHERS           = 3.

    CASE sy-subrc.
      WHEN 0.
        WRITE: / |Total : { lv_total }|,
               / |Description : { lv_description }|.
      WHEN 1.
        WRITE / 'Quantité invalide'.
      WHEN 2.
        WRITE / 'Prix invalide'.
      WHEN OTHERS.
        WRITE / 'Erreur non prévue'.
    ENDCASE.

## 🌺 PARAMETRES NOMMES

Le mapping explicite améliore la lisibilité :

    iv_quantity   = lv_quantity
    iv_unit_price = lv_unit_price

Éviter les noms génériques :

    input1 = value1
    output = result

## 🌺 GENERATION DE L'APPEL

Dans l’éditeur ABAP, l’appel peut être inséré à partir du motif ou du modèle de déclaration du module fonction.

Cette génération réduit les erreurs de nom de paramètre, mais elle ne remplace pas la compréhension de l’interface.

## 🌺 PARAMETRE FACULTATIF

Un paramètre facultatif peut être omis :

    CALL FUNCTION 'Z_AELION_FORMAT_TEXT'
      EXPORTING
        iv_text = `abap`
      IMPORTING
        ev_text = DATA(lv_text).

Si `IV_PREFIX` est facultatif, aucune ligne n’est nécessaire.

## 🌺 APPEL DYNAMIQUE

ABAP permet techniquement un nom dynamique :

    DATA lv_function_name TYPE rs38l_fnam VALUE 'Z_AELION_CALCULATE_TOTAL'.

    CALL FUNCTION lv_function_name.

> [!WARNING]
> L’appel dynamique réduit la vérification statique et la traçabilité. Il doit répondre à un besoin réel de framework ou de paramétrage.

## 🌺 BONNES PRATIQUES

- Utiliser les paramètres nommés.
- Générer le modèle d’appel puis supprimer les lignes inutiles.
- Contrôler `SY-SUBRC` lorsque des exceptions classiques sont déclarées.
- Ne pas ignorer `OTHERS` sans décision explicite.
- Initialiser ou vider les variables de sortie lorsque leur réutilisation peut créer une ambiguïté.
- Éviter les appels dynamiques non nécessaires.

## 🌺 EXERCICES

1. Appeler un module recevant deux nombres.
2. Récupérer leur somme dans une variable inline.
3. Ajouter deux exceptions et traiter `SY-SUBRC` avec `CASE`.
4. Omettre un paramètre facultatif puis le fournir dans un second test.
5. Expliquer l’inversion entre l’interface et l’appel.

## 🌺 RESUME

> - L’appel utilise `CALL FUNCTION`.
> - Les imports du module sont placés sous `EXPORTING` dans l’appel.
> - Les exports du module sont placés sous `IMPORTING` dans l’appel.
> - `CHANGING` reste `CHANGING`.
> - Les exceptions classiques sont généralement contrôlées avec `SY-SUBRC`.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — `CALL FUNCTION` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapcall_function.htm
- SAP Help Portal — Calling Function Modules from Your Programs : https://help.sap.com/docs/ABAP_PLATFORM_NEW/bd833c8355f34e96a6e83096b38bf192/d1801edb454211d189710000e8322d00.html
