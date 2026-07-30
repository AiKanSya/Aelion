# 🌸 EXERCICES

> 🌺 Objectifs
>
> - [ ] Créer les DataModels AccountingDoc et AccountingDocSet
> - [ ]
> - [ ]

## 🧩 DATAMODELS ACCOUNTINGDOC & ACCOUNTINGDOCSET

### 🍧 CREER L'ENTITY ET L'ENTITYSET

![](./assets/Capture%20d’écran%202026-02-11%20085602.png)

> [!IMPORTANT]
>
> DDIC Structure : `BKPF`
>
> - `BUKRS` - Société
> - `BELNR` - Numéro de pièce
> - `GJAHR` - Exer. comptable
> - `CPUDT` - Saisi le
> - `XBLNR` - Référence

## 🧩 CLASSE \*\_DPC_EXT

### 🍧 REDEFINE LA METHOD GET_ENTITYSET

![](./assets/Capture%20d’écran%202026-02-11%20085748.png)

## 🧩 CLASSE DE SERVICE

### 🍧 CREER LA CLASSE DE SERVICE

> [!IMPORTANT]
> Classe : `ZCL_ZFGI_GATEWAY_DEMO_SERVICE`
> Description : Classe de service pour ZCL_ZFGI_GATEWAY_DEMO_DPC_EXT

### 🍧 CREER LA CLASS-METHOD GET_INSTANCE DANS LA CLASSE DE SERVICE

![](./assets/Capture%20d’écran%202026-02-11%20091037.png)

![](./assets/Capture%20d’écran%202026-02-11%20091215.png)

![](./assets/Capture%20d’écran%202026-02-11%20091304.png)

```abap
  method GET_INSTANCE.

    IF ZCL_ZFGI_GATEWAY_DEMO_SERVICE=>lo_instance IS NOT BOUND.
      CREATE OBJECT ZCL_ZFGI_GATEWAY_DEMO_SERVICE=>lo_instance.
    ENDIF.

    ro_instance = ZCL_ZFGI_GATEWAY_DEMO_SERVICE=>lo_instance.

  endmethod.
```

## 🧩 CLASSE \*\_DPC_EXT

### 🍧 CREER LE CONSTRUCTOR DANS LA CLASSE DPC_EXT

![](./assets/Capture%20d’écran%202026-02-11%20090652.png)

![](./assets/Capture%20d’écran%202026-02-11%20090912.png)

```abap
  method CONSTRUCTOR.

    super->constructor( ).

    me->lo_gateway_demo_service = zcl_zfgi_gateway_demo_service=>get_instance( ).

  endmethod.
```

## 🧩 CLASSE DE SERVICE

### 🍧 CREER LA CLASS-METHOD GET_ACCOUNTINGDOC

> [!IMPORTANT]
> Method : `GET_ACCOUNTINGDOC`

![](./assets/Capture%20d’écran%202026-02-11%20093002.png)

![](./assets/Capture%20d’écran%202026-02-11%20092926.png)

```abap
  METHOD get_accountingdoc.

    DATA:
      ls_return LIKE LINE OF rt_return.

    SELECT
      bukrs,
      belnr,
      gjahr,
      cpudt,
      xblnr
      FROM bkpf
      INTO CORRESPONDING FIELDS OF TABLE @et_bkpf
      WHERE Bukrs IN @it_bukrs
        AND Belnr IN @it_belnr
        AND gjahr IN @it_gjahr.
    IF sy-subrc <> 0.
      MESSAGE e001(zdemo) INTO ls_return-message.
      ls_return-type   = 'E'.
      ls_return-id     = 'ZDEMO'.
      ls_return-number = 001.
      APPEND ls_return TO rt_return.
      RETURN.
    ENDIF.

  ENDMETHOD.
```

## 🧩 CLASSE \*\_DPC_EXT

### 🍧 APPEL DE LA CLASS-METHOD GET_ACCOUNTINGDOC DANS LA CLASS-METHOD ACCOUNTINGDOCSET_GET_ENTITYSET

![](./assets/Capture%20d’écran%202026-02-12%20082535.png)

![](./assets/Capture%20d’écran%202026-02-12%20082633.png)

```abap
  METHOD accountingdocset_get_entityset.

    DATA:
      lt_bukrs  TYPE /iwbep/t_cod_select_options,
      lt_belnr  TYPE /iwbep/t_cod_select_options,
      lt_gjahr  TYPE /iwbep/t_cod_select_options,
      lt_return TYPE bapiret2_tab.

    IF it_filter_select_options[] IS NOT INITIAL.
      LOOP AT it_filter_select_options[] ASSIGNING FIELD-SYMBOL(<lfs_filter>).
        CASE <lfs_filter>-property.
          WHEN 'Bukrs'.
            lt_bukrs = <lfs_filter>-select_options[].
          WHEN 'Belnr'.
            lt_belnr = <lfs_filter>-select_options[].
          WHEN 'Gjahr'.
            lt_gjahr = <lfs_filter>-select_options[].
          WHEN OTHERS.
        ENDCASE.
      ENDLOOP.
    ENDIF.

    CALL METHOD lo_gateway_demo_service->get_accountingdoc
      EXPORTING
        it_bukrs  = lt_bukrs
        it_belnr  = lt_belnr
        it_gjahr  = lt_gjahr
      IMPORTING
        et_bkpf   = et_entityset
      RECEIVING
        rt_return = lt_return.

    IF lt_return[] IS NOT INITIAL.
      "--- Message Container
      mo_context->get_message_container( )->add_messages_from_bapi( lt_return ).
      RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
        EXPORTING
          textid            = /iwbep/cx_mgw_busi_exception=>business_error
          message_container = mo_context->get_message_container( ).
    ENDIF.

  ENDMETHOD.
```
