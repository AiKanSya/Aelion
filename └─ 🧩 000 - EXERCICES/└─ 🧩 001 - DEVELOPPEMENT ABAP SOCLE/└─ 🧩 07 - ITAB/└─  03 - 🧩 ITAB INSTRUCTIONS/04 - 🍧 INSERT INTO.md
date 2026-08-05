# 🌸 EXERCICES — INSERT INTO ITAB

## 🌺 OBJECTIFS

- insérer une ligne selon la catégorie de table ;
- insérer à un index précis dans une table d’index ;
- insérer une ligne initiale ;
- insérer plusieurs lignes avec `LINES OF` ;
- contrôler un doublon de clé unique ;
- distinguer `INTO TABLE` et `INDEX`.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 EXERCICE 1 — INSERTION GÉNÉRIQUE

Créer une table triée :

```abap
DATA lt_orders_sorted TYPE SORTED TABLE OF ty_order
  WITH UNIQUE KEY order_id.
```

Insérer les lignes dans l’ordre :

```text
4500000003
4500000001
4500000002
```

Utiliser :

```abap
INSERT VALUE #( ... ) INTO TABLE lt_orders_sorted.
```

Afficher la table et contrôler `sy-subrc` après chaque insertion.

## 🌺 EXERCICE 2 — DOUBLON

Tenter d’insérer une deuxième ligne avec :

```text
order_id = 4500000002
```

Résultat attendu :

```text
Insertion refusée : clé déjà présente
```

La ligne existante ne doit pas être remplacée.

## 🌺 EXERCICE 3 — INDEX PRÉCIS

Dans une table standard contenant :

```text
A
C
D
```

insérer `B` à l’index `2`.

Résultat attendu :

```text
A
B
C
D
```

Utiliser :

```abap
INSERT lv_value INTO lt_values INDEX 2.
```

## 🌺 EXERCICE 4 — LIGNE INITIALE ASSIGNÉE

Créer une ligne directement dans une table standard :

```abap
INSERT INITIAL LINE
  INTO lt_orders INDEX 1
  ASSIGNING FIELD-SYMBOL(<lfs_order>).
```

Alimenter la ligne par le field-symbol.

Contrôler que le field-symbol est assigné.

## 🌺 EXERCICE 5 — PLUSIEURS LIGNES

Créer une table source contenant cinq nombres.

Insérer les lignes `2` à `4` au début d’une table cible :

```abap
INSERT LINES OF lt_source
  FROM 2 TO 4
  INTO lt_target
  INDEX 1.
```

Prévoir le résultat.

## 🌺 EXERCICE 6 — MAUVAISE CATÉGORIE

Analyser :

```abap
INSERT ls_order INTO lt_orders_hashed INDEX 1.
```

Répondre :

1. une table hachée possède-t-elle un index primaire ?
2. cette syntaxe est-elle adaptée ?
3. quelle syntaxe faut-il utiliser ?
4. quelle clé doit être fournie par la ligne ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] `INTO TABLE` est utilisé pour l’insertion générique.
- [ ] Le doublon unique est contrôlé.
- [ ] L’insertion par index est limitée aux tables d’index.
- [ ] La ligne initiale est alimentée par un field-symbol assigné.
- [ ] `LINES OF` évite une boucle manuelle.
- [ ] Une table hachée n’est pas traitée comme une table indexée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lt_orders_sorted TYPE SORTED TABLE OF ty_order
  WITH UNIQUE KEY order_id.

INSERT VALUE #( order_id = '4500000003' )
  INTO TABLE lt_orders_sorted.

INSERT VALUE #( order_id = '4500000001' )
  INTO TABLE lt_orders_sorted.

INSERT VALUE #( order_id = '4500000002' )
  INTO TABLE lt_orders_sorted.

INSERT VALUE #( order_id = '4500000002' )
  INTO TABLE lt_orders_sorted.

IF sy-subrc <> 0.
  WRITE / 'Insertion refusée : clé déjà présente'.
ENDIF.
```

Insertion par index :

```abap
DATA lt_values TYPE STANDARD TABLE OF string
  WITH EMPTY KEY.

lt_values = VALUE #( ( `A` ) ( `C` ) ( `D` ) ).

INSERT `B` INTO lt_values INDEX 2.
```

Ligne initiale :

```abap
INSERT INITIAL LINE
  INTO lt_orders INDEX 1
  ASSIGNING FIELD-SYMBOL(<lfs_order>).

IF <lfs_order> IS ASSIGNED.
  <lfs_order>-order_id = '4500000099'.
  <lfs_order>-status   = 'N'.
ENDIF.
```

</details>
