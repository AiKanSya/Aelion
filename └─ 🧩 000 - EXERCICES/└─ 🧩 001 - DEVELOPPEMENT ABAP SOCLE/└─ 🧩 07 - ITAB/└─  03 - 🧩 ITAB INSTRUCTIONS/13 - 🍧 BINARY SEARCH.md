# 🌸 EXERCICES — BINARY SEARCH

## 🌺 OBJECTIFS

- comprendre la recherche binaire ;
- préparer correctement une table standard ;
- respecter l’ordre et le préfixe de tri ;
- comparer recherche linéaire et recherche binaire ;
- préférer une clé de table adaptée lorsque le besoin est permanent ;
- ne pas utiliser l’option sur une table hachée.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 EXERCICE 1 — RECHERCHE VALIDE

Trier :

```abap
SORT lt_orders BY country customer_id order_id.
```

Lire :

```abap
READ TABLE lt_orders
  WITH KEY
    country = 'FR'
    customer_id = 'C10001'
  BINARY SEARCH
  INTO DATA(ls_order).
```

Contrôler `sy-subrc`.

## 🌺 EXERCICE 2 — PRÉFIXE INVALIDE

La table est triée par :

```abap
country customer_id order_id
```

Les recherches suivantes sont-elles compatibles ?

| Recherche                      | Compatible |
| ------------------------------ | ---------- |
| `country`                      |            |
| `country customer_id`          |            |
| `country customer_id order_id` |            |
| `customer_id`                  |            |
| `country order_id`             |            |
| `order_id`                     |            |

## 🌺 EXERCICE 3 — ORDRE DE TRI INCORRECT

Analyser :

```abap
SORT lt_orders BY customer_id country.

READ TABLE lt_orders
  WITH KEY
    country = 'FR'
    customer_id = 'C10001'
  BINARY SEARCH.
```

Répondre :

1. les composants sont-ils dans le même ordre ?
2. le résultat est-il fiable ?
3. le contrôle de syntaxe garantit-il la cohérence du tri ?
4. quelle correction faut-il appliquer ?

## 🌺 EXERCICE 4 — ORDRE DÉCROISSANT

Analyser un tri décroissant sur le premier composant recherché.

Pourquoi n’est-il pas compatible avec le prérequis de la recherche binaire classique ?

## 🌺 EXERCICE 5 — EXISTENCE SANS COPIE

Vérifier l’existence de `DE/C10002` avec :

```abap
TRANSPORTING NO FIELDS
```

Afficher `sy-tabix` uniquement si la ligne est trouvée.

## 🌺 EXERCICE 6 — CHOIX DE CONCEPTION

Un programme effectue des milliers de recherches par `order_id`.

Comparer :

1. table standard triée une fois puis `BINARY SEARCH`;
2. table triée avec clé `order_id`;
3. table hachée avec clé unique `order_id`.

Indiquer la solution la plus adaptée lorsque :

- l’ordre par clé est également nécessaire ;
- seul l’accès direct par clé complète est requis.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table est triée avant la recherche.
- [ ] Le tri est croissant.
- [ ] Les composants recherchés forment un préfixe du tri.
- [ ] L’ordre des composants est identique.
- [ ] Un tri incohérent est identifié comme un défaut fonctionnel.
- [ ] `TRANSPORTING NO FIELDS` est utilisé correctement.
- [ ] Une catégorie de table adaptée est préférée pour un besoin permanent.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
SORT lt_orders BY country customer_id order_id.

READ TABLE lt_orders
  WITH KEY
    country = 'FR'
    customer_id = 'C10001'
  BINARY SEARCH
  INTO DATA(ls_order).

IF sy-subrc = 0.
  WRITE / ls_order-order_id.
ENDIF.
```

| Recherche                      | Compatible |
| ------------------------------ | ---------- |
| `country`                      | Oui        |
| `country customer_id`          | Oui        |
| `country customer_id order_id` | Oui        |
| `customer_id`                  | Non        |
| `country order_id`             | Non        |
| `order_id`                     | Non        |

Choix :

```text
Ordre et accès par clé → SORTED TABLE
Accès direct par clé complète → HASHED TABLE
```

</details>
