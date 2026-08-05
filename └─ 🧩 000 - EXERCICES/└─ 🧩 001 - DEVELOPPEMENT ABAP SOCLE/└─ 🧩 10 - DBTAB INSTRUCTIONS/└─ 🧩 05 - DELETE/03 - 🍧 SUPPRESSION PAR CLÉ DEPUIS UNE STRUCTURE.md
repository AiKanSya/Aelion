# 🌸 EXERCICES — SUPPRESSION PAR CLÉ DEPUIS UNE STRUCTURE

## 🌺 OBJECTIFS

- lire une ligne dans une structure ;
- supprimer selon la clé de la structure ;
- comprendre que les champs non clés ne filtrent pas ;
- traiter une structure dont la clé est absente ;
- annuler le test.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 PRÉPARATION

Créer :

```text
9300000002
```

## 🌺 EXERCICE 1 — LECTURE

```abap
SELECT SINGLE *
  FROM zt_<tri>_ord
  WHERE order_id = '9300000002'
  INTO @DATA(ls_order).
```

## 🌺 EXERCICE 2 — MODIFICATION LOCALE NON CLÉ

Avant la suppression, modifier uniquement dans la structure :

```abap
ls_order-customer_name = 'Valeur différente en mémoire'.
ls_order-amount        = '999.00'.
```

Ne pas écrire ces changements en base.

## 🌺 EXERCICE 3 — SUPPRESSION

```abap
DELETE zt_<tri>_ord
  FROM @ls_order.
```

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 1
```

## 🌺 QUESTIONS

1. les valeurs non clés différentes empêchent-elles la suppression ?
2. quels champs identifient la ligne ?
3. pourquoi utiliser une structure typée avec la table ?
4. la suppression met-elle à jour les autres colonnes avant de supprimer ?
5. quelle différence avec `DELETE FROM ... WHERE` ?

## 🌺 EXERCICE 4 — CLÉ ABSENTE

Modifier dans la structure :

```text
ORDER_ID = 9300000099
```

Exécuter la suppression.

Résultat attendu :

```text
sy-subrc = 4
sy-dbcnt = 0
```

## 🌺 EXERCICE 5 — ROLLBACK

Annuler la préparation.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La ligne complète est lue.
- [ ] Les champs non clés sont modifiés seulement en mémoire.
- [ ] La suppression réussit grâce à la clé.
- [ ] Les champs non clés ne participent pas à l’identification.
- [ ] La clé absente retourne `4/0`.
- [ ] Le test est annulé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT SINGLE *
  FROM zt_<tri>_ord
  WHERE order_id = '9300000002'
  INTO @DATA(ls_order).

IF sy-subrc = 0.

  ls_order-customer_name = 'Valeur différente en mémoire'.
  ls_order-amount        = '999.00'.

  DELETE zt_<tri>_ord
    FROM @ls_order.

  WRITE: / |sy-subrc : { sy-subrc }|,
         / |sy-dbcnt : { sy-dbcnt }|.

ENDIF.
```

La clé primaire contenue dans `ls_order` est utilisée. Les autres valeurs n’ont pas à correspondre à la ligne stockée.

</details>
