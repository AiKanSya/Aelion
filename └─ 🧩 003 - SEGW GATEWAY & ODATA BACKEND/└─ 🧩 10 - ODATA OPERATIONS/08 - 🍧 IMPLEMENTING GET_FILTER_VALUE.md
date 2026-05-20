# 🌸 IMPLEMENTING GET_FILTER_VALUE

## 🧩 METHOD IMPLEMENTATION

### 🍧 TRANSACTION SE24

> [!NOTE]
> Classe ciblée : `ZCL_<PROJECTNAME>_DPC_EXT`

![](./assets/Capture%20d’écran%202026-01-16%20153106.png)

![](./assets/Capture%20d’écran%202026-01-16%20161000.png)

### 🍧 METHOD PARAMETERS

| 🍧 Paramètre             | 🍧 Catégorie | 🍧 Méthode Catégorie | 🍧 Type réf.                |
| ------------------------ | ------------ | -------------------- | --------------------------- |
| IT_FILTER_SELECT_OPTIONS | Importing    | Type                 | /IWBEP/T_MGW_SELECT_OPTION  |
| IV_FILTER_NAME           | Importing    | Type                 | STRING                      |
| RT_FILTER_RANGE          | Returning    | Type                 | /IWBEP/T_COD_SELECT_OPTIONS |

> [!NOTE]
> 🍧 `IT_FILTER_SELECT_OPTIONS` (`/IWBEP//IWBEP/T_MGW_SELECT_OPTION`)
>
> - Contient les clés de l’entité demandée.
> - Exemple URL : `Products(ProductID='100')`
> - Chaque entrée représente une paire clé / valeur.
> - Paramètre central de GET_ENTITYSET.

> [!NOTE]
> 🍧 `IV_FILTER_NAME` (STRING)
>
> - Nom de l’EntitySet appelée.
> - Exemple : `Products`.
> - C’est le nom réellement appelé dans l’URL OData. Le plus utilisé pour identifier le contexte.

> [!NOTE]
> 🍧 `/IWBEP/T_COD_SELECT_OPTIONS` (STRING)
>
> - Nom de la source (utilisé surtout pour navigation ou alias).
> - Peu utilisé en pratique dans les cas simples.

### 🍧 GET_FILTER_VALUE METHOD IMPLEMENTATION

```abap
  METHOD get_filter_value.

    "--- Local Data declaration
    DATA: ls_filter LIKE LINE OF it_filter_select_options.

    "--- Get filter value
    READ TABLE it_filter_select_options INTO ls_filter
      WITH KEY property = iv_filter_name.
    IF sy-subrc IS INITIAL.
      rt_filter_range = ls_filter-select_options.
    ENDIF.

  ENDMETHOD.
```

### 🍧 GET_FILTER_VALUE METHOD CALL

> [!NOTE]
> Dans une méthode CRUD (exemple: productset_get_entity)

```abap
METHOD productset_get_entityset.
  DATA: lt_headerdata TYPE TABLE OF bapi_epm_product_header,
        lt_return     TYPE TABLE OF bapiret2.

  "--- Récupération des Range de KEY via 'GET_FILTER_VALUE'
  DATA: lr_product    TYPE /iwbep/t_cod_select_options,
        lv_product_id TYPE bapi_epm_product_header-product_id.

  "--- Récupération des Keys de 'ProductId'
  lr_product       = get_filter_value( it_filter_select_options = it_filter_select_options iv_filter_name = 'ProductId' ).

  LOOP AT lr_product ASSIGNING FIELD-SYMBOL(<fs_range>).
    lv_product_id  = |{ <fs_range>-low ALPHA = IN }|.
    <fs_range>-low = lv_product_id.
  ENDLOOP.

ENDMETHOD.
```
