# 🌸 EXERCICES — ANATOMIE DE INSERT

## 🌺 OBJECTIFS

- préparer une structure complète ;
- insérer une ligne ;
- contrôler les champs système ;
- relire la ligne ;
- annuler le test ;
- vérifier l’absence après rollback.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 DONNÉE À INSÉRER

```text
ORDER_ID     : 9000000001
CUSTOMER_NAME: Test insertion simple
PRIORITY     : 2
STATUS       : N
CURRENCY     : EUR
AMOUNT       : 100,00
CREATED_BY   : utilisateur courant
CREATED_ON   : date courante
```

## 🌺 EXERCICE 1 — PRÉPARATION

Déclarer :

```abap
DATA ls_order TYPE zt_<tri>_ord.
```

Alimenter tous les champs.

Le champ `MANDT` doit être renseigné explicitement dans la structure pédagogique :

```abap
ls_order-mandt = sy-mandt.
```

## 🌺 EXERCICE 2 — INSERTION

Exécuter :

```abap
INSERT zt_<tri>_ord
  FROM @ls_order.
```

Sauvegarder immédiatement :

```abap
DATA(lv_insert_subrc) = sy-subrc.
DATA(lv_insert_count) = sy-dbcnt.
```

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 1
```

## 🌺 EXERCICE 3 — RELECTURE

Lire :

```abap
SELECT SINGLE order_id,
              customer_name,
              priority,
              status,
              amount,
              currency
  FROM zt_<tri>_ord
  WHERE order_id = @ls_order-order_id
  INTO @DATA(ls_inserted_order).
```

Comparer tous les champs utiles à la structure source.

## 🌺 EXERCICE 4 — ROLLBACK

Exécuter :

```abap
ROLLBACK WORK.
```

Relire la commande.

Résultat attendu :

```text
Commande absente après rollback
```

## 🌺 EXERCICE 5 — CAS STATUT ABSENT

Préparer :

```text
STATUS = X
```

Ne pas insérer la ligne.

Contrôler d’abord :

```abap
SELECT SINGLE status
  FROM zt_<tri>_stat
  WHERE status = @ls_order-status
  INTO @DATA(lv_status).
```

Résultat attendu :

```text
Statut X inconnu : insertion refusée
```

## 🌺 QUESTIONS

1. pourquoi la relecture est-elle réalisée avant le rollback ?
2. le rollback annule-t-il uniquement la dernière instruction ou toute la LUW non validée ?
3. `sy-subrc = 0` prouve-t-il que le statut respecte une règle métier ?
4. pourquoi renseigner `CREATED_BY` et `CREATED_ON` avant l’écriture ?
5. pourquoi les tests utilisent-ils un identifiant réservé ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La structure est complète.
- [ ] L’insertion retourne `0` et `1`.
- [ ] La ligne est relue.
- [ ] Les valeurs correspondent.
- [ ] Le rollback supprime le test.
- [ ] Le statut inconnu est refusé avant l’écriture.
- [ ] Les données fonctionnelles précédentes restent intactes.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA ls_order TYPE zt_<tri>_ord.

ls_order = VALUE #(
  mandt         = sy-mandt
  order_id      = '9000000001'
  customer_name = 'Test insertion simple'
  priority      = '2'
  status        = 'N'
  currency      = 'EUR'
  amount        = '100.00'
  created_by    = sy-uname
  created_on    = sy-datum
).

SELECT SINGLE status
  FROM zt_<tri>_stat
  WHERE status = @ls_order-status
  INTO @DATA(lv_status).

IF sy-subrc <> 0.
  WRITE / |Statut { ls_order-status } inconnu : insertion refusée|.
  RETURN.
ENDIF.

INSERT zt_<tri>_ord
  FROM @ls_order.

DATA(lv_insert_subrc) = sy-subrc.
DATA(lv_insert_count) = sy-dbcnt.

IF lv_insert_subrc = 0.
  WRITE: / 'Insertion réussie',
         / |sy-subrc : { lv_insert_subrc }|,
         / |sy-dbcnt : { lv_insert_count }|.
ELSE.
  WRITE / 'Insertion refusée'.
ENDIF.

SELECT SINGLE order_id,
              customer_name,
              priority,
              status,
              amount,
              currency
  FROM zt_<tri>_ord
  WHERE order_id = @ls_order-order_id
  INTO @DATA(ls_inserted_order).

IF sy-subrc = 0.
  WRITE: / ls_inserted_order-order_id,
         / ls_inserted_order-customer_name,
         / ls_inserted_order-priority,
         / ls_inserted_order-status,
         / ls_inserted_order-amount,
           ls_inserted_order-currency.
ENDIF.

ROLLBACK WORK.

SELECT SINGLE order_id
  FROM zt_<tri>_ord
  WHERE order_id = @ls_order-order_id
  INTO @DATA(lv_order_after_rollback).

IF sy-subrc <> 0.
  WRITE / 'Commande absente après rollback'.
ENDIF.
```

</details>
