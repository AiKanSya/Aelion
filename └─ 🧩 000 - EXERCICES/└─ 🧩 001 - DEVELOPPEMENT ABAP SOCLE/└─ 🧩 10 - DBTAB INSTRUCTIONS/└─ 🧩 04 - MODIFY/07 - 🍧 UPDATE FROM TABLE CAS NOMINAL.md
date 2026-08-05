# 🌸 EXERCICES — UPDATE FROM TABLE : CAS NOMINAL

## 🌺 OBJECTIFS

- préparer plusieurs lignes existantes ;
- lire les lignes dans une table interne ;
- modifier les lignes avec un field-symbol ;
- exécuter une mise à jour de masse ;
- vérifier que toutes les lignes ont été traitées ;
- relire et comparer ;
- annuler le test.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 DONNÉES INITIALES

| Commande     | Priorité | Statut |     Montant |
| ------------ | -------: | ------ | ----------: |
| `9100000030` |      `1` | `N`    | `30,00 EUR` |
| `9100000031` |      `1` | `N`    | `31,00 EUR` |
| `9100000032` |      `2` | `P`    | `32,00 EUR` |

## 🌺 MODIFICATIONS

| Commande     | Nouvelle priorité | Nouveau statut | Nouveau montant |
| ------------ | ----------------: | -------------- | --------------: |
| `9100000030` |               `2` | `P`            |        `130,00` |
| `9100000031` |               `2` | `P`            |        `131,00` |
| `9100000032` |               `3` | `C`            |        `132,00` |

## 🌺 EXERCICE 1 — PRÉPARATION

Insérer les trois lignes en une instruction dans la même LUW.

Vérifier au préalable qu’aucun identifiant de la plage n’existe.

## 🌺 EXERCICE 2 — LECTURE

Lire les trois lignes complètes :

```abap
SELECT *
  FROM zt_<tri>_ord
  WHERE order_id BETWEEN '9100000030'
                     AND '9100000032'
  ORDER BY order_id
  INTO TABLE @DATA(lt_orders).
```

Résultat attendu :

```text
3 lignes
```

## 🌺 EXERCICE 3 — MODIFICATION

Parcourir avec :

```abap
LOOP AT lt_orders
  ASSIGNING FIELD-SYMBOL(<lfs_order>).
```

Déterminer les nouvelles valeurs avec `CASE`.

## 🌺 EXERCICE 4 — UPDATE DE MASSE

Exécuter :

```abap
UPDATE zt_<tri>_ord
  FROM TABLE @lt_orders.
```

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 3
```

Vérifier également :

```abap
sy-dbcnt = lines( lt_orders )
```

## 🌺 EXERCICE 5 — RELECTURE

Relire les trois lignes et comparer les valeurs attendues.

## 🌺 EXERCICE 6 — ROLLBACK

Annuler les trois lignes.

## 🌺 QUESTIONS

1. pourquoi les lignes complètes sont-elles lues ?
2. les champs non modifiés sont-ils présents dans `lt_orders` ?
3. pourquoi utiliser un field-symbol ?
4. l’update exécute-t-il nécessairement trois instructions ABAP SQL écrites dans le programme ?
5. quel contrôle prouve que toutes les lignes sources ont été utilisées ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Trois lignes sont préparées.
- [ ] Trois lignes complètes sont lues.
- [ ] Les valeurs sont modifiées par ligne.
- [ ] `sy-subrc` vaut `0`.
- [ ] `sy-dbcnt` vaut `3`.
- [ ] Le nombre correspond à la table source.
- [ ] Les valeurs sont relues.
- [ ] Le rollback supprime les tests.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lt_seed_orders TYPE STANDARD TABLE OF zt_<tri>_ord
  WITH EMPTY KEY.

lt_seed_orders = VALUE #(
  ( mandt = sy-mandt
    order_id = '9100000030'
    customer_name = 'Masse A'
    priority = '1'
    status = 'N'
    currency = 'EUR'
    amount = '30.00'
    created_by = sy-uname
    created_on = sy-datum )

  ( mandt = sy-mandt
    order_id = '9100000031'
    customer_name = 'Masse B'
    priority = '1'
    status = 'N'
    currency = 'EUR'
    amount = '31.00'
    created_by = sy-uname
    created_on = sy-datum )

  ( mandt = sy-mandt
    order_id = '9100000032'
    customer_name = 'Masse C'
    priority = '2'
    status = 'P'
    currency = 'EUR'
    amount = '32.00'
    created_by = sy-uname
    created_on = sy-datum )
).

INSERT zt_<tri>_ord
  FROM TABLE @lt_seed_orders.

IF sy-subrc <> 0.
  WRITE / 'Préparation du lot impossible'.
  ROLLBACK WORK.
  RETURN.
ENDIF.

SELECT *
  FROM zt_<tri>_ord
  WHERE order_id BETWEEN '9100000030'
                     AND '9100000032'
  ORDER BY order_id
  INTO TABLE @DATA(lt_orders).

IF lines( lt_orders ) <> 3.
  WRITE / 'Le nombre de lignes préparées est incorrect'.
  ROLLBACK WORK.
  RETURN.
ENDIF.

LOOP AT lt_orders
  ASSIGNING FIELD-SYMBOL(<lfs_order>).

  CASE <lfs_order>-order_id.
    WHEN '9100000030'.
      <lfs_order>-priority = '2'.
      <lfs_order>-status   = 'P'.
      <lfs_order>-amount   = '130.00'.

    WHEN '9100000031'.
      <lfs_order>-priority = '2'.
      <lfs_order>-status   = 'P'.
      <lfs_order>-amount   = '131.00'.

    WHEN '9100000032'.
      <lfs_order>-priority = '3'.
      <lfs_order>-status   = 'C'.
      <lfs_order>-amount   = '132.00'.
  ENDCASE.

ENDLOOP.

UPDATE zt_<tri>_ord
  FROM TABLE @lt_orders.

DATA(lv_update_subrc) = sy-subrc.
DATA(lv_update_count) = sy-dbcnt.

IF lv_update_subrc = 0
   AND lv_update_count = lines( lt_orders ).

  WRITE / 'Les trois lignes ont été mises à jour'.

ELSE.

  WRITE / 'Le lot est incomplet'.
  ROLLBACK WORK.
  RETURN.

ENDIF.

SELECT order_id,
       priority,
       status,
       amount,
       currency
  FROM zt_<tri>_ord
  WHERE order_id BETWEEN '9100000030'
                     AND '9100000032'
  ORDER BY order_id
  INTO TABLE @DATA(lt_result).

LOOP AT lt_result INTO DATA(ls_result).
  WRITE: / ls_result-order_id,
           ls_result-priority,
           ls_result-status,
           ls_result-amount,
           ls_result-currency.
ENDLOOP.

ROLLBACK WORK.
```

</details>
