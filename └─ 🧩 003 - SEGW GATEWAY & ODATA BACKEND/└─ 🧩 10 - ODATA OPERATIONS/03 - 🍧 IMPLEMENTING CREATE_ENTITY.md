# 🌸 IMPLEMENTING \*\_CREATE_ENTITY OPERATION

## 🧩 METHOD \*\_CREATE_ENTITY IMPLEMENTATION

### 🍧 PREREQUISITES - TRANSACTION SEGW

> [!WARNING]
> L'`EntitySet` ciblée doit être `Creatable` !

### 🍧 TRANSACTION SE24

> [!NOTE]
> Classe ciblée : `ZCL_<PROJECTNAME>_DPC_EXT`

![](./assets/Capture%20d’écran%202026-01-16%20153106.png)

![](./assets/Capture%20d’écran%202026-01-16%20161000.png)

### 🍧 BUSINESSPARTNERS_CREATE_ENTITY METHOD PARAMETERS

| 🍧 Paramètre            | 🍧 Catégorie | 🍧 Méthode Catégorie | 🍧 Type réf.                                  |
| ----------------------- | ------------ | -------------------- | --------------------------------------------- |
| IV_ENTITY_NAME          | Importing    | Type                 | STRING                                        |
| IV_ENTITY_SET_NAME      | Importing    | Type                 | STRING                                        |
| IV_SOURCE_NAME          | Importing    | Type                 | STRING                                        |
| IT_KEY_TAB              | Importing    | Type                 | /IWBEP/T_MGW_NAME_VALUE_PAIR                  |
| IO_TECH_REQUEST_CONTEXT | Importing    | Type Ref To          | /IWBEP/IF_MGW_REQ_ENTITY_C                    |
| IT_NAVIGATION_PATH      | Importing    | Type                 | /IWBEP/T_MGW_NAVIGATION_PATH                  |
| IO_DATA_PROVIDER        | Importing    | Type Ref To          | /IWBEP/IF_MGW_ENTRY_PROVIDER                  |
| ER_ENTITY               | Exporting    | Type                 | ZCL_ZFGI_GATEWAY_DEMO_MPC=>TS_BUSINESSPARTNER |

> [!NOTE]
> 🍧 `IV_ENTITY_NAME` (STRING)
>
> - Nom de l’Entity OData concernée par la création.
> - Exemple : `Product`.
> - Identification logique du type d’objet à créer.

> [!NOTE]
> 🍧 `IV_ENTITY_SET_NAME` (STRING)
>
> - Nom de l’EntitySet cible.
> - Exemple : `Products`.
> - Correspond au segment POST de l’URL OData.

> [!NOTE]
> 🍧 `IV_SOURCE_NAME` (STRING)
>
> - Nom de la source d’appel.
> - Utilisé dans les scénarios de navigation ou de réutilisation.
> - Généralement non exploité dans un CREATE simple.

> [!NOTE]
> 🍧 `IT_KEY_TAB` (`/IWBEP/T_MGW_NAME_VALUE_PAIR`)
>
> - Clés techniques transmises par le framework.
> - Généralement vide lors d’un CREATE standard.
> - Utilisé uniquement dans des scénarios spécifiques (navigation, deep insert).

> [!NOTE]
> 🍧 `IO_TECH_REQUEST_CONTEXT` (`/IWBEP/IF_MGW_REQ_ENTITY_C`)
>
> - Contexte technique de la requête CREATE.
> - Donne accès aux headers HTTP, utilisateur, informations de session.
> - Strictement technique.

> [!NOTE]
> 🍧 `IT_NAVIGATION_PATH` (`/IWBEP/T_MGW_NAVIGATION_PATH`)
>
> - Chemin de navigation OData.
> - Exemple : `Orders('1')/Items`
> - Indique si la création est effectuée via une entité parente.

> [!NOTE]
> 🍧 `IO_DATA_PROVIDER` (`/IWBEP/IF_MGW_ENTRY_PROVIDER`)
>
> - Fournisseur des données envoyées par le client.
> - Permet de lire le payload POST (JSON/XML).
> - Source principale des valeurs à créer.

> [!NOTE]
> 🍧 `ER_ENTITY` (Type spécifique MPC)
>
> - Entité créée et retournée au consumer OData.
> - Contient les valeurs finales après création.
> - Résultat principal de la méthode CREATE_ENTITY.

