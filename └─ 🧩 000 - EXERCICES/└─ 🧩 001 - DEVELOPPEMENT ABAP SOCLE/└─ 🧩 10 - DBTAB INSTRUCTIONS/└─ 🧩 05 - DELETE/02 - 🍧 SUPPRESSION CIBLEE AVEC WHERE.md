# 🌸 EXERCICES — SUPPRESSION CIBLÉE AVEC WHERE

## 🌺 OBJECTIFS

- supprimer une ligne identifiée par une clé ;
- utiliser une variable hôte ;
- contrôler le résultat ;
- vérifier l’absence ;
- annuler la suppression ;
- prouver que les autres lignes sont intactes.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 DONNÉE DE TEST

```text
ORDER_ID      : 9300000001
CUSTOMER_NAME : Commande de test DELETE
STATUS        : N
AMOUNT        : 100,00 EUR
```

## 🌺 EXERCICE 1 — PRÉPARATION

Utiliser le bloc de préparation commun.

## 🌺 EXERCICE 2 — COMPTAGE AVANT

Lire :

```abap
SELECT COUNT( * )
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(lv_before_count).
```

Résultat attendu :

```text
1
```

## 🌺 EXERCICE 3 — SUPPRESSION

```abap
DELETE FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id.
```

Sauvegarder immédiatement :

```abap
DATA(lv_delete_subrc) = sy-subrc.
DATA(lv_delete_count) = sy-dbcnt.
```

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 1
```

## 🌺 EXERCICE 4 — RELECTURE

Vérifier :

```text
Commande absente après DELETE
```

## 🌺 EXERCICE 5 — NON-RÉGRESSION

Vérifier que les commandes fonctionnelles :

```text
0000000001
0000000002
0000000003
```

sont toujours présentes.

Ne pas les sélectionner avec un filtre trop large.

## 🌺 EXERCICE 6 — ROLLBACK

Exécuter :

```abap
ROLLBACK WORK.
```

Relire `9300000001`.

Résultat attendu :

```text
Commande absente après rollback : état initial restauré
```

L’insertion de préparation et la suppression appartenaient à la même LUW. Le rollback annule les deux opérations et rétablit l’état antérieur au test, dans lequel la commande n’existait pas.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La clé de test est préparée.
- [ ] Le comptage avant vaut `1`.
- [ ] La suppression utilise la clé.
- [ ] `sy-subrc` vaut `0`.
- [ ] `sy-dbcnt` vaut `1`.
- [ ] La ligne est absente avant rollback.
- [ ] Les commandes fonctionnelles restent présentes.
- [ ] La ligne reste absente après rollback, conformément à l’état initial.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CONSTANTS lc_order_id TYPE zde_<tri>_oid
  VALUE '9300000001'.

SELECT SINGLE order_id
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(lv_existing_order).

IF sy-subrc = 0.
  WRITE / 'Identifiant de test déjà présent'.
  RETURN.
ENDIF.

DATA(ls_seed_order) = VALUE zt_<tri>_ord(
  mandt         = sy-mandt
  order_id      = lc_order_id
  customer_name = 'Commande de test DELETE'
  priority      = '1'
  status        = 'N'
  currency      = 'EUR'
  amount        = '100.00'
  created_by    = sy-uname
  created_on    = sy-datum
).

INSERT zt_<tri>_ord FROM @ls_seed_order.

IF sy-subrc <> 0.
  WRITE / 'Préparation impossible'.
  ROLLBACK WORK.
  RETURN.
ENDIF.

DELETE FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id.

DATA(lv_delete_subrc) = sy-subrc.
DATA(lv_delete_count) = sy-dbcnt.

WRITE: / |sy-subrc : { lv_delete_subrc }|,
       / |sy-dbcnt : { lv_delete_count }|.

SELECT SINGLE order_id
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(lv_after_delete).

IF sy-subrc <> 0.
  WRITE / 'Commande absente après DELETE'.
ENDIF.

ROLLBACK WORK.

SELECT SINGLE order_id
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(lv_after_rollback).

IF sy-subrc <> 0.
  WRITE / 'Commande absente après rollback : état initial restauré'.
ENDIF.
```

</details>
