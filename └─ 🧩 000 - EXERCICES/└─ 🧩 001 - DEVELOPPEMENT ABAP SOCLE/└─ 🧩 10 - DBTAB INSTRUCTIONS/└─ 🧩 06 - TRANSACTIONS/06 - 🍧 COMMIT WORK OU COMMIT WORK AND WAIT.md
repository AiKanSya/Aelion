# 🌸 EXERCICE 06 — COMMIT WORK OU COMMIT WORK AND WAIT

## 🌺 OBJECTIFS

- distinguer les deux formes ;
- comprendre l’Update Task synchrone ;
- interpréter `sy-subrc`;
- identifier ce qui n’est pas attendu ;
- choisir selon le besoin.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — COMPARAISON

Compléter :

| Critère                       | `COMMIT WORK` | `COMMIT WORK AND WAIT` |
| ----------------------------- | ------------- | ---------------------- |
| Termine la SAP LUW            |               |                        |
| Provoque un database commit   |               |                        |
| Déclenche l’Update Task       |               |                        |
| Attend les mises à jour V1    |               |                        |
| `sy-subrc` reflète l’échec V1 |               |                        |
| Attend les mises à jour V2    |               |                        |
| Attend un système externe     |               |                        |

## 🌺 EXERCICE 2 — OPEN SQL DIRECT

Le programme contient uniquement :

```text
INSERT direct
UPDATE direct
```

Répondre :

1. les écritures ont-elles déjà été exécutées avant le commit ?
2. le commit les rend-il permanentes ?
3. `AND WAIT` les exécute-t-il une deuxième fois ?
4. `sy-subrc = 0` prouve-t-il que les règles métier sont correctes ?
5. faut-il contrôler les instructions avant le commit ?

## 🌺 EXERCICE 3 — UPDATE TASK

Le programme enregistre :

```abap
CALL FUNCTION 'Z_<TRI>_SAVE'
  IN UPDATE TASK.
```

Comparer :

```text
COMMIT WORK
→ retour sans attendre la fin V1

COMMIT WORK AND WAIT
→ attente de la fin V1 et retour exploitable
```

## 🌺 EXERCICE 4 — V2

Répondre :

1. les mises à jour V2 sont-elles de priorité plus faible ?
2. `AND WAIT` garantit-il leur fin avant la reprise du programme ?
3. peut-on utiliser `AND WAIT` pour attendre tout traitement asynchrone ?
4. quelle documentation faut-il consulter pour l’API concernée ?

## 🌺 EXERCICE 5 — CHOIX

| Besoin                                               | Choix |
| ---------------------------------------------------- | ----- |
| Lancer l’Update Task sans attendre                   |       |
| Connaître immédiatement le résultat V1               |       |
| Valider des Open SQL directs dans un rapport de test |       |
| Attendre une interface distante                      |       |
| Attendre une tâche de fond                           |       |

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les deux formes terminent la SAP LUW.
- [ ] `AND WAIT` est relié aux mises à jour V1.
- [ ] `sy-subrc = 4` est identifié.
- [ ] V2 n’est pas promise comme terminée.
- [ ] Un système externe n’est pas assimilé à l’Update Task.
- [ ] Les Open SQL sont contrôlés avant le commit.

<details>
<summary>🍧 Afficher la solution</summary>

| Critère               | Commit | Commit and wait |
| --------------------- | ------ | --------------- |
| Fin SAP LUW           | Oui    | Oui             |
| Commit DB             | Oui    | Oui             |
| Déclenche Update Task | Oui    | Oui             |
| Attend V1             | Non    | Oui             |
| Retour V1 exploitable | Non    | Oui             |
| Attend V2             | Non    | Non garanti     |
| Attend externe        | Non    | Non             |

</details>
