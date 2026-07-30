# 🌸 COMPOSANTS STATIQUES

## 🌺 OBJECTIFS

- [ ] Comprendre ce qu’est un composant statique
- [ ] Déclarer un attribut avec `CLASS-DATA`
- [ ] Déclarer une méthode avec `CLASS-METHODS`
- [ ] Appeler un composant statique avec `=>`
- [ ] Distinguer classe statique et classe contenant des composants statiques

## 🌺 DEFINITION

> Un composant statique appartient à la classe elle-même et non à un objet particulier.

Deux composants statiques courants :

- attribut statique : `CLASS-DATA` ;
- méthode statique : `CLASS-METHODS`.

## 🌺 PRECISION DE VOCABULAIRE

> [!IMPORTANT]
> ABAP ne définit pas une catégorie de classe nommée « classe statique » comparable à certains autres langages.
> Une classe ABAP peut contenir des composants statiques et des composants d’instance.

Une classe utilitaire peut être conçue pour ne contenir que des méthodes statiques.
Cela reste un choix de conception, pas un type de classe distinct.

## 🌺 METHODE STATIQUE

    CLASS-METHODS calculate_square
      IMPORTING
        iv_value TYPE i
      RETURNING
        VALUE(rv_result) TYPE i.

Implémentation :

    METHOD calculate_square.
      rv_result = iv_value * iv_value.
    ENDMETHOD.

Appel :

    DATA(lv_result) = lcl_math=>calculate_square( iv_value = 5 ).

Aucun objet n’est nécessaire.

## 🌺 ATTRIBUT STATIQUE

    CLASS-DATA gv_call_count TYPE i.

La valeur est partagée par tous les objets de la classe.

## 🌺 EXEMPLE DE CLASSE UTILITAIRE

    REPORT zaelion_oo_10.

    CLASS lcl_text_helper DEFINITION CREATE PRIVATE.
      PUBLIC SECTION.
        CLASS-METHODS convert_to_upper
          IMPORTING
            iv_text TYPE string
          RETURNING
            VALUE(rv_text) TYPE string.

        CLASS-METHODS is_empty
          IMPORTING
            iv_text TYPE string
          RETURNING
            VALUE(rv_empty) TYPE abap_bool.
    ENDCLASS.

    CLASS lcl_text_helper IMPLEMENTATION.
      METHOD convert_to_upper.
        rv_text = to_upper( val = iv_text ).
      ENDMETHOD.

      METHOD is_empty.
        rv_empty = xsdbool( iv_text IS INITIAL ).
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      WRITE: / lcl_text_helper=>convert_to_upper( iv_text = 'abap objet' ).

      IF lcl_text_helper=>is_empty( iv_text = `` ) = abap_true.
        WRITE: / 'Texte vide'.
      ENDIF.

> [!NOTE]
> `CREATE PRIVATE` empêche ici le programme extérieur d’instancier la classe.
> Les méthodes statiques restent accessibles.

## 🌺 EXEMPLE AVEC COMPTEUR PARTAGE

    CLASS lcl_request DEFINITION.
      PUBLIC SECTION.
        METHODS constructor.

        CLASS-METHODS get_count
          RETURNING
            VALUE(rv_count) TYPE i.

      PRIVATE SECTION.
        CLASS-DATA gv_count TYPE i.
    ENDCLASS.

    CLASS lcl_request IMPLEMENTATION.
      METHOD constructor.
        gv_count = gv_count + 1.
      ENDMETHOD.

      METHOD get_count.
        rv_count = gv_count.
      ENDMETHOD.
    ENDCLASS.

## 🌺 INSTANCE OU STATIQUE

| 🍧 Besoin                                      | 🍧 Choix                    |
| ---------------------------------------------- | --------------------------- |
| Etat propre à chaque objet                     | Attribut d’instance         |
| Traitement dépendant de l’état de l’objet      | Méthode d’instance          |
| Valeur partagée par toutes les instances       | Attribut statique           |
| Fonction indépendante d’un objet               | Méthode statique possible   |
| Service nécessitant des dépendances ou un état | Objet d’instance préférable |

## 🌺 LIMITES DES COMPOSANTS STATIQUES

Un usage excessif peut produire :

- un état global difficile à suivre ;
- des dépendances cachées ;
- des tests plus difficiles à isoler ;
- des effets de bord entre plusieurs traitements.

> [!WARNING]
> Une méthode statique ne doit pas être choisie uniquement pour éviter de créer un objet.
> Le choix dépend de la responsabilité et de l’état nécessaire.

## 🌺 BONNES PRATIQUES

- Utiliser une méthode statique pour un traitement sans état d’instance.
- Eviter les attributs statiques publics modifiables.
- Encapsuler l’accès à l’état statique avec des méthodes.
- Utiliser `CREATE PRIVATE` pour une classe utilitaire non instanciable.
- Préférer des objets d’instance lorsqu’il faut injecter des dépendances ou isoler les tests.

## 🌺 EXERCICES

1. Créer une classe utilitaire `lcl_number_helper`.
2. Empêcher son instanciation avec `CREATE PRIVATE`.
3. Ajouter une méthode statique `is_even`.
4. Ajouter une méthode statique `get_absolute_value`.
5. Appeler les méthodes sans créer d’objet.
6. Ajouter un compteur statique privé des appels.

## 🌺 RESUME

> - `CLASS-DATA` déclare un attribut partagé.
> - `CLASS-METHODS` déclare une méthode appelée sans objet.
> - `=>` accède aux composants statiques.
> - Une classe peut mélanger composants d’instance et composants statiques.
> - Une « classe statique » n’est pas une catégorie syntaxique ABAP.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — `CLASS-DATA` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapclass-data.htm
- SAP ABAP Keyword Documentation — `CLASS-METHODS` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapclass-methods.htm
- SAP ABAP Keyword Documentation — Class Component Selector : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenclass_component_selector.htm
