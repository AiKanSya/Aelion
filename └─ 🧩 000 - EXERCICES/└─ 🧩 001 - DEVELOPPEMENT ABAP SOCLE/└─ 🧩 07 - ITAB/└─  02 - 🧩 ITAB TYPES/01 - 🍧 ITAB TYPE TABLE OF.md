# 🌸 EXERCICES — ITAB TYPE TABLE OF

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- définir une table interne ;
- distinguer type de ligne, structure de travail et table ;
- déclarer un type structuré ;
- déclarer une table avec `TABLE OF` ;
- déclarer une ligne avec `LINE OF` ;
- ajouter plusieurs lignes ;
- comprendre que l’ajout copie la valeur de la ligne ;
- prévenir la conservation involontaire d’anciennes valeurs ;
- compter les lignes ;
- copier une table complète.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 CONTEXTE

Le programme gère une liste temporaire de livres.

Chaque ligne possède :

| Composant | Type          |
| --------- | ------------- |
| `book_id` | `c LENGTH 4`  |
| `title`   | `c LENGTH 40` |
| `author`  | `c LENGTH 30` |
| `year`    | `i`           |
| `genre`   | `c LENGTH 20` |

## 🌺 EXERCICE 1 — VOCABULAIRE

Compléter :

| Élément             | Nature | Rôle |
| ------------------- | ------ | ---- |
| `ty_book`           |        |      |
| `ls_book`           |        |      |
| `lt_books`          |        |      |
| `TYPE TABLE OF`     |        |      |
| `TYPE LINE OF`      |        |      |
| `APPEND`            |        |      |
| `lines( lt_books )` |        |      |

Répondre :

1. Une table interne est-elle persistante après la fin du programme ?
2. Une ligne de table peut-elle être une structure ?
3. `APPEND` ajoute-t-il la structure elle-même ou une copie de sa valeur ?
4. Une modification ultérieure de `ls_book` modifie-t-elle une ligne déjà ajoutée ?
5. `lt_books` contient-il une ou plusieurs lignes ?

## 🌺 EXERCICE 2 — DÉCLARATION

Définir :

```abap
TYPES: BEGIN OF ty_book,
         book_id TYPE c LENGTH 4,
         title   TYPE c LENGTH 40,
         author  TYPE c LENGTH 30,
         year    TYPE i,
         genre   TYPE c LENGTH 20,
       END OF ty_book.
```

Déclarer :

```abap
DATA lt_books TYPE TABLE OF ty_book.
DATA ls_book  TYPE ty_book.
DATA ls_book_from_table TYPE LINE OF lt_books.
```

Répondre :

1. Quelle catégorie de table est créée par `TYPE TABLE OF` ?
2. `ls_book` et `ls_book_from_table` ont-ils le même type de ligne ?
3. Pourquoi `LINE OF` réduit-il le risque de divergence entre une table et sa structure de travail ?
4. Une clé vide a-t-elle été demandée explicitement dans cette déclaration ?

## 🌺 EXERCICE 3 — AJOUT DE TROIS LIGNES

Ajouter les livres suivants dans cet ordre :

| ID     | Titre             | Auteur                     | Année | Genre             |
| ------ | ----------------- | -------------------------- | ----: | ----------------- |
| `B001` | `1984`            | `George Orwell`            |  1949 | `Dystopie`        |
| `B002` | `Le Petit Prince` | `Antoine de Saint-Exupéry` |  1943 | `Conte`           |
| `B003` | `Dune`            | `Frank Herbert`            |  1965 | `Science-fiction` |

Contraintes :

- utiliser la même structure `ls_book` ;
- exécuter `CLEAR ls_book` avant l’alimentation de chaque nouvelle ligne ;
- ajouter chaque ligne avec `APPEND`;
- afficher toutes les lignes avec `LOOP AT`.

Résultat attendu :

```text
B001 - 1984 - George Orwell - 1949 - Dystopie
B002 - Le Petit Prince - Antoine de Saint-Exupéry - 1943 - Conte
B003 - Dune - Frank Herbert - 1965 - Science-fiction
```

## 🌺 EXERCICE 4 — PREUVE DE COPIE

Après l’ajout de `B003`, modifier la structure de travail :

```abap
ls_book-title = 'Valeur modifiée après APPEND'.
```

Afficher à nouveau la table.

