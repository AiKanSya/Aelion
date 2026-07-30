# 🌸 CONSTRUCTEURS

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle d’un constructeur d’instance
- [ ] Déclarer et implémenter `CONSTRUCTOR`
- [ ] Transmettre des valeurs lors de l’instanciation
- [ ] Comprendre le rôle de `CLASS_CONSTRUCTOR`
- [ ] Distinguer initialisation d’un objet et initialisation d’une classe

## 🌺 CONSTRUCTEUR D'INSTANCE

> `CONSTRUCTOR` est une méthode spéciale exécutée automatiquement lors de la création d’un objet.

Il sert à placer l’objet dans un état initial valide.

Déclaration :

    METHODS constructor
      IMPORTING
        iv_name TYPE string.

Implémentation :

    METHOD constructor.
      mv_name = iv_name.
    ENDMETHOD.

Instanciation :

    DATA(lo_person) = NEW lcl_person( iv_name = 'Nora' ).

## 🌺 EXEMPLE COMPLET

    REPORT zaelion_oo_07.

    CLASS lcl_product DEFINITION.
      PUBLIC SECTION.
        METHODS constructor
          IMPORTING
            iv_id    TYPE string
            iv_name  TYPE string
            iv_price TYPE decfloat34.

        METHODS display.

      PRIVATE SECTION.
        DATA mv_id    TYPE string.
        DATA mv_name  TYPE string.
        DATA mv_price TYPE decfloat34.
    ENDCLASS.

    CLASS lcl_product IMPLEMENTATION.
      METHOD constructor.
        mv_id    = iv_id.
        mv_name  = iv_name.
        mv_price = iv_price.
      ENDMETHOD.

      METHOD display.
        WRITE: / mv_id, mv_name, mv_price.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA(lo_product) = NEW lcl_product(
        iv_id    = 'P100'
        iv_name  = 'Clavier'
        iv_price = '59.90' ).

      lo_product->display( ).

## 🌺 REGLES DU CONSTRUCTEUR D'INSTANCE

- Il porte obligatoirement le nom `CONSTRUCTOR`.
- Il est appelé automatiquement lors de la création de l’objet.
- Il est appelé une seule fois pour chaque objet créé.
- Il peut recevoir des paramètres `IMPORTING`.
- Il ne possède pas de paramètre `RETURNING`.
- Sa visibilité et l’option de création de la classe déterminent qui peut créer les objets.

## 🌺 CLASS_CONSTRUCTOR

> `CLASS_CONSTRUCTOR` est le constructeur statique de la classe.
> Il initialise les composants statiques.

Déclaration :

    CLASS-METHODS class_constructor.

Implémentation :

    METHOD class_constructor.
      gv_default_rate = '0.20'.
    ENDMETHOD.

Il est exécuté automatiquement avant la première utilisation de la classe dans la session interne concernée.

## 🌺 EXEMPLE AVEC CLASS_CONSTRUCTOR

    REPORT zaelion_oo_07_static.

    CLASS lcl_tax DEFINITION.
      PUBLIC SECTION.
        CLASS-METHODS class_constructor.

        CLASS-METHODS calculate
          IMPORTING
            iv_amount TYPE decfloat34
          RETURNING
            VALUE(rv_tax) TYPE decfloat34.

      PRIVATE SECTION.
        CLASS-DATA gv_rate TYPE decfloat34.
    ENDCLASS.

    CLASS lcl_tax IMPLEMENTATION.
      METHOD class_constructor.
        gv_rate = '0.20'.
      ENDMETHOD.

      METHOD calculate.
        rv_tax = iv_amount * gv_rate.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      WRITE: / lcl_tax=>calculate( iv_amount = '100.00' ).

## 🌺 COMPARAISON

| 🍧 Critère          | 🍧 `CONSTRUCTOR`              | 🍧 `CLASS_CONSTRUCTOR`            |
| ------------------- | ----------------------------- | --------------------------------- |
| Nature              | Méthode d’instance            | Méthode statique spéciale         |
| Déclenchement       | Création de chaque objet      | Première utilisation de la classe |
| Nombre d’exécutions | Une fois par objet            | Une fois par session interne      |
| Paramètres          | Paramètres d’entrée possibles | Aucun paramètre                   |
| Usage               | Initialiser l’état individuel | Initialiser l’état statique       |

## 🌺 VALIDATION DANS LE CONSTRUCTEUR

Le constructeur doit éviter de créer un objet incohérent.

    METHOD constructor.
      IF iv_price < 0.
        mv_price = 0.
      ELSE.
        mv_price = iv_price.
      ENDIF.
    ENDMETHOD.

Dans un développement réel, une exception de classe est généralement préférable lorsqu’une donnée invalide doit bloquer la création.

## 🌺 BONNES PRATIQUES

- Utiliser le constructeur pour les données indispensables à l’objet.
- Ne pas placer un traitement métier long dans le constructeur.
- Ne pas effectuer une lecture de masse inutile lors de chaque création.
- Garantir un état valide à la fin du constructeur.
- Utiliser `CLASS_CONSTRUCTOR` uniquement pour une initialisation statique nécessaire.

## 🌺 EXERCICES

1. Créer une classe `lcl_employee`.
2. Ajouter un constructeur recevant matricule, nom et rôle.
3. Conserver ces valeurs dans des attributs privés.
4. Ajouter une méthode `display`.
5. Créer deux objets avec des valeurs différentes.
6. Ajouter un compteur statique initialisé par `CLASS_CONSTRUCTOR`.

## 🌺 RESUME

> - `CONSTRUCTOR` initialise chaque objet.
> - Il est exécuté automatiquement lors de `NEW` ou `CREATE OBJECT`.
> - `CLASS_CONSTRUCTOR` initialise la classe et ses composants statiques.
> - Le constructeur d’instance peut recevoir des paramètres.
> - Le constructeur statique ne reçoit pas de paramètres.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — Constructors of Classes : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenconstructor.htm
- SAP ABAP Keyword Documentation — Instance Constructor : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapmethods_constructor.htm
- SAP ABAP Keyword Documentation — Static Constructor : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapclass-methods_class_constructor.htm
