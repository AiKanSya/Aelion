# 🌸 EXERCICES — SUPPRESSION PAR TABLE INTERNE

## 🌺 OBJECTIFS

- construire une liste de clés ;
- lire les lignes complètes correspondantes ;
- supprimer en masse ;
- contrôler le résultat ;
- éviter une boucle de suppressions unitaires ;
- annuler le test.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 DONNÉES DE TEST

Préparer :

```text
9300000030
9300000031
9300000032
```

## 🌺 EXERCICE 1 — LECTURE DES LIGNES

```abap
SELECT *
  FROM zt_<tri>_ord
  WHERE order_id BETWEEN '9300000030'
                     AND '9300000032'
  ORDER BY order_id
  INTO TABLE @DATA(lt_orders_to_delete).
```

Résultat attendu :

```text
3 lignes
```

## 🌺 EXERCICE 2 — SUPPRESSION DE MASSE

```abap
DELETE zt_<tri>_ord
  FROM TABLE @lt_orders_to_delete.
```

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 3
```

## 🌺 EXERCICE 3 — RELECTURE

Vérifier qu’aucune des trois clés n’existe.

## 🌺 EXERCICE 4 — COMPARAISON AVEC UNE BOUCLE

Analyser :

```abap
LOOP AT lt_orders_to_delete INTO DATA(ls_order).
  DELETE zt_<tri>_ord FROM @ls_order.
ENDLOOP.
```

Répondre :

1. combien d’instructions SQL sont écrites dans la boucle ?
2. quelle forme exprime une opération de masse ?
3. dans quel cas un traitement unitaire peut-il rester nécessaire ?
4. comment tracer un résultat individuel sans multiplier inutilement les accès ?
5. faut-il toujours privilégier la masse sans analyser la règle métier ?

## 🌺 EXERCICE 5 — ROLLBACK

Annuler les trois suppressions.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les trois lignes complètes sont lues.
- [ ] La source n’est pas vide.
- [ ] La suppression de masse est utilisée.
- [ ] `sy-subrc` vaut `0`.
- [ ] `sy-dbcnt` vaut `3`.
- [ ] Les trois lignes sont absentes avant rollback.
- [ ] La boucle est comparée à l’opération de masse.
- [ ] Le rollback restaure l’état initial : les lignes de test restent absentes.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT *
  FROM zt_<tri>_ord
  WHERE order_id BETWEEN '9300000030'
                     AND '9300000032'
  ORDER BY order_id
  INTO TABLE @DATA(lt_orders_to_delete).

IF lines( lt_orders_to_delete ) <> 3.
  WRITE / 'Périmètre incorrect'.
  ROLLBACK WORK.
  RETURN.
ENDIF.

DELETE zt_<tri>_ord
  FROM TABLE @lt_orders_to_delete.

DATA(lv_delete_subrc) = sy-subrc.
DATA(lv_delete_count) = sy-dbcnt.

IF lv_delete_subrc = 0
   AND lv_delete_count = lines( lt_orders_to_delete ).

  WRITE / 'Les trois lignes ont été supprimées'.

ELSE.

  WRITE / 'Suppression incomplète'.
  ROLLBACK WORK.
  RETURN.

ENDIF.

ROLLBACK WORK.
```

</details>
