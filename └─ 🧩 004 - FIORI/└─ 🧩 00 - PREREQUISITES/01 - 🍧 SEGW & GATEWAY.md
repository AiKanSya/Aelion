# 🌸 SEGW & ODATA

> 🌺 Objectifs
>
> - [ ] 0. Création d'un OT/Package
> - [ ] 1. Création du projet en `SEGW`
> - [ ] 2. Création des Entities
> - [ ] 3. Création de l'Assocation
> - [ ] 4. Sauvegarde et génération du projet
> - [ ] 4. Créer le Service `ODATA` à partir du projet
> - [ ] 5. Redefine les Methods des Entities

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
- les _Methods_
- les paramètres
- les classes générées (MPC/DPC/...)

### 🍧 SEGW PROJECT

#### 🌺 Project Name :

    Z<TRI>_FIORI_DEMO

#### 🌺 Description :

    <TRI> - AELION FIORI DEMO - SEGW PROJECT

<details>
  <summary>Rappel</summary>

1. Transaction `SEGW` > `Créer projet`

   ![](./assets/Capture%20d’écran%202026-05-21%20075815.png)

2. Créer projet

   ![](./assets/Capture%20d’écran%202026-05-21%20075959.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20080054.png)

</details>

## 🧩 2. CREATION DES ENTITIES

### 🍧 ENTITYTYPE 'SESSION' & ENTITYSET 'SESSIONSET'

#### 🌺 Nom

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
  <summary>Rappel</summary>

1. `Import` > `DDIC structure`

   ![](./assets/Capture%20d’écran%202026-05-21%20080158.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20080751.png)

   > [!NOTE]
   > La création de l'EntitySet 'SessionSet' va se faire automatiquement si la case est coché

2. Sélection des Champs de l'EntityType

   ![](./assets/Capture%20d’écran%202026-05-21%20080931.png)

3. Sélection du/des clé(s)

   ![](./assets/Capture%20d’écran%202026-05-21%20081147.png)

</details>

### 🍧 ENTITYTYPE 'CONSULTANT' & ENTITYSET 'CONSULTANTSET'

#### 🌺 Nom

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

<details>
  <summary>Rappel</summary>

1. `Import` > `DDIC structure`

   ![](./assets/Capture%20d’écran%202026-05-21%20080158.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20081723.png)

   > [!NOTE]
   > La création de l'EntitySet 'ConsultantSet' va se faire automatiquement si la case est coché

2. Sélection des Champs de l'EntityType

   ![](./assets/Capture%20d’écran%202026-05-21%20081858.png)

3. Sélection du/des clé(s)

   ![](./assets/Capture%20d’écran%202026-05-21%20082008.png)

</details>

## 🧩 2. CREATION DE L'ASSOCIATION

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

### 🍧 DEFINITION DES CLES COMMUNES

#### 🌺 Principal Entity

    IdSession

#### 🌺 Dependant Entity

    IdSession

<details>
  <summary>Rappel</summary>

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

#### 🌺 OT :

    <TRI> - FIORI MODULE

#### 🌺 Package :

    Z<TRI>_FIORI_MODULE

<details>
  <summary>Rappel</summary>

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
