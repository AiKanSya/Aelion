# 🌸 EXERCICES — TYPE HASHED TABLE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [TYPE HASHED TABLE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/05 - 🍧 ITAB TYPE HASHED.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- déclarer une table hachée ;
- définir une clé primaire unique complète ;
- insérer des lignes ;
- détecter une clé dupliquée ;
- lire une ligne par clé complète ;
- comprendre l’absence d’index primaire ;
- ne pas dépendre de l’ordre d’un `LOOP`;
- distinguer une table hachée d’une table triée ;
- choisir une table hachée pour des recherches directes par clé.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 CONTEXTE

Le programme gère un catalogue d’articles recherché principalement par identifiant.

## 🌺 EXERCICE 1 — DÉCLARATION

Définir :

```abap
TYPES: BEGIN OF ty_product,
         product_id  TYPE c LENGTH 4,
         description TYPE c LENGTH 30,
         price       TYPE p LENGTH 8 DECIMALS 2,
         currency    TYPE c LENGTH 3,
       END OF ty_product.
```

Déclarer :

```abap
DATA lt_products TYPE HASHED TABLE OF ty_product
  WITH UNIQUE KEY product_id.
```

Répondre :

1. La clé primaire peut-elle être non unique ?
2. La table possède-t-elle un index primaire numérique ?
3. L’ordre des lignes est-il garanti ?
4. Quel composant identifie une ligne ?
5. Une clé composée de plusieurs composants serait-elle possible ?

## 🌺 EXERCICE 2 — INSERTIONS

Insérer dans cet ordre :

```text
P003 - Écran - 199,90 EUR
P001 - Clavier - 29,90 EUR
P004 - Casque - 59,90 EUR
P002 - Souris - 19,90 EUR
```

Utiliser :

```abap
INSERT VALUE #( ... ) INTO TABLE lt_products.
```

Contrôler chaque insertion.

Afficher ensuite toutes les lignes.

Répondre :

1. Peut-on exiger l’ordre `P001`, `P002`, `P003`, `P004` dans l’affichage ?
2. Pourquoi un test ne doit-il pas comparer l’ordre du `LOOP` ?
3. Que doit vérifier le test à la place ?
4. Quelle catégorie choisir si l’ordre par identifiant est obligatoire ?

## 🌺 EXERCICE 3 — LECTURE PAR CLÉ

Lire :

```abap
READ TABLE lt_products
  WITH TABLE KEY product_id = 'P002'
  INTO DATA(ls_product).
```

Résultat attendu :

```text
P002 - Souris - 19,90 EUR
```

Tester également `P999`.

Résultat attendu :

```text
Produit P999 absent
```

Répondre :

1. La clé complète est-elle fournie ?
2. Un index est-il nécessaire ?
3. Faut-il trier la table avant la lecture ?
4. Quelle valeur de `sy-subrc` indique l’absence ?

## 🌺 EXERCICE 4 — DOUBLON

Tenter :

```text
P002 - Souris ergonomique - 39,90 EUR
```

Résultat attendu :

```text
Insertion refusée : P002 existe déjà
```

Vérifier ensuite que la ligne `P002` initiale existe toujours.

Répondre :

1. `INSERT` remplace-t-il automatiquement une ligne existante ?
2. Le prix devient-il `39,90` ?
3. Pourquoi un traitement distinct est-il nécessaire pour une modification ?
4. Quelle propriété métier est garantie par la clé ?

## 🌺 EXERCICE 5 — ACCÈS PAR INDEX INTERDIT

Analyser sans conserver :

```abap
READ TABLE lt_products INDEX 1
  INTO ls_product.
```

Répondre :

1. La table possède-t-elle un index primaire ?
2. Pourquoi la notion de première ligne n’est-elle pas adaptée ?
3. Quel accès faut-il utiliser ?
4. S’il faut afficher les produits dans un ordre déterminé, quelles solutions sont possibles ?

## 🌺 EXERCICE 6 — `APPEND`

Analyser :

```abap
APPEND ls_product TO lt_products.
```

Répondre :

1. Une table hachée possède-t-elle une fin logique exploitable par `APPEND` ?
2. Quelle instruction convient à toutes les catégories de table pour une insertion selon la clé ?
3. Pourquoi `INSERT ... INTO TABLE` est-il requis ici ?
4. Quelle information doit être contrôlée après l’insertion ?

## 🌺 EXERCICE 7 — CLÉ COMPOSÉE

Un prix dépend du produit et de la devise.

Définir :

```abap
TYPES: BEGIN OF ty_product_price,
         product_id TYPE c LENGTH 4,
         currency   TYPE c LENGTH 3,
         price      TYPE p LENGTH 8 DECIMALS 2,
       END OF ty_product_price.

DATA lt_product_prices TYPE HASHED TABLE OF ty_product_price
  WITH UNIQUE KEY product_id currency.
```

Insérer :

```text
P001 - EUR - 29,90
P001 - USD - 32,50
P002 - EUR - 19,90
```

Répondre :

1. Deux lignes `P001` sont-elles autorisées ?
2. Pourquoi ?
3. Une deuxième ligne `P001/EUR` est-elle autorisée ?
4. Quels composants faut-il fournir lors d’une lecture par clé primaire complète ?

## 🌺 EXERCICE 8 — TABLE TRIÉE OU HACHÉE

Compléter :

