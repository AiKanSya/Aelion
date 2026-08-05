# 🌸 EXERCICES — COL AS ALIAS – RENOMMER LES CHAMPS

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [COL AS ALIAS – RENOMMER LES CHAMPS](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/05 - 🍧 SELECT AS.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- renommer une colonne dans le résultat ;
- utiliser le nom d’alias dans une cible inline ;
- créer une cible préexistante avec les noms d’alias ;
- utiliser `CORRESPONDING FIELDS`;
- différencier alias de colonne et modification DDIC ;
- éviter les alias ambigus ou dupliqués.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — ALIAS SIMPLES

Exécuter :

```abap
SELECT order_id     AS id,
       customer_name AS customer,
       status       AS order_status,
       amount       AS order_amount,
       currency     AS currency
  FROM zt_<tri>_ord
  ORDER BY id
  INTO TABLE @DATA(lt_orders).
```

Afficher les composants :

```abap
ls_order-id
ls_order-customer
ls_order-order_status
ls_order-order_amount
ls_order-currency
```

## 🌺 EXERCICE 2 — NOMS DE LA CIBLE INLINE

Répondre :

1. la ligne de `lt_orders` contient-elle `ORDER_ID` ou `ID` ?
2. l’alias modifie-t-il `ZT_<TRI>_ORD-ORDER_ID` ?
3. l’alias existe-t-il après la fin du programme comme objet DDIC ?
4. pourquoi une cible inline facilite-t-elle cet exercice ?

## 🌺 EXERCICE 3 — CIBLE PRÉDÉFINIE

Définir :

```abap
TYPES: BEGIN OF ty_order_output,
         id           TYPE zde_<tri>_oid,
         customer     TYPE zde_<tri>_name,
         order_status TYPE zde_<tri>_stat,
         note         TYPE c LENGTH 20,
       END OF ty_order_output.

DATA lt_order_output TYPE STANDARD TABLE OF ty_order_output
  WITH EMPTY KEY.
```

Lire :

```abap
SELECT order_id      AS id,
       customer_name AS customer,
       status        AS order_status
  FROM zt_<tri>_ord
  ORDER BY id
  INTO CORRESPONDING FIELDS OF TABLE @lt_order_output.
```

Répondre :

1. quels composants sont alimentés ?
2. quelle valeur possède `NOTE` ?
3. la correspondance utilise-t-elle la position ou le nom ?
4. que se passe-t-il si l’alias `order_status` devient `state` sans modification de la cible ?

## 🌺 EXERCICE 4 — ALIAS D’EXPRESSION

Créer une colonne calculée :

```abap
amount * 2 AS doubled_amount
```

Sélectionner également la devise.

Afficher le résultat.

> [!NOTE]
> Le type inféré de l’expression dépend des opérandes et des règles ABAP SQL. Vérifier la valeur et le type dans le débogueur ou l’éditeur.

## 🌺 EXERCICE 5 — ALIAS DUPLIQUÉ

Analyser :

```abap
SELECT order_id AS value,
       status   AS value
```

Répondre :

1. deux composants de résultat peuvent-ils porter le même nom dans une cible structurée statique ?
2. quel symptôme de syntaxe est attendu ?
3. quelle correction appliquer ?
4. pourquoi un alias doit-il rester unique et sémantique ?

## 🌺 EXERCICE 6 — ALIAS DANS WHERE

Analyser :

```abap
SELECT order_id AS id
  FROM zt_<tri>_ord
  WHERE id = @p_order
  INTO TABLE @DATA(lt_result).
```

Répondre :

1. l’alias de la liste doit-il être utilisé dans le `WHERE` du même niveau ?
2. quel nom faut-il utiliser pour filtrer la source ?
3. dans quelle clause l’alias peut-il notamment servir au tri ?
4. corriger la requête.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les alias deviennent les noms de la cible inline.
- [ ] La table DDIC reste inchangée.
- [ ] La cible prédéfinie est alimentée par noms.
- [ ] Le composant sans source reste initial.
- [ ] Une expression possède un alias.
- [ ] Les alias dupliqués sont refusés.
- [ ] La source réelle est utilisée dans `WHERE`.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT order_id      AS id,
       customer_name AS customer,
       status        AS order_status,
       amount        AS order_amount,
       currency      AS currency
  FROM zt_<tri>_ord
  ORDER BY id
  INTO TABLE @DATA(lt_orders).

LOOP AT lt_orders INTO DATA(ls_order).
  WRITE: / ls_order-id,
           ls_order-customer,
           ls_order-order_status,
           ls_order-order_amount,
           ls_order-currency.
ENDLOOP.
```

Correction du filtre :

```abap
SELECT order_id AS id
  FROM zt_<tri>_ord
  WHERE order_id = @p_order
  INTO TABLE @DATA(lt_result).
```

</details>
