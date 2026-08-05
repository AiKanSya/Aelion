# 🌸 EXERCICES — ITAB TYPE SORTED TABLE OF

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ITAB TYPE SORTED TABLE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/03 - 🍧 ITAB TYPE SORTED.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- déclarer une table triée ;
- choisir une clé unique ou non unique ;
- insérer des lignes dans un ordre quelconque ;
- constater le tri automatique ;
- contrôler un doublon de clé unique ;
- lire par clé ;
- expliquer le rôle de l’index primaire ;
- éviter `APPEND` pour l’alimentation générale ;
- distinguer tri automatique et instruction `SORT`.

## 🌺 DURÉE INDICATIVE

70 à 85 minutes.

## 🌺 CONTEXTE

Le programme gère un annuaire de clients trié par identifiant.

## 🌺 EXERCICE 1 — DÉCLARATION UNIQUE

Définir :

```abap
TYPES: BEGIN OF ty_customer,
         customer_id TYPE c LENGTH 4,
         name        TYPE c LENGTH 30,
         city        TYPE c LENGTH 20,
       END OF ty_customer.
```

Déclarer :

```abap
DATA lt_customers TYPE SORTED TABLE OF ty_customer
  WITH UNIQUE KEY customer_id.
```

Répondre :

1. Quelle propriété impose l’ordre des lignes ?
2. La clé est-elle unique ?
3. Une clé non unique serait-elle syntaxiquement possible pour une table triée ?
4. La table possède-t-elle un index primaire ?
5. L’ordre d’insertion est-il conservé ?

## 🌺 EXERCICE 2 — INSERTION DÉSORDONNÉE

Insérer dans cet ordre :

```text
C003 - Claire Martin - Lyon
C001 - Alice Durand - Paris
C004 - David Petit - Lille
C002 - Bruno Bernard - Marseille
```

Utiliser exclusivement :

```abap
INSERT VALUE #( ... ) INTO TABLE lt_customers.
```

Contrôler `sy-subrc` après chaque insertion.

Afficher la table.

Résultat attendu :

```text
C001 - Alice Durand - Paris
C002 - Bruno Bernard - Marseille
C003 - Claire Martin - Lyon
C004 - David Petit - Lille
```

## 🌺 EXERCICE 3 — DOUBLON DE CLÉ UNIQUE

Tenter d’insérer :

```text
C002 - Autre personne - Nantes
```

Contrôler immédiatement `sy-subrc`.

Résultat attendu :

```text
Insertion refusée : identifiant C002 déjà présent
```

Répondre :

1. La ligne initiale `C002` est-elle remplacée ?
2. Combien de lignes reste-t-il dans la table ?
3. Quelle valeur de retour indique l’échec ?
4. Pourquoi une clé unique protège-t-elle l’annuaire ?

## 🌺 EXERCICE 4 — LECTURE PAR CLÉ

Lire :

```abap
READ TABLE lt_customers
  WITH TABLE KEY customer_id = 'C003'
  INTO DATA(ls_customer).
```

Résultat attendu :

```text
C003 - Claire Martin - Lyon
```

Tester également `C999`.

Répondre :

1. La clé complète est-elle fournie ?
2. Faut-il trier la table avant la lecture ?
3. Quelle valeur de `sy-subrc` indique l’absence ?
4. Pourquoi une table triée convient-elle aux lectures par clé et aux parcours ordonnés ?

## 🌺 EXERCICE 5 — CLÉ NON UNIQUE

Déclarer :

```abap
DATA lt_customers_by_city TYPE SORTED TABLE OF ty_customer
  WITH NON-UNIQUE KEY city customer_id.
```

Insérer :

```text
C003 - Claire Martin - Lyon
C001 - Alice Durand - Paris
C005 - Emma Robert - Lyon
C002 - Bruno Bernard - Marseille
```

Afficher la table.

Résultat attendu :

```text
Lyon - C003 - Claire Martin
Lyon - C005 - Emma Robert
Marseille - C002 - Bruno Bernard
Paris - C001 - Alice Durand
```

Répondre :

1. Deux lignes de la ville `Lyon` sont-elles autorisées ?
2. Pourquoi la clé complète reste-t-elle non dupliquée ici ?
3. La déclaration `NON-UNIQUE` autoriserait-elle deux lignes entièrement identiques sur `city customer_id` ?
4. Dans quel cas choisir une clé non unique ?

## 🌺 EXERCICE 6 — `SORT` INUTILE OU INCOMPATIBLE

Analyser sans conserver :

```abap
SORT lt_customers BY name.
```

Répondre :

1. L’ordre primaire d’une table triée peut-il être remplacé arbitrairement ?
2. La catégorie garantit-elle l’ordre défini par sa clé primaire ?
3. Comment obtenir un affichage temporaire trié par nom ?
4. Quelle solution simple convient à ce niveau de formation ?

Solution attendue :

- copier les lignes dans une table standard ;
- trier la copie par `name`;
- conserver la table triée d’origine.

## 🌺 EXERCICE 7 — ANALYSE DE `APPEND`

Analyser :

```abap
APPEND VALUE #(
  customer_id = 'C005'
  name        = 'Emma Robert'
  city        = 'Nice'
) TO lt_customers.
```

Répondre :

1. Pourquoi `INSERT ... INTO TABLE` est-il préférable ?
2. Que se passe-t-il si la nouvelle clé ne peut pas être placée à la fin ?
3. Une insertion `C000` peut-elle être ajoutée en fin sans violer l’ordre ?
4. Une insertion `C005` après `C004` respecte-t-elle l’ordre ?
5. Faut-il dépendre de cette position pour alimenter une table triée ?

