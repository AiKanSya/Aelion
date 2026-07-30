# 🌸 METHODES ET PARAMETRES

## 🌺 OBJECTIFS

- [ ] Déclarer une méthode d’instance
- [ ] Déclarer une méthode statique
- [ ] Utiliser `IMPORTING`, `EXPORTING`, `CHANGING` et `RETURNING`
- [ ] Appeler une méthode avec des paramètres nommés
- [ ] Distinguer une méthode fonctionnelle d’une méthode classique

## 🌺 DEFINITION

> Une `METHODE` est une procédure déclarée dans une classe.
> Elle représente un traitement ou une action.

Deux formes principales existent :

- méthode d’instance avec `METHODS` ;
- méthode statique avec `CLASS-METHODS`.

## 🌺 METHODE D'INSTANCE

    METHODS calculate_total
      IMPORTING
        iv_quantity TYPE i
        iv_price    TYPE decfloat34
      RETURNING
        VALUE(rv_total) TYPE decfloat34.

Elle est appelée depuis un objet :

    lv_total = lo_calculator->calculate_total(
      iv_quantity = 3
      iv_price    = '12.50' ).

## 🌺 METHODE STATIQUE

    CLASS-METHODS calculate_vat
      IMPORTING
        iv_amount TYPE decfloat34
      RETURNING
        VALUE(rv_vat) TYPE decfloat34.

Elle est appelée depuis la classe :

    lv_vat = lcl_tax=>calculate_vat( iv_amount = '100.00' ).

## 🌺 PARAMETRES

| 🍧 Catégorie | 🍧 Direction            | 🍧 Usage                           |
| ------------ | ----------------------- | ---------------------------------- |
| `IMPORTING`  | Appelant vers méthode   | Fournir une valeur d’entrée        |
| `EXPORTING`  | Méthode vers appelant   | Retourner une ou plusieurs valeurs |
| `CHANGING`   | Dans les deux sens      | Recevoir puis modifier une valeur  |
| `RETURNING`  | Méthode vers expression | Retourner une valeur fonctionnelle |
| `RAISING`    | Méthode vers appelant   | Déclarer des exceptions de classe  |

## 🌺 IMPORTING

Déclaration :

    METHODS display_text
      IMPORTING
        iv_text TYPE string.

Appel :

    lo_service->display_text( iv_text = 'Bonjour' ).

## 🌺 EXPORTING

Déclaration :

    METHODS calculate
      IMPORTING
        iv_value TYPE i
      EXPORTING
        ev_double TYPE i
        ev_triple TYPE i.

Appel :

    lo_service->calculate(
      EXPORTING
        iv_value  = 5
      IMPORTING
        ev_double = DATA(lv_double)
        ev_triple = DATA(lv_triple) ).

> [!IMPORTANT]
> Lors de l’appel, les mots-clés sont vus depuis l’appelant.
> Un paramètre `IMPORTING` de la méthode est transmis dans la section `EXPORTING` de l’appel classique.

Avec la syntaxe fonctionnelle moderne, les paramètres d’entrée sont généralement écrits directement dans les parenthèses.

## 🌺 CHANGING

Déclaration :

    METHODS add_one
      CHANGING
        cv_value TYPE i.

Appel :

    DATA lv_value TYPE i VALUE 10.

    lo_service->add_one( CHANGING cv_value = lv_value ).

Après l’appel, `lv_value` vaut `11`.

## 🌺 RETURNING

Déclaration :

    METHODS get_full_name
      RETURNING
        VALUE(rv_full_name) TYPE string.

Appel :

    DATA(lv_name) = lo_person->get_full_name( ).

Une méthode avec un paramètre `RETURNING` peut être utilisée dans une expression.

## 🌺 EXEMPLE COMPLET

    REPORT zaelion_oo_05.

    CLASS lcl_calculator DEFINITION.
      PUBLIC SECTION.
        METHODS add
          IMPORTING
            iv_first  TYPE i
            iv_second TYPE i
          RETURNING
            VALUE(rv_result) TYPE i.

        METHODS calculate_multiple
          IMPORTING
            iv_value TYPE i
          EXPORTING
            ev_double TYPE i
            ev_triple TYPE i.

        METHODS increment
          CHANGING
            cv_value TYPE i.
    ENDCLASS.

    CLASS lcl_calculator IMPLEMENTATION.
      METHOD add.
        rv_result = iv_first + iv_second.
      ENDMETHOD.

      METHOD calculate_multiple.
        ev_double = iv_value * 2.
        ev_triple = iv_value * 3.
      ENDMETHOD.

      METHOD increment.
        cv_value = cv_value + 1.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA(lo_calculator) = NEW lcl_calculator( ).

      DATA(lv_sum) = lo_calculator->add(
        iv_first  = 10
        iv_second = 5 ).

      lo_calculator->calculate_multiple(
        EXPORTING
          iv_value  = 4
        IMPORTING
          ev_double = DATA(lv_double)
          ev_triple = DATA(lv_triple) ).

      DATA lv_counter TYPE i VALUE 7.
      lo_calculator->increment( CHANGING cv_value = lv_counter ).

      WRITE: / lv_sum,
             / lv_double,
             / lv_triple,
             / lv_counter.

## 🌺 PARAMETRES OPTIONNELS ET VALEURS PAR DEFAUT

    METHODS display
      IMPORTING
        iv_text  TYPE string
        iv_upper TYPE abap_bool DEFAULT abap_false.

Un paramètre `OPTIONAL` peut être omis :

    METHODS search
      IMPORTING
        iv_filter TYPE string OPTIONAL.

## 🌺 METHODES PRIVEES

Une méthode privée sert à découper un traitement interne.

    PRIVATE SECTION.
      METHODS validate_amount
        IMPORTING
          iv_amount TYPE decfloat34
        RETURNING
          VALUE(rv_valid) TYPE abap_bool.

Elle ne peut pas être appelée directement depuis le programme extérieur.

## 🌺 BONNES PRATIQUES

- Donner à chaque méthode une responsabilité précise.
- Utiliser des noms verbaux : `calculate_total`, `validate_input`, `read_customer`.
- Préférer `RETURNING` lorsqu’une seule valeur doit être retournée.
- Utiliser des paramètres nommés pour améliorer la lisibilité.
- Limiter l’usage de `CHANGING` aux cas réellement nécessaires.
- Extraire les validations techniques dans des méthodes privées courtes.

## 🌺 EXERCICES

1. Créer une classe `lcl_converter`.
2. Ajouter une méthode `celsius_to_fahrenheit` avec `RETURNING`.
3. Ajouter une méthode `calculate_limits` retournant un minimum et un maximum avec `EXPORTING`.
4. Ajouter une méthode `normalize` utilisant `CHANGING`.
5. Tester chaque appel dans `START-OF-SELECTION`.

## 🌺 RESUME

> - `METHODS` déclare une méthode d’instance.
> - `CLASS-METHODS` déclare une méthode statique.
> - `IMPORTING` fournit des entrées.
> - `EXPORTING` retourne plusieurs sorties.
> - `CHANGING` modifie une valeur fournie.
> - `RETURNING` retourne une valeur utilisable dans une expression.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — Methods of Classes : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenclass_methods.htm
- SAP ABAP Keyword Documentation — `METHODS` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapmethods.htm
- SAP ABAP Keyword Documentation — `CLASS-METHODS` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapclass-methods.htm
