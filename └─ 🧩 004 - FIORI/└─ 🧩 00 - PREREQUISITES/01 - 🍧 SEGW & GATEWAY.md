# 🌸 SEGW & ODATA

> 🌺 Objectifs
>
> - [ ] 0. Création d'un OT/Package
> - [ ] 1. Création du projet en `SEGW`
> - [ ] 2. Création des Entities
> - [ ] 3. Création de l'Assocation
> - [ ] 4. Sauvegarde et génération du projet
> - [ ] 5. Création/enregistrement du service OData
> - [ ] 6. Redefine les Methods de la class '\*\_DPC_EXT'
> - [ ] 7. Implémentation DPC_EXT & TEST GW_CLIENT

## 🧩 CONTEXTE

> [!IMPORTANT]
> Dans une application SAP Fiori, l'interface utilisateur (SAPUI5) ne lit pas directement les tables SAP ou le code ABAP.
> Une couche intermédiaire est nécessaire :

     Application Fiori
     ↓
     Service ODATA
     ↓
     Code ABAP
     ↓
     Base SAP

Cette couche intermédiaire est créée via `SEGW` (SAP Gateway Service Builder).

Le projet `SEGW` permet de construire un service `ODATA` qui sera utilisé par l'application `Fiori` pour échanger des données avec SAP.

## 🧩 0. CREATION D'UN OT/PACKAGE

### 🍧 CREATION DE L'OT

#### 🌺 OT :

    <TRI> - FIORI MODULE

### 🍧 CREATION DU PACKAGE

#### 🌺 Package :

    Z<TRI>_FIORI_MODULE

#### 🌺 Description :

    <TRI> - AELION FIORI MODULE

## 🧩 1. CREATION DU PROJET SEGW

Le projet SEGW représente le conteneur principal du service.

Il contient :

- les _Entities_ (_EntityTypes_ et _EntitySets_)
- les _Associations_ (relations)
- les paramètres
- les classes générées (MPC/DPC/...) et leurs _Methods_

### 🍧 SEGW PROJECT

#### 🌺 Project Name :

    Z<TRI>_FIORI_DEMO

#### 🌺 Description :

    <TRI> - AELION FIORI DEMO - SEGW PROJECT

<details>
  <summary>SOLUTION</summary>

1. Transaction `SEGW` > `Créer projet`

   ![](./assets/Capture%20d’écran%202026-05-21%20075815.png)

2. Créer projet

   ![](./assets/Capture%20d’écran%202026-05-21%20075959.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20080054.png)

</details>

## 🧩 2. CREATION DES ENTITIES

### 🍧 ENTITYTYPE 'SESSION' & ENTITYSET 'SESSIONSET'

#### 🌺 EntityType Name

    Session

#### 🌺 ABAP Structure

    ZAELION

#### 🌺 Sélection des Champs de l'EntityType

    ID_SESSION
    ANNEE
    DUREE
    SITE

#### 🌺 Sélection du/des clé(s)

    ID_SESSION

<details>
  <summary>SOLUTION</summary>

1. `Data Model` > `Import` > `DDIC structure`

   ![](./assets/Capture%20d’écran%202026-05-21%20080158.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20080751.png)

> [!NOTE]
> La création de l'EntitySet 'SessionSet' va se faire automatiquement si la case 'Create Default Entity Set' est coché

2. Sélection des Champs de l'EntityType

   ![](./assets/Capture%20d’écran%202026-05-21%20080931.png)

3. Sélection du/des clé(s)

   ![](./assets/Capture%20d’écran%202026-05-21%20081147.png)

</details>

### 🍧 ENTITYTYPE 'CONSULTANT' & ENTITYSET 'CONSULTANTSET'

#### 🌺 EntityType Name

    Consultant

#### 🌺 ABAP Structure

    ZCONSULTANT

#### 🌺 Sélection des Champs de l'EntityType

    ID_SESSION
    ID_CONSULTANT
    ENTREPRISE
    NAME
    DATE_BIRTH
    CITY
    REGION
    COUNTRY
    LANG

#### 🌺 Sélection du/des clé(s)

    ID_SESSION
    ID_CONSULTANT

