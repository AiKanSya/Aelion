# 🌸 EXERCICES — TYPES ET CONSTANTES DE CLASSE

## 🌺 OBJECTIFS

À la fin des exercices, le stagiaire doit être capable de :

- créer un type structure public dans `SE24` ;
- créer un type table public basé sur cette structure ;
- utiliser le type public depuis un report ;
- créer un type structure private ;
- créer un type table private ;
- utiliser le type private dans un attribut et une méthode privés ;
- expliquer pourquoi le type private ne peut pas être utilisé avec `ZCL_...=>TYPE` depuis un report ;
- créer et utiliser des constantes publiques et privées ;
- choisir une catégorie et une clé de table explicites.

## 🌺 CONSIGNES

- Réaliser les exercices sans consulter la correction lors du premier essai.
- Utiliser une classe différente de la solution de l’évaluation finale.
- Produire une preuve vérifiable :
  - capture `SE24` ;
  - définition de classe ;
  - programme appelant ;
  - résultat ;
  - cas volontairement incorrect ;
  - correction.
- Remplacer `AELION` par le trigramme demandé si nécessaire.
- Ne pas rendre public un type uniquement pour contourner une erreur de compilation.
- Justifier chaque visibilité.

---

# 🌸 EXERCICE 1 — RESTITUTION

Sans consulter le cours, définir :

1. un type structure de classe ;
2. un type table de classe ;
3. un type public ;
4. un type private ;
5. une constante de classe ;
6. une variable utilisant un type de classe.

Compléter :

| Élément        | Exemple | Contient une valeur à l’exécution |
| -------------- | ------- | --------------------------------- |
| Type structure |         |                                   |
| Type table     |         |                                   |
| Attribut table |         |                                   |
| Constante      |         |                                   |

## 🌺 CRITÈRES

- [ ] Type et variable sont distingués.
- [ ] Public et private sont distingués.
- [ ] L’accès avec `=>` est expliqué.

<details>
<summary>🍧 Afficher la correction</summary>

```text
TY_S_ITEM
→ décrit une ligne

TY_T_ITEMS
→ décrit une table de lignes TY_S_ITEM

MT_ITEMS
→ contient réellement les lignes d’un objet

GC_STATUS_NEW
→ contient une valeur fixe
```

</details>

---

# 🌸 EXERCICE 2 — TYPE TABLE PUBLIC

## 🌺 CLASSE

Créer ou modifier :

```text
ZCL_AELION_ORDER
```

## 🌺 ÉTAPE 1 — TYPE STRUCTURE PUBLIC

Créer :

```text
TY_S_ITEM
```

Visibilité :

```text
Public
```

Champs :

| Champ         | Type         |
| ------------- | ------------ |
| `ITEM_ID`     | `I`          |
| `DESCRIPTION` | `STRING`     |
| `QUANTITY`    | `DECFLOAT34` |
| `UNIT_PRICE`  | `DECFLOAT34` |

## 🌺 ÉTAPE 2 — TYPE TABLE PUBLIC

Créer :

```text
TY_T_ITEMS
```

Définition attendue :

```abap
TYPES ty_t_items TYPE STANDARD TABLE OF ty_s_item
  WITH EMPTY KEY.
```

## 🌺 ÉTAPE 3 — MÉTHODE PUBLIQUE

Créer :

```text
CALCULATE_TOTAL
```

Signature :

```text
IT_ITEMS  IMPORTING TYPE TY_T_ITEMS
RV_TOTAL  RETURNING TYPE DECFLOAT34
```

## 🌺 ÉTAPE 4 — IMPLÉMENTATION

```abap
METHOD calculate_total.

  LOOP AT it_items INTO DATA(ls_item).

    rv_total =
      rv_total
      + ( ls_item-quantity * ls_item-unit_price ).

  ENDLOOP.

ENDMETHOD.
```

## 🌺 ÉTAPE 5 — PROGRAMME APPELANT

Créer :

