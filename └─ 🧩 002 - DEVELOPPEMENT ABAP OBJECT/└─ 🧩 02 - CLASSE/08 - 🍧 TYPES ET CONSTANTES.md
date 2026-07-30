# 🌸 TYPES ET CONSTANTES DANS UNE CLASSE

## 🌺 OBJECTIFS

- [ ] Déclarer un type dans une classe
- [ ] Déclarer une structure et une table interne spécifiques
- [ ] Distinguer type public et type privé
- [ ] Utiliser un type public depuis l’extérieur
- [ ] Déclarer et utiliser une constante de classe

## 🌺 DEFINITION

> Une classe peut déclarer ses propres types avec `TYPES`.
> Ces types décrivent les données utilisées par son interface publique ou par son traitement interne.

Les types ne sont pas des attributs.
Ils décrivent une forme de donnée, mais ne stockent aucune valeur.

## 🌺 TYPE PUBLIC

    PUBLIC SECTION.
      TYPES ty_amount TYPE decfloat34.

Un type public peut être utilisé depuis l’extérieur de la classe.

    DATA lv_amount TYPE lcl_payment=>ty_amount.

Le sélecteur `=>` permet d’accéder au type déclaré par la classe.

## 🌺 STRUCTURE PUBLIQUE

    PUBLIC SECTION.
      TYPES:
        BEGIN OF ty_product,
          id    TYPE string,
          name  TYPE string,
          price TYPE decfloat34,
        END OF ty_product.

Utilisation extérieure :

    DATA ls_product TYPE lcl_catalog=>ty_product.

## 🌺 TABLE INTERNE PUBLIQUE

    PUBLIC SECTION.
      TYPES tt_product TYPE STANDARD TABLE OF ty_product WITH EMPTY KEY.

Utilisation :

    DATA lt_product TYPE lcl_catalog=>tt_product.

## 🌺 TYPE PRIVE

    PRIVATE SECTION.
      TYPES:
        BEGIN OF ty_internal_log,
          timestamp TYPE timestampl,
          message   TYPE string,
        END OF ty_internal_log.

Ce type peut être utilisé uniquement dans la classe.

> [!IMPORTANT]
> Un type privé ne doit pas apparaître dans la signature publique d’une méthode.
> Le programme extérieur ne pourrait pas le déclarer ni l’utiliser.

## 🌺 CONSTANTE DE CLASSE

    PUBLIC SECTION.
      CONSTANTS gc_status_active TYPE string VALUE 'ACTIVE'.

Utilisation extérieure :

    IF lv_status = lcl_product=>gc_status_active.
      WRITE: / 'Produit actif'.
    ENDIF.

Les constantes sont liées à la classe et sont accessibles avec `=>` lorsqu’elles sont publiques.

## 🌺 EXEMPLE COMPLET

    REPORT zaelion_oo_08.

    CLASS lcl_catalog DEFINITION.
      PUBLIC SECTION.
        TYPES:
          BEGIN OF ty_product,
            id     TYPE string,
            name   TYPE string,
            status TYPE string,
          END OF ty_product.

        TYPES tt_product TYPE STANDARD TABLE OF ty_product WITH EMPTY KEY.

        CONSTANTS gc_status_active   TYPE string VALUE 'ACTIVE'.
        CONSTANTS gc_status_inactive TYPE string VALUE 'INACTIVE'.

        METHODS add_product
          IMPORTING
            is_product TYPE ty_product.

        METHODS get_products
          RETURNING
            VALUE(rt_products) TYPE tt_product.

      PRIVATE SECTION.
        TYPES:
          BEGIN OF ty_internal_counter,
            added TYPE i,
          END OF ty_internal_counter.

        DATA mt_products TYPE tt_product.
        DATA ms_counter  TYPE ty_internal_counter.
    ENDCLASS.

    CLASS lcl_catalog IMPLEMENTATION.
      METHOD add_product.
        APPEND is_product TO mt_products.
        ms_counter-added = ms_counter-added + 1.
      ENDMETHOD.

      METHOD get_products.
        rt_products = mt_products.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA(lo_catalog) = NEW lcl_catalog( ).

      DATA(ls_product) = VALUE lcl_catalog=>ty_product(
        id     = 'P100'
        name   = 'Ecran'
        status = lcl_catalog=>gc_status_active ).

      lo_catalog->add_product( is_product = ls_product ).

      DATA(lt_products) = lo_catalog->get_products( ).

      LOOP AT lt_products INTO ls_product.
        WRITE: / ls_product-id,
                 ls_product-name,
                 ls_product-status.
      ENDLOOP.

## 🌺 VISIBILITE ET CONTRAT

| 🍧 Élément                     | 🍧 Visibilité recommandée |
| ------------------------------ | ------------------------- |
| Type utilisé par les appelants | Public                    |
| Type d’un paramètre public     | Public                    |
| Type purement technique        | Privé                     |
| Constante métier partagée      | Publique si nécessaire    |
| Constante d’implémentation     | Privée                    |

## 🌺 BONNES PRATIQUES

- Déclarer publiquement uniquement les types nécessaires aux appelants.
- Conserver les structures techniques en privé.
- Utiliser `ty_` pour un type élémentaire ou structuré.
- Utiliser `tt_` pour un type de table interne.
- Utiliser `gc_` pour une constante publique ou statique selon la convention projet.
- Préférer une constante nommée à une valeur littérale répétée.

## 🌺 EXERCICES

1. Créer une classe `lcl_order_service`.
2. Déclarer un type public `ty_order` avec numéro, client et montant.
3. Déclarer un type public de table `tt_order`.
4. Déclarer deux constantes publiques de statut.
5. Déclarer un type privé pour un journal technique.
6. Ajouter une méthode retournant une table de commandes.

## 🌺 RESUME

> - `TYPES` déclare un modèle de donnée dans une classe.
> - Un type public est accessible avec `classe=>type`.
> - Un type privé reste limité à l’implémentation.
> - Les types publics font partie du contrat de la classe.
> - Les constantes évitent les valeurs littérales dispersées.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — Data Types and Constants of Classes : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenclass_types_constants.htm
- SAP ABAP Keyword Documentation — Class Component Selector : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenclass_component_selector.htm
