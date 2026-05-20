# 🌸 SDK

> 🌺 Objectifs
>
> - [ ] Comprendre ce qu'est le SDK dans SAPUI5 et pourquoi il est indispensable pour développer une application Fiori.

## 🧩 SOFTWARE DEVELOPMENT KIT

SDK signifie :

     Software Development Kit

En français :

     Kit de développement logiciel

Le SDK SAPUI5 est la documentation officielle qui contient tous les outils et informations nécessaires pour développer une application Fiori.

## 🧩 POURQUOI UTILISER SDK

Pendant le développement, un développeur doit souvent savoir :

- quel composant utiliser
- quelles propriétés existent
- quels événements sont disponibles
- comment écrire le code correctement
- voir des exemples fonctionnels

Le SDK répond à ces besoins.

Le SDK SAPUI5 contient :

- documentation des contrôles
- exemples de code
- API SAPUI5
- événements
- propriétés
- méthodes
- modèles d'application
- tutoriels

Schéma simplifié

     Développeur
          ↓
          SDK
          ↓
     Documentation
     Exemples
     API
     Composants

### 🍧 EXEMPLE CONCRET

Supposons qu'un développeur veut ajouter un bouton.

Question :

Comment fonctionne Button ?

Le SDK fournit :

Nom :

     Button

Propriétés :

     text
     icon
     enabled
     visible

Événements :

     press

Méthodes :

     setText()
     setEnabled()

### 🍧 EXEMPLE SAPUI5

Code XML :

```xml
<Button text="Valider" press="onValider"/>
```

Dans le SDK, il est possible de voir :

     Button
        ↓

     text
        ↓
     Texte affiché

     press
        ↓
     Événement déclenché au clic

### 🍧 EXEMPLE AVEC INPUT

Code :

```xml
<Input value="{/nom}" placeholder="Saisir nom"/>
```

Le SDK explique :

     value
        ↓
     Valeur du champ

     placeholder
        ↓
     Texte affiché avant saisie

     enabled
        ↓
     Active ou désactive le champ
