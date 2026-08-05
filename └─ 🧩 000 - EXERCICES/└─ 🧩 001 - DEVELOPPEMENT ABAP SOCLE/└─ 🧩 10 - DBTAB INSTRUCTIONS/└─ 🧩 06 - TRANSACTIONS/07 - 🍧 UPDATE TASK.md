# 🌸 EXERCICE 07 — UPDATE TASK

## 🌺 OBJECTIFS

- expliquer l’enregistrement différé ;
- distinguer appel et exécution ;
- comprendre le rôle du commit ;
- comprendre le rôle du rollback ;
- identifier les restrictions ;
- connaître le diagnostic avec `SM13`.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 EXERCICE 1 — CHRONOLOGIE

Remettre dans l’ordre :

```text
Enregistrement de l’appel
Exécution du module de mise à jour
COMMIT WORK
Écriture dans la table
Suite du programme
```

Distinguer les variantes synchrones et asynchrones.

## 🌺 EXERCICE 2 — ROLLBACK AVANT COMMIT

Pseudo-code :

```abap
CALL FUNCTION 'Z_<TRI>_SAVE'
  IN UPDATE TASK.

ROLLBACK WORK.
```

Répondre :

1. le module est-il exécuté ?
2. l’enregistrement est-il conservé ?
3. une ligne doit-elle apparaître ?
4. la SAP LUW est-elle terminée ?
5. une nouvelle SAP LUW commence-t-elle ?

## 🌺 EXERCICE 3 — COMMIT

```abap
CALL FUNCTION 'Z_<TRI>_SAVE'
  IN UPDATE TASK.

COMMIT WORK AND WAIT.
```

Répondre :

1. quand le module est-il exécuté ?
2. dans quel type de work process en mode non local ?
3. pourquoi utiliser `AND WAIT` dans un test dépendant du résultat ?
4. que signifie `sy-subrc = 4` ?
5. faut-il continuer comme si l’écriture avait réussi ?

## 🌺 EXERCICE 4 — INTERDICTIONS

Analyser :

```abap
FUNCTION z_<tri>_save.
  INSERT ...
  COMMIT WORK.
ENDFUNCTION.
```

Répondre :

1. le module Update Task doit-il committer ?
2. quelle erreur d’exécution est possible ?
3. qui contrôle le commit ?
4. `ROLLBACK WORK` est-il autorisé dans le module ?
5. comment signaler un échec ?

## 🌺 EXERCICE 5 — DIAGNOSTIC

Si une mise à jour asynchrone échoue :

- l’Update Task effectue un rollback de sa LUW ;
- la demande peut être journalisée ;
- la transaction `SM13` permet l’analyse selon les autorisations ;
- la cause doit être corrigée avant toute répétition ;
- une mise à jour synchrone n’est pas nécessairement répétable dans `SM13`.

> [!CAUTION]
> Ne pas supprimer ou répéter une demande `SM13` sans autorisation d’exploitation.

## 🌺 EXERCICE 6 — LOCAL UPDATE

Expliquer :

```abap
SET UPDATE TASK LOCAL.
```

Répondre :

1. dans quel processus l’update s’exécute-t-elle ?
2. le traitement attend-il la fin ?
3. quand le commutateur est-il réinitialisé ?
4. faut-il l’ajouter à tous les programmes ?
5. quel avantage et quel inconvénient existent ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’appel est distingué de l’exécution.
- [ ] Le commit déclenche l’update.
- [ ] Le rollback supprime l’enregistrement.
- [ ] Le module ne contient pas de commit.
- [ ] Le résultat synchrone est traité.
- [ ] `SM13` est replacée dans son cadre.
- [ ] Local Update est expliquée.
- [ ] Aucun module de test défaillant n’est créé sur le système partagé.

<details>
<summary>🍧 Afficher la solution</summary>

Asynchrone :

```text
CALL FUNCTION IN UPDATE TASK
→ enregistrement

COMMIT WORK
→ déclenchement
→ programme appelant poursuit
→ exécution V1 par Update Work Process
```

Synchrone :

```text
CALL FUNCTION IN UPDATE TASK
→ enregistrement

COMMIT WORK AND WAIT
→ exécution V1
→ attente du résultat
→ sy-subrc 0 ou 4
```

Rollback :

```text
CALL FUNCTION IN UPDATE TASK
→ enregistrement

ROLLBACK WORK
→ suppression de l’enregistrement
→ aucune exécution
```

</details>
