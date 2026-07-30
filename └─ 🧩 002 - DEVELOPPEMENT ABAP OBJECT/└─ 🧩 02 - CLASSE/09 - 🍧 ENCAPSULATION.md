# 🌸 ENCAPSULATION

## 🌺 OBJECTIFS

- [ ] Comprendre le principe d’encapsulation
- [ ] Protéger l’état interne d’un objet
- [ ] Contrôler les modifications avec des méthodes publiques
- [ ] Utiliser des méthodes privées pour les validations
- [ ] Eviter les setters systématiques sans règle métier

## 🌺 DEFINITION

> L’`ENCAPSULATION` consiste à masquer les détails internes d’une classe et à fournir une interface publique contrôlée.

Le programme appelant indique ce qu’il souhaite faire.
La classe décide comment le faire et vérifie les règles applicables.

## 🌺 EXEMPLE SANS ENCAPSULATION

    CLASS lcl_stock DEFINITION.
      PUBLIC SECTION.
        DATA mv_quantity TYPE i.
    ENDCLASS.

Le programme extérieur peut exécuter :

    lo_stock->mv_quantity = -500.

La classe ne peut pas empêcher cette valeur incohérente.

## 🌺 EXEMPLE AVEC ENCAPSULATION

    CLASS lcl_stock DEFINITION.
      PUBLIC SECTION.
        METHODS add
          IMPORTING
            iv_quantity TYPE i.

        METHODS remove
          IMPORTING
            iv_quantity TYPE i.

        METHODS get_quantity
          RETURNING
            VALUE(rv_quantity) TYPE i.

      PRIVATE SECTION.
        DATA mv_quantity TYPE i.

        METHODS is_positive
          IMPORTING
            iv_quantity TYPE i
          RETURNING
            VALUE(rv_valid) TYPE abap_bool.
    ENDCLASS.

La donnée reste privée.
Les modifications passent par des méthodes métier.

## 🌺 IMPLEMENTATION COMPLETE

    REPORT zaelion_oo_09.

    CLASS lcl_stock DEFINITION.
      PUBLIC SECTION.
        METHODS add
          IMPORTING
            iv_quantity TYPE i.

        METHODS remove
          IMPORTING
            iv_quantity TYPE i.

        METHODS get_quantity
          RETURNING
            VALUE(rv_quantity) TYPE i.

      PRIVATE SECTION.
        DATA mv_quantity TYPE i.

        METHODS is_positive
          IMPORTING
            iv_quantity TYPE i
          RETURNING
            VALUE(rv_valid) TYPE abap_bool.
    ENDCLASS.

    CLASS lcl_stock IMPLEMENTATION.
      METHOD add.
        IF is_positive( iv_quantity ) = abap_true.
          mv_quantity = mv_quantity + iv_quantity.
        ENDIF.
      ENDMETHOD.

      METHOD remove.
        IF is_positive( iv_quantity ) = abap_true
           AND iv_quantity <= mv_quantity.
          mv_quantity = mv_quantity - iv_quantity.
        ENDIF.
      ENDMETHOD.

      METHOD get_quantity.
        rv_quantity = mv_quantity.
      ENDMETHOD.

      METHOD is_positive.
        rv_valid = xsdbool( iv_quantity > 0 ).
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA(lo_stock) = NEW lcl_stock( ).

      lo_stock->add( iv_quantity = 10 ).
      lo_stock->remove( iv_quantity = 3 ).
      lo_stock->remove( iv_quantity = 50 ).

      WRITE: / lo_stock->get_quantity( ).

## 🌺 INTERFACE PUBLIQUE

L’interface publique de la classe est constituée des éléments accessibles aux appelants.

Dans l’exemple :

- `add` ;
- `remove` ;
- `get_quantity`.

Les détails internes sont :

- `mv_quantity` ;
- `is_positive`.

## 🌺 GETTER ET SETTER

Un `GETTER` retourne une valeur :

    METHODS get_name
      RETURNING VALUE(rv_name) TYPE string.

Un `SETTER` modifie une valeur :

    METHODS set_name
      IMPORTING iv_name TYPE string.

> [!WARNING]
> Créer un getter et un setter pour chaque attribut ne garantit pas une bonne encapsulation.
> Une méthode métier doit exprimer une intention et appliquer les règles nécessaires.

Exemple faible :

    set_balance( iv_balance = -1000 ).

Exemple métier :

    withdraw( iv_amount = 100 ).

La seconde forme permet à la classe de vérifier le solde, le plafond et les autorisations.

## 🌺 RESPONSABILITE UNIQUE

> Une classe doit avoir une responsabilité principale clairement identifiable.

Exemples :

- `zcl_order_reader` lit des commandes ;
- `zcl_order_validator` valide des commandes ;
- `zcl_order_creator` crée des commandes.

Une classe qui lit, valide, crée, envoie des mails et affiche un ALV devient difficile à tester et à maintenir.

## 🌺 BONNES PRATIQUES

- Déclarer les attributs privés.
- Exposer des actions métier plutôt que des données techniques.
- Valider les paramètres avant de modifier l’état.
- Extraire les contrôles internes dans des méthodes privées.
- Ne pas retourner une table interne modifiable si cela permet de contourner les règles.
- Maintenir une responsabilité principale par classe.

## 🌺 EXERCICES

1. Créer une classe `lcl_bank_account`.
2. Déclarer le solde en privé.
3. Ajouter `deposit`, `withdraw` et `get_balance`.
4. Refuser un dépôt négatif.
5. Refuser un retrait supérieur au solde.
6. Extraire la validation des montants dans une méthode privée.

## 🌺 RESUME

> - L’encapsulation protège l’état interne.
> - Les attributs privés empêchent les modifications directes.
> - Les méthodes publiques constituent le contrat de la classe.
> - Les méthodes privées portent les détails techniques.
> - Une méthode métier est préférable à un setter générique.

## 🌺 SOURCE OFFICIELLE

- SAP ABAP Keyword Documentation — Visibility Sections in Classes : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenclass_visibility.htm
