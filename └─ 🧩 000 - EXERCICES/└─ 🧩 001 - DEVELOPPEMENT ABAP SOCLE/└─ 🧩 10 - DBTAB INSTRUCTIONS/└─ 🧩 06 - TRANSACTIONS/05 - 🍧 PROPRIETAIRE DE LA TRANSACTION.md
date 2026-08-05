# 🌸 EXERCICE 05 — PROPRIÉTAIRE DE LA TRANSACTION

## 🌺 OBJECTIFS

- placer la décision au bon niveau ;
- retirer un commit d’une méthode basse ;
- rendre une méthode réutilisable ;
- orchestrer plusieurs écritures ;
- préserver l’atomicité.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 CAS INCORRECT

```abap
METHOD insert_status.

  INSERT zt_<tri>_stat
    FROM @is_status.

  COMMIT WORK.

ENDMETHOD.
```

L’orchestrateur appelle ensuite :

```text
insert_status
insert_orders
```

La deuxième étape échoue.

## 🌺 EXERCICE 1 — DIAGNOSTIC

Décrire :

- symptôme ;
- cause ;
- donnée persistante ;
- opération impossible à annuler ;
- correction.

## 🌺 EXERCICE 2 — MÉTHODE BASSE

La méthode doit :

```text
effectuer l’écriture ;
retourner le résultat ;
ne pas committer ;
ne pas décider du rollback global.
```

## 🌺 EXERCICE 3 — ORCHESTRATEUR

Pseudo-code attendu :

```abap
insert_status( ).
insert_orders( ).

IF all_steps_are_successful = abap_true.
  COMMIT WORK AND WAIT.
ELSE.
  ROLLBACK WORK.
ENDIF.
```

## 🌺 EXERCICE 4 — EXCEPTIONS

Si une méthode lève une exception :

1. l’orchestrateur intercepte l’exception ;
2. il annule la SAP LUW ;
3. il produit un message adapté ;
4. il ne poursuit pas les écritures dépendantes.

## 🌺 EXERCICE 5 — CAS PARTICULIERS

Classer :

| Composant                       | Décision transactionnelle |
| ------------------------------- | ------------------------- |
| Méthode de formatage            | Aucune                    |
| DAO d’insertion                 | Aucune                    |
| Service d’orchestration complet | Selon contrat             |
| BAPI standard                   | Selon documentation       |
| Framework RAP                   | Runtime RAP               |
| Rapport autonome                | Rapport                   |

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le commit est retiré de la méthode basse.
- [ ] Le résultat est remonté.
- [ ] L’orchestrateur connaît les deux écritures.
- [ ] Une exception annule l’ensemble.
- [ ] La méthode reste réutilisable.
- [ ] Les frameworks propriétaires sont respectés.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
METHOD insert_status.

  INSERT zt_<tri>_stat
    FROM @is_status.

  IF sy-subrc <> 0.
    RAISE EXCEPTION TYPE zcx_<tri>_transaction
      EXPORTING
        textid = zcx_<tri>_transaction=>status_insert_failed.
  ENDIF.

ENDMETHOD.
```

Orchestrateur :

```abap
TRY.

    lo_service->insert_status(
      is_status = ls_status
    ).

    lo_service->insert_orders(
      it_orders = lt_orders
    ).

    COMMIT WORK AND WAIT.

    IF sy-subrc <> 0.
      RAISE EXCEPTION TYPE zcx_<tri>_transaction.
    ENDIF.

  CATCH zcx_<tri>_transaction INTO DATA(lx_transaction).

    ROLLBACK WORK.
    WRITE / lx_transaction->get_text( ).

ENDTRY.
```

</details>
