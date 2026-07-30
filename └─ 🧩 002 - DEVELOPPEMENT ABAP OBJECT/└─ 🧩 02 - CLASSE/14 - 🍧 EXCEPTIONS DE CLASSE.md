# 🌸 EXCEPTIONS DE CLASSE

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle d’une exception de classe
- [ ] Déclarer une exception locale
- [ ] Déclarer une méthode avec `RAISING`
- [ ] Lever une exception avec `RAISE EXCEPTION TYPE`
- [ ] Traiter une exception avec `TRY`, `CATCH` et `ENDTRY`

## 🌺 DEFINITION

> Une exception de classe représente une situation anormale qu’une méthode ne peut pas traiter seule.

La méthode signale le problème à son appelant.
L’appelant décide du traitement à appliquer.

## 🌺 CLASSES RACINES COURANTES

| 🍧 Classe racine   | 🍧 Contrôle attendu                             |
| ------------------ | ----------------------------------------------- |
| `CX_STATIC_CHECK`  | L’appelant doit déclarer ou traiter l’exception |
| `CX_DYNAMIC_CHECK` | Contrôle plus souple selon le contexte d’appel  |
| `CX_NO_CHECK`      | Aucun contrôle statique obligatoire             |

Pour un apprentissage initial, `CX_STATIC_CHECK` rend le contrat explicite.

## 🌺 DECLARATION D'UNE EXCEPTION LOCALE

    CLASS lcx_invalid_amount DEFINITION
      INHERITING FROM cx_static_check.
    ENDCLASS.

    CLASS lcx_invalid_amount IMPLEMENTATION.
    ENDCLASS.

Convention :

    lcx_nom_exception

## 🌺 DECLARATION AVEC RAISING

    METHODS withdraw
      IMPORTING
        iv_amount TYPE decfloat34
      RAISING
        lcx_invalid_amount.

`RAISING` indique que la méthode peut propager cette exception.

## 🌺 LEVER L'EXCEPTION

    IF iv_amount <= 0.
      RAISE EXCEPTION TYPE lcx_invalid_amount.
    ENDIF.

## 🌺 TRAITER L'EXCEPTION

    TRY.
        lo_account->withdraw( iv_amount = -10 ).

      CATCH lcx_invalid_amount INTO DATA(lx_invalid_amount).
        WRITE: / 'Montant invalide'.
    ENDTRY.

## 🌺 EXEMPLE COMPLET

    REPORT zaelion_oo_14.

    CLASS lcx_invalid_amount DEFINITION
      INHERITING FROM cx_static_check.
    ENDCLASS.

    CLASS lcx_invalid_amount IMPLEMENTATION.
    ENDCLASS.

    CLASS lcx_insufficient_balance DEFINITION
      INHERITING FROM cx_static_check.
    ENDCLASS.

    CLASS lcx_insufficient_balance IMPLEMENTATION.
    ENDCLASS.

    CLASS lcl_bank_account DEFINITION.
      PUBLIC SECTION.
        METHODS constructor
          IMPORTING
            iv_balance TYPE decfloat34.

        METHODS withdraw
          IMPORTING
            iv_amount TYPE decfloat34
          RAISING
            lcx_invalid_amount
            lcx_insufficient_balance.

        METHODS get_balance
          RETURNING
            VALUE(rv_balance) TYPE decfloat34.

      PRIVATE SECTION.
        DATA mv_balance TYPE decfloat34.
    ENDCLASS.

    CLASS lcl_bank_account IMPLEMENTATION.
      METHOD constructor.
        mv_balance = iv_balance.
      ENDMETHOD.

      METHOD withdraw.
        IF iv_amount <= 0.
          RAISE EXCEPTION TYPE lcx_invalid_amount.
        ENDIF.

        IF iv_amount > mv_balance.
          RAISE EXCEPTION TYPE lcx_insufficient_balance.
        ENDIF.

        mv_balance = mv_balance - iv_amount.
      ENDMETHOD.

      METHOD get_balance.
        rv_balance = mv_balance.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA(lo_account) = NEW lcl_bank_account( iv_balance = '100.00' ).

      TRY.
          lo_account->withdraw( iv_amount = '30.00' ).
          WRITE: / lo_account->get_balance( ).

          lo_account->withdraw( iv_amount = '500.00' ).

        CATCH lcx_invalid_amount.
          WRITE: / 'Le montant doit être strictement positif'.

        CATCH lcx_insufficient_balance.
          WRITE: / 'Le solde est insuffisant'.
      ENDTRY.

## 🌺 ORDRE DES CATCH

Lorsqu’une exception spécialisée hérite d’une exception plus générale, traiter d’abord la plus spécifique.

    TRY.
        " Traitement
      CATCH lcx_specific_error.
        " Cas précis
      CATCH cx_root.
        " Cas général
    ENDTRY.

## 🌺 CLEANUP

`CLEANUP` peut être utilisé pour restaurer un état avant la propagation d’une exception non traitée localement.
Cette notion est avancée et doit être utilisée uniquement lorsqu’un nettoyage explicite est nécessaire.

## 🌺 BONNES PRATIQUES

- Lever une exception lorsqu’une méthode ne peut pas produire un résultat valide.
- Déclarer clairement les exceptions dans `RAISING`.
- Créer des exceptions correspondant à des causes distinctes.
- Ne pas utiliser une exception pour piloter un cas métier normal et fréquent.
- Ne pas masquer une exception sans traitement ni journalisation.
- Ajouter des textes d’exception dans les classes globales réelles.

## 🌺 EXERCICES

1. Créer une exception `lcx_invalid_quantity`.
2. Créer une classe `lcl_stock`.
3. Déclarer `remove` avec `RAISING`.
4. Lever l’exception si la quantité est négative ou supérieure au stock.
5. Traiter l’exception dans `TRY...CATCH`.
6. Vérifier que le stock n’est pas modifié en cas d’erreur.

## 🌺 RESUME

> - Une exception signale une situation anormale.
> - `RAISING` documente les exceptions d’une méthode.
> - `RAISE EXCEPTION TYPE` lève une exception.
> - `TRY...CATCH` traite l’exception.
> - Les exceptions structurent les erreurs mieux qu’un simple code retour ambigu.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — Class-Based Exceptions : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenexception_classes.htm
- SAP ABAP Keyword Documentation — `TRY` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abaptry.htm
- SAP ABAP Keyword Documentation — `RAISE EXCEPTION` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapraise_exception.htm
