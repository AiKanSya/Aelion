# 🌸 IMPLEMENTING GET_KEY_VALUE

## 🧩 METHOD IMPLEMENTATION

### 🍧 TRANSACTION SE24

> [!NOTE]
> Classe ciblée : `ZCL_<PROJECTNAME>_DPC_EXT`

![](./assets/Capture%20d’écran%202026-01-16%20153106.png)

![](./assets/Capture%20d’écran%202026-01-16%20161000.png)

### 🍧 METHOD PARAMETERS

| 🍧 Paramètre | 🍧 Catégorie | 🍧 Méthode Catégorie | 🍧 Type réf.                 |
| ------------ | ------------ | -------------------- | ---------------------------- |
| IT_KEY_TAB   | Importing    | Type                 | /IWBEP/T_MGW_NAME_VALUE_PAIR |
| IV_KEY_NAME  | Importing    | Type                 | STRING                       |
| OV_KEY_VALUE | Returning    | Type                 | STRING                       |

> [!NOTE]
> 🍧 `IT_KEY_TAB` (`/IWBEP/T_MGW_NAME_VALUE_PAIR`)
>
> - Contient les `Keys` de l’entité demandée.
> - Exemple URL : `Products(ProductID='100')`
> - Chaque entrée représente une paire clé / valeur.
> - Paramètre central de `GET_ENTITY`.

> [!NOTE]
> 🍧 `IV_KEY_NAME` (STRING)
>
> - Nom de l’EntitySet appelée.
> - Exemple : `Products`.
> - C’est le nom réellement appelé dans l’URL OData. Le plus utilisé pour identifier le contexte.

> [!NOTE]
> 🍧 `OV_KEY_VALUE` (STRING)
>
> - Nom de la source (utilisé surtout pour navigation ou alias).
> - Peu utilisé en pratique dans les cas simples.

### 🍧 GET_KEY_VALUE METHOD IMPLEMENTATION

```abap
  METHOD get_key_value.

    FIELD-SYMBOLS : <ls_key> LIKE LINE OF it_key_tab.

    READ TABLE it_key_tab ASSIGNING <ls_key>
    WITH KEY name = iv_key_name.
    IF sy-subrc IS INITIAL.
      ov_key_value = <ls_key>-value.
    ENDIF.

  ENDMETHOD.
```

### 🍧 GET_KEY_VALUE METHOD CALL

> [!NOTE]
> Dans une méthode CRUD (exemple: productset_get_entity)

```abap
METHOD productset_get_entity.

*&---------------------------------------------------------------------*
*& MOD_20251431 - SEGW GATEWAY & ODATA BACKEND
*&    └─ 10 - ODATA OPERATIONS
*&       └─ 07 - IMPLEMENTING GET_KEY_VALUE
*&---------------------------------------------------------------------*

  DATA: ls_product_id TYPE bapi_epm_product_id,
        ls_headerdata TYPE bapi_epm_product_header,
        lt_return     TYPE TABLE OF bapiret2.

* "--- Récupération des Keys via 'GET_KEY_VALUE' (en admettant qu'il y en ait plusieurs)
  DATA: ls_entity TYPE zcl_zfgi_gateway_demo_mpc=>ts_product.
  ls_entity-product_id = get_key_value( it_key_tab = it_key_tab iv_key_name = 'Product_id' ).
  "ls_entity-key_2 = get_key_value( it_key_tab = it_key_tab iv_key_name = 'key_2' ).
  "ls_entity-key_3 = get_key_value( it_key_tab = it_key_tab iv_key_name = 'key_3' ).
  "ls_entity-key_n = ...

ENDMETHOD.
```
