# 🌸 SDK

> 🌺 Objectifs
>
> - [ ] Comprendre :
>   - [ ] ce qu'est le SDK SAPUI5
>   - [ ] comment rechercher un contrôle
>   - [ ] comment lire la documentation
>   - [ ] comment trouver les événements, propriétés et agrégations
>   - [ ] comment utiliser les exemples fournis par SAP

## 🧩 QU'EST CE QUE LE SDK SAP UI5

Le SDK (Software Development Kit) est :

- la documentation officielle SAPUI5
- la référence de tous les contrôles
- un catalogue d'exemples
- un explorateur d'API

C'est l'outil principal du développeur Fiori.

## 🧩 ACCES AU SDK

Version publique :

[SAPUI5 SDK Demo Kit](https://ui5.sap.com/)

## 🧩 STRUCTURE DU SDK

### 🍧 1. Demo Kit

Permet :

     découvrir les contrôles
     consulter les tutoriels
     voir les exemples

Exemple :

     Button
     Table
     Dialog
     SmartTable
     SmartFilterBar

### 🍧 2. API Reference

Partie la plus utilisée.

Exemple :

     sap.m.Table

ou

     sap.m.Dialog

---

Pour chaque contrôle :

**Properties**

Exemple :

```xml
<Button
    text="Save"
    enabled="true"
/>
```

Documentation :

     text
     enabled
     visible
     width
     type

---

**Events**

Exemple :

```xml
<Button
    text="Save"
    press="onSave"
/>
```

Documentation :

     press
     tap

---

**Aggregations**

Exemple :

```xml
<Table>
    <columns>
    </columns>

    <items>
    </items>
</Table>
```

Documentation :

     columns
     items
     headerToolbar
     infoToolbar

Exemple : rechercher un contrôle

Supposons :

Je veux afficher une popup.

Recherche SDK :

Dialog

Résultat :

<Dialog
    title="Information">
</Dialog>

## 🧩 REFLEXE D'UN DEVELOPPEUR FIORI

Avant de coder :

     Identifier le contrôle recherché
     Ouvrir le SDK
     Lire les propriétés
     Lire les événements
     Regarder un Sample
     Adapter le code

C'est exactement la méthode utilisée sur les projets SAPUI5 réels.