Répondre :

1. Le titre de `B003` change-t-il dans la table ?
2. Pourquoi ?
3. Quelle opération serait nécessaire pour modifier réellement la ligne déjà présente ?
4. Pourquoi une structure de travail ne constitue-t-elle pas automatiquement une référence vers la dernière ligne ajoutée ?

## 🌺 EXERCICE 5 — DÉFAUT DE RÉINITIALISATION

Analyser puis exécuter dans une table séparée :

```abap
DATA lt_books_error TYPE TABLE OF ty_book.
DATA ls_book_error  TYPE ty_book.

ls_book_error-book_id = 'E001'.
ls_book_error-title   = 'Premier livre'.
ls_book_error-author  = 'Auteur A'.
ls_book_error-year    = 2000.
ls_book_error-genre   = 'Roman'.
APPEND ls_book_error TO lt_books_error.

ls_book_error-book_id = 'E002'.
ls_book_error-title   = 'Deuxième livre'.
ls_book_error-author  = 'Auteur B'.
ls_book_error-year    = 2001.
APPEND ls_book_error TO lt_books_error.
```

Le genre de la deuxième ligne n’est pas alimenté.

Répondre :

1. Quelle valeur reçoit-il ?
2. Pourquoi ?
3. `APPEND` a-t-il créé cette erreur ?
4. Quelle correction faut-il appliquer ?
5. Une expression `APPEND VALUE #( ... )` éviterait-elle la réutilisation de la structure ?

## 🌺 EXERCICE 6 — AJOUT DIRECT AVEC `VALUE`

Ajouter une quatrième ligne sans structure de travail :

```abap
APPEND VALUE #(
  book_id = 'B004'
  title   = 'Fondation'
  author  = 'Isaac Asimov'
  year    = 1951
  genre   = 'Science-fiction'
) TO lt_books.
```

Répondre :

1. Quelle ligne est construite par `VALUE #( )` ?
2. Pourquoi les composants non indiqués seraient-ils initiaux ?
3. Dans quel cas une structure de travail reste-t-elle utile ?
4. Dans quel cas l’expression directe est-elle plus lisible ?

## 🌺 EXERCICE 7 — NOMBRE DE LIGNES

Afficher :

```text
Nombre de livres : 4
```

Utiliser :

```abap
lines( lt_books )
```

Tester également une table vide.

Résultat attendu :

```text
Nombre de lignes dans la table vide : 0
```

## 🌺 EXERCICE 8 — COPIE COMPLÈTE DE TABLE

Déclarer :

```abap
DATA lt_books_copy LIKE lt_books.
```

Copier :

```abap
lt_books_copy = lt_books.
```

Supprimer ensuite le contenu de la copie :

```abap
CLEAR lt_books_copy.
```

Afficher le nombre de lignes des deux tables.

Résultat attendu :

```text
Source : 4
Copie  : 0
```

Répondre :

1. Les deux tables sont-elles des objets distincts ?
2. `CLEAR lt_books_copy` vide-t-il également la source ?
3. L’affectation complète copie-t-elle toutes les lignes ?
4. La définition du type est-elle copiée ou déjà connue par les deux objets ?

## 🌺 EXERCICE 9 — DIAGNOSTIC DE TYPE

Analyser :

```abap
DATA lt_numbers TYPE TABLE OF i.
DATA ls_number  TYPE string.

ls_number = 'ABC'.
APPEND ls_number TO lt_numbers.
```

Répondre avant le contrôle de syntaxe :

1. Le type de ligne de la table est-il structuré ou élémentaire ?
2. Le type de `ls_number` est-il identique ?
3. Une conversion est-elle nécessaire ?
4. La valeur `ABC` est-elle convertible en entier ?
5. Quel risque existe ?

Corriger avec une variable de type compatible.

## 🌺 LIVRABLES

- tableau de vocabulaire ;
- déclarations ;
- table contenant quatre livres ;
- preuve que `APPEND` copie la valeur ;
- reproduction et correction du défaut de réinitialisation ;
- ajout direct avec `VALUE`;
- comptage des lignes ;
- preuve d’indépendance de la copie ;
- correction du diagnostic de type.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Type, ligne et table sont distingués.
- [ ] `TYPE TABLE OF` est identifié comme une table standard.
- [ ] `LINE OF` est utilisé.
- [ ] Les trois premières lignes respectent l’ordre demandé.
- [ ] La modification de la structure n’altère pas une ligne déjà ajoutée.
- [ ] Le défaut lié à l’absence de `CLEAR` est expliqué.
- [ ] Une ligne est ajoutée directement avec `VALUE`.
- [ ] Le nombre de lignes est correct.
- [ ] La copie complète reste indépendante.
- [ ] Aucune conversion invalide ne subsiste.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — vocabulaire