```text
ZAELION_TYPE_TABLE_TEST
```

```abap
REPORT zaelion_type_table_test.

DATA lt_items TYPE zcl_aelion_order=>ty_t_items.

lt_items = VALUE #(
  ( item_id     = 10
    description = `Clavier`
    quantity    = 2
    unit_price  = '50.00' )

  ( item_id     = 20
    description = `Souris`
    quantity    = 3
    unit_price  = '25.00' )
).

DATA(lo_order) =
  NEW zcl_aelion_order( ).

DATA(lv_total) =
  lo_order->calculate_total(
    it_items = lt_items
  ).

WRITE / lv_total.
```

## 🌺 RÉSULTAT ATTENDU

```text
175
```

## 🌺 QUESTIONS

1. pourquoi le report peut-il utiliser `TY_T_ITEMS` ?
2. pourquoi l’accès utilise-t-il `=>` ?
3. une instance est-elle nécessaire pour déclarer `LT_ITEMS` ?
4. une instance est-elle nécessaire pour appeler `CALCULATE_TOTAL` si la méthode est d’instance ?
5. le type contient-il les deux postes ?

## 🌺 CRITÈRES

- [ ] `TY_S_ITEM` est public.
- [ ] `TY_T_ITEMS` est public.
- [ ] La clé est explicitement vide.
- [ ] Le report compile.
- [ ] Deux lignes sont créées.
- [ ] Le total vaut `175`.
- [ ] La différence entre type et contenu est expliquée.

<details>
<summary>🍧 Afficher la correction complète</summary>

```abap
CLASS zcl_aelion_order DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    TYPES:
      BEGIN OF ty_s_item,
        item_id     TYPE i,
        description TYPE string,
        quantity    TYPE decfloat34,
        unit_price  TYPE decfloat34,
      END OF ty_s_item.

    TYPES ty_t_items TYPE STANDARD TABLE OF ty_s_item
      WITH EMPTY KEY.

    METHODS calculate_total
      IMPORTING
        it_items TYPE ty_t_items
      RETURNING
        VALUE(rv_total) TYPE decfloat34.

ENDCLASS.

CLASS zcl_aelion_order IMPLEMENTATION.

  METHOD calculate_total.

    LOOP AT it_items INTO DATA(ls_item).

      rv_total =
        rv_total
        + ( ls_item-quantity * ls_item-unit_price ).

    ENDLOOP.

  ENDMETHOD.

ENDCLASS.
```

</details>

---

# 🌸 EXERCICE 3 — TYPE TABLE PRIVATE

## 🌺 OBJECTIF

Ajouter un journal technique interne sans l’exposer aux programmes appelants.

## 🌺 ÉTAPE 1 — TYPE STRUCTURE PRIVATE

Dans la `PRIVATE SECTION`, créer :

```text
TY_S_LOG
```

Champs :

| Champ     | Type         |
| --------- | ------------ |
| `LINE_NO` | `I`          |
| `TYPE`    | `BAPI_MTYPE` |
| `MESSAGE` | `BAPI_MSG`   |

## 🌺 ÉTAPE 2 — TYPE TABLE PRIVATE

Créer :

```text
TY_T_LOG
```

```abap
TYPES ty_t_log TYPE STANDARD TABLE OF ty_s_log
  WITH EMPTY KEY.
```

## 🌺 ÉTAPE 3 — ATTRIBUT PRIVATE

Créer :

```text
MT_LOG TYPE TY_T_LOG
```

## 🌺 ÉTAPE 4 — MÉTHODE PRIVATE

Créer :

```text
ADD_LOG
```

Signature :

```text
IV_LINE_NO IMPORTING TYPE I
IV_TYPE    IMPORTING TYPE BAPI_MTYPE
IV_MESSAGE IMPORTING TYPE BAPI_MSG
```

Implémentation :

```abap
METHOD add_log.

  APPEND VALUE #(
    line_no = iv_line_no
    type    = iv_type
    message = iv_message
  ) TO mt_log.

ENDMETHOD.
```

