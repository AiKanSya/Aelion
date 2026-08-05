# 🌸 EXERCICES — CREATION DE PROGRAMME – SE38 / SE80

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- créer un programme exécutable ;
- l’enregistrer dans le package et la requête corrects ;
- saisir un code ABAP simple ;
- différencier enregistrement, contrôle de syntaxe, activation et exécution ;
- corriger une erreur de syntaxe élémentaire.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 PRÉREQUIS

- Exercices 01 et 02 terminés.
- Package `ZAELION_<TRI>_PACKAGE` disponible.

## 🌺 EXERCICE 1 — RESTITUTION

Associer chaque action à son résultat :

| Action               | Résultat |
| -------------------- | -------- |
| Enregistrer          |          |
| Contrôler la syntaxe |          |
| Activer              |          |
| Exécuter             |          |

Expliquer ensuite la différence entre :

- un programme exécutable ;
- un include ;
- un programme enregistré mais non activé.

## 🌺 EXERCICE 2 — CRÉATION DU PROGRAMME

Créer le programme suivant :

| Propriété | Valeur attendue                  |
| --------- | -------------------------------- |
| Nom       | `ZAELION_<TRI>_HELLOWORLD`       |
| Titre     | `<TRI> - REVISION BASIC`         |
| Type      | Programme exécutable             |
| Package   | `ZAELION_<TRI>_PACKAGE`          |
| Requête   | Requête créée dans l’exercice 01 |

Saisir le code suivant en remplaçant `<TRI>` dans le nom du programme :

```abap
REPORT zaelion_<tri>_helloworld.

WRITE: / 'Bonjour le monde !',
       / 'Programme :', sy-repid,
       / 'Utilisateur :', sy-uname.
```

### Étapes demandées

1. Créer le programme dans `SE38` ou `SE80`.
2. Sélectionner le type `Programme exécutable`.
3. L’enregistrer dans `ZAELION_<TRI>_PACKAGE`.
4. Sélectionner la requête de l’exercice 01.
5. Saisir le code.
6. Enregistrer.
7. Effectuer un contrôle de syntaxe.
8. Activer.
9. Exécuter avec `F8`.
10. Vérifier que les trois lignes sont affichées.
11. Retrouver le programme dans l’arborescence du package.
12. Retrouver l’objet dans la requête `SE10`.

## 🌺 EXERCICE 3 — ERREUR DE SYNTAXE

Créer volontairement l’erreur suivante dans une copie temporaire du code ou avant la correction finale :

```abap
WRITE: / 'Bonjour le monde !'
```

1. Lancer le contrôle de syntaxe.
2. Relever le message affiché.
3. Identifier le caractère manquant.
4. Corriger l’instruction.
5. Contrôler à nouveau la syntaxe.
6. Activer et exécuter le programme.

> [!IMPORTANT]
> La version remise doit être corrigée, active et exécutable.

## 🌺 RÉSULTAT ATTENDU

L’affichage doit contenir :

```text
Bonjour le monde !
Programme : ZAELION_<TRI>_HELLOWORLD
Utilisateur : <UTILISATEUR_SAP>
```

La mise en forme exacte peut varier selon SAP GUI. Les trois informations doivent être présentes.

## 🌺 LIVRABLES

- Code source actif.
- Résultat d’exécution.
- Message de l’erreur de syntaxe relevé.
- Explication de la correction.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le programme est de type exécutable.
- [ ] Il appartient au package demandé.
- [ ] Il est affecté à la bonne requête.
- [ ] Le contrôle de syntaxe ne retourne aucune erreur.
- [ ] Le programme est actif.
- [ ] Les trois informations attendues sont affichées.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — exercice 1

| Action               | Résultat                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| Enregistrer          | Sauvegarde la version modifiée dans le système.                           |
| Contrôler la syntaxe | Vérifie la validité syntaxique du code sans lancer son traitement métier. |
| Activer              | Rend la version enregistrée utilisable comme version active.              |
| Exécuter             | Lance le programme actif.                                                 |

- Un programme exécutable peut être lancé directement.
- Un include contient une partie de code intégrée dans un programme principal et n’est pas exécuté seul.
- Une version enregistrée mais non activée n’est pas la version active utilisée normalement lors de l’exécution.

### Solution — exercice 2

```abap
REPORT zaelion_<tri>_helloworld.

WRITE: / 'Bonjour le monde !',
       / 'Programme :', sy-repid,
       / 'Utilisateur :', sy-uname.
```

`<tri>` doit être remplacé dans le nom technique. Exemple pour le trigramme `ABC` :

```abap
REPORT zaelion_abc_helloworld.

WRITE: / 'Bonjour le monde !',
       / 'Programme :', sy-repid,
       / 'Utilisateur :', sy-uname.
```

### Solution — exercice 3

L’instruction est incomplète, car le point final est absent.

Code corrigé :

```abap
WRITE: / 'Bonjour le monde !'.
```

Après correction, le contrôle de syntaxe doit être valide et le programme doit pouvoir être activé.

</details>
