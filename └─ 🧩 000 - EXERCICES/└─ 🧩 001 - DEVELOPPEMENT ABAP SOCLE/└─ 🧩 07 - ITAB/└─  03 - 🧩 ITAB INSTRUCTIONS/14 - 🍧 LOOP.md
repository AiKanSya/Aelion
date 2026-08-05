# 🌸 EXERCICES — LOOP AT

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [LOOP AT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/14 - 🍧 LOOP.md>)

## 🌺 OBJECTIFS

- parcourir toutes les lignes ;
- utiliser `INTO`, `ASSIGNING` et `TRANSPORTING NO FIELDS`;
- filtrer avec `WHERE`;
- limiter avec `FROM` et `TO`;
- utiliser `sy-tabix`;
- distinguer copie et modification directe ;
- comprendre les ruptures de contrôle ;
- éviter de remplacer ou vider la table parcourue.

## 🌺 DURÉE INDICATIVE

75 à 95 minutes.

## 🌺 EXERCICE 1 — `INTO`

Parcourir les données communes.

Dans la structure locale, remplacer le statut par `X`.

Afficher ensuite la table originale.

Répondre :

1. la table a-t-elle été modifiée ?
2. pourquoi ?
3. quelle instruction faudrait-il ajouter pour recopier la modification ?
4. quel risque existe si `sy-tabix` est utilisé après une autre instruction ?

## 🌺 EXERCICE 2 — `ASSIGNING`

Parcourir la table et passer toutes les commandes `N` à `P`.

Utiliser :

```abap
LOOP AT lt_orders
  ASSIGNING FIELD-SYMBOL(<lfs_order>)
  WHERE status = 'N'.
```

Vérifier directement le résultat.

## 🌺 EXERCICE 3 — `TRANSPORTING NO FIELDS`

Compter les commandes françaises sans transporter les lignes.

La syntaxe doit contenir une condition `WHERE`.

```abap
LOOP AT lt_orders
  TRANSPORTING NO FIELDS
  WHERE country = 'FR'.

  lv_count = lv_count + 1.

ENDLOOP.
```

Contrôler `sy-subrc` après la boucle.

## 🌺 EXERCICE 4 — `FROM` ET `TO`

Afficher uniquement les lignes d’index `2` à `3`.

Tester une table contenant moins de deux lignes.

## 🌺 EXERCICE 5 — CONDITION COMPLEXE

Afficher les commandes :

- françaises ou allemandes ;
- montant supérieur ou égal à `75,00`;
- statut différent de `C`.

Utiliser des parenthèses.

## 🌺 EXERCICE 6 — `sy-subrc` APRÈS LA BOUCLE

Tester un filtre ne correspondant à aucune ligne :

```abap
WHERE country = 'ES'
```

Résultat attendu :

```text
Aucune ligne parcourue
```

## 🌺 EXERCICE 7 — RUPTURES DE CONTRÔLE

Trier une table standard par :

```abap
customer_id order_id
```

Utiliser :

```abap
AT NEW customer_id.
AT END OF customer_id.
```

Afficher un en-tête et un pied pour chaque client.

Contraintes :

- utiliser une structure compatible avec le type de ligne ;
- ne pas utiliser dans le bloc de rupture des composants situés à droite du composant de rupture ;
- trier avant la boucle.

## 🌺 EXERCICE 8 — MODIFICATION DANGEREUSE DE LA TABLE

Analyser sans exécution :

```abap
LOOP AT lt_orders ASSIGNING <lfs_order>.
  CLEAR lt_orders.
ENDLOOP.
```

Répondre :

1. la table parcourue est-elle remplacée pendant la boucle ?
2. quel risque existe avec un field-symbol assigné ?
3. pourquoi ce code doit-il être interdit ?
4. quelle stratégie utiliser pour supprimer certaines lignes ?
5. quelle instruction directe peut remplacer la boucle dans de nombreux cas ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] `INTO` est distingué de `ASSIGNING`.
- [ ] Les lignes `N` sont modifiées directement avec le field-symbol.
- [ ] `TRANSPORTING NO FIELDS` possède un `WHERE`.
- [ ] `FROM` et `TO` limitent la plage.
- [ ] Les conditions complexes sont parenthésées.
- [ ] `sy-subrc` distingue une boucle exécutée d’une boucle sans passage.
- [ ] Les ruptures sont précédées d’un tri adapté.
- [ ] La table n’est pas vidée ou remplacée pendant son parcours.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
LOOP AT lt_orders INTO DATA(ls_order).
  ls_order-status = 'X'.
ENDLOOP.

" La table est inchangée.

LOOP AT lt_orders
  ASSIGNING FIELD-SYMBOL(<lfs_order>)
  WHERE status = 'N'.

  <lfs_order>-status = 'P'.

ENDLOOP.
```

Comptage :

```abap
DATA lv_count TYPE i.

LOOP AT lt_orders
  TRANSPORTING NO FIELDS
  WHERE country = 'FR'.

  lv_count = lv_count + 1.

ENDLOOP.

IF sy-subrc = 0.
  WRITE / |Commandes françaises : { lv_count }|.
ELSE.
  WRITE / 'Aucune commande française'.
ENDIF.
```

Condition :

```abap
LOOP AT lt_orders INTO ls_order
  WHERE ( country = 'FR' OR country = 'DE' )
    AND amount >= '75.00'
    AND status <> 'C'.

  WRITE / ls_order-order_id.

ENDLOOP.
```

Ruptures :

```abap
SORT lt_orders BY customer_id order_id.

LOOP AT lt_orders INTO ls_order.

  AT NEW customer_id.
    WRITE / |Début client { ls_order-customer_id }|.
  ENDAT.

  WRITE / ls_order-order_id.

  AT END OF customer_id.
    WRITE / |Fin client { ls_order-customer_id }|.
  ENDAT.

ENDLOOP.
```

Pour supprimer selon une condition :

```abap
DELETE lt_orders WHERE status = 'C'.
```

</details>