### 🍧 PARAMETRAGE DES ENTITYTYPES/ENTITYSETS

> [!NOTE]
> Dans le cadre de la démo, nous allons rendre les EntityTypes :

    CREATABLE
    UPDATABLE
    SORTABLE
    NULLABLE (excepté sur les clés)
    FILTERABLE
    ADDRESSABLE

> [!NOTE]
> Dans le cadre de la démo, nous allons rendre les EntitySets :

    CREATABLE
    UPDATABLE
    DELETABLE
    ADDRESSABLE

<details>
  <summary>SOLUTION</summary>

1. `Data Model` > `Import` > `DDIC structure`

   ![](./assets/Capture%20d’écran%202026-05-21%20080158.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20081723.png)

   > [!NOTE]
   > La création de l'EntitySet 'SessionSet' va se faire automatiquement si la case 'Create Default Entity Set' est coché

2. Sélection des Champs de l'EntityType

   ![](./assets/Capture%20d’écran%202026-05-21%20081858.png)

3. Sélection du/des clé(s)

   ![](./assets/Capture%20d’écran%202026-05-21%20082008.png)

4. Paramétrages des EntityTypes/EntitySets

   ![](./assets/Capture%20d’écran%202026-05-21%20101408.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20101457.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20101657.png)

</details>

## 🧩 3. CREATION DE L'ASSOCIATION

### 🍧 CREATION

#### 🌺 Association Name

    Session_Consultants

### 🍧 PRINCIPAL ENTITY

#### 🌺 Entity Type Name

    Session

#### 🌺 Cardinality

    1

#### 🌺 Navigation Property

    ConsultantSet

### 🍧 DEPENDANT ENTITY

#### 🌺 Entity Type Name

    Consultant

#### 🌺 Cardinality

    N

#### 🌺 Navigation Property

    ConsultantSet

### 🍧 DEFINITION DES CLES COMMUNES POUR ASSOCIER LES ENTITIES

#### 🌺 Principal Entity

    IdSession

#### 🌺 Dependant Entity

    IdSession

<details>
  <summary>SOLUTION</summary>

1. `Association` > `Create`

   ![](./assets/Capture%20d’écran%202026-05-21%20082156.png)

2. Création

   ![](./assets/Capture%20d’écran%202026-05-21%20082941.png)

3. Définition des clés communes

   ![](./assets/Capture%20d’écran%202026-05-21%20083651.png)

4. Validation

   ![](./assets/Capture%20d’écran%202026-05-21%20083737.png)

</details>

## 🧩 4. SAUVEGARDE ET GENERATION DU PROJET

> [!IMPORTANT]
> Après avoir créé le projet SEGW, les EntityTypes, les Entity Sets et les associations, ces derniers n'existent uniquement que comme définition fonctionnelle. À ce stade :

     Projet SEGW
     ↓
     Description des objets

     PAS de service exécutable

> [!IMPORTANT]
> Aucune application Fiori ne peut utiliser ces objets pour le moment. La génération du service OData transformera cette définition en objets techniques ABAP exécutables. Autrement dit, la génération créera automatiquement les composants nécessaires au fonctionnement du service ODATA.
>
> La génération crée automatiquement les composants nécessaires au fonctionnement du service ODATA.
>
> Elle produit notamment :
>
> - classes ABAP
> - classes runtime
> - structures techniques
> - méthodes ODATA
> - métadonnées du service

#### 🌺 OT :

    <TRI> - FIORI MODULE

#### 🌺 Package :

    Z<TRI>_FIORI_MODULE

<details>
  <summary>SOLUTION</summary>

1. Sauvegarde

   ![](./assets/Capture%20d’écran%202026-05-21%20083914.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20084036.png)

2. Génération

   ![](./assets/Capture%20d’écran%202026-05-21%20084131.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20084224.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20084319.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20084404.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20084439.png)

</details>

## 🧩 5. CREATION/ENREGISTREMENT DU SERVICE ODATA

