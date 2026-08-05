# 🌸 EXERCICE 09 — BAPI ET CONTRAT TRANSACTIONNEL

## 🌺 OBJECTIFS

- distinguer appel métier et commit ;
- utiliser les BAPI transactionnelles ;
- analyser les messages `RETURN`;
- ne pas utiliser un commit brut sans contrat ;
- annuler un appel échoué.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 SCÉNARIO GÉNÉRIQUE

```abap
CALL FUNCTION 'BAPI_...'
  EXPORTING
    ...
  TABLES
    return = lt_return.
```

## 🌺 EXERCICE 1 — MESSAGES

Avant le commit, rechercher dans `lt_return` :

```text
TYPE = E
TYPE = A
TYPE = X
```

La règle exacte dépend de la BAPI.

## 🌺 EXERCICE 2 — SUCCÈS

Si aucun message bloquant :

```abap
CALL FUNCTION 'BAPI_TRANSACTION_COMMIT'
  EXPORTING
    wait = abap_true.
```

## 🌺 EXERCICE 3 — ÉCHEC

```abap
CALL FUNCTION 'BAPI_TRANSACTION_ROLLBACK'.
```

## 🌺 EXERCICE 4 — DIAGNOSTIC

Analyser :

```abap
CALL FUNCTION 'BAPI_...'.

COMMIT WORK.
```

Répondre :

1. pourquoi le commit brut peut-il être insuffisant ?
2. quel buffer BAPI peut devoir être synchronisé ?
3. quelle fonction standard utiliser ?
4. faut-il appeler le commit malgré un message d’erreur ?
5. faut-il connaître le contrat de la BAPI ?

## 🌺 EXERCICE 5 — PLUSIEURS BAPI

Scénario :

```text
BAPI A
BAPI B
Commit unique
```

Répondre :

1. les deux appels doivent-ils appartenir à la même transaction ?
2. faut-il vérifier les retours des deux ?
3. que faire si B échoue ?
4. un commit dans A empêcherait-il l’atomicité ?
5. qui doit décider ?

## 🌺 EXERCICE 6 — EXCEPTION HISTORIQUE

Certaines API peuvent posséder un modèle particulier explicitement documenté.

Règle :

```text
Ne jamais ajouter ou supprimer un commit uniquement par habitude.
Lire la documentation de l’API appelée.
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les retours BAPI sont analysés.
- [ ] Le commit est appelé uniquement après succès.
- [ ] Le rollback BAPI est utilisé après échec.
- [ ] `BAPI_TRANSACTION_COMMIT` est distinguée de `COMMIT WORK`.
- [ ] Plusieurs BAPI peuvent partager un commit final.
- [ ] Le contrat documenté reste prioritaire.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CALL FUNCTION 'BAPI_...'
  TABLES
    return = lt_return.

DATA(lv_has_error) = xsdbool(
  line_exists( lt_return[ type = 'E' ] )
  OR
  line_exists( lt_return[ type = 'A' ] )
  OR
  line_exists( lt_return[ type = 'X' ] )
).

IF lv_has_error = abap_true.

  CALL FUNCTION 'BAPI_TRANSACTION_ROLLBACK'.

ELSE.

  CALL FUNCTION 'BAPI_TRANSACTION_COMMIT'
    EXPORTING
      wait = abap_true.

ENDIF.
```

</details>
