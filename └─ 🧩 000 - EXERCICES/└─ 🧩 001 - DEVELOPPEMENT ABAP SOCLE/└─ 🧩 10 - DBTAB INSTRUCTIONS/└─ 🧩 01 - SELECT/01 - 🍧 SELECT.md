# 🌸 EXERCICES — SELECT – LECTURE DE DONNEES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [SELECT – LECTURE DE DONNEES](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/01 - 🍧 SELECT.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- expliquer le rôle d’un `SELECT` ;
- distinguer colonnes, source, filtre et cible ;
- sélectionner plusieurs lignes dans une table interne ;
- utiliser des variables hôtes avec `@` ;
- contrôler `sy-subrc` et `sy-dbcnt` ;
- sélectionner uniquement les colonnes nécessaires ;
- identifier une lecture excessive ;
- éviter un `SELECT` répété dans une boucle.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 EXERCICE 1 — ANATOMIE D’UNE REQUÊTE

À partir du code suivant :

```abap
DATA lv_currency TYPE waers VALUE 'EUR'.

SELECT order_id,
       customer_name,
       status,
       amount,
       currency
  FROM zt_<tri>_ord
  WHERE currency = @lv_currency
  INTO TABLE @DATA(lt_orders).
```

Compléter :

| Partie             | Élément du code | Rôle |
| ------------------ | --------------- | ---- |
| Liste de sélection |                 |      |
| Source             |                 |      |
| Condition          |                 |      |
| Variable hôte      |                 |      |
| Cible              |                 |      |

Répondre :

1. quelles données sont évaluées par la base ?
2. quelle donnée appartient au programme ABAP ?
3. pourquoi `@` précède-t-il `lv_currency` ?
4. combien de colonnes sont transférées ?
5. la table source est-elle modifiée ?

## 🌺 EXERCICE 2 — LECTURE DES COMMANDES EUR

Exécuter la requête précédente.

Afficher :

```text
0000000001 - Alice Martin - N - 125,50 EUR
0000000002 - Bruno Bernard - P - 75,00 EUR
```

Après le `SELECT`, afficher :

```abap
WRITE: / |sy-subrc : { sy-subrc }|,
       / |sy-dbcnt : { sy-dbcnt }|.
```

Résultats attendus :

```text
sy-subrc : 0
sy-dbcnt : 2
```

`sy-dbcnt` doit être lu immédiatement après la sélection.

## 🌺 EXERCICE 3 — AUCUN RÉSULTAT

Utiliser :

```abap
lv_currency = 'JPY'.
```

Résultats attendus :

```text
Aucune commande trouvée
sy-subrc : 4
sy-dbcnt : 0
```

Ne pas parcourir la table comme si la lecture avait réussi.

## 🌺 EXERCICE 4 — COLONNES MINIMALES

Le besoin est uniquement :

```text
Vérifier l’existence et le statut des commandes EUR.
```

Comparer :

```abap
SELECT *
```

et :

```abap
SELECT order_id,
       status
```

Répondre :

1. quelle version transfère le moins de données ?
2. les champs `CUSTOMER_NAME`, `AMOUNT` et `CREATED_BY` sont-ils utiles au besoin ?
3. pourquoi faut-il éviter de sélectionner « au cas où » ?
4. une sélection de colonnes réduit-elle le nombre de lignes ?

## 🌺 EXERCICE 5 — LECTURE SANS FILTRE

La table pédagogique contient trois lignes.

Exécuter uniquement sur cette table `Z` :

```abap
SELECT order_id,
       status
  FROM zt_<tri>_ord
  INTO TABLE @DATA(lt_all_orders).
```

Répondre :

1. le code est-il syntaxiquement valide ?
2. le besoin porte-t-il réellement sur toutes les lignes ?
3. serait-il acceptable sur une grande table standard sans justification ?
4. quelle protection fonctionnelle peut limiter une lecture exploratoire ?

## 🌺 EXERCICE 6 — SELECT DANS UNE BOUCLE

