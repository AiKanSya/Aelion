# 🌸 INSTRUCTION DE CALCUL

## 🌺 OBJECTIFS

- [ ] Comprendre les opérations arithmétiques en ABAP
- [ ] Utiliser les opérateurs `=`, `+`, `-`, `*`, `/` pour les calculs
- [ ] Connaître les instructions correspondantes `MOVE`, `ADD`, `SUBTRACT`, `MULTIPLY`, `DIVIDE`
- [ ] Visualiser et appliquer les calculs dans un programme ABAP

## 🌺 DEFINITION

> Comme dans tout langage de programmation, les variables numériques (`N`, `I`, `P`, etc.) peuvent être utilisEes dans des opérations arithmétiques.

> [!TIP]
> Les variables numEriques sont comme des boîtes contenant des chiffres, et les opérations sont des machines qui manipulent ces chiffres : addition, soustraction, multiplication, division.

## 🌺 OPERATEURS ARITHMETIQUES

| 🍧 OPERATION   | 🍧 SIGNE | 🍧 INSTRUCTION ABAP     |
| -------------- | -------- | ----------------------- |
| EGAL           | `=`      | `MOVE`                  |
| ADDITION       | `+`      | `ADD ... TO ...`        |
| SOUSTRACTION   | `-`      | `SUBTRACT ... FROM ...` |
| MULTIPLICATION | `*`      | `MULTIPLY ... BY ...`   |
| DIVISION       | `/`      | `DIVIDE ... BY ...`     |

> [!TIP]
> Les expressions mathématiques avec `=`, `+`, `-`, `*`, `/` sont plus lisibles que les instructions `MOVE`, `ADD`, etc.

## 🌺 = (EGAL) OU MOVE ... TO ...

    WRITE:/ '     - = (EGAL) OU MOVE TO...'.

    DATA: lv_a TYPE I,
          lv_b TYPE I,
          lv_c TYPE I,
          lv_d TYPE I.

    lv_a = 3.
    lv_b = lv_a.

    MOVE 5    TO lv_c.
    MOVE lv_c TO lv_d.

    WRITE:/ 'Valeur de lv_a : ', lv_a,
          / 'Valeur de lv_b : ', lv_b,
          / 'Valeur de lv_c : ', lv_c,
          / 'Valeur de lv_d : ', lv_d.

- `=` et `MOVE` permettent d’assigner une valeur à une variable

> [!TIP]
> Le `=` = mettre directement un objet dans une boîte  
> `MOVE` = déplacer l’objet d’une boîte à une autre

## 🍧 MOVE MULTIPLE

    WRITE:/ '     - MOVE TO MULTIPLE...'.

    MOVE: 5 TO lv_c,
          lv_c TO lv_d.

- Permet d’attribuer plusieurs valeurs successivement

## 🌺 + (PLUS) OU ADD ... TO ...

    WRITE:/ '     - + (PLUS) OU ADD TO...'.

    DATA: lv_a(2) TYPE I.

    lv_a = 5 + 2.
    ADD 7 TO lv_a.

## 🌺 - (MOINS) OU SUBTRACT ... FROM ...

    WRITE:/ '     - - (MOINS) OU SUBTRACT FROM...'.

    DATA: lv_a(2) TYPE I,
          lv_b(2) TYPE I.

    lv_a = 5 + 2.
    lv_b = lv_a - 3.
    SUBTRACT 3 FROM lv_b.

## 🌺 \* (MULTIPLICATION) OU MULTIPLY ... BY ...

    WRITE:/ '     - * (MULTIPLICATION) OU MULTIPLY BY...'.

    DATA: lv_a(2) TYPE I,
          lv_b(2) TYPE I,
          lv_c(2) TYPE I.

    lv_a = 5 + 2.
    lv_b = lv_a - 3.
    lv_c = lv_a * lv_b.
    MULTIPLY lv_c BY 2.

## 🌺 / (DIVISION) OU DIVIDE ... BY ...

    WRITE:/ '     - / (DIVISION) OU DIVIDE BY...'.

    DATA: lv_a(2) TYPE I,
          lv_b(2) TYPE I,
          lv_c(2) TYPE I,
          lv_d(2) TYPE I.

    lv_a = 5 + 2.
    lv_b = lv_a - 3.
    lv_c = lv_a * lv_b.
    lv_d = lv_c / 2.
    DIVIDE lv_d BY 7.

> [!TIP]
>
> - Visualiser chaque variable comme une boîte contenant un nombre
> - Chaque opération = action sur la boîte : ajouter, retirer, multiplier ou partager
> - Préférer les expressions (`+`, `-`, `*`, `/`) pour plus de lisibilité
> - `MOVE`, `ADD`, `SUBTRACT`, etc., restent utiles pour des instructions historiques ou explicites

## 🌺 BONNES PRATIQUES

| 🍧 Bonne pratique                                               | 🍧 Explication                                             |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| Préférer les opérateurs arithmétiques                           | Plus lisibles et concis                                    |
| Toujours initialiser les variables                              | Evite les valeurs indéfinies                               |
| Vérifier les types de données                                   | Pour les éviter erreurs lors de division ou multiplication |
| Utiliser MOVE / ADD ... pour clarifier l’historique des calculs | Utile en maintenance et pour code lisible                  |

## 🌺 RESUME

> - Les variables numériques (`I`, `N`, `P`, `F`, `DECFLOAT`) peuvent subir des opérations arithmétiques
> - Opérateurs : `=`, `+`, `-`, `*`, `/`
> - Instructions historiques : `MOVE`, `ADD`, `SUBTRACT`, `MULTIPLY`, `DIVIDE`
> - Préférer les expressions pour plus de lisibilité
> - Toujours initialiser les variables et vérifier leur type avant les calculs
