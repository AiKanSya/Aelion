# 🌸 EXERCICES — MODULES FONCTION DE MISE A JOUR

## 🌺 OBJECTIFS

- créer une table de journal ;
- créer un module V1 ;
- comprendre `IN UPDATE TASK` ;
- tester commit et rollback ;
- connaître les restrictions ;
- utiliser Update Debugging et `SM13`.

## 🌺 DURÉE INDICATIVE

90 à 120 minutes.

## 🌺 TABLE DE TEST

Créer :

```text
ZT_<TRI>_FMLOG
```

| Champ        | Type      | Clé |
| ------------ | --------- | --- |
| `MANDT`      | `MANDT`   | Oui |
| `LOG_ID`     | `NUMC10`  | Oui |
| `LOG_TEXT`   | `CHAR80`  | Non |
| `CREATED_BY` | `SYUNAME` | Non |
| `CREATED_ON` | `SYDATUM` | Non |
| `CREATED_AT` | `SYUZEIT` | Non |

## 🌺 MODULE

```text
Z_<TRI>_LOG_WRITE_UPD
```

Type :

```text
Update with immediate start
```

Interface :

```text
IS_LOG TYPE ZT_<TRI>_FMLOG
```

Aucun export, changing ou exception.

## 🌺 IMPLÉMENTATION

```abap
INSERT zt_<tri>_fmlog
  FROM @is_log.
```

## 🌺 EXERCICE 1 — ENREGISTREMENT

```abap
CALL FUNCTION 'Z_<TRI>_LOG_WRITE_UPD'
  IN UPDATE TASK
  EXPORTING
    is_log = ls_log.
```

Avant commit, le module n’est pas encore exécuté par l’Update Task.

## 🌺 EXERCICE 2 — COMMIT

```abap
COMMIT WORK AND WAIT.
```

Vérifier la ligne, puis la nettoyer dans une transaction séparée.

## 🌺 EXERCICE 3 — ROLLBACK

Enregistrer un autre appel puis :

```abap
ROLLBACK WORK.
```

Vérifier l’absence de la ligne.

## 🌺 EXERCICE 4 — INTERDICTIONS

Le module ne doit pas contenir :

```text
COMMIT WORK
ROLLBACK WORK
MESSAGE
paramètre d’export
exception de retour
```

## 🌺 EXERCICE 5 — UPDATE DEBUGGING

Activer le débogage Update Task avant le commit.

## 🌺 EXERCICE 6 — SM13

Avec les autorisations nécessaires, analyser une demande de mise à jour.

Ne pas la répéter ou la supprimer sans accord d’exploitation.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table est créée.
- [ ] Le module est marqué Update.
- [ ] L’interface est compatible.
- [ ] Le commit déclenche l’exécution.
- [ ] Le rollback abandonne l’appel.
- [ ] Aucun commit interne n’existe.
- [ ] Le débogage est compris.
- [ ] Les données sont nettoyées.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA(ls_log) = VALUE zt_<tri>_fmlog(
  mandt      = sy-mandt
  log_id     = '0000000001'
  log_text   = 'Test Update Task'
  created_by = sy-uname
  created_on = sy-datum
  created_at = sy-uzeit
).

CALL FUNCTION 'Z_<TRI>_LOG_WRITE_UPD'
  IN UPDATE TASK
  EXPORTING
    is_log = ls_log.

COMMIT WORK AND WAIT.

IF sy-subrc = 0.
  WRITE / 'Mise à jour V1 exécutée'.
ELSE.
  WRITE / 'Échec de la mise à jour V1'.
ENDIF.
```

</details>
