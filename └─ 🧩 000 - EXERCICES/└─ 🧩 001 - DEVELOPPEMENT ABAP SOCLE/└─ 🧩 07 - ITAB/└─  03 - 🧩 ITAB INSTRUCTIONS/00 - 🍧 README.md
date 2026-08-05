# 🌸 SOMMAIRE — └─ 03 - 🧩 ITAB INSTRUCTIONS

## 🌺 OBJECTIF DU PARCOURS

Ces exercices renforcent les principales instructions de traitement des tables internes ABAP :

1. `IS INITIAL` ;
2. `CLEAR` ;
3. `SORT` ;
4. `INSERT` ;
5. `APPEND` ;
6. `MODIFY ... WHERE` ;
7. `MODIFY ... INDEX` ;
8. affectation complète d’une table ;
9. `MOVE-CORRESPONDING` entre tables ;
10. `DELETE` ;
11. `DELETE ADJACENT DUPLICATES` ;
12. `READ TABLE` ;
13. `BINARY SEARCH` ;
14. `LOOP AT` ;
15. `LOOP AT ... GROUP BY`.

Le stagiaire doit être capable de choisir l’instruction adaptée, prévoir son effet sur la table et contrôler les résultats avec `sy-subrc` et `sy-tabix` lorsque ces champs système sont pertinents.

## 🌺 COURS ASSOCIÉS

- `07 - ITAB/03 - ITAB INSTRUCTIONS/01 - 🍧 IS INITIAL.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/02 - 🍧 CLEAR.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/03 - 🍧 SORT.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/04 - 🍧 INSERT INTO.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/05 - 🍧 APPEND TO.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/06 - 🍧 MODIFY WHERE.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/07 - 🍧 MODIFY INDEX.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/08 - 🍧 COPY.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/09 - 🍧 MOVE-CORRESPONDING.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/10 - 🍧 DELETE.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/11 - 🍧 DELETE ADJACENT DUPLICATES.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/12 - 🍧 READ.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/13 - 🍧 BINARY SEARCH.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/14 - 🍧 LOOP.md`
- `07 - ITAB/03 - ITAB INSTRUCTIONS/15 - 🍧 LOOP AT GROUP BY.md`

## 🌺 PROGRAMME UTILISÉ

Créer le programme exécutable suivant :

```text
ZAELION_<TRI>_ITAB_INSTRUCTIONS
```

Remplacer `<TRI>` par le trigramme attribué.

Enregistrer le programme dans le package et l’ordre de transport utilisés pour les exercices précédents.

## 🌺 TYPE DE DONNÉES COMMUN

Les exercices utilisent principalement le type suivant :

```abap
TYPES: BEGIN OF ty_order,
         order_id    TYPE c LENGTH 10,
         customer_id TYPE c LENGTH 6,
         country     TYPE c LENGTH 2,
         amount      TYPE p LENGTH 8 DECIMALS 2,
         status      TYPE c LENGTH 1,
         priority    TYPE i,
       END OF ty_order.
```

Table standard principale :

```abap
DATA lt_orders TYPE STANDARD TABLE OF ty_order
  WITH EMPTY KEY.
```

## 🌺 RÈGLES COMMUNES

- Réaliser un premier essai avant d’ouvrir la solution.
- Contrôler la syntaxe avant chaque activation.
- Exécuter les cas nominaux et les cas limites demandés.
- Contrôler `sy-subrc` immédiatement après l’instruction qui le renseigne.
- Ne pas réutiliser `sy-tabix` sans avoir identifié l’instruction qui l’a renseigné.
- Restaurer une version correcte après chaque erreur volontaire.
- Conserver une preuve vérifiable : code, résultat ou explication structurée.
- Ne pas conserver de code provoquant une erreur de syntaxe ou un dump.
- Ne jamais modifier un composant de clé d’une table triée ou hachée sans stratégie explicite de suppression puis réinsertion.

---

# 🌸 RECTIFICATIONS TECHNIQUES APPLIQUÉES

## 🌺 TABLES SANS LIGNE D’EN-TÊTE

Les exercices utilisent exclusivement des tables internes modernes sans ligne d’en-tête.

Dans ce contexte :

```abap
CLEAR lt_orders.
```

initialise la table et supprime ses lignes.

La notation historique suivante désigne explicitement le corps de table :

```abap
CLEAR lt_orders[].
```

Elle n’est pas nécessaire pour les tables sans ligne d’en-tête.

## 🌺 `REFRESH`

`REFRESH itab` est une forme historique d’initialisation du corps d’une table interne.  
Utiliser `CLEAR itab` dans le code moderne.

`FREE itab` initialise également la table et libère la mémoire allouée.

## 🌺 AFFECTATION COMPLÈTE

Il n’existe pas d’instruction ABAP nommée `COPY TABLE`.

La copie complète s’écrit :

```abap
lt_target = lt_source.
```

Les deux tables restent des objets distincts après l’affectation.

## 🌺 `MOVE-CORRESPONDING` ENTRE TABLES

Sans addition :

```abap
MOVE-CORRESPONDING lt_source TO lt_target.
```

la table cible est remplacée.

Pour conserver les lignes existantes et ajouter les lignes converties :

```abap
MOVE-CORRESPONDING lt_source TO lt_target
  KEEPING TARGET LINES.
```

Cette instruction ne fusionne pas les lignes selon une clé métier.

## 🌺 `READ TABLE`

Les formes suivantes sont alternatives :

```abap
READ TABLE lt_orders INTO DATA(ls_order) ...
READ TABLE lt_orders ASSIGNING FIELD-SYMBOL(<lfs_order>) ...
READ TABLE lt_orders TRANSPORTING NO FIELDS ...
```

Ne pas combiner `ASSIGNING` et `TRANSPORTING NO FIELDS`.

## 🌺 `BINARY SEARCH`

Pour une table standard, la table doit être triée par ordre croissant selon les composants recherchés, dans le même ordre. Les composants de recherche doivent former le début de la clé de tri.

Exemple valide :

```abap
SORT lt_orders BY country customer_id.

READ TABLE lt_orders
  WITH KEY
    country     = 'FR'
    customer_id = 'C10001'
  BINARY SEARCH
  TRANSPORTING NO FIELDS.
```

---

# 🌸 DONNÉES DE TEST COMMUNES

Le bloc suivant peut être réutilisé dans plusieurs exercices :

```abap
lt_orders = VALUE #(
  ( order_id = '4500000003'
    customer_id = 'C10002'
    country = 'DE'
    amount = '90.00'
    status = 'N'
    priority = 2 )

  ( order_id = '4500000001'
    customer_id = 'C10001'
    country = 'FR'
    amount = '125.50'
    status = 'N'
    priority = 1 )

  ( order_id = '4500000004'
    customer_id = 'C10003'
    country = 'FR'
    amount = '50.00'
    status = 'C'
    priority = 3 )

  ( order_id = '4500000002'
    customer_id = 'C10001'
    country = 'FR'
    amount = '75.00'
    status = 'P'
    priority = 2 )
).
```
