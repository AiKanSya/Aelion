# 🌸 EXERCICES — TYPE RANGE OF

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- déclarer une table de sélection ;
- identifier `SIGN`, `OPTION`, `LOW` et `HIGH`;
- créer des règles d’inclusion et d’exclusion ;
- créer une valeur unique et un intervalle ;
- utiliser l’opérateur `IN`;
- tester des valeurs limites ;
- éviter les résidus dans une ligne de travail ;
- diagnostiquer un intervalle inversé ou une option incohérente.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 CONTEXTE

Le programme doit accepter les identifiants article suivants :

- de `001000` à `001999` ;
- exactement `003000` ;
- sauf `001500`.

## 🌺 EXERCICE 1 — STRUCTURE D’UNE LIGNE

Déclarer :

```abap
TYPES ty_material_id TYPE c LENGTH 6.

DATA lr_material TYPE RANGE OF ty_material_id.
DATA lrs_material TYPE LINE OF lr_material.
```

Compléter :

| Composant | Rôle | Exemple  |
| --------- | ---- | -------- |
| `SIGN`    |      | `I`      |
| `OPTION`  |      | `BT`     |
| `LOW`     |      | `001000` |
| `HIGH`    |      | `001999` |

Répondre :

1. Quelle longueur possède `SIGN` ?
2. Quelle longueur possède `OPTION` ?
3. Quel type possèdent `LOW` et `HIGH` ?
4. `HIGH` est-il nécessaire avec `OPTION = 'EQ'` ?
5. Chaque ligne représente-t-elle une donnée métier ou une règle de sélection ?

## 🌺 EXERCICE 2 — ALIMENTATION AVEC STRUCTURE

Créer la première règle :

```text
Inclure de 001000 à 001999
```

Puis la deuxième :

```text
Inclure 003000
```

Puis la troisième :

```text
Exclure 001500
```

Contraintes :

- utiliser `lrs_material`;
- exécuter `CLEAR lrs_material` avant chaque nouvelle règle ;
- utiliser `APPEND`;
- afficher les trois lignes.

Résultat attendu :

```text
I - BT - 001000 - 001999
I - EQ - 003000 -
E - EQ - 001500 -
```

## 🌺 EXERCICE 3 — ALIMENTATION DIRECTE

Recréer la même table avec :

```abap
lr_material = VALUE #(
  ( sign = 'I' option = 'BT'
    low = '001000' high = '001999' )
  ( sign = 'I' option = 'EQ'
    low = '003000' )
  ( sign = 'E' option = 'EQ'
    low = '001500' )
).
```

Répondre :

1. Pourquoi `HIGH` est-il initial pour les règles `EQ` ?
2. Cette syntaxe réduit-elle le risque de réutiliser une ancienne valeur ?
3. Quelle syntaxe est la plus lisible pour un petit ensemble statique ?
4. Quelle syntaxe convient lorsque les règles sont construites dynamiquement dans une boucle ?

## 🌺 EXERCICE 4 — TEST AVEC `IN`

Tester :

| Article  | Résultat attendu |
| -------- | ---------------- |
| `000999` | Refusé           |
| `001000` | Accepté          |
| `001499` | Accepté          |
| `001500` | Refusé           |
| `001501` | Accepté          |
| `001999` | Accepté          |
| `002000` | Refusé           |
| `003000` | Accepté          |
| `003001` | Refusé           |

Utiliser :

```abap
IF lv_material_id IN lr_material.
```

Afficher :

```text
<Article> : accepté
```

ou :

```text
<Article> : refusé
```

## 🌺 EXERCICE 5 — BORNES INCLUSES

Répondre à partir des tests :

1. `BT` inclut-il `LOW` ?
2. `BT` inclut-il `HIGH` ?
3. Pourquoi `001500` est-il refusé malgré son appartenance à l’intervalle inclus ?
4. L’exclusion doit-elle être placée après l’inclusion pour fonctionner ?
5. L’ordre des lignes définit-il une exécution séquentielle de type « dernière règle gagnante » ?

## 🌺 EXERCICE 6 — RÉSIDU DANS `HIGH`

Analyser :

```abap
CLEAR lrs_material.

lrs_material-sign   = 'I'.
lrs_material-option = 'BT'.
lrs_material-low    = '001000'.
lrs_material-high   = '001999'.
APPEND lrs_material TO lr_material.

lrs_material-sign   = 'I'.
lrs_material-option = 'EQ'.
lrs_material-low    = '003000'.
APPEND lrs_material TO lr_material.
```

Répondre :

1. Quelle valeur reste dans `HIGH` pour la deuxième ligne ?
2. Cette valeur est-elle utile pour `EQ` ?
3. Pourquoi la ligne devient-elle trompeuse lors d’un affichage ou d’une maintenance ?
4. Quelle correction faut-il appliquer ?
5. Quelle alternative évite ce résidu ?

## 🌺 EXERCICE 7 — INTERVALLE INVERSÉ

Ajouter volontairement dans une table séparée :

```text
I - BT - 002000 - 001000
```