## 🌺 ÉTAPE 5 — UTILISATION INTERNE

Appeler `ADD_LOG` depuis `CALCULATE_TOTAL` :

```abap
add_log(
  iv_line_no = sy-tabix
  iv_type    = 'S'
  iv_message = 'Poste calculé'
).
```

Éviter d’utiliser `SY-TABIX` après une autre instruction susceptible de le modifier. Dans une version plus robuste, gérer explicitement un compteur de ligne.

## 🌺 ÉTAPE 6 — TEST D’INACCESSIBILITÉ

Ajouter volontairement dans le report :

```abap
DATA lt_log TYPE zcl_aelion_order=>ty_t_log.
```

Résultat attendu :

```text
Erreur de syntaxe ou type inaccessible
```

Supprimer ensuite cette ligne.

## 🌺 QUESTIONS

1. pourquoi `TY_T_LOG` est-il private ?
2. pourquoi `MT_LOG` peut-il utiliser ce type ?
3. pourquoi le report ne peut-il pas utiliser ce type ?
4. faut-il rendre le type public pour corriger le report ?
5. comment exposer un journal si le besoin fonctionnel apparaît plus tard ?

## 🌺 CRITÈRES

- [ ] `TY_S_LOG` est private.
- [ ] `TY_T_LOG` est private.
- [ ] `MT_LOG` utilise `TY_T_LOG`.
- [ ] `ADD_LOG` est private.
- [ ] La classe compile.
- [ ] Le test externe échoue comme prévu.
- [ ] La ligne incorrecte est supprimée.
- [ ] La visibilité est justifiée.

<details>
<summary>🍧 Afficher la correction complète</summary>

```abap
PRIVATE SECTION.

  TYPES:
    BEGIN OF ty_s_log,
      line_no TYPE i,
      type    TYPE bapi_mtype,
      message TYPE bapi_msg,
    END OF ty_s_log.

  TYPES ty_t_log TYPE STANDARD TABLE OF ty_s_log
    WITH EMPTY KEY.

  DATA mt_log TYPE ty_t_log.

  METHODS add_log
    IMPORTING
      iv_line_no TYPE i
      iv_type    TYPE bapi_mtype
      iv_message TYPE bapi_msg.
```

Le type reste private parce qu’il décrit un détail d’implémentation.

Une future restitution peut utiliser :

- un type public distinct ;
- une table `BAPIRET2` publique ;
- une méthode publique retournant une représentation stable ;
- une interface dédiée de journalisation.

</details>

---

# 🌸 EXERCICE 4 — TYPES PUBLICS ET PRIVATE DANS UNE MÊME CLASSE

## 🌺 DEMANDE

Construire la classe complète avec :

### Public

```text
TY_S_ITEM
TY_T_ITEMS
GC_STATUS_NEW
GC_STATUS_CLOSED
SET_ITEMS
GET_ITEMS
CALCULATE_TOTAL
```

### Private

```text
TY_S_LOG
TY_T_LOG
MT_ITEMS
MT_LOG
ADD_LOG
```

## 🌺 CONSTANTES

```abap
CONSTANTS:
  gc_status_new    TYPE c LENGTH 1 VALUE 'N',
  gc_status_closed TYPE c LENGTH 1 VALUE 'C'.
```

## 🌺 MÉTHODES

### `SET_ITEMS`

```text
copie IT_ITEMS vers MT_ITEMS
ajoute un message interne
```

### `GET_ITEMS`

```text
retourne MT_ITEMS avec le type public TY_T_ITEMS
```

### `CALCULATE_TOTAL`

```text
calcule le total de MT_ITEMS
```

### `ADD_LOG`

```text
alimente MT_LOG
```

## 🌺 PROGRAMME DE TEST

Le report doit :

