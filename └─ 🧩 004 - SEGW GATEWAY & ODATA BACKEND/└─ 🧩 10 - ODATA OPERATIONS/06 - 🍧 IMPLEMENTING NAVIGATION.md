# 🌸 IMPLEMENTING NAVIGATION

## 🧩 NAVIGATION IMPLEMENTATION

### 🍧 PREREQUISITES - TRANSACTION SEGW

> [!WARNING]
> Une `Association` doit avoir été créée !

### 🍧 TRANSACTION SE24

> [!NOTE]
> Classe ciblée : `ZCL_<PROJECTNAME>_DPC_EXT`

![](./assets/Capture%20d’écran%202026-01-16%20153106.png)

![](./assets/Capture%20d’écran%202026-01-16%20161000.png)

### 🍧 METHOD PARAMETERS

| 🍧 Paramètre             | 🍧 Catégorie | 🍧 Méthode Catégorie | 🍧 Type réf.                                              |
| ------------------------ | ------------ | -------------------- | --------------------------------------------------------- |
| IV_ENTITY_NAME           | Importing    | Type                 | STRING                                                    |
| IV_ENTITY_SET_NAME       | Importing    | Type                 | STRING                                                    |
| IV_SOURCE_NAME           | Importing    | Type                 | STRING                                                    |
| IT_FILTER_SELECT_OPTIONS | Importing    | Type                 | /IWBEP/T_MGW_SELECT_OPTION                                |
| IS_PAGING                | Importing    | Type                 | /IWBEP/S_MGW_PAGING                                       |
| IT_KEY_TAB               | Importing    | Type                 | /IWBEP/T_MGW_NAME_VALUE_PAIR                              |
| IT_NAVIGATION_PATH       | Importing    | Type                 | /IWBEP/T_MGW_NAVIGATION_PATH                              |
| IT_ORDER                 | Importing    | Type                 | /IWBEP/T_MGW_SORTING_ORDER                                |
| IV_FILTER_STRING         | Importing    | Type                 | STRING                                                    |
| IV_SEARCH_STRING         | Importing    | Type                 | STRING                                                    |
| IO_TECH_REQUEST_CONTEXT  | Importing    | Type Ref To          | /IWBEP/IF_MGW_REQ_ENTITYSET                               |
| ET_ENTITYSET             | Exporting    | Type                 | ZCL_ZFGI_GATEWAY_DEMO_MPC=>TT_BUSINESSPARTNER             |
| ES_RESPONSE_CONTEXT      | Exporting    | Type                 | /IWBEP/IF_MGW_APPL_SRV_RUNTIME=>TY_S_MGW_RESPONSE_CONTEXT |

> [!NOTE]
> 🍧 `IV_ENTITY_NAME` (STRING)
>
> - Nom de l’Entity OData appelée.
> - Exemple : `Product`.
> - Utile quand une même méthode gère plusieurs entités.

> [!NOTE]
> 🍧 `IV_ENTITY_SET_NAME` (STRING)
>
> - Nom de l’EntitySet appelée.
> - Exemple : `ProductSet`.
> - C’est le nom réellement appelé dans l’URL OData. Le plus utilisé pour identifier le contexte.

> [!NOTE]
> 🍧 `IV_SOURCE_NAME` (STRING)
>
> - Nom de la source (utilisé surtout pour navigation ou alias).
> - Peu utilisé en pratique dans les cas simples.

> [!NOTE]
> 🍧 `IT_FILTER_SELECT_OPTIONS` (`/IWBEP/T_MGW_SELECT_OPTION`)
>
> - Filtres OData structurés (`$filter`). C’est le filtre principal à utiliser.
> - Exemple URL : `?$filter=Category eq 'A'`
> - Transformé en options exploitables côté ABAP.

> [!NOTE]
> 🍧 `IS_PAGING` (`/IWBEP/S_MGW_PAGING`)
>
> - Gestion de la pagination (`$top`, `$skip`).
> - Exemple : `?$top=10&$skip=20`
> - Indique combien de lignes retourner et à partir d’où.

> [!NOTE]
> 🍧 `IT_KEY_TAB` (`/IWBEP/T_MGW_NAME_VALUE_PAIR`)
>
> - Clés techniques passées dans l’URL.
> - Exemple : `Products(ProductID='100')`
> - Contient les paires nom / valeur des clés.

