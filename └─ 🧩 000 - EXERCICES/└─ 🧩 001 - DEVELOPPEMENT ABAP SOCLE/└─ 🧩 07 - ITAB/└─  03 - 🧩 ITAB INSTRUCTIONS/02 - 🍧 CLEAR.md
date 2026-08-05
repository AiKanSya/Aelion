# 🌸 EXERCICES — CLEAR TABLE

<!-- GENERATED_EXERCISE_BANK -->

> Cours associé : [CLEAR TABLE](<../../../../└─ 🧩 001 - DEVELOPPEMENT ABAP SOCLE/└─ 🧩 07 - ITAB/└─  03 - 🧩 ITAB INSTRUCTIONS/02 - 🍧 CLEAR.md>)

## 🌺 OBJECTIFS

- vider une table interne ;
- réinitialiser une structure de travail ;
- distinguer `CLEAR`, `REFRESH` et `FREE` ;
- prouver que la structure et la table sont deux objets distincts ;
- éviter de vider la table à la place de la structure.

## 🌺 DURÉE INDICATIVE

30 à 40 minutes.

## 🌺 EXERCICE 1 — TABLE ET STRUCTURE

1. Remplir `lt_orders` avec quatre lignes.
2. Lire la première ligne dans `ls_order`.
3. Exécuter `CLEAR ls_order`.
4. Vérifier le nombre de lignes de la table.
5. Exécuter `CLEAR lt_orders`.
6. Vérifier à nouveau le nombre de lignes.

Résultats attendus :

```text
Après CLEAR de la structure : 4 lignes
Après CLEAR de la table : 0 ligne
```

## 🌺 EXERCICE 2 — CROCHETS

Comparer :

```abap
CLEAR lt_orders.
```

et :

```abap
CLEAR lt_orders[].
```

Dans le programme moderne sans ligne d’en-tête :

1. les deux formes vident-elles la table ?
2. laquelle est la plus simple ?
3. pourquoi les anciens programmes utilisent-ils fréquemment `[]` ?
4. quel risque apparaît avec les anciennes tables possédant une ligne d’en-tête ?

## 🌺 EXERCICE 3 — `REFRESH` ET `FREE`

Compléter :

| Instruction         | Effet principal | Usage recommandé |
| ------------------- | --------------- | ---------------- |
| `CLEAR lt_orders`   |                 |                  |
| `REFRESH lt_orders` |                 |                  |
| `FREE lt_orders`    |                 |                  |

## 🌺 EXERCICE 4 — ERREUR FONCTIONNELLE

Le développeur veut réutiliser la structure de travail mais écrit :

```abap
CLEAR lt_orders.
```

au lieu de :

```abap
CLEAR ls_order.
```

Décrire :

1. le symptôme ;
2. la cause ;
3. les données perdues ;
4. la correction ;
5. le test de non-régression.

## 🌺 CRITÈRES DE VALIDATION

- [ ] `CLEAR` de la structure ne vide pas la table.
- [ ] `CLEAR` de la table supprime toutes les lignes.
- [ ] Les crochets ne sont pas présentés comme obligatoires.
- [ ] `REFRESH` est identifié comme historique.
- [ ] `FREE` est distingué par la libération de mémoire.
- [ ] La mauvaise cible du `CLEAR` est diagnostiquée.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA ls_order TYPE ty_order.

lt_orders = VALUE #(
  ( order_id = '4500000001' )
  ( order_id = '4500000002' )
  ( order_id = '4500000003' )
  ( order_id = '4500000004' )
).

READ TABLE lt_orders INDEX 1 INTO ls_order.

CLEAR ls_order.

WRITE / |Après CLEAR de la structure : { lines( lt_orders ) } lignes|.

CLEAR lt_orders.

WRITE / |Après CLEAR de la table : { lines( lt_orders ) } ligne|.
```

| Instruction         | Effet                                            |
| ------------------- | ------------------------------------------------ |
| `CLEAR lt_orders`   | initialise la table                              |
| `REFRESH lt_orders` | forme historique d’initialisation du corps       |
| `FREE lt_orders`    | initialise la table et libère la mémoire allouée |

</details>
