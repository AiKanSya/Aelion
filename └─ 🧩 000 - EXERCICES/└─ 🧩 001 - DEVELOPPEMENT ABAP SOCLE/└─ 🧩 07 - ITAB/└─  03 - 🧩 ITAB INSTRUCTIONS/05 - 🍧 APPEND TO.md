# 🌸 EXERCICES — APPEND TO ITAB

## 🌺 OBJECTIFS

- ajouter à la fin d’une table d’index ;
- ajouter une structure, une ligne initiale et plusieurs lignes ;
- utiliser `sy-tabix` immédiatement après l’ajout ;
- distinguer `APPEND` et `INSERT`;
- éviter `APPEND` pour une table hachée ;
- comprendre la contrainte d’ordre d’une table triée.

## 🌺 DURÉE INDICATIVE

40 à 55 minutes.

## 🌺 EXERCICE 1 — AJOUT STANDARD

Ajouter trois commandes dans une table standard.

Après chaque `APPEND`, afficher l’index ajouté avec `sy-tabix`.

Résultat attendu :

```text
Ligne ajoutée à l'index 1
Ligne ajoutée à l'index 2
Ligne ajoutée à l'index 3
```

## 🌺 EXERCICE 2 — LIGNE INITIALE

Utiliser :

```abap
APPEND INITIAL LINE
  TO lt_orders
  ASSIGNING FIELD-SYMBOL(<lfs_order>).
```

Alimenter la nouvelle ligne sans structure intermédiaire.

## 🌺 EXERCICE 3 — `APPEND LINES OF`

Ajouter toutes les lignes d’une table source à la fin d’une table cible :

```abap
APPEND LINES OF lt_source TO lt_target.
```

Vérifier les nombres de lignes avant et après.

## 🌺 EXERCICE 4 — TABLE TRIÉE

Une table triée contient :

```text
C001
C003
```

Analyser :

```abap
APPEND VALUE #( customer_id = 'C002' )
  TO lt_customers_sorted.
```

Ne pas exécuter ce code sur le système partagé.

Répondre :

1. la ligne peut-elle être placée à la fin sans casser l’ordre ?
2. quel risque existe ?
3. quelle instruction faut-il utiliser ?
4. `APPEND C004` serait-il structurellement possible à la fin ?
5. faut-il dépendre de cette condition pour alimenter la table ?

## 🌺 EXERCICE 5 — TABLE HACHÉE

Analyser :

```abap
APPEND ls_order TO lt_orders_hashed.
```

Répondre :

1. une table hachée possède-t-elle une fin indexée ?
2. quelle instruction faut-il utiliser ?
3. quelle propriété doit être respectée ?
4. quelle valeur faut-il contrôler après l’insertion ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les lignes sont ajoutées à la fin de la table standard.
- [ ] `sy-tabix` est lu immédiatement.
- [ ] Une ligne initiale est alimentée directement.
- [ ] Plusieurs lignes sont ajoutées sans boucle.
- [ ] `APPEND` n’est pas utilisé pour une table hachée.
- [ ] `INSERT` est privilégié pour les tables triées.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
CLEAR lt_orders.

APPEND VALUE #( order_id = '4500000001' ) TO lt_orders.
WRITE / |Ligne ajoutée à l'index { sy-tabix }|.

APPEND VALUE #( order_id = '4500000002' ) TO lt_orders.
WRITE / |Ligne ajoutée à l'index { sy-tabix }|.

APPEND VALUE #( order_id = '4500000003' ) TO lt_orders.
WRITE / |Ligne ajoutée à l'index { sy-tabix }|.
```

Pour une table triée ou hachée :

```abap
INSERT ls_order INTO TABLE lt_target.
```

puis :

```abap
IF sy-subrc <> 0.
  " Gérer le doublon ou l’échec.
ENDIF.
```

</details>