Tester :

```text
001500
```

Répondre :

1. La borne basse est-elle inférieure ou égale à la borne haute ?
2. La syntaxe ABAP détecte-t-elle une erreur métier dans les valeurs ?
3. Le test produit-il l’intervalle attendu ?
4. Quel contrôle faut-il exécuter avant d’ajouter une règle `BT` dynamique ?

## 🌺 EXERCICE 8 — OPTION INCOHÉRENTE

Analyser :

```abap
lrs_material-sign   = 'I'.
lrs_material-option = 'XX'.
lrs_material-low    = '001000'.
APPEND lrs_material TO lr_material.
```

Ne pas conserver cette règle.

Répondre :

1. `XX` est-il un opérateur de sélection valide ?
2. Le type `c LENGTH 2` suffit-il à garantir une valeur autorisée ?
3. Quel risque apparaît lors de l’utilisation de la table ?
4. Pourquoi faut-il contrôler les codes de `SIGN` et `OPTION` issus de données externes ?

## 🌺 EXERCICE 9 — APPLICATION À UNE TABLE INTERNE

Déclarer une table standard d’articles :

```abap
DATA lt_materials TYPE STANDARD TABLE OF ty_material_id
  WITH EMPTY KEY.
```

Contenu :

```text
000999
001000
001500
001700
002000
003000
003001
```

Parcourir la table et afficher uniquement les articles satisfaisant la table de sélection.

Résultat attendu :

```text
001000
001700
003000
```

## 🌺 LIVRABLES

- tableau des quatre composants ;
- table contenant les trois règles ;
- version avec `VALUE`;
- résultats des neuf identifiants ;
- explication des bornes et exclusions ;
- reproduction du résidu ;
- contrôle d’intervalle dynamique ;
- diagnostic de l’option invalide ;
- filtrage d’une table interne.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les quatre composants sont identifiés.
- [ ] Les trois règles sont correctement créées.
- [ ] `CLEAR` évite les résidus.
- [ ] La syntaxe `VALUE` est maîtrisée.
- [ ] Les bornes de `BT` sont incluses.
- [ ] L’exclusion `001500` est appliquée.
- [ ] L’ordre n’est pas décrit comme une priorité « dernière ligne gagnante ».
- [ ] Un intervalle inversé est rejeté par un contrôle métier.
- [ ] Les codes de sélection sont contrôlés.
- [ ] Le filtrage retourne trois articles.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
TYPES ty_material_id TYPE c LENGTH 6.

DATA lr_material TYPE RANGE OF ty_material_id.
DATA lrs_material TYPE LINE OF lr_material.

CLEAR lrs_material.
lrs_material-sign   = 'I'.
lrs_material-option = 'BT'.
lrs_material-low    = '001000'.
lrs_material-high   = '001999'.
APPEND lrs_material TO lr_material.

CLEAR lrs_material.
lrs_material-sign   = 'I'.
lrs_material-option = 'EQ'.
lrs_material-low    = '003000'.
APPEND lrs_material TO lr_material.

CLEAR lrs_material.
lrs_material-sign   = 'E'.
lrs_material-option = 'EQ'.
lrs_material-low    = '001500'.
APPEND lrs_material TO lr_material.
```

### Solution — version directe

```abap
lr_material = VALUE #(
  ( sign = 'I' option = 'BT'
    low = '001000' high = '001999' )
  ( sign = 'I' option = 'EQ'
    low = '003000' )
  ( sign = 'E' option = 'EQ'
    low = '001500' )
).
```

### Solution — tests

```abap
DATA lt_test_values TYPE STANDARD TABLE OF ty_material_id
  WITH EMPTY KEY.

lt_test_values = VALUE #(
  ( '000999' )
  ( '001000' )
  ( '001499' )
  ( '001500' )
  ( '001501' )
  ( '001999' )
  ( '002000' )
  ( '003000' )
  ( '003001' )
).

LOOP AT lt_test_values INTO DATA(lv_material_id).

  IF lv_material_id IN lr_material.
    WRITE / |{ lv_material_id } : accepté|.
  ELSE.
    WRITE / |{ lv_material_id } : refusé|.
  ENDIF.

ENDLOOP.
```

### Solution — contrôle d’un intervalle dynamique

```abap
IF lrs_material-low > lrs_material-high.
  MESSAGE 'Intervalle invalide : LOW supérieur à HIGH'
    TYPE 'S'
    DISPLAY LIKE 'E'.
ELSE.
  APPEND lrs_material TO lr_material.
ENDIF.
```

### Solution — filtrage

```abap
DATA lt_materials TYPE STANDARD TABLE OF ty_material_id
  WITH EMPTY KEY.

lt_materials = VALUE #(
  ( '000999' )
  ( '001000' )
  ( '001500' )
  ( '001700' )
  ( '002000' )
  ( '003000' )
  ( '003001' )
).

LOOP AT lt_materials INTO DATA(lv_material).
  CHECK lv_material IN lr_material.
  WRITE / lv_material.
ENDLOOP.
```

</details>