> [!IMPORTANT]
> À ce stade, le service existe techniquement dans le système ABAP, mais il n'est pas encore exposé à SAP Gateway. Les applications Fiori ne peuvent pas encore communiquer avec le service.

     Projet SEGW
     ↓
     Classes générées

     Service disponible en backend

     NON accessible depuis Fiori

### 🍧 ROLE DE /N/IWFND/MAINT_SERVICE

La transaction :

    /N/IWFND/MAINT_SERVICE

permet :

- d'enregistrer le service ODATA
- de l'activer
- de le publier dans SAP Gateway
- de le rendre accessible via URL HTTP

Schéma simplifié :

     SEGW
     ↓
     Génération
     ↓
     Classes ABAP créées
     ↓
     /IWFND/MAINT_SERVICE
     ↓
     Service publié
     ↓
     SAP Fiori peut l'utiliser

> [!IMPORTANT]
> Lors de l'ajout du service, SAP crée automatiquement plusieurs éléments techniques :
>
> - enregistrement du service
> - liaison avec les classes générées
> - activation Gateway
> - métadonnées ODATA accessibles
> - URL du service

### 🍧 ENREGISTREMENT DU SERVICE

> [!TIP]
> Le nom du service OData lié au projet et généré lors de l'étape 4 aura par défaut le suffixe '\_SRV' ajouté au nom du projet SEGW.

#### 🌺 Nom du service technique :

    Z<TRI>\_FIORI_DEMO_SRV

#### 🌺 Nom du service technique :

    Z<TRI>\_FIORI_DEMO_SRV

#### 🌺 Dépl. int. (Déploiement intégré) :

    [X]

#### 🌺 OT :

    <TRI> - FIORI MODULE

<details>
  <summary>SOLUTION</summary>

1. `Ajouter le service`

   ![](./assets/Capture%20d’écran%202026-05-21%20091555.png)

2. Renseigner le service généré et sélectionner `Dépl. int.`

   ![](./assets/Capture%20d’écran%202026-05-21%20091910.png)

   > [!WARNING]
   > Une fois les noms des services renseignés et `Dépl. int.` coché, appuyez sur Entrée pour faire afficher le service.

   ![](./assets/Capture%20d’écran%202026-05-21%20092059.png)

3. Cliquer sur le service

   ![](./assets/Capture%20d’écran%202026-05-21%20092237.png)

4. Vérifier que le Noeud ICF est bien sur `SAP Gateway OData V2` et valider

   ![](./assets/Capture%20d’écran%202026-05-21%20092353.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20092444.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20092517.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20092553.png)

5. Rechercher le service dans la liste et vérifier l'état du Noeud ICF (qui doit être vert)

   ![](./assets/Capture%20d’écran%202026-05-21%20092831.png)

</details>

## 🧩 6. REDEFINE LES METHODS DE LA CLASS '\*\_DPC_EXT'

> [!IMPORTANT]
> Après génération du projet SEGW, SAP crée automatiquement les méthodes ODATA standard. Exemple :

     GET_ENTITY

     GET_ENTITYSET

     CREATE_ENTITY

     UPDATE_ENTITY

     DELETE_ENTITY

> [!IMPORTANT]
> Ces méthodes existent techniquement mais sont générées avec une logique vide. À ce stade :

     Requête ODATA reçue
     ↓
     Méthode appelée
     ↓
     Aucun traitement
     ↓
     Aucune donnée retournée

L'application Fiori ne reçoit rien.

### 🍧 ROLE DE LA CLASS 'DPC_EXT'

La 'DPC_EXT' contient la logique métier qui permet :

- lire des données SAP
- créer des données
- modifier des données
- supprimer des données
- traiter les requêtes ODATA

Schéma :

     Application Fiori
     ↓
     Requête ODATA
     ↓
     DPC_EXT
     ↓
     Code ABAP
     ↓
     Base SAP

### 🍧 POURQUOI NE PAS MODIFIER LES CLASS '_\_DPC' et '_\_MPC' ?

Les classes :

     MPC
     DPC

sont régénérées par SAP. Une nouvelle génération en SEGW peut supprimer les développements qui auraient été implémenté dans l'une de ces Class.

