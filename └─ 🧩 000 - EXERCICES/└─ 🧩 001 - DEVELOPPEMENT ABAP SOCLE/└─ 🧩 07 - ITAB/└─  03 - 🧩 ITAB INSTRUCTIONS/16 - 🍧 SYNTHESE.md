# 🌸 EXERCICES — SYNTHESE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [IS INITIAL](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/01 - 🍧 IS INITIAL.md>)

> Cours associé : [CLEAR TABLE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/02 - 🍧 CLEAR.md>)

> Cours associé : [SORT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/03 - 🍧 SORT.md>)

> Cours associé : [INSERT INTO ITAB](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/04 - 🍧 INSERT INTO.md>)

> Cours associé : [APPEND TO ITAB](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/05 - 🍧 APPEND TO.md>)

> Cours associé : [MODIFY WHERE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/06 - 🍧 MODIFY WHERE.md>)

> Cours associé : [MODIDFY WITH INDEX](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/07 - 🍧 MODIFY INDEX.md>)

> Cours associé : [COPY TABLE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/08 - 🍧 COPY.md>)

> Cours associé : [MOVE CORRESPONDING](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/09 - 🍧 MOVE-CORRESPONDING.md>)

> Cours associé : [DELETE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/10 - 🍧 DELETE.md>)

> Cours associé : [DELETE ADJACENT DUPLICATES](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/11 - 🍧 DELETE ADJACENT DUPLICATES.md>)

> Cours associé : [READ TABLE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/12 - 🍧 READ.md>)

> Cours associé : [BINARY SEARCH](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/13 - 🍧 BINARY SEARCH.md>)

> Cours associé : [LOOP AT](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/14 - 🍧 LOOP.md>)

> Cours associé : [REGROUPER UNE TABLE AVEC `LOOP AT ... GROUP BY`](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/15 - 🍧 LOOP AT GROUP BY.md>)

## 🌺 OBJECTIF

Construire un traitement complet appliquant les instructions du dossier dans un ordre cohérent.

## 🌺 CONTEXTE

Une table source contient des commandes importées, avec doublons possibles.

Le programme doit :

1. vérifier que la source n’est pas vide ;
2. copier la source dans une table de travail ;
3. trier pour conserver la commande la plus prioritaire de chaque identifiant ;
4. supprimer les doublons ;
5. lire une commande avec une recherche binaire ;
6. modifier plusieurs statuts ;
7. modifier une ligne par index ;
8. supprimer les commandes clôturées ;
9. regrouper les commandes restantes par pays ;
10. vider les objets temporaires.

## 🌺 TYPE ÉTENDU

```abap
TYPES: BEGIN OF ty_import_order,
         order_id    TYPE c LENGTH 10,
         customer_id TYPE c LENGTH 6,
         country     TYPE c LENGTH 2,
         amount      TYPE p LENGTH 8 DECIMALS 2,
         status      TYPE c LENGTH 1,
         priority    TYPE i,
       END OF ty_import_order.
```

## 🌺 DONNÉES

```abap
lt_source = VALUE #(
  ( order_id = '4500000001'
    customer_id = 'C10001'
    country = 'FR'
    amount = '100.00'
    status = 'N'
    priority = 1 )

  ( order_id = '4500000002'
    customer_id = 'C10002'
    country = 'DE'
    amount = '80.00'
    status = 'P'
    priority = 1 )

  ( order_id = '4500000001'
    customer_id = 'C10001'
    country = 'FR'
    amount = '125.00'
    status = 'N'
    priority = 5 )

  ( order_id = '4500000003'
    customer_id = 'C10003'
    country = 'FR'
    amount = '50.00'
    status = 'C'
    priority = 1 )

  ( order_id = '4500000004'
    customer_id = 'C10004'
    country = 'ES'
    amount = '200.00'
    status = 'N'
    priority = 2 )
).
```

## 🌺 CONSIGNES

### Étape 1 — contrôle

Si la source est vide :

```text
Aucune commande à traiter
```

Le programme ne doit pas poursuivre le traitement métier.

### Étape 2 — copie

Copier la source vers `lt_work`.

### Étape 3 — dédoublonnage

Conserver la priorité la plus élevée de chaque `order_id`.

Tri attendu :

```abap
SORT lt_work
  BY order_id ASCENDING
     priority DESCENDING.
```

Puis :

```abap
DELETE ADJACENT DUPLICATES FROM lt_work
  COMPARING order_id.
```

### Étape 4 — recherche binaire

Trier ensuite par `order_id` croissant.

Rechercher `4500000002`.

### Étape 5 — modification conditionnelle

Passer toutes les commandes `N` à `P`.

### Étape 6 — modification par index

Sur la première ligne, positionner la priorité à `9`, sans modifier les autres composants.

### Étape 7 — suppression

Supprimer les commandes `C`.

### Étape 8 — groupement

Regrouper par pays et calculer :

- nombre de commandes ;
- montant total.

### Étape 9 — nettoyage

Vider :

```text
lt_work
ls_order
```

Vérifier les états initiaux.

## 🌺 RÉSULTATS ATTENDUS

Après dédoublonnage :

```text
4500000001 - priorité 5 - montant 125,00
4500000002 - priorité 1 - montant 80,00
4500000003 - priorité 1 - montant 50,00
4500000004 - priorité 2 - montant 200,00
```

