# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ITAB TYPE TABLE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/01 - 🍧 ITAB.md>)

> Cours associé : [ITAB TYPE STANDARD TABLE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/02 - 🍧 ITAB TYPE STANDARD.md>)

> Cours associé : [ITAB TYPE SORTED TABLE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/03 - 🍧 ITAB TYPE SORTED.md>)

> Cours associé : [TYPE RANGE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/04 - 🍧 ITAB TYPE RANGE.md>)

> Cours associé : [TYPE HASHED TABLE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/05 - 🍧 ITAB TYPE HASHED.md>)

## 🌺 OBJECTIF

Construire quatre objets adaptés à quatre besoins différents et justifier chaque choix.

## 🌺 CONTEXTE

Le programme doit gérer :

1. un journal technique ;
2. un annuaire trié ;
3. un dictionnaire de prix ;
4. un filtre de montants.

## 🌺 BESOIN 1 — JOURNAL TECHNIQUE

Caractéristiques :

- ordre d’ajout conservé ;
- doublons autorisés ;
- parcours séquentiel ;
- aucune clé métier requise.

Déclaration attendue :

```abap
DATA lt_messages TYPE STANDARD TABLE OF string
  WITH EMPTY KEY.
```

Ajouter :

```text
Début
Contrôle
Contrôle
Fin
```

## 🌺 BESOIN 2 — ANNUAIRE TRIÉ

Caractéristiques :

- identifiant unique ;
- affichage toujours croissant par identifiant ;
- lecture régulière par identifiant.

Déclaration attendue :

```abap
DATA lt_customers TYPE SORTED TABLE OF ty_customer
  WITH UNIQUE KEY customer_id.
```

Insérer les identifiants :

```text
C003
C001
C002
```

L’affichage doit produire :

```text
C001
C002
C003
```

## 🌺 BESOIN 3 — DICTIONNAIRE DE PRIX

Caractéristiques :

- clé unique `product_id/currency`;
- accès fréquent par clé complète ;
- aucun ordre d’affichage requis.

Déclaration attendue :

```abap
DATA lt_prices TYPE HASHED TABLE OF ty_price
  WITH UNIQUE KEY product_id currency.
```

## 🌺 BESOIN 4 — FILTRE DE MONTANTS

Règles :

- inclure de `10,00` à `100,00`;
- exclure `50,00`.

Déclaration attendue :

```abap
DATA lr_amount TYPE RANGE OF ty_amount.
```

Tester :

|  Montant | Résultat |
| -------: | -------- |
|   `9,99` | Refusé   |
|  `10,00` | Accepté  |
|  `49,99` | Accepté  |
|  `50,00` | Refusé   |
|  `50,01` | Accepté  |
| `100,00` | Accepté  |
| `100,01` | Refusé   |

## 🌺 CONSIGNES

1. Définir les types de ligne.
2. Déclarer les quatre tables.
3. Alimenter chaque table.
4. Contrôler les insertions des tables à clé unique.
5. Afficher le journal.
6. Afficher l’annuaire et prouver le tri automatique.
7. Lire un prix par clé complète.
8. Tester les sept montants.
9. Produire un tableau final de justification.
10. Ajouter un cas limite ou invalide pour chaque objet.

## 🌺 TABLEAU DE JUSTIFICATION

| Objet    | Catégorie | Clé | Ordre | Doublons | Accès principal |
| -------- | --------- | --- | ----- | -------- | --------------- |
| Journal  |           |     |       |          |                 |
| Annuaire |           |     |       |          |                 |
| Prix     |           |     |       |          |                 |
| Filtre   |           |     |       |          |                 |

## 🌺 CAS INVALIDES

### Journal

Lire l’index `10` alors que quatre lignes existent.

Résultat :

```text
Index absent
```

### Annuaire

Insérer une deuxième fois `C002`.

Résultat :

```text
Client déjà présent
```

### Prix

Insérer une deuxième fois `P001/EUR`.

Résultat :

```text
Prix déjà présent pour cette clé
```

### Filtre

Construire un intervalle dont `LOW > HIGH`.

Résultat :