SAP prévoit donc des Class d'extension :

     MPC_EXT
     DPC_EXT

pour conserver le code personnalisé.

### 🍧 REDEFINITION

Methodes à redéfinir :

     SESSIONSET_CREATE_ENTITY
     SESSIONSET_DELETE_ENTITY
     SESSIONSET_GET_ENTITY
     SESSIONSET_GET_ENTITYSET
     SESSIONSET_UPDATE_ENTITY

     CONSULTANTSET_CREATE_ENTITY
     CONSULTANTSET_DELETE_ENTITY
     CONSULTANTSET_GET_ENTITY
     CONSULTANTSET_GET_ENTITYSET
     CONSULTANTSET_UPDATE_ENTITY

<details>
  <summary>SOLUTION</summary>

> [!NOTE]
> La manière de redéfinir une méthode est la même, quelque soit les méthodes.

1. `SEGW` > `Z<TRI>_FIORI_DEMO` > `Runtime Artifacts` > `ZCL_*_DPC_EXT` > `Go to ABAP Workbench`

   ![](./assets/Capture%20d’écran%202026-05-21%20095028.png)

2. `ZCL_*_DPC_EXT` > `<Method>` > `Redéfinir`

   ![](./assets/Capture%20d’écran%202026-05-21%20095258.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20095436.png)

3. Redéfinition de toutes les méthodes concernées

   ![](./assets/Capture%20d’écran%202026-05-21%20095652.png)

</details>

## 🧩 7. IMPLEMENTATION DPC_EXt & TESTS GW_CLIENT AVEC ASSOCIATION 1:N

> [!IMPORTANT]
> Objectif(s) :
>
> - sécuriser toutes les méthodes
> - gérer erreurs métier + techniques
> - rendre service stable pour Fiori + GW_CLIENT

#### 🌺 Transaction Gateway Client :

    /N/IWFND/GW_CLIENT

### 🍧 CONTEXTE

#### 🌺 Tables :

    ZAELION

#### 🌺 Service :

    Z<TRI>_FIORI_DEMO_SRV

#### 🌺 Entités :

    Session (1)
    Consultant (N)

#### 🌺 Relation :

    Session.IdSession  →  Consultant.IdSession

#### 🌺 Service :

    Z<TRI>_FIORI_DEMO_SRV

#### 🌺 Navigation :

    SessionSet('SAP_2027')/ConsultantSet
    SessionSet?$expand=ConsultantSet

### 🍧 CONSULTANTSET_GET_ENTITYSET

> [!IMPORTANT]
> Objectif(s) :
>
> - Retourner tous les Consultants.

<details>
  <summary>SOLUTION</summary>

1.  Implémentation de la logique de la méthode consultantset_get_entityset

    ```abap
    METHOD consultantset_get_entityset.

          "--------------------------------------------
          " GW_CLIENT
          "   GET : /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/ConsultantSet
          "--------------------------------------------

          SELECT *
               FROM zconsultant
               INTO TABLE et_entityset.

    ENDMETHOD.
    ```

2.  /N/IWFND/GW_CLIENT

    #### 🌺 URI de requête :

        GET : /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/ConsultantSet

</details>

### 🍧 CONSULTANTSET_GET_ENTITY

> [!IMPORTANT]
> Objectif(s) :
>
> - Retourner un Consultant via ses IDs.
> - Implémenter les gestions d'erreur (Technique/Business)

<details>
  <summary>SOLUTION</summary>

