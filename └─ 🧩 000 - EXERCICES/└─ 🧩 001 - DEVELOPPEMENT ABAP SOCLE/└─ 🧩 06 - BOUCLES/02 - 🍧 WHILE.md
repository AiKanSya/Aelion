# 🌸 EXERCICES — WHILE ENDWHILE - CONTROLE DES BOUCLES CONDITIONNELLES

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [WHILE ENDWHILE - CONTROLE DES BOUCLES CONDITIONNELLES](<../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 06 - BOUCLES/02 - 🍧 WHILE.md>)

## 🌺 OBJECTIFS

À la fin de l’exercice, le stagiaire doit être capable de :

- exécuter un bloc tant qu’une condition reste vraie ;
- expliquer le caractère pré-test de `WHILE` ;
- faire évoluer les variables de la condition ;
- construire une progression croissante ou décroissante ;
- utiliser `CHECK`, `CONTINUE` et `EXIT` sans bloquer la progression ;
- distinguer compteur métier et `sy-index` ;
- démontrer la terminaison de la boucle ;
- choisir entre `WHILE` et `DO`.

## 🌺 DURÉE INDICATIVE

55 à 70 minutes.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Élément                                   | Rôle |
| ----------------------------------------- | ---- |
| `WHILE condition.`                        |      |
| `ENDWHILE.`                               |      |
| condition fausse avant le premier passage |      |
| variable de progression                   |      |
| `sy-index` dans la boucle                 |      |

Répondre :

1. Quand la condition est-elle évaluée ?
2. Une boucle `WHILE` s’exécute-t-elle toujours au moins une fois ?
3. Pourquoi la variable utilisée dans la condition doit-elle généralement évoluer ?
4. `sy-index` remplace-t-il nécessairement le compteur métier ?
5. Quelle différence principale existe entre `DO 10 TIMES` et `WHILE lv_value < lv_limit` ?

## 🌺 EXERCICE 2 — PROGRESSION SIMPLE

Afficher les valeurs de `1` à `5`.

Déclarer :

```abap
DATA lv_index TYPE i VALUE 1.
```

Contraintes :

- utiliser `WHILE` ;
- afficher avant d’incrémenter ;
- afficher la valeur finale de `lv_index` après la boucle.

Résultat attendu :

```text
1
2
3
4
5
Valeur après la boucle : 6
```

Tracer :

| Passage `sy-index` | `lv_index` avant `WRITE` | Condition `lv_index <= 5` | `lv_index` après incrément |
| -----------------: | -----------------------: | ------------------------- | -------------------------: |
|                  1 |                        1 | Vrai                      |                          2 |
|                  2 |                        2 |                           |                            |
|                  3 |                        3 |                           |                            |
|                  4 |                        4 |                           |                            |
|                  5 |                        5 |                           |                            |
|                  — |                        6 | Faux                      |                          — |

## 🌺 EXERCICE 3 — ZÉRO PASSAGE

Déclarer :

```abap
DATA lv_index TYPE i VALUE 10.
```

Utiliser la condition :

```abap
WHILE lv_index <= 5.
```

Répondre avant exécution :

1. Combien de passages sont exécutés ?
2. Une ligne placée dans la boucle est-elle affichée ?
3. Une ligne placée après `ENDWHILE` est-elle affichée ?
4. Quelle propriété de `WHILE` explique ce résultat ?

## 🌺 EXERCICE 4 — PROGRESSION PAR PAS

Afficher :

```text
2
5
8
11
14
```

Règles :

- valeur initiale : `2` ;
- limite : `14` ;
- pas : `3`.

Déclarer trois variables distinctes.

Tester également :

| Départ | Limite | Pas | Résultat attendu  |
| -----: | -----: | --: | ----------------- |
|      2 |     14 |   3 | `2, 5, 8, 11, 14` |
|     15 |     14 |   3 | aucun passage     |
|      2 |      2 |   3 | `2`               |

## 🌺 EXERCICE 5 — CONTINUE ET PROGRESSION

Afficher les nombres de `1` à `10` en ignorant les multiples de `3`.

La progression doit avoir lieu avant le contrôle `CONTINUE`.

Squelette :

```abap
DATA lv_index TYPE i VALUE 0.

WHILE lv_index < 10.

  lv_index = lv_index + 1.

  " contrôle du multiple de 3

  WRITE / lv_index.

ENDWHILE.
```

Résultat attendu :

```text
1
2
4
5
7
8
10
```

Expliquer pourquoi placer l’incrémentation après `CONTINUE` serait dangereux.

