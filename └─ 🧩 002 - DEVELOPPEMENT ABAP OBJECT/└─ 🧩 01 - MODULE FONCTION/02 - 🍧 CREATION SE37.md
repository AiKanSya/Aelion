# 🌸 CREATION DANS SE37

## 🌺 OBJECTIFS

- [ ] Créer un groupe de fonctions
- [ ] Créer un module fonction
- [ ] Identifier les principaux onglets de `SE37`
- [ ] Activer et documenter l’objet

## 🌺 TRANSACTION SE37

> La transaction `SE37`, appelée Function Builder, permet de créer, afficher, modifier, tester et documenter les modules fonction.

## 🌺 ETAPE 1 — CREER LE GROUPE DE FONCTIONS

Le groupe peut être créé depuis `SE80` ou par navigation lors de la création du module fonction.

Exemple :

    Nom        : ZFG_AELION_CALCULATION
    Description: Fonctions de calcul AELION
    Package    : ZAELION_TRAINING

> [!IMPORTANT]
> Le groupe de fonctions est transportable. Il doit être affecté au package et à l’ordre de transport attendus.

## 🌺 ETAPE 2 — CREER LE MODULE FONCTION

Dans `SE37` :

1. saisir `Z_AELION_CALCULATE_TOTAL` ;
2. choisir **Créer** ;
3. renseigner une description ;
4. affecter le groupe `ZFG_AELION_CALCULATION` ;
5. enregistrer.

Exemple :

    Nom        : Z_AELION_CALCULATE_TOTAL
    Description: Calculer le montant total
    Groupe     : ZFG_AELION_CALCULATION

## 🌺 ONGLETS PRINCIPAUX

| 🍧 Onglet     | 🍧 Rôle                                   |
| ------------- | ----------------------------------------- |
| Propriétés    | Type de traitement, groupe, statut        |
| Import        | Paramètres reçus par le module            |
| Export        | Paramètres retournés par le module        |
| Changing      | Paramètres reçus puis modifiés            |
| Tables        | Paramètres de table hérités               |
| Exceptions    | Exceptions classiques déclarées           |
| Source code   | Code ABAP du traitement                   |
| Documentation | Description du module et de son interface |

## 🌺 TYPE DE TRAITEMENT

Les principaux types rencontrés sont :

| 🍧 Type               | 🍧 Utilisation               |
| --------------------- | ---------------------------- |
| Normal                | Appel local classique        |
| Remote-Enabled Module | Appel RFC possible           |
| Update Module         | Exécution dans l’Update Task |

> [!WARNING]
> Le type de traitement ne doit pas être choisi par commodité. RFC et Update Task imposent des règles supplémentaires d’interface et d’exécution.

## 🌺 ACTIVATION

Pour qu’un module fonction soit utilisable :

1. enregistrer l’interface ;
2. implémenter le code ;
3. vérifier la syntaxe ;
4. activer le module fonction ;
5. activer les objets dépendants si SAP le demande.

## 🌺 DOCUMENTATION

La documentation doit au minimum préciser :

- la finalité du module ;
- la signification de chaque paramètre ;
- les unités et formats attendus ;
- les exceptions possibles ;
- les effets de bord éventuels ;
- le comportement transactionnel si des données sont modifiées.

## 🌺 EXEMPLE DE DESCRIPTION

> Calcule le montant total à partir d’une quantité et d’un prix unitaire. La quantité doit être strictement positive. Le résultat est retourné dans `EV_TOTAL`. L’exception `INVALID_QUANTITY` est levée lorsque la quantité est inférieure ou égale à zéro.

## 🌺 BONNES PRATIQUES

- Utiliser une convention de nommage homogène.
- Renseigner une description fonctionnelle, pas seulement technique.
- Ne pas activer RFC ou Update Task sans besoin explicite.
- Activer l’ensemble du groupe après une modification structurelle.
- Tester le module avant de modifier un programme appelant.

## 🌺 EXERCICES

1. Créer le groupe `ZFG_AELION_TEXT`.
2. Créer le module `Z_AELION_TEXT_NORMALIZE`.
3. Ajouter une description claire.
4. Identifier les onglets nécessaires pour une entrée, une sortie et une exception.
5. Activer le module sans encore écrire son traitement.

## 🌺 RESUME

> - `SE37` gère les modules fonction.
> - Un groupe de fonctions est obligatoire.
> - L’interface est définie dans des onglets distincts.
> - Le type de traitement détermine le mode d’exécution.
> - La documentation et l’activation font partie de la création.

## 🌺 SOURCES OFFICIELLES

- SAP Help Portal — Creating a Function Module : https://help.sap.com/docs/ABAP_PLATFORM_NEW/bd833c8355f34e96a6e83096b38bf192/d1801f02454211d189710000e8322d00.html
- SAP Help Portal — Creating New Function Modules : https://help.sap.com/docs/ABAP_PLATFORM_NEW/bd833c8355f34e96a6e83096b38bf192/d1801ee8454211d189710000e8322d00.html
