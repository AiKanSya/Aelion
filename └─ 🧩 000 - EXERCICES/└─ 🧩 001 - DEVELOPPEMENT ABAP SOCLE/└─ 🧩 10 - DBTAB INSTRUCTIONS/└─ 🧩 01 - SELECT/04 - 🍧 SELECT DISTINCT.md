# 🌸 EXERCICES — SELECT DISTINCT – EXTRACTION DE VALEURS UNIQUES

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- obtenir des valeurs uniques ;
- expliquer la combinaison de colonnes ;
- distinguer `DISTINCT` d’une suppression dans la base ;
- trier le résultat ;
- comparer `DISTINCT` et un dédoublonnage ABAP ;
- éviter une colonne qui annule l’effet recherché.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — DEVISES UNIQUES

Lire les devises distinctes :

```abap
SELECT DISTINCT currency
  FROM zt_<tri>_ord
  ORDER BY currency
  INTO TABLE @DATA(lt_currencies).
```

Résultat attendu :

```text
EUR
USD
```

## 🌺 EXERCICE 2 — STATUTS UNIQUES

Résultat attendu :

```text
C
N
P
```

Utiliser un ordre croissant explicite.

## 🌺 EXERCICE 3 — COMBINAISONS

Sélectionner :

```text
STATUS + CURRENCY
```

Résultat attendu :

```text
C - USD
N - EUR
P - EUR
```

Répondre :

1. l’unicité porte-t-elle uniquement sur `STATUS` ?
2. deux lignes ayant le même statut mais des devises différentes seraient-elles conservées ?
3. pourquoi l’ordre des colonnes sélectionnées ne change-t-il pas la notion de combinaison ?
4. l’ordre d’affichage est-il garanti sans `ORDER BY` ?

## 🌺 EXERCICE 4 — COLONNE QUI EMPÊCHE LE DÉDOUBLONNAGE

Le besoin est :

```text
Obtenir les clients uniques.
```

Analyser :

```abap
SELECT DISTINCT customer_name,
                order_id
  FROM zt_<tri>_ord
  INTO TABLE @DATA(lt_customers).
```

Répondre :

1. `ORDER_ID` est-il différent pour chaque commande ?
2. Alice et une éventuelle deuxième commande Alice pourraient-elles être dédupliquées ?
3. quelle colonne faut-il retirer ?
4. quel risque métier existe avec deux clients différents portant le même nom ?
5. quelle clé métier serait préférable si elle existait ?

## 🌺 EXERCICE 5 — DISTINCT OU ABAP

Comparer :

### Variante SQL

```abap
SELECT DISTINCT status
```

### Variante ABAP

```abap
SELECT status ...
SORT lt_status.
DELETE ADJACENT DUPLICATES ...
```

Répondre :

1. quelle variante évite de transférer les doublons à l’application ?
2. dans quel cas le dédoublonnage ABAP peut-il rester utile ?
3. faut-il appliquer les deux mécanismes sans raison ?
4. où le besoin doit-il idéalement être traité ?

## 🌺 EXERCICE 6 — TABLE SOURCE INCHANGÉE

Après le `SELECT DISTINCT`, vérifier avec `SE16N` que la table possède toujours ses trois commandes.

Expliquer pourquoi aucune ligne n’a été supprimée.

## 🌺 EXERCICE 7 — CAS VIDE

Filtrer :

```text
CURRENCY = JPY
```

Résultat attendu :

```text
Aucune devise
```

Contrôler `sy-subrc`.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les deux devises sont retournées.
- [ ] Les trois statuts sont retournés.
- [ ] La combinaison complète est comprise.
- [ ] Une colonne unique n’annule pas l’objectif de dédoublonnage.
- [ ] Le dédoublonnage est effectué à l’endroit pertinent.
- [ ] La table source reste inchangée.
- [ ] Le cas absent est traité.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT DISTINCT currency
  FROM zt_<tri>_ord
  ORDER BY currency ASCENDING
  INTO TABLE @DATA(lt_currencies).

IF sy-subrc = 0.
  LOOP AT lt_currencies INTO DATA(ls_currency).
    WRITE / ls_currency-currency.
  ENDLOOP.
ELSE.
  WRITE / 'Aucune devise'.
ENDIF.
```

Clients uniques :

```abap
SELECT DISTINCT customer_name
  FROM zt_<tri>_ord
  ORDER BY customer_name
  INTO TABLE @DATA(lt_customer_names).
```

Le nom n’est pas une clé métier fiable. Deux personnes différentes peuvent porter le même nom.

</details>
