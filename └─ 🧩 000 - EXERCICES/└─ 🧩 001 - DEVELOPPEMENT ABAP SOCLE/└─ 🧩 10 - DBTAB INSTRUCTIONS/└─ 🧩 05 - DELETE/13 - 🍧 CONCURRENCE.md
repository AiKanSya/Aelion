# 🌸 EXERCICES — CONCURRENCE

## 🌺 OBJECTIFS

- comprendre la différence entre prévisualisation et état au moment du delete ;
- détecter une variation du périmètre ;
- utiliser une condition d’état ;
- identifier un objet de verrouillage ;
- limiter les conflits.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 SCÉNARIO 1 — NOUVELLE LIGNE

Prévisualisation :

```text
Deux commandes statut N
```

Avant le delete, un autre traitement crée une troisième commande `N` dans la même plage.

Suppression :

```abap
DELETE FROM zt_<tri>_ord
  WHERE order_id BETWEEN ...
    AND status = 'N'.
```

Questions :

1. combien de lignes peuvent être supprimées ?
2. le nombre correspond-il encore à la prévisualisation ?
3. quel contrôle détecte la variation ?
4. pourquoi supprimer depuis la table prévisualisée peut-il mieux figer les clés ?
5. cela protège-t-il contre la suppression préalable d’une des lignes ?

## 🌺 SCÉNARIO 2 — ÉTAT MODIFIÉ

Une ligne est prévisualisée avec :

```text
STATUS = N
```

Un autre traitement passe le statut à `P`.

Comparer :

### Suppression par clé

```abap
DELETE dbtab FROM TABLE itab.
```

### Suppression avec état attendu

```abap
DELETE FROM dbtab
  WHERE order_id = ...
    AND status = 'N'.
```

Répondre :

1. laquelle supprime malgré le changement de statut ?
2. laquelle détecte que l’état attendu n’existe plus ?
3. quelle règle métier faut-il décider ?
4. quelle stratégie protège le mieux une suppression conditionnelle ?

## 🌺 SCÉNARIO 3 — LIGNE DÉJÀ SUPPRIMÉE

Une clé disparaît entre la prélecture et le lot.

Résultat possible :

```text
sy-subrc = 4
sy-dbcnt inférieur au nombre attendu
```

## 🌺 STRATÉGIES

| Besoin                               | Stratégie                 |
| ------------------------------------ | ------------------------- |
| Figer les acteurs du processus       | Objet de verrouillage     |
| Supprimer uniquement un état attendu | Condition supplémentaire  |
| Détecter un lot incomplet            | Comparaison de `sy-dbcnt` |
| Annuler l’ensemble                   | `ROLLBACK WORK`           |
| Informer du conflit                  | Relecture et message      |

## 🌺 CRITÈRES DE VALIDATION

- [ ] La prévisualisation n’est pas considérée comme un verrou.
- [ ] Une nouvelle ligne concurrente est analysée.
- [ ] La suppression par clé est distinguée d’une condition d’état.
- [ ] Une ligne déjà supprimée est détectée.
- [ ] `sy-dbcnt` est comparé au volume attendu.
- [ ] Un objet de verrouillage est identifié.
- [ ] Le rollback protège un lot atomique.

<details>
<summary>🍧 Afficher la solution</summary>

Pour figer les clés prévisualisées :

```abap
DELETE zt_<tri>_ord
  FROM TABLE @lt_preview.
```

Pour exiger également un état :

```abap
DELETE FROM zt_<tri>_ord
  WHERE order_id = @lv_order_id
    AND status   = @lv_expected_status.
```

Le choix dépend de la règle métier.

</details>