| Critère                          | `SORTED TABLE` | `HASHED TABLE` |
| -------------------------------- | -------------- | -------------- |
| Clé primaire unique possible     |                |                |
| Clé primaire non unique possible |                |                |
| Index primaire                   |                |                |
| Ordre garanti par clé            |                |                |
| Lecture par clé complète         |                |                |
| Parcours ordonné                 |                |                |
| Accès principal recherché        |                |                |

## 🌺 EXERCICE 9 — CHOIX

Choisir :

| Besoin                                            | Catégorie |
| ------------------------------------------------- | --------- |
| Dictionnaire produit par identifiant unique       |           |
| Annuaire trié et affiché par identifiant          |           |
| Historique dans l’ordre d’ajout                   |           |
| Plusieurs commandes par client, triées par client |           |
| Recherche fréquente par couple produit/devise     |           |

## 🌺 LIVRABLES

- déclaration de la table hachée ;
- insertions contrôlées ;
- affichage sans hypothèse d’ordre ;
- lectures `P002` et `P999`;
- contrôle du doublon ;
- analyse de l’accès par index ;
- analyse de `APPEND`;
- table à clé composée ;
- tableau comparatif ;
- tableau de choix.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La clé primaire est unique.
- [ ] Les insertions utilisent `INSERT`.
- [ ] L’ordre du parcours n’est pas considéré comme stable.
- [ ] La lecture utilise la clé complète.
- [ ] Le doublon est refusé.
- [ ] La ligne existante n’est pas remplacée.
- [ ] Aucun accès par index primaire n’est utilisé.
- [ ] Une clé composée est maîtrisée.
- [ ] La table hachée est distinguée de la table triée.
- [ ] La catégorie est choisie selon le mode d’accès.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
TYPES: BEGIN OF ty_product,
         product_id  TYPE c LENGTH 4,
         description TYPE c LENGTH 30,
         price       TYPE p LENGTH 8 DECIMALS 2,
         currency    TYPE c LENGTH 3,
       END OF ty_product.

DATA lt_products TYPE HASHED TABLE OF ty_product
  WITH UNIQUE KEY product_id.

INSERT VALUE #(
  product_id  = 'P003'
  description = 'Écran'
  price       = '199.90'
  currency    = 'EUR'
) INTO TABLE lt_products.

INSERT VALUE #(
  product_id  = 'P001'
  description = 'Clavier'
  price       = '29.90'
  currency    = 'EUR'
) INTO TABLE lt_products.

INSERT VALUE #(
  product_id  = 'P004'
  description = 'Casque'
  price       = '59.90'
  currency    = 'EUR'
) INTO TABLE lt_products.

INSERT VALUE #(
  product_id  = 'P002'
  description = 'Souris'
  price       = '19.90'
  currency    = 'EUR'
) INTO TABLE lt_products.

READ TABLE lt_products
  WITH TABLE KEY product_id = 'P002'
  INTO DATA(ls_product).

IF sy-subrc = 0.
  WRITE: / ls_product-product_id,
           '-',
           ls_product-description,
           '-',
           ls_product-price,
           ls_product-currency.
ENDIF.

READ TABLE lt_products
  WITH TABLE KEY product_id = 'P999'
  INTO ls_product.

IF sy-subrc <> 0.
  WRITE / 'Produit P999 absent'.
ENDIF.

INSERT VALUE #(
  product_id  = 'P002'
  description = 'Souris ergonomique'
  price       = '39.90'
  currency    = 'EUR'
) INTO TABLE lt_products.

IF sy-subrc <> 0.
  WRITE / 'Insertion refusée : P002 existe déjà'.
ENDIF.
```

### Solution — clé composée

```abap
TYPES: BEGIN OF ty_product_price,
         product_id TYPE c LENGTH 4,
         currency   TYPE c LENGTH 3,
         price      TYPE p LENGTH 8 DECIMALS 2,
       END OF ty_product_price.

DATA lt_product_prices TYPE HASHED TABLE OF ty_product_price
  WITH UNIQUE KEY product_id currency.

INSERT VALUE #(
  product_id = 'P001'
  currency   = 'EUR'
  price      = '29.90'
) INTO TABLE lt_product_prices.

INSERT VALUE #(
  product_id = 'P001'
  currency   = 'USD'
  price      = '32.50'
) INTO TABLE lt_product_prices.

INSERT VALUE #(
  product_id = 'P002'
  currency   = 'EUR'
  price      = '19.90'
) INTO TABLE lt_product_prices.

READ TABLE lt_product_prices
  WITH TABLE KEY
    product_id = 'P001'
    currency   = 'USD'
  INTO DATA(ls_product_price).
```

### Solution — comparaison

| Critère                  | `SORTED TABLE` | `HASHED TABLE` |
| ------------------------ | -------------- | -------------- |
| Clé unique               | Oui            | Obligatoire    |
| Clé non unique           | Oui            | Non            |
| Index primaire           | Oui            | Non            |
| Ordre garanti            | Oui            | Non            |
| Lecture par clé complète | Oui            | Oui            |
| Parcours ordonné         | Oui            | Non garanti    |
| Usage dominant           | clé et ordre   | clé complète   |

### Solution — choix

| Besoin                      | Catégorie                          |
| --------------------------- | ---------------------------------- |
| Dictionnaire produit        | `HASHED TABLE`                     |
| Annuaire trié               | `SORTED TABLE`                     |
| Historique                  | `STANDARD TABLE`                   |
| Commandes triées par client | `SORTED TABLE` avec clé non unique |
| Produit/devise              | `HASHED TABLE` à clé composée      |

</details>
