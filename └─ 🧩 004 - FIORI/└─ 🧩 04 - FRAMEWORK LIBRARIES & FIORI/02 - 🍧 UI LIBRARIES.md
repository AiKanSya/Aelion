# 🌸 UI5 LIBRARIES

> 🌺 Objectifs
>
> - [ ] Comprendre le concept de Library UI5

## 🧩 QU’EST-CE QU’UNE LIBRARY (LIBRAIRIE)

Une library est un ensemble de fonctions réutilisables que ton code appelle directement.

Définition simple :

     Library = outil
     toi = tu contrôles quand tu l’utilises

## 🧩 IMAGE MENTALE SIMPLE

- Library = boîte à outils
- Framework = machine organisée qui utilise tes outils

## 🧩 SAPUI5 CONTIENT DES LIBRARIES

SAPUI5 est composé de plusieurs libraries UI :

Exemples :

     sap.m → UI mobile (boutons, tables, inputs)
     sap.ui.core → base framework UI5
     sap.ui.layout → layouts
     sap.ui.unified → composants avancés

## 🧩 UNE LIBRARY NE PILOTE PAS L’APPLICATION

Une library :

ne démarre pas ton app
ne gère pas le cycle de vie
ne structure pas ton projet

Elle fait juste des opérations ponctuelles.

## 🧩 SAPUI5 : FRAMEWORK + LIBRARIES

SAPUI5 est un framework construit sur des libraries.

Structure :
Framework UI5 → orchestration (cycle de vie, MVC)
Libraries UI5 → composants réutilisables

## 🧩 ROLE DES LIBRARIES UI5

Elles fournissent :

     composants UI (Button, Input)
     utilitaires (MessageToast, Formatter)
     modèles (JSONModel)
     helpers (ValueState, BusyIndicator)

## 🧩 POINT IMPORTANT

Une library :

     ne décide pas quand elle est exécutée
     ne gère pas le flux global
     est appelée explicitement
