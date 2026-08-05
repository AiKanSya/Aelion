# 🌸 EXERCICES — INTO – STOCKER LES RESULTATS D'UN SELECT

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [INTO – STOCKER LES RESULTATS D'UN SELECT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/08 - 🍧 INTO.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- sélectionner dans une variable ;
- sélectionner dans une structure ;
- sélectionner dans une table ;
- utiliser une déclaration inline ;
- comprendre l’affectation positionnelle ;
- utiliser `CORRESPONDING FIELDS`;
- distinguer remplacement et ajout ;
- éviter un mélange involontaire de résultats.

## 🌺 DURÉE INDICATIVE

70 à 85 minutes.

## 🌺 EXERCICE 1 — VARIABLE SIMPLE

Lire uniquement le nom de la commande `0000000001` :

```abap
SELECT SINGLE customer_name
  FROM zt_<tri>_ord
  WHERE order_id = '0000000001'
  INTO @DATA(lv_customer_name).
```

Résultat attendu :

```text
Alice Martin
```

## 🌺 EXERCICE 2 — PLUSIEURS VARIABLES

Lire :

```text
ORDER_ID
STATUS
AMOUNT
CURRENCY
```

dans plusieurs variables.

Utiliser les parenthèses :

```abap
INTO ( @DATA(lv_order_id),
       @DATA(lv_status),
       @DATA(lv_amount),
       @DATA(lv_currency) ).
```

Vérifier que l’ordre des variables correspond à l’ordre de la liste.

## 🌺 EXERCICE 3 — STRUCTURE INLINE

Lire une commande avec :

```abap
INTO @DATA(ls_order)
```

Répondre :

1. quels noms possèdent les composants ?
2. les types sont-ils inférés depuis la liste ?
3. la structure existe-t-elle avant la requête ?
4. pourquoi cette forme réduit-elle les déclarations manuelles ?

## 🌺 EXERCICE 4 — TABLE INLINE

Lire toutes les commandes :

```abap
INTO TABLE @DATA(lt_orders)
```

Afficher `lines( lt_orders )`.

Résultat attendu :

```text
3
```

## 🌺 EXERCICE 5 — REMPLACEMENT

Préparer une table cible contenant une ligne technique :

```text
TECHNIQUE
```

Exécuter ensuite :

```abap
SELECT ...
  INTO TABLE @lt_result.
```

Répondre :

1. la ligne technique reste-t-elle ?
2. quel comportement possède `INTO TABLE` ?
3. quel mot-clé utiliser pour conserver les lignes existantes ?
4. faut-il mélanger des lignes de provenance différente sans les distinguer ?

## 🌺 EXERCICE 6 — APPENDING

1. sélectionner les commandes EUR dans `lt_result`;
2. ajouter ensuite les commandes USD avec `APPENDING TABLE`.

Résultat attendu :

```text
3 lignes
```

Répondre :

1. l’ordre final dépend-il de l’ordre des deux lectures ?
2. les doublons sont-ils automatiquement supprimés ?
3. que se passe-t-il si les deux sélections se chevauchent ?
4. quelle clé de table interne pourrait refuser un doublon ?
5. faut-il contrôler les insertions générées vers une cible à clé unique ?

## 🌺 EXERCICE 7 — AFFECTATION POSITIONNELLE

Définir :

```abap
TYPES: BEGIN OF ty_wrong_target,
         status   TYPE zde_<tri>_stat,
         order_id TYPE zde_<tri>_oid,
       END OF ty_wrong_target.
```

Analyser :

```abap
SELECT order_id,
       status
  FROM zt_<tri>_ord
  INTO TABLE @DATA(lt_source_order).
```

Puis une variante vers une cible prédéfinie sans `CORRESPONDING`.

Répondre :

1. l’affectation dépend-elle de la position ?
2. le premier champ source est-il compatible avec `STATUS` ?
3. quels risques de conversion ou de troncature existent ?
4. quelle correction appliquer ?

## 🌺 EXERCICE 8 — CORRESPONDING FIELDS

Définir :

```abap
TYPES: BEGIN OF ty_display,
         status        TYPE zde_<tri>_stat,
         order_id      TYPE zde_<tri>_oid,
         customer_name TYPE zde_<tri>_name,
         note          TYPE c LENGTH 20,
       END OF ty_display.

DATA lt_display TYPE STANDARD TABLE OF ty_display
  WITH EMPTY KEY.
```

Lire :

```abap
SELECT order_id,
       customer_name,
       status
  FROM zt_<tri>_ord
  ORDER BY order_id
  INTO CORRESPONDING FIELDS OF TABLE @lt_display.
```

Résultats :

- les trois composants communs sont alimentés ;
- `NOTE` est initiale.

## 🌺 EXERCICE 9 — APPENDING CORRESPONDING

Ajouter à `lt_display` les commandes clôturées après une première sélection des commandes non clôturées.

Contrôler le nombre final et l’ordre.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La variable simple est alimentée.
- [ ] L’ordre des variables multiples est correct.
- [ ] La structure inline est comprise.
- [ ] La table inline contient trois lignes.
- [ ] `INTO TABLE` remplace la cible.
- [ ] `APPENDING TABLE` conserve la cible.
- [ ] Les doublons potentiels sont anticipés.
- [ ] La position est distinguée de la correspondance par nom.
- [ ] Le composant sans source reste initial.
- [ ] Les résultats mélangés restent identifiables.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — variables

```abap
SELECT SINGLE order_id,
              status,
              amount,
              currency
  FROM zt_<tri>_ord
  WHERE order_id = '0000000001'
  INTO ( @DATA(lv_order_id),
         @DATA(lv_status),
         @DATA(lv_amount),
         @DATA(lv_currency) ).
```

### Solution — remplacement et ajout

```abap
SELECT order_id,
       status,
       amount,
       currency
  FROM zt_<tri>_ord
  WHERE currency = 'EUR'
  ORDER BY order_id
  INTO TABLE @DATA(lt_result).

SELECT order_id,
       status,
       amount,
       currency
  FROM zt_<tri>_ord
  WHERE currency = 'USD'
  ORDER BY order_id
  APPENDING TABLE @lt_result.
```

### Solution — correspondance

```abap
SELECT order_id,
       customer_name,
       status
  FROM zt_<tri>_ord
  ORDER BY order_id
  INTO CORRESPONDING FIELDS OF TABLE @lt_display.
```

Correction de la cible inversée :

```abap
SELECT order_id,
       status
  FROM zt_<tri>_ord
  INTO CORRESPONDING FIELDS OF TABLE @lt_target.
```

</details>