> [!NOTE]
> 🍧 `IT_NAVIGATION_PATH` (`/IWBEP/T_MGW_NAVIGATION_PATH`)
>
> - Chemin de navigation OData.
> - Exemple : `Orders('1')/Items`
> - Indique depuis quelle entité on navigue.

> [!NOTE]
> 🍧 `IT_ORDER` (`/IWBEP/T_MGW_SORTING_ORDER`)
>
> - Tri (`$orderby`).
> - Exemple : `?$orderby=Price desc`
> - Indique les champs et le sens de tri.

> [!NOTE]
> 🍧 `IV_FILTER_STRING` (STRING)
>
> - Filtre OData brut, non structuré. Peu utilisé.
> - À éviter pour les débutants.
> - Préférer IT_FILTER_SELECT_OPTIONS.

> [!NOTE]
> 🍧 `IV_SEARCH_STRING` (STRING)
>
> - Recherche texte libre (`$search`).
> - Exemple : `?$search=laptop`
> - À interpréter manuellement dans le code.

> [!NOTE]
> 🍧 `IO_TECH_REQUEST_CONTEXT` (`/IWBEP/IF_MGW_REQ_ENTITYSET`)
>
> - Contexte technique complet de la requête OData.
> - Donne accès : aux headers, à l’utilisateur, aux options techniques
> - Usage avancé uniquement.

> [!NOTE]
> 🍧 `ET_ENTITYSET` (Type spécifique MPC)
>
> - Table des données retournées au consumer OData.
> - C’est le résultat principal de la méthode.
> - Chaque ligne = une entité.

> [!NOTE]
> 🍧 `ES_RESPONSE_CONTEXT` (/IWBEP/...RESPONSE_CONTEXT)
>
> - Métadonnées de la réponse.
> - Exemples : nombre total de lignes, informations pagination
> - Optionnel pour les scénarios simples.

### 🍧 BUSINESSPARNERS_GET_ENTITYSET METHOD IMPLEMENTATION

```abap
METHOD businesspartners_get_entityset.

*&---------------------------------------------------------------------*
*& 1. BUSINESSPARNERS_GET_ENTITYSET METHOD IMPLEMENTATION
*&---------------------------------------------------------------------*
*& MOD_20251431 - SEGW GATEWAY & ODATA BACKEND
*&    └─ 10 - ODATA OPERATIONS
*&       └─ 06 - IMPLEMENTING NAVIGATION
*&---------------------------------------------------------------------*

  DATA: lt_headerdata TYPE TABLE OF bapi_epm_bp_header,
        lt_return     TYPE TABLE OF bapiret2.

  "--- Get data
  CALL FUNCTION 'BAPI_EPM_BP_GET_LIST'
    TABLES
      bpheaderdata = lt_headerdata
      return       = lt_return.

  IF lt_return IS NOT INITIAL.
    "--- Message Container
    mo_context->get_message_container( )->add_messages_from_bapi( lt_return ).
    RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
      EXPORTING
        textid            = /iwbep/cx_mgw_busi_exception=>business_error
        message_container = mo_context->get_message_container( ).
  ENDIF.

  "--- Map properties from the back-end to output response structure
  et_entityset = VALUE #( FOR header IN lt_headerdata
                   ( businesspartnerid   = header-bp_id
                     businesspartnerrole = header-bp_role
                     emailaddress        = header-email_address
                     companyname         = header-company_name
                     currencycode        = header-currency_code
                     city                = header-city
                     street              = header-street
                     country             = header-country
                     addresstype         = header-address_type ) ).

ENDMETHOD.
```

### 🍧 BUSINESSPARNERS_GET_ENTITYSET METHOD IMPLEMENTATION

```abap
METHOD productset_get_entityset.

*&---------------------------------------------------------------------*
*& 1. PRODUCTSET_GET_ENTITYSET METHOD IMPLEMENTATION
*&---------------------------------------------------------------------*
*& MOD_20251431 - SEGW GATEWAY & ODATA BACKEND
*&    └─ 10 - ODATA OPERATIONS
*&       └─ 01 - IMPLEMENTING GET_ENTITYSET
*&---------------------------------------------------------------------*

  DATA: lt_headerdata TYPE TABLE OF bapi_epm_product_header,
        lt_return     TYPE TABLE OF bapiret2.

  "--- Get data
  CALL FUNCTION 'BAPI_EPM_PRODUCT_GET_LIST'
    TABLES
      headerdata = lt_headerdata
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
  et_entityset = CORRESPONDING #( lt_headerdata ).

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
