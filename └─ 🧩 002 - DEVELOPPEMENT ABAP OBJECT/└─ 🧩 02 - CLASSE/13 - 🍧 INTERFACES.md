# 🌸 INTERFACES

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle d’une interface
- [ ] Déclarer une interface locale
- [ ] Implémenter une interface dans une classe
- [ ] Utiliser une référence d’interface
- [ ] Distinguer héritage de classe et implémentation d’interface

## 🌺 DEFINITION

> Une `INTERFACE` définit un contrat que les classes implémentantes doivent respecter.

Elle décrit les méthodes disponibles sans imposer une implémentation unique.

> [!TIP]
> Une interface peut être comparée à une prise électrique normalisée.
> Plusieurs appareils différents peuvent respecter le même contrat de connexion.

## 🌺 DECLARATION

    INTERFACE lif_printable.
      METHODS get_text
        RETURNING
          VALUE(rv_text) TYPE string.
    ENDINTERFACE.

Convention locale :

    lif_nom_interface

Convention globale fréquente :

    zif_nom_interface

## 🌺 IMPLEMENTATION PAR UNE CLASSE

    CLASS lcl_invoice DEFINITION.
      PUBLIC SECTION.
        INTERFACES lif_printable.
    ENDCLASS.

La classe doit implémenter la méthode de l’interface :

    METHOD lif_printable~get_text.
      rv_text = 'Facture'.
    ENDMETHOD.

Le caractère `~` qualifie le composant d’interface.

## 🌺 EXEMPLE COMPLET

    REPORT zaelion_oo_13.

    INTERFACE lif_printable.
      METHODS get_text
        RETURNING
          VALUE(rv_text) TYPE string.
    ENDINTERFACE.

    CLASS lcl_invoice DEFINITION.
      PUBLIC SECTION.
        INTERFACES lif_printable.

        METHODS constructor
          IMPORTING
            iv_number TYPE string.

      PRIVATE SECTION.
        DATA mv_number TYPE string.
    ENDCLASS.

    CLASS lcl_delivery DEFINITION.
      PUBLIC SECTION.
        INTERFACES lif_printable.

        METHODS constructor
          IMPORTING
            iv_number TYPE string.

      PRIVATE SECTION.
        DATA mv_number TYPE string.
    ENDCLASS.

    CLASS lcl_invoice IMPLEMENTATION.
      METHOD constructor.
        mv_number = iv_number.
      ENDMETHOD.

      METHOD lif_printable~get_text.
        rv_text = |Facture { mv_number }|.
      ENDMETHOD.
    ENDCLASS.

    CLASS lcl_delivery IMPLEMENTATION.
      METHOD constructor.
        mv_number = iv_number.
      ENDMETHOD.

      METHOD lif_printable~get_text.
        rv_text = |Livraison { mv_number }|.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA lt_printable TYPE STANDARD TABLE OF REF TO lif_printable
                        WITH EMPTY KEY.

      APPEND NEW lcl_invoice( iv_number = 'F100' ) TO lt_printable.
      APPEND NEW lcl_delivery( iv_number = 'L200' ) TO lt_printable.

      LOOP AT lt_printable INTO DATA(lo_printable).
        WRITE: / lo_printable->get_text( ).
      ENDLOOP.

## 🌺 RESULTAT ATTENDU

    Facture F100
    Livraison L200

## 🌺 REFERENCE D'INTERFACE

    DATA lo_printable TYPE REF TO lif_printable.

Cette référence peut pointer vers tout objet dont la classe implémente `lif_printable`.

Elle permet de traiter uniformément des classes différentes.

## 🌺 HERITAGE OU INTERFACE

| 🍧 Héritage                             | 🍧 Interface                       |
| --------------------------------------- | ---------------------------------- |
| Relation « est un »                     | Contrat de comportement            |
| Une seule super-classe directe          | Plusieurs interfaces possibles     |
| Peut fournir une implémentation héritée | Déclare principalement un contrat  |
| Partage un modèle commun                | Uniformise des classes différentes |

## 🌺 INTERFACES SAP

Les interfaces sont fréquemment utilisées dans les frameworks SAP pour :

- définir des extensions ;
- fournir des points d’implémentation ;
- permettre le polymorphisme ;
- découpler le code appelant d’une classe concrète.

## 🌺 BONNES PRATIQUES

- Donner à l’interface une responsabilité claire.
- Eviter les interfaces contenant de nombreuses méthodes sans cohérence.
- Programmer contre une interface lorsque plusieurs implémentations sont possibles.
- Utiliser une référence d’interface pour réduire la dépendance à une classe concrète.
- Nommer les méthodes comme des capacités observables.

## 🌺 EXERCICES

1. Créer une interface `lif_exportable`.
2. Déclarer une méthode `export` retournant une chaîne.
3. Créer deux classes : `lcl_csv_exporter` et `lcl_json_exporter`.
4. Implémenter l’interface dans les deux classes.
5. Stocker les deux objets dans une table de références d’interface.
6. Appeler `export` dans une boucle.

## 🌺 RESUME

> - Une interface définit un contrat.
> - `INTERFACES` relie une classe à une interface.
> - `interface~method` implémente un composant d’interface.
> - Une référence d’interface accepte plusieurs classes compatibles.
> - Les interfaces favorisent le découplage et le polymorphisme.

## 🌺 SOURCE OFFICIELLE

- SAP ABAP Keyword Documentation — Interfaces : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abeninterfaces.htm
