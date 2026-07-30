# 🌸 VISIBILITE

## 🌺 OBJECTIFS

- [ ] Comprendre les sections `PUBLIC`, `PROTECTED` et `PRIVATE`
- [ ] Déterminer qui peut accéder à un composant
- [ ] Protéger les données internes d’une classe
- [ ] Choisir une visibilité adaptée à chaque composant
- [ ] Comprendre le rôle de la visibilité dans l’encapsulation

## 🌺 DEFINITION

> La visibilité détermine les zones du programme autorisées à accéder à un composant de classe.

Une classe ABAP peut contenir trois sections principales :

    PUBLIC SECTION.
    PROTECTED SECTION.
    PRIVATE SECTION.

## 🌺 PUBLIC SECTION

> Un composant public est accessible depuis l’extérieur de la classe.

    CLASS lcl_counter DEFINITION.
      PUBLIC SECTION.
        METHODS increment.
        METHODS get_value RETURNING VALUE(rv_value) TYPE i.
    ENDCLASS.

Les méthodes publiques forment l’interface utilisée par les programmes appelants.

## 🌺 PRIVATE SECTION

> Un composant privé est accessible uniquement dans les méthodes de la classe qui le déclare.

    PRIVATE SECTION.
      DATA mv_value TYPE i.

Le programme appelant ne peut pas accéder directement à `mv_value`.
Il doit utiliser une méthode publique prévue par la classe.

## 🌺 PROTECTED SECTION

> Un composant protégé est accessible dans la classe qui le déclare et dans ses sous-classes.

    PROTECTED SECTION.
      DATA mv_internal_status TYPE string.

Depuis l’extérieur de la classe, un composant protégé n’est pas directement accessible.

## 🌺 TABLEAU DE VISIBILITE

| 🍧 Zone appelante          | 🍧 Public | 🍧 Protected | 🍧 Private |
| -------------------------- | --------- | ------------ | ---------- |
| Programme extérieur        | Oui       | Non          | Non        |
| Méthodes de la classe      | Oui       | Oui          | Oui        |
| Méthodes d’une sous-classe | Oui       | Oui          | Non        |

## 🌺 EXEMPLE COMPLET

    REPORT zaelion_oo_03.

    CLASS lcl_bank_account DEFINITION.
      PUBLIC SECTION.
        METHODS deposit
          IMPORTING
            iv_amount TYPE decfloat34.

        METHODS get_balance
          RETURNING
            VALUE(rv_balance) TYPE decfloat34.

      PRIVATE SECTION.
        DATA mv_balance TYPE decfloat34.
    ENDCLASS.

    CLASS lcl_bank_account IMPLEMENTATION.
      METHOD deposit.
        IF iv_amount > 0.
          mv_balance = mv_balance + iv_amount.
        ENDIF.
      ENDMETHOD.

      METHOD get_balance.
        rv_balance = mv_balance.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA(lo_account) = NEW lcl_bank_account( ).

      lo_account->deposit( iv_amount = '100.50' ).

      WRITE: / lo_account->get_balance( ).

## 🌺 EXPLICATION

- `deposit` est public : le programme peut demander un dépôt.
- `get_balance` est public : le programme peut lire le solde de manière contrôlée.
- `mv_balance` est privé : le programme ne peut pas le modifier directement.
- La classe contrôle les règles appliquées au solde.

Le code suivant est interdit :

    " ERREUR : mv_balance est privé
    lo_account->mv_balance = 999999.

## 🌺 REGLE DE CONCEPTION

> [!IMPORTANT]
> Exposer uniquement ce qui est nécessaire au programme appelant.
> Conserver les détails techniques dans la section privée.

Approche recommandée :

- méthodes métier publiques ;
- attributs privés ;
- méthodes techniques privées ;
- composants protégés uniquement lorsqu’une sous-classe doit réellement les utiliser.

## 🌺 TYPES ET VISIBILITE

La visibilité s’applique également aux types :

    PUBLIC SECTION.
      TYPES ty_amount TYPE decfloat34.

    PRIVATE SECTION.
      TYPES:
        BEGIN OF ty_internal_log,
          message TYPE string,
        END OF ty_internal_log.

- `ty_amount` peut être utilisé par le code extérieur.
- `ty_internal_log` reste réservé à la classe.

## 🌺 ERREURS COURANTES

| 🍧 Erreur                         | 🍧 Conséquence                         |
| --------------------------------- | -------------------------------------- |
| Tout déclarer en public           | Données modifiables sans contrôle      |
| Utiliser protected sans héritage  | Complexité inutile                     |
| Exposer un type interne           | Dépendance forte avec l’implémentation |
| Accéder directement aux attributs | Encapsulation cassée                   |

## 🌺 BONNES PRATIQUES

- Déclarer les attributs en `PRIVATE SECTION` par défaut.
- Exposer des méthodes publiques correspondant à des actions métier.
- Ne pas créer automatiquement un setter pour chaque attribut.
- Utiliser `PROTECTED SECTION` uniquement pour l’héritage.
- Déclarer les types publics uniquement s’ils font partie du contrat de la classe.

## 🌺 EXERCICES

1. Créer une classe `lcl_stock`.
2. Déclarer un attribut privé `mv_quantity`.
3. Déclarer une méthode publique `add_quantity`.
4. Refuser les quantités négatives.
5. Déclarer une méthode publique `get_quantity`.
6. Vérifier qu’un accès direct à `mv_quantity` produit une erreur de syntaxe.

## 🌺 RESUME

> - `PUBLIC` est accessible depuis l’extérieur.
> - `PROTECTED` est accessible dans la classe et ses sous-classes.
> - `PRIVATE` est accessible uniquement dans la classe.
> - La visibilité protège l’état interne.
> - Les attributs privés et les méthodes publiques constituent une base solide d’encapsulation.

## 🌺 SOURCE OFFICIELLE

- SAP ABAP Keyword Documentation — Visibility Sections in Classes : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenclass_visibility.htm
