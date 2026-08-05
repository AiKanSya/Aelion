# 🌸 EXERCICES — ORDER BY – TRI DES RESULTATS

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ORDER BY – TRI DES RESULTATS](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/11 - 🍧 ORDER BY.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- imposer un ordre ;
- utiliser plusieurs colonnes ;
- utiliser `ASCENDING` et `DESCENDING`;
- utiliser `ORDER BY PRIMARY KEY`;
- choisir les premières lignes selon un ordre ;
- trier un résultat agrégé ;
- distinguer tri SQL et tri ABAP ;
- ne pas supposer un ordre implicite.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 EXERCICE 1 — ORDRE PAR CLÉ

Lire toutes les commandes avec :

```abap
ORDER BY order_id ASCENDING
```

Résultat attendu :

```text
0000000001
0000000002
0000000003
```

## 🌺 EXERCICE 2 — MONTANT DÉCROISSANT

Trier par :

```text
AMOUNT décroissant
ORDER_ID croissant
```

Résultat attendu :

```text
0000000001 - 125,50
0000000002 - 75,00
0000000003 - 50,00
```

Répondre :

1. pourquoi ajouter `ORDER_ID` ?
2. que se passe-t-il si deux montants sont égaux ?
3. le deuxième critère rend-il l’ordre total plus déterministe ?

## 🌺 EXERCICE 3 — PLUSIEURS CRITÈRES

Trier :

```text
Devise croissante
Montant décroissant
Commande croissante
```

Prévoir puis exécuter le résultat.

## 🌺 EXERCICE 4 — PRIMARY KEY

Exécuter :

```abap
SELECT *
  FROM zt_<tri>_ord
  ORDER BY PRIMARY KEY
  INTO TABLE @DATA(lt_orders).
```

Répondre :

1. quels champs composent la clé primaire DDIC ?
2. le mandant est-il visible dans le résultat ?
3. dans le mandant courant, quel champ détermine principalement l’ordre observé ?
4. `PRIMARY KEY` peut-il être utilisé comme ordre métier si la clé ne correspond pas au besoin ?

## 🌺 EXERCICE 5 — TOP 2

Sélectionner les deux commandes au montant le plus élevé :

```abap
SELECT order_id,
       amount,
       currency
  FROM zt_<tri>_ord
  ORDER BY amount DESCENDING,
           order_id ASCENDING
  INTO TABLE @DATA(lt_top_orders)
  UP TO 2 ROWS.
```

Résultat attendu :

```text
0000000001
0000000002
```

Pourquoi faut-il appliquer `ORDER BY` avant la limite logique ?

## 🌺 EXERCICE 6 — SANS ORDER BY

Exécuter plusieurs fois une lecture sans ordre.

Répondre :

1. l’ordre peut-il sembler stable ?
2. cette observation constitue-t-elle une garantie ?
3. un transport, un plan SQL ou une évolution de base peut-il modifier l’ordre ?
4. quelle correction appliquer lorsque l’ordre fait partie du besoin ?

## 🌺 EXERCICE 7 — AGRÉGATION PAR DEVISE

Exécuter :

```abap
SELECT currency,
       COUNT( * ) AS order_count,
       SUM( amount ) AS total_amount
  FROM zt_<tri>_ord
  GROUP BY currency
  ORDER BY total_amount DESCENDING
  INTO TABLE @DATA(lt_totals).
```

Résultat attendu :

```text
EUR - 2 - 200,50
USD - 1 - 50,00
```

Répondre :

1. pourquoi le montant est-il groupé par devise ?
2. peut-on additionner directement toutes les devises ?
3. l’alias `total_amount` facilite-t-il le tri ?
4. quelle colonne doit figurer dans `GROUP BY` ?

## 🌺 EXERCICE 8 — ORDER BY OU SORT

Comparer :

### Variante A

```abap
SELECT ... ORDER BY ...
```

### Variante B

```abap
SELECT ...
SORT lt_result ...
```

Répondre :

1. quelle variante est nécessaire pour `UP TO 2 ROWS` déterministe ?
2. quelle variante peut servir lorsque les mêmes données sont retriées plusieurs fois en ABAP ?
3. faut-il transférer toutes les lignes si seules les deux premières sont nécessaires ?
4. où le tri doit-il être réalisé selon le besoin ?

## 🌺 EXERCICE 9 — DISTINCT ET ORDER BY

Lire les devises distinctes et les trier.

La colonne du tri doit être disponible dans le résultat.

## 🌺 EXERCICE 10 — SELECT SINGLE

Analyser :

```text
SELECT SINGLE ... ORDER BY ...
```

Répondre :

1. `SELECT SINGLE` est-il conçu pour choisir selon un ordre ?
2. quelle construction utiliser ?
3. quel critère de départage faut-il ajouter ?
4. pourquoi une cible table limitée est-elle simple dans cet exercice ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’ordre par identifiant est correct.
- [ ] Le tri décroissant est correct.
- [ ] Un critère de départage est utilisé.
- [ ] `PRIMARY KEY` est compris.
- [ ] Le top 2 est déterministe.
- [ ] L’absence d’ordre n’est pas considérée comme stable.
- [ ] Les agrégats sont séparés par devise.
- [ ] `ORDER BY` est distingué de `SORT`.
- [ ] `DISTINCT` est trié correctement.
- [ ] `SELECT SINGLE` n’est pas utilisé avec un besoin d’ordre.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT order_id,
       amount,
       currency
  FROM zt_<tri>_ord
  ORDER BY amount DESCENDING,
           order_id ASCENDING
  INTO TABLE @DATA(lt_orders).
```

Agrégation :

```abap
SELECT currency,
       COUNT( * ) AS order_count,
       SUM( amount ) AS total_amount
  FROM zt_<tri>_ord
  GROUP BY currency
  ORDER BY total_amount DESCENDING
  INTO TABLE @DATA(lt_totals).
```

Le tri SQL est indispensable lorsque la limite doit s’appliquer aux premières lignes d’un ordre métier.

</details>