Après suppression des commandes clôturées :

```text
DE : 1 commande - total 80,00
ES : 1 commande - total 200,00
FR : 1 commande - total 125,00
```

Après nettoyage :

```text
Table de travail vide
Structure initiale
```

## 🌺 CAS LIMITES

| Cas                          | Résultat                                |
| ---------------------------- | --------------------------------------- |
| Source vide                  | arrêt fonctionnel sans dump             |
| Identifiant recherché absent | message explicite                       |
| Aucun statut `N`             | `sy-subrc = 4` après `MODIFY ... WHERE` |
| Index `1` absent             | modification ignorée avec message       |
| Aucun statut `C`             | aucune suppression                      |
| Un seul pays                 | un seul groupe                          |

## 🌺 CRITÈRES DE VALIDATION

- [ ] La source vide est traitée.
- [ ] La copie est indépendante.
- [ ] Le doublon conserve la priorité la plus élevée.
- [ ] La recherche binaire est précédée du tri adapté.
- [ ] La lecture est contrôlée.
- [ ] Seul le statut est modifié avec `WHERE`.
- [ ] Seule la priorité est modifiée par index.
- [ ] Les commandes clôturées sont supprimées.
- [ ] Les agrégats par pays sont corrects.
- [ ] Les objets temporaires sont initialisés à la fin.
- [ ] Tous les champs système sont lus immédiatement après l’instruction concernée.

<details>
<summary>🍧 Afficher la solution complète</summary>

```abap
REPORT zaelion_<tri>_itab_instructions.

TYPES: BEGIN OF ty_import_order,
         order_id    TYPE c LENGTH 10,
         customer_id TYPE c LENGTH 6,
         country     TYPE c LENGTH 2,
         amount      TYPE p LENGTH 8 DECIMALS 2,
         status      TYPE c LENGTH 1,
         priority    TYPE i,
       END OF ty_import_order.

DATA lt_source TYPE STANDARD TABLE OF ty_import_order
  WITH EMPTY KEY.

DATA lt_work LIKE lt_source.
DATA ls_order TYPE ty_import_order.

START-OF-SELECTION.

  lt_source = VALUE #(
    ( order_id = '4500000001'
      customer_id = 'C10001'
      country = 'FR'
      amount = '100.00'
      status = 'N'
      priority = 1 )

    ( order_id = '4500000002'
      customer_id = 'C10002'
      country = 'DE'
      amount = '80.00'
      status = 'P'
      priority = 1 )

    ( order_id = '4500000001'
      customer_id = 'C10001'
      country = 'FR'
      amount = '125.00'
      status = 'N'
      priority = 5 )

    ( order_id = '4500000003'
      customer_id = 'C10003'
      country = 'FR'
      amount = '50.00'
      status = 'C'
      priority = 1 )

    ( order_id = '4500000004'
      customer_id = 'C10004'
      country = 'ES'
      amount = '200.00'
      status = 'N'
      priority = 2 )
  ).

  IF lt_source IS INITIAL.
    WRITE / 'Aucune commande à traiter'.
    RETURN.
  ENDIF.

  lt_work = lt_source.

  SORT lt_work
    BY order_id ASCENDING
       priority DESCENDING.

  DELETE ADJACENT DUPLICATES FROM lt_work
    COMPARING order_id.

  SORT lt_work BY order_id.

  READ TABLE lt_work
    WITH KEY order_id = '4500000002'
    BINARY SEARCH
    INTO ls_order.

  IF sy-subrc = 0.
    WRITE / |Commande trouvée : { ls_order-order_id }|.
  ELSE.
    WRITE / 'Commande absente'.
  ENDIF.

  MODIFY lt_work
    FROM VALUE #( status = 'P' )
    TRANSPORTING status
    WHERE status = 'N'.

  IF sy-subrc = 4.
    WRITE / 'Aucun statut N à modifier'.
  ENDIF.

  MODIFY lt_work
    FROM VALUE #( priority = 9 )
    INDEX 1
    TRANSPORTING priority.

  IF sy-subrc <> 0.
    WRITE / 'Première ligne absente'.
  ENDIF.

  DELETE lt_work WHERE status = 'C'.

  LOOP AT lt_work INTO DATA(ls_group_source)
    GROUP BY ( country = ls_group_source-country )
    ASCENDING
    ASSIGNING FIELD-SYMBOL(<country_group>).

    DATA lv_count TYPE i.
    DATA lv_total TYPE p LENGTH 10 DECIMALS 2.

    CLEAR:
      lv_count,
      lv_total.

    LOOP AT GROUP <country_group>
      ASSIGNING FIELD-SYMBOL(<member>).

      lv_count = lv_count + 1.
      lv_total = lv_total + <member>-amount.

    ENDLOOP.

    WRITE: / <country_group>-country,
             ':',
             lv_count,
             'commande(s) - total',
             lv_total.

  ENDLOOP.

  CLEAR:
    lt_work,
    ls_order.

  IF lt_work IS INITIAL.
    WRITE / 'Table de travail vide'.
  ENDIF.

  IF ls_order IS INITIAL.
    WRITE / 'Structure initiale'.
  ENDIF.
```

</details>
