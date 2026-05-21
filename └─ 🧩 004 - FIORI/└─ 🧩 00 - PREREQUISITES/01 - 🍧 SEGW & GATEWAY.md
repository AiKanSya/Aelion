# 🌸 SEGW & ODATA

> 🌺 Objectifs
>
> - [ ] 0. Création d'un OT/Package
> - [ ] 1. Création du projet `SEGW`
> - [ ] 2. Créer les EntityTypes et les EntitySets dans le `SEGW` Project
> - [ ] 3. Générer le `SEGW` Project et Runtime Artefacts
> - [ ] 4. Créer le Service `ODATA` à partir du projet
> - [ ] 5. Redefine les Methods des Entities
> - [ ] 6. Tester les Redefined Methods

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

#### 🌺 SEGW Project :

    Z<TRI>_FIORI_DEMO

#### 🌺 Description :

    <TRI> - AELION FIORI DEMO - SEGW PROJECT

<details>
  <summary>Example</summary>

1. Transaction `SEGW` > `Créer projet`

   ![](./assets/Capture%20d’écran%202026-05-21%20075815.png)

2. Créer projet

   ![](./assets/Capture%20d’écran%202026-05-21%20075959.png)

   ![](./assets/Capture%20d’écran%202026-05-21%20080054.png)

3. `Import` > `DDIC structure`

</details>