Analyser sans conserver :

```abap
LOOP AT lt_order_ids INTO DATA(lv_order_id).

  SELECT SINGLE customer_name
    FROM zt_<tri>_ord
    WHERE order_id = @lv_order_id
    INTO @DATA(lv_customer_name).

ENDLOOP.
```

Répondre :

1. combien d’accès SQL sont exécutés pour cent identifiants ?
2. quel défaut de performance est possible ?
3. quelles stratégies de lecture en masse seront étudiées dans ce dossier ?
4. quand une lecture individuelle peut-elle rester acceptable ?
5. pourquoi faut-il mesurer le besoin réel plutôt qu’appliquer une règle absolue ?

## 🌺 EXERCICE 7 — SELECT AVEC CIBLE NON-TABLE

Analyser :

```abap
DATA lv_order_id TYPE zde_<tri>_oid.

SELECT order_id
  FROM zt_<tri>_ord
  INTO @lv_order_id.

WRITE / lv_order_id.
```

Répondre :

1. plusieurs lignes peuvent-elles être retournées ?
2. quelle structure de contrôle manque ?
3. quelle instruction doit fermer la boucle implicite ?
4. quelle variante est préférable si toutes les lignes doivent être conservées ?
5. corriger avec `INTO TABLE`.

## 🌺 LIVRABLES

- tableau d’anatomie ;
- résultat EUR ;
- résultat JPY ;
- comparaison des colonnes ;
- analyse de la lecture sans filtre ;
- analyse du `SELECT` dans une boucle ;
- correction de la cible non-table.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les cinq parties de la requête sont identifiées.
- [ ] Les deux commandes EUR sont retournées.
- [ ] Le cas absent est traité.
- [ ] `sy-subrc` et `sy-dbcnt` sont lus immédiatement.
- [ ] Les colonnes inutiles ne sont pas sélectionnées.
- [ ] Une lecture exhaustive reste limitée aux petites tables pédagogiques.
- [ ] Le `SELECT` dans une boucle est identifié.
- [ ] Une lecture multi-lignes utilise une cible table.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — anatomie

| Partie        | Code                                                |
| ------------- | --------------------------------------------------- |
| Liste         | `order_id, customer_name, status, amount, currency` |
| Source        | `zt_<tri>_ord`                                      |
| Condition     | `currency = @lv_currency`                           |
| Variable hôte | `lv_currency`                                       |
| Cible         | `lt_orders`                                         |

### Solution — programme

```abap
REPORT zaelion_<tri>_select.

DATA lv_currency TYPE waers VALUE 'EUR'.

START-OF-SELECTION.

  SELECT order_id,
         customer_name,
         status,
         amount,
         currency
    FROM zt_<tri>_ord
    WHERE currency = @lv_currency
    ORDER BY order_id
    INTO TABLE @DATA(lt_orders).

  DATA(lv_sql_subrc) = sy-subrc.
  DATA(lv_sql_count) = sy-dbcnt.

  IF lv_sql_subrc = 0.

    LOOP AT lt_orders INTO DATA(ls_order).
      WRITE: / ls_order-order_id,
               '-',
               ls_order-customer_name,
               '-',
               ls_order-status,
               '-',
               ls_order-amount,
               ls_order-currency.
    ENDLOOP.

  ELSE.
    WRITE / 'Aucune commande trouvée'.
  ENDIF.

  WRITE: / |sy-subrc : { lv_sql_subrc }|,
         / |sy-dbcnt : { lv_sql_count }|.
```

### Solution — cible table

```abap
SELECT order_id
  FROM zt_<tri>_ord
  INTO TABLE @DATA(lt_order_ids).
```

Variante avec boucle explicite, uniquement pour comprendre la syntaxe :

```abap
SELECT order_id
  FROM zt_<tri>_ord
  INTO @DATA(lv_order_id).

  WRITE / lv_order_id.

ENDSELECT.
```

</details>