### 🍧 BUSINESSPARTNERS_CREATE_ENTITY METHOD INITIAL CODE

```abap
  METHOD businesspartners_create_entity.
**TRY.
*CALL METHOD SUPER->BUSINESSPARTNERS_CREATE_ENTITYSET
*  EXPORTING
*    IV_ENTITY_NAME           =
*    IV_ENTITY_SET_NAME       =
*    IV_SOURCE_NAME           =
*    IT_FILTER_SELECT_OPTIONS =
*    IS_PAGING                =
*    IT_KEY_TAB               =
*    IT_NAVIGATION_PATH       =
*    IT_ORDER                 =
*    IV_FILTER_STRING         =
*    IV_SEARCH_STRING         =
**    io_tech_request_context  =
**  IMPORTING
**    et_entityset             =
**    es_response_context      =
*    .
**  CATCH /iwbep/cx_mgw_busi_exception.
**  CATCH /iwbep/cx_mgw_tech_exception.
**ENDTRY.
  ENDMETHOD.
```

### 🍧 BUSINESSPARTNERS_CREATE_ENTITY METHOD IMPLEMENTATION

```abap
METHOD businesspartners_create_entity.

*&---------------------------------------------------------------------*
*& 1. BUSINESSPARTNERS_CREATE_ENTITY METHOD IMPLEMENTATION
*&---------------------------------------------------------------------*
*& MOD_20251431 - SEGW GATEWAY & ODATA BACKEND
*&    └─ 10 - ODATA OPERATIONS
*&       └─ 03 - IMPLEMENTING CREATE_ENTITY
*&---------------------------------------------------------------------*

  DATA: ls_headerdata TYPE bapi_epm_bp_header,
        ls_bp_id      TYPE bapi_epm_bp_id,
        lt_return     TYPE TABLE OF bapiret2.

  "--- Get request data
  io_data_provider->read_entry_data(
    IMPORTING
      es_data = er_entity ).

  "--- Map request fields to function module parameters
  ls_headerdata = VALUE #(
                    bp_role       = er_entity-businesspartnerrole
                    email_address = er_entity-emailaddress
                    company_name  = er_entity-companyname
                    currency_code = er_entity-currencycode
                    city          = er_entity-city
                    street        = er_entity-street
                    country       = er_entity-country
                    address_type  = er_entity-addresstype ).

  "--- Create data
  CALL FUNCTION 'BAPI_EPM_BP_CREATE'
    EXPORTING
      headerdata        = ls_headerdata
*     PERSIST_TO_DB     = ABAP_TRUE
    IMPORTING
      businesspartnerid = ls_bp_id
    TABLES
      return            = lt_return.

  IF lt_return IS NOT INITIAL.
    "--- Message Container
    mo_context->get_message_container( )->add_messages_from_bapi( lt_return ).
    RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
      EXPORTING
        textid            = /iwbep/cx_mgw_busi_exception=>business_error
        message_container = mo_context->get_message_container( ).
  ENDIF.

  "--- Fill response data
  er_entity = VALUE #( BASE er_entity
                       businesspartnerid = ls_bp_id-bp_id ).

ENDMETHOD.
```

### 🍧 METHOD EXCEPTION

> [!IMPORTANT]
> Les `Errors` d'une class method doivent être `Raise` à l'aide des `Exception Classes`
>
> - `/IWBEP/CX_MGW_BUSI_EXCEPTION` pour les `Errors` de `logique métier`
> - `/IWBEP/CX_MGW_TECH_EXCEPTION` pour les `exceptions techniques`

> [!IMPORTANT]
> Les `Exception Classes` offrent plusieurs paramètres pour fournir des informations plus détaillées sur l'erreur.
>
> Par exemple, le paramètre `message_container` permet de regrouper plusieurs messages dans un seul objet. L'attribut `mo_context` de la `DPC` fournit un tel conteneur de messages, qui peut être rempli à l'aide de différentes Methods, comme `add_message_from_bapi()`, en attendant le paramètre de retour d'une BAPI.

---

[^1]: Un Reuse Unit est une implémentation standard encapsulée (méthodes utilitaires, classes framework, routines générées) que le runtime Gateway peut appeler pour exécuter une opération OData sans code spécifique.
