# 🌸 EXERCICES — MOVE CORRESPONDING

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [MOVE CORRESPONDING](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/09 - 🍧 MOVE-CORRESPONDING.md>)

## 🌺 OBJECTIFS

- transférer les composants communs de chaque ligne ;
- comprendre l’écrasement par défaut de la cible ;
- utiliser `KEEPING TARGET LINES`;
- distinguer ajout de lignes et fusion par clé ;
- anticiper les conversions et les doublons.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 TYPES

```abap
TYPES: BEGIN OF ty_order_source,
         order_id    TYPE c LENGTH 10,
         customer_id TYPE c LENGTH 6,
         amount      TYPE p LENGTH 8 DECIMALS 2,
         source      TYPE c LENGTH 4,
       END OF ty_order_source.

TYPES: BEGIN OF ty_order_target,
         order_id    TYPE c LENGTH 10,
         customer_id TYPE c LENGTH 6,
         amount      TYPE p LENGTH 8 DECIMALS 2,
         note        TYPE c LENGTH 20,
       END OF ty_order_target.
```

## 🌺 EXERCICE 1 — TABLE CIBLE REMPLACÉE

Préparer :

- deux lignes dans la source ;
- une ancienne ligne dans la cible avec `note = 'Ancienne ligne'`.

Exécuter :

```abap
MOVE-CORRESPONDING lt_source TO lt_target.
```

Résultat attendu :

- l’ancienne ligne cible disparaît ;
- la cible contient deux lignes ;
- `note` est initiale ;
- `source` n’est pas transféré.

## 🌺 EXERCICE 2 — CONSERVATION DES LIGNES

Recréer la cible initiale puis exécuter :

```abap
MOVE-CORRESPONDING lt_source TO lt_target
  KEEPING TARGET LINES.
```

Résultat attendu :

```text
3 lignes
```

## 🌺 EXERCICE 3 — ABSENCE DE FUSION PAR CLÉ

La cible contient déjà `4500000001`.  
La source contient également `4500000001`.

Utiliser une table standard avec clé vide et `KEEPING TARGET LINES`.

Répondre :

1. les deux lignes sont-elles conservées ?
2. l’instruction recherche-t-elle une ligne cible ayant la même clé métier ?
3. la ligne cible est-elle mise à jour ?
4. quelle logique faut-il écrire pour une véritable fusion par clé ?

## 🌺 EXERCICE 4 — COMPOSANT PROPRE À LA CIBLE

Pourquoi `note` est-elle initiale sur les lignes créées depuis la source ?

Comment l’alimenter après le transfert ?

## 🌺 EXERCICE 5 — CONVERSION

Modifier le type cible :

```abap
amount TYPE i,
```

Utiliser une source `125,50`.

Répondre :

1. les noms correspondent-ils ?
2. les types sont-ils identiques ?
3. une conversion est-elle nécessaire ?
4. la partie décimale peut-elle être perdue ou arrondie selon la conversion ?
5. pourquoi le test doit-il vérifier la valeur obtenue ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La cible est remplacée sans addition.
- [ ] `KEEPING TARGET LINES` conserve les anciennes lignes.
- [ ] Le transfert ne devient pas une fusion par clé.
- [ ] Les composants source sans cible sont ignorés.
- [ ] Les composants cible sans source sont initiaux sur les nouvelles lignes.
- [ ] Les conversions sont contrôlées.
- [ ] Les doublons sont anticipés.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lt_source TYPE STANDARD TABLE OF ty_order_source
  WITH EMPTY KEY.

DATA lt_target TYPE STANDARD TABLE OF ty_order_target
  WITH EMPTY KEY.

lt_source = VALUE #(
  ( order_id = '4500000001'
    customer_id = 'C10001'
    amount = '125.50'
    source = 'S4' )
  ( order_id = '4500000002'
    customer_id = 'C10002'
    amount = '75.00'
    source = 'S4' )
).

lt_target = VALUE #(
  ( order_id = 'OLD'
    note = 'Ancienne ligne' )
).

MOVE-CORRESPONDING lt_source TO lt_target.

WRITE / |Après remplacement : { lines( lt_target ) } lignes|.

lt_target = VALUE #(
  ( order_id = 'OLD'
    note = 'Ancienne ligne' )
).

MOVE-CORRESPONDING lt_source TO lt_target
  KEEPING TARGET LINES.

WRITE / |Après conservation : { lines( lt_target ) } lignes|.
```

Une fusion par clé exige une logique explicite :

1. lire la cible par clé ;
2. modifier la ligne existante ou insérer une nouvelle ligne ;
3. contrôler chaque opération.

</details>
