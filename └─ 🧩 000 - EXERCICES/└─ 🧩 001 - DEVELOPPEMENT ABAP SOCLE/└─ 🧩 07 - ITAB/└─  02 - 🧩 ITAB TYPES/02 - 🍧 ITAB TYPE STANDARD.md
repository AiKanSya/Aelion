# 🌸 EXERCICES — ITAB TYPE STANDARD TABLE OF

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [ITAB TYPE STANDARD TABLE OF](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  02 - 🧩 ITAB TYPES/02 - 🍧 ITAB TYPE STANDARD.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- déclarer explicitement une table standard ;
- choisir une clé vide ou une clé non unique ;
- expliquer l’ordre d’insertion ;
- accepter des doublons ;
- lire une ligne par index ;
- contrôler un index absent ;
- trier manuellement la table ;
- distinguer ordre d’insertion et ordre courant ;
- identifier les limites d’une recherche répétée par clé.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 CONTEXTE

Le programme gère un journal d’événements. Chaque ligne possède :

| Composant  | Type          |
| ---------- | ------------- |
| `sequence` | `i`           |
| `level`    | `c LENGTH 1`  |
| `message`  | `c LENGTH 50` |

La liste peut contenir plusieurs messages identiques.

## 🌺 EXERCICE 1 — DÉCLARATION EXPLICITE

Définir :

```abap
TYPES: BEGIN OF ty_log,
         sequence TYPE i,
         level    TYPE c LENGTH 1,
         message  TYPE c LENGTH 50,
       END OF ty_log.
```

Déclarer :

```abap
DATA lt_logs TYPE STANDARD TABLE OF ty_log
  WITH EMPTY KEY.
```

Répondre :

1. Pourquoi `STANDARD TABLE` est-il plus explicite que `TABLE OF` ?
2. Pourquoi `WITH EMPTY KEY` convient-il à une simple liste ordonnée ?
3. Une table standard possède-t-elle malgré tout un index ?
4. La clé vide interdit-elle les doublons ?
5. La valeur `sequence` devient-elle automatiquement une clé ?

## 🌺 EXERCICE 2 — ORDRE D’INSERTION

Ajouter :

```text
3 - W - Stock faible
1 - I - Traitement démarré
2 - I - Traitement en cours
2 - I - Traitement en cours
```

Utiliser `APPEND`.

Afficher immédiatement la table.

Résultat attendu :

```text
3 - W - Stock faible
1 - I - Traitement démarré
2 - I - Traitement en cours
2 - I - Traitement en cours
```

Répondre :

1. La table est-elle automatiquement triée par `sequence` ?
2. Les deux lignes identiques sont-elles conservées ?
3. Quelle information détermine l’ordre courant ?
4. Quel index possède la première ligne ?

## 🌺 EXERCICE 3 — LECTURE PAR INDEX

Lire la deuxième ligne :

```abap
READ TABLE lt_logs INDEX 2
  INTO DATA(ls_log_read).
```

Contrôler `sy-subrc`.

Résultat attendu :

```text
Deuxième ligne : Traitement démarré
```

Tester ensuite :

```abap
READ TABLE lt_logs INDEX 10
  INTO ls_log_read.
```

Résultat attendu :

```text
Index 10 absent
```

Répondre :

1. Quelle valeur de `sy-subrc` indique une lecture réussie ?
2. Quelle valeur indique une ligne absente ?
3. La structure cible doit-elle être utilisée lorsque la lecture échoue ?
4. Pourquoi le contrôle doit-il être immédiat ?

## 🌺 EXERCICE 4 — TRI MANUEL

Exécuter :

```abap
SORT lt_logs BY sequence level message.
```

Afficher la table.

Résultat attendu :

```text
1 - I - Traitement démarré
2 - I - Traitement en cours
2 - I - Traitement en cours
3 - W - Stock faible
```

Répondre :

1. L’ordre d’insertion est-il encore visible ?
2. La table devient-elle une `SORTED TABLE` après `SORT` ?
3. Quel aspect a changé : son type ou seulement l’ordre courant de ses lignes ?
4. Un nouvel `APPEND` après le tri garantit-il le maintien du tri ?

## 🌺 EXERCICE 5 — AJOUT APRÈS TRI

Après le `SORT`, ajouter :

```text
0 - E - Erreur initiale
```

avec `APPEND`.

Afficher la table.

Résultat attendu :

```text
1 ...
2 ...
2 ...
3 ...
0 - E - Erreur initiale
```

Répondre :

1. Pourquoi la ligne `0` se trouve-t-elle à la fin ?
2. Le tri est-il maintenu automatiquement ?
3. Que faut-il faire pour retrouver l’ordre croissant ?
4. Quelle catégorie de table éviterait ce tri manuel permanent ?

## 🌺 EXERCICE 6 — CLÉ NON UNIQUE EXPLICITE

Déclarer une seconde table :

```abap
DATA lt_logs_by_level TYPE STANDARD TABLE OF ty_log
  WITH NON-UNIQUE KEY level.
```

Ajouter plusieurs lignes portant le niveau `I`.

Répondre :

1. La clé primaire autorise-t-elle plusieurs lignes `I` ?
2. Une table standard peut-elle avoir une clé primaire unique ?
3. Le fait de déclarer `level` comme clé trie-t-il automatiquement la table ?
4. Pourquoi cette clé ne garantit-elle pas une lecture directe constante ?

## 🌺 EXERCICE 7 — TABLE STANDARD PAR DÉFAUT

Comparer :

```abap
DATA lt_a TYPE TABLE OF ty_log.
```

et :

```abap
DATA lt_b TYPE STANDARD TABLE OF ty_log
  WITH DEFAULT KEY.
```

Répondre :

1. Les deux déclarations créent-elles la même catégorie ?
2. Quelle clé est utilisée lorsqu’aucune clé n’est précisée ?
3. Quels composants de `ty_log` peuvent participer à la clé standard ?
4. Pourquoi `WITH EMPTY KEY` peut-il être préférable pour une simple liste ?
5. Quelle déclaration exprime le mieux l’intention ?

## 🌺 EXERCICE 8 — CHOIX DE TABLE

Indiquer si une table standard est pertinente :

| Besoin                                                           | Pertinente | Justification |
| ---------------------------------------------------------------- | ---------- | ------------- |
| Conserver un journal dans l’ordre des événements                 |            |               |
| Lire systématiquement la dixième ligne                           |            |               |
| Rechercher des milliers de fois un client par identifiant unique |            |               |
| Accepter plusieurs lignes identiques                             |            |               |
| Maintenir automatiquement un ordre par clé                       |            |               |

## 🌺 LIVRABLES

- déclaration avec clé vide ;
- résultat avant tri ;
- lectures des index `2` et `10` ;
- résultat après tri ;
- résultat après ajout postérieur au tri ;
- analyse de la clé non unique ;
- comparaison des déclarations ;
- tableau de choix.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table standard est explicitement déclarée.
- [ ] La clé vide est justifiée.
- [ ] L’ordre d’insertion est reproduit.
- [ ] Les doublons sont conservés.
- [ ] L’accès par index est contrôlé.
- [ ] Le tri manuel est distingué d’une catégorie triée.
- [ ] Un ajout après tri ne maintient pas automatiquement l’ordre.
- [ ] La clé standard implicite est identifiée.
- [ ] La table standard n’est pas choisie pour un accès intensif par clé unique.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
TYPES: BEGIN OF ty_log,
         sequence TYPE i,
         level    TYPE c LENGTH 1,
         message  TYPE c LENGTH 50,
       END OF ty_log.

DATA lt_logs TYPE STANDARD TABLE OF ty_log
  WITH EMPTY KEY.

APPEND VALUE #(
  sequence = 3
  level    = 'W'
  message  = 'Stock faible'
) TO lt_logs.

