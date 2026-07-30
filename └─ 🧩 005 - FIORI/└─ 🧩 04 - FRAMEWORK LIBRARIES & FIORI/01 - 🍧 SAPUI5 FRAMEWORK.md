# 🌸 SAP UI5 FRAMEWORK

> 🌺 Objectifs
>
> - [ ] Comprendre le concept de Framework SAPUI5

## 🧩 QU’EST-CE QU’UN FRAMEWORK

Un framework est un ensemble structuré de code, règles et outils qui impose une façon de développer une application.

Différence simple :

- Librairie : tu appelles des fonctions quand tu veux
- Framework : c’est lui qui pilote ton application et appelle ton code

## 🧩 IDÉE CLÉ : INVERSION DE CONTRÔLE

Sans framework :

     ton code contrôle tout

Avec framework :

     le framework contrôle le cycle de l’application
     ton code est "branché" dessus

## 🧩 IMAGE MENTALE SIMPLE

- Sans framework : moteur manuel
- Avec framework : voiture automatique
  - tu n’as pas tout à gérer
  - tu te connectes aux commandes existantes

## 🧩 SAPUI5 = FRAMEWORK FRONTEND

SAPUI5 est un framework JavaScript complet pour applications web SAP (Fiori).

Il fournit :

- architecture applicative
- composants UI
- binding de données
- routing
- cycle de vie
- gestion OData
- gestion responsive

## 🧩 CE QUE FOURNIT UI5 CONCRÈTEMENT

UI (interface)

     sap.m.Button
     sap.m.Input
     sap.m.Table
     sap.m.Page

Data binding (liaison données)

     {path}
     modèles JSON / OData

Architecture

     Controller
     View (XML)
     Component

Routing

     navigation entre pages

Services

     OData V2 / V4 integration

## 🧩 ROLE DU FRAMEWORK UI5

UI5 gère automatiquement :

     création des vues
     instanciation des controllers
     binding des données
     lifecycle (onInit, onExit)
     gestion mémoire
     navigation
     communication backend

## 🧩 CE QUI N'EST PLUS FAIT MANUELLEMENT

Sans UI5 :

     DOM manipulation
     AJAX bas niveau
     routing manuel
     gestion state UI complexe

Avec UI5 :

     tout est abstrait et standardisé

## 🧩 UI5 = FRAMEWORK “OPINIONATED”

Cela signifie :

     UI5 impose une structure stricte
     tu dois suivre ses conventions
     sinon l’application devient incohérente
