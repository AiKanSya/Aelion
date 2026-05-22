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
