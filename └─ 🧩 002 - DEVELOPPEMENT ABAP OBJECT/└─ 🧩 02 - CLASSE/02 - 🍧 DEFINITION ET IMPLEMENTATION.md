# 🌸 DEFINITION ET IMPLEMENTATION

## 🌺 OBJECTIFS

- [ ] Comprendre les deux parties d’une classe ABAP
- [ ] Déclarer les composants dans la partie `DEFINITION`
- [ ] Développer les méthodes dans la partie `IMPLEMENTATION`
- [ ] Créer une classe locale complète
- [ ] Distinguer classe locale et classe globale

## 🌺 STRUCTURE D'UNE CLASSE

Une classe ABAP complète comporte deux parties :

1. la `DEFINITION` ;
2. l’`IMPLEMENTATION`.

   CLASS lcl_example DEFINITION.
   PUBLIC SECTION.
   METHODS execute.
   ENDCLASS.

   CLASS lcl_example IMPLEMENTATION.
   METHOD execute.
   WRITE: / 'Exécution'.
   ENDMETHOD.
   ENDCLASS.

## 🌺 PARTIE DEFINITION

> La partie `DEFINITION` décrit ce que la classe expose et contient.

Elle déclare :

- les sections de visibilité ;
- les attributs ;
- les méthodes ;
- les types ;
- les constantes ;
- les événements ;
- les interfaces utilisées.

> [!IMPORTANT]
> La partie `DEFINITION` contient la signature des méthodes, mais pas leur traitement métier.

## 🌺 PARTIE IMPLEMENTATION

> La partie `IMPLEMENTATION` contient le code des méthodes déclarées dans la définition.

    CLASS lcl_example IMPLEMENTATION.
      METHOD execute.
        WRITE: / 'Traitement exécuté'.
      ENDMETHOD.
    ENDCLASS.

Chaque méthode est encadrée par :

    METHOD nom_de_la_methode.
      " Traitement
    ENDMETHOD.

## 🌺 CLASSE LOCALE

> Une classe locale est déclarée dans le programme ABAP qui l’utilise.

Convention de nommage :

    lcl_nom_de_classe

Exemple :

    REPORT zaelion_oo_02.

    CLASS lcl_message_service DEFINITION.
      PUBLIC SECTION.
        METHODS display
          IMPORTING
            iv_text TYPE string.
    ENDCLASS.

    CLASS lcl_message_service IMPLEMENTATION.
      METHOD display.
        WRITE: / iv_text.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA(lo_service) = NEW lcl_message_service( ).
      lo_service->display( iv_text = 'Bonjour depuis une classe locale' ).

## 🌺 CLASSE GLOBALE

> Une classe globale est un objet du référentiel SAP réutilisable par plusieurs programmes.

Elle est généralement créée avec :

- la transaction `SE24` ou `SE80` dans SAP GUI ;
- ABAP Development Tools dans Eclipse.

Convention client fréquente :

    ZCL_NOM_DE_CLASSE

Exemple :

    DATA lo_service TYPE REF TO zcl_message_service.

    lo_service = NEW zcl_message_service( ).

> [!NOTE]
> La syntaxe d’utilisation d’une classe globale est proche de celle d’une classe locale.
> La différence principale concerne son emplacement et sa réutilisation dans le référentiel.

## 🌺 COMPARAISON

| 🍧 Critère        | 🍧 Classe locale                 | 🍧 Classe globale               |
| ----------------- | -------------------------------- | ------------------------------- |
| Emplacement       | Dans un programme ou un include  | Objet du référentiel SAP        |
| Réutilisation     | Principalement dans le programme | Dans plusieurs programmes       |
| Préfixe courant   | `lcl_`                           | `zcl_`                          |
| Création          | Code source                      | SE24, SE80 ou ADT               |
| Usage pédagogique | Très adapté                      | Adapté aux développements réels |

## 🌺 ORDRE DES ELEMENTS DANS UN REPORT

    REPORT zaelion_oo_02_order.

    " 1. Définition des classes locales
    CLASS lcl_demo DEFINITION.
      PUBLIC SECTION.
        METHODS run.
    ENDCLASS.

    " 2. Implémentation des classes locales
    CLASS lcl_demo IMPLEMENTATION.
      METHOD run.
        WRITE: / 'RUN'.
      ENDMETHOD.
    ENDCLASS.

    " 3. Traitement principal
    START-OF-SELECTION.

      DATA(lo_demo) = NEW lcl_demo( ).
      lo_demo->run( ).

## 🌺 ERREURS COURANTES

| 🍧 Erreur                      | 🍧 Cause                                                    |
| ------------------------------ | ----------------------------------------------------------- |
| Méthode inconnue               | Méthode absente de la définition                            |
| Implémentation manquante       | Méthode déclarée mais non implémentée                       |
| Nom différent                  | Nom de méthode différent entre définition et implémentation |
| `ENDCLASS` absent              | Classe non terminée                                         |
| Code métier dans la définition | Mauvaise séparation des responsabilités                     |

## 🌺 BONNES PRATIQUES

- Déclarer clairement toutes les méthodes dans la définition.
- Conserver le même nom entre déclaration et implémentation.
- Regrouper les méthodes par visibilité et responsabilité.
- Utiliser les classes locales pour les exercices isolés.
- Utiliser les classes globales pour les services réutilisables.

## 🌺 EXERCICES

1. Créer un report.
2. Déclarer une classe locale `lcl_calculator`.
3. Déclarer une méthode publique `display_result`.
4. Implémenter la méthode.
5. Instancier la classe dans `START-OF-SELECTION`.
6. Vérifier l’activation et l’exécution.

## 🌺 RESUME

> - `DEFINITION` décrit les composants de la classe.
> - `IMPLEMENTATION` contient le code des méthodes.
> - Une classe locale appartient au programme.
> - Une classe globale est réutilisable dans le référentiel SAP.
> - La déclaration et l’implémentation doivent rester cohérentes.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — `CLASS` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapclass.htm
- SAP ABAP Keyword Documentation — Définition des classes : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapclass_definition.htm