## 🌺 EXERCICE 6 — CHECK ET PROGRESSION

Afficher uniquement les nombres de `5` à `10`.

Utiliser `CHECK`.

La variable doit être incrémentée avant `CHECK`.

Résultat attendu :

```text
5
6
7
8
9
10
```

## 🌺 EXERCICE 7 — EXIT DE SÉCURITÉ

Simuler l’augmentation d’un stock.

Données :

```abap
DATA lv_stock          TYPE i VALUE 7.
DATA lv_target_stock   TYPE i VALUE 25.
DATA lv_package_size   TYPE i VALUE 4.
DATA lv_max_iterations TYPE i VALUE 10.
```

Règles :

1. tant que le stock est inférieur à la cible, ajouter un colis ;
2. quitter la boucle si `sy-index` dépasse le nombre maximal de passages ;
3. afficher le stock après chaque ajout ;
4. afficher le stock final.

Résultat attendu :

```text
Passage 1 - Stock 11
Passage 2 - Stock 15
Passage 3 - Stock 19
Passage 4 - Stock 23
Passage 5 - Stock 27
Stock final : 27
```

Répondre :

1. La cible exacte `25` est-elle atteinte ?
2. Pourquoi la boucle s’arrête-t-elle malgré un stock final de `27` ?
3. Le garde-fou de dix passages est-il atteint dans le cas nominal ?
4. Que se passerait-il si `lv_package_size` valait `0` sans garde-fou ?

## 🌺 EXERCICE 8 — ORDRE DES CONTRÔLES

Analyser :

```abap
DATA lv_index TYPE i VALUE 0.

WHILE lv_index < 10.

  CHECK lv_index >= 5.

  lv_index = lv_index + 1.
  WRITE / lv_index.

ENDWHILE.
```

Ne pas exécuter ce code.

Répondre :

1. Quelle est la valeur initiale de `lv_index` ?
2. Le `CHECK` est-il vrai au premier passage ?
3. L’incrémentation est-elle atteinte ?
4. La condition du `WHILE` devient-elle fausse ?
5. Quel risque en résulte ?
6. Corriger l’ordre des instructions.

## 🌺 EXERCICE 9 — DÉCROISSANCE

Afficher un compte à rebours de `5` à `1`, puis :

```text
Départ
```

Contraintes :

- utiliser `WHILE` ;
- décrémenter à chaque passage ;
- ne pas utiliser `DO`.

## 🌺 EXERCICE 10 — DO OU WHILE

Choisir la structure la plus adaptée :

| Besoin                                                                | Boucle |
| --------------------------------------------------------------------- | ------ |
| Répéter exactement dix fois                                           |        |
| Répéter tant qu’un stock est inférieur à une cible                    |        |
| Réessayer jusqu’à obtention d’un état valide, avec limite de sécurité |        |
| Afficher les cinq premiers numéros                                    |        |
| Traiter une progression dont la fin dépend d’une valeur modifiée      |        |

Justifier chaque réponse.

## 🌺 LIVRABLES

- tableau de restitution ;
- trace de la progression simple ;
- explication du cas à zéro passage ;
- code avec pas de trois ;
- code avec `CONTINUE` ;
- code avec `CHECK` ;
- simulation de stock ;
- analyse du code dangereux ;
- compte à rebours ;
- tableau de choix des boucles.

## 🌺 CRITÈRES DE VALIDATION

- [ ] La condition est évaluée avant chaque passage.
- [ ] Le cas à zéro passage est compris.
- [ ] La variable de progression évolue à chaque chemin poursuivant la boucle.
- [ ] `CONTINUE` ne bloque pas l’incrémentation.
- [ ] `CHECK` ne bloque pas l’incrémentation.
- [ ] Le stock atteint ou dépasse la cible.
- [ ] Une limite de sécurité protège le traitement.
- [ ] La boucle décroissante se termine.
- [ ] Le choix entre `DO` et `WHILE` est justifié.

<details>
<summary>🍧 Afficher la solution</summary>

### Solution — restitution

| Élément                                   | Rôle                                             |
| ----------------------------------------- | ------------------------------------------------ |
| `WHILE condition.`                        | Exécute le bloc tant que la condition est vraie. |
| `ENDWHILE.`                               | Ferme la boucle.                                 |
| condition fausse avant le premier passage | Aucun passage n’est exécuté.                     |
| variable de progression                   | Fait évoluer l’état vers la fin de boucle.       |
| `sy-index`                                | Numéro du passage courant de la boucle.          |

