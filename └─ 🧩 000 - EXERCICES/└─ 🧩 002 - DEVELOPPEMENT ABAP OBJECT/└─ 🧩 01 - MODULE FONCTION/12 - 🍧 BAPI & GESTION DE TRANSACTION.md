# 🌸 EXERCICES — BAPI ET GESTION DE TRANSACTION

## 🌺 OBJECTIFS

- définir une BAPI ;
- la distinguer d’un RFC personnalisé ;
- analyser `BAPIRET2` ;
- utiliser commit et rollback BAPI ;
- comprendre `DATA` et `DATAX`.

## 🌺 DURÉE INDICATIVE

70 à 90 minutes.

## 🌺 EXERCICE 1 — DÉFINITIONS

| Objet                     | Définition |
| ------------------------- | ---------- |
| Module normal             |            |
| Module RFC                |            |
| BAPI                      |            |
| `BAPI_TRANSACTION_COMMIT` |            |

## 🌺 EXERCICE 2 — MESSAGES

Construire une table :

```abap
DATA lt_return TYPE STANDARD TABLE OF bapiret2
  WITH EMPTY KEY.
```

Ajouter :

```text
S
W
E
```

## 🌺 EXERCICE 3 — TYPES BLOQUANTS

```abap
DATA(lv_has_error) =
  xsdbool(
    line_exists( lt_return[ type = 'A' ] )
    OR line_exists( lt_return[ type = 'E' ] )
    OR line_exists( lt_return[ type = 'X' ] )
  ).
```

## 🌺 EXERCICE 4 — TRANSACTION

```abap
IF lv_has_error = abap_true.

  CALL FUNCTION 'BAPI_TRANSACTION_ROLLBACK'.

ELSE.

  CALL FUNCTION 'BAPI_TRANSACTION_COMMIT'
    EXPORTING
      wait = abap_true.

ENDIF.
```

## 🌺 EXERCICE 5 — DATA ET DATAX

Expliquer :

```text
CITY initial, CITYX initial
→ champ non sélectionné pour modification

CITY initial, CITYX = X
→ effacement explicite du champ
```

## 🌺 EXERCICE 6 — DEUX BAPI

Appeler deux BAPI d’écriture.

Ne committer qu’après le succès des deux.

## 🌺 DIAGNOSTIC

Cas incorrect :

```abap
CALL FUNCTION 'BAPI_...'.
COMMIT WORK.
```

Identifier :

- messages non contrôlés ;
- buffer BAPI éventuel ;
- contrat non respecté ;
- risque de commit malgré erreur.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Une BAPI n’est pas réduite à un RFC.
- [ ] Les types `AEX` sont détectés.
- [ ] Le commit est conditionné.
- [ ] Le rollback est utilisé.
- [ ] `DATA` et `DATAX` sont distinguées.
- [ ] Le contrat documenté est prioritaire.

<details>
<summary>🍧 Afficher la solution</summary>

```text
Appeler la BAPI
Analyser tous les retours
Si erreur bloquante → BAPI_TRANSACTION_ROLLBACK
Sinon → BAPI_TRANSACTION_COMMIT
```

</details>