1. déclarer une table avec le type public ;
2. créer deux postes ;
3. instancier la classe ;
4. appeler `SET_ITEMS` ;
5. appeler `GET_ITEMS` ;
6. appeler `CALCULATE_TOTAL` ;
7. afficher la constante `GC_STATUS_NEW` ;
8. ne jamais utiliser `TY_T_LOG`.

## 🌺 RÉSULTATS ATTENDUS

```text
Nombre de postes : 2
Total            : 175
Statut initial   : N
```

## 🌺 CRITÈRES

- [ ] Les deux types publics sont utilisables extérieurement.
- [ ] Les deux types privés restent internes.
- [ ] `MT_ITEMS` utilise un type public dans la classe.
- [ ] `MT_LOG` utilise un type private.
- [ ] Le report ne dépend pas de la structure du journal.
- [ ] Les résultats attendus sont obtenus.

<details>
<summary>🍧 Afficher la correction complète</summary>

```abap
CLASS zcl_aelion_order DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    TYPES:
      BEGIN OF ty_s_item,
        item_id     TYPE i,
        description TYPE string,
        quantity    TYPE decfloat34,
        unit_price  TYPE decfloat34,
      END OF ty_s_item.

    TYPES ty_t_items TYPE STANDARD TABLE OF ty_s_item
      WITH EMPTY KEY.

    CONSTANTS:
      gc_status_new    TYPE c LENGTH 1 VALUE 'N',
      gc_status_closed TYPE c LENGTH 1 VALUE 'C'.

    METHODS set_items
      IMPORTING
        it_items TYPE ty_t_items.

    METHODS get_items
      RETURNING
        VALUE(rt_items) TYPE ty_t_items.

    METHODS calculate_total
      RETURNING
        VALUE(rv_total) TYPE decfloat34.

  PRIVATE SECTION.

    TYPES:
      BEGIN OF ty_s_log,
        line_no TYPE i,
        type    TYPE bapi_mtype,
        message TYPE bapi_msg,
      END OF ty_s_log.

    TYPES ty_t_log TYPE STANDARD TABLE OF ty_s_log
      WITH EMPTY KEY.

    DATA:
      mt_items TYPE ty_t_items,
      mt_log   TYPE ty_t_log.

    METHODS add_log
      IMPORTING
        iv_line_no TYPE i
        iv_type    TYPE bapi_mtype
        iv_message TYPE bapi_msg.

ENDCLASS.

CLASS zcl_aelion_order IMPLEMENTATION.

  METHOD set_items.

    mt_items = it_items.

    add_log(
      iv_line_no = 0
      iv_type    = 'S'
      iv_message = 'Postes enregistrés'
    ).

  ENDMETHOD.

  METHOD get_items.

    rt_items = mt_items.

  ENDMETHOD.

  METHOD calculate_total.

    LOOP AT mt_items INTO DATA(ls_item).

      rv_total =
        rv_total
        + ( ls_item-quantity * ls_item-unit_price ).

    ENDLOOP.

  ENDMETHOD.

  METHOD add_log.

    APPEND VALUE #(
      line_no = iv_line_no
      type    = iv_type
      message = iv_message
    ) TO mt_log.

  ENDMETHOD.

ENDCLASS.
```

Programme :

```abap
REPORT zaelion_type_table_test.

DATA(lt_items) =
  VALUE zcl_aelion_order=>ty_t_items(
    ( item_id     = 10
      description = `Clavier`
      quantity    = 2
      unit_price  = '50.00' )

    ( item_id     = 20
      description = `Souris`
      quantity    = 3
      unit_price  = '25.00' )
  ).

DATA(lo_order) =
  NEW zcl_aelion_order( ).

lo_order->set_items(
  it_items = lt_items
).

DATA(lt_items_returned) =
  lo_order->get_items( ).

WRITE:
  / |Nombre de postes : { lines( lt_items_returned ) }|,
  / |Total            : { lo_order->calculate_total( ) }|,
  / |Statut initial   : { zcl_aelion_order=>gc_status_new }|.
```

</details>

---

# 🌸 EXERCICE 5 — CHOISIR LA CATÉGORIE ET LA CLÉ