1.  Implémentation de la logique de la méthode consultantset_get_entity

    ```abap
    METHOD consultantset_get_entity.

        "--------------------------------------------
        " GW_CLIENT
        "   GET : /ConsultantSet(IdSession='SAP_2026',IdConsultant='AELION14')
        "--------------------------------------------

        TRY.

            DATA ls_key TYPE zconsultant.

            " Récupération clés depuis URL
            io_tech_request_context->get_converted_keys(
                IMPORTING
                es_key_values = ls_key
            ).

            SELECT SINGLE *
                FROM zconsultant
                INTO @DATA(ls_data)
                WHERE id_session    = @ls_key-id_session
                AND id_consultant = @ls_key-id_consultant.

            IF sy-subrc <> 0.

                DATA(lo_msg) = mo_context->get_message_container( ).

                lo_msg->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Consultant introuvable'
                ).

                RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
                EXPORTING
                    message_container = lo_msg.

            ENDIF.

            er_entity = ls_data.

            CATCH cx_root.

            DATA(lo_msg2) = mo_context->get_message_container( ).

            lo_msg2->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Erreur technique GET_ENTITY'
            ).

            RAISE EXCEPTION TYPE /iwbep/cx_mgw_tech_exception
                EXPORTING
                message_container = lo_msg2.

        ENDTRY.

    ENDMETHOD.
    ```

2.  /N/IWFND/GW_CLIENT

    #### 🌺 URI de requête :

        /sap/opu/odata/sap/Z<TRI>_FIORI_DEMO_SRV/ConsultantSet(IdSession='SAP_2026',IdConsultant='AELION14')

</details>

### 🍧 CONSULTANTSET_CREATE_ENTITY

> [!IMPORTANT]
> Objectif(s) :
>
> - Créer un Consultant
> - Implémenter les gestions d'erreur (Technique/Business)

<details>
  <summary>SOLUTION</summary>

1.  Implémentation de la logique de la méthode consultantset_create_entity

    ```abap
    METHOD consultantset_create_entity.

        "--------------------------------------------
        " GW_CLIENT :
        "   POST : /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/ConsultantSet
        "
        " Header :
        "   Content-Type: application/json
        "
        " Payload :
        " {
        "   "IdSession": "SAP_TEST",
        "   "IdConsultant": "AELION00",
        "   "Entreprise": "STMS",
        "   "Name": "Fred",
        "   "DateBirth": "/Date(631152000000)/",
        "   "City": "Paris",
        "   "Region": "IDF",
        "   "Country": "FR",
        "   "Lang": "FR"
        " }
        "--------------------------------------------

        TRY.

            DATA ls_input TYPE zconsultant.

            io_data_provider->read_entry_data(
                IMPORTING
                es_data = ls_input
            ).

            "--------------------------------------------
            " Validation simple
            "--------------------------------------------
            IF ls_input-id_session IS INITIAL OR ls_input-id_consultant IS INITIAL.

                DATA(lo_msg) = mo_context->get_message_container( ).

                lo_msg->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Clés obligatoires manquantes'
                ).

                RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
                EXPORTING
                    message_container = lo_msg.

            ENDIF.

            "--------------------------------------------
            " INSERT DB
            "--------------------------------------------
            INSERT zconsultant FROM ls_input.

            IF sy-subrc <> 0.

                lo_msg = mo_context->get_message_container( ).

                lo_msg->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Erreur INSERT ZCONSULTANT'
                ).

                RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
                EXPORTING
                    message_container = lo_msg.

            ENDIF.

            er_entity = ls_input.

            CATCH cx_sy_open_sql_db.

            DATA(lo_msg2) = mo_context->get_message_container( ).

            lo_msg2->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Erreur base de données'
            ).

            RAISE EXCEPTION TYPE /iwbep/cx_mgw_tech_exception
                EXPORTING
                message_container = lo_msg2.

        ENDTRY.

    ENDMETHOD.
    ```

2.  /N/IWFND/GW_CLIENT

    #### 🌺 URI de requête :

        /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/ConsultantSet

    #### 🌺 Header :

        | NOM D'ENTETE | VALEUR           |
        |--------------|------------------|
        | Content-Type | application/json |

    #### 🌺 Payload :

    ```json
    {
      "IdSession": "SAP_TEST",
      "IdConsultant": "AELION00",
      "Entreprise": "SAP SE",
      "Name": "John",
      "City": "Lyon",
      "Region": "ARA",
      "Country": "FR",
      "Lang": "FR"
    }
    ```

</details>

### 🍧 CONSULTANTSET_UPDATE_ENTITY

> [!IMPORTANT]
> Objectif(s) :
>
> - Mettre à jour un Consultant
> - Implémenter les gestions d'erreur (Technique/Business)

