# 🌸 EXERCICES — SORT

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [SORT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/03 - 🍧 SORT.md>)

## 🌺 OBJECTIFS

- trier une table standard ;
- utiliser plusieurs composants ;
- combiner ordre croissant et décroissant ;
- utiliser `STABLE` ;
- expliquer `AS TEXT` ;
- préparer une table pour `BINARY SEARCH` et `DELETE ADJACENT DUPLICATES`.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — TRI SIMPLE

À partir des données communes, exécuter :

```abap
SORT lt_orders BY order_id.
```

Résultat attendu :

```text
4500000001
4500000002
4500000003
4500000004
```

## 🌺 EXERCICE 2 — TRI MULTIPLE

Trier par :

1. pays croissant ;
2. client croissant ;
3. montant décroissant.

Syntaxe attendue :

```abap
SORT lt_orders
  BY country ASCENDING
     customer_id ASCENDING
     amount DESCENDING.
```

Prévoir l’ordre avant l’exécution.

## 🌺 EXERCICE 3 — TRI STABLE

Créer une table contenant :

```text
A - priorité 2 - ligne 1
B - priorité 1 - ligne 2
C - priorité 2 - ligne 3
D - priorité 1 - ligne 4
```

Trier uniquement par priorité avec :

```abap
SORT lt_data STABLE BY priority.
```

Résultat attendu :

```text
B
D
A
C
```

Expliquer ce que préserve `STABLE`.

## 🌺 EXERCICE 4 — `AS TEXT`

Déclarer une table de chaînes contenant des valeurs avec majuscules, minuscules et caractères accentués.

Exécuter :

```abap
SORT lt_names AS TEXT.
```

Répondre :

1. de quel paramétrage dépend l’ordre linguistique ?
2. peut-on imposer un résultat universel identique sur tous les systèmes ?
3. pourquoi le test doit-il relever l’ordre obtenu plutôt que l’inventer ?

## 🌺 EXERCICE 5 — TRI INCOMPLET

La table doit être utilisée avec :

```abap
READ TABLE lt_orders
  WITH KEY
    country = 'FR'
    customer_id = 'C10001'
  BINARY SEARCH.
```

Les tris suivants sont-ils compatibles ?

| Tri                                 | Compatible |
| ----------------------------------- | ---------- |
| `BY country customer_id`            |            |
| `BY customer_id country`            |            |
| `BY country amount customer_id`     |            |
| `BY country customer_id amount`     |            |
| `BY country DESCENDING customer_id` |            |

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le tri simple est correct.
- [ ] Le tri multiple respecte les trois critères.
- [ ] `STABLE` conserve l’ordre relatif des lignes égales.
- [ ] `AS TEXT` est relié au paramétrage linguistique.
- [ ] Les prérequis de la recherche binaire sont anticipés.
- [ ] Le tri ne transforme pas la catégorie de table.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SORT lt_orders
  BY country ASCENDING
     customer_id ASCENDING
     amount DESCENDING.
```

Ordre attendu :

```text
DE - C10002 - 90,00
FR - C10001 - 125,50
FR - C10001 - 75,00
FR - C10003 - 50,00
```

| Tri                                 | Compatible |
| ----------------------------------- | ---------- |
| `BY country customer_id`            | Oui        |
| `BY customer_id country`            | Non        |
| `BY country amount customer_id`     | Non        |
| `BY country customer_id amount`     | Oui        |
| `BY country DESCENDING customer_id` | Non        |

Les composants recherchés doivent constituer le début du tri, dans le même ordre et en ordre croissant.

</details>
