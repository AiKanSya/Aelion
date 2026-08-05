# 🌸 EXERCICES — SELECT ALL – EXTRACTION DE PLUSIEURS ENREGISTREMENTS

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [SELECT ALL – EXTRACTION DE PLUSIEURS ENREGISTREMENTS](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 10 - DBTAB INSTRUCTIONS/└─ 🧩 01 - SELECT/03 - 🍧 SELECT ALL.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- expliquer la rectification du titre `SELECT ALL`;
- distinguer toutes les lignes de toutes les colonnes ;
- utiliser `SELECT *`;
- sélectionner une liste explicite de colonnes ;
- déclarer une cible compatible ;
- mesurer l’impact fonctionnel d’une extension de table ;
- éviter un `SELECT *` inutile dans une jointure ou une API stable.

## 🌺 DURÉE INDICATIVE

45 à 60 minutes.

## 🌺 EXERCICE 1 — DEUX DIMENSIONS

Compléter :

| Besoin                                    | Syntaxe principale |
| ----------------------------------------- | ------------------ |
| Toutes les lignes correspondant au filtre |                    |
| Toutes les colonnes                       |                    |
| Plusieurs lignes dans une table interne   |                    |
| Une seule ligne                           |                    |
| Colonnes précises                         |                    |

Répondre :

1. `*` agit-il sur les lignes ou sur les colonnes ?
2. `WHERE` agit-il sur les lignes ou sur les colonnes ?
3. `INTO TABLE` agit-il sur la source ou sur la cible ?
4. le titre `SELECT ALL` doit-il être interprété comme un mot-clé autonome dans les exercices ?

## 🌺 EXERCICE 2 — SELECT \*

Déclarer :

```abap
DATA lt_orders_full TYPE STANDARD TABLE OF zt_<tri>_ord
  WITH EMPTY KEY.
```

Lire uniquement les commandes EUR :

```abap
SELECT *
  FROM zt_<tri>_ord
  WHERE currency = 'EUR'
  ORDER BY order_id
  INTO TABLE @lt_orders_full.
```

Afficher :

- identifiant ;
- client ;
- priorité ;
- statut ;
- montant ;
- devise ;
- auteur ;
- date.

## 🌺 EXERCICE 3 — LISTE EXPLICITE

Écrire une requête équivalente pour le besoin suivant :

```text
Afficher identifiant, statut, montant et devise.
```

Comparer :

| Critère                                    | `SELECT *` | Liste explicite |
| ------------------------------------------ | ---------- | --------------- |
| Nombre de colonnes transférées             |            |                 |
| Dépendance à une extension future          |            |                 |
| Lisibilité du besoin                       |            |                 |
| Cible identique à la table DDIC nécessaire |            |                 |

## 🌺 EXERCICE 4 — EXTENSION FUTURE

La table reçoit ultérieurement dix nouveaux champs techniques.

Répondre :

1. `SELECT *` les lira-t-il automatiquement ?
2. le programme en a-t-il automatiquement besoin ?
3. une liste explicite changera-t-elle ?
4. pourquoi une liste explicite stabilise-t-elle mieux le contrat de lecture ?
5. faut-il interdire absolument `SELECT *` dans tous les cas ?

## 🌺 EXERCICE 5 — DISTINCT \*

Analyser :

```abap
SELECT DISTINCT *
  FROM zt_<tri>_ord
  INTO TABLE @DATA(lt_distinct_orders).
```

Répondre :

1. une table possède-t-elle une clé primaire empêchant deux lignes physiques identiques sur toute la clé ?
2. le résultat contient-il normalement des doublons complets ?
3. `DISTINCT *` apporte-t-il une valeur dans ce cas ?
4. quel coût supplémentaire peut être demandé au moteur SQL ?
5. quelle correction appliquer ?

## 🌺 EXERCICE 6 — CIBLE INCOMPATIBLE

Analyser :

```abap
TYPES: BEGIN OF ty_short_order,
         order_id TYPE zde_<tri>_oid,
         status   TYPE zde_<tri>_stat,
       END OF ty_short_order.

DATA lt_short_orders TYPE STANDARD TABLE OF ty_short_order
  WITH EMPTY KEY.

SELECT *
  FROM zt_<tri>_ord
  INTO TABLE @lt_short_orders.
```

Répondre :

1. la ligne cible possède-t-elle tous les composants sélectionnés ?
2. la compatibilité positionnelle est-elle assurée ?
3. quelle correction faut-il appliquer ?
4. faut-il sélectionner deux champs ou utiliser `CORRESPONDING FIELDS` ?
5. quelle version est la plus explicite ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les lignes et les colonnes sont distinguées.
- [ ] `SELECT *` est testé sur la table pédagogique.
- [ ] Une liste explicite est produite.
- [ ] L’effet d’une extension est compris.
- [ ] `SELECT *` n’est pas interdit sans nuance.
- [ ] `DISTINCT *` est reconnu comme redondant ici.
- [ ] La cible courte reçoit uniquement les champs nécessaires.

<details>
<summary>🍧 Afficher la solution</summary>

| Besoin                         | Syntaxe                           |
| ------------------------------ | --------------------------------- |
| Lignes correspondant au filtre | `WHERE`                           |
| Toutes les colonnes            | `*`                               |
| Plusieurs lignes               | `INTO TABLE`                      |
| Une ligne                      | `SELECT SINGLE` ou limite adaptée |
| Colonnes précises              | liste de sélection                |

Correction de la cible courte :

```abap
SELECT order_id,
       status
  FROM zt_<tri>_ord
  ORDER BY order_id
  INTO TABLE @lt_short_orders.
```

Variante par noms :

```abap
SELECT order_id,
       status
  FROM zt_<tri>_ord
  ORDER BY order_id
  INTO CORRESPONDING FIELDS OF TABLE @lt_short_orders.
```

La liste explicite reste la version la plus directe lorsque la cible contient exactement les deux colonnes.

</details>