## 🌺 DEMANDE

Créer trois variantes du type table public :

### Standard table

```abap
TYPES ty_t_items_standard TYPE STANDARD TABLE OF ty_s_item
  WITH EMPTY KEY.
```

### Sorted table

```abap
TYPES ty_t_items_sorted TYPE SORTED TABLE OF ty_s_item
  WITH UNIQUE KEY item_id.
```

### Hashed table

```abap
TYPES ty_t_items_hashed TYPE HASHED TABLE OF ty_s_item
  WITH UNIQUE KEY item_id.
```

## 🌺 TESTS

1. insérer deux identifiants distincts ;
2. tenter d’insérer deux fois le même `ITEM_ID` dans les types keyed ;
3. observer `SY-SUBRC` après `INSERT ... INTO TABLE` ;
4. rechercher un poste par clé ;
5. expliquer l’ordre des lignes.

## 🌺 QUESTIONS

1. quelle table conserve naturellement l’ordre d’insertion ?
2. quelle table reste triée par `ITEM_ID` ?
3. quelle table n’a pas d’ordre d’index exploitable ?
4. quelles tables refusent un doublon de `ITEM_ID` ?
5. pourquoi `WITH EMPTY KEY` est-il explicite ?

## 🌺 CRITÈRES

- [ ] Les trois catégories sont déclarées.
- [ ] Les clés sont explicites.
- [ ] Le doublon est testé.
- [ ] `SY-SUBRC` est contrôlé.
- [ ] Le choix de catégorie est expliqué.

<details>
<summary>🍧 Afficher la correction</summary>

| Type                 | Ordre                     | Clé               | Doublon `ITEM_ID` |
| -------------------- | ------------------------- | ----------------- | ----------------- |
| Standard `EMPTY KEY` | ordre d’index             | aucune clé métier | accepté           |
| Sorted `UNIQUE KEY`  | trié par clé              | unique            | refusé            |
| Hashed `UNIQUE KEY`  | pas d’accès index ordonné | unique            | refusé            |

</details>

---

# 🌸 EXERCICE 6 — DIAGNOSTIC

## 🌺 CAS 1 — TYPE PRIVATE UTILISÉ À L’EXTÉRIEUR

```abap
DATA lt_log TYPE zcl_aelion_order=>ty_t_log.
```

Décrire :

- symptôme ;
- cause ;
- correction ;
- test nominal.

## 🌺 CAS 2 — TYPE TECHNIQUE RENDU PUBLIC

`TY_T_LOG` est rendu public uniquement pour faire compiler un report.

Décrire pourquoi cette correction est mauvaise.

## 🌺 CAS 3 — TYPE PRIVATE DANS UNE MÉTHODE PUBLIQUE

Une méthode publique retourne `TY_T_LOG`.

Corriger le contrat.

## 🌺 CAS 4 — CONFUSION TYPE ET DONNÉE

Code proposé :

```abap
APPEND ls_item TO zcl_aelion_order=>ty_t_items.
```

Expliquer pourquoi un type n’est pas une table contenant des lignes.

## 🌺 CAS 5 — CLÉ NON MAÎTRISÉE

```abap
TYPES ty_t_items TYPE STANDARD TABLE OF ty_s_item
  WITH DEFAULT KEY.
```

Décrire les composants susceptibles d’entrer dans la clé par défaut selon le type de ligne et expliquer pourquoi une clé explicite est préférable.

## 🌺 CRITÈRES

- [ ] Les cinq défauts sont identifiés.
- [ ] Aucun type n’est rendu public sans justification.
- [ ] L’interface publique reste stable.
- [ ] Type et variable sont distingués.
- [ ] Une clé explicite est proposée.

<details>
<summary>🍧 Afficher la correction</summary>

Règle générale :

```text
Public
→ contrat externe stable

Private
→ détail d’implémentation modifiable

DATA
→ variable réelle

TYPES
→ description d’une donnée
```

</details>
