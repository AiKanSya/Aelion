# 🌸 REFERENCES ET INSTANCIATION

## 🌺 OBJECTIFS

- [ ] Déclarer une référence objet
- [ ] Créer un objet avec `NEW`
- [ ] Créer un objet avec `CREATE OBJECT`
- [ ] Vérifier qu’une référence est liée avec `IS BOUND`
- [ ] Comprendre la différence entre référence initiale et objet créé
- [ ] Appeler une méthode d’instance avec `->`

## 🌺 DECLARATION D'UNE REFERENCE

    DATA lo_service TYPE REF TO lcl_service.

Cette instruction déclare une référence capable de pointer vers un objet de type `lcl_service`.

A ce stade, aucun objet n’est créé.

> [!IMPORTANT]
> Déclarer une référence ne crée pas automatiquement un objet.

## 🌺 REFERENCE INITIALE

Après la déclaration :

    DATA lo_service TYPE REF TO lcl_service.

la référence est initiale et ne pointe vers aucun objet.

Un appel immédiat provoquerait une erreur d’exécution :

    " Interdit tant que l'objet n'a pas été créé
    lo_service->execute( ).

## 🌺 CREATION AVEC NEW

    lo_service = NEW lcl_service( ).

La forme avec déclaration en ligne :

    DATA(lo_service) = NEW lcl_service( ).

`NEW` crée l’objet et retourne sa référence.

## 🌺 CREATION AVEC CREATE OBJECT

    DATA lo_service TYPE REF TO lcl_service.

    CREATE OBJECT lo_service.

`CREATE OBJECT` est une syntaxe historique toujours disponible.
Pour les nouveaux développements, `NEW` est généralement plus concis.

## 🌺 VERIFICATION AVEC IS BOUND

    IF lo_service IS BOUND.
      lo_service->execute( ).
    ENDIF.

`IS BOUND` vérifie que la référence pointe vers un objet valide.

Test inverse :

    IF lo_service IS NOT BOUND.
      lo_service = NEW lcl_service( ).
    ENDIF.

## 🌺 EXEMPLE COMPLET

    REPORT zaelion_oo_06.

    CLASS lcl_light DEFINITION.
      PUBLIC SECTION.
        METHODS switch_on.
        METHODS switch_off.
        METHODS get_status
          RETURNING
            VALUE(rv_status) TYPE string.

      PRIVATE SECTION.
        DATA mv_is_on TYPE abap_bool.
    ENDCLASS.

    CLASS lcl_light IMPLEMENTATION.
      METHOD switch_on.
        mv_is_on = abap_true.
      ENDMETHOD.

      METHOD switch_off.
        mv_is_on = abap_false.
      ENDMETHOD.

      METHOD get_status.
        IF mv_is_on = abap_true.
          rv_status = 'ALLUMEE'.
        ELSE.
          rv_status = 'ETEINTE'.
        ENDIF.
      ENDMETHOD.
    ENDCLASS.

    START-OF-SELECTION.

      DATA lo_light TYPE REF TO lcl_light.

      IF lo_light IS NOT BOUND.
        lo_light = NEW lcl_light( ).
      ENDIF.

      lo_light->switch_on( ).
      WRITE: / lo_light->get_status( ).

      lo_light->switch_off( ).
      WRITE: / lo_light->get_status( ).

## 🌺 PLUSIEURS REFERENCES

Deux références peuvent pointer vers le même objet.

    DATA(lo_light_1) = NEW lcl_light( ).
    DATA lo_light_2 TYPE REF TO lcl_light.

    lo_light_2 = lo_light_1.

    lo_light_1->switch_on( ).

    WRITE: / lo_light_2->get_status( ).

Le statut affiché est `ALLUMEE`, car les deux références accèdent au même objet.

## 🌺 PLUSIEURS OBJETS

    DATA(lo_light_1) = NEW lcl_light( ).
    DATA(lo_light_2) = NEW lcl_light( ).

Deux appels à `NEW` créent deux objets indépendants.

## 🌺 LIBERATION D'UNE REFERENCE

    CLEAR lo_light.

La référence devient initiale.
L’objet est supprimé automatiquement lorsqu’il n’est plus référencé et que le système peut récupérer sa mémoire.

> [!NOTE]
> `CLEAR` agit sur la référence.
> Il ne faut pas confondre la référence et l’objet.

## 🌺 BONNES PRATIQUES

- Créer l’objet avant tout appel d’une méthode d’instance.
- Utiliser `IS BOUND` lorsque la référence peut ne pas être initialisée.
- Préférer `NEW` pour une syntaxe courte et lisible.
- Eviter de multiplier les références vers le même objet sans nécessité.
- Utiliser des noms `lo_` pour les références locales et `ro_` pour les références retournées.

## 🌺 EXERCICES

1. Créer une classe `lcl_door` avec les méthodes `open`, `close` et `get_status`.
2. Déclarer une référence sans créer l’objet.
3. Vérifier la référence avec `IS NOT BOUND`.
4. Créer l’objet avec `NEW`.
5. Créer une deuxième référence vers le même objet.
6. Prouver que les deux références accèdent au même état.

## 🌺 RESUME

> - `TYPE REF TO` déclare une référence objet.
> - Une référence déclarée ne contient pas encore d’objet.
> - `NEW` et `CREATE OBJECT` créent une instance.
> - `IS BOUND` vérifie la validité de la référence.
> - `->` appelle un composant d’instance.
> - Plusieurs références peuvent désigner le même objet.

## 🌺 SOURCES OFFICIELLES

- SAP ABAP Keyword Documentation — Object References : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenobject_reference.htm
- SAP ABAP Keyword Documentation — Instance Operator `NEW` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenconstructor_expression_new.htm
- SAP ABAP Keyword Documentation — `CREATE OBJECT` : https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapcreate_object.htm
