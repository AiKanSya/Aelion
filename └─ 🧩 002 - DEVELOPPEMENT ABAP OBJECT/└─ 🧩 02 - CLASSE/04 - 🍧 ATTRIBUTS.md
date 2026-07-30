# 🌸 ATTRIBUTS

## 🌺 OBJECTIFS

- [ ] Comprendre le rôle d’un attribut
- [ ] Déclarer un attribut d’instance avec `DATA`
- [ ] Déclarer un attribut statique avec `CLASS-DATA`
- [ ] Distinguer état individuel et état partagé
- [ ] Accéder correctement aux attributs depuis les méthodes

## 🌺 DEFINITION

> Un `ATTRIBUT` est une donnée déclarée dans une classe.
> Il représente une partie de l’état de l’objet ou de la classe.

Deux catégories principales existent :

- attribut d’instance ;
- attribut statique, aussi appelé attribut de classe.

## 🌺 ATTRIBUT D'INSTANCE

Un attribut d’instance est déclaré avec `DATA` dans une classe.

    PRIVATE SECTION.
      DATA mv_name TYPE string.

Chaque objet possède sa propre valeur.

    DATA(lo_person_1) = NEW lcl_person( ).
    DATA(lo_person_2) = NEW lcl_person( ).

`lo_person_1` et `lo_person_2` possèdent chacun leur propre `mv_name`.

## 🌺 ATTRIBUT STATIQUE

Un attribut statique est déclaré avec `CLASS-DATA`.

    PRIVATE SECTION.
      CLASS-DATA gv_object_count TYPE i.

Une seule valeur est partagée par toutes les instances de la classe dans le contexte d’exécution.

> [!IMPORTANT]
> `DATA` dans une classe → une valeur par objet.
> `CLASS-DATA` → une valeur partagée par la classe.

## 🌺 EXEMPLE COMPLET

    REPORT zaelion_oo_04.

    CLASS lcl_person DEFINITION.
      PUBLIC SECTION.
        METHODS constructor
          IMPORTING
            iv_name TYPE string.

        METHODS get_name
          RETURNING
            VALUE(rv_name) TYPE string.

        CLASS-METHODS get_object_count
          RETURNING
            VALUE(rv_count) TYPE i.

      PRIVATE SECTION.
        DATA mv_name TYPE string.
        CLASS-DATA gv_object_count TYPE i.
    ENDCLASS.

    CLASS lcl_person IMPLEMENTATION.
      METHOD constructor.
        mv_name = iv_name.
        gv_object_count = gv_object_count + 1.
      ENDMETHOD.

      METHOD get_name.
        rv_name = mv_name.
      ENDMETHOD.

      METHOD get_object_count.
        rv_count = gv_object_count.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA(lo_person_1) = NEW lcl_person( iv_name = 'Alice' ).
      DATA(lo_person_2) = NEW lcl_person( iv_name = 'Karim' ).

      WRITE: / lo_person_1->get_name( ).
      WRITE: / lo_person_2->get_name( ).
      WRITE: / lcl_person=>get_object_count( ).

## 🌺 RESULTAT ATTENDU

    Alice
    Karim
    2

## 🌺 SELECTEURS

| 🍧 Sélecteur | 🍧 Usage             | 🍧 Exemple                        |
| ------------ | -------------------- | --------------------------------- |
| `->`         | Composant d’instance | `lo_person->get_name( )`          |
| `=>`         | Composant statique   | `lcl_person=>get_object_count( )` |

Dans les méthodes de la classe :

- un attribut d’instance peut être utilisé directement par son nom ;
- `me->mv_name` désigne explicitement l’attribut de l’instance courante ;
- un attribut statique peut être utilisé directement ou avec le sélecteur de classe.

## 🌺 ME

> `me` représente la référence vers l’objet courant dans une méthode d’instance.

    METHOD set_name.
      me->mv_name = iv_name.
    ENDMETHOD.

L’écriture avec `me->` est particulièrement utile lorsqu’un paramètre et un attribut ont des noms proches.

## 🌺 VALEURS INITIALES

    DATA mv_status TYPE string VALUE 'NEW'.
    CLASS-DATA gv_count TYPE i VALUE 0.

Une valeur initiale peut être fournie dans la déclaration.

## 🌺 ATTRIBUT PUBLIC OU PRIVE

Syntaxiquement, un attribut peut être public.

    PUBLIC SECTION.
      DATA mv_text TYPE string.

Cette approche permet au programme extérieur de modifier directement la valeur.
Elle réduit le contrôle exercé par la classe.

Approche recommandée :

    PRIVATE SECTION.
      DATA mv_text TYPE string.

    PUBLIC SECTION.
      METHODS set_text IMPORTING iv_text TYPE string.
      METHODS get_text RETURNING VALUE(rv_text) TYPE string.

## 🌺 BONNES PRATIQUES

- Utiliser `mv_` pour un attribut d’instance privé.
- Utiliser `gv_` ou une convention projet claire pour un attribut statique.
- Déclarer les attributs privés par défaut.
- Utiliser `CLASS-DATA` uniquement pour un état réellement partagé.
- Eviter les attributs publics modifiables.
- Ne pas utiliser un attribut statique pour remplacer une transmission correcte de données.

## 🌺 EXERCICES

1. Créer une classe `lcl_product`.
2. Ajouter deux attributs d’instance privés : nom et prix.
3. Ajouter un attribut statique privé comptant les produits créés.
4. Initialiser les attributs dans le constructeur.
5. Ajouter des getters publics.
6. Afficher les deux produits et le nombre total d’instances.

## 🌺 RESUME

> - Un attribut représente l’état.
> - `DATA` déclare un attribut propre à chaque objet.
> - `CLASS-DATA` déclare un attribut partagé.
> - `->` accède aux composants d’instance.
> - `=>` accède aux composants statiques.
> - Les attributs doivent généralement rester privés.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — Attributes of Classes : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenclass_attributes.htm
- SAP ABAP Keyword Documentation — `CLASS-DATA` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapclass-data.htm
