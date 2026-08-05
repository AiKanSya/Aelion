# 🌸 EXERCICES — CREATION DE PACKAGE – SE80 / SE21

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CREATION DE PACKAGE – SE80 / SE21](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 01 - BASIC/02 - 🍧 PACKAGE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- expliquer le rôle d’un package ;
- distinguer le package local `$TMP` d’un package transportable ;
- créer un package client ;
- rattacher ce package à la requête créée dans l’exercice 01 ;
- vérifier ses propriétés dans `SE80`.

## 🌺 DURÉE INDICATIVE

20 à 30 minutes.

## 🌺 PRÉREQUIS

- Exercice 01 terminé.
- Identifiant de la requête `Workbench` disponible.
- Autorisation de créer un package.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter le tableau :

| Type de package | Transportable | Usage principal | Exemple |
| --------------- | ------------- | --------------- | ------- |
| Local           |               |                 |         |
| Client          |               |                 |         |

Répondre ensuite aux questions suivantes :

1. À quoi sert un package dans le Repository ABAP ?
2. Pourquoi `$TMP` ne convient-il pas aux objets destinés à être transportés ?
3. Quel lien existe entre package et ordre de transport ?

## 🌺 EXERCICE 2 — CRÉATION DU PACKAGE

Créer le package suivant :

| Propriété   | Valeur attendue                  |
| ----------- | -------------------------------- |
| Nom         | `ZAELION_<TRI>_PACKAGE`          |
| Description | `<TRI> - PACKAGE REVISION BASIC` |
| Type        | Package transportable            |
| Requête     | Requête créée dans l’exercice 01 |

### Étapes demandées

1. Ouvrir `SE80`.
2. Sélectionner le type d’objet `Package`.
3. Saisir `ZAELION_<TRI>_PACKAGE`.
4. Créer le package.
5. Renseigner la description demandée.
6. Compléter uniquement les champs obligatoires définis dans le système de formation.
7. Enregistrer le package dans la requête de l’exercice 01.
8. Actualiser l’arborescence `SE80`.
9. Vérifier que le package existe et qu’il n’est pas rattaché à `$TMP`.
10. Rechercher le package dans la liste des objets de la requête `SE10`.

> [!CAUTION]
> Ne pas sélectionner `$TMP`. Un objet placé dans `$TMP` est local et n’est pas intégré au processus normal de transport.

## 🌺 EXERCICE 3 — CONTRÔLE ET DIAGNOSTIC

Comparer les deux cas suivants :

| Cas | Package                 | Requête demandée         | Résultat attendu    |
| --- | ----------------------- | ------------------------ | ------------------- |
| A   | `ZAELION_<TRI>_PACKAGE` | Requête de l’exercice 01 | Objet transportable |
| B   | `$TMP`                  | Aucune                   | Objet local         |

Produire une explication de quatre à six lignes répondant aux points suivants :

- différence de finalité entre A et B ;
- conséquence sur le transport ;
- choix adapté pour les exercices suivants ;
- erreur à éviter lors de la création d’un programme.

## 🌺 LIVRABLES

- Nom du package.
- Description du package.
- Identifiant de la requête utilisée.
- Capture ou relevé de l’arborescence `SE80`.
- Explication du cas A et du cas B.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le package respecte la convention de nommage.
- [ ] Le package est transportable.
- [ ] Le package est enregistré dans la bonne requête.
- [ ] Le package est visible dans `SE80`.
- [ ] La différence entre `$TMP` et un package transportable est comprise.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Type de package | Transportable                              | Usage principal                                     | Exemple                 |
| --------------- | ------------------------------------------ | --------------------------------------------------- | ----------------------- |
| Local           | Non, dans le processus normal de transport | Essais strictement locaux                           | `$TMP`                  |
| Client          | Oui, lorsqu’il est associé à une requête   | Développements destinés à suivre le paysage système | `ZAELION_<TRI>_PACKAGE` |

1. Un package classe et regroupe les objets du Repository ABAP selon un périmètre cohérent.
2. `$TMP` désigne un package local. Les objets qui y sont enregistrés ne sont pas affectés à une requête de transport lors de leur création.
3. Lorsqu’un package transportable est créé ou modifié, son enregistrement est affecté à une requête. Les objets créés ensuite dans ce package peuvent également être enregistrés dans une requête cohérente.

### Solution — exercice 2

Résultat attendu :

```text
Package : ZAELION_<TRI>_PACKAGE
Description : <TRI> - PACKAGE REVISION BASIC
Affectation : requête Workbench de l’exercice 01
Statut : créé et visible dans SE80
```

Les champs techniques complémentaires peuvent varier selon la configuration du système. Seules les valeurs imposées dans l’énoncé doivent être identiques.

### Solution — exercice 3

Le cas A correspond à un développement transportable : le package est un objet client et son enregistrement est rattaché à une requête `Workbench`. Le cas B correspond à un essai local dans `$TMP`, sans affectation initiale à une requête. Les exercices suivants doivent utiliser le cas A. Lors de la création du programme, il faut sélectionner `ZAELION_<TRI>_PACKAGE` et non `$TMP`.

</details>
