# 🌸 EXERCICE 08 — COMMITS IMPLICITES

## 🌺 OBJECTIFS

- identifier le risque ;
- expliquer la différence avec un commit métier ;
- éviter les opérations incompatibles pendant la sauvegarde ;
- analyser un appel externe ;
- vérifier la documentation.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 SCÉNARIO

```text
Écriture provisoire A
Appel provoquant un commit implicite
Écriture B
Erreur
ROLLBACK
```

## 🌺 QUESTIONS

1. A peut-elle déjà être validée ?
2. le rollback final peut-il annuler A ?
3. l’unité métier reste-t-elle atomique ?
4. pourquoi le commit implicite est-il dangereux ?
5. faut-il supposer le comportement de chaque API ?

## 🌺 EXERCICE 1 — APPELS

Classer :

| Action                                            | Analyse obligatoire |
| ------------------------------------------------- | ------------------- |
| Méthode locale sans accès externe                 |                     |
| RFC vers un autre système                         |                     |
| Appel HTTP                                        |                     |
| Changement d’écran dans une application classique |                     |
| Simple calcul ABAP                                |                     |
| Framework de persistance                          |                     |

## 🌺 EXERCICE 2 — PHASES

Séparer :

```text
Phase de modification
→ collecte et validation des données

Phase de sauvegarde
→ écritures contrôlées sans opération provoquant un commit implicite
```

## 🌺 EXERCICE 3 — CAS INCORRECT

Analyser :

```abap
INSERT zt_<tri>_ord FROM @ls_order.

" Appel externe potentiellement transactionnel

UPDATE zt_<tri>_stat FROM @ls_status.
```

Répondre :

1. faut-il placer l’appel externe entre les écritures ?
2. peut-il être effectué avant la phase de sauvegarde ?
3. peut-il être effectué après le commit ?
4. que faire si l’appel externe fait partie de la transaction distribuée ?
5. une transaction locale de base suffit-elle alors ?

## 🌺 EXERCICE 4 — DOCUMENTATION

Pour toute API susceptible de changer de contexte, relever :

```text
Déclenche-t-elle un commit ?
Possède-t-elle son propre commit ?
Utilise-t-elle une Update Task ?
Possède-t-elle une méthode de rollback ?
Le framework interdit-il COMMIT WORK ?
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le risque d’un commit implicite est compris.
- [ ] Le rollback ne traverse pas le commit implicite.
- [ ] Les phases sont séparées.
- [ ] Les appels externes sont analysés.
- [ ] La documentation est exigée.
- [ ] Une transaction distribuée n’est pas réduite à une LUW locale.

<details>
<summary>🍧 Afficher la solution</summary>

Règle :

```text
Ne pas exécuter une opération susceptible de produire un commit implicite
entre les écritures qui doivent rester atomiques.
```

Lorsqu’un système externe participe à l’opération, il faut un contrat d’intégration adapté :

```text
idempotence
compensation
messagerie transactionnelle
orchestration
statuts de reprise
```

Une SAP LUW locale ne garantit pas l’atomicité d’un système distant.

</details>
