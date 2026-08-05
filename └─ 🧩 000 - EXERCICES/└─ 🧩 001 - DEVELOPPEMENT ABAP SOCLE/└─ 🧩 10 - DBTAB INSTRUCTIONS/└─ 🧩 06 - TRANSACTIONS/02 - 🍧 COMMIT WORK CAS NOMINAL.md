# 🌸 EXERCICES — COMMIT WORK : CAS NOMINAL

## 🌺 OBJECTIFS

- préparer une transaction cohérente ;
- valider trois écritures ;
- vérifier la persistance ;
- nettoyer les données persistantes ;
- contrôler toutes les étapes.

## 🌺 DURÉE INDICATIVE

50 à 65 minutes.

## 🌺 SCÉNARIO

Créer :

```text
Statut T
Commande 9400000001
Commande 9400000002
```

Puis valider uniquement si les trois écritures réussissent.

## 🌺 EXERCICE 1 — PRÉCONDITIONS

Vérifier :

```text
Statut T absent
Commandes 9400000001 et 9400000002 absentes
```

Refuser le test si une donnée existe déjà.

## 🌺 EXERCICE 2 — PRÉPARATION DES SOURCES

Statut :

```abap
DATA(ls_status) = VALUE zt_<tri>_stat(
  mandt       = sy-mandt
  status      = 'T'
  status_text = 'Transaction de test'
).
```

Commandes :

```abap
DATA lt_orders TYPE STANDARD TABLE OF zt_<tri>_ord
  WITH EMPTY KEY.
```

Alimenter les deux lignes complètes.

## 🌺 EXERCICE 3 — ÉCRITURES

Ordre :

```text
1. statut ;
2. commandes.
```

Contrôler chaque résultat.

## 🌺 EXERCICE 4 — COMMIT

Si tout est correct :

```abap
COMMIT WORK AND WAIT.
```

Avec des écritures Open SQL directes sans Update Task défaillante, le résultat attendu est :

```text
sy-subrc = 0
```

## 🌺 EXERCICE 5 — NOUVELLE EXÉCUTION

Relancer le programme en mode vérification ou utiliser `SE16N`.

Résultat attendu :

```text
Statut T présent
Deux commandes présentes
```

## 🌺 EXERCICE 6 — NETTOYAGE

Dans une transaction séparée :

1. supprimer les deux commandes ;
2. supprimer le statut ;
3. contrôler les nombres ;
4. valider le nettoyage.

Ordre :

```text
dépendances
puis
référence
```

## 🌺 QUESTIONS

1. pourquoi le statut est-il créé avant les commandes ?
2. pourquoi les commandes sont-elles supprimées avant le statut ?
3. pourquoi le commit intervient-il après toutes les écritures ?
4. pourquoi le nettoyage constitue-t-il une nouvelle SAP LUW ?
5. pourquoi `AND WAIT` n’est-il pas nécessaire pour rendre les Open SQL directs persistants ?
6. pourquoi reste-t-il utile dans certains tests avec Update Task ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les préconditions sont vérifiées.
- [ ] Les trois sources sont complètes.
- [ ] Chaque écriture est contrôlée.
- [ ] Un seul commit valide l’ensemble.
- [ ] Les trois lignes sont persistantes.
- [ ] Le nettoyage respecte les dépendances.
- [ ] Le nettoyage est validé séparément.
- [ ] Aucune donnée de test ne subsiste.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CONSTANTS:
  lc_status   TYPE zde_<tri>_stat VALUE 'T',
  lc_order_1  TYPE zde_<tri>_oid  VALUE '9400000001',
  lc_order_2  TYPE zde_<tri>_oid  VALUE '9400000002'.

SELECT SINGLE status
  FROM zt_<tri>_stat
  WHERE status = @lc_status
  INTO @DATA(lv_existing_status).

IF sy-subrc = 0.
  WRITE / 'Le statut de test existe déjà'.
  RETURN.
ENDIF.

SELECT order_id
  FROM zt_<tri>_ord
  WHERE order_id = @lc_order_1
     OR order_id = @lc_order_2
  INTO TABLE @DATA(lt_existing_orders).

IF lt_existing_orders IS NOT INITIAL.
  WRITE / 'Une commande de test existe déjà'.
  RETURN.
ENDIF.

DATA(ls_status) = VALUE zt_<tri>_stat(
  mandt       = sy-mandt
  status      = lc_status
  status_text = 'Transaction de test'
).

DATA lt_orders TYPE STANDARD TABLE OF zt_<tri>_ord
  WITH EMPTY KEY.

lt_orders = VALUE #(
  ( mandt = sy-mandt
    order_id = lc_order_1
    customer_name = 'Transaction A'
    priority = '1'
    status = lc_status
    currency = 'EUR'
    amount = '100.00'
    created_by = sy-uname
    created_on = sy-datum )

  ( mandt = sy-mandt
    order_id = lc_order_2
    customer_name = 'Transaction B'
    priority = '2'
    status = lc_status
    currency = 'EUR'
    amount = '200.00'
    created_by = sy-uname
    created_on = sy-datum )
).

INSERT zt_<tri>_stat
  FROM @ls_status.

IF sy-subrc <> 0.
  WRITE / 'Création du statut impossible'.
  ROLLBACK WORK.
  RETURN.
ENDIF.

INSERT zt_<tri>_ord
  FROM TABLE @lt_orders.

IF sy-subrc <> 0
   OR sy-dbcnt <> lines( lt_orders ).

  WRITE / 'Création des commandes impossible'.
  ROLLBACK WORK.
  RETURN.

ENDIF.

COMMIT WORK AND WAIT.

IF sy-subrc = 0.
  WRITE / 'Transaction validée'.
ELSE.
  WRITE / 'Échec d’une mise à jour synchrone'.
ENDIF.
```

Nettoyage :

```abap
DELETE FROM zt_<tri>_ord
  WHERE order_id = @lc_order_1
     OR order_id = @lc_order_2.

IF sy-subrc <> 0 OR sy-dbcnt <> 2.
  ROLLBACK WORK.
  WRITE / 'Nettoyage des commandes incomplet'.
  RETURN.
ENDIF.

DELETE FROM zt_<tri>_stat
  WHERE status = @lc_status.

IF sy-subrc <> 0 OR sy-dbcnt <> 1.
  ROLLBACK WORK.
  WRITE / 'Nettoyage du statut incomplet'.
  RETURN.
ENDIF.

COMMIT WORK AND WAIT.
```

</details>
