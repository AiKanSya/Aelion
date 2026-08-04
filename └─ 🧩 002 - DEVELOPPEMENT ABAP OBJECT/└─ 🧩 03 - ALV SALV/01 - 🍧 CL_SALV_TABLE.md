# 🌸 AFFICHAGE AVEC `CL_SALV_TABLE`

## 🌺 OBJECTIFS

- [ ] Créer un ALV depuis une table interne.
- [ ] Activer les fonctions standard.
- [ ] Gérer `CX_SALV_MSG`.

```abap
TYPES: BEGIN OF ty_book,
         title  TYPE string,
         author TYPE string,
         price  TYPE p LENGTH 8 DECIMALS 2,
       END OF ty_book.

DATA lt_books TYPE STANDARD TABLE OF ty_book WITH EMPTY KEY.

TRY.
    cl_salv_table=>factory(
      IMPORTING
        r_salv_table = DATA(lo_alv)
      CHANGING
        t_table      = lt_books ).

    lo_alv->get_functions( )->set_all( abap_true ).
    lo_alv->get_columns( )->set_optimize( abap_true ).
    lo_alv->display( ).
  CATCH cx_salv_msg INTO DATA(lx_salv).
    MESSAGE lx_salv->get_text( ) TYPE 'E'.
ENDTRY.
```

L'ALV présente les données déjà préparées. Il ne doit pas porter les règles métier du traitement. Vérifier l'API disponible dans `SE24` selon la version SAP.

## 🌺 EXERCICE

Afficher une liste de livres, trier les données avant l'appel et adapter les libellés de deux colonnes.

## 🌺 SOURCE

- Documentation de `CL_SALV_TABLE` et `CX_SALV_MSG` dans `SE24` sur le système SAP utilisé.