```text
Intervalle refusé
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table standard possède une clé vide.
- [ ] Le journal conserve les doublons.
- [ ] L’annuaire est automatiquement trié.
- [ ] Le doublon client est refusé.
- [ ] Le dictionnaire utilise une clé composée.
- [ ] Le prix est lu par clé complète.
- [ ] La table de sélection applique l’exclusion.
- [ ] Les sept montants donnent le résultat attendu.
- [ ] Chaque catégorie est justifiée.
- [ ] Aucun code ne dépend d’un ordre non garanti.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
REPORT zaelion_<tri>_itab_types.

TYPES: BEGIN OF ty_customer,
         customer_id TYPE c LENGTH 4,
         name        TYPE c LENGTH 30,
       END OF ty_customer.

TYPES: BEGIN OF ty_price,
         product_id TYPE c LENGTH 4,
         currency   TYPE c LENGTH 3,
         amount     TYPE p LENGTH 8 DECIMALS 2,
       END OF ty_price.

TYPES ty_amount TYPE p LENGTH 8 DECIMALS 2.

DATA lt_messages TYPE STANDARD TABLE OF string
  WITH EMPTY KEY.

DATA lt_customers TYPE SORTED TABLE OF ty_customer
  WITH UNIQUE KEY customer_id.

DATA lt_prices TYPE HASHED TABLE OF ty_price
  WITH UNIQUE KEY product_id currency.

DATA lr_amount TYPE RANGE OF ty_amount.

START-OF-SELECTION.

  " Table standard
  lt_messages = VALUE #(
    ( `Début` )
    ( `Contrôle` )
    ( `Contrôle` )
    ( `Fin` )
  ).

  WRITE / 'JOURNAL'.

  LOOP AT lt_messages INTO DATA(lv_message).
    WRITE / lv_message.
  ENDLOOP.

  " Table triée
  INSERT VALUE #(
    customer_id = 'C003'
    name        = 'Claire'
  ) INTO TABLE lt_customers.

  INSERT VALUE #(
    customer_id = 'C001'
    name        = 'Alice'
  ) INTO TABLE lt_customers.

  INSERT VALUE #(
    customer_id = 'C002'
    name        = 'Bruno'
  ) INTO TABLE lt_customers.

  WRITE / 'ANNUAIRE'.

  LOOP AT lt_customers INTO DATA(ls_customer).
    WRITE: / ls_customer-customer_id,
             ls_customer-name.
  ENDLOOP.

  " Table hachée
  INSERT VALUE #(
    product_id = 'P001'
    currency   = 'EUR'
    amount     = '29.90'
  ) INTO TABLE lt_prices.

  INSERT VALUE #(
    product_id = 'P001'
    currency   = 'USD'
    amount     = '32.50'
  ) INTO TABLE lt_prices.

  READ TABLE lt_prices
    WITH TABLE KEY
      product_id = 'P001'
      currency   = 'USD'
    INTO DATA(ls_price).

  IF sy-subrc = 0.
    WRITE: / 'PRIX :',
             ls_price-product_id,
             ls_price-currency,
             ls_price-amount.
  ENDIF.

  " Table de sélection
  lr_amount = VALUE #(
    ( sign = 'I'
      option = 'BT'
      low = '10.00'
      high = '100.00' )
    ( sign = 'E'
      option = 'EQ'
      low = '50.00' )
  ).

  DATA lt_amounts TYPE STANDARD TABLE OF ty_amount
    WITH EMPTY KEY.

  lt_amounts = VALUE #(
    ( '9.99' )
    ( '10.00' )
    ( '49.99' )
    ( '50.00' )
    ( '50.01' )
    ( '100.00' )
    ( '100.01' )
  ).

  WRITE / 'FILTRE'.

  LOOP AT lt_amounts INTO DATA(lv_amount).

    IF lv_amount IN lr_amount.
      WRITE / |{ lv_amount } : accepté|.
    ELSE.
      WRITE / |{ lv_amount } : refusé|.
    ENDIF.

  ENDLOOP.
```

### Solution — justification

| Objet    | Catégorie | Clé                    | Ordre                      | Doublons         | Accès principal  |
| -------- | --------- | ---------------------- | -------------------------- | ---------------- | ---------------- |
| Journal  | standard  | vide                   | courant/insertion          | oui              | séquentiel/index |
| Annuaire | triée     | ID unique              | clé croissante             | non sur ID       | clé et parcours  |
| Prix     | hachée    | produit/devise unique  | non garanti                | non sur clé      | clé complète     |
| Filtre   | range     | structure de sélection | sans priorité séquentielle | règles multiples | opérateur `IN`   |

</details>
