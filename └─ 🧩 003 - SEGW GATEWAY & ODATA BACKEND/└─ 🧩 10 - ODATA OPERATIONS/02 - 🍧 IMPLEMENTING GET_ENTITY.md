# 🌸 IMPLEMENTING \*\_GET_ENTITY OPERATION

## 🧩 METHOD \*\_GET_ENTITY IMPLEMENTATION

![](./assets/Capture%20d’écran%202026-02-09%20073729.png)

### 🍧 PREREQUISITES - TRANSACTION SE80

> [!WARNING]
> La méthode ciblée doit avoir été `Redefined` !

### 🍧 TRANSACTION SE24

> [!NOTE]
> Classe ciblée : `ZCL_<PROJECTNAME>_DPC_EXT`

![](./assets/Capture%20d’écran%202026-01-16%20153106.png)

![](./assets/Capture%20d’écran%202026-01-16%20161000.png)

### 🍧 METHOD PARAMETERS

| 🍧 Paramètre            | 🍧 Catégorie | 🍧 Méthode Catégorie | 🍧 Type réf.                                                   |
| ----------------------- | ------------ | -------------------- | -------------------------------------------------------------- |
| IV_ENTITY_NAME          | Importing    | Type                 | STRING                                                         |
| IV_ENTITY_SET_NAME      | Importing    | Type                 | STRING                                                         |
| IV_SOURCE_NAME          | Importing    | Type                 | STRING                                                         |
| IT_KEY_TAB              | Importing    | Type                 | /IWBEP/T_MGW_NAME_VALUE_PAIR                                   |
| IO_REQUEST_OBJECT       | Importing    | Type Ref To          | /IWBEP/IF_MGW_REQ_ENTITY                                       |
| IO_TECH_REQUEST_CONTEXT | Importing    | Type Ref To          | /IWBEP/IF_MGW_REQ_ENTITY                                       |
| IT_NAVIGATION_PATH      | Importing    | Type                 | /IWBEP/T_MGW_NAVIGATION_PATH                                   |
| ER_ENTITY               | Exporting    | Type                 | ZCL_ZFGI_GATEWAY_DEMO_MPC=>TS_PRODUCT                          |
| ES_RESPONSE_CONTEXT     | Exporting    | Type                 | /IWBEP/IF_MGW_APPL_SRV_RUNTIME=>TY_S_MGW_RESPONSE_ENTITY_CNTXT |

> [!NOTE]
> 🍧 `IV_ENTITY_NAME` (STRING)
>
> - Nom de l’Entity OData ciblée.
> - Exemple : `Product`.
> - Indique le type logique de l’entité demandée.

> [!NOTE]
> 🍧 `IV_ENTITY_SET_NAME` (STRING)
>
> - Nom de l’EntitySet appelée.
> - Exemple : `Products`.
> - Correspond directement au segment utilisé dans l’URL OData.

> [!NOTE]
> 🍧 `IV_SOURCE_NAME` (STRING)
>
> - Nom de la source d’appel.
> - Utilisé principalement dans les scénarios de navigation ou de réutilisation.
> - Rarement exploité dans les cas simples.

> [!NOTE]
> 🍧 `IT_KEY_TAB` (`/IWBEP/T_MGW_NAME_VALUE_PAIR`)
>
> - Contient les clés de l’entité demandée.
> - Exemple URL : `Products(ProductID='100')`
> - Chaque entrée représente une paire clé / valeur.
> - Paramètre central de GET_ENTITY.

> [!NOTE]
> 🍧 `IO_REQUEST_OBJECT` (`/IWBEP/IF_MGW_REQ_ENTITY`)
>
> - Objet représentant la requête OData fonctionnelle.
> - Permet l’accès aux paramètres métier de la requête.
> - Usage avancé.

> [!NOTE]
> 🍧 `IO_TECH_REQUEST_CONTEXT` (`/IWBEP/IF_MGW_REQ_ENTITY`)
>
> - Contexte technique complet de la requête.
> - Donne accès aux headers HTTP, utilisateur, options techniques.
> - Usage strictement technique.

> [!NOTE]
> 🍧 `IT_NAVIGATION_PATH` (`/IWBEP/T_MGW_NAVIGATION_PATH`)
>
> - Chemin de navigation OData.
> - Exemple : `Orders('1')/Items('10')`
> - Indique depuis quelle entité parente la requête est effectuée.

> [!NOTE]
> 🍧 `ER_ENTITY` (Type spécifique MPC)
>
> - Structure représentant l’entité retournée.
> - Contient exactement une instance métier.
> - Résultat principal de la méthode GET_ENTITY.

> [!NOTE]
> 🍧 `ES_RESPONSE_CONTEXT` (`/IWBEP/...RESPONSE_ENTITY_CNTXT`)
>
> - Métadonnées associées à la réponse.
> - Utilisé pour informations complémentaires (techniques).
> - Optionnel pour les scénarios standards.

### 🍧 PRODUCTSET_GET_ENTITY METHOD INITIAL CODE

```abap
  METHOD productset_get_entity.
**TRY.
*CALL METHOD SUPER->PRODUCTSET_GET_ENTITY
*  EXPORTING
*    IV_ENTITY_NAME          =
*    IV_ENTITY_SET_NAME      =
*    IV_SOURCE_NAME          =
*    IT_KEY_TAB              =
**    io_request_object       =
**    io_tech_request_context =
*    IT_NAVIGATION_PATH      =
**  IMPORTING
**    er_entity               =
**    es_response_context     =
*    .
**  CATCH /iwbep/cx_mgw_busi_exception.
**  CATCH /iwbep/cx_mgw_tech_exception.
**ENDTRY.
  ENDMETHOD.
```

### 🍧 PRODUCTSET_GET_ENTITY METHOD IMPLEMENTATION

```abap
METHOD productset_get_entity.

*&---------------------------------------------------------------------*
*& 1. PRODUCTSET_GET_ENTITY METHOD IMPLEMENTATION
*&---------------------------------------------------------------------*
*& MOD_20251431 - SEGW GATEWAY & ODATA BACKEND
*&    └─ 10 - ODATA OPERATIONS
*&       └─ 02 - IMPLEMENTING GET_ENTITY
*&---------------------------------------------------------------------*

  DATA: ls_product_id TYPE bapi_epm_product_id,
        ls_headerdata TYPE bapi_epm_product_header,
        lt_return     TYPE TABLE OF bapiret2.

  "--- Get key fields from request
  io_tech_request_context->get_converted_keys(
    IMPORTING
      es_key_values = er_entity
  ).

  "--- Map key fields to function module parameters
  ls_product_id-product_id = er_entity-product_id.

  "--- Get data
  CALL FUNCTION 'BAPI_EPM_PRODUCT_GET_DETAIL'
    EXPORTING
      product_id = ls_product_id
    IMPORTING
      headerdata = ls_headerdata
    TABLES
      return     = lt_return.

  IF lt_return IS NOT INITIAL.
    "--- Message Container
    mo_context->get_message_container( )->add_messages_from_bapi( lt_return ).
    RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
      EXPORTING
        textid            = /iwbep/cx_mgw_busi_exception=>business_error
        message_container = mo_context->get_message_container( ).
  ENDIF.

  "--- Fill response data
  er_entity = CORRESPONDING #( ls_headerdata ).

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
