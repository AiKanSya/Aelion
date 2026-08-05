# 🌸 EXERCICES — MESSAGES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MESSAGES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 04 - BASIC INSTRUCTIONS/02 - 🍧 MESSAGE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- utiliser l’instruction `MESSAGE` ;
- distinguer le type réel du message de son apparence ;
- utiliser un texte littéral ;
- utiliser un symbole de texte ;
- créer une classe de messages en `SE91` ;
- appeler un message avec une valeur dynamique ;
- éviter un message bloquant lorsqu’il n’est pas nécessaire.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 POINT DE VIGILANCE

Le comportement d’un message dépend de son type et du contexte d’exécution.

`DISPLAY LIKE` modifie l’apparence du message. Il ne transforme pas son comportement réel.

## 🌺 EXERCICE 1 — TYPES DE MESSAGES

Compléter le tableau :

| Type | Signification principale | Peut interrompre ou modifier le traitement |
| ---- | ------------------------ | ------------------------------------------ |
| `S`  |                          |                                            |
| `I`  |                          |                                            |
| `W`  |                          |                                            |
| `E`  |                          |                                            |

Répondre :

1. Quel type convient à une confirmation de réussite ?
2. Quel type convient à une information nécessitant une validation de l’utilisateur ?
3. Pourquoi le type `E` ne doit-il pas être utilisé pour une simple confirmation ?
4. Que change `DISPLAY LIKE 'E'` sur un message de type `S` ?

## 🌺 EXERCICE 2 — MESSAGE LITTÉRAL

Tester séparément les instructions suivantes :

```abap
MESSAGE 'Traitement terminé.' TYPE 'S'.
```

```abap
MESSAGE 'Contrôle effectué.' TYPE 'I'.
```

Pour chaque instruction, relever :

- l’emplacement d’affichage ;
- la nécessité éventuelle de valider le message ;
- la poursuite du programme.

## 🌺 EXERCICE 3 — SYMBOLE DE TEXTE

Créer le symbole de texte `001` :

```text
Traitement terminé.
```

Appeler ce texte avec :

```abap
MESSAGE text-001 TYPE 'S'.
```

Vérifier que le texte n’est plus écrit directement dans l’instruction.

## 🌺 EXERCICE 4 — CLASSE DE MESSAGES

Créer dans `SE91` la classe :

```text
ZAELION_<TRI>_MSG
```

Créer les messages suivants :

| Numéro | Texte                      |
| ------ | -------------------------- |
| `001`  | Traitement terminé pour &1 |
| `002`  | Valeur &1 invalide         |

Enregistrer la classe dans le package et l’ordre de transport de la formation.

Tester :

```abap
MESSAGE s001(zaelion_<tri>_msg) WITH sy-uname.
```

Puis :

```abap
MESSAGE s002(zaelion_<tri>_msg)
  WITH 'ABC'
  DISPLAY LIKE 'E'.
```

## 🌺 EXERCICE 5 — DIAGNOSTIC

Analyser :

```abap
MESSAGE e002(zaelion_<tri>_msg) WITH 'ABC'.
WRITE / 'Suite du traitement'.
```

Répondre :

1. Le texte situé après le `MESSAGE` est-il garanti d’être exécuté ?
2. Pourquoi ce message est-il excessif pour un simple avertissement visuel ?
3. Quelle variante conserve un comportement de succès tout en donnant une apparence d’erreur ?
4. Cette variante constitue-t-elle une véritable erreur bloquante ?

## 🌺 LIVRABLES

- tableau des types complété ;
- résultats des messages `S` et `I` ;
- symbole de texte `001` ;
- classe de messages active ;
- messages `001` et `002` ;
- correction du diagnostic.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le type du message correspond à l’intention.
- [ ] Le symbole de texte est utilisé.
- [ ] La classe de messages est active.
- [ ] Le paramètre `&1` est remplacé.
- [ ] `DISPLAY LIKE` est distingué du type réel.
- [ ] Aucun message bloquant inutile ne subsiste.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — types

| Type | Signification principale | Effet possible                          |
| ---- | ------------------------ | --------------------------------------- |
| `S`  | Statut ou succès         | Généralement non bloquant               |
| `I`  | Information              | Demande généralement une validation     |
| `W`  | Avertissement            | Dépend du contexte de dialogue          |
| `E`  | Erreur                   | Peut interrompre le déroulement courant |

`DISPLAY LIKE 'E'` donne une apparence d’erreur, mais le type réel reste `S`.

### Solution — appels

```abap
MESSAGE 'Traitement terminé.' TYPE 'S'.
```

```abap
MESSAGE text-001 TYPE 'S'.
```

```abap
MESSAGE s001(zaelion_<tri>_msg) WITH sy-uname.
```

```abap
MESSAGE s002(zaelion_<tri>_msg)
  WITH 'ABC'
  DISPLAY LIKE 'E'.
```

### Solution — diagnostic

La variante suivante affiche visuellement une erreur tout en conservant le type réel `S` :

```abap
MESSAGE s002(zaelion_<tri>_msg)
  WITH 'ABC'
  DISPLAY LIKE 'E'.

WRITE / 'Suite du traitement'.
```

Cette instruction n’est pas une erreur bloquante. Son apparence ne doit pas être confondue avec sa logique d’exécution.

</details>
