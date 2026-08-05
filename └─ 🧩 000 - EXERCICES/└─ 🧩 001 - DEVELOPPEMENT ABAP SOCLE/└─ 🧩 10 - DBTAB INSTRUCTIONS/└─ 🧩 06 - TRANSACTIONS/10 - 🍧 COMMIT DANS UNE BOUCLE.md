# 🌸 EXERCICE 10 — COMMIT DANS UNE BOUCLE

## 🌺 OBJECTIFS

- identifier la fragmentation transactionnelle ;
- comprendre l’impossibilité d’un rollback global ;
- analyser la performance ;
- construire une transaction complète ;
- distinguer traitement atomique et traitement par lots.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 CAS INCORRECT

```abap
LOOP AT lt_orders INTO DATA(ls_order).

  INSERT zt_<tri>_ord
    FROM @ls_order.

  IF sy-subrc = 0.
    COMMIT WORK.
  ELSE.
    ROLLBACK WORK.
  ENDIF.

ENDLOOP.
```

## 🌺 QUESTIONS

1. combien de SAP LUWs sont créées ?
2. une erreur sur la dixième ligne annule-t-elle les neuf premières ?
3. le traitement est-il atomique ?
4. quel impact sur les commits et les verrous existe ?
5. pourquoi le message final peut-il être trompeur ?

## 🌺 EXERCICE 1 — LOT ATOMIQUE

```text
Contrôler tout le lot
Insérer en masse
Contrôler le nombre
Commit unique
```

## 🌺 EXERCICE 2 — TRAITEMENT PAR PAQUETS

Un volume très important peut nécessiter des paquets.

Répondre :

1. chaque paquet constitue-t-il une transaction distincte ?
2. un rollback du paquet 10 annule-t-il les paquets 1 à 9 ?
3. le métier accepte-t-il un résultat partiel ?
4. faut-il conserver un statut de reprise ?
5. faut-il rendre le traitement idempotent ?

## 🌺 EXERCICE 3 — CHOIX

| Besoin                                      | Stratégie                  |
| ------------------------------------------- | -------------------------- |
| Dix lignes devant réussir ensemble          | Commit final unique        |
| Millions de lignes avec reprise             | Paquets contrôlés          |
| Paiement et écriture comptable indivisibles | Transaction atomique       |
| Import tolérant les rejets                  | Résultat partiel documenté |

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le commit dans la boucle est refusé pour un lot atomique.
- [ ] Les écritures déjà validées ne sont pas annulables.
- [ ] La stratégie de masse est proposée.
- [ ] Les paquets sont reconnus comme transactions séparées.
- [ ] La reprise et l’idempotence sont identifiées.
- [ ] La règle métier guide le découpage.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
IF lt_orders IS INITIAL.
  WRITE / 'Aucune commande'.
  RETURN.
ENDIF.

INSERT zt_<tri>_ord
  FROM TABLE @lt_orders.

IF sy-subrc = 0
   AND sy-dbcnt = lines( lt_orders ).

  COMMIT WORK AND WAIT.

ELSE.

  ROLLBACK WORK.

ENDIF.
```

</details>
