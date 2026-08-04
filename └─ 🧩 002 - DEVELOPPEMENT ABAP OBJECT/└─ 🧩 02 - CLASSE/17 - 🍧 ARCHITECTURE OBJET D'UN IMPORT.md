# 🌸 ARCHITECTURE OBJET D'UN TRAITEMENT D'IMPORT

## 🌺 OBJECTIFS

- [ ] Séparer orchestration et responsabilités techniques.
- [ ] Distinguer erreur globale et rejet local.
- [ ] Faire évoluer une table interne centrale au fil du traitement.
- [ ] Centraliser les messages sans coupler toutes les méthodes à l'affichage.

## 🌺 CAS NEUTRE

Une application importe un catalogue de livres depuis un fichier texte. Elle contrôle les données, regroupe les livres par éditeur, prépare un traitement métier, conserve un journal puis affiche le résultat.

Cet exemple sert uniquement à expliquer l'architecture. Les règles métier restent volontairement simples.

## 🌺 CLASSE DE TRAITEMENT

```abap
CLASS zcl_book_import DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    METHODS constructor
      IMPORTING
        iv_filename TYPE string.

    METHODS run.

  PRIVATE SECTION.
    METHODS read_file.
    METHODS validate_data.
    METHODS group_publishers.
    METHODS process_groups.
    METHODS save_log.
    METHODS display_log.
    METHODS add_log
      IMPORTING
        iv_type    TYPE symsgty
        iv_message TYPE string.

    DATA mv_filename TYPE string.
    DATA mt_books    TYPE STANDARD TABLE OF zbook_import_line WITH EMPTY KEY.
    DATA mt_log      TYPE STANDARD TABLE OF zbook_import_log WITH EMPTY KEY.
    DATA mv_stop     TYPE abap_bool.
ENDCLASS.
```

Les types `ZBOOK_IMPORT_LINE` et `ZBOOK_IMPORT_LOG` représentent ici des types pédagogiques. Ils doivent être remplacés par les types du projet réel.

## 🌺 MÉTHODE D'ORCHESTRATION

```abap
METHOD run.
  read_file( ).

  IF mv_stop = abap_true.
    display_log( ).
    RETURN.
  ENDIF.

  validate_data( ).
  group_publishers( ).
  process_groups( ).
  save_log( ).
  display_log( ).
ENDMETHOD.
```

`RUN` décrit l'ordre du traitement. Elle ne contient ni découpage de ligne, ni requête SQL, ni appel métier détaillé.

## 🌺 TABLE INTERNE CENTRALE

Une ligne peut être enrichie progressivement :

| Étape | Informations ajoutées |
| --- | --- |
| lecture | numéro de ligne et textes sources |
| conversion | valeurs typées |
| validation | indicateur de validité et cause du rejet |
| regroupement | clé ou identifiant interne du groupe |
| traitement | statut et messages obtenus |

Chaque méthode modifie uniquement les champs relevant de sa responsabilité. Les valeurs sources nécessaires au diagnostic sont conservées.

## 🌺 PORTÉE DES ERREURS

| Portée | Exemple neutre | Effet |
| --- | --- | --- |
| globale | fichier inaccessible | arrêt des étapes métier |
| locale | prix non numérique | rejet de la ligne ou de son groupe selon la règle |
| technique finale | sauvegarde du journal impossible | traitement métier terminé, restitution de l'échec technique |

Une erreur locale ne positionne pas automatiquement `MV_STOP`. La règle fonctionnelle détermine si elle invalide une ligne ou tout son groupe.

## 🌺 JOURNAL CENTRALISÉ

```abap
METHOD add_log.
  APPEND VALUE #(
    type    = iv_type
    message = iv_message )
    TO mt_log.
ENDMETHOD.
```

Toutes les méthodes ajoutent leurs messages par `ADD_LOG`. `SAVE_LOG` et `DISPLAY_LOG` consomment ensuite la même table `MT_LOG`. Elles ne reconstruisent pas les messages.

## 🌺 RESPONSABILITÉS À NE PAS MÉLANGER

- le report crée l'objet et appelle `RUN` ;
- le constructeur mémorise les dépendances nécessaires ;
- la lecture ne valide pas les règles métier ;
- la validation ne réalise pas l'affichage ;
- le traitement métier ne décide pas seul du commit global ;
- l'ALV ne contient aucune règle métier.

## 🌺 EXERCICE

Concevoir la classe d'un import de participants `NAME;CITY;LEVEL`. Définir les attributs, la portée de trois erreurs et les responsabilités de chaque méthode, sans écrire le traitement complet.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — Classes: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenabap_objects.htm
- SAP ABAP Keyword Documentation — Methods: https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenmethods.htm
