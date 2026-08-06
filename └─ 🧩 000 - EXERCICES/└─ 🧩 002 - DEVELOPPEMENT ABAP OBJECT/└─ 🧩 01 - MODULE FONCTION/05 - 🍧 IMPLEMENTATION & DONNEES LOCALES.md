# 🌸 EXERCICES — IMPLEMENTATION ET DONNEES LOCALES

## 🌺 OBJECTIFS

- utiliser `FUNCTION ... ENDFUNCTION` ;
- déclarer des données locales ;
- organiser contrôles et calcul ;
- retourner plusieurs résultats ;
- éviter les effets de bord.

## 🌺 DURÉE INDICATIVE

65 à 80 minutes.

## 🌺 MODULE

```text
Z_<TRI>_CALC_NET_AMOUNT
```

## 🌺 INTERFACE

| Paramètre            | Direction | Type         |
| -------------------- | --------- | ------------ |
| `IV_QUANTITY`        | Importing | `DECFLOAT34` |
| `IV_UNIT_PRICE`      | Importing | `DECFLOAT34` |
| `IV_DISCOUNT_PCT`    | Importing | `DECFLOAT34` |
| `EV_GROSS_AMOUNT`    | Exporting | `DECFLOAT34` |
| `EV_DISCOUNT_AMOUNT` | Exporting | `DECFLOAT34` |
| `EV_NET_AMOUNT`      | Exporting | `DECFLOAT34` |

Exceptions :

```text
INVALID_QUANTITY
INVALID_PRICE
INVALID_DISCOUNT
```

## 🌺 RÈGLES

```text
Quantité > 0
Prix >= 0
Remise entre 0 et 100
Brut = quantité × prix
Montant remise = brut × pourcentage / 100
Net = brut - remise
```

## 🌺 TESTS

| Quantité | Prix | Remise | Attendu            |
| -------: | ---: | -----: | ------------------ |
|      `2` | `10` |    `0` | net `20`           |
|      `2` | `10` |   `10` | net `18`           |
|      `2` | `10` |  `100` | net `0`            |
|      `0` | `10` |   `10` | `INVALID_QUANTITY` |
|      `2` | `-1` |   `10` | `INVALID_PRICE`    |
|      `2` | `10` |  `101` | `INVALID_DISCOUNT` |

## 🌺 DIAGNOSTIC

Vérifier que le module ne contient pas :

```text
WRITE
MESSAGE E
COMMIT WORK
INSERT
UPDATE
```

## 🌺 CRITÈRES DE VALIDATION

- [ ] Les contrôles précèdent le calcul.
- [ ] Les limites `0` et `100` sont acceptées.
- [ ] Les valeurs invalides lèvent la bonne exception.
- [ ] Les données de travail sont locales.
- [ ] Aucun effet de bord n’est introduit.

<details>
<summary>🍧 Afficher la solution</summary>

```abap
FUNCTION z_<tri>_calc_net_amount.

  IF iv_quantity <= 0.
    RAISE invalid_quantity.
  ENDIF.

  IF iv_unit_price < 0.
    RAISE invalid_price.
  ENDIF.

  IF iv_discount_pct < 0
     OR iv_discount_pct > 100.
    RAISE invalid_discount.
  ENDIF.

  ev_gross_amount =
    iv_quantity * iv_unit_price.

  ev_discount_amount =
    ev_gross_amount * iv_discount_pct / 100.

  ev_net_amount =
    ev_gross_amount - ev_discount_amount.

ENDFUNCTION.
```

</details>
