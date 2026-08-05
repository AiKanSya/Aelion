# 🌸 EXERCICES — MODIFY WHERE

## 🌺 OBJECTIFS

- modifier plusieurs lignes selon une condition ;
- limiter les composants transportés ;
- contrôler le résultat ;
- traiter le cas sans correspondance ;
- éviter de modifier des composants de clé protégés.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — MODIFICATION SIMPLE

À partir des données communes, remplacer le statut `N` par `P`.

Utiliser :

```abap
MODIFY lt_orders
  FROM VALUE #( status = 'P' )
  TRANSPORTING status
  WHERE status = 'N'.
```

Résultat attendu :

```text
4500000003 : P
4500000001 : P
4500000004 : C
4500000002 : P
```

## 🌺 EXERCICE 2 — PLUSIEURS CONDITIONS

Pour les commandes françaises dont le montant est inférieur à `100,00` :

- augmenter la priorité à `9` ;
- ne modifier aucun autre composant.

## 🌺 EXERCICE 3 — AUCUNE LIGNE

Exécuter une modification avec :

```abap
WHERE country = 'ES'.
```

Contrôler `sy-subrc`.

Résultat attendu :

```text
Aucune ligne modifiée
```

## 🌺 EXERCICE 4 — OUBLI DE `TRANSPORTING`

Analyser :

```abap
MODIFY lt_orders
  FROM VALUE #( status = 'P' )
  WHERE status = 'N'.
```

Répondre :

1. quels composants contient la structure construite ?
2. que risque-t-il d’arriver aux autres composants des lignes modifiées ?
3. pourquoi `TRANSPORTING status` est-il nécessaire ?
4. quel défaut fonctionnel doit être testé ?

## 🌺 EXERCICE 5 — COMPOSANT DE CLÉ

Une table triée possède la clé unique `order_id`.

Analyser une tentative de modification de `order_id` avec `MODIFY ... WHERE`.

Répondre :

1. pourquoi la clé est-elle protégée ?
2. quel risque existe pour l’ordre ou l’unicité ?
3. quelle stratégie faut-il employer pour changer la clé ?
4. quelles étapes sont nécessaires ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Toutes les lignes `N` deviennent `P`.
- [ ] Seul le composant demandé est transporté.
- [ ] La condition multiple est correcte.
- [ ] `sy-subrc = 4` est géré lorsqu’aucune ligne ne correspond.
- [ ] L’omission de `TRANSPORTING` est diagnostiquée.
- [ ] Une clé n’est pas modifiée directement.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
MODIFY lt_orders
  FROM VALUE #( status = 'P' )
  TRANSPORTING status
  WHERE status = 'N'.

IF sy-subrc = 0.
  WRITE / 'Statuts modifiés'.
ELSE.
  WRITE / 'Aucune ligne modifiée'.
ENDIF.

MODIFY lt_orders
  FROM VALUE #( priority = 9 )
  TRANSPORTING priority
  WHERE country = 'FR'
    AND amount < '100.00'.
```

Sans `TRANSPORTING`, les composants initiaux de la structure source peuvent écraser les composants correspondants des lignes modifiées.

Pour changer une clé :

1. lire la ligne ;
2. supprimer l’ancienne ligne ;
3. modifier la copie ;
4. réinsérer ;
5. contrôler le résultat.

</details>
