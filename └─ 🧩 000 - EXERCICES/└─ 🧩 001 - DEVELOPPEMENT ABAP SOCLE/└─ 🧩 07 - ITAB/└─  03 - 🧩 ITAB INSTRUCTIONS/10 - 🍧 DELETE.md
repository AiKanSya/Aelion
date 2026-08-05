# 🌸 EXERCICES — DELETE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [DELETE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/10 - 🍧 DELETE.md>)

## 🌺 OBJECTIFS

- supprimer par index ;
- supprimer par condition ;
- supprimer par clé ;
- supprimer une plage ;
- contrôler l’absence de ligne ;
- éviter un index invalide.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — INDEX

Supprimer la deuxième ligne d’une table standard.

Contrôler `sy-subrc`.

## 🌺 EXERCICE 2 — CONDITION

Supprimer toutes les commandes clôturées :

```abap
DELETE lt_orders WHERE status = 'C'.
```

Afficher le nombre de lignes supprimées par différence entre les nombres avant et après.

## 🌺 EXERCICE 3 — CLÉ

Créer une table hachée :

```abap
DATA lt_orders_hashed TYPE HASHED TABLE OF ty_order
  WITH UNIQUE KEY order_id.
```

Supprimer :

```abap
DELETE TABLE lt_orders_hashed
  WITH TABLE KEY order_id = '4500000002'.
```

Contrôler `sy-subrc`.

## 🌺 EXERCICE 4 — PLAGE

Dans une table standard de dix nombres, supprimer les lignes `3` à `6`.

Prévoir les valeurs restantes.

## 🌺 EXERCICE 5 — LIGNE ABSENTE

Tenter de supprimer une clé inconnue.

Résultat attendu :

```text
Aucune ligne supprimée
```

## 🌺 EXERCICE 6 — INDEX ZÉRO

Analyser sans exécution :

```abap
DELETE lt_orders INDEX 0.
```

Expliquer pourquoi un index dynamique doit être validé avant l’instruction.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La suppression par index est contrôlée.
- [ ] Toutes les lignes clôturées sont supprimées.
- [ ] La suppression par clé complète est utilisée sur la table hachée.
- [ ] La plage correcte est supprimée.
- [ ] Une absence produit un traitement explicite.
- [ ] L’index zéro n’est pas exécuté.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA(lv_before) = lines( lt_orders ).

DELETE lt_orders WHERE status = 'C'.

DATA(lv_deleted) = lv_before - lines( lt_orders ).

WRITE / |Lignes supprimées : { lv_deleted }|.
```

Suppression par clé :

```abap
DELETE TABLE lt_orders_hashed
  WITH TABLE KEY order_id = '4500000002'.

IF sy-subrc <> 0.
  WRITE / 'Aucune ligne supprimée'.
ENDIF.
```

Plage :

```abap
DELETE lt_numbers FROM 3 TO 6.
```

</details>
