# 🌸 EXERCICES — UPDATE FROM STRUCTURE : CAS NOMINAL

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MODIFY](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 04 - MODIFY/01 - 🍧 MODIFY.md>)

## 🌺 OBJECTIFS

- lire une ligne complète ;
- modifier uniquement les valeurs souhaitées dans la structure ;
- réécrire la ligne ;
- contrôler `sy-subrc` et `sy-dbcnt`;
- relire la ligne ;
- vérifier les champs non concernés ;
- annuler le test.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 DONNÉE INITIALE

```text
ORDER_ID      : 9100000001
CUSTOMER_NAME : Commande avant UPDATE
PRIORITY      : 1
STATUS        : N
AMOUNT        : 100,00 EUR
```

## 🌺 MODIFICATION ATTENDUE

```text
PRIORITY : 2
STATUS   : P
AMOUNT   : 125,50 EUR
```

Le nom, la devise, l’auteur et la date doivent rester inchangés.

## 🌺 EXERCICE 1 — PRÉPARATION

Utiliser le bloc de préparation commun avec :

```text
9100000001
```

## 🌺 EXERCICE 2 — LECTURE COMPLÈTE

Lire :

```abap
SELECT SINGLE *
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(ls_order).
```

Contrôler immédiatement `sy-subrc`.

## 🌺 EXERCICE 3 — MODIFICATION DE LA STRUCTURE

Modifier :

```abap
ls_order-priority = '2'.
ls_order-status   = 'P'.
ls_order-amount   = '125.50'.
```

Ne pas reconstruire une structure vide.

## 🌺 EXERCICE 4 — UPDATE

Exécuter :

```abap
UPDATE zt_<tri>_ord
  FROM @ls_order.
```

Sauvegarder :

```abap
DATA(lv_update_subrc) = sy-subrc.
DATA(lv_update_count) = sy-dbcnt.
```

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 1
```

## 🌺 EXERCICE 5 — RELECTURE

Relire tous les champs utiles.

Comparer :

| Champ           | Avant                   | Après |
| --------------- | ----------------------- | ----- |
| `ORDER_ID`      | `9100000001`            |       |
| `CUSTOMER_NAME` | `Commande avant UPDATE` |       |
| `PRIORITY`      | `1`                     |       |
| `STATUS`        | `N`                     |       |
| `AMOUNT`        | `100,00`                |       |
| `CURRENCY`      | `EUR`                   |       |
| `CREATED_BY`    | utilisateur             |       |
| `CREATED_ON`    | date                    |       |

## 🌺 EXERCICE 6 — ROLLBACK

Exécuter :

```abap
ROLLBACK WORK.
```

Vérifier que la ligne de préparation a disparu.

## 🌺 QUESTIONS

1. pourquoi la structure est-elle lue avant la modification ?
2. la structure contient-elle les champs non modifiés ?
3. pourquoi `UPDATE ... FROM` préserve-t-il ces champs dans ce cas ?
4. le rollback annule-t-il également l’insertion de préparation ?
5. pourquoi faut-il relire avant le rollback ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La ligne est préparée.
- [ ] La structure complète est lue.
- [ ] Trois champs sont modifiés.
- [ ] `sy-subrc` vaut `0`.
- [ ] `sy-dbcnt` vaut `1`.
- [ ] Les champs non concernés sont conservés.
- [ ] La ligne modifiée est relue.
- [ ] Le rollback supprime le test.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CONSTANTS lc_order_id TYPE zde_<tri>_oid
  VALUE '9100000001'.

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
  customer_name = 'Commande avant UPDATE'
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

SELECT SINGLE *
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(ls_order).

IF sy-subrc <> 0.
  WRITE / 'Commande de test introuvable'.
  ROLLBACK WORK.
  RETURN.
ENDIF.

DATA(ls_before) = ls_order.

ls_order-priority = '2'.
ls_order-status   = 'P'.
ls_order-amount   = '125.50'.

UPDATE zt_<tri>_ord
  FROM @ls_order.

DATA(lv_update_subrc) = sy-subrc.
DATA(lv_update_count) = sy-dbcnt.

IF lv_update_subrc = 0.
  WRITE: / 'Mise à jour réussie',
         / |sy-subrc : { lv_update_subrc }|,
         / |sy-dbcnt : { lv_update_count }|.
ELSE.
  WRITE / 'Mise à jour impossible'.
ENDIF.

SELECT SINGLE *
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(ls_after).

IF sy-subrc = 0.
  WRITE: / |Nom      : { ls_before-customer_name } → { ls_after-customer_name }|,
         / |Priorité : { ls_before-priority } → { ls_after-priority }|,
         / |Statut   : { ls_before-status } → { ls_after-status }|,
         / |Montant  : { ls_before-amount } → { ls_after-amount }|,
         / |Devise   : { ls_before-currency } → { ls_after-currency }|.
ENDIF.

ROLLBACK WORK.

SELECT SINGLE order_id
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_id
  INTO @DATA(lv_after_rollback).

IF sy-subrc <> 0.
  WRITE / 'Ligne de test absente après rollback'.
ENDIF.
```

</details>
