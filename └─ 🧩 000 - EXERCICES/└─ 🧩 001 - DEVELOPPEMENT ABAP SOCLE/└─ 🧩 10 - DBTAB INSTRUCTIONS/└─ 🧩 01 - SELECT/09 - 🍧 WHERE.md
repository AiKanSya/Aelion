# 🌸 EXERCICES — WHERE – FILTRER LES RESULTATS D'UN SELECT

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [WHERE – FILTRER LES RESULTATS D'UN SELECT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/09 - 🍧 WHERE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- filtrer avec des comparaisons ;
- combiner `AND` et `OR`;
- utiliser des parenthèses ;
- utiliser `BETWEEN`;
- utiliser une table de sélection avec `IN`;
- utiliser `LIKE`;
- utiliser une sous-requête ;
- distinguer filtre SQL et filtre ABAP après lecture ;
- écrire des conditions sélectives et lisibles.

## 🌺 DURÉE INDICATIVE

75 à 90 minutes.

## 🌺 EXERCICE 1 — COMPARAISONS

Créer des sélections séparées :

| Besoin                             | Condition |
| ---------------------------------- | --------- |
| Statut égal à `N`                  |           |
| Statut différent de `C`            |           |
| Montant supérieur à `75,00`        |           |
| Priorité supérieure ou égale à `2` |           |
| Montant inférieur à `100,00`       |           |
| Priorité inférieure ou égale à `2` |           |

## 🌺 EXERCICE 2 — AND

Sélectionner les commandes :

```text
EUR
non clôturées
montant >= 75,00
```

Résultat attendu :

```text
0000000001
0000000002
```

## 🌺 EXERCICE 3 — OR ET PARENTHÈSES

Règle métier :

```text
Statut N ou P
ET
Devise EUR
```

Écrire :

```abap
WHERE ( status = 'N' OR status = 'P' )
  AND currency = 'EUR'
```

Comparer avec :

```abap
WHERE status = 'N'
   OR status = 'P'
  AND currency = 'EUR'
```

Tester théoriquement le cas :

```text
Statut N
Devise USD
```

Expliquer la différence.

## 🌺 EXERCICE 4 — BETWEEN

Sélectionner les montants compris entre :

```text
75,00
et
125,50
```

Bornes incluses.

Résultat attendu :

```text
0000000001
0000000002
```

## 🌺 EXERCICE 5 — TABLE DE SÉLECTION

Déclarer :

```abap
DATA lr_status TYPE RANGE OF zde_<tri>_stat.

lr_status = VALUE #(
  ( sign = 'I' option = 'EQ' low = 'N' )
  ( sign = 'I' option = 'EQ' low = 'P' )
).
```

Utiliser :

```abap
WHERE status IN @lr_status
```

Résultat attendu :

```text
0000000001
0000000002
```

Tester une table de sélection vide.

Répondre :

1. `IN @lr_status` avec une table vide restreint-il le résultat ?
2. quelles lignes satisfont alors cette expression ?
3. faut-il confondre ce comportement avec `FOR ALL ENTRIES` vide ?
4. pourquoi les deux constructions doivent-elles être distinguées ?

## 🌺 EXERCICE 6 — LIKE

Déclarer :

```abap
DATA lv_pattern TYPE zde_<tri>_name
  VALUE '%Martin%'.
```

Sélectionner les clients correspondant au motif.

Résultat attendu :

```text
Alice Martin
Claire Martin
```

Répondre :

1. que signifie `%` ?
2. que signifie `_` ?
3. la casse dépend-elle du système de base et des règles SQL ?
4. faut-il supposer un comportement de casse identique sur tous les systèmes ?
5. comment tester le comportement réel ?

## 🌺 EXERCICE 7 — SOUS-REQUÊTE

Sélectionner les commandes dont le statut possède un libellé contenant :

```text
préparation
```

Exemple :

```abap
DATA lv_status_pattern TYPE zde_<tri>_sttxt
  VALUE '%préparation%'.

SELECT order_id,
       status
  FROM zt_<tri>_ord
  WHERE status IN (
    SELECT status
      FROM zt_<tri>_stat
      WHERE status_text LIKE @lv_status_pattern )
  INTO TABLE @DATA(lt_orders).
```

Résultat attendu :

```text
0000000002
```

Adapter le motif au comportement de casse réellement observé.

## 🌺 EXERCICE 8 — FILTRE SQL OU ABAP

Comparer :

### Variante A

```text
Lire toutes les commandes
CHECK amount >= 75 après lecture
```

### Variante B

```text
WHERE amount >= 75
```

Répondre :

1. quelle variante transfère le moins de lignes ?
2. où le filtre est-il exécuté ?
3. faut-il toujours pousser une règle complexe en base sans vérifier sa compatibilité ?
4. quel principe général appliquer aux filtres simples ?

## 🌺 EXERCICE 9 — VARIABLE SANS @

Analyser :

```abap
DATA lv_status TYPE zde_<tri>_stat VALUE 'N'.

SELECT order_id
  FROM zt_<tri>_ord
  WHERE status = lv_status
  INTO TABLE @DATA(lt_result).
```

Dans une syntaxe moderne stricte, corriger :

```abap
WHERE status = @lv_status
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les six comparaisons sont produites.
- [ ] Les deux commandes EUR sont retournées.
- [ ] Les parenthèses traduisent la règle métier.
- [ ] `BETWEEN` inclut les bornes.
- [ ] Une table de sélection est utilisée.
- [ ] Une table de sélection vide est distinguée d’un FAE vide.
- [ ] Le motif retourne les deux Martin.
- [ ] La sous-requête retourne la commande `P`.
- [ ] Le filtre simple est appliqué dans le `WHERE`.
- [ ] Les variables hôtes utilisent `@`.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SELECT order_id,
       customer_name,
       status,
       amount,
       currency
  FROM zt_<tri>_ord
  WHERE currency = 'EUR'
    AND status <> 'C'
    AND amount >= '75.00'
  ORDER BY order_id
  INTO TABLE @DATA(lt_orders).
```

Table de sélection :

```abap
SELECT order_id,
       status
  FROM zt_<tri>_ord
  WHERE status IN @lr_status
  ORDER BY order_id
  INTO TABLE @DATA(lt_status_orders).
```

Une table de sélection vide utilisée avec `IN` rend l’expression vraie pour toutes les lignes. Elle n’applique donc aucune restriction.

Ce résultat peut ressembler à celui d’un `FOR ALL ENTRIES` vide, mais les mécanismes diffèrent :

- `IN @range` applique la sémantique d’une table de sélection initiale ;
- `FOR ALL ENTRIES` ignore la condition dépendant de la table pilote vide.

</details>
