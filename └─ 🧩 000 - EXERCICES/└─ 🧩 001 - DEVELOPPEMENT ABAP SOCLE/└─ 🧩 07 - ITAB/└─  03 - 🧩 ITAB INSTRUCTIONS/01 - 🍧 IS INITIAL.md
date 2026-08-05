# 🌸 EXERCICES — IS INITIAL

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [IS INITIAL](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/01 - 🍧 IS INITIAL.md>)

## 🌺 OBJECTIFS

- vérifier si une table contient des lignes ;
- utiliser `IS INITIAL` et `IS NOT INITIAL` ;
- comprendre que les crochets ne sont pas nécessaires pour une table sans ligne d’en-tête ;
- distinguer table vide et ligne contenant uniquement des valeurs initiales ;
- éviter un contrôle inutile avant un simple `LOOP AT`.

## 🌺 DURÉE INDICATIVE

25 à 35 minutes.

## 🌺 EXERCICE 1 — RESTITUTION

Compléter :

| Expression                 | Signification |
| -------------------------- | ------------- |
| `lt_orders IS INITIAL`     |               |
| `lt_orders IS NOT INITIAL` |               |
| `lt_orders[] IS INITIAL`   |               |
| `ls_order IS INITIAL`      |               |

Répondre :

1. Une table contenant une ligne entièrement initiale est-elle vide ?
2. Un `LOOP AT` sur une table vide provoque-t-il une erreur ?
3. Faut-il tester systématiquement la table avant chaque boucle ?
4. Quel contrôle utiliser lorsqu’un traitement exige au moins une ligne ?

## 🌺 EXERCICE 2 — AVANT ET APRÈS AJOUT

1. Déclarer une table vide.
2. Tester son état.
3. Ajouter une ligne.
4. Tester à nouveau son état.
5. Afficher le nombre de lignes.

Résultat attendu :

```text
Avant ajout : table vide
Après ajout : table non vide
Nombre de lignes : 1
```

## 🌺 EXERCICE 3 — LIGNE INITIALE

Exécuter :

```abap
APPEND INITIAL LINE TO lt_orders.
```

Répondre :

1. `lt_orders IS INITIAL` est-il encore vrai ?
2. Combien de lignes existe-t-il ?
3. La première ligne contient-elle des valeurs métier ?
4. Quelle différence existe entre table vide et ligne initiale ?

## 🌺 EXERCICE 4 — TEST INUTILE

Analyser :

```abap
IF lt_orders IS NOT INITIAL.
  LOOP AT lt_orders INTO DATA(ls_order).
    WRITE / ls_order-order_id.
  ENDLOOP.
ENDIF.
```

Répondre :

1. Le test est-il incorrect ?
2. Est-il nécessaire pour éviter une erreur ?
3. Quelle version plus simple produit le même résultat ?
4. Dans quel cas le test préalable reste-t-il utile ?

## 🌺 CRITÈRES DE VALIDATION

- [ ] La table vide est correctement détectée.
- [ ] La table non vide est correctement détectée.
- [ ] Une ligne initiale rend la table non vide.
- [ ] Les crochets sont identifiés comme inutiles dans le contexte moderne utilisé.
- [ ] Le test préalable n’est pas ajouté mécaniquement avant chaque boucle.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lt_orders TYPE STANDARD TABLE OF ty_order
  WITH EMPTY KEY.

IF lt_orders IS INITIAL.
  WRITE / 'Avant ajout : table vide'.
ENDIF.

APPEND VALUE #(
  order_id = '4500000001'
  customer_id = 'C10001'
) TO lt_orders.

IF lt_orders IS NOT INITIAL.
  WRITE / 'Après ajout : table non vide'.
ENDIF.

WRITE / |Nombre de lignes : { lines( lt_orders ) }|.
```

Une table contenant une ligne initiale contient bien une ligne :

```abap
CLEAR lt_orders.
APPEND INITIAL LINE TO lt_orders.

WRITE / |Nombre de lignes : { lines( lt_orders ) }|.

IF lt_orders IS NOT INITIAL.
  WRITE / 'La table contient une ligne initiale'.
ENDIF.
```

Boucle suffisante :

```abap
LOOP AT lt_orders INTO DATA(ls_order).
  WRITE / ls_order-order_id.
ENDLOOP.
```

</details>