<details>
  <summary>SOLUTION</summary>

1.  Implémentation de la logique de la méthode consultantset_update_entity

    ```abap
    METHOD consultantset_update_entity.

        "--------------------------------------------
        " GW_CLIENT :
        "   PUT : /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/ConsultantSet(IdSession='SAP_TEST',IdConsultant='AELION00')
        "
        " Headers :
        "   Content-Type : application/json
        "
        " Payload :
        " {
        "   "IdSession": "SAP_TEST",
        "   "IdConsultant": "AELION00",
        "   "Entreprise": "Updated value",
        "   "Name": "Updated value",
        "   "City": "Updated value",
        "   "Region": "UWU",
        "   "Country": "JP",
        "   "Lang": "JP"
        " }
        "--------------------------------------------

        TRY.


            DATA ls_input TYPE zconsultant.

            io_data_provider->read_entry_data(
                IMPORTING es_data = ls_input
            ).

            UPDATE zconsultant FROM ls_input.

            IF sy-subrc <> 0.

                DATA(lo_msg) = mo_context->get_message_container( ).

                lo_msg->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Update impossible (introuvable)'
                ).

                RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
                EXPORTING message_container = lo_msg.

            ENDIF.

            er_entity = ls_input.

            CATCH cx_root.

            DATA(lo_msg2) = mo_context->get_message_container( ).

            lo_msg2->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Erreur technique UPDATE'
            ).

            RAISE EXCEPTION TYPE /iwbep/cx_mgw_tech_exception
                EXPORTING message_container = lo_msg2.

        ENDTRY.

    ENDMETHOD.
    ```

2.  /N/IWFND/GW_CLIENT

    #### 🌺 URI de requête :

        /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/ConsultantSet(IdSession='SAP_TEST',IdConsultant='AELION00')

    #### 🌺 Header :

        | NOM D'ENTETE | VALEUR           |
        |--------------|------------------|
        | Content-Type | application/json |

    #### 🌺 Payload :

    ```json
    {
      "IdSession": "SAP_TEST",
      "IdConsultant": "AELION00",
      "Entreprise": "Updated value",
      "Name": "Updated value",
      "City": "Updated value",
      "Region": "UWU",
      "Country": "JP",
      "Lang": "JP"
    }
    ```

</details>

### 🍧 CONSULTANTSET_DELETE_ENTITY

> [!IMPORTANT]
> Objectif(s) :
>
> - Supprimer un Consultant
> - Implémenter les gestions d'erreur (Technique/Business)

<details>
  <summary>SOLUTION</summary>

1.  Implémentation de la logique de la méthode consultantset_delete_entity

    ```abap
    METHOD consultantset_delete_entity.

        "--------------------------------------------
        " DELETE /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/ConsultantSet(IdSession='SAP_TEST',IdConsultant='AELION00')
        "--------------------------------------------

        TRY.

            DATA ls_key TYPE zconsultant.

            io_tech_request_context->get_converted_keys(
                IMPORTING
                es_key_values = ls_key
            ).

            DELETE FROM zconsultant
                WHERE id_session    = ls_key-id_session
                AND id_consultant = ls_key-id_consultant.

            IF sy-subrc <> 0.

                DATA(lo_msg) = mo_context->get_message_container( ).

                lo_msg->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Suppression impossible'
                ).

                RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
                EXPORTING
                    message_container = lo_msg.

            ENDIF.

            CATCH cx_root.

            DATA(lo_msg2) = mo_context->get_message_container( ).

            lo_msg2->add_message_text_only(
                iv_msg_type = 'E'
                iv_msg_text = 'Erreur technique DELETE'
            ).

            RAISE EXCEPTION TYPE /iwbep/cx_mgw_tech_exception
                EXPORTING
                message_container = lo_msg2.

        ENDTRY.

    ENDMETHOD.
    ```

2.  /N/IWFND/GW_CLIENT

    #### 🌺 URI de requête :

        /sap/opu/odata/sap/ZFGI_FIORI_DEMO_SRV/ConsultantSet(IdSession='SAP_TEST',IdConsultant='AELION00')

</details>