1. Avant chaque passage.
2. Non.
3. Sans évolution, la condition peut rester vraie indéfiniment.
4. Non. Le compteur métier peut représenter une autre valeur ou un autre pas.
5. `DO 10 TIMES` fixe le nombre de passages ; `WHILE` dépend d’une condition réévaluée.

### Solution — progression simple

```abap
DATA lv_index TYPE i VALUE 1.

WHILE lv_index <= 5.

  WRITE / lv_index.

  lv_index = lv_index + 1.

ENDWHILE.

WRITE / |Valeur après la boucle : { lv_index }|.
```

| Passage | Avant | Condition | Après |
| ------: | ----: | --------- | ----: |
|       1 |     1 | Vrai      |     2 |
|       2 |     2 | Vrai      |     3 |
|       3 |     3 | Vrai      |     4 |
|       4 |     4 | Vrai      |     5 |
|       5 |     5 | Vrai      |     6 |
|       — |     6 | Faux      |     — |

### Solution — zéro passage

```abap
DATA lv_index TYPE i VALUE 10.

WHILE lv_index <= 5.
  WRITE / lv_index.
ENDWHILE.

WRITE / 'Traitement terminé'.
```

La condition est fausse avant le premier passage. Seule la ligne située après la boucle est exécutée.

### Solution — pas de trois

```abap
DATA lv_value TYPE i VALUE 2.
DATA lv_limit TYPE i VALUE 14.
DATA lv_step  TYPE i VALUE 3.

WHILE lv_value <= lv_limit.

  WRITE / lv_value.

  lv_value = lv_value + lv_step.

ENDWHILE.
```

### Solution — CONTINUE

```abap
DATA lv_index TYPE i VALUE 0.

WHILE lv_index < 10.

  lv_index = lv_index + 1.

  IF lv_index MOD 3 = 0.
    CONTINUE.
  ENDIF.

  WRITE / lv_index.

ENDWHILE.
```

Si l’incrémentation était placée après `CONTINUE`, les multiples de trois conserveraient la même valeur au passage suivant. La condition pourrait rester vraie sans progression.

### Solution — CHECK

```abap
DATA lv_index TYPE i VALUE 0.

WHILE lv_index < 10.

  lv_index = lv_index + 1.

  CHECK lv_index >= 5.

  WRITE / lv_index.

ENDWHILE.
```

### Solution — stock

```abap
DATA lv_stock          TYPE i VALUE 7.
DATA lv_target_stock   TYPE i VALUE 25.
DATA lv_package_size   TYPE i VALUE 4.
DATA lv_max_iterations TYPE i VALUE 10.

WHILE lv_stock < lv_target_stock.

  IF sy-index > lv_max_iterations.
    WRITE / 'Arrêt de sécurité : nombre maximal de passages atteint'.
    EXIT.
  ENDIF.

  IF lv_package_size <= 0.
    WRITE / 'Arrêt : taille de colis invalide'.
    EXIT.
  ENDIF.

  lv_stock = lv_stock + lv_package_size.

  WRITE: / 'Passage', sy-index,
           '- Stock', lv_stock.

ENDWHILE.

WRITE / |Stock final : { lv_stock }|.
```

Le stock dépasse la cible parce que les ajouts sont effectués par colis de quatre unités. La condition devient fausse dès que `lv_stock` n’est plus inférieur à `25`.

### Solution — ordre dangereux

Le premier `CHECK` est faux pour `lv_index = 0`. Le passage s’arrête avant l’incrémentation. `lv_index` reste à zéro et la condition `lv_index < 10` reste vraie.

Correction :

```abap
DATA lv_index TYPE i VALUE 0.

WHILE lv_index < 10.

  lv_index = lv_index + 1.

  CHECK lv_index >= 5.

  WRITE / lv_index.

ENDWHILE.
```

### Solution — compte à rebours

```abap
DATA lv_countdown TYPE i VALUE 5.

WHILE lv_countdown > 0.

  WRITE / lv_countdown.

  lv_countdown = lv_countdown - 1.

ENDWHILE.

WRITE / 'Départ'.
```

### Solution — choix

| Besoin                                          | Boucle                                           |
| ----------------------------------------------- | ------------------------------------------------ |
| Exactement dix fois                             | `DO 10 TIMES`                                    |
| Stock inférieur à une cible                     | `WHILE`                                          |
| Réessayer jusqu’à un état valide avec garde-fou | `WHILE` ou `DO` contrôlé, selon la donnée pilote |
| Cinq premiers numéros                           | `DO 5 TIMES`                                     |
| Fin dépendant d’une valeur modifiée             | `WHILE`                                          |

</details>
