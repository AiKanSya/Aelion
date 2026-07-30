# 🌸 IMPLEMENTING \*\_DELETE_ENTITY OPERATION

## 🧩 METHOD \*\_DELETE_ENTITY IMPLEMENTATION

### 🍧 PREREQUISITES - TRANSACTION SEGW

> [!WARNING]
> L'`EntitySet` ciblée doit être `Deletable` !

### 🍧 TRANSACTION SE24

> [!NOTE]
> Classe ciblée : `ZCL_<PROJECTNAME>_DPC_EXT`

![](./assets/Capture%20d’écran%202026-01-16%20153106.png)

![](./assets/Capture%20d’écran%202026-01-16%20161000.png)

### 🍧 METHOD PARAMETERS

| 🍧 Paramètre            | 🍧 Catégorie | 🍧 Méthode Catégorie | 🍧 Type réf.                 |
| ----------------------- | ------------ | -------------------- | ---------------------------- |
| IV_ENTITY_NAME          | Importing    | Type                 | STRING                       |
| IV_ENTITY_SET_NAME      | Importing    | Type                 | STRING                       |
| IV_SOURCE_NAME          | Importing    | Type                 | STRING                       |
| IT_KEY_TAB              | Importing    | Type                 | /IWBEP/T_MGW_NAME_VALUE_PAIR |
| IO_TECH_REQUEST_CONTEXT | Importing    | Type Ref To          | /IWBEP/IF_MGW_REQ_ENTITY_D   |
| IT_NAVIGATION_PATH      | Importing    | Type                 | /IWBEP/T_MGW_NAVIGATION_PATH |

> [!NOTE]
> 🍧 `IV_ENTITY_NAME` (STRING)
>
> - Nom de l’Entity OData ciblée pour la suppression.
> - Exemple : `Product`.
> - Identification logique de l’entité à supprimer.

> [!NOTE]
> 🍧 `IV_ENTITY_SET_NAME` (STRING)
>
> - Nom de l’EntitySet sur laquelle la suppression est exécutée.
> - Exemple : `Products`.
> - Correspond au segment DELETE de l’URL OData.

> [!NOTE]
> 🍧 `IV_SOURCE_NAME` (STRING)
>
> - Nom de la source d’appel.
> - Utilisé pour navigation ou réutilisation.
> - Rarement nécessaire dans une suppression simple.

> [!NOTE]
> 🍧 `IT_KEY_TAB` (`/IWBEP/T_MGW_NAME_VALUE_PAIR`)
>
> - Contient les clés de l’entité à supprimer.
> - Exemple URL : `Products(ProductID='100')`
> - Paramètre central pour identifier la ligne à supprimer.

> [!NOTE]
> 🍧 `IO_TECH_REQUEST_CONTEXT` (`/IWBEP/IF_MGW_REQ_ENTITY_D`)
>
> - Contexte technique de la requête DELETE.
> - Permet l’accès aux headers HTTP, utilisateur et informations techniques.
> - Strictement technique.

> [!NOTE]
> 🍧 `IT_NAVIGATION_PATH` (`/IWBEP/T_MGW_NAVIGATION_PATH`)
>
> - Chemin de navigation OData.
> - Exemple : `Orders('1')/Items('10')`
> - Indique depuis quelle entité parente la suppression est effectuée.

### 🍧 BUSINESSPARTNERS_DELETE_ENTITY METHOD INITIAL CODE

```abap
  METHOD businesspartners_delete_entity.
**TRY.
*CALL METHOD SUPER->BUSINESSPARTNERS_DELETE_ENTITY
*  EXPORTING
*    IV_ENTITY_NAME          =
*    IV_ENTITY_SET_NAME      =
*    IV_SOURCE_NAME          =
*    IT_KEY_TAB              =
**    io_tech_request_context =
*    IT_NAVIGATION_PATH      =
*    .
**  CATCH /iwbep/cx_mgw_busi_exception.
**  CATCH /iwbep/cx_mgw_tech_exception.
**ENDTRY.
  ENDMETHOD.
```

### 🍧 BUSINESSPARTNERS_DELETE_ENTITY METHOD IMPLEMENTATION

```abap
METHOD businesspartners_delete_entity.

*&---------------------------------------------------------------------*
*& 1. BUSINESSPARTNERS_DELETE_ENTITY METHOD IMPLEMENTATION
*&---------------------------------------------------------------------*
*& MOD_20251431 - SEGW GATEWAY & ODATA BACKEND
*&    └─ 10 - ODATA OPERATIONS
*&       └─ 05 - IMPLEMENTING DELETE_ENTITY
*&---------------------------------------------------------------------*

  DATA: ls_entity TYPE zcl_zfgi_gateway_demo_mpc=>ts_businesspartner,
        ls_bp_id  TYPE bapi_epm_bp_id,
        lt_return TYPE TABLE OF bapiret2.

  "--- Get key
  io_tech_request_context->get_converted_keys(
    IMPORTING
      es_key_values = ls_entity ).
  ls_bp_id-bp_id = ls_entity-businesspartnerid.

  "--- Delete data
  CALL FUNCTION 'BAPI_EPM_BP_DELETE'
    EXPORTING
      bp_id  = ls_bp_id
*     PERSIST_TO_DB = ABAP_TRUE
    TABLES
      return = lt_return.

  IF lt_return IS NOT INITIAL.
    "--- Message Container
    mo_context->get_message_container( )->add_messages_from_bapi( lt_return ).
    RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
      EXPORTING
        textid            = /iwbep/cx_mgw_busi_exception=>business_error
        message_container = mo_context->get_message_container( ).
  ENDIF.

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
