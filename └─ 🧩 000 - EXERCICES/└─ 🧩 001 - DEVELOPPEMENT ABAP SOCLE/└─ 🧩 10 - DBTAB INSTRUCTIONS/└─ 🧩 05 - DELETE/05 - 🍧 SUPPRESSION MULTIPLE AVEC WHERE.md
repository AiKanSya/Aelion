# 🌸 EXERCICES — SUPPRESSION MULTIPLE AVEC WHERE

## 🌺 OBJECTIFS

- préparer plusieurs lignes ;
- prévisualiser le périmètre ;
- supprimer selon plusieurs critères ;
- contrôler le nombre ;
- détecter un périmètre trop large ;
- annuler le test.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 DONNÉES DE TEST

| Commande     | Statut | Devise | Montant |
| ------------ | ------ | ------ | ------: |
| `9300000010` | `N`    | EUR    | `10,00` |
| `9300000011` | `N`    | EUR    | `11,00` |
| `9300000012` | `P`    | EUR    | `12,00` |
| `9300000013` | `N`    | USD    | `13,00` |

## 🌺 BESOIN

Supprimer uniquement les commandes :

```text
de la plage 9300000010 à 9300000019
ET
statut N
ET
devise EUR
```

Résultat attendu :

```text
9300000010
9300000011
```

## 🌺 EXERCICE 1 — PRÉVISUALISATION

```abap
SELECT order_id,
       status,
       currency,
       amount
  FROM zt_<tri>_ord
  WHERE order_id BETWEEN '9300000010'
                     AND '9300000019'
    AND status   = 'N'
    AND currency = 'EUR'
  ORDER BY order_id
  INTO TABLE @DATA(lt_preview).
```

Vérifier :

```text
lines( lt_preview ) = 2
```

## 🌺 EXERCICE 2 — PROTECTION

Refuser la suppression si :

```abap
lines( lt_preview ) <> 2
```

## 🌺 EXERCICE 3 — SUPPRESSION

Utiliser exactement les mêmes critères que la prévisualisation.

Résultat attendu :

```text
sy-subrc = 0
sy-dbcnt = 2
```

## 🌺 EXERCICE 4 — RELECTURE

Vérifier :

```text
9300000010 absente
9300000011 absente
9300000012 présente
9300000013 présente
```

## 🌺 EXERCICE 5 — CONDITION TROP LARGE

Analyser sans exécuter :

```abap
DELETE FROM zt_<tri>_ord
  WHERE status = 'N'.
```

Répondre :

1. la plage de test est-elle encore appliquée ?
2. des commandes fonctionnelles peuvent-elles être supprimées ?
3. pourquoi le statut seul est-il insuffisant ?
4. quelle règle impose un filtre de sécurité indépendant du filtre métier ?
5. comment vérifier que les critères du `SELECT` et du `DELETE` restent identiques ?

## 🌺 EXERCICE 6 — ROLLBACK

Annuler la LUW et vérifier que les quatre lignes de test sont absentes, comme avant la préparation.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Quatre lignes sont préparées.
- [ ] La prévisualisation retourne deux lignes.
- [ ] Le nombre attendu est vérifié.
- [ ] Le delete reprend les mêmes critères.
- [ ] `sy-subrc` vaut `0`.
- [ ] `sy-dbcnt` vaut `2`.
- [ ] Les deux lignes hors périmètre restent présentes.
- [ ] La condition trop large n’est pas exécutée.
- [ ] Le rollback restaure l’état initial : aucune ligne de test ne subsiste.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT order_id
  FROM zt_<tri>_ord
  WHERE order_id BETWEEN '9300000010'
                     AND '9300000019'
    AND status   = 'N'
    AND currency = 'EUR'
  INTO TABLE @DATA(lt_preview).

IF lines( lt_preview ) <> 2.
  WRITE / 'Périmètre inattendu : suppression refusée'.
  ROLLBACK WORK.
  RETURN.
ENDIF.

DELETE FROM zt_<tri>_ord
  WHERE order_id BETWEEN '9300000010'
                     AND '9300000019'
    AND status   = 'N'
    AND currency = 'EUR'.

DATA(lv_delete_subrc) = sy-subrc.
DATA(lv_delete_count) = sy-dbcnt.

IF lv_delete_subrc <> 0
   OR lv_delete_count <> lines( lt_preview ).

  WRITE / 'Suppression incomplète : rollback'.
  ROLLBACK WORK.
  RETURN.

ENDIF.
```

</details>
