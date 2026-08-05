# 🌸 EXERCICES — RÉSULTAT PARTIEL AVEC FROM TABLE

## 🌺 OBJECTIFS

- préparer un lot contenant une clé absente ;
- observer la poursuite du traitement ;
- interpréter `4/2`;
- identifier les clés non supprimées ;
- appliquer un rollback atomique ;
- décrire une stratégie partielle.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 PRÉPARATION

Créer uniquement :

```text
9300000040
9300000041
```

## 🌺 SOURCE

Préparer une table interne de type `ZT_<TRI>_ORD` contenant les clés :

```text
9300000040
9300000041
9300000049
```

La troisième clé n’existe pas.

## 🌺 EXERCICE 1 — SUPPRESSION

```abap
DELETE zt_<tri>_ord
  FROM TABLE @lt_orders_to_delete.
```

Résultat attendu :

```text
sy-subrc = 4
sy-dbcnt = 2
```

## 🌺 EXERCICE 2 — RELECTURE AVANT ROLLBACK

Vérifier :

```text
9300000040 absente
9300000041 absente
9300000049 absente depuis le départ
```

## 🌺 EXERCICE 3 — ANALYSE

1. `sy-subrc = 4` signifie-t-il qu’aucune ligne n’a été supprimée ?
2. quelle valeur prouve les deux suppressions ?
3. le traitement s’arrête-t-il à la clé absente ?
4. le lot est-il atomique automatiquement ?
5. que se passerait-il au prochain commit ?

## 🌺 EXERCICE 4 — MODE ATOMIQUE

```abap
IF sy-subrc <> 0
   OR sy-dbcnt <> lines( lt_orders_to_delete ).

  ROLLBACK WORK.

ENDIF.
```

Vérifier que la LUW est annulée et que les lignes de test sont absentes, comme avant la préparation.

## 🌺 EXERCICE 5 — IDENTIFIER LES ABSENTES

Avant la suppression :

1. lire les clés présentes en base ;
2. comparer aux clés demandées ;
3. construire une liste de rejets ;
4. décider si la suppression doit continuer.

## 🌺 EXERCICE 6 — MODE PARTIEL

Décrire le cas où le métier accepte :

```text
Supprimer les lignes présentes
Signaler les lignes déjà absentes
```

Le bilan doit distinguer :

```text
Demandées
Supprimées
Absentes
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Deux lignes existent en base.
- [ ] Trois clés sont demandées.
- [ ] `sy-subrc` vaut `4`.
- [ ] `sy-dbcnt` vaut `2`.
- [ ] Les deux lignes sont supprimées avant rollback.
- [ ] La clé absente n’interrompt pas le traitement.
- [ ] Le rollback restaure l’état initial du lot : aucune ligne de test ne subsiste.
- [ ] Une stratégie partielle est décrite.
- [ ] Les rejets sont identifiables.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DELETE zt_<tri>_ord
  FROM TABLE @lt_orders_to_delete.

DATA(lv_delete_subrc) = sy-subrc.
DATA(lv_delete_count) = sy-dbcnt.
DATA(lv_requested_count) = lines( lt_orders_to_delete ).
DATA(lv_missing_count) =
  lv_requested_count - lv_delete_count.

WRITE: / |Demandées  : { lv_requested_count }|,
       / |Supprimées : { lv_delete_count }|,
       / |Absentes   : { lv_missing_count }|.

IF lv_delete_subrc <> 0
   OR lv_delete_count <> lv_requested_count.

  WRITE / 'Lot incomplet : rollback'.
  ROLLBACK WORK.

ENDIF.
```

</details>
