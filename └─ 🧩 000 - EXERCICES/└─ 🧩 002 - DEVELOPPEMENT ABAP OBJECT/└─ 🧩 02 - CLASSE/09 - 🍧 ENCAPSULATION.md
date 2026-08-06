# 🌸 EXERCICES — ENCAPSULATION

## 🌺 OBJECTIFS

- protéger un stock ;
- centraliser les contrôles ;
- exposer des méthodes métier ;
- empêcher un état négatif ;
- éviter les setters génériques.

## 🌺 DURÉE INDICATIVE

65 à 85 minutes.

## 🌺 CLASSE

```text
ZCL_<TRI>_STOCK
```

## 🌺 ATTRIBUT PRIVÉ

```text
MV_QUANTITY TYPE DECFLOAT34
```

## 🌺 MÉTHODES PUBLIQUES

```text
ADD_STOCK
REMOVE_STOCK
GET_QUANTITY
```

Exceptions :

```text
ZCX_<TRI>_INVALID_AMOUNT
```

## 🌺 RÈGLES

- ajout strictement positif ;
- retrait strictement positif ;
- retrait inférieur ou égal au stock ;
- quantité jamais négative.

## 🌺 EXERCICE 1 — AJOUT

```abap
METHOD add_stock.

  IF iv_quantity <= 0.
    RAISE EXCEPTION TYPE zcx_<tri>_invalid_amount.
  ENDIF.

  mv_quantity =
    mv_quantity + iv_quantity.

ENDMETHOD.
```

## 🌺 EXERCICE 2 — RETRAIT

Contrôler le montant et le stock disponible.

## 🌺 EXERCICE 3 — TESTS

| Opération    | Résultat   |
| ------------ | ---------- |
| Ajouter `10` | stock `10` |
| Retirer `3`  | stock `7`  |
| Retirer `8`  | exception  |
| Ajouter `0`  | exception  |
| Retirer `-1` | exception  |

## 🌺 EXERCICE 4 — INTERFACE MINIMALE

Ne pas créer :

```text
SET_QUANTITY
```

qui permettrait de contourner les règles.

## 🌺 DIAGNOSTIC

Rendre `MV_QUANTITY` public et écrire `-100`.

Prouver que l’encapsulation corrige le défaut.

## 🌺 CRITÈRES DE VALIDATION

- [ ] L’attribut est privé.
- [ ] Les méthodes expriment le métier.
- [ ] Les entrées invalides sont refusées.
- [ ] Le stock ne devient jamais négatif.
- [ ] Aucun setter générique n’existe.
- [ ] Le cas public incorrect est supprimé.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
METHOD remove_stock.

  IF iv_quantity <= 0
     OR iv_quantity > mv_quantity.

    RAISE EXCEPTION TYPE zcx_<tri>_invalid_amount.

  ENDIF.

  mv_quantity =
    mv_quantity - iv_quantity.

ENDMETHOD.

METHOD get_quantity.

  rv_quantity = mv_quantity.

ENDMETHOD.
```

</details>
