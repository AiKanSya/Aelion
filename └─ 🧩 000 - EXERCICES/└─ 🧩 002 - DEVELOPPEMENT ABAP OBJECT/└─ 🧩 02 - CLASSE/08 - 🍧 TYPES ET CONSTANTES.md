# 🌸 EXERCICES — TYPES ET CONSTANTES DE CLASSE

## 🌺 OBJECTIFS

- créer un type de ligne ;
- créer un type table ;
- choisir leur visibilité ;
- créer des constantes ;
- utiliser un type public depuis un report.

## 🌺 DURÉE INDICATIVE

60 à 75 minutes.

## 🌺 CLASSE

```text
ZCL_<TRI>_ORDER
```

## 🌺 TYPES PUBLICS

```abap
TYPES:
  BEGIN OF ty_item,
    item_id     TYPE i,
    description TYPE string,
    quantity    TYPE decfloat34,
    unit_price  TYPE decfloat34,
  END OF ty_item.

TYPES tt_items TYPE STANDARD TABLE OF ty_item
  WITH EMPTY KEY.
```

Dans `SE24`, créer les équivalents dans l’onglet Types.

## 🌺 CONSTANTES PUBLIQUES

```text
GC_STATUS_NEW    TYPE C LENGTH 1 VALUE 'N'
GC_STATUS_CLOSED TYPE C LENGTH 1 VALUE 'C'
```

## 🌺 EXERCICE 1 — UTILISATION EXTERNE

```abap
DATA lt_items TYPE zcl_<tri>_order=>tt_items.

APPEND VALUE #(
  item_id     = 10
  description = `Article A`
  quantity    = 2
  unit_price  = 5
) TO lt_items.
```

## 🌺 EXERCICE 2 — CONSTANTE

```abap
DATA(lv_status) =
  zcl_<tri>_order=>gc_status_new.
```

## 🌺 EXERCICE 3 — VISIBILITÉ

Créer un type privé de calcul intermédiaire.

Vérifier qu’il n’est pas utilisable depuis le report.

## 🌺 EXERCICE 4 — TYPE DDIC OU TYPE DE CLASSE

Choisir :

| Besoin                                     | Choix recommandé            |
| ------------------------------------------ | --------------------------- |
| Type public utilisé par de nombreux objets | DDIC ou classe d’API stable |
| Type interne à une implémentation          | Type privé de classe        |
| Type exposé uniquement par la classe       | Type public de classe       |
| Type de table de base ou interface RFC     | DDIC                        |

## 🌺 DIAGNOSTIC

Un appelant dépend d’un type privé.

Le code ne compile pas.

Corriger la visibilité ou déplacer le type dans un contrat public approprié.

## 🌺 CRITÈRES DE VALIDATION

- [ ] Le type de ligne existe.
- [ ] Le type table existe.
- [ ] Les constantes sont publiques.
- [ ] Le report utilise `=>`.
- [ ] Un type privé est inaccessible.
- [ ] Le choix DDIC/classe est expliqué.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
DATA lt_items TYPE zcl_<tri>_order=>tt_items.

DATA(lv_new_status) =
  zcl_<tri>_order=>gc_status_new.
```

Les types publics font partie du contrat de la classe. Leur évolution doit préserver les appelants.

</details>