| Élément         | Nature                        | Rôle                                     |
| --------------- | ----------------------------- | ---------------------------------------- |
| `ty_book`       | type structuré                | décrit une ligne                         |
| `ls_book`       | structure                     | contient une ligne de travail            |
| `lt_books`      | table interne                 | contient plusieurs lignes                |
| `TYPE TABLE OF` | déclaration de table standard | définit la catégorie et le type de ligne |
| `TYPE LINE OF`  | dérivation de type            | reprend le type d’une ligne de table     |
| `APPEND`        | instruction d’ajout           | ajoute une copie de la valeur à la fin   |
| `lines( )`      | fonction intégrée             | retourne le nombre de lignes             |

### Solution — programme

```abap
REPORT zaelion_<tri>_itab_types.

TYPES: BEGIN OF ty_book,
         book_id TYPE c LENGTH 4,
         title   TYPE c LENGTH 40,
         author  TYPE c LENGTH 30,
         year    TYPE i,
         genre   TYPE c LENGTH 20,
       END OF ty_book.

DATA lt_books TYPE TABLE OF ty_book.
DATA ls_book  TYPE ty_book.
DATA ls_book_from_table TYPE LINE OF lt_books.

START-OF-SELECTION.

  CLEAR ls_book.
  ls_book-book_id = 'B001'.
  ls_book-title   = '1984'.
  ls_book-author  = 'George Orwell'.
  ls_book-year    = 1949.
  ls_book-genre   = 'Dystopie'.
  APPEND ls_book TO lt_books.

  CLEAR ls_book.
  ls_book-book_id = 'B002'.
  ls_book-title   = 'Le Petit Prince'.
  ls_book-author  = 'Antoine de Saint-Exupéry'.
  ls_book-year    = 1943.
  ls_book-genre   = 'Conte'.
  APPEND ls_book TO lt_books.

  CLEAR ls_book.
  ls_book-book_id = 'B003'.
  ls_book-title   = 'Dune'.
  ls_book-author  = 'Frank Herbert'.
  ls_book-year    = 1965.
  ls_book-genre   = 'Science-fiction'.
  APPEND ls_book TO lt_books.

  ls_book-title = 'Valeur modifiée après APPEND'.

  APPEND VALUE #(
    book_id = 'B004'
    title   = 'Fondation'
    author  = 'Isaac Asimov'
    year    = 1951
    genre   = 'Science-fiction'
  ) TO lt_books.

  LOOP AT lt_books INTO ls_book_from_table.
    WRITE: / ls_book_from_table-book_id,
             '-',
             ls_book_from_table-title,
             '-',
             ls_book_from_table-author,
             '-',
             ls_book_from_table-year,
             '-',
             ls_book_from_table-genre.
  ENDLOOP.

  WRITE / |Nombre de livres : { lines( lt_books ) }|.
```

### Solution — absence de `CLEAR`

La deuxième ligne conserve :

```text
Roman
```

La structure de travail contient encore cette valeur. `APPEND` copie fidèlement l’état de la structure au moment de l’ajout.

Correction :

```abap
CLEAR ls_book_error.

ls_book_error-book_id = 'E002'.
ls_book_error-title   = 'Deuxième livre'.
ls_book_error-author  = 'Auteur B'.
ls_book_error-year    = 2001.

APPEND ls_book_error TO lt_books_error.
```

### Solution — copie de table

```abap
DATA lt_books_copy LIKE lt_books.

lt_books_copy = lt_books.
CLEAR lt_books_copy.

WRITE: / |Source : { lines( lt_books ) }|,
       / |Copie  : { lines( lt_books_copy ) }|.
```

### Solution — diagnostic

```abap
DATA lt_numbers TYPE TABLE OF i.
DATA lv_number  TYPE i VALUE 10.

APPEND lv_number TO lt_numbers.
```

</details>