Ne pas exécuter un cas provoquant une erreur d’exécution.

## 🌺 EXERCICE 8 — MODIFICATION DE CLÉ

Une ligne d’une table triée est assignée à un field-symbol.

Analyser l’intention suivante :

```abap
<lfs_customer>-customer_id = 'C999'.
```

Répondre :

1. Le composant fait-il partie de la clé primaire ?
2. Une modification directe pourrait-elle détruire l’ordre ?
3. Pourquoi les composants de clé sont-ils protégés dans ce contexte ?
4. Quelle stratégie faut-il appliquer pour changer une clé ?
5. Quelles opérations sont nécessaires ?

## 🌺 EXERCICE 9 — TABLE STANDARD OU TRIÉE

Choisir :

| Besoin                                       | Catégorie |
| -------------------------------------------- | --------- |
| Historique dans l’ordre d’arrivée            |           |
| Annuaire toujours trié par identifiant       |           |
| Doublons d’identifiant interdits             |           |
| Ajouts massifs puis un seul tri final        |           |
| Lectures fréquentes par clé et parcours trié |           |

## 🌺 LIVRABLES

- déclaration unique ;
- résultat trié après insertions désordonnées ;
- contrôle du doublon ;
- lectures `C003` et `C999` ;
- table avec clé non unique ;
- copie standard triée par nom ;
- analyse de `APPEND`;
- stratégie de modification de clé ;
- tableau de choix.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La clé unique est déclarée explicitement.
- [ ] Les lignes sont automatiquement triées.
- [ ] Le doublon est refusé sans remplacer la ligne existante.
- [ ] `sy-subrc` est contrôlé.
- [ ] La lecture par clé est maîtrisée.
- [ ] Une clé non unique est utilisée correctement.
- [ ] `SORT` n’est pas appliqué pour remplacer l’ordre primaire.
- [ ] `INSERT` est privilégié à `APPEND`.
- [ ] Une clé n’est pas modifiée directement.
- [ ] La table triée est choisie pour un besoin d’ordre et de lecture par clé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
TYPES: BEGIN OF ty_customer,
         customer_id TYPE c LENGTH 4,
         name        TYPE c LENGTH 30,
         city        TYPE c LENGTH 20,
       END OF ty_customer.

DATA lt_customers TYPE SORTED TABLE OF ty_customer
  WITH UNIQUE KEY customer_id.

INSERT VALUE #(
  customer_id = 'C003'
  name        = 'Claire Martin'
  city        = 'Lyon'
) INTO TABLE lt_customers.

INSERT VALUE #(
  customer_id = 'C001'
  name        = 'Alice Durand'
  city        = 'Paris'
) INTO TABLE lt_customers.

INSERT VALUE #(
  customer_id = 'C004'
  name        = 'David Petit'
  city        = 'Lille'
) INTO TABLE lt_customers.

INSERT VALUE #(
  customer_id = 'C002'
  name        = 'Bruno Bernard'
  city        = 'Marseille'
) INTO TABLE lt_customers.

LOOP AT lt_customers INTO DATA(ls_customer).
  WRITE: / ls_customer-customer_id,
           '-',
           ls_customer-name,
           '-',
           ls_customer-city.
ENDLOOP.

INSERT VALUE #(
  customer_id = 'C002'
  name        = 'Autre personne'
  city        = 'Nantes'
) INTO TABLE lt_customers.

IF sy-subrc <> 0.
  WRITE / 'Insertion refusée : identifiant C002 déjà présent'.
ENDIF.

READ TABLE lt_customers
  WITH TABLE KEY customer_id = 'C003'
  INTO ls_customer.

IF sy-subrc = 0.
  WRITE: / ls_customer-customer_id,
           '-',
           ls_customer-name,
           '-',
           ls_customer-city.
ENDIF.
```

### Solution — clé non unique

```abap
DATA lt_customers_by_city TYPE SORTED TABLE OF ty_customer
  WITH NON-UNIQUE KEY city customer_id.

INSERT VALUE #(
  customer_id = 'C003'
  name        = 'Claire Martin'
  city        = 'Lyon'
) INTO TABLE lt_customers_by_city.

INSERT VALUE #(
  customer_id = 'C001'
  name        = 'Alice Durand'
  city        = 'Paris'
) INTO TABLE lt_customers_by_city.

INSERT VALUE #(
  customer_id = 'C005'
  name        = 'Emma Robert'
  city        = 'Lyon'
) INTO TABLE lt_customers_by_city.

INSERT VALUE #(
  customer_id = 'C002'
  name        = 'Bruno Bernard'
  city        = 'Marseille'
) INTO TABLE lt_customers_by_city.
```

### Solution — tri temporaire par nom

```abap
DATA lt_customers_by_name TYPE STANDARD TABLE OF ty_customer
  WITH EMPTY KEY.

lt_customers_by_name = CORRESPONDING #( lt_customers ).

SORT lt_customers_by_name BY name.

LOOP AT lt_customers_by_name INTO ls_customer.
  WRITE: / ls_customer-name,
           '-',
           ls_customer-customer_id.
ENDLOOP.
```

### Solution — changement de clé

Pour changer l’identifiant :

1. lire et copier la ligne ;
2. supprimer l’ancienne ligne ;
3. modifier la clé dans la copie ;
4. insérer la nouvelle ligne ;
5. contrôler le résultat.

</details>