APPEND VALUE #(
  sequence = 1
  level    = 'I'
  message  = 'Traitement démarré'
) TO lt_logs.

APPEND VALUE #(
  sequence = 2
  level    = 'I'
  message  = 'Traitement en cours'
) TO lt_logs.

APPEND VALUE #(
  sequence = 2
  level    = 'I'
  message  = 'Traitement en cours'
) TO lt_logs.

WRITE / 'ORDRE D''INSERTION'.

LOOP AT lt_logs INTO DATA(ls_log).
  WRITE: / ls_log-sequence,
           '-',
           ls_log-level,
           '-',
           ls_log-message.
ENDLOOP.

READ TABLE lt_logs INDEX 2
  INTO DATA(ls_log_read).

IF sy-subrc = 0.
  WRITE / |Deuxième ligne : { ls_log_read-message }|.
ELSE.
  WRITE / 'Deuxième ligne absente'.
ENDIF.

READ TABLE lt_logs INDEX 10
  INTO ls_log_read.

IF sy-subrc <> 0.
  WRITE / 'Index 10 absent'.
ENDIF.

SORT lt_logs BY sequence level message.

WRITE / 'APRÈS TRI'.

LOOP AT lt_logs INTO ls_log.
  WRITE: / ls_log-sequence,
           '-',
           ls_log-level,
           '-',
           ls_log-message.
ENDLOOP.

APPEND VALUE #(
  sequence = 0
  level    = 'E'
  message  = 'Erreur initiale'
) TO lt_logs.
```

### Solution — clé standard

Dans `ty_log`, les composants caractère `level` et `message` participent à la clé standard implicite. Le composant numérique `sequence` n’en fait pas partie.

Pour un journal où aucune clé primaire logique n’est requise :

```abap
WITH EMPTY KEY
```

exprime mieux l’intention.

### Solution — choix

| Besoin                            | Pertinente | Justification                       |
| --------------------------------- | ---------- | ----------------------------------- |
| Journal chronologique             | Oui        | ajout en fin et parcours séquentiel |
| Dixième ligne                     | Oui        | accès par index                     |
| Recherche intensive par ID unique | Non        | préférer une table hachée ou triée  |
| Lignes identiques                 | Oui        | doublons acceptés                   |
| Ordre automatique par clé         | Non        | préférer une table triée            |

</details>
